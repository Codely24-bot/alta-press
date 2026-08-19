import * as cheerio from 'cheerio';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'src', 'data', 'technical');
const dataPath = path.join(outputDir, 'valacoTechnicalData.js');
const reportPath = path.join(outputDir, 'valaco-import-report.json');
const importedAt = new Date().toISOString();

const startUrls = [
  'https://www.valaco.com.br/inf_tecnicas/',
  'https://www.valaco.com.br/mapa.html',
];

const excludedSourcePaths = new Set([
  '/inf_tecnicas/conceitos.html',
  '/inf_tecnicas/it_formulas.html',
  '/inf_tecnicas/it_propvapor.html',
  '/inf_tecnicas/it_tabvazao.html',
  '/inf_tecnicas/mat_especificacoes.html',
]);

const targetCategories = [
  ['conceitos-definicoes', 'Conceitos e Definições', ['dicion', 'sigla', 'tipo', 'valvula']],
  ['conexoes', 'Conexões', ['conex', 'curva', 'solda', 'ferro maleavel']],
  ['conversoes', 'Conversões de Medidas', ['convers', 'unidade', 'temperatura', 'pressao']],
  ['espessura-tubos-conexoes', 'Espessura de Tubos e Conexões', ['schedule', 'espessura', 'tubo']],
  ['expansao-termica', 'Expansão Térmica', ['expansao']],
  ['faceamento-solda-topo', 'Faceamento para Solda de Topo', ['faceamento', 'butt', 'bw', 'welding']],
  ['flanges', 'Flanges', ['flange', 'prisioneiro', 'parafuso']],
  ['formulas-geometricas', 'Fórmulas Geométricas', ['formula', 'geometr', 'trigonometr']],
  ['galvanizacao', 'Galvanização', ['galvan']],
  ['vapor', 'Informações sobre Vapor', ['vapor']],
  ['materiais', 'Materiais', ['material', 'astm', 'composicao', 'mecanica', 'corrosao', 'diafragma']],
  ['aplicacao-valvulas', 'Aplicação de Válvulas', ['aplicacao', 'valvula']],
  ['tabelas-vazao', 'Tabelas de Vazão', ['vazao', 'fluxo', 'agua', 'ar comprimido']],
  ['tipos-de-rosca', 'Tipos de Rosca', ['rosca', 'bsp', 'npt']],
];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function absoluteUrl(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function isTechnicalUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'www.valaco.com.br' && parsed.pathname.startsWith('/inf_tecnicas/');
  } catch {
    return false;
  }
}

