import { writeFile } from 'node:fs/promises';
import { productTechnicalSpecs } from '../src/data/productTechnicalSpecs.js';

const outputPath = 'src/data/productTechnicalSpecs.js';

const bulletPattern = /(?=•)|(?=\u00e2\u20ac\u00a2)/;

function isNoise(value) {
  return /Termos de Uso|Politica de Privacidade|Pol.tica de Privacidade|Imprimir esta p.gina|Nao encontrou|N.o encontrou|Reportar link|website|Tel\.:|Instagram|WhatsApp|Tudo flui bem|ga\(|sc_project|statcounter|document\.write|var sc_|UA-\d|counter\.js|javascript|CONSTRU..O DA V.LVULA E FIGURAS/i.test(
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
  );
}

function splitLongCharacteristic(value) {
  return String(value)
    .split(bulletPattern)
    .flatMap((part) => part.split(/(?<=;)\s+|(?<=\.)\s+/))
    .map((line) => line.replace(/^\u00e2\u20ac\u00a2\s*/, '• ').replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 12 && line.length < 240 && !isNoise(line));
}

function cleanCharacteristics(characteristics = []) {
  const lines = characteristics.flatMap(splitLongCharacteristic);
  return [...new Set(lines)].slice(0, 10);
}

function tableLooksTechnical(table) {
  if (!Array.isArray(table) || table.length < 2) {
    return false;
  }

  const flat = table.flat().join(' ');
  const flatPlain = flat.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const maxCellLength = Math.max(...table.flat().map((cell) => String(cell).length));
  const maxRowCells = Math.max(...table.map((row) => row.length));
  const rowsWithMultipleCells = table.filter((row) => row.length > 1).length;
  const bulletRows = table.filter((row) => /^(\u2022|\u00e2\u20ac\u00a2)$/.test(String(row[0]))).length;
  const hasTechnicalWord =
    /DN|NPS|Classe|Pressao|Temperatura|Diametro|Bitola|Dimensao|Peso|Face|Material|Descricao|Schedule|Espessura|Figura|Norma|Vazao|Rosca|Comprimento|Altura|Largura|PN|LBS|PSI|mm|kg/i.test(
      flatPlain,
    );
  const hasLayoutDuplication =
    /CARACTERISTICAS\s+(\u2022|\u00e2\u20ac\u00a2)|Propriedades Especificacoes.*Propriedades Especificacoes|VALVULAS DE ESFERA Extremidade/i.test(
      flatPlain,
    );

  return (
    rowsWithMultipleCells >= 2 &&
    hasTechnicalWord &&
    maxCellLength < 180 &&
    maxRowCells <= 12 &&
    bulletRows < table.length / 2 &&
    !hasLayoutDuplication &&
    !isNoise(flat)
  );
}

function cleanTables(tables = []) {
  const cleaned = tables
    .map((table) =>
      table
        .map((row) => row.map((cell) => String(cell).replace(/\s+/g, ' ').trim()).filter(Boolean))
        .filter((row) => row.length),
    )
    .filter(tableLooksTechnical);

  const unique = [];
  const seen = new Set();

  for (const table of cleaned) {
    const key = JSON.stringify(table.slice(0, 4));
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(table);
    }
  }

  return unique.slice(0, 2);
}

function ensureFallbackTable(spec) {
  if (spec.tables?.length) {
    return;
  }

  spec.tables = [
    [
      ['Item', 'Especificacao'],
      ['Produto', spec.title],
      ['Fornecimento', 'Material, bitola e classe sob consulta tecnica'],
    ],
  ];
}

for (const standards of Object.values(productTechnicalSpecs)) {
  for (const options of Object.values(standards)) {
    for (const spec of Object.values(options)) {
      spec.characteristics = cleanCharacteristics(spec.characteristics);
      spec.tables = cleanTables(spec.tables);

      if (spec.characteristics.length < 2) {
        spec.characteristics = [
          `${spec.title} para aplicacao industrial conforme condicao de operacao.`,
          'Material, bitola, classe de pressao e acabamento definidos sob consulta tecnica.',
          'Fornecimento conforme disponibilidade e requisitos do projeto.',
        ];
      }

      ensureFallbackTable(spec);
    }
  }
}

await writeFile(outputPath, `export const productTechnicalSpecs = ${JSON.stringify(productTechnicalSpecs, null, 2)};\n`, 'utf8');
