import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'public', 'technical', 'docs');
const outputDir = path.join(root, 'public', 'technical', 'branded-docs');
const logoPath = path.join(root, 'src', 'assets', 'alta-press-chat-logo.png');

const navy = rgb(0.05, 0.11, 0.16);
const sky = rgb(0.58, 0.78, 0.88);
const pale = rgb(0.94, 0.98, 1);
const white = rgb(1, 1, 1);
const muted = rgb(0.36, 0.43, 0.51);

const documents = [
  ['especificacao-para-valvulas.pdf', 'Especificacao para Valvulas'],
  ['by-pass-em-valvulas.pdf', 'By-pass em Valvulas'],
  ['conexoes-auxiliares-valvulas.pdf', 'Conexoes Auxiliares em Valvulas'],
  ['rosca-bsp-e-npt.pdf', 'Rosca BSP e NPT'],
  ['solda-topo.pdf', 'Solda Topo - Butt Welding'],
  ['resistencia-dos-materiais.pdf', 'Resistencia dos Materiais'],
  ['schedule-de-tubos.pdf', 'Schedule de Tubos'],
  ['materiais.pdf', 'Materiais'],
  ['pressao-de-trabalho.pdf', 'Pressao de Trabalho'],
  ['dimensao-do-prisioneiro.pdf', 'Dimensao do Prisioneiro'],
  ['conversor-de-pressao.pdf', 'Conversor de Pressao'],
  ['conversor-de-temperatura.pdf', 'Conversor de Temperatura'],
  ['conversor-de-unidades.pdf', 'Conversor de Unidades'],
  ['conversor-polegada-milimetro.pdf', 'Conversor Polegada / Milimetro'],
  ['trigonometria.pdf', 'Trigonometria'],
];

function drawWrappedText(page, text, options) {
  const { x, y, maxWidth, lineHeight, font, size, color } = options;
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      currentLine = candidate;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    });
  });
}

function drawLogo(page, logo, x, y, maxWidth) {
  const scale = Math.min(maxWidth / logo.width, 1);
  const width = logo.width * scale;
  const height = logo.height * scale;
  page.drawImage(logo, { x, y, width, height });
  return { width, height };
}

async function brandPdf(fileName, title, logoBytes) {
  const sourceBytes = await readFile(path.join(sourceDir, fileName));
  const sourcePdf = await PDFDocument.load(sourceBytes);
  const outputPdf = await PDFDocument.create();

  const logo = await outputPdf.embedPng(logoBytes);
  const regular = await outputPdf.embedFont(StandardFonts.Helvetica);
  const bold = await outputPdf.embedFont(StandardFonts.HelveticaBold);

  const cover = outputPdf.addPage([595.28, 841.89]);
  const { width, height } = cover.getSize();

  cover.drawRectangle({ x: 0, y: 0, width, height, color: pale });
  cover.drawRectangle({ x: 0, y: height - 220, width, height: 220, color: navy });
  cover.drawRectangle({ x: 0, y: height - 224, width, height: 4, color: sky });
  drawLogo(cover, logo, 52, height - 138, 170);

  cover.drawText('Informacoes Tecnicas', {
    x: 52,
    y: height - 270,
    size: 15,
    font: bold,
    color: muted,
  });
  drawWrappedText(cover, title, {
    x: 52,
    y: height - 326,
    maxWidth: width - 104,
    lineHeight: 42,
    font: bold,
    size: 36,
    color: navy,
  });
  drawWrappedText(cover, 'Material tecnico organizado pela Alta Press para consulta em projetos, compras e manutencao industrial.', {
    x: 52,
    y: height - 460,
    maxWidth: width - 104,
    lineHeight: 20,
    font: regular,
    size: 13,
    color: muted,
  });

  cover.drawRectangle({ x: 52, y: 78, width: width - 104, height: 76, color: white });
  cover.drawText('Alta Press Valvulas e Conexoes', {
    x: 76,
    y: 124,
    size: 13,
    font: bold,
    color: navy,
  });
  cover.drawText('comercial@altapress.com.br  |  (31) 9 7267-1038', {
    x: 76,
    y: 102,
    size: 10,
    font: regular,
    color: muted,
  });

  const copiedPages = await outputPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
  copiedPages.forEach((page, index) => {
    outputPdf.addPage(page);
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    page.drawRectangle({ x: 0, y: pageHeight - 28, width: pageWidth, height: 28, color: navy, opacity: 0.96 });
    drawLogo(page, logo, 18, pageHeight - 23, 72);
    page.drawText('Alta Press | Informacoes Tecnicas', {
      x: Math.min(108, pageWidth / 2),
      y: pageHeight - 18,
      size: 8,
      font: bold,
      color: white,
    });

    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: 24, color: navy, opacity: 0.96 });
    page.drawText('comercial@altapress.com.br | (31) 9 7267-1038', {
      x: 18,
      y: 8,
      size: 7.5,
      font: regular,
      color: white,
    });
    page.drawText(`${index + 1}/${copiedPages.length}`, {
      x: pageWidth - 42,
      y: 8,
      size: 7.5,
      font: regular,
      color: white,
    });
  });

  const brandedBytes = await outputPdf.save();
  await writeFile(path.join(outputDir, fileName), brandedBytes);
}

await mkdir(outputDir, { recursive: true });
const logoBytes = await readFile(logoPath);

for (const [fileName, title] of documents) {
  await brandPdf(fileName, title, logoBytes);
  console.log(`branded ${fileName}`);
}
