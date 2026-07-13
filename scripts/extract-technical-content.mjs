import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'public', 'technical', 'docs');
const outputPath = path.join(root, 'src', 'data', 'technicalContent.js');

const documents = [
  {
    group: 'Especificação para válvulas',
    title: 'Especificação para válvulas',
    file: 'especificacao-para-valvulas.pdf',
    images: ['/technical/images/especificacao-valvulas.png'],
    description: 'Referência para especificar válvulas considerando tipo construtivo, aplicação, classe de pressão e condições de operação.',
  },
  {
    group: 'Válvulas - bypass',
    title: 'By-pass em válvulas',
    file: 'by-pass-em-valvulas.pdf',
    images: ['/technical/images/bypass-globo.png', '/technical/images/bypass-estrutura-gaveta.png', '/technical/images/bypass-gaveta.png'],
    description: 'Configurações de bypass para equalização de pressão e apoio à operação em válvulas de maior porte.',
  },
  {
    group: 'Conexões auxiliares',
    title: 'Conexões auxiliares em válvulas',
    file: 'conexoes-auxiliares-valvulas.pdf',
    images: [
      '/technical/images/conexoes-auxiliares-1.png',
      '/technical/images/conexoes-auxiliares-2.png',
      '/technical/images/conexoes-auxiliares-3.png',
      '/technical/images/conexoes-auxiliares-4.png',
      '/technical/images/conexoes-auxiliares-5.png',
      '/technical/images/conexoes-auxiliares-6.png',
    ],
    description: 'Arranjos e pontos de conexão auxiliares para drenagem, respiro, equalização e instrumentação em válvulas.',
  },
  {
    group: 'Rosca BSP e NPT',
    title: 'Rosca BSP e NPT',
    file: 'rosca-bsp-e-npt.pdf',
    images: ['/technical/images/rosca-npt-2.png', '/technical/images/rosca-npt-1.png', '/technical/images/rosca-bsp.png'],
    description: 'Comparativo entre padrões de rosca NPT, BSPT e BSPP, incluindo diferenças de vedação e aplicação.',
  },
  {
    group: 'Solda topo - Butt Welding',
    title: 'Solda topo',
    file: 'solda-topo.pdf',
    images: ['/technical/images/solda-topo-1.png', '/technical/images/solda-topo-2.png'],
    description: 'Informações sobre preparação, encaixe e referência visual para solda topo em tubulações e conexões.',
  },
  {
    group: 'Tabelas técnicas',
    title: 'Resistência dos materiais',
    file: 'resistencia-dos-materiais.pdf',
    images: ['/technical/images/tabelas-tecnicas.png'],
    description: 'Tabela de resistência dos materiais para consulta técnica.',
  },
  {
    group: 'Tabelas técnicas',
    title: 'Schedule de tubos',
    file: 'schedule-de-tubos.pdf',
    images: ['/technical/images/tabelas-tecnicas.png'],
    description: 'Tabela de schedule de tubos e equivalências dimensionais.',
  },
  {
    group: 'Tabelas técnicas',
    title: 'Materiais',
    file: 'materiais.pdf',
    images: ['/technical/images/tabelas-tecnicas.png'],
    description: 'Referência de materiais e especificações para aplicações industriais.',
  },
  {
    group: 'Tabelas técnicas',
    title: 'Pressão de trabalho',
    file: 'pressao-de-trabalho.pdf',
    images: ['/technical/images/tabelas-tecnicas.png'],
    description: 'Referência de pressão de trabalho por material, classe e temperatura.',
  },
  {
    group: 'Tabelas técnicas',
    title: 'Dimensão do prisioneiro',
    file: 'dimensao-do-prisioneiro.pdf',
    images: ['/technical/images/tabelas-tecnicas.png'],
    description: 'Dimensões de prisioneiros para flanges e montagens industriais.',
  },
  {
    group: 'Conversão de unidades',
    title: 'Conversor de pressão',
    file: 'conversor-de-pressao.pdf',
    images: ['/technical/images/conversao-unidades.png'],
    description: 'Tabela de conversão entre unidades de pressão.',
  },
  {
    group: 'Conversão de unidades',
    title: 'Conversor de temperatura',
    file: 'conversor-de-temperatura.pdf',
    images: ['/technical/images/conversao-unidades.png'],
    description: 'Tabela de conversão entre escalas de temperatura.',
  },
  {
    group: 'Conversão de unidades',
    title: 'Conversor de unidades',
    file: 'conversor-de-unidades.pdf',
    images: ['/technical/images/conversao-unidades.png'],
    description: 'Tabela de conversão entre unidades técnicas comuns.',
  },
  {
    group: 'Conversão de unidades',
    title: 'Polegada para milímetro',
    file: 'conversor-polegada-milimetro.pdf',
    images: ['/technical/images/conversao-unidades.png'],
    description: 'Equivalência entre frações de polegada e milímetros.',
  },
  {
    group: 'Trigonometria',
    title: 'Trigonometria',
    file: 'trigonometria.pdf',
    images: ['/technical/images/trigonometria.png'],
    description: 'Relações trigonométricas úteis em cálculos de campo, montagem e medição.',
  },
];

