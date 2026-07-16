import * as cheerio from 'cheerio';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'src', 'data', 'flangeTechnicalSpecs.js');
const base = 'https://casadasvalvulasmg.com.br';

const flangePages = [
  ['flange-cego', '/produtos/flanges/flange-cego/'],
  ['flange-pescoco', '/produtos/flanges/flange-wn-com-pescoco/'],
  ['flange-slip-on', '/produtos/flanges/flange-so-slip-on/'],
  ['flange-encaixe', '/produtos/flanges/flange-sw-encaixe/'],
  ['flange-roscado', '/produtos/flanges/flange-roscado/'],
  ['flange-solto', '/produtos/flanges/flange-solto/'],
  ['flange-liso', '/produtos/flanges/flange-liso-sobreposto-plano/'],
  ['orificio-pescoco', '/produtos/flanges/orificio-pescoco/'],
  ['orificio-slip-on', '/produtos/flanges/orificio-tipo-sobreposto/'],
  ['orificio-roscado', '/produtos/flanges/orificio-tipo-roscado/'],
  ['de-reducao', '/produtos/flanges/flange-de-reducao/'],
];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function brandTechnicalText(value) {
  return value
    .replace(/Casa das Válvulas/g, 'AltaPress')
    .replace(/Casa das Valvulas/g, 'AltaPress');
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
    const text = $(link).text().replace(/\s+/g, ' ').trim();

    if (!text || href.href === page.href || !href.pathname.startsWith(page.pathname)) {
      return;
    }

    if (href.pathname.split('/').filter(Boolean).length !== pageDepth + 1) {
      return;
    }

    links.set(href.href, text.replace(/^•\s*/, ''));
  });

  return [...links].map(([href, text]) => ({ href, text }));
}

function extractSpec($, url, itemSlug, standardSlug, optionSlug) {
  const title = $('h1').first().text().replace(/\s+/g, ' ').trim();
  const images = [];
  const characteristics = [];

  $('img').each((_, image) => {
    const src = $(image).attr('src') || '';
    const alt = $(image).attr('alt')?.replace(/\s+/g, ' ').trim() || 'Imagem técnica';

    if (!src.includes('/wp-content/uploads/') || src.includes('LOGO')) {
      return;
    }

    const imageUrl = new URL(src, base).href;
    if (!images.some((item) => item.src === imageUrl)) {
      images.push({ src: imageUrl, alt });
    }
  });

  const characteristicsBox = $('h2').filter((_, heading) =>
    $(heading).text().replace(/\s+/g, ' ').trim().toLowerCase() === 'características'
  ).first().parent().find('.text').first();

  if (characteristicsBox.length) {
    const normalizedHtml = characteristicsBox.html()?.replace(/<br\s*\/?>/gi, '\n') ?? '';
    const text = cheerio.load(`<div>${normalizedHtml}</div>`)('div').text();

    for (const line of text.split('\n')) {
      const cleanLine = line.replace(/\s+/g, ' ').trim();

      if (cleanLine) {
        characteristics.push(brandTechnicalText(cleanLine));
      }
    }
  }

  const tables = [];

  $('table').each((_, table) => {
    const rows = [];

    $(table).find('tr').each((__, row) => {
      const cells = [];

      $(row).find('th,td').each((___, cell) => {
        cells.push(brandTechnicalText($(cell).text().replace(/\s+/g, ' ').trim()));
      });

      if (cells.length) {
        rows.push(cells);
      }
    });

    if (rows.length) {
      tables.push(rows);
    }
  });

  if (!tables.length) {
    return null;
  }

  return {
    itemSlug,
    standardSlug,
    optionSlug,
    title,
    sourceUrl: url,
    note: '*Todos os desenhos e imagens são meramente ilustrativos.',
    characteristics,
    images: images.slice(0, 2),
    tables,
  };
}

async function scrape() {
  const specs = {};

  for (const [itemSlug, itemPath] of flangePages) {
    const itemUrl = new URL(itemPath, base).href;
    const itemPage = await fetchPage(itemUrl);
    const standardLinks = getChildLinks(itemPage, itemUrl);

    for (const standardLink of standardLinks) {
      const standardSlug = slugify(standardLink.text);
      const standardPage = await fetchPage(standardLink.href);
      const optionLinks = getChildLinks(standardPage, standardLink.href);
      const finalLinks = optionLinks.length ? optionLinks : [standardLink];

      for (const optionLink of finalLinks) {
        const optionSlug = slugify(optionLink.text);
        const optionPage = await fetchPage(optionLink.href);
        const spec = extractSpec(optionPage, optionLink.href, itemSlug, standardSlug, optionSlug);

        if (!spec) {
          continue;
        }

        specs[itemSlug] ??= {};
        specs[itemSlug][standardSlug] ??= {};
        specs[itemSlug][standardSlug][optionSlug] = spec;
      }
    }

    console.log(`scraped ${itemSlug}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `export const flangeTechnicalSpecs = ${JSON.stringify(specs, null, 2)};\n`, 'utf8');
}

await scrape();