function categorize(title, url, text) {
  const pathname = new URL(url).pathname.toLowerCase();
  const directMatches = [
    [/\/(enc_|it_encaixe|tipo.*rosca|.*bsp|.*npt)/, 'tipos-de-rosca'],
    [/\/(und_|conversoes)/, 'conversoes'],
    [/\/(esp_|it_espessura)/, 'espessura-tubos-conexoes'],
    [/\/(fl_|it_flanges)/, 'flanges'],
    [/\/(mat_|it_materiais)/, 'materiais'],
    [/\/(prop_|temp_vapor|it_propvapor)/, 'vapor'],
    [/\/(vazao|it_tabvazao)/, 'tabelas-vazao'],
    [/\/(cx_|it_conexoes|it_pressao_cnx)/, 'conexoes'],
    [/\/(it_expansao)/, 'expansao-termica'],
    [/\/(it_solda)/, 'faceamento-solda-topo'],
    [/\/(it_formulas)/, 'formulas-geometricas'],
    [/\/(it_galvanizacao)/, 'galvanizacao'],
    [/\/(it_comparativo)/, 'aplicacao-valvulas'],
    [/\/(dicionario|siglas|tipo_|tipos_de_valvulas|conceitos)/, 'conceitos-definicoes'],
  ];
  const direct = directMatches.find(([pattern]) => pattern.test(pathname));
  if (direct) {
    return targetCategories.find(([slug]) => slug === direct[1]);
  }

  const haystack = `${title} ${pathname} ${text}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const found = targetCategories.find(([, , needles]) => needles.some((needle) => haystack.includes(needle)));
  return found ?? targetCategories[0];
}

function extractText($, element) {
  return $(element).text().replace(/\s+/g, ' ').trim();
}

function cleanImportedText(value, title) {
  return value
    .replace(/::\s*Home\s*(?:»|Â»)\s*(?:Informações Técnicas|InformaÃ§Ãµes TÃ©cnicas)(?:\s*(?:»|Â»)\s*[^A-Z0-9]+)?/gi, ' ')
    .replace(/Todos os desenhos e imagens encontrados neste website (?:são|sÃ£o) para efeito meramente ilustrativo/gi, ' ')
    .replace(/Imprimir esta (?:página|pÃ¡gina)/gi, ' ')
    .replace(/(?:Não|NÃ£o) encontrou o que procurava\? Tente a busca (?:avançada|avanÃ§ada) ou (?:faça|faÃ§a) sua (?:solicitação|solicitaÃ§Ã£o) pelo site/gi, ' ')
    .replace(/Reportar link quebrado/gi, ' ')
    .replace(/Visualize o mapa do website para melhor aproveitamento de (?:conteúdo|conteÃºdo)/gi, ' ')
    .replace(/Recomendar este site/gi, ' ')
    .replace(/Tel\.:.*?Siga a @val\.aco no Instagram/gi, ' ')
    .replace(/<div class="statcounter"[\s\S]*?<\/div>/gi, ' ')
    .replace(new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+`, 'i'), '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanHtml($, rootElement) {
  const sourceHadVisuals = $(rootElement).find('img,picture,svg,canvas,object,embed').length > 0;
  $(rootElement).find('script,style,iframe,form,nav,header,footer,img,picture,svg,canvas,object,embed,input,button,select,textarea').remove();
  $(rootElement).contents().filter((_, node) => node.type === 'comment').remove();

  const allowed = new Set(['h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'table', 'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'strong', 'em', 'br', 'small', 'sub', 'sup']);
  $(rootElement).find('*').each((_, node) => {
    const tag = node.tagName?.toLowerCase();
    if (!allowed.has(tag)) {
      $(node).replaceWith($(node).contents());
      return;
    }
    const child = $(node);
    for (const attr of Object.keys(node.attribs ?? {})) {
      child.removeAttr(attr);
    }
    if (tag === 'th') child.attr('scope', 'col');
  });

  $(rootElement).find('p,li,h1,h2,h3,h4,td,th').each((_, node) => {
    const text = extractText($, node);
    if (!text && $(node).find('br').length === 0) $(node).remove();
  });

  const html = $(rootElement).html()
    ?.replace(/<!--[\s\S]*?-->/g, '')
    ?.replace(/&lt;iframe[\s\S]*?&lt;\/iframe&gt;/gi, '')
    .replace(/&lt;div class="statcounter"[\s\S]*?&lt;\/div&gt;/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<div class="statcounter"[\s\S]*?<\/div>/gi, '')
    .replace(/::\s*Home[\s\S]{0,360}?(?=<\/td>)/gi, '')
    .replace(/Todos os desenhos e imagens encontrados neste website (?:são|sÃ£o) para efeito meramente ilustrativo/gi, '')
    .replace(/Imprimir\s+esta\s+(?:página|pÃ¡gina)/gi, '')
    .replace(/(?:Não|NÃ£o) encontrou o que procurava\? Tente a busca (?:avançada|avanÃ§ada) ou (?:faça|faÃ§a) sua (?:solicitação|solicitaÃ§Ã£o) pelo site/gi, '')
    .replace(/Reportar link quebrado/gi, '')
    .replace(/Visualize o mapa do website para melhor aproveitamento de\s+(?:conteúdo|conteÃºdo)/gi, '')
    .replace(/Recomendar este site/gi, '')
    .replace(/Tel\.: \(31\) 3361-6106[\s\S]*?Siga a @val\.aco no Instagram/gi, '')
    .replace(/\s+<\/(p|li|td|th|h1|h2|h3|h4)>/g, '</$1>')
    .trim() ?? '';

  return {
    html,
    sourceHadVisuals,
  };
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'AltaPress technical importer' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function discoverUrls() {
  const urls = new Set();
  const failures = [];

  for (const startUrl of startUrls) {
    try {
      const html = await fetchPage(startUrl);
      const $ = cheerio.load(html, { decodeEntities: true });
      $('a[href]').each((_, link) => {
        const url = absoluteUrl($(link).attr('href'), startUrl);
        if (url && isTechnicalUrl(url)) {
          const parsed = new URL(url.split('#')[0]);
          parsed.protocol = 'https:';
          urls.add(parsed.href);
        }
      });
      if (isTechnicalUrl(startUrl)) urls.add(startUrl);
    } catch (error) {
      failures.push({ url: startUrl, error: error.message });
    }
  }

  return { urls: [...urls].sort(), failures };
}