function normalizeLine(line) {
  return line
    .replace(/\s+/g, ' ')
    .replace(/([a-záéíóúàãõç])([A-ZÁÉÍÓÚÃÕÇ])/g, '$1 $2')
    .trim();
}

function pageItemsToLines(items) {
  const rows = new Map();

  for (const item of items) {
    if (!item.str?.trim()) {
      continue;
    }

    const y = Math.round(item.transform[5]);
    const x = item.transform[4];
    if (!rows.has(y)) {
      rows.set(y, []);
    }
    rows.get(y).push({ x, text: item.str });
  }

  return [...rows.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([, row]) => normalizeLine(row.sort((a, b) => a.x - b.x).map((item) => item.text).join(' ')))
    .filter(Boolean);
}

function linesToSections(lines) {
  const ignored = new Set(['www.casadasvalvulasmg.com.br']);
  const cleanLines = lines
    .map((line) => line.replace(/Casa das Válvulas/gi, '').replace(/casadasvalvulasmg/gi, '').trim())
    .filter((line) => line.length > 1 && !ignored.has(line));

  const sections = [];
  let current = { heading: 'Conteúdo técnico', lines: [] };

  for (const line of cleanLines) {
    const isHeading =
      line.length <= 72 &&
      !/[.;:]$/.test(line) &&
      (/^[A-ZÁÉÍÓÚÃÕÇ0-9\s/().-]+$/.test(line) || /^Tabela|^Figura|^Convers/i.test(line));

    if (isHeading && current.lines.length) {
      sections.push(current);
      current = { heading: line, lines: [] };
    } else if (isHeading && current.heading === 'Conteúdo técnico' && !current.lines.length) {
      current.heading = line;
    } else {
      current.lines.push(line);
    }
  }

  if (current.lines.length || current.heading !== 'Conteúdo técnico') {
    sections.push(current);
  }

  return sections.map((section) => ({
    ...section,
    lines: section.lines.filter((line, index, array) => line !== array[index - 1]),
  }));
}

async function extractDocument(document) {
  const bytes = await readFile(path.join(sourceDir, document.file));
  const pdf = await getDocument({ data: new Uint8Array(bytes), disableWorker: true }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    pages.push({
      pageNumber,
      sections: linesToSections(pageItemsToLines(textContent.items)),
    });
  }

  return {
    group: document.group,
    title: document.title,
    description: document.description,
    images: document.images,
    pages,
  };
}

await mkdir(path.dirname(outputPath), { recursive: true });
const content = [];

for (const document of documents) {
  content.push(await extractDocument(document));
  console.log(`extracted ${document.file}`);
}

await writeFile(
  outputPath,
  `export const technicalContent = ${JSON.stringify(content, null, 2)};\n`,
  'utf8',
);
