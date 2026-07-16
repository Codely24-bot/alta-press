import * as cheerio from 'cheerio';
import { writeFile } from 'node:fs/promises';
import { productTechnicalSpecs } from '../src/data/productTechnicalSpecs.js';

const outputPath = 'src/data/productTechnicalSpecs.js';

const valacoSources = {
  'esfera/construcao/tripartida': 'https://www.valaco.com.br/produtos/val_esfera_tri.html',
  'gaveta/modelo/haste-ascendente': 'https://www.valaco.com.br/produtos/val_gaveta_ha.html',
  'gaveta/modelo/haste-fixa': 'https://www.valaco.com.br/produtos/val_gaveta_hf.html',
  'retencao/modelo/aerodinamica': 'https://www.valaco.com.br/produtos/val_retencao_horizontal_aero.html',
  'retencao/modelo/horizontal-pistao': 'https://www.valaco.com.br/produtos/val_retencao_horizontal_pistao.html',
  'retencao/modelo/portinhola': 'https://www.valaco.com.br/produtos/val_retencao_portinhola.html',
  'retencao/modelo/retencao-wafer': 'https://www.valaco.com.br/produtos/val_retencao_wafer.html',
  'retencao/modelo/retencao-vertical': 'https://www.valaco.com.br/produtos/val_retencao_vertical.html',
  'tipo-cesto/modelo/cesto-simples': 'https://www.valaco.com.br/produtos/filtro_cesto_simples.html',
  'tipo-cesto/modelo/flangeado': 'https://www.valaco.com.br/produtos/filtro_cesto.html',
  'tipo-y/conexao/flangeado': 'https://www.valaco.com.br/produtos/filtro_y_flg.html',
  'tipo-y/conexao/rosca': 'https://www.valaco.com.br/produtos/filtro_y_rscsw.html',
  'tipo-y/conexao/bronze': 'https://www.valaco.com.br/produtos/filtro_y_rscsw_brz.html',
  'indicador-de-nivel/aplicacao/indicador-de-nivel': 'https://www.valaco.com.br/produtos/indicador_nivel_brz.html',
  'indicador-de-nivel/aplicacao/modelo-sob-consulta': 'https://www.valaco.com.br/produtos/indicador_nivel_brz.html',
};

const tubularSources = {
  cap: 'https://www.valaco.com.br/produtos/conexoes_tb_cap.html',
  'curva-45': 'https://www.valaco.com.br/produtos/conexoes_tb_curva_45.html',
  'curva-90': 'https://www.valaco.com.br/produtos/conexoes_tb_curva_90.html',
  'curva-180': 'https://www.valaco.com.br/produtos/conexoes_tb_curva_180.html',
  pestana: 'https://www.valaco.com.br/produtos/conexoes_tb_pestana.html',
  'reducao-concent': 'https://www.valaco.com.br/produtos/conexoes_tb_reducao_conc.html',
  'reducao-excent': 'https://www.valaco.com.br/produtos/conexoes_tb_reducao_exc.html',
  'te-45': 'https://www.valaco.com.br/produtos/conexoes_tb_te_45.html',
  'te-45-de-reducao': 'https://www.valaco.com.br/produtos/conexoes_tb_te_45_red.html',
  'te-90': 'https://www.valaco.com.br/produtos/conexoes_tb_te_90.html',
  'te-90-de-reducao': 'https://www.valaco.com.br/produtos/conexoes_tb_te_90_red.html',
};

function cleanText(value) {
  return value
    .replace(/Val Aço/g, 'AltaPress')
    .replace(/Valaco/g, 'AltaPress')
    .replace(/Casa das Válvulas/g, 'AltaPress')
    .replace(/\s+/g, ' ')
    .trim();
}

function tableFromRows(rows) {
  return rows
    .map((row) => row.map(cleanText).filter(Boolean))
    .filter((row) => row.length);
}

async function fetchSpecFromUrl(url) {
  const response = await fetch(url);

  if (!response.ok) {
    return null;
  }

  const $ = cheerio.load(await response.text());
  const bodyText = cleanText($('body').text());
  const lines = bodyText
    .split(/(?=•)|(?<=;)\s+|(?<=\.)\s+|\n+/)
    .map(cleanText)
    .filter((line) =>
      line.length > 18 &&
      !/Termos de Uso|Política de Privacidade|Imprimir esta página|Não encontrou|Reportar link|website/i.test(line)
    );
  const characteristics = lines.slice(0, 12);
  const tables = [];

  $('table').each((_, table) => {
    const rows = [];

    $(table).find('tr').each((__, row) => {
      const cells = [];

      $(row).find('th,td').each((___, cell) => {
        cells.push($(cell).text());
      });

      if (cells.some((cell) => cleanText(cell))) {
        rows.push(cells);
      }
    });

    const parsed = tableFromRows(rows);
    if (parsed.length > 1) {
      tables.push(parsed);
    }
  });

  return {
    characteristics,
    tables,
    sourceUrl: url,
  };
}

function getSpec(pathKey) {
  const [itemSlug, standardSlug, optionSlug] = pathKey.split('/');
  return productTechnicalSpecs[itemSlug]?.[standardSlug]?.[optionSlug] ?? null;
}

function mergeSpec(pathKey, patch) {
  const spec = getSpec(pathKey);

  if (!spec || !patch) {
    return;
  }

  if ((spec.characteristics?.length ?? 0) < 2 && patch.characteristics?.length) {
    spec.characteristics = patch.characteristics;
  }

  if (!(spec.tables?.length) && patch.tables?.length) {
    spec.tables = patch.tables;
  }

  spec.sourceUrl = patch.sourceUrl ?? spec.sourceUrl;
}