function selectMainContent($) {
  return $('main, article, .entry-content, .content, #content, body').filter((_, item) => extractText($, item).length > 80).first();
}

const { urls, failures } = await discoverUrls();
const pages = [];
const ignored = [];
const usedPageSlugs = new Map();

for (const url of urls) {
  try {
    if (excludedSourcePaths.has(new URL(url).pathname)) {
      ignored.push({ url, reason: 'excluded-review-index-page' });
      continue;
    }

    const html = await fetchPage(url);
    const $ = cheerio.load(html, { decodeEntities: true });
    const main = selectMainContent($);
    const rawTitle = extractText($, main.find('h1').first()) || extractText($, $('title').first()) || slugify(new URL(url).pathname);
    const title = rawTitle.split('»').pop().replace(/^::\s*Home\s*/i, '').trim() || rawTitle;
    const { html: contentHtml, sourceHadVisuals } = cleanHtml($, main.clone());
    const text = cleanImportedText(cheerio.load(contentHtml).text().replace(/\s+/g, ' ').trim(), title);
    const tableCount = cheerio.load(contentHtml)('table').length;
    const [categorySlug, category] = categorize(title, url, text);
    const baseSlug = slugify(title) || slugify(new URL(url).pathname);
    const slugKey = `${categorySlug}/${baseSlug}`;
    const slugUseCount = usedPageSlugs.get(slugKey) ?? 0;
    usedPageSlugs.set(slugKey, slugUseCount + 1);
    const pageSlug = slugUseCount ? `${baseSlug}-${slugUseCount + 1}` : baseSlug;

    if (!text && sourceHadVisuals) {
      ignored.push({ url, reason: 'visual-only', visualSourceNotImported: true });
      continue;
    }

    pages.push({
      slug: pageSlug,
      title,
      categorySlug,
      category,
      subcategory: null,
      sourceUrl: url,
      importedAt,
      lastReviewedAt: null,
      status: 'draft',
      needsReview: tableCount === 0 || text.length < 120,
      visualSourceNotImported: sourceHadVisuals,
      imagePath: `/technical-images/${categorySlug}/${pageSlug}.svg`,
      imageAlt: `Ilustração técnica 3D sobre ${title}`,
      tableCount,
      description: text.slice(0, 180),
      html: contentHtml,
      searchText: text,
    });
    console.log(`imported ${title}`);
  } catch (error) {
    failures.push({ url, error: error.message });
  }
}

const categories = targetCategories.map(([slug, title]) => ({
  slug,
  title,
  description: `Conteúdos técnicos sobre ${title.toLowerCase()} para consulta industrial AltaPress.`,
  pages: pages.filter((page) => page.categorySlug === slug).map((page) => page.slug),
}));

const report = {
  importedAt,
  startUrls,
  discoveredUrls: urls.length,
  processedPages: pages.length,
  importedTables: pages.reduce((total, page) => total + page.tableCount, 0),
  categories: categories.map((category) => ({
    slug: category.slug,
    title: category.title,
    pageCount: category.pages.length,
  })),
  failures,
  ignored,
  needsReview: pages.filter((page) => page.needsReview).map((page) => ({ title: page.title, sourceUrl: page.sourceUrl })),
  visualSourceNotImported: pages.filter((page) => page.visualSourceNotImported).map((page) => ({ title: page.title, sourceUrl: page.sourceUrl })),
};

await mkdir(outputDir, { recursive: true });
await writeFile(dataPath, `export const valacoTechnicalCategories = ${JSON.stringify(categories, null, 2)};\n\nexport const valacoTechnicalPages = ${JSON.stringify(pages, null, 2)};\n`, 'utf8');
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
