import * as cheerio from 'cheerio';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'src', 'data', 'productTechnicalSpecs.js');
const base = 'https://casadasvalvulasmg.com.br';

const productSources = [
  ['angular', 'material', '/produtos/valvulas/angular/'],
  ['borboleta', 'tipo-construtivo', '/produtos/valvulas/borboleta/'],
  ['descarga-de-caldeira', 'aplicacao', '/produtos/valvulas/aquecimento-e-refrigeracao/vapor-e-fluidos-termicos/', ['Descarga de caldeira']],
  ['diafragma', 'tipo', '/produtos/valvulas/diafragma/'],
  ['esfera', 'construcao', '/produtos/valvulas/esfera/'],
  ['gaveta', 'modelo', '/produtos/valvulas/gaveta/'],
  ['globo', 'modelo', '/produtos/valvulas/globo/'],
  ['guilhotina', 'modelo', '/produtos/valvulas/guilhotina/'],
  ['macho', 'aplicacao', '/produtos/valvulas/aquecimento-e-refrigeracao/vapor-e-fluidos-termicos/', ['Passagem reta', 'Classe e bitola sob consulta']],
  ['mangote', 'corpo', '/produtos/valvulas/mangote/'],
  ['para-hidrante', 'aplicacao', '/produtos/combate-incendio/valvula-angular/', ['Registro Hidrante', 'Combate a incêndio']],
  ['passagem-reta', 'aplicacao', '/produtos/valvulas/aquecimento-e-refrigeracao/vapor-e-fluidos-termicos/', ['Passagem reta', 'Classe e bitola sob consulta']],
  ['redutora-de-pressao', 'aplicacao', '/produtos/valvulas/aquecimento-e-refrigeracao/vapor-e-fluidos-termicos/', ['Controle de pressão', 'Classe e bitola sob consulta']],
  ['retencao', 'modelo', '/produtos/valvulas/retencao/'],
  ['seguranca-e-alivio', 'aplicacao', '/produtos/valvulas/seguranca-e-alivio/', ['Segurança', 'Alívio', 'Calibração sob consulta']],
  ['solenoide', 'aplicacao', '/produtos/valvulas/aquecimento-e-refrigeracao/valvula-de-refrigeracao/', ['Acionamento elétrico', 'Classe e bitola sob consulta']],
  ['alta-pressao', 'forjadas', '/produtos/conexoes/conexoes-forjadas/'],
  ['ferro-maleavel', 'tipos', '/produtos/conexoes/conexoes-ferro-maleavel-tupy/'],
  ['colares', 'aplicacao', '/produtos/conexoes/alvenius/acoplamento-k20/', ['Colar metálico', 'Bitola sob consulta']],
  ['conexoes-tubulares', 'tipos', '/produtos/conexoes/conexoes-tubulares/'],
  ['tipo-cesto', 'modelo', '/produtos/acessorios/filtro/', ['Cesto Simples', 'Flangeado']],
  ['tipo-y', 'conexao', '/produtos/acessorios/filtro/', ['Flangeado', 'Rosca', 'Bronze']],
  ['boia', 'tipo', '/produtos/acessorios/purgador/tipo-boia/', ['Tipo Boia', 'Especificação sob consulta']],
  ['termodinamico', 'tipo', '/produtos/acessorios/purgador/termodinamico/', ['Termodinâmico', 'Especificação sob consulta']],
  ['fita-ptfe', 'tipo', '/produtos/diversos/fita-veda-rosca/', ['Fita veda rosca', 'PTFE']],
  ['junta-de-vedacao', 'tipo', '/produtos/diversos/junta-vedacao/', ['Junta Vedação', 'Material sob consulta']],
  ['manometros', 'aplicacao', '/produtos/instrumentacao/manometro/', ['Pressão', 'Faixa sob consulta']],
  ['termometros', 'modelo', '/produtos/instrumentacao/termometro/'],
  ['pressostatos', 'aplicacao', '/produtos/instrumentacao/pressostato/', ['Controle de pressão', 'Faixa sob consulta']],
  ['vacuometros', 'aplicacao', '/produtos/instrumentacao/manometro/', ['Vácuo', 'Faixa sob consulta']],
  ['grampo-u', 'aplicacao', '/produtos/diversos/grampo-u/', ['Fixação', 'Bitola sob consulta']],
  ['indicador-de-nivel', 'aplicacao', '/produtos/instrumentacao/indicador-local/', ['Indicador de nível', 'Modelo sob consulta']],
  ['juntas-de-expansao', 'modelo', '/produtos/acessorios/junta-de-expansao/'],
  ['visor-de-fluxo', 'conexao', '/produtos/acessorios/visor/'],
];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanText(value) {
  return value
    .replace(/Casa das Válvulas/g, 'AltaPress')
    .replace(/Casa das Valvulas/g, 'AltaPress')
    .replace(/casadasvalvulasmg/gi, 'altapress')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchPage(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return cheerio.load(await response.text());
}

function getChildLinks($, pageUrl) {
  const page = new URL(pageUrl);
  const pageDepth = page.pathname.split('/').filter(Boolean).length;
  const links = new Map();

  $('a[href]').each((_, link) => {
    const href = new URL($(link).attr('href'), base);
    const text = cleanText($(link).text()).replace(/^•\s*/, '');

    if (!text || href.href === page.href || !href.pathname.startsWith(page.pathname)) {
      return;
    }

    if (href.pathname.split('/').filter(Boolean).length !== pageDepth + 1) {
      return;
    }

    links.set(href.href, text);
  });

  return [...links].map(([href, text]) => ({ href, text }));
}

function extractTextBlocks($) {
  const blocks = [];
  const selectors = [
    '.text',
    '.entry-content',
    '.post-content',
    '.elementor-widget-text-editor',
    'main',
  ];

  for (const selector of selectors) {
    $(selector).each((_, element) => {
      const text = cleanText($(element).text());

      if (
        text.length > 40 &&
        !text.includes('Produtos Válvulas Conexões Flanges') &&
        !blocks.some((item) => item === text)
      ) {
        blocks.push(text);
      }
    });

    if (blocks.length) {
      break;
    }
  }

  return blocks.slice(0, 8);
}

function extractSpec($, url, itemSlug, standardSlug, optionSlug, fallbackTitle) {
  const title = cleanText($('h1').first().text()) || fallbackTitle;
  const characteristics = [];
  const textBlocks = extractTextBlocks($);

  const characteristicsBox = $('h2').filter((_, heading) =>
    cleanText($(heading).text()).toLowerCase() === 'características'
  ).first().parent().find('.text').first();

  if (characteristicsBox.length) {
    const normalizedHtml = characteristicsBox.html()?.replace(/<br\s*\/?>/gi, '\n') ?? '';
    const text = cheerio.load(`<div>${normalizedHtml}</div>`)('div').text();

    for (const line of text.split('\n')) {
      const cleanLine = cleanText(line);

      if (cleanLine) {
        characteristics.push(cleanLine);
      }
    }
  }

  if (!characteristics.length) {
    for (const block of textBlocks) {
      const sentences = block
        .split(/(?<=[.;:])\s+/)
        .map((line) => cleanText(line))
        .filter((line) => line.length > 12);

      characteristics.push(...sentences.slice(0, 10));
    }
  }

  const images = [];

  $('img').each((_, image) => {
    const src = $(image).attr('src') || '';
    const alt = cleanText($(image).attr('alt') || title || 'Imagem técnica');

    if (!src.includes('/wp-content/uploads/') || /logo|favicon/i.test(src)) {
      return;
    }

    const imageUrl = new URL(src, base).href;
    if (!images.some((item) => item.src === imageUrl)) {
      images.push({ src: imageUrl, alt });
    }
  });

  const tables = [];

  $('table').each((_, table) => {
    const rows = [];

    $(table).find('tr').each((__, row) => {
      const cells = [];

      $(row).find('th,td').each((___, cell) => {
        cells.push(cleanText($(cell).text()));
      });

      if (cells.some(Boolean)) {
        rows.push(cells);
      }
    });

    if (rows.length) {
      tables.push(rows);
    }
  });

  return {
    itemSlug,
    standardSlug,
    optionSlug,
    title,
    sourceUrl: url,
    note: '*Todos os desenhos e imagens são meramente ilustrativos.',
    characteristics: characteristics.filter((line, index, list) => line && list.indexOf(line) === index).slice(0, 18),
    images: images.slice(0, 2),
    tables,
  };
}

async function scrape() {
  const specs = {};

  for (const [itemSlug, standardSlug, rootPath, aliases] of productSources) {
    const pageUrl = new URL(rootPath, base).href;
    const page = await fetchPage(pageUrl);
    const children = aliases?.length ? [] : getChildLinks(page, pageUrl);
    const targets = children.length
      ? children.map((child) => ({ url: child.href, label: child.text }))
      : (aliases?.length ? aliases : [cleanText(page('h1').first().text()) || itemSlug]).map((label) => ({ url: pageUrl, label }));

    for (const target of targets) {
      const optionSlug = slugify(target.label);
      const optionPage = target.url === pageUrl ? page : await fetchPage(target.url);
      const spec = extractSpec(optionPage, target.url, itemSlug, standardSlug, optionSlug, target.label);

      specs[itemSlug] ??= {};
      specs[itemSlug][standardSlug] ??= {};
      specs[itemSlug][standardSlug][optionSlug] = spec;
    }

    console.log(`scraped ${itemSlug}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `export const productTechnicalSpecs = ${JSON.stringify(specs, null, 2)};\n`, 'utf8');
}

await scrape();
