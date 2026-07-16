import * as cheerio from 'cheerio';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'src', 'data', 'technicalContent.js');

const pages = [
  {
    group: 'Válvulas',
    title: 'Especificação para válvulas',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/informacoes-tecnicas-para-valvulas/',
    description: 'Referência para especificar válvulas considerando tipo construtivo, aplicação, classe de pressão e condições de operação.',
  },
  {
    group: 'Válvulas',
    title: 'By-pass em válvulas',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/valvulas-bypass/',
    description: 'Configurações de bypass para equalização de pressão e apoio à operação em válvulas de maior porte.',
  },
  {
    group: 'Válvulas',
    title: 'Conexões auxiliares em válvulas',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/valvulas-conexoes-auxiliares/',
    description: 'Arranjos e pontos de conexão auxiliares para drenagem, respiro, equalização e instrumentação em válvulas.',
  },
  {
    group: 'Roscas',
    title: 'Rosca BSP e NPT',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/rosca-bsp-e-npt/',
    description: 'Comparativo entre padrões de rosca NPT, BSPT e BSPP, incluindo diferenças de vedação e aplicação.',
  },
  {
    group: 'Solda',
    title: 'Solda topo - Butt Welding',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/solda-topo-butt-welding/',
    description: 'Informações sobre preparação, encaixe e referência visual para solda topo em tubulações e conexões.',
  },
  {
    group: 'Tabelas',
    title: 'Tabelas técnicas',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/tabelas-tecnicas/',
    description: 'Materiais técnicos de consulta para materiais, tubos, pressão de trabalho e dimensões.',
  },
  {
    group: 'Conversões',
    title: 'Conversão de unidades',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/conversao-de-unidades/',
    description: 'Conversores técnicos para pressão, temperatura, unidades gerais e equivalência entre polegada e milímetro.',
  },
  {
    group: 'Cálculos',
    title: 'Trigonometria',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/trigonometria/',
    description: 'Relações trigonométricas úteis em cálculos de campo, montagem e medição.',
  },
  {
    group: 'Materiais',
    title: 'Composição química',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/composicao-quimica/',
    description: 'Tabela de composição química com percentuais máximos por especificação ASTM.',
  },
  {
    group: 'Materiais',
    title: 'Propriedades mecânicas',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/propriedades-mecanicas/',
    description: 'Tabela de resistência à tração, limite de escoamento, alongamento, redução de área e dureza Brinell.',
  },
  {
    group: 'Conexões',
    title: 'Correlação da classe conexão/Sch tubo',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/correlacao-da-classe-conexao_sch-tubo/',
    description: 'Correlação entre classes de conexões roscadas/socket welding e o schedule/designação da parede do tubo.',
  },
  {
    group: 'Flanges',
    title: 'Mapa de normas para flanges',
    url: 'https://casadasvalvulasmg.com.br/informacoes-tecnicas/mapa-de-normas-para-flanges/',
    description: 'Mapas de normas para flanges ANSI B16.5, ANSI B16.36, AWWA, DIN e JIS.',
  },
];