function setGeneric(pathKey, characteristics, tableTitle = 'Aplicação técnica') {
  const spec = getSpec(pathKey);

  if (!spec) {
    return;
  }

  if ((spec.characteristics?.length ?? 0) < 2) {
    spec.characteristics = characteristics;
  }

  if (!(spec.tables?.length)) {
    spec.tables = [
      [
        ['Item', 'Especificação'],
        [tableTitle, spec.title],
        ['Fornecimento', 'Material, bitola e acabamento sob consulta técnica'],
      ],
    ];
  }
}

function enrichForgedConnection(pathKey, kind) {
  setGeneric(pathKey, [
    `Conexão forjada para alta pressão com extremidade ${kind}.`,
    'Aplicação em linhas industriais de vapor, óleo, gás, água e fluidos compatíveis.',
    'Materiais usuais sob consulta: aço carbono, aço inoxidável e outras ligas conforme necessidade da operação.',
    'Classe, bitola e acabamento definidos conforme pressão de trabalho e norma aplicável.',
  ], 'Conexões forjadas');
}

function enrichMalleableConnection(pathKey) {
  setGeneric(pathKey, [
    'Conexão em ferro maleável para tubulações industriais e prediais com rosca BSP ou NPT.',
    'Produzida para montagem roscada, com opções preto ou galvanizado conforme aplicação.',
    'Faixas de pressão e temperatura devem ser confirmadas conforme norma ISO 49/NBR 6943, ASME/ANSI B16.3 ou ASME/ANSI B16.39.',
    'Bitolas e acabamentos definidos sob consulta técnica.',
  ], 'Conexão ferro maleável');
}

function enrichTubularConnection(pathKey) {
  setGeneric(pathKey, [
    'Conexão tubular para solda de topo em sistemas industriais de condução de fluidos.',
    'Dimensões usuais conforme ANSI/ASME B16.9, B16.28 ou MSS SP-43, conforme o tipo de conexão.',
    'Materiais usuais sob consulta: aço carbono ASTM A234 WPB, aço inoxidável AISI 304/304L, AISI 316/316L e outras ligas.',
    'Schedule, diâmetro e raio definidos conforme projeto e pressão de trabalho.',
  ], 'Conexão tubular');
}

function enrichSimple(pathKey, characteristics, tableTitle) {
  setGeneric(pathKey, characteristics, tableTitle);
}

for (const [optionSlug, url] of Object.entries(tubularSources)) {
  valacoSources[`conexoes-tubulares/tipos/${optionSlug}`] = url;
}

for (const [pathKey, url] of Object.entries(valacoSources)) {
  mergeSpec(pathKey, await fetchSpecFromUrl(url));
}

for (const optionSlug of Object.keys(productTechnicalSpecs['alta-pressao']?.forjadas ?? {})) {
  enrichForgedConnection(`alta-pressao/forjadas/${optionSlug}`, optionSlug.includes('solda') ? 'solda SW' : 'rosca NPT/BSP');
}

for (const optionSlug of Object.keys(productTechnicalSpecs['ferro-maleavel']?.tipos ?? {})) {
  enrichMalleableConnection(`ferro-maleavel/tipos/${optionSlug}`);
}

for (const optionSlug of Object.keys(productTechnicalSpecs['conexoes-tubulares']?.tipos ?? {})) {
  enrichTubularConnection(`conexoes-tubulares/tipos/${optionSlug}`);
}

enrichSimple('retencao/modelo/fundo-de-poco', [
  'Válvula de retenção tipo fundo de poço utilizada em linhas de sucção para manter a coluna de líquido e impedir retorno do fluido.',
  'Aplicação típica em bombas, captação e sistemas hidráulicos que exigem retenção automática no sentido inverso.',
  'Material, conexão, bitola e classe de pressão definidos conforme fluido e condição de operação.',
], 'Retenção fundo de poço');

enrichSimple('fita-ptfe/tipo/fita-veda-rosca', [
  'Fita veda rosca em PTFE indicada para vedação de conexões roscadas.',
  'Aplicação em instalações hidráulicas, pneumáticas e industriais compatíveis com PTFE.',
  'Fornecimento em rolos e medidas sob consulta.',
], 'Vedação PTFE');

enrichSimple('fita-ptfe/tipo/ptfe', [
  'PTFE com alta estabilidade química e baixo coeficiente de atrito.',
  'Indicado para vedação de roscas e aplicações compatíveis com a faixa de trabalho do material.',
  'Medidas e apresentação conforme necessidade de fornecimento.',
], 'PTFE');

enrichSimple('termometros/modelo/capela', [
  'Termômetro tipo capela para indicação local de temperatura em processos industriais.',
  'Disponível em faixas de medição e comprimentos de haste sob consulta.',
  'Aplicação em linhas de vapor, água, óleo e outros fluidos compatíveis.',
], 'Termômetro capela');

enrichSimple('pressostatos/aplicacao/controle-de-pressao', [
  'Pressostato para controle, alarme ou proteção por pressão em sistemas industriais.',
  'Faixa de ajuste, contato elétrico e conexão definidos conforme o processo.',
  'Aplicação em bombas, compressores, linhas hidráulicas e pneumáticas.',
], 'Pressostato');

enrichSimple('pressostatos/aplicacao/faixa-sob-consulta', [
  'Faixa de pressão selecionada conforme ponto de atuação, fluido e condição de operação.',
  'Configurações elétricas e mecânicas sob consulta técnica.',
  'Aplicação em automação, proteção e monitoramento de sistemas pressurizados.',
], 'Faixa de pressão');

const serialized = JSON.stringify(productTechnicalSpecs, null, 2);
await writeFile(outputPath, `export const productTechnicalSpecs = ${serialized};\n`, 'utf8');