const imageMap = new Map([
  ['Gaveta-corte_casadasvalvulasmg', '/technical/images/especificacao-valvulas.png'],
  ['Globo-bypass_casadasvalvulasmg', '/technical/images/bypass-globo.png'],
  ['Estrutura-Gaveta-bypass_casadasvalvulasmg', '/technical/images/bypass-estrutura-gaveta.png'],
  ['Gaveta-bypass_casadasvalvulasmg', '/technical/images/bypass-gaveta.png'],
  ['Estrutura-conexoes-auxiliares-1', '/technical/images/conexoes-auxiliares-1.png'],
  ['Estrutura-conexoes-auxiliares-2', '/technical/images/conexoes-auxiliares-2.png'],
  ['Estrutura-conexoes-auxiliares-3', '/technical/images/conexoes-auxiliares-3.png'],
  ['Estrutura-conexoes-auxiliares-4', '/technical/images/conexoes-auxiliares-4.png'],
  ['Estrutura-conexoes-auxiliares-5', '/technical/images/conexoes-auxiliares-5.png'],
  ['Estrutura-conexoes-auxiliares-6', '/technical/images/conexoes-auxiliares-6.png'],
  ['Estrutura-rosca-NPT2', '/technical/images/rosca-npt-2.png'],
  ['Estrutura-rosca-NPT1', '/technical/images/rosca-npt-1.png'],
  ['Estrutura-rosca-BSP', '/technical/images/rosca-bsp.png'],
  ['Estrutura-SOLDA-TOPO-300x298', '/technical/images/solda-topo-1.png'],
  ['Estrutura-SOLDA-TOPO2', '/technical/images/solda-topo-2.png'],
  ['Tabela-tecnica-1', '/technical/images/tabelas-tecnicas.png'],
  ['conversor-de-unidades', '/technical/images/conversao-unidades.png'],
  ['trigonometria-1', '/technical/images/trigonometria.png'],
]);

const allowedTags = new Set(['h2', 'h3', 'h4', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'img']);

function getLocalImage(src = '') {
  for (const [needle, localPath] of imageMap) {
    if (src.includes(needle)) {
      return localPath;
    }
  }
  return null;
}

function cleanNode($, node) {
  const element = $(node);

  element.find('script, style, iframe, form, .tab-pane, .sidebar, .table-responsive:empty').remove();
  element.find('a[href$=".pdf"], a[href*=".pdf"]').each((_, link) => {
    const text = $(link).text().trim();
    $(link).replaceWith(text ? `<span>${text}</span>` : '');
  });
  element.find('img').each((_, image) => {
    const localImage = getLocalImage($(image).attr('src'));
    if (!localImage) {
      $(image).remove();
      return;
    }

    $(image)
      .attr('src', localImage)
      .attr('alt', $(image).attr('alt') || 'Imagem técnica')
      .removeAttr('srcset')
      .removeAttr('sizes')
      .removeAttr('width')
      .removeAttr('height')
      .removeAttr('class')
      .removeAttr('style')
      .removeAttr('decoding')
      .removeAttr('fetchpriority');
  });

  element.find('*').each((_, child) => {
    const tagName = child.tagName?.toLowerCase();
    if (!allowedTags.has(tagName)) {
      $(child).replaceWith($(child).contents());
      return;
    }

    const childElement = $(child);
    for (const attribute of Object.keys(child.attribs ?? {})) {
      if (!(tagName === 'img' && ['src', 'alt'].includes(attribute))) {
        childElement.removeAttr(attribute);
      }
    }
  });

  element.find('p').each((_, paragraph) => {
    const paragraphElement = $(paragraph);
    const text = paragraphElement.text().replace(/\u00a0/g, ' ').trim();
    if (!text && paragraphElement.find('img').length === 0) {
      paragraphElement.remove();
    }
  });

  return element.html()
    .replace(/Casa das Válvulas/gi, 'AltaPress')
    .replace(/casadasvalvulasmg/gi, 'altapress')
    .replace(/\s+<\/(p|h2|h3|h4|li|td|th)>/g, '</$1>')
    .trim();
}

async function scrapePage(page) {
  const response = await fetch(page.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${page.url}: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html, { decodeEntities: true });
  const content = $('.single-solution-content').first();

  if (!content.length) {
    throw new Error(`Content not found for ${page.url}`);
  }

  return {
    group: page.group,
    title: page.title,
    description: page.description,
    html: cleanNode($, content),
  };
}

await mkdir(path.dirname(outputPath), { recursive: true });
const content = [];

for (const page of pages) {
  content.push(await scrapePage(page));
  console.log(`scraped ${page.title}`);
}

await writeFile(
  outputPath,
  `export const technicalContent = ${JSON.stringify(content, null, 2)};\n`,
  'utf8',
);
