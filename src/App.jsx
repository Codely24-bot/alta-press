import { useEffect, useRef, useState } from 'react';
import SupportChatWidget from './components/SupportChatWidget';
import { technicalContent } from './data/technicalContent';
import { businessProfile } from '../shared/supportKnowledge';
import altaPressMascotSupport from './assets/alta-press-mascot-support.png';
import altaPressHeroValvesWide from './assets/alta-press-hero-valves-wide.png';
import altaPressShowcaseGrid from './assets/alta-press-showcase-grid.png';
import altaPressAboutVideo from './assets/alta-press-about-video.mp4';
import altaPressShowcaseVideo from './assets/alta-press-showcase-video.mp4';
import instagramReelDa2l80jyzlo from './assets/instagram-reel-da2l80jyzlo.jpg';
import redebrasValvulasPlimat from './assets/redebras-valvulas-plimat-cortada.jpg';
import productAcessorios from './assets/product-categories/acessorios.png';
import productAcessorioFiltro from './assets/product-accessories-normalized/filtro.png';
import productAcessorioFiltroBronze from './assets/product-accessories-normalized/filtro-bronze.png';
import productAcessorioFiltroCestoSimples from './assets/product-accessories-normalized/filtro-cesto-simples.png';
import productAcessorioFiltroFlangeado from './assets/product-accessories-normalized/filtro-flangeado.png';
import productAcessorioJuntaExpansao from './assets/product-accessories-normalized/junta-expansao.png';
import productAcessorioJuntaExpansaoDuplaOnda from './assets/product-accessories-normalized/junta-expansao-dupla-onda.png';
import productAcessorioTorneiraTuboSifao from './assets/product-accessories-normalized/torneira-tubo-sifao.png';
import productAcessorioTuboSifao from './assets/product-accessories-normalized/tubo-sifao.png';
import productAcessorioVisor from './assets/product-accessories-normalized/visor.png';
import productAcessorioVisorBronze from './assets/product-accessories-normalized/visor-bronze.png';
import productAcessorioVisorFlangeado from './assets/product-accessories-normalized/visor-flangeado.png';
import productConexaoAltaPressao from './assets/product-connections-normalized/alta-pressao.png';
import productConexaoColares from './assets/product-connections-normalized/colares.png';
import productConexaoTubulares from './assets/product-connections-normalized/conexoes-tubulares.png';
import productConexaoFerroMaleavel from './assets/product-connections-normalized/ferro-maleavel.png';
import productTuboAcoCarbono from './assets/product-pipes/tubos-aco-carbono-card.png';
import productTuboAcoCarbonoUltra from './assets/product-pipes/tubos-aco-carbono-ultra-branded.png';
import productConexaoBuchaReducao from './assets/product-connections-options/bucha-reducao.png';
import productConexaoBujao from './assets/product-connections-options/bujao.png';
import productConexaoCap from './assets/product-connections-options/cap.png';
import productConexaoCotovelo45 from './assets/product-connections-options/cotovelo-45.png';
import productConexaoCotovelo90 from './assets/product-connections-options/cotovelo-90.png';
import productConexaoCotovelo90Mf from './assets/product-connections-options/cotovelo-90-mf.png';
import productConexaoCruzeta from './assets/product-connections-options/cruzeta.png';
import productConexaoCurva45 from './assets/product-connections-options/curva-45.png';
import productConexaoCurva45Femea from './assets/product-connections-options/curva-45-femea.png';
import productConexaoCurva45Mf from './assets/product-connections-options/curva-45-mf.png';
import productConexaoCurva90 from './assets/product-connections-options/curva-90.png';
import productConexaoCurva90Femea from './assets/product-connections-options/curva-90-femea.png';
import productConexaoCurva90Macho from './assets/product-connections-options/curva-90-macho.png';
import productConexaoCurva90Mf from './assets/product-connections-options/curva-90-mf.png';
import productConexaoCurva180 from './assets/product-connections-options/curva-180.png';
import productConexaoCurvaRetorno from './assets/product-connections-options/curva-retorno.png';
import productConexaoFerroTe45 from './assets/product-connections-options/ferro-te-45.png';
import productConexaoFerroTe90 from './assets/product-connections-options/ferro-te-90.png';
import productConexaoFerroTe90Reducao from './assets/product-connections-options/ferro-te-90-reducao.png';
import productConexaoFlangeSextavado from './assets/product-connections-options/flange-sextavado.png';
import productConexaoForjadaRosca from './assets/product-connections-options/forjada-rosca.png';
import productConexaoForjadaSolda from './assets/product-connections-options/forjada-solda.png';
import productConexaoLuva from './assets/product-connections-options/luva.png';
import productConexaoLuvaMf from './assets/product-connections-options/luva-mf.png';
import productConexaoLuvaReducao from './assets/product-connections-options/luva-reducao.png';
import productConexaoLuvaReducaoMf from './assets/product-connections-options/luva-reducao-mf.png';
import productConexaoNipleConcentrico from './assets/product-connections-options/niple-concentrico.png';
import productConexaoNipleDuplo from './assets/product-connections-options/niple-duplo.png';
import productConexaoNipleDuploReducao from './assets/product-connections-options/niple-duplo-reducao.png';
import productConexaoNipleExcentrico from './assets/product-connections-options/niple-excentrico.png';
import productConexaoPestana from './assets/product-connections-options/pestana.png';
import productConexaoReducaoConcentrica from './assets/product-connections-options/reducao-concentrica.png';
import productConexaoReducaoExcentrica from './assets/product-connections-options/reducao-excentrica.png';
import productConexaoTampao from './assets/product-connections-options/tampao.png';
import productConexaoTe45 from './assets/product-connections-options/te-45.png';
import productConexaoTe45Reducao from './assets/product-connections-options/te-45-reducao.png';
import productConexaoTe90 from './assets/product-connections-options/te-90.png';
import productConexaoTe90Reducao from './assets/product-connections-options/te-90-reducao.png';
import productConexaoUniao from './assets/product-connections-options/uniao.png';
import productDiversos from './assets/product-categories/diversos.png';
import productDiversoEngateRapido from './assets/product-diversos-normalized/engate-rapido.png';
import productDiversoEspigao from './assets/product-diversos-normalized/espigao.png';
import productDiversoGrampoU from './assets/product-diversos-normalized/grampo-u.png';
import productFlanges from './assets/product-categories/flanges.png';
import productFlangeCego from './assets/product-flanges-normalized/flange-cego.png';
import productFlangeReducao from './assets/product-flanges-normalized/flange-de-reducao.png';
import productFlangeEncaixe from './assets/product-flanges-normalized/flange-encaixe.png';
import productFlangeLiso from './assets/product-flanges-normalized/flange-liso.png';
import productFlangePescoco from './assets/product-flanges-normalized/flange-pescoco.png';
import productFlangeRoscado from './assets/product-flanges-normalized/flange-roscado.png';
import productFlangeSlipOn from './assets/product-flanges-normalized/flange-slip-on.png';
import productFlangeSolto from './assets/product-flanges-normalized/flange-solto.png';
import productInstrumentos from './assets/product-categories/instrumentos.png';
import productValvulas from './assets/product-categories/valvulas.png';
import productOrificioPescoco from './assets/product-flanges-normalized/orificio-pescoco.png';
import productOrificioRoscado from './assets/product-flanges-normalized/orificio-roscado.png';
import productOrificioSlipOn from './assets/product-flanges-normalized/orificio-slip-on.png';
import productInstrumentoManometro from './assets/product-instruments-normalized/manometro.png';
import productInstrumentoPressostatos from './assets/product-instruments-normalized/pressostatos.png';
import productInstrumentoTermometro from './assets/product-instruments-normalized/termometro.png';
import productInstrumentoVacuometro from './assets/product-instruments-normalized/vacuometro.png';
import productPurgadorBoia from './assets/product-purgadores-normalized/boia.png';
import productPurgadorTermodinamico from './assets/product-purgadores-normalized/termodinamico.png';
import productVedacaoFitaPtfe from './assets/product-vedacoes-normalized/fita-ptfe.png';
import productVedacaoJuntaVedacao from './assets/product-vedacoes-normalized/junta-vedacao.png';
import productValvulaAngular from './assets/product-valves-normalized/valvula-angular.png';
import productValvulaBorboleta from './assets/product-valves-normalized/valvula-borboleta.png';
import productValvulaDiafragma from './assets/product-valves-normalized/valvula-diafragma.png';
import productValvulaEsfera from './assets/product-valves-normalized/valvula-esfera.png';
import productValvulaGaveta from './assets/product-valves-normalized/valvula-gaveta.png';
import productValvulaGlobo from './assets/product-valves-normalized/valvula-globo.png';
import productValvulaMangote from './assets/product-valves-normalized/valvula-mangote.png';
import productValvulaRetencao from './assets/product-valves-normalized/valvula-retencao.png';
import productValvulaSegurancaAlivio from './assets/product-valves-normalized/valvula-seguranca-alivio.png';
import productValvulaOpcaoAngularAco from './assets/product-valves-options/angular__aco.png';
import productValvulaOpcaoAngularBronze from './assets/product-valves-options/angular__bronze.png';
import productValvulaOpcaoAngularFerroFundido from './assets/product-valves-options/angular__ferro-fundido.png';
import productValvulaOpcaoBorboletaLug from './assets/product-valves-options/borboleta__lug.png';
import productValvulaOpcaoBorboletaWafer from './assets/product-valves-options/borboleta__wafer.png';
import productValvulaOpcaoDiafragmaTipoA from './assets/product-valves-options/diafragma__tipo-a.png';
import productValvulaOpcaoDiafragmaTipoR from './assets/product-valves-options/diafragma__tipo-r-ou-kb.png';
import productValvulaOpcaoEsferaBipartida from './assets/product-valves-options/esfera__bipartida.png';
import productValvulaOpcaoEsferaMonobloco from './assets/product-valves-options/esfera__monobloco.png';
import productValvulaOpcaoEsferaTripartida from './assets/product-valves-options/esfera__tripartida.png';
import productValvulaOpcaoGavetaFechoRapido from './assets/product-valves-options/gaveta__fecho-rapido.png';
import productValvulaOpcaoGavetaHasteAscendente from './assets/product-valves-options/gaveta__haste-ascendente.png';
import productValvulaOpcaoGavetaHasteFixa from './assets/product-valves-options/gaveta__haste-fixa.png';
import productValvulaOpcaoGloboAerodinamica from './assets/product-valves-options/globo__aerodinamica.png';
import productValvulaOpcaoGloboAgulha from './assets/product-valves-options/globo__agulha.png';
import productValvulaOpcaoGloboBronze from './assets/product-valves-options/globo__bronze.png';
import productValvulaOpcaoGloboFerro from './assets/product-valves-options/globo__ferro.png';
import productValvulaOpcaoGloboForjada from './assets/product-valves-options/globo__forjada.png';
import productValvulaOpcaoGloboFundida from './assets/product-valves-options/globo__fundida.png';
import productValvulaGuilhotinaSerie03 from './assets/product-valves-guilhotina/guilhotina-serie-03.png';
import productValvulaGuilhotinaSerie03m from './assets/product-valves-guilhotina/guilhotina-serie-03m.png';
import productValvulaGuilhotinaSerie04 from './assets/product-valves-guilhotina/guilhotina-serie-04.png';
import productValvulaGuilhotinaSerie05n from './assets/product-valves-guilhotina/guilhotina-serie-05n.png';
import productValvulaGuilhotinaSerie07 from './assets/product-valves-guilhotina/guilhotina-serie-07.png';
import productValvulaGuilhotinaSerie15 from './assets/product-valves-guilhotina/guilhotina-serie-15.png';
import productValvulaSolenoide106 from './assets/product-valves-solenoides-normalized/solenoide-106.png';
import productValvulaSolenoide106b from './assets/product-valves-solenoides-normalized/solenoide-106b.png';
import productValvulaSolenoide107Diafragma from './assets/product-valves-solenoides-normalized/solenoide-107-diafragma.png';
import productValvulaSolenoide107Gas from './assets/product-valves-solenoides-normalized/solenoide-107-gas.png';
import productValvulaSolenoideB105 from './assets/product-valves-solenoides-normalized/solenoide-b105.png';
import productValvulaSolenoideB106 from './assets/product-valves-solenoides-normalized/solenoide-b106.png';
import productValvulaSolenoideB130 from './assets/product-valves-solenoides-normalized/solenoide-b130.png';
import productValvulaSolenoideB130a from './assets/product-valves-solenoides-normalized/solenoide-b130a.png';
import productValvulaSolenoideW124 from './assets/product-valves-solenoides-normalized/solenoide-w124.png';
import productValvulaOpcaoMangoteCorpoAberto from './assets/product-valves-options/mangote__corpo-aberto.png';
import productValvulaOpcaoMangoteCorpoFechado from './assets/product-valves-options/mangote__corpo-fechado.png';
import productValvulaOpcaoRetencaoAerodinamica from './assets/product-valves-options/retencao__aerodinamica.png';
import productValvulaOpcaoRetencaoFundoPoco from './assets/product-valves-options/retencao__fundo-de-poco.png';
import productValvulaOpcaoRetencaoHorizontalPistao from './assets/product-valves-options/retencao__horizontal-pistao.png';
import productValvulaOpcaoRetencaoPortinhola from './assets/product-valves-options/retencao__portinhola.png';
import productValvulaOpcaoRetencaoVertical from './assets/product-valves-options/retencao__retencao-vertical.png';
import productValvulaOpcaoRetencaoWafer from './assets/product-valves-options/retencao__retencao-wafer.png';
import productValvulaOpcaoSegurancaAlivio from './assets/product-valves-options/seguranca-e-alivio__alivio.png';
import productValvulaOpcaoSegurancaCalibracao from './assets/product-valves-options/seguranca-e-alivio__calibracao-sob-consulta.png';
import productValvulaOpcaoSeguranca from './assets/product-valves-options/seguranca-e-alivio__seguranca.png';

const guilhotinaGalleryModules = import.meta.glob('./assets/product-valves-guilhotina-gallery/*.png', {
  eager: true,
  import: 'default',
});

const guilhotinaGalleryImages = Object.fromEntries(
  Object.entries(guilhotinaGalleryModules).map(([path, src]) => [
    path.split('/').pop().replace('.png', ''),
    src,
  ])
);

const productValvulaVaporImages = {
  main: '/catalog-images/wp-content-uploads-2022-07-vapor-03-jpg-altapress.png',
  secondary: '/catalog-images/wp-content-uploads-2022-07-vapor-02-jpg-5e865439cc.png',
};

const productValvulaRefrigeracaoImages = {
  main: '/catalog-images/wp-content-uploads-2022-07-refrigeracao-01-symbol3d.png',
  secondary: '/catalog-images/wp-content-uploads-2022-07-refrigeracao-02-symbol3d.png',
};

const productValvulaIndustrialDulongImages = {
  tambor: '/catalog-images/dulong-industrial/valvula-tambor-1910-altapress.png',
  tamborAluminio: '/catalog-images/dulong-industrial/valvula-tambor-aluminio-1911-altapress.png',
  globoPedal: '/catalog-images/dulong-industrial/valvula-globo-pedal-1450-altapress.png',
  pedalAcabamento: '/catalog-images/dulong-industrial/valvula-pedal-acabamento-1451-altapress.png',
  indicadoraNivel: '/catalog-images/dulong-industrial/valvula-indicadora-nivel-1901-altapress.png',
  boia: '/catalog-images/dulong-industrial/valvula-boia-2150-altapress.png',
  bloqueioVolante: '/catalog-images/dulong-industrial/bloqueio-para-volante-2000-altapress.png',
  travaTambor: '/catalog-images/dulong-industrial/trava-para-tambor-1920-altapress.png',
  respiroHorizontal: '/catalog-images/dulong-industrial/respiro-tambor-horizontal-1930-altapress.png',
  respiroVertical: '/catalog-images/dulong-industrial/respiro-tambor-vertical-1940-altapress.png',
  valvulasComFlange: '/catalog-images/dulong-industrial/valvulas-com-flange-altapress.png',
  visorFluxo: '/catalog-images/dulong-industrial/visor-de-fluxo-1851-altapress.png',
  filtroY: '/catalog-images/dulong-industrial/filtro-y-1801-altapress.png',
  filtroLeve: '/catalog-images/dulong-industrial/filtro-leve-1802-altapress.png',
};

const media = {
  logo: '/brand/altapress-logo.png',
  heroSlideOne: '/home/hero-slide-one.jpg',
  heroSlideThree: altaPressHeroValvesWide,
  support: redebrasValvulasPlimat,
  valves: productValvulas,
  connections: productConexaoTubulares,
  showcaseOne: altaPressShowcaseGrid,
  showcaseTwo: instagramReelDa2l80jyzlo,
};

const navItems = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'Produtos', href: '/produtos', sectionId: 'produtos' },
  { label: 'Informações Técnicas', href: '/informacoes-tecnicas', sectionId: 'informacoes-tecnicas' },
  { label: 'Quem Somos', href: '/quem-somos', sectionId: 'quem-somos' },
  { label: 'Contato', href: '/contato', sectionId: 'contato' },
];

const pathToSection = navItems.reduce((accumulator, item) => {
  accumulator[item.href] = item.sectionId;
  return accumulator;
}, {});

const heroSlides = [
  {
    image: media.heroSlideOne,
    alt: 'Maquinario industrial e válvulas de alta pressão.',
  },
  {
    image: media.heroSlideThree,
    alt: 'AltaPress com válvulas industriais, flanges e conexões em cenário técnico.',
    className: 'hero-slide--valves-showcase',
  },
];

const sectionIds = new Set(navItems.map((item) => item.sectionId));

const highlights = [
  'Qualidade garantida',
  'Atendimento personalizado',
  'Peças para alta pressão',
  'Suporte técnico especializado',
];

const serviceCards = [
  {
    title: 'Válvulas',
    description: 'Válvulas resistentes para sistemas hidráulicos robustos.',
    detail: 'Modelos de esfera, gaveta, globo, retenção e borboleta para aplicações industriais exigentes.',
    image: media.valves,
  },
  {
    title: 'Conexões',
    description: 'Conexões seguras para evitar vazamentos e falhas.',
    detail: 'Conexões em ferro maleável, uniões, tees, reduções, cotovelos e niples com vedação confiável.',
    image: media.connections,
  },
  {
    title: 'Suporte Técnico',
    description: 'Apoio especializado para escolher as peças certas.',
    detail: 'Atendimento próximo para orientar a melhor solução em cada demanda de alta pressão.',
    image: media.support,
  },
];

const productCategories = [
  {
    title: 'Válvulas',
    slug: 'valvulas',
    image: productValvulas,
    items: [
      {
        label: 'Aquecimento e Refrigeração',
        image: productValvulaVaporImages.main,
        alt: 'Válvulas para aquecimento e refrigeração da AltaPress.',
        displayLabel: 'Aquecimento e Refrigeração',
        mediaClassName: 'product-page__card-media--refrigeracao',
        details: ['Refrigeração', 'Vapor e Fluídos Térmicos'],
        directOptionCards: true,
        standards: [{ label: 'Linha', options: ['Refrigeração', 'Vapor e Fluídos Térmicos'] }],
        optionImages: {
          Refrigeração: productValvulaRefrigeracaoImages.main,
          'Vapor e Fluídos Térmicos': productValvulaVaporImages.main,
        },
      },
      {
        label: 'Angular',
        image: productValvulaAngular,
        alt: 'Válvula angular da AltaPress.',
        details: ['Ferro fundido', 'Aço', 'Bronze'],
        standards: [{ label: 'Material', options: ['Ferro Fundido', 'Aço', 'Bronze'] }],
        optionImages: {
          'Ferro Fundido': productValvulaOpcaoAngularFerroFundido,
          Aço: productValvulaOpcaoAngularAco,
          Bronze: productValvulaOpcaoAngularBronze,
        },
      },
      {
        label: 'Borboleta',
        image: productValvulaBorboleta,
        alt: 'Válvula borboleta da AltaPress.',
        displayLabel: 'Válvula Borboleta',
        details: ['Wafer', 'Lug'],
        standards: [{ label: 'Tipo construtivo', options: ['Wafer', 'Lug'] }],
        optionImages: {
          Wafer: productValvulaOpcaoBorboletaWafer,
          Lug: productValvulaOpcaoBorboletaLug,
        },
      },
      {
        label: 'Diafragma',
        image: productValvulaDiafragma,
        alt: 'Válvula diafragma da AltaPress.',
        details: ['Tipo A', 'Tipo R ou KB'],
        standards: [{ label: 'Tipo', options: ['Tipo A', 'Tipo R ou KB'] }],
        optionImages: {
          'Tipo A': productValvulaOpcaoDiafragmaTipoA,
          'Tipo R ou KB': productValvulaOpcaoDiafragmaTipoR,
        },
      },
      {
        label: 'Esfera',
        image: productValvulaEsfera,
        alt: 'Válvula esfera da AltaPress.',
        displayLabel: 'Válvula Esfera',
        details: ['Monobloco', 'Bipartida', 'Tripartida'],
        standards: [{ label: 'Construção', options: ['Monobloco', 'Bipartida', 'Tripartida'] }],
        optionImages: {
          Monobloco: productValvulaOpcaoEsferaMonobloco,
          Bipartida: productValvulaOpcaoEsferaBipartida,
          Tripartida: productValvulaOpcaoEsferaTripartida,
        },
      },
      {
        label: 'Gaveta',
        image: productValvulaGaveta,
        alt: 'Válvula gaveta da AltaPress.',
        displayLabel: 'Válvula Gaveta',
        mediaClassName: 'product-page__item-media--blend',
        details: ['Haste ascendente', 'Haste fixa', 'Fecho rápido'],
        standards: [{ label: 'Modelo', options: ['Haste Ascendente', 'Haste Fixa', 'Fecho Rápido'] }],
        optionImages: {
          'Haste Ascendente': productValvulaOpcaoGavetaHasteAscendente,
          'Haste Fixa': productValvulaOpcaoGavetaHasteFixa,
          'Fecho Rápido': productValvulaOpcaoGavetaFechoRapido,
        },
      },
      {
        label: 'Globo',
        image: productValvulaGlobo,
        alt: 'Válvula globo da AltaPress.',
        displayLabel: 'Válvulas Globo',
        details: ['Forjada', 'Fundida', 'Ferro', 'Bronze', 'Agulha'],
        standards: [{ label: 'Modelo', options: ['Forjada', 'Fundida', 'Ferro', 'Aerodinâmica', 'Bronze', 'Agulha'] }],
        optionImages: {
          Forjada: productValvulaOpcaoGloboForjada,
          Fundida: productValvulaOpcaoGloboFundida,
          Ferro: productValvulaOpcaoGloboFerro,
          Aerodinâmica: productValvulaOpcaoGloboAerodinamica,
          Bronze: productValvulaOpcaoGloboBronze,
          Agulha: productValvulaOpcaoGloboAgulha,
        },
      },
      {
        label: 'Guilhotina',
        image: productValvulaGuilhotinaSerie03,
        alt: 'Válvula guilhotina da AltaPress.',
        details: ['Série 03', 'Série 03M', 'Série 05N', 'Série 04', 'Série 07', 'Série 15'],
        standards: [{ label: 'Modelo', options: ['Série 03', 'Série 03M', 'Série 05N', 'Série 04', 'Série 07', 'Série 15'] }],
        optionImages: {
          'Série 03': productValvulaGuilhotinaSerie03,
          'Série 03M': productValvulaGuilhotinaSerie03m,
          'Série 05N': productValvulaGuilhotinaSerie05n,
          'Série 04': productValvulaGuilhotinaSerie04,
          'Série 07': productValvulaGuilhotinaSerie07,
          'Série 15': productValvulaGuilhotinaSerie15,
        },
      },
      {
        label: 'Solenoides',
        image: productValvulaSolenoideB130a,
        alt: 'Válvula solenoide da AltaPress.',
        displayLabel: 'Válvulas Solenoides',
        mediaClassName: 'product-page__card-media--solenoides',
        details: ['B105', '106', '106B', '107', 'B130', 'W124'],
        standards: [{ label: 'Modelo', options: ['B105', '106', '106B', '107 Diafragma', '107 Gás', 'B130', 'B130A', 'W124', 'B106'] }],
        optionImages: {
          B105: productValvulaSolenoideB105,
          106: productValvulaSolenoide106,
          '106B': productValvulaSolenoide106b,
          '107 Diafragma': productValvulaSolenoide107Diafragma,
          '107 Gás': productValvulaSolenoide107Gas,
          B130: productValvulaSolenoideB130,
          B130A: productValvulaSolenoideB130a,
          W124: productValvulaSolenoideW124,
          B106: productValvulaSolenoideB106,
        },
      },
      {
        label: 'Mangote',
        image: productValvulaMangote,
        alt: 'Válvula mangote da AltaPress.',
        displayLabel: 'Válvulas Mangote',
        details: ['Mangote aberto', 'Mangote fechado'],
        standards: [{ label: 'Mangote', slug: 'corpo', options: ['Válvula Mangote Aberto', 'Válvula Mangote Fechado'] }],
        optionImages: {
          'Válvula Mangote Aberto': productValvulaOpcaoMangoteCorpoAberto,
          'Válvula Mangote Fechado': productValvulaOpcaoMangoteCorpoFechado,
        },
      },
      {
        label: 'Retenção',
        image: productValvulaRetencao,
        alt: 'Válvula de retenção da AltaPress.',
        details: ['Aerodinâmica', 'Fundo de poço', 'Portinhola', 'Wafer'],
        standards: [
          {
            label: 'Modelo',
            options: ['Aerodinâmica', 'Fundo de Poço', 'Horizontal Pistão', 'Portinhola', 'Retenção Wafer', 'Retenção Vertical'],
          },
        ],
        optionImages: {
          Aerodinâmica: productValvulaOpcaoRetencaoAerodinamica,
          'Fundo de Poço': productValvulaOpcaoRetencaoFundoPoco,
          'Horizontal Pistão': productValvulaOpcaoRetencaoHorizontalPistao,
          Portinhola: productValvulaOpcaoRetencaoPortinhola,
          'Retenção Wafer': productValvulaOpcaoRetencaoWafer,
          'Retenção Vertical': productValvulaOpcaoRetencaoVertical,
        },
      },
      {
        label: 'Segurança e alívio',
        image: productValvulaSegurancaAlivio,
        alt: 'Válvula de segurança e alívio da AltaPress.',
        details: ['Segurança', 'Alívio', 'Calibração sob consulta'],
        standards: [{ label: 'Aplicação', options: ['Segurança', 'Alívio', 'Calibração sob consulta'] }],
        optionImages: {
          Segurança: productValvulaOpcaoSeguranca,
          Alívio: productValvulaOpcaoSegurancaAlivio,
          'Calibração sob consulta': productValvulaOpcaoSegurancaCalibracao,
        },
      },
      {
        label: 'Tambor',
        image: productValvulaIndustrialDulongImages.tambor,
        alt: 'Válvula tambor industrial da AltaPress.',
        displayLabel: 'Válvula Tambor',
        details: ['Linha industrial', 'Bronze', 'Alumínio'],
        standards: [{ label: 'Modelo', options: ['Bronze', 'Alumínio'] }],
        optionImages: {
          Bronze: productValvulaIndustrialDulongImages.tambor,
          Alumínio: productValvulaIndustrialDulongImages.tamborAluminio,
        },
      },
      {
        label: 'Válvulas com flange',
        image: productValvulaIndustrialDulongImages.valvulasComFlange,
        alt: 'Válvula industrial com flange da AltaPress.',
        displayLabel: 'Válvulas com Flange',
        details: ['Linha industrial', 'Aplicação flangeada'],
        standards: [{ label: 'Modelo', options: ['Aplicação flangeada'] }],
        optionImages: {
          'Aplicação flangeada': productValvulaIndustrialDulongImages.valvulasComFlange,
        },
      },
      {
        label: 'Visor de fluxo',
        image: productValvulaIndustrialDulongImages.visorFluxo,
        alt: 'Visor de fluxo industrial da AltaPress.',
        displayLabel: 'Visor de Fluxo',
        details: ['Linha industrial', 'Inspeção visual'],
        standards: [{ label: 'Modelo', options: ['Inspeção visual'] }],
        optionImages: {
          'Inspeção visual': productValvulaIndustrialDulongImages.visorFluxo,
        },
      },
      {
        label: 'Globo de pedal',
        image: productValvulaIndustrialDulongImages.globoPedal,
        alt: 'Válvula globo de pedal industrial da AltaPress.',
        displayLabel: 'Válvula Globo de Pedal',
        details: ['Linha industrial', 'Pedal', 'Com acabamento'],
        standards: [{ label: 'Modelo', options: ['Pedal', 'Com acabamento'] }],
        optionImages: {
          Pedal: productValvulaIndustrialDulongImages.globoPedal,
          'Com acabamento': productValvulaIndustrialDulongImages.pedalAcabamento,
        },
      },
      {
        label: 'Indicadora de nível',
        image: productValvulaIndustrialDulongImages.indicadoraNivel,
        alt: 'Válvula indicadora de nível industrial da AltaPress.',
        displayLabel: 'Válvula Indicadora de Nível',
        details: ['Linha industrial', 'Indicador de nível'],
        standards: [{ label: 'Modelo', options: ['Indicador de nível'] }],
        optionImages: {
          'Indicador de nível': productValvulaIndustrialDulongImages.indicadoraNivel,
        },
      },
      {
        label: 'Boia industrial',
        image: productValvulaIndustrialDulongImages.boia,
        alt: 'Válvula boia industrial da AltaPress.',
        displayLabel: 'Válvula Boia',
        details: ['Linha industrial', 'Controle de nível'],
        standards: [{ label: 'Modelo', options: ['Controle de nível'] }],
        optionImages: {
          'Controle de nível': productValvulaIndustrialDulongImages.boia,
        },
      },
      {
        label: 'Filtro Y',
        image: productValvulaIndustrialDulongImages.filtroY,
        alt: 'Filtro Y industrial da AltaPress.',
        details: ['Linha industrial', 'Retenção de impurezas'],
        standards: [{ label: 'Modelo', options: ['Filtro Y'] }],
        optionImages: {
          'Filtro Y': productValvulaIndustrialDulongImages.filtroY,
        },
      },
      {
        label: 'Bloqueio para volante',
        image: productValvulaIndustrialDulongImages.bloqueioVolante,
        alt: 'Bloqueio para volante industrial da AltaPress.',
        details: ['Linha industrial', 'Segurança operacional'],
        standards: [{ label: 'Modelo', options: ['Bloqueio para volante'] }],
        optionImages: {
          'Bloqueio para volante': productValvulaIndustrialDulongImages.bloqueioVolante,
        },
      },
      {
        label: 'Trava para tambor',
        image: productValvulaIndustrialDulongImages.travaTambor,
        alt: 'Trava para tambor industrial da AltaPress.',
        details: ['Linha industrial', 'Segurança para tambor'],
        standards: [{ label: 'Modelo', options: ['Trava para tambor'] }],
        optionImages: {
          'Trava para tambor': productValvulaIndustrialDulongImages.travaTambor,
        },
      },
      {
        label: 'Filtro leve',
        image: productValvulaIndustrialDulongImages.filtroLeve,
        alt: 'Filtro leve industrial da AltaPress.',
        displayLabel: 'Filtro Leve',
        details: ['Linha industrial', 'Filtragem leve'],
        standards: [{ label: 'Modelo', options: ['Filtro leve'] }],
        optionImages: {
          'Filtro leve': productValvulaIndustrialDulongImages.filtroLeve,
        },
      },
      {
        label: 'Respiro para tambor',
        image: productValvulaIndustrialDulongImages.respiroHorizontal,
        alt: 'Respiro para tambor industrial da AltaPress.',
        details: ['Horizontal', 'Vertical', 'Linha industrial'],
        standards: [{ label: 'Modelo', options: ['Horizontal', 'Vertical'] }],
        optionImages: {
          Horizontal: productValvulaIndustrialDulongImages.respiroHorizontal,
          Vertical: productValvulaIndustrialDulongImages.respiroVertical,
        },
      },
    ],
  },
  {
    title: 'Flanges',
    slug: 'flanges',
    image: productFlanges,
    items: [
      {
        label: 'Flange Cego',
        image: productFlangeCego,
        alt: 'Flange cego da AltaPress.',
        details: ['ANSI 150 a 2500 lbs', 'AWWA B/D/E/F', 'DIN PN 6 a PN 100', 'JIS 5K a 63K'],
        standards: [
          { label: 'ANSI', options: ['150 lbs', '300 lbs', '600 lbs', '900 lbs', '1500 lbs', '2500 lbs'] },
          { label: 'AWWA', options: ['Classe B (86 PSI)', 'Classe D (175-150 PSI)', 'Classe E (275 PSI)', 'Classe F (300 PSI)'] },
          { label: 'DIN', options: ['Classe PN 6', 'Classe PN 10', 'Classe PN 16', 'Classe PN 25', 'Classe PN 40', 'Classe PN 64', 'Classe PN 100'] },
          { label: 'JIS', options: ['Classe 5K', 'Classe 10K', 'Classe 16K', 'Classe 20K', 'Classe 30K', 'Classe 40K', 'Classe 63K'] },
        ],
      },
      {
        label: 'Flange Pescoço',
        image: productFlangePescoco,
        alt: 'Flange pescoço da AltaPress.',
        details: ['ANSI 150 a 2500 lbs', 'DIN PN 6 a PN 100', 'JIS 30K, 40K e 63K'],
        standards: [
          { label: 'ANSI', options: ['150 lbs', '300 lbs', '600 lbs', '900 lbs', '1500 lbs', '2500 lbs'] },
          { label: 'DIN', options: ['Classe PN 6', 'Classe PN 10', 'Classe PN 16', 'Classe PN 25', 'Classe PN 40', 'Classe PN 64', 'Classe PN 100'] },
          { label: 'JIS', options: ['Classe 30K', 'Classe 40K', 'Classe 63K'] },
        ],
      },
      {
        label: 'Flange Slip On',
        image: productFlangeSlipOn,
        alt: 'Flange slip on da AltaPress.',
        details: ['ANSI 150 a 2500 lbs', 'AWWA D/E', 'JIS 5K a 30K'],
        standards: [
          { label: 'ANSI', options: ['150 lbs', '300 lbs', '600 lbs', '900 lbs', '1500 lbs', '2500 lbs'] },
          { label: 'AWWA', options: ['Classe D (175-150 PSI)', 'Classe E (275 PSI)'] },
          { label: 'JIS', options: ['Classe 5K', 'Classe 10K', 'Classe 16K', 'Classe 20K', 'Classe 30K'] },
        ],
      },
      {
        label: 'Flange Encaixe',
        image: productFlangeEncaixe,
        alt: 'Flange de encaixe da AltaPress.',
        details: ['ANSI 150 a 1500 lbs'],
        standards: [{ label: 'ANSI', options: ['150 lbs', '300 lbs', '600 lbs', '900 lbs', '1500 lbs'] }],
      },
      {
        label: 'Flange Roscado',
        image: productFlangeRoscado,
        alt: 'Flange roscado da AltaPress.',
        details: ['ANSI 150 a 2500 lbs', 'DIN PN 6 a PN 100'],
        standards: [
          { label: 'ANSI', options: ['150 lbs', '300 lbs', '600 lbs', '900 lbs', '1500 lbs', '2500 lbs'] },
          { label: 'DIN', options: ['Classe PN 6', 'Classe PN 10/PN 16', 'Classe PN 25/PN 40', 'Classe PN 64', 'Classe PN 100'] },
        ],
      },
      {
        label: 'Flange Solto',
        image: productFlangeSolto,
        alt: 'Flange solto da AltaPress.',
        details: ['ANSI 150 a 2500 lbs', 'DIN para tubo com borda', 'DIN para colar com solda'],
        standards: [
          { label: 'ANSI', options: ['150 lbs', '300 lbs', '600 lbs', '900 lbs', '1500 lbs', '2500 lbs'] },
          { label: 'DIN', options: ['Para tubos com borda', 'Para colar com solda'] },
        ],
      },
      {
        label: 'Flange Liso',
        image: productFlangeLiso,
        alt: 'Flange liso da AltaPress.',
        details: ['ANSI 150 a 2500 lbs', 'AWWA 86 a 300 PSI', 'DIN PN6/PN10', 'JIS 5K a 63K'],
        standards: [
          { label: 'ANSI', options: ['150 lbs', '300 lbs', '600 lbs', '900 lbs', '1500 lbs', '2500 lbs'] },
          { label: 'AWWA', options: ['86 PSI', '175-150 PSI', '275 PSI', '300 PSI'] },
          { label: 'DIN', options: ['Classe PN6', 'Classe PN10'] },
          { label: 'JIS', options: ['Classe 5K', 'Classe 10K', 'Classe 16K', 'Classe 20K', 'Classe 30K', 'Classe 40K', 'Classe 63K'] },
        ],
      },
      {
        label: 'Orifício Pescoço',
        image: productOrificioPescoco,
        alt: 'Orifício com pescoço da AltaPress.',
        details: ['ANSI face ressalto', 'ANSI face RTJ'],
        standards: [{ label: 'ANSI', options: ['Face ressalto', 'Face RTJ'] }],
      },
      {
        label: 'Orifício Slip On',
        image: productOrificioSlipOn,
        alt: 'Orifício tipo slip on da AltaPress.',
        details: ['ANSI 300 lbs'],
        standards: [{ label: 'ANSI', options: ['300 lbs'] }],
      },
      {
        label: 'Orifício Roscado',
        image: productOrificioRoscado,
        alt: 'Orifício tipo roscado da AltaPress.',
        details: ['ANSI 300 lbs'],
        standards: [{ label: 'ANSI', options: ['300 lbs'] }],
      },
      {
        label: 'De Redução',
        image: productFlangeReducao,
        alt: 'Flange de redução da AltaPress.',
        details: ['ANSI 150 a 2500 lbs'],
        standards: [{ label: 'ANSI', options: ['150-2500 lbs'] }],
      },
    ],
  },
  {
    title: 'Conexões',
    slug: 'conexoes',
    image: productConexaoTubulares,
    items: [
      {
        label: 'Alta pressão',
        image: productConexaoAltaPressao,
        alt: 'Conexões de alta pressão da AltaPress.',
        details: ['Rosca NPT/BSP', 'Solda SW'],
        standards: [{ label: 'Forjadas', options: ['Rosca (NPT/BSP)', 'Solda (SW)'] }],
        optionImages: {
          'Rosca (NPT/BSP)': productConexaoForjadaRosca,
          'Solda (SW)': productConexaoForjadaSolda,
        },
      },
      {
        label: 'Ferro maleável',
        image: productConexaoFerroMaleavel,
        alt: 'Conexões em ferro maleável da AltaPress.',
        details: ['Buchas', 'Cotovelos', 'Luvas', 'Niples', 'Tês'],
        standards: [
          {
            label: 'Tipos',
            options: [
              'Bucha Redução',
              'Bujão',
              'Cotovelo 45°',
              'Cotovelo 90°',
              'Cotovelo 90° M/F',
              'Cruzeta',
              'Curva 45° Fêmea',
              'Curva 45° M/F',
              'Curva 90° Fêmea',
              'Curva 90° Macho',
              'Curva 90° M/F',
              'Curva de Retorno',
              'Flange Sextavado',
              'Luva',
              'Luva M/F',
              'Luva de Redução',
              'Luva Redução M/F',
              'Niple Duplo',
              'Niple Duplo Redução',
              'Tampão',
              'Tê 45°',
              'Tê 90°',
              'Tê 90° de Redução',
              'União',
            ],
          },
        ],
        optionImages: {
          'Bucha Redução': productConexaoBuchaReducao,
          Bujão: productConexaoBujao,
          'Cotovelo 45°': productConexaoCotovelo45,
          'Cotovelo 90°': productConexaoCotovelo90,
          'Cotovelo 90° M/F': productConexaoCotovelo90Mf,
          Cruzeta: productConexaoCruzeta,
          'Curva 45° Fêmea': productConexaoCurva45Femea,
          'Curva 45° M/F': productConexaoCurva45Mf,
          'Curva 90° Fêmea': productConexaoCurva90Femea,
          'Curva 90° Macho': productConexaoCurva90Macho,
          'Curva 90° M/F': productConexaoCurva90Mf,
          'Curva de Retorno': productConexaoCurvaRetorno,
          'Flange Sextavado': productConexaoFlangeSextavado,
          Luva: productConexaoLuva,
          'Luva M/F': productConexaoLuvaMf,
          'Luva de Redução': productConexaoLuvaReducao,
          'Luva Redução M/F': productConexaoLuvaReducaoMf,
          'Niple Duplo': productConexaoNipleDuplo,
          'Niple Duplo Redução': productConexaoNipleDuploReducao,
          Tampão: productConexaoTampao,
          'Tê 45°': productConexaoFerroTe45,
          'Tê 90°': productConexaoFerroTe90,
          'Tê 90° de Redução': productConexaoFerroTe90Reducao,
          União: productConexaoUniao,
        },
      },
      {
        label: 'Colares',
        image: productConexaoColares,
        alt: 'Colares metálicos da AltaPress.',
        details: ['Colares metálicos', 'Bitola sob consulta'],
        standards: [{ label: 'Aplicação', options: ['Colar metálico', 'Bitola sob consulta'] }],
      },
      {
        label: 'Conexões tubulares',
        image: productConexaoTubulares,
        alt: 'Conexões tubulares da AltaPress.',
        details: ['Cap', 'Curvas', 'Reduções', 'Tês'],
        standards: [
          {
            label: 'Tipos',
            options: [
              'Cap',
              'Curva 45°',
              'Curva 90°',
              'Curva 180°',
              'Niple Concêntrico',
              'Niple Excêntrico',
              'Pestana',
              'Redução Concêntrica',
              'Redução Excêntrica',
              'Tê 45°',
              'Tê 45° de Redução',
              'Tê 90°',
              'Tê 90° de Redução',
            ],
          },
        ],
        optionImages: {
          Cap: productConexaoCap,
          'Curva 45°': productConexaoCurva45,
          'Curva 90°': productConexaoCurva90,
          'Curva 180°': productConexaoCurva180,
          'Niple Concêntrico': productConexaoNipleConcentrico,
          'Niple Excêntrico': productConexaoNipleExcentrico,
          Pestana: productConexaoPestana,
          'Redução Concêntrica': productConexaoReducaoConcentrica,
          'Redução Excêntrica': productConexaoReducaoExcentrica,
          'Tê 45°': productConexaoTe45,
          'Tê 45° de Redução': productConexaoTe45Reducao,
          'Tê 90°': productConexaoTe90,
          'Tê 90° de Redução': productConexaoTe90Reducao,
        },
      },
    ],
  },
  {
    title: 'Tubos',
    slug: 'tubos',
    image: productTuboAcoCarbono,
    alt: 'Tubos de aço carbono.',
    details: [],
    directOverview: true,
    productPage: {
      title: 'Tubos de Aço Carbono',
      image: productTuboAcoCarbonoUltra,
      subtitle: 'Tubos de aço carbono para aplicações industriais, estruturais e transporte de fluidos.',
      description: [
        'O tubo de aço carbono é um dos materiais mais versáteis e amplamente utilizados na indústria, conhecido por sua robustez, resistência e aplicabilidade em diferentes setores.',
        'Fabricado a partir de ligas de aço com baixo teor de carbono, este tubo apresenta propriedades mecânicas excepcionais, tornando-se ideal para projetos que exigem durabilidade e confiabilidade.',
        'Sua popularidade deve-se à combinação de custo-benefício, flexibilidade de produção e eficiência operacional.',
        'O tubo de aço também se destaca por sua adaptabilidade a diversas condições de trabalho, sendo indispensável em projetos industriais, de construção civil e infraestrutura.',
      ],
      sections: [
        {
          title: 'Benefícios',
          items: [
            'Alta resistência mecânica para projetos estruturais robustos.',
            'Maleabilidade que facilita soldagem, corte e conformação.',
            'Excelente custo-benefício em comparação a materiais como aço inoxidável.',
            'Disponibilidade em diversos tamanhos e espessuras sob consulta.',
            'Compatibilidade com revestimentos protetores para aumentar a vida útil.',
          ],
        },
        {
          title: 'Durabilidade e resistência',
          items: [
            'Resistência a impactos, vibrações e altas pressões.',
            'Desempenho confiável em aplicações industriais exigentes.',
            'Possibilidade de aplicação de revestimentos para proteção contra corrosão.',
            'Indicado para transporte de fluidos e estruturas robustas.',
          ],
        },
        {
          title: 'Aplicações',
          items: [
            'Construção civil: estruturas metálicas, andaimes e encanamentos.',
            'Indústria de óleo e gás: transporte de fluidos e gases sob pressão.',
            'Setor automobilístico: sistemas de escape e componentes estruturais.',
            'Indústria em geral: maquinário e equipamentos industriais.',
            'Agricultura, redes de distribuição de água e instalações de apoio.',
          ],
        },
      ],
    },
    items: [],
  },
  {
    title: 'Filtros',
    slug: 'filtros',
    image: productAcessorioFiltro,
    items: [
      {
        label: 'Filtro',
        image: productAcessorioFiltro,
        alt: 'Filtro da AltaPress.',
        details: ['Flangeado', 'Rosca', 'Bronze', 'Cesto simples'],
        standards: [{ label: 'Modelo', options: ['Flangeado', 'Rosca', 'Bronze', 'Cesto Simples'] }],
        optionImages: {
          Flangeado: productAcessorioFiltroFlangeado,
          Rosca: productAcessorioFiltro,
          Bronze: productAcessorioFiltroBronze,
          'Cesto Simples': productAcessorioFiltroCestoSimples,
        },
      },
    ],
  },
  {
    title: 'Purgadores',
    slug: 'purgadores',
    image: productPurgadorBoia,
    items: [
      {
        label: 'Bóia',
        image: productPurgadorBoia,
        alt: 'Purgador tipo bóia da AltaPress.',
        details: ['Tipo boia', 'Vapor e condensado'],
        standards: [{ label: 'Tipo', options: ['Tipo Boia', 'Especificação sob consulta'] }],
      },
      {
        label: 'Termodinâmico',
        image: productPurgadorTermodinamico,
        alt: 'Purgador termodinâmico da AltaPress.',
        details: ['Termodinâmico', 'Vapor e condensado'],
        standards: [{ label: 'Tipo', options: ['Termodinâmico', 'Especificação sob consulta'] }],
      },
    ],
  },
  {
    title: 'Vedações',
    slug: 'vedacoes',
    image: productVedacaoFitaPtfe,
    items: [
      {
        label: 'Fita PTFE',
        image: productVedacaoFitaPtfe,
        alt: 'Fita PTFE da AltaPress.',
        details: ['Fita veda rosca', 'PTFE'],
        standards: [{ label: 'Tipo', options: ['Fita veda rosca', 'PTFE'] }],
      },
      {
        label: 'Junta de vedação',
        image: productVedacaoJuntaVedacao,
        alt: 'Junta de vedação da AltaPress.',
        details: ['Junta vedação', 'Material sob consulta'],
        standards: [{ label: 'Tipo', options: ['Junta Vedação', 'Material sob consulta'] }],
      },
    ],
  },
  {
    title: 'Instrumentação',
    slug: 'instrumentos',
    image: productInstrumentos,
    items: [
      {
        label: 'Manômetros',
        image: productInstrumentoManometro,
        alt: 'Manômetro da AltaPress.',
        details: ['Pressão', 'Faixa sob consulta'],
        standards: [{ label: 'Aplicação', options: ['Pressão', 'Faixa sob consulta'] }],
      },
      {
        label: 'Termômetros',
        image: productInstrumentoTermometro,
        alt: 'Termômetro da AltaPress.',
        details: ['Angular', 'Capela'],
        standards: [{ label: 'Modelo', options: ['Angular', 'Capela'] }],
      },
      {
        label: 'Pressostatos',
        image: productInstrumentoPressostatos,
        alt: 'Pressostato da AltaPress.',
        details: ['Controle de pressão', 'Faixa sob consulta'],
        standards: [{ label: 'Aplicação', options: ['Controle de pressão', 'Faixa sob consulta'] }],
      },
      {
        label: 'Vacuômetros',
        image: productInstrumentoVacuometro,
        alt: 'Vacuômetro da AltaPress.',
        details: ['Vácuo', 'Faixa sob consulta'],
        standards: [{ label: 'Aplicação', options: ['Vácuo', 'Faixa sob consulta'] }],
      },
    ],
  },
  {
    title: 'Diversos',
    slug: 'diversos',
    image: productDiversos,
    items: [
      {
        label: 'Engate Rápido',
        image: productDiversoEngateRapido,
        alt: 'Engate rápido da AltaPress.',
        details: [],
        standards: [{ label: 'Aplicação', options: ['Engate Rápido', 'Especificação sob consulta'] }],
      },
      {
        label: 'Espigão',
        image: productDiversoEspigao,
        alt: 'Espigão da AltaPress.',
        details: [],
        standards: [{ label: 'Aplicação', options: ['Espigão', 'Especificação sob consulta'] }],
      },
      {
        label: 'Grampo U',
        image: productDiversoGrampoU,
        alt: 'Grampo U da AltaPress.',
        details: [],
        standards: [{ label: 'Aplicação', options: ['Fixação', 'Especificação sob consulta'] }],
      },
    ],
  },
  {
    title: 'Acessórios',
    slug: 'acessorios',
    image: productAcessorios,
    items: [
      {
        label: 'Visor de Fluxo',
        image: productAcessorioVisor,
        alt: 'Visor da AltaPress.',
        displayLabel: 'Visor',
        details: ['Flangeado', 'Rosca', 'Bronze'],
        standards: [{ label: 'Conexão', options: ['Flangeado', 'Rosca', 'Bronze'] }],
        optionImages: {
          Flangeado: productAcessorioVisorFlangeado,
          Rosca: productAcessorioVisor,
          Bronze: productAcessorioVisorBronze,
        },
      },
      {
        label: 'Torneira e Tubo Sifão',
        image: productAcessorioTorneiraTuboSifao,
        alt: 'Torneira e tubo sifão da AltaPress.',
        details: ['Robinete', 'Tubo sifão'],
        standards: [{ label: 'Aplicação', options: ['Robinete', 'Tubo Sifão'] }],
        optionImages: {
          Robinete: productAcessorioTorneiraTuboSifao,
          'Tubo Sifão': productAcessorioTuboSifao,
        },
      },
      {
        label: 'Juntas de Expansão',
        image: productAcessorioJuntaExpansao,
        alt: 'Junta de expansão da AltaPress.',
        displayLabel: 'Junta de Expansão',
        details: ['Flangeada', 'Dupla onda'],
        standards: [{ label: 'Modelo', options: ['Flangeada', 'Dupla Onda'] }],
        optionImages: {
          Flangeada: productAcessorioJuntaExpansao,
          'Dupla Onda': productAcessorioJuntaExpansaoDuplaOnda,
        },
      },
    ],
  },
];

const sectors = [
  'Indústria',
  'Construção',
  'Saneamento',
  'Agronegócio',
  'Mineração',
  'Óleo & gás',
];

const contacts = [
  {
    label: 'Telefone',
    value: businessProfile.phone,
    href: 'tel:+5531972671038',
  },
  {
    label: 'WhatsApp',
    value: businessProfile.whatsapp,
    href: businessProfile.whatsappUrl,
  },
  {
    label: 'Email',
    value: businessProfile.email,
    href: `mailto:${businessProfile.email}`,
  },
  {
    label: 'Endereço',
    value: 'Rua Josias Machado, 236, Inconfidentes — CEP 32260-520',
    href: 'https://www.google.com/maps/search/?api=1&query=Rua+Josias+Machado,+236,+Inconfidentes,+CEP+32260-520',
  },
  {
    label: 'Horário',
    value: 'Segunda a quinta 08:00 as 18:00 | Sexta de 08:00 as 17:00',
    href: null,
  },
];

const whatsappBase = businessProfile.whatsappUrl;

const whatsappPhone = businessProfile.whatsappUrl.match(/wa\.me\/(\d+)/)?.[1] ?? '5531991878767';

function buildProductQuoteHref({ categoryTitle, productLabel, detailLabel, optionLabel }) {
  const message = [
    `Olá! Quero solicitar uma cotação com a ${businessProfile.companyName}.`,
    productLabel ? `Peça: ${productLabel}.` : null,
    detailLabel ? `Referência: ${detailLabel}.` : null,
    optionLabel ? `Opção ou classe: ${optionLabel}.` : null,
    categoryTitle ? `Categoria: ${categoryTitle}.` : null,
    'Podem me informar valores, disponibilidade e prazo?',
  ]
    .filter(Boolean)
    .join(' ');

  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function ProductQuoteButton({ categoryTitle, productLabel, detailLabel, optionLabel }) {
  return (
    <a
      className="button button-compact product-page__quote-button"
      href={buildProductQuoteHref({ categoryTitle, productLabel, detailLabel, optionLabel })}
      target="_blank"
      rel="noreferrer"
      aria-label={`Solicitar cotação de ${productLabel} no WhatsApp`}
    >
      Cotação no WhatsApp
    </a>
  );
}

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/altapress.conexoes/' },
  { label: 'WhatsApp', href: whatsappBase },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

const instagramPreviewItems = [
  {
    type: 'image',
    src: instagramReelDa2l80jyzlo,
    href: 'https://www.instagram.com/reel/Da2l80JyZLO/?igsh=MTZ3bWVxc2JyaXpodQ==',
    alt: 'Reel da AltaPress no Instagram.',
  },
];

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.52 0 .18 5.32.18 11.88c0 2.1.54 4.14 1.56 5.94L0 24l6.36-1.68a11.84 11.84 0 0 0 5.7 1.44h.01c6.54 0 11.88-5.34 11.88-11.88 0-3.18-1.24-6.18-3.43-8.4ZM12.07 21.74h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.78.99 1.01-3.68-.24-.38a9.8 9.8 0 0 1-1.5-5.22c0-5.44 4.43-9.87 9.89-9.87 2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.43 9.88-9.88 9.88Z"
        fill="currentColor"
      />
      <path
        d="M17.49 14.83c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.64.08-.3-.15-1.24-.46-2.36-1.47-.87-.77-1.46-1.73-1.63-2.02-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.08 2.87 1.23 3.07c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.18-1.42-.08-.13-.28-.2-.57-.35Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GoogleMapsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.25a7.1 7.1 0 0 0-7.1 7.1c0 5.32 7.1 12.4 7.1 12.4s7.1-7.08 7.1-12.4A7.1 7.1 0 0 0 12 2.25Z" fill="#34A853" />
      <path d="M12 2.25v19.5s7.1-7.08 7.1-12.4A7.1 7.1 0 0 0 12 2.25Z" fill="#EA4335" />
      <path d="M4.9 9.35c0 5.32 7.1 12.4 7.1 12.4v-9.4a3 3 0 0 1-3-3h-4.1Z" fill="#4285F4" />
      <circle cx="12" cy="9.35" r="3" fill="#FBBC04" />
      <circle cx="12" cy="9.35" r="1.35" fill="white" />
    </svg>
  );
}

function WazeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M18.75 11.2c0-4.1-3.1-7.05-7.33-7.05-4.12 0-7.17 2.84-7.17 6.67 0 3.64 2.5 6.25 6.28 6.65.56 1.18 1.65 1.95 2.98 1.95 1.72 0 3.05-1.28 3.05-2.95 1.36-1.12 2.19-2.94 2.19-5.27Z" fill="#36C5F0" />
      <path d="M8.35 17.2c-.8.92-1.89 1.38-3.18 1.38M16.4 17.15c.67.78 1.64 1.18 2.8 1.18" stroke="#172B4D" strokeWidth="1.55" strokeLinecap="round" />
      <circle cx="9.25" cy="10.9" r="1" fill="#172B4D" />
      <circle cx="14.25" cy="10.9" r="1" fill="#172B4D" />
      <path d="M9.35 14.05c1.15.92 2.76.92 3.9 0" stroke="#172B4D" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M7 4.85 5.65 3.7M15.9 4.85l1.34-1.15" stroke="#172B4D" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.55" cy="6.55" r="1.15" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.05 8.15A2.05 2.05 0 1 0 6.05 4.05a2.05 2.05 0 0 0 0 4.1ZM4.25 9.8h3.6V20h-3.6V9.8Zm5.85 0h3.45v1.4h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.4 4.34 5.52V20h-3.6v-4.55c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.18-1.73 2.4V20h-3.6V9.8Z" />
    </svg>
  );
}

function CarouselArrowIcon({ direction = 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}
    >
      <path
        d="M8 4L16 12L8 20"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '');
}

function slugifyProductLabel(label) {
  return label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isConsultationOnlyOption(label) {
  return /sob consulta/i.test(label);
}

function getVisibleProductStandards(productItem) {
  if (!productItem || typeof productItem === 'string') {
    return [];
  }

  return (productItem.standards ?? [])
    .map((standard) => {
      const realOptions = standard.options.filter((option) => !isConsultationOnlyOption(option));
      const options = realOptions.length ? realOptions : standard.options;

      return { ...standard, options };
    })
    .filter((standard) => standard.options.length);
}

function getProductOptionImage(productItem, option) {
  if (!productItem || typeof productItem === 'string') {
    return null;
  }

  return productItem.optionImages?.[option] ?? null;
}

function getTechnicalSpec(specs, itemSlug, standardSlug, optionSlug) {
  const standardSpecs = specs[itemSlug]?.[standardSlug];

  if (!standardSpecs) {
    return null;
  }

  if (standardSpecs[optionSlug]) {
    return standardSpecs[optionSlug];
  }

  return Object.values(standardSpecs).find((spec) => {
    const titleSlug = slugifyProductLabel(spec.title ?? '');
    const sourceSlug = slugifyProductLabel(spec.sourceUrl?.split('/').filter(Boolean).at(-1) ?? '');

    return titleSlug === optionSlug || sourceSlug === optionSlug || titleSlug.endsWith(optionSlug) || optionSlug.endsWith(titleSlug);
  }) ?? null;
}

const guilhotinaActuationOptions = [
  ['pneumatica-dupla-acao', 'Pneumática dupla ação'],
  ['manual-volante', 'Manual por volante'],
  ['redutor-engrenagem', 'Redutor de engrenagem'],
  ['atuador-eletromecanico', 'Atuador eletromecânico'],
  ['hidraulico-dupla-acao', 'Hidráulico dupla ação'],
];

function getGuilhotinaGalleryImages(serieSlug) {
  return guilhotinaActuationOptions
    .map(([suffix, label]) => ({
      src: guilhotinaGalleryImages[`${serieSlug}-${suffix}`],
      alt: `${label} - ${serieSlug.replace('serie-', 'Série ').toUpperCase()}`,
    }))
    .filter((image) => image.src);
}

function createGuilhotinaSpec({ title, description, type, application, sizes, extraCharacteristics = [] }) {
  return {
    title,
    note: 'Imagens e referências da linha Guilhotina usadas com permissão.',
    characteristics: [
      description,
      application,
      ...extraCharacteristics,
      'Acionamentos disponíveis: pneumática dupla ação, manual por volante, redutor de engrenagem, atuador eletromecânico e hidráulico dupla ação.',
      `Conexões dos flanges conforme normas ANSI B16.5, DIN PN10, DIN PN16, JIS ou sob consulta. Tamanhos: ${sizes}.`,
    ],
    images: getGuilhotinaGalleryImages(slugifyProductLabel(title)),
    tables: [
      [
        ['Série', title.replace('Série ', '')],
        ['Tipo construtivo', type],
        ['Aplicação', application],
        ['Tamanhos', sizes],
      ],
      [
        ['Acionamento', 'Disponibilidade'],
        ['Pneumática dupla ação', 'Sob consulta'],
        ['Manual por volante', 'Sob consulta'],
        ['Redutor de engrenagem', 'Sob consulta'],
        ['Atuador eletromecânico', 'Sob consulta'],
        ['Hidráulico dupla ação', 'Sob consulta'],
      ],
      [
        ['Norma de flange', 'Disponibilidade'],
        ['ANSI B16.5', 'Sob consulta'],
        ['DIN PN10', 'Sob consulta'],
        ['DIN PN16', 'Sob consulta'],
        ['JIS', 'Sob consulta'],
      ],
    ],
  };
}

const guilhotinaSerieSpecs = {
  'serie-03': {
    ...createGuilhotinaSpec({
      title: 'Série 03',
      description: 'Válvula guilhotina flangeada, faca não passante ou passante curta, tipo LUG, SEMI-LUG ou Wafer.',
      type: 'LUG / SEMI-LUG / Wafer',
      application: 'Bloqueio e controle de vazão de fluidos abrasivos em processos industriais.',
      sizes: 'N2” até DN24”',
      extraCharacteristics: ['Vedação facial com obturador tipo faca e contra chanfro para melhor vedação.'],
    }),
  },
  'serie-03m': {
    ...createGuilhotinaSpec({
      title: 'Série 03M',
      description: 'Válvula guilhotina tipo LUG/Wafer, faca não passante, com vedação anelar revestida.',
      type: 'LUG / Wafer',
      application: 'Bloqueio e controle de fluidos abrasivos.',
      sizes: 'N2” até DN32”',
    }),
  },
  'serie-05n': {
    ...createGuilhotinaSpec({
      title: 'Série 05N',
      description: 'Válvula guilhotina tipo LUG, faca não passante ou passante curta, com extremidade flangeada.',
      type: 'Extremidade flangeada',
      application: 'Bloqueio de fluidos abrasivos.',
      sizes: 'N2” até DN32”',
    }),
  },
  'serie-04': {
    ...createGuilhotinaSpec({
      title: 'Série 04',
      description: 'Válvula guilhotina de faca passante longa.',
      type: 'LUG / Wafer',
      application: 'Bloqueio de vazão de fluidos.',
      sizes: 'N2” até DN24”',
    }),
  },
  'serie-07': {
    ...createGuilhotinaSpec({
      title: 'Série 07',
      description: 'Válvula guilhotina de faca não passante desenvolvida sob medida.',
      type: 'Sob medida',
      application: 'Bloqueio e controle de vazão de fluidos conforme solicitação do projeto.',
      sizes: 'Sob consulta',
    }),
  },
  'serie-15': {
    ...createGuilhotinaSpec({
      title: 'Série 15',
      description: 'Válvula guilhotina flangeada, faca não passante ou passante curta, com corpo flangeado tipo LUG.',
      type: 'Flangeada / LUG',
      application: 'Bloqueio de fluidos muito abrasivos.',
      sizes: 'N2” até DN32”',
      extraCharacteristics: ['Construção robusta para instalação entre flanges.'],
    }),
  },
};

function getProductTechnicalSpec(specs, categorySlug, itemSlug, standardSlug, optionSlug) {
  const directSpec = getTechnicalSpec(specs, itemSlug, standardSlug, optionSlug);

  if (directSpec) {
    return directSpec;
  }

  if (categorySlug === 'valvulas' && itemSlug === 'aquecimento-e-refrigeracao' && standardSlug === 'linha') {
    if (optionSlug === 'refrigeracao') {
      const spec = getTechnicalSpec(specs, 'solenoide', 'aplicacao', 'acionamento-eletrico');

      return spec
        ? {
            ...spec,
            images: [
              { src: productValvulaRefrigeracaoImages.main, alt: 'Refrigeração' },
              { src: productValvulaRefrigeracaoImages.secondary, alt: 'Refrigeração' },
            ],
          }
        : null;
    }

    if (optionSlug === 'vapor-e-fluidos-termicos') {
      return getTechnicalSpec(specs, 'descarga-de-caldeira', 'aplicacao', 'descarga-de-caldeira');
    }
  }

  if (categorySlug === 'valvulas' && itemSlug === 'guilhotina' && standardSlug === 'modelo') {
    return guilhotinaSerieSpecs[optionSlug] ?? null;
  }

  if (categorySlug === 'filtros' && itemSlug === 'filtro' && standardSlug === 'modelo') {
    if (optionSlug === 'cesto-simples') {
      return getTechnicalSpec(specs, 'tipo-cesto', 'modelo', optionSlug);
    }

    return getTechnicalSpec(specs, 'tipo-y', 'conexao', optionSlug);
  }

  return null;
}

function hasDesktopImageInteractions() {
  return typeof window !== 'undefined'
    && window.matchMedia('(min-width: 1181px) and (hover: hover) and (pointer: fine)').matches;
}

function getSectionIdFromLocation(location) {
  if (getProductRouteFromPath(location.pathname)) {
    return null;
  }

  const hashSectionId = location.hash.replace('#', '');

  if (sectionIds.has(hashSectionId)) {
    return hashSectionId;
  }

  return pathToSection[normalizePathname(location.pathname)] ?? 'home';
}

function getProductCategoryFromPath(pathname) {
  const normalizedPath = normalizePathname(pathname);
  return productCategories.find((category) => normalizedPath === `/produtos/${category.slug}`);
}

function getProductRouteFromPath(pathname) {
  const normalizedPath = normalizePathname(pathname);
  const parts = normalizedPath.split('/').filter(Boolean);

  if (parts[0] !== 'produtos' || !parts[1]) {
    return null;
  }

  const category = productCategories.find((item) => item.slug === parts[1]);

  if (!category) {
    return null;
  }

  const itemSlug = parts[2];
  const productItem = itemSlug
    ? category.items.find((item) => slugifyProductLabel(typeof item === 'string' ? item : item.label) === itemSlug)
    : null;
  const standardSlug = parts[3];
  const standards = getVisibleProductStandards(productItem);
  const standard = standardSlug
    ? standards.find((item) => getProductStandardSlug(item) === standardSlug)
    : null;
  const optionSlug = parts[4];

  return { category, item: productItem ?? null, standard: standard ?? null, optionSlug: optionSlug ?? null };
}

function scrollToSection(sectionId, behavior = 'smooth') {
  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    return;
  }

  targetSection.scrollIntoView({
    behavior,
    block: 'start',
  });
}

function sortProductEntries(entries, sortOrder, getLabel) {
  if (sortOrder === 'position') {
    return entries;
  }

  return [...entries].sort((firstItem, secondItem) => {
    const firstLabel = getLabel(firstItem).localeCompare(getLabel(secondItem), 'pt-BR', { sensitivity: 'base' });

    return sortOrder === 'name-desc' ? firstLabel * -1 : firstLabel;
  });
}

function getProductItemDisplayLabel(item) {
  return typeof item === 'string' ? item : item.displayLabel ?? item.label;
}

function getProductStandardSlug(standard) {
  return standard.slug ?? slugifyProductLabel(standard.label);
}

function getProductOptionSlug(itemSlug, standardSlug, option) {
  if (itemSlug === 'mangote' && standardSlug === 'corpo') {
    return option === 'Válvula Mangote Aberto' ? 'corpo-aberto' : 'corpo-fechado';
  }

  return slugifyProductLabel(option);
}

function getProductItemHref(category, item) {
  const label = typeof item === 'string' ? item : item.label;
  const itemHref = `/produtos/${category.slug}/${slugifyProductLabel(label)}`;
  const standards = getVisibleProductStandards(item);

  if (typeof item !== 'string' && item.directOptionCards) {
    return itemHref;
  }

  if (standards.length === 1) {
    return `${itemHref}/${getProductStandardSlug(standards[0])}`;
  }

  return itemHref;
}

function ProductBackButton() {
  return (
    <button
      type="button"
      className="product-page__top-button"
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back();
          return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Voltar"
    >
      <span aria-hidden="true">←</span>
      Voltar
    </button>
  );
}

function normalizeProductSearch(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function ProductBreadcrumb({ items, onNavigate }) {
  return (
    <nav className="product-breadcrumb" aria-label="Trilha de navegação">
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;
        const isLink = Boolean(crumb.href) && !isLast;

        return (
          <span
            key={`${crumb.label}-${index}`}
            className={isLast ? 'is-current' : ''}
            aria-current={isLast ? 'page' : undefined}
          >
            {isLink ? (
              <a href={crumb.href} onClick={onNavigate?.(crumb.href)}>
                {crumb.label}
              </a>
            ) : (
              crumb.label
            )}
          </span>
        );
      })}
    </nav>
  );
}

function ProductSidebar({ activeCategorySlug, activeItemSlug, activeStandardSlug, onNavigate }) {
  return (
    <aside className="product-page__sidebar" aria-label="Navegação de produtos">
      {productCategories.map((category) => {
        const isActive = category.slug === activeCategorySlug;

        return (
          <div key={category.slug} className={`product-sidebar-group ${isActive ? 'is-open' : ''}`.trim()}>
            <a
              className={isActive ? 'is-active' : ''}
              href={`/produtos/${category.slug}`}
              onClick={onNavigate(`/produtos/${category.slug}`)}
              aria-current={isActive ? 'page' : undefined}
            >
              {category.title}
              {isActive ? <span aria-hidden="true">›</span> : null}
            </a>

            {isActive && !category.directOverview ? (
              <div className="product-sidebar-sub">
                {(category.items ?? []).map((productItem) => {
                  const label = typeof productItem === 'string' ? productItem : productItem.label;
                  const displayLabel = getProductItemDisplayLabel(productItem);
                  const itemSlug = slugifyProductLabel(label);
                  const isItemActive = itemSlug === activeItemSlug;
                  const standards = getVisibleProductStandards(productItem);

                  return (
                    <div key={label}>
                      <a
                        className={`product-sidebar-link--sub ${isItemActive ? 'is-active' : ''}`.trim()}
                        href={`/produtos/${category.slug}/${itemSlug}`}
                        onClick={onNavigate(`/produtos/${category.slug}/${itemSlug}`)}
                        aria-current={isItemActive ? 'location' : undefined}
                      >
                        {displayLabel}
                      </a>

                      {isItemActive && standards.length > 1 ? (
                        <div className="product-sidebar-standards">
                          {standards.map((standard) => {
                            const standardSlug = getProductStandardSlug(standard);
                            const standardHref = `/produtos/${category.slug}/${itemSlug}/${standardSlug}`;
                            const isStandardActive = standardSlug === activeStandardSlug;

                            return (
                              <a
                                key={standardSlug}
                                className={`product-sidebar-link--sub product-sidebar-link--nested ${isStandardActive ? 'is-active' : ''}`.trim()}
                                href={standardHref}
                                onClick={onNavigate(standardHref)}
                                aria-current={isStandardActive ? 'location' : undefined}
                              >
                                {standard.label}
                              </a>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </aside>
  );
}

function ProductVariantChips({ categorySlug, itemSlug, standard, optionSlug, onNavigate }) {
  const standardSlug = getProductStandardSlug(standard);

  if (standard.options.length <= 1) {
    return null;
  }

  return (
    <div className="product-spec-variants" aria-label={`${standard.label} disponíveis`}>
      <span className="product-spec-variants__label">{standard.label}</span>
      <div className="product-spec-variants__chips">
        {standard.options.map((option) => {
          const currentOptionSlug = getProductOptionSlug(itemSlug, standardSlug, option);
          const chipHref = `/produtos/${categorySlug}/${itemSlug}/${standardSlug}/${currentOptionSlug}`;
          const isActive = currentOptionSlug === optionSlug;

          return (
            <a
              key={option}
              className={`product-spec-variants__chip ${isActive ? 'is-active' : ''}`.trim()}
              href={chipHref}
              onClick={onNavigate(chipHref)}
              aria-current={isActive ? 'page' : undefined}
            >
              {option}
            </a>
          );
        })}
      </div>
    </div>
  );
}

const PRODUCT_TABLE_SEARCH_MIN_ROWS = 8;

function ProductSpecTable({ header, rows }) {
  const [query, setQuery] = useState('');
  const tokens = normalizeProductSearch(query).split(/\s+/).filter(Boolean);
  const filteredRows = tokens.length
    ? rows.filter((row) => {
        const haystack = normalizeProductSearch(row.join(' '));
        return tokens.every((token) => haystack.includes(token));
      })
    : rows;
  const showSearch = rows.length >= PRODUCT_TABLE_SEARCH_MIN_ROWS;
  const isFiltering = Boolean(tokens.length);

  return (
    <div className="product-spec-table">
      {showSearch ? (
        <>
          <label className="product-spec-table__search">
            <span className="sr-only">Filtrar linhas da tabela</span>
            <input
              type="search"
              value={query}
              placeholder="Filtrar por medida, peso ou classe..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {isFiltering ? (
            <p className="product-spec-table__meta" role="status">
              {filteredRows.length} de {rows.length} linhas
            </p>
          ) : null}
        </>
      ) : null}

      <div className="product-spec-table__scroll" role="region" aria-label="Tabela técnica" tabIndex={0}>
        <table className="product-page__spec-table">
          <thead>
            <tr>
              {header.map((cell) => (
                <th key={cell}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length ? (
              filteredRows.map((row, rowIndex) => (
                <tr key={`${row.join('-')}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Math.max(header.length, 1)} className="product-spec-table__empty">
                  Nenhuma linha corresponde ao filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobileProductControls({ activeCategorySlug, activeItemSlug, onNavigate, sortOrder, onSortChange, showSort = true }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedCategorySlug, setExpandedCategorySlug] = useState(activeCategorySlug ?? null);

  useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFilterOpen]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    setExpandedCategorySlug(activeCategorySlug ?? null);
  }, [activeCategorySlug, isFilterOpen]);

  const closeFilter = () => setIsFilterOpen(false);

  return (
    <div className="product-page__mobile-filter">
      <div className="product-page__mobile-filter-bar" aria-label="Filtros de produtos">
        <ProductBackButton />
        <button type="button" className="product-page__filter-button" onClick={() => setIsFilterOpen(true)}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16l-6.2 7.1v4.7l-3.6 2.2v-6.9L4 6Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filtrar
        </button>
        {showSort ? (
          <label className="product-page__sort-select">
            <span className="sr-only">Ordenar produtos</span>
            <select value={sortOrder} onChange={(event) => onSortChange(event.target.value)}>
              <option value="position">Posição</option>
              <option value="name-asc">Nome A-Z</option>
              <option value="name-desc">Nome Z-A</option>
            </select>
          </label>
        ) : null}
      </div>

      {isFilterOpen ? (
        <div className="product-page__filter-sheet" role="dialog" aria-modal="true" aria-label="Filtrar produtos">
          <div className="product-page__filter-sheet-panel">
            <header>
              <strong>Filtrar</strong>
              <button type="button" onClick={closeFilter} aria-label="Fechar filtros">
                ×
              </button>
            </header>
            <nav aria-label="Categorias">
              <p>Categoria</p>
              {productCategories.map((category) => {
                const href = `/produtos/${category.slug}`;
                const isActive = category.slug === activeCategorySlug;
                const isExpanded = expandedCategorySlug === category.slug;
                const categoryItems = category.items.map((item) => {
                  const label = typeof item === 'string' ? item : item.label;

                  return {
                    label: getProductItemDisplayLabel(item),
                    slug: slugifyProductLabel(label),
                    href: getProductItemHref(category, item),
                  };
                });

                return (
                  <div key={category.slug} className={`product-page__filter-category ${isExpanded ? 'is-open' : ''}`.trim()}>
                    <button
                      type="button"
                      className={`product-page__filter-category-trigger ${isActive ? 'is-active' : ''}`.trim()}
                      onClick={() => setExpandedCategorySlug((currentSlug) => currentSlug === category.slug ? null : category.slug)}
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-filter-category-${category.slug}`}
                    >
                      <span>{category.title}</span>
                      <span aria-hidden="true">{isExpanded ? '−' : '›'}</span>
                    </button>

                    {isExpanded ? (
                      <div id={`mobile-filter-category-${category.slug}`} className="product-page__filter-category-links">
                        <a
                          className={`product-page__filter-category-link ${isActive && !activeItemSlug ? 'is-active' : ''}`.trim()}
                          href={href}
                          onClick={(event) => {
                            closeFilter();
                            onNavigate(href)(event);
                          }}
                          aria-current={isActive && !activeItemSlug ? 'page' : undefined}
                        >
                          Ver todos
                        </a>
                        {categoryItems.map((item) => {
                          const itemHref = item.href;
                          const isActiveItem = isActive && item.slug === activeItemSlug;

                          return (
                            <a
                              key={`${category.slug}-${item.slug}`}
                              className={`product-page__filter-category-link ${isActiveItem ? 'is-active' : ''}`.trim()}
                              href={itemHref}
                              onClick={(event) => {
                                closeFilter();
                                onNavigate(itemHref)(event);
                              }}
                              aria-current={isActiveItem ? 'page' : undefined}
                            >
                              {item.label}
                            </a>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </div>
          <button type="button" className="product-page__filter-backdrop" onClick={closeFilter} aria-label="Fechar filtros" />
        </div>
      ) : null}
    </div>
  );
}

function ProductSpecFinder({ fixedCategorySlug = null, onNavigate }) {
  const [specsData, setSpecsData] = useState(null);
  const [categorySlug, setCategorySlug] = useState(fixedCategorySlug ?? '');
  const [itemSlug, setItemSlug] = useState('');
  const [standardSlug, setStandardSlug] = useState('');
  const [optionSlug, setOptionSlug] = useState('');

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      import('./data/flangeTechnicalSpecs'),
      import('./data/productTechnicalSpecs'),
    ])
      .then(([flangeModule, productModule]) => {
        if (isMounted) {
          setSpecsData({
            flange: flangeModule.flangeTechnicalSpecs,
            product: productModule.productTechnicalSpecs,
          });
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const activeCategory = productCategories.find((category) => category.slug === categorySlug) ?? null;
  const finderItems = activeCategory && !activeCategory.directOverview ? activeCategory.items ?? [] : [];
  const activeItem = finderItems.find((item) => slugifyProductLabel(getProductItemDisplayLabel(item)) === itemSlug) ?? null;
  const displayLabel = activeItem ? getProductItemDisplayLabel(activeItem) : '';
  const standards = getVisibleProductStandards(activeItem);
  const effectiveStandardSlug = standardSlug || (standards.length === 1 ? getProductStandardSlug(standards[0]) : '');
  const activeStandard = standards.find((standard) => getProductStandardSlug(standard) === effectiveStandardSlug) ?? null;
  const options = activeStandard?.options ?? [];
  const effectiveOptionSlug = optionSlug || (options.length === 1 ? getProductOptionSlug(itemSlug, effectiveStandardSlug, options[0]) : '');
  const selectedOption = options.find((option) => getProductOptionSlug(itemSlug, effectiveStandardSlug, option) === effectiveOptionSlug) ?? null;
  const hasSelection = Boolean(activeCategory && activeItem && activeStandard && effectiveOptionSlug);

  let spec = null;

  if (specsData && hasSelection) {
    spec =
      getTechnicalSpec(specsData.flange, itemSlug, effectiveStandardSlug, effectiveOptionSlug) ??
      getProductTechnicalSpec(specsData.product, activeCategory.slug, itemSlug, effectiveStandardSlug, effectiveOptionSlug);
  }

  const specHref = hasSelection
    ? `/produtos/${activeCategory.slug}/${itemSlug}/${effectiveStandardSlug}/${effectiveOptionSlug}`
    : null;
  const figureSrc =
    (selectedOption ? getProductOptionImage(activeItem, selectedOption) : null) ??
    (activeItem && typeof activeItem !== 'string' ? activeItem.image : null) ??
    spec?.images?.[0]?.src ??
    null;

  return (
    <section className="product-finder" aria-label="Consulta rápida de especificações">
      <header className="product-finder__header">
        <span className="eyebrow eyebrow-dark">Consulta rápida</span>
        <h2>SELETOR DE PEÇAS</h2>
        <p>Escolha a categoria, a peça e a variação para ver figura, características e tabelas aqui mesmo, sem trocar de página.</p>
      </header>

      <div className="product-finder__controls">
        {fixedCategorySlug ? null : (
          <label className="product-finder__field">
            <span>Categoria</span>
            <select
              value={categorySlug}
              onChange={(event) => {
                setCategorySlug(event.target.value);
                setItemSlug('');
                setStandardSlug('');
                setOptionSlug('');
              }}
            >
              <option value="">Selecione...</option>
              {productCategories.filter((category) => !category.directOverview).map((category) => (
                <option key={category.slug} value={category.slug}>{category.title}</option>
              ))}
            </select>
          </label>
        )}

        <label className="product-finder__field">
          <span>Peça</span>
          <select
            value={itemSlug}
            onChange={(event) => {
              setItemSlug(event.target.value);
              setStandardSlug('');
              setOptionSlug('');
            }}
            disabled={!activeCategory}
          >
            <option value="">{activeCategory ? 'Selecione...' : 'Escolha uma categoria'}</option>
            {finderItems.map((item) => {
              const label = getProductItemDisplayLabel(item);

              return (
                <option key={slugifyProductLabel(label)} value={slugifyProductLabel(label)}>
                  {label}
                </option>
              );
            })}
          </select>
        </label>

        {standards.length > 1 ? (
          <label className="product-finder__field">
            <span>Padrão</span>
            <select
              value={effectiveStandardSlug}
              onChange={(event) => {
                setStandardSlug(event.target.value);
                setOptionSlug('');
              }}
            >
              <option value="">Selecione...</option>
              {standards.map((standard) => (
                <option key={getProductStandardSlug(standard)} value={getProductStandardSlug(standard)}>
                  {standard.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="product-finder__field">
          <span>{activeStandard ? activeStandard.label : 'Variação'}</span>
          <select
            value={effectiveOptionSlug}
            onChange={(event) => setOptionSlug(event.target.value)}
            disabled={!activeStandard}
          >
            <option value="">{activeStandard ? 'Selecione...' : 'Escolha uma peça'}</option>
            {options.map((option) => (
              <option key={option} value={getProductOptionSlug(itemSlug, effectiveStandardSlug, option)}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {spec ? (
        <FinderResult
          activeCategory={activeCategory}
          displayLabel={displayLabel}
          spec={spec}
          standard={activeStandard}
          selectedOption={selectedOption}
          figureSrc={figureSrc}
          specHref={specHref}
          onNavigate={onNavigate}
        />
      ) : (
        <p className="product-finder__hint">
          {hasSelection && !specsData
            ? 'Carregando especificações...'
            : 'Selecione os campos acima para visualizar as especificações técnicas da peça.'}
        </p>
      )}
    </section>
  );
}

function FinderResult({ activeCategory, displayLabel, spec, standard, selectedOption, figureSrc, specHref, onNavigate }) {
  return (
    <div className="product-finder__result">
      <div className="product-finder__result-head">
        <div>
          <span className="eyebrow eyebrow-dark">{activeCategory.title}</span>
          <h3>{displayLabel} — {spec.title}</h3>
        </div>
        <ProductQuoteButton
          categoryTitle={activeCategory.title}
          productLabel={displayLabel}
          detailLabel={standard.label}
          optionLabel={selectedOption}
        />
      </div>

      <div className="product-finder__result-grid">
        {figureSrc ? (
          <figure className="product-finder__figure">
            <img src={figureSrc} alt={`${displayLabel} ${spec.title}`} loading="lazy" />
          </figure>
        ) : null}

        <div className="product-finder__characteristics">
          <h4>Características</h4>
          {spec.characteristics?.length ? (
            <ul>
              {spec.characteristics.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>Características técnicas sob consulta.</p>
          )}
          {spec.note ? <small className="product-finder__note">{spec.note}</small> : null}
        </div>
      </div>

      {spec.tables?.length ? (
        <div className="product-finder__tables">
          <h4>Dimensões e peso aproximado</h4>
          {spec.tables.map((table, tableIndex) => (
            <ProductSpecTable key={`${spec.title}-${tableIndex}`} header={table[0] ?? []} rows={table.slice(1)} />
          ))}
        </div>
      ) : null}

      {specHref ? (
        <a className="product-finder__open-link" href={specHref} onClick={onNavigate?.(specHref)}>
          Abrir página completa desta peça →
        </a>
      ) : null}
    </div>
  );
}

function ProductOverviewPage({ onNavigate }) {
  const [sortOrder, setSortOrder] = useState('position');
  const sortedCategories = sortProductEntries(productCategories, sortOrder, (category) => category.title);

  return (
    <section className="product-page section-surface">
      <div className="container">
        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">Linha de produtos</span>
          <h1>Produtos</h1>
          <p>
            Escolha uma categoria para conferir nossas válvulas, conexões, flanges, acessórios, instrumentos e demais
            soluções para sistemas hidráulicos e industriais.
          </p>
        </div>

        <ProductSpecFinder onNavigate={onNavigate} />

        <MobileProductControls sortOrder={sortOrder} onSortChange={setSortOrder} onNavigate={onNavigate} />

        <article className="product-page__catalog" aria-label="Categorias de produtos">
          <div className="product-page__grid">
            {sortedCategories.map((category) => {
              const hasImage = Boolean(category.image);

              return (
                <a
                  key={category.slug}
                  className="product-page__card"
                  href={`/produtos/${category.slug}`}
                  onClick={onNavigate(`/produtos/${category.slug}`)}
                  aria-label={`Ver categoria ${category.title}`}
                >
                  <div
                    className={`product-page__card-media ${hasImage ? 'product-page__card-media--mouse-zoom' : ''}`.trim()}
                    onMouseMove={hasImage ? handleProductImageZoomMove : undefined}
                    onMouseLeave={hasImage ? handleProductImageZoomLeave : undefined}
                  >
                    {hasImage ? <img src={category.image} alt={category.title} /> : <span aria-hidden="true">{category.title.slice(0, 1)}</span>}
                  </div>
                  <div className="product-page__card-caption">
                    <strong>{category.title}</strong>
                  </div>
                </a>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}

function ProductCategoryPage({ category, onNavigate }) {
  const [sortOrder, setSortOrder] = useState('position');
  const hasDirectOverview = Boolean(category.directOverview);
  const sortedItems = sortProductEntries(category.items ?? [], sortOrder, (item) => {
    const label = typeof item === 'string' ? item : item.displayLabel ?? item.label;

    return label;
  });

  return (
    <section className="product-page section-surface">
      <div className="container">
        <ProductBreadcrumb
          onNavigate={onNavigate}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Produtos', href: '/produtos' },
            { label: category.title },
          ]}
        />

        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">Linha de produtos</span>
          <h1>{category.title}</h1>
          <p>
            Confira as opções da nossa linha de {category.title.toLowerCase()}. Nossa equipe ajuda a definir a solução,
            o material e as dimensões ideais para a sua operação.
          </p>
        </div>

        {!hasDirectOverview ? (
          <ProductSpecFinder fixedCategorySlug={category.slug} onNavigate={onNavigate} />
        ) : null}

        <div className="product-page__layout">
          <ProductSidebar activeCategorySlug={category.slug} onNavigate={onNavigate} />

          <MobileProductControls
            activeCategorySlug={category.slug}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onNavigate={onNavigate}
          />

          <article className="product-page__catalog" aria-label={`Itens da linha ${category.title}`}>
            {hasDirectOverview ? (
              <div className="product-page__spec">
                <h1 className="product-page__spec-title">{category.productPage?.title ?? category.title}</h1>

                <div className="product-page__spec-overview">
                  <div className="product-page__spec-figure">
                    <h2>Produto</h2>
                    <div className="product-page__spec-images">
                      <div
                        className="product-page__spec-image-frame"
                        onMouseMove={handleProductImageZoomMove}
                        onMouseLeave={handleProductImageZoomLeave}
                      >
                        <img src={category.productPage?.image ?? category.image} alt={category.alt ?? category.title} />
                      </div>
                    </div>
                  </div>

                  <div className="product-page__spec-characteristics">
                    <h2>Características</h2>
                    {Array.isArray(category.productPage?.description) ? (
                      category.productPage.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                    ) : (
                      <p>{category.productPage?.description}</p>
                    )}
                    {category.details?.length ? (
                      <ul>
                        {category.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    ) : null}
                    <ProductQuoteButton categoryTitle={category.title} productLabel={category.productPage?.title ?? category.title} />
                  </div>
                </div>

                <div className="product-page__spec-table-wrap">
                  {(category.productPage?.sections ?? []).map((section) => (
                    <section className="product-page__spec-characteristics product-page__spec-section" key={section.title}>
                      <h2>{section.title}</h2>
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

              </div>
            ) : null}

            {hasDirectOverview ? null : (
            <div className="product-page__grid">
              {sortedItems.map((item) => {
                const label = typeof item === 'string' ? item : item.label;
                const displayLabel = typeof item === 'string' ? item : item.displayLabel ?? label;
                const image = typeof item === 'string' ? null : item.image;
                const alt = typeof item === 'string' ? '' : item.alt ?? displayLabel;
                const mediaClassName = typeof item === 'string' ? '' : item.mediaClassName ?? '';
                const details = typeof item === 'string' ? [] : (item.details ?? []).filter((detail) => !isConsultationOnlyOption(detail));
                const itemHref = getProductItemHref(category, item);

                return (
                  <a
                    key={label}
                    className="product-page__card"
                    href={itemHref}
                    onClick={onNavigate(itemHref)}
                    aria-label={`Ver opções de ${displayLabel}`}
                  >
                    <div
                      className={`product-page__card-media ${mediaClassName} ${image ? 'product-page__card-media--mouse-zoom' : ''}`.trim()}
                      onMouseMove={image ? handleProductImageZoomMove : undefined}
                      onMouseLeave={image ? handleProductImageZoomLeave : undefined}
                    >
                      {image ? (
                        <img src={image} alt={alt} />
                      ) : (
                        <span aria-hidden="true">{displayLabel.slice(0, 1)}</span>
                      )}
                    </div>
                    <div className="product-page__card-caption">
                      <strong>{displayLabel}</strong>
                      {details.length ? (
                        <div className="product-page__card-details" aria-label={`Normas e classes de ${displayLabel}`}>
                          {details.map((detail) => (
                            <small key={detail}>{detail}</small>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </a>
                );
              })}
            </div>
            )}
          </article>
        </div>

        <div className="product-page__mobile-actions">
          <a className="button button-primary" href={whatsappBase} target="_blank" rel="noreferrer">
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductItemPage({ category, productItem, onNavigate }) {
  const label = typeof productItem === 'string' ? productItem : productItem.label;
  const displayLabel = typeof productItem === 'string' ? productItem : productItem.displayLabel ?? label;
  const itemSlug = slugifyProductLabel(label);
  const image = typeof productItem === 'string' ? null : productItem.image;
  const alt = typeof productItem === 'string' ? '' : productItem.alt ?? displayLabel;
  const mediaClassName = typeof productItem === 'string' ? '' : productItem.mediaClassName ?? '';
  const standards = getVisibleProductStandards(productItem);
  const directOptionStandard = typeof productItem === 'string' || !productItem.directOptionCards
    ? null
    : standards[0] ?? null;
  const fallbackCards = [
    {
      label: 'Especificação sob consulta',
      options: ['Material', 'Bitola', 'Classe de pressão', 'Aplicação'],
    },
  ];
  const cards = directOptionStandard ? directOptionStandard.options : standards.length ? standards : fallbackCards;
  const [sortOrder, setSortOrder] = useState('position');
  const sortedCards = sortProductEntries(cards, sortOrder, (card) => (typeof card === 'string' ? card : card.label));

  return (
    <section className="product-page section-surface">
      <div className="container">
        <ProductBreadcrumb
          onNavigate={onNavigate}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Produtos', href: '/produtos' },
            { label: category.title, href: `/produtos/${category.slug}` },
            { label: displayLabel },
          ]}
        />

        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">{category.title}</span>
          <h1>{displayLabel}</h1>
          <p>
            Selecione uma norma, classe ou condição de fornecimento para falar com a equipe da AltaPress e confirmar a
            peça correta para a sua aplicação.
          </p>
        </div>

        <div className="product-page__layout">
          <ProductSidebar
            activeCategorySlug={category.slug}
            activeItemSlug={itemSlug}
            onNavigate={onNavigate}
          />

          <MobileProductControls
            activeCategorySlug={category.slug}
            activeItemSlug={itemSlug}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onNavigate={onNavigate}
          />

          <article className="product-page__catalog" aria-label={`Opções de ${label}`}>
            <div className="product-page__grid">
              {sortedCards.map((card) => {
                const cardLabel = typeof card === 'string' ? card : card.label;
                const detailHref = directOptionStandard
                  ? `/produtos/${category.slug}/${slugifyProductLabel(label)}/${slugifyProductLabel(directOptionStandard.label)}/${slugifyProductLabel(cardLabel)}`
                  : standards.length
                  ? `/produtos/${category.slug}/${slugifyProductLabel(label)}/${slugifyProductLabel(card.label)}`
                  : buildProductQuoteHref({
                      categoryTitle: category.title,
                      productLabel: displayLabel,
                      detailLabel: cardLabel,
                    });
                const cardImage = directOptionStandard ? getProductOptionImage(productItem, cardLabel) ?? image : image;
                const cardAlt = directOptionStandard ? `${cardLabel} da AltaPress.` : alt;

                return (
                  <a
                    key={cardLabel}
                    className="product-page__card product-page__card--detail"
                    href={detailHref}
                    target={standards.length || directOptionStandard ? undefined : '_blank'}
                    rel={standards.length || directOptionStandard ? undefined : 'noreferrer'}
                    onClick={standards.length || directOptionStandard ? onNavigate(detailHref) : undefined}
                    aria-label={standards.length || directOptionStandard ? `Ver ${displayLabel} ${cardLabel}` : `Consultar ${label} ${cardLabel}`}
                  >
                    <div
                      className={`product-page__card-media ${mediaClassName} ${cardImage ? 'product-page__card-media--mouse-zoom' : ''}`.trim()}
                      onMouseMove={cardImage ? handleProductImageZoomMove : undefined}
                      onMouseLeave={cardImage ? handleProductImageZoomLeave : undefined}
                    >
                      {cardImage ? (
                        <img src={cardImage} alt={cardAlt} />
                      ) : (
                        <span aria-hidden="true">{label.slice(0, 1)}</span>
                      )}
                    </div>
                    <div className="product-page__card-caption">
                      <strong>{cardLabel}</strong>
                      {typeof card === 'string' ? null : (
                        <ul className="product-page__card-list">
                          {card.options.map((option) => (
                            <li key={option}>{option}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProductStandardPage({ category, productItem, standard, onNavigate }) {
  const label = typeof productItem === 'string' ? productItem : productItem.label;
  const displayLabel = typeof productItem === 'string' ? productItem : productItem.displayLabel ?? label;
  const itemSlug = slugifyProductLabel(label);
  const image = typeof productItem === 'string' ? null : productItem.image;
  const alt = typeof productItem === 'string' ? '' : productItem.alt ?? displayLabel;
  const mediaClassName = typeof productItem === 'string' ? '' : productItem.mediaClassName ?? '';
  const [sortOrder, setSortOrder] = useState('position');
  const sortedOptions = sortProductEntries(standard.options, sortOrder, (option) => option);

  return (
    <section className="product-page section-surface">
      <div className="container">
        <ProductBreadcrumb
          onNavigate={onNavigate}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Produtos', href: '/produtos' },
            { label: category.title, href: `/produtos/${category.slug}` },
            { label: displayLabel },
          ]}
        />

        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">{displayLabel}</span>
          <h1>{standard.label}</h1>
          <p>
            Escolha a classe de fornecimento e fale com a AltaPress para confirmar disponibilidade, dimensão e aplicação.
          </p>
        </div>

        <div className="product-page__layout">
          <ProductSidebar
            activeCategorySlug={category.slug}
            activeItemSlug={itemSlug}
            onNavigate={onNavigate}
          />

          <MobileProductControls
            activeCategorySlug={category.slug}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onNavigate={onNavigate}
          />

          <article className="product-page__catalog" aria-label={`Classes de ${displayLabel} ${standard.label}`}>
            <div className="product-page__grid">
              {sortedOptions.map((option) => (
                (() => {
                  const standardSlug = getProductStandardSlug(standard);
                  const optionSlug = getProductOptionSlug(itemSlug, standardSlug, option);
                  const specHref = `/produtos/${category.slug}/${itemSlug}/${standardSlug}/${optionSlug}`;
                  const optionImage = getProductOptionImage(productItem, option) ?? image;
                  const optionAlt = optionImage === image ? alt : `${option} da AltaPress.`;

                  return (
                    <a
                      key={option}
                      className="product-page__card product-page__card--class"
                      href={specHref}
                      onClick={onNavigate(specHref)}
                      aria-label={`Ver tabela técnica de ${displayLabel} ${standard.label} ${option}`}
                    >
                      <div
                        className={`product-page__card-media ${mediaClassName} ${optionImage ? 'product-page__card-media--mouse-zoom' : ''}`.trim()}
                        onMouseMove={optionImage ? handleProductImageZoomMove : undefined}
                        onMouseLeave={optionImage ? handleProductImageZoomLeave : undefined}
                      >
                        {optionImage ? (
                          <img src={optionImage} alt={optionAlt} />
                        ) : (
                          <span aria-hidden="true">{label.slice(0, 1)}</span>
                        )}
                      </div>
                      <div className="product-page__card-caption">
                        <strong>{option}</strong>
                      </div>
                    </a>
                  );
                })()
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function handleProductImageZoomMove(event) {
  if (!hasDesktopImageInteractions()) {
    event.currentTarget.style.removeProperty('--zoom-x');
    event.currentTarget.style.removeProperty('--zoom-y');
    return;
  }

  const bounds = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;

  event.currentTarget.style.setProperty('--zoom-x', `${x}%`);
  event.currentTarget.style.setProperty('--zoom-y', `${y}%`);
}

function handleProductImageZoomLeave(event) {
  event.currentTarget.style.removeProperty('--zoom-x');
  event.currentTarget.style.removeProperty('--zoom-y');
}

function ProductSpecGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0] ?? null);
  const galleryKey = images.map((imageItem) => imageItem.src).join('|');

  useEffect(() => {
    setActiveImage(images[0] ?? null);
  }, [galleryKey]);

  if (!images.length || !activeImage) {
    return null;
  }

  return (
    <div className="product-page__animated-gallery">
      <div
        className="product-page__animated-gallery-main"
        onMouseMove={handleProductImageZoomMove}
        onMouseLeave={handleProductImageZoomLeave}
      >
        <img src={activeImage.src} alt={activeImage.alt} />
      </div>
      <div className="product-page__animated-gallery-thumbs" aria-label="Variações de acionamento">
        {images.map((galleryImage) => {
          const isActive = galleryImage.src === activeImage.src;

          return (
            <button
              key={galleryImage.src}
              type="button"
              className={isActive ? 'is-active' : ''}
              onClick={() => setActiveImage(galleryImage)}
              aria-pressed={isActive}
              aria-label={`Ver ${galleryImage.alt}`}
            >
              <img src={galleryImage.src} alt="" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductSpecPage({ category, productItem, standard, optionSlug, onNavigate }) {
  const label = typeof productItem === 'string' ? productItem : productItem.label;
  const displayLabel = typeof productItem === 'string' ? productItem : productItem.displayLabel ?? label;
  const itemSlug = slugifyProductLabel(label);
  const standardSlug = getProductStandardSlug(standard);
  const selectedOption = standard.options.find((option) => getProductOptionSlug(itemSlug, standardSlug, option) === optionSlug);
  const productImage = typeof productItem === 'string' ? null : productItem.image;
  const image = (selectedOption ? getProductOptionImage(productItem, selectedOption) : null) ?? productImage;
  const alt = selectedOption ? `${selectedOption} da AltaPress.` : typeof productItem === 'string' ? label : productItem.alt ?? label;
  const [spec, setSpec] = useState(null);
  const [specStatus, setSpecStatus] = useState('loading');
  const figureImages = spec
    ? [
        ...(category.slug === 'valvulas' && itemSlug === 'guilhotina' ? [] : image ? [{ src: image, alt }] : []),
        ...(category.slug === 'flanges' ? spec.images?.slice(1) ?? [] : []),
        ...(category.slug === 'valvulas' && itemSlug === 'guilhotina' ? spec.images ?? [] : []),
      ]
    : [];
  const hasInteractiveGallery = category.slug === 'valvulas' && itemSlug === 'guilhotina';

  useEffect(() => {
    let isMounted = true;

    setSpecStatus('loading');

    Promise.all([
      import('./data/flangeTechnicalSpecs'),
      import('./data/productTechnicalSpecs'),
    ])
      .then(([flangeModule, productModule]) => {
        if (!isMounted) {
          return;
        }

        const nextSpec =
          getTechnicalSpec(flangeModule.flangeTechnicalSpecs, itemSlug, standardSlug, optionSlug) ??
          getProductTechnicalSpec(productModule.productTechnicalSpecs, category.slug, itemSlug, standardSlug, optionSlug);

        setSpec(nextSpec);
        setSpecStatus(nextSpec ? 'ready' : 'missing');
      })
      .catch(() => {
        if (isMounted) {
          setSpecStatus('missing');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [itemSlug, optionSlug, standardSlug]);

  return (
    <section className="product-page section-surface">
      <div className="container">
        <ProductBreadcrumb
          onNavigate={onNavigate}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Produtos', href: '/produtos' },
            { label: category.title, href: `/produtos/${category.slug}` },
            { label: displayLabel, href: `/produtos/${category.slug}/${itemSlug}` },
            { label: standard.label, href: `/produtos/${category.slug}/${itemSlug}/${standardSlug}` },
            { label: selectedOption ?? spec?.title ?? standard.label },
          ]}
        />

        <div className="product-page__layout">
          <ProductSidebar
            activeCategorySlug={category.slug}
            activeItemSlug={itemSlug}
            activeStandardSlug={standardSlug}
            onNavigate={onNavigate}
          />

          <MobileProductControls
            activeCategorySlug={category.slug}
            activeItemSlug={itemSlug}
            sortOrder="position"
            onSortChange={() => {}}
            onNavigate={onNavigate}
          />

          <article className="product-page__spec" aria-label={`Tabela técnica de ${label} ${standard.label}`}>
            {specStatus === 'loading' ? (
              <div className="product-page__spec-state">
                Carregando especificações técnicas...
              </div>
            ) : null}

            {specStatus === 'missing' ? (
              <div className="product-page__spec-state">
                Especificações técnicas sob consulta. Fale com a AltaPress para confirmar medidas e disponibilidade.
              </div>
            ) : null}

            {spec ? (
              <>
                <h1 className="product-page__spec-title">{spec.title}</h1>

                <ProductVariantChips
                  categorySlug={category.slug}
                  itemSlug={itemSlug}
                  standard={standard}
                  optionSlug={optionSlug}
                  onNavigate={onNavigate}
                />

                <div className="product-page__spec-overview">
                  <div className="product-page__spec-figure">
                    <h2>Figura</h2>
                    {figureImages.length ? (
                      hasInteractiveGallery ? (
                        <ProductSpecGallery images={figureImages} />
                      ) : (
                        <div className="product-page__spec-images">
                          {figureImages.map((figureImage) => (
                            <div
                              className="product-page__spec-image-frame"
                              key={figureImage.src}
                              onMouseMove={handleProductImageZoomMove}
                              onMouseLeave={handleProductImageZoomLeave}
                            >
                              <img src={figureImage.src} alt={figureImage.alt} />
                            </div>
                          ))}
                        </div>
                      )
                    ) : null}
                  </div>

                  <div className="product-page__spec-characteristics">
                    <h2>Características</h2>
                    {spec.characteristics?.length ? (
                      <ul>
                        {spec.characteristics.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Características técnicas sob consulta.</p>
                    )}
                    <ProductQuoteButton
                      categoryTitle={category.title}
                      productLabel={displayLabel}
                      detailLabel={standard.label}
                      optionLabel={selectedOption}
                    />
                  </div>
                </div>

                <p className="product-page__spec-note">{spec.note}</p>

                {spec.tables.length ? (
                  <div className="product-page__spec-table-wrap">
                    <h2>Dimensões e peso aproximado</h2>
                    {spec.tables.map((table, tableIndex) => (
                      <ProductSpecTable
                        key={`${spec.title}-${tableIndex}`}
                        header={table[0] ?? []}
                        rows={table.slice(1)}
                      />
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}

          </article>
        </div>
      </div>
    </section>
  );
}

function TechnicalContentFinder({ categories, pages, technicalBase }) {
  const [categorySlug, setCategorySlug] = useState('');
  const [pageSlug, setPageSlug] = useState('');

  const categoryOptions = categories.filter((category) => pages.some((page) => page.categorySlug === category.slug));
  const categoryPages = pages.filter((page) => page.categorySlug === categorySlug);
  const effectivePageSlug = pageSlug || (categoryPages.length === 1 ? categoryPages[0].slug : '');
  const activePage = categoryPages.find((page) => page.slug === effectivePageSlug) ?? null;

  return (
    <div className="technical-finder">
      <div className="technical-finder__controls">
        <label className="technical-finder__field">
          <span>Categoria</span>
          <select
            value={categorySlug}
            onChange={(event) => {
              setCategorySlug(event.target.value);
              setPageSlug('');
            }}
          >
            <option value="">Selecione...</option>
            {categoryOptions.map((category) => (
              <option key={category.slug} value={category.slug}>{category.title}</option>
            ))}
          </select>
        </label>

        <label className="technical-finder__field">
          <span>Conteúdo</span>
          <select
            value={effectivePageSlug}
            onChange={(event) => setPageSlug(event.target.value)}
            disabled={!categorySlug}
          >
            <option value="">{categorySlug ? 'Selecione...' : 'Escolha uma categoria'}</option>
            {categoryPages.map((page) => (
              <option key={page.slug} value={page.slug}>
                {page.title.split('»').pop().trim()}
              </option>
            ))}
          </select>
        </label>
      </div>

      {activePage ? (
        <div className="technical-finder__result">
          <div className="technical-finder__result-head">
            <div>
              <span className="eyebrow eyebrow-dark">{activePage.category}</span>
              <h3>{activePage.title.split('»').pop().trim()}</h3>
            </div>
            <a
              className="button button-primary technical-button technical-finder__open"
              href={`${technicalBase}/${activePage.categorySlug}/${activePage.slug}`}
            >
              Página completa →
            </a>
          </div>

          {activePage.description ? (
            <p className="technical-finder__description">{activePage.description}</p>
          ) : null}

          {activePage.imagePath ? (
            <figure className="technical-article__visual">
              <img src={activePage.imagePath} alt={activePage.imageAlt || `Ilustração técnica sobre ${activePage.title}`} loading="lazy" />
            </figure>
          ) : null}

          <div className="technical-imported-content" dangerouslySetInnerHTML={{ __html: activePage.html }} />
        </div>
      ) : (
        <p className="technical-finder__hint">
          Selecione os campos acima para ler o conteúdo técnico aqui mesmo, sem trocar de página.
        </p>
      )}
    </div>
  );
}

function TechnicalInfoPage({ pathname = '/informacoes-tecnicas' }) {
  const technicalYellow = '#e21d2f';
  const whatsappNumber = '5531972671038';
  const whatsappTechnicalUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá, preciso de ajuda técnica para selecionar um componente hidráulico de alta pressão.')}`;
  const [technicalData, setTechnicalData] = useState({ categories: [], pages: [] });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const technicalBase = '/informacoes-tecnicas';
  const valacoTechnicalCategories = technicalData.categories;
  const valacoTechnicalPages = technicalData.pages;
  const pathParts = pathname.replace(technicalBase, '').split('/').filter(Boolean);
  const activeCategory = valacoTechnicalCategories.find((category) => category.slug === pathParts[0]);
  const activePage = activeCategory && pathParts[1]
    ? valacoTechnicalPages.find((page) => page.categorySlug === activeCategory.slug && page.slug === pathParts[1])
    : null;
  const categoryPages = activeCategory
    ? valacoTechnicalPages.filter((page) => page.categorySlug === activeCategory.slug)
    : [];

  useEffect(() => {
    let isMounted = true;
    import('./data/technical/valacoTechnicalData').then((module) => {
      if (isMounted) {
        setTechnicalData({
          categories: module.valacoTechnicalCategories,
          pages: module.valacoTechnicalPages,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content') ?? '';
    const pageTitle = activePage?.title?.split('»').pop()?.trim() || activeCategory?.title || 'Informações Técnicas';

    document.title = `${pageTitle} | AltaPress`;
    description?.setAttribute(
      'content',
      activePage?.description || activeCategory?.description || 'Consulte informações, tabelas, normas, materiais, conversões e referências técnicas para sistemas hidráulicos e industriais AltaPress.'
    );

    return () => {
      document.title = previousTitle;
      description?.setAttribute('content', previousDescription);
    };
  }, [activeCategory, activePage]);

  useEffect(() => {
    const section = document.getElementById('informacoes-tecnicas');
    if (!section || !('IntersectionObserver' in window)) return undefined;
    const targets = section.querySelectorAll('.technical-reveal');
    if (!targets.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [technicalData, activeCategory, activePage, pathname]);

  const pageTitle = activePage?.title?.split('»').pop()?.trim();
  const activePageIndex = activePage ? categoryPages.findIndex((page) => page.slug === activePage.slug) : -1;
  const previousTechnicalPage = activePageIndex > 0 ? categoryPages[activePageIndex - 1] : null;
  const nextTechnicalPage = activePageIndex >= 0 && activePageIndex < categoryPages.length - 1 ? categoryPages[activePageIndex + 1] : null;

  return (
    <section className="technical-center" id="informacoes-tecnicas" style={{ '--technical-yellow': technicalYellow }}>
      <div className="technical-center__hero">
        <img src={altaPressHeroValvesWide} alt="Componentes industriais de alta pressão Alta Press" />
        <div className="technical-center__hero-overlay" />
        <div className="technical-center__hero-blueprint" aria-hidden="true" />
        <div className="technical-center__hero-frame" aria-hidden="true"><i /></div>
        <div className="container technical-center__hero-content">
          <span className="eyebrow">Central Técnica Industrial</span>
          <h1><span>Informações</span><span>Técnicas</span></h1>
          <p>
            Consulte informações, tabelas, normas, materiais, conversões e referências técnicas para sistemas hidráulicos
            e industriais.
          </p>
          {(valacoTechnicalCategories.length > 0 || valacoTechnicalPages.length > 0) && (
            <div className="technical-hero-stats">
              <div>
                <strong>{valacoTechnicalCategories.length}</strong>
                <span>categorias</span>
              </div>
              <i aria-hidden="true" />
              <div>
                <strong>{valacoTechnicalPages.length}</strong>
                <span>referências técnicas</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="technical-center__body">
        {!activeCategory && !activePage ? (
          <>
        <section className="technical-section" id="consulta-rapida" aria-labelledby="technical-finder-title">
          <div className="container">
            <div className="technical-heading technical-reveal">
              <span className="eyebrow eyebrow-dark">Consulta rápida</span>
              <h2 id="technical-finder-title">SELETOR DE CONTEÚDO TÉCNICO</h2>
              <p>Escolha a categoria e o conteúdo para ler aqui mesmo — com tabelas, figuras e link para a página completa.</p>
            </div>
            <TechnicalContentFinder
              categories={valacoTechnicalCategories}
              pages={valacoTechnicalPages}
              technicalBase={technicalBase}
            />
          </div>
        </section>

          </>
        ) : (
          <section className="technical-section technical-section--light">
            <div className="container technical-detail-layout">
              <button
                type="button"
                className="technical-nav-toggle"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((open) => !open)}
              >
                <span>Navegação{activeCategory ? ` · ${activeCategory.title}` : ''}</span>
                <i aria-hidden="true">{mobileNavOpen ? '▴' : '▾'}</i>
              </button>
              <aside className={`technical-sidebar${mobileNavOpen ? ' is-expanded' : ''}`.trimEnd()}>
                <a href={technicalBase}>Central Técnica</a>
                {valacoTechnicalCategories.map((category) => {
                  const isCategoryActive = category.slug === activeCategory?.slug;
                  const categoryContents = valacoTechnicalPages.filter((page) => page.categorySlug === category.slug);

                  return (
                    <div key={category.slug} className="technical-sidebar-group">
                      <a className={isCategoryActive ? 'is-active' : undefined} href={`${technicalBase}/${category.slug}`}>
                        {category.title}
                      </a>
                      {isCategoryActive && categoryContents.length ? (
                        <div className="technical-sidebar-contents">
                          {categoryContents.map((page) => (
                            <a
                              key={page.slug}
                              className={activePage && page.slug === activePage.slug ? 'is-current' : undefined}
                              href={`${technicalBase}/${category.slug}/${page.slug}`}
                            >
                              {page.title.split('»').pop().trim()}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </aside>
              <article className="technical-article technical-reveal">
                <nav className="technical-breadcrumb" aria-label="Breadcrumb">
                  <a href="/">Home</a><a href={technicalBase}>Informações Técnicas</a>{activeCategory ? (activePage ? <a href={`${technicalBase}/${activeCategory.slug}`}>{activeCategory.title}</a> : <span>{activeCategory.title}</span>) : null}{activePage && <span>{pageTitle}</span>}
                </nav>
                {activePage ? (
                  <>
                    <span className="eyebrow eyebrow-dark">{activePage.category}</span>
                    <h2>{pageTitle}</h2>
                    {activePage.imagePath && (
                      <figure className="technical-article__visual">
                        <img src={activePage.imagePath} alt={activePage.imageAlt || `Ilustração técnica 3D sobre ${pageTitle}`} loading="lazy" />
                      </figure>
                    )}
                    <p className="technical-scroll-note">No celular, deslize as tabelas para visualizar mais →</p>
                    <div className="technical-imported-content" dangerouslySetInnerHTML={{ __html: activePage.html }} />
                    {previousTechnicalPage || nextTechnicalPage ? (
                      <nav className="technical-pager" aria-label="Conteúdos da mesma categoria">
                        {previousTechnicalPage ? (
                          <a
                            className="technical-pager__link technical-pager__link--prev"
                            href={`${technicalBase}/${previousTechnicalPage.categorySlug}/${previousTechnicalPage.slug}`}
                          >
                            <small>← Anterior</small>
                            <strong>{previousTechnicalPage.title.split('»').pop().trim()}</strong>
                          </a>
                        ) : <span aria-hidden="true" />}
                        {nextTechnicalPage ? (
                          <a
                            className="technical-pager__link technical-pager__link--next"
                            href={`${technicalBase}/${nextTechnicalPage.categorySlug}/${nextTechnicalPage.slug}`}
                          >
                            <small>Próximo →</small>
                            <strong>{nextTechnicalPage.title.split('»').pop().trim()}</strong>
                          </a>
                        ) : null}
                      </nav>
                    ) : null}
                  </>
                ) : (
                  <>
                    <span className="eyebrow eyebrow-dark">Categoria</span>
                    <h2>{activeCategory.title}</h2>
                    <p>{activeCategory.description}</p>
                    <div className="technical-existing-grid">
                      {categoryPages.map((item, index) => (
                        <article
                          className="technical-existing-card technical-reveal"
                          key={item.slug}
                          style={{ '--reveal-delay': `${Math.min(index * 50, 300)}ms` }}
                        >
                          <h3>{item.title.split('»').pop().trim()}</h3>
                          <p>{item.description}</p>
                          <a href={`${technicalBase}/${item.categorySlug}/${item.slug}`}>Consultar conteúdo</a>
                        </article>
                      ))}
                    </div>
                  </>
                )}
                <div className="technical-notice">
                  <h3>Nota técnica</h3>
                  <p>Os dados apresentados nesta central possuem caráter informativo e de referência. A seleção de componentes deve considerar pressão, temperatura, fluido, material, norma aplicável e demais condições específicas do projeto. Em caso de dúvida, consulte a equipe técnica da AltaPress.</p>
                  <a className="button button-primary technical-button" href={whatsappTechnicalUrl} target="_blank" rel="noreferrer">Falar com um especialista</a>
                </div>
              </article>
            </div>
          </section>
        )}

        <section className="technical-cta" aria-labelledby="technical-cta-title">
          <div className="container technical-reveal">
            <h2 id="technical-cta-title">NÃO ENCONTROU A ESPECIFICAÇÃO QUE PRECISA?</h2>
            <p>Nossa equipe técnica pode ajudar na seleção do componente ideal para sua aplicação.</p>
            <span>Envie sua aplicação, desenho ou especificação.</span>
            <div className="technical-cta__actions">
              <a className="button button-primary technical-button" href={whatsappTechnicalUrl} target="_blank" rel="noreferrer">FALAR COM ESPECIALISTA</a>
              <a className="button button-secondary technical-button-secondary" href={whatsappTechnicalUrl} target="_blank" rel="noreferrer">SOLICITAR ORÇAMENTO</a>
              <a className="button button-secondary technical-button-secondary" href="mailto:comercial@altapress.com.br">ENVIAR DESENHO / ESPECIFICAÇÃO</a>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}
function App() {
  const [name, setName] = useState('');
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductMenuOpen, setMobileProductMenuOpen] = useState(false);
  const [currentPathname, setCurrentPathname] = useState(() => normalizePathname(window.location.pathname));
  const headerRef = useRef(null);
  const mascotVideoRef = useRef(null);

  useEffect(() => {
    const syncRoutePosition = (behavior = 'auto') => {
      window.requestAnimationFrame(() => {
        const sectionId = getSectionIdFromLocation(window.location);
        if (sectionId) {
          scrollToSection(sectionId, behavior);
        }
      });
    };

    const handlePopState = () => {
      setCurrentPathname(normalizePathname(window.location.pathname));
      syncRoutePosition('smooth');
    };

    syncRoutePosition('auto');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    };

    updateHeaderHeight();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && headerRef.current
        ? new ResizeObserver(updateHeaderHeight)
        : null;

    if (resizeObserver && headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    if (motionPreference?.matches) {
      return undefined;
    }

    const slideInterval = window.setInterval(() => {
      setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 8000);

    return () => {
      window.clearInterval(slideInterval);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const shouldLockScroll = mobileMenuOpen && window.innerWidth <= 860;
    const previousOverflow = document.body.style.overflow;

    if (shouldLockScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const handleInternalNavigation = (href, sectionId) => (event) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setMobileProductMenuOpen(false);

    if (window.location.pathname !== href || window.location.hash) {
      window.history.pushState({}, '', href);
    }

    setCurrentPathname(normalizePathname(href));
    window.requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  };

  const handleProductsMenuNavigation = (event) => {
    event.preventDefault();
    setMobileProductMenuOpen((currentValue) => !currentValue);
  };

  const handleProductNavigation = (href) => (event) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setMobileProductMenuOpen(false);
    window.history.pushState({}, '', href);
    setCurrentPathname(normalizePathname(href));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = name.trim()
      ? `Olá, meu nome é ${name.trim()}. Gostaria de falar com a AltaPress sobre peças hidráulicas de alta pressão.`
      : 'Olá, gostaria de falar com a AltaPress sobre peças hidráulicas de alta pressão.';

    window.open(
      `https://wa.me/5531991878767?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const goToHeroSlide = (slideIndex) => {
    setActiveHeroSlide(slideIndex);
  };

  const toggleMascotVideoSound = () => {
    const video = mascotVideoRef.current;

    if (!video) {
      return;
    }

    video.muted = !video.muted;
    video.volume = 1;
    video.play();
  };

  const showPreviousHeroSlide = () => {
    setActiveHeroSlide((currentSlide) => (currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const showNextHeroSlide = () => {
    setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  };

  const activeProductRoute = getProductRouteFromPath(currentPathname);
  const activeProductCategory = activeProductRoute?.category ?? null;
  const isProductsPage = currentPathname === '/produtos';
  const isTechnicalInfoPage = currentPathname === '/informacoes-tecnicas' || currentPathname.startsWith('/informacoes-tecnicas/');
  const isProductDetailRoute = Boolean(activeProductRoute?.item);
  const activeProductStandards = getVisibleProductStandards(activeProductRoute?.item);
  const activeSingleStandard = activeProductStandards.length === 1 ? activeProductStandards[0] : null;

  return (
    <div className={`site-shell${isProductDetailRoute ? ' site-shell--product-detail' : ''}`}>
      <header ref={headerRef} className="site-header">
        <div className="container nav-bar">
          <a
            className="brand"
            href="/"
            aria-label="Ir para a home da AltaPress"
            onClick={handleInternalNavigation('/', 'home')}
          >
            <img src={media.logo} alt="Logo AltaPress" />
          </a>

          <button
            className={`menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            aria-label={mobileMenuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
            onClick={() =>
              setMobileMenuOpen((current) => {
                if (current) {
                  setMobileProductMenuOpen(false);
                }
                return !current;
              })
            }
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`nav-panel ${mobileMenuOpen ? 'is-open' : ''}`}>
            <nav id="primary-navigation" className="main-nav" aria-label="Navegação principal">
              {navItems.map((item) =>
                item.sectionId === 'produtos' ? (
                  <div key={item.label} className={`nav-product-menu ${mobileProductMenuOpen ? 'is-mobile-open' : ''}`}>
                    <a
                      href={item.href}
                      aria-expanded={mobileProductMenuOpen}
                      onClick={handleProductsMenuNavigation}
                    >
                      {item.label}
                    </a>
                    <div className="nav-product-menu__dropdown" aria-label="Categorias de produtos">
                      {productCategories.map((category) => (
                        <a key={category.title} href={`/produtos/${category.slug}`} onClick={handleProductNavigation(`/produtos/${category.slug}`)}>
                          {category.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a key={item.label} href={item.href} onClick={handleInternalNavigation(item.href, item.sectionId)}>
                    {item.label}
                  </a>
                ),
              )}
            </nav>

            <div className="header-socials" aria-label="Redes sociais">
              <a href={socialLinks[0].href} target="_blank" rel="noreferrer" aria-label="Instagram da AltaPress">
                <InstagramIcon />
              </a>
              <a href={socialLinks[2].href} target="_blank" rel="noreferrer" aria-label="LinkedIn da AltaPress">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {isProductsPage ? (
          <ProductOverviewPage onNavigate={handleProductNavigation} />
        ) : activeProductRoute?.item && activeProductRoute?.standard && activeProductRoute?.optionSlug ? (
          <ProductSpecPage
            category={activeProductRoute.category}
            productItem={activeProductRoute.item}
            standard={activeProductRoute.standard}
            optionSlug={activeProductRoute.optionSlug}
            onNavigate={handleProductNavigation}
          />
        ) : activeProductRoute?.item && activeProductRoute?.standard ? (
          <ProductStandardPage
            category={activeProductRoute.category}
            productItem={activeProductRoute.item}
            standard={activeProductRoute.standard}
            onNavigate={handleProductNavigation}
          />
        ) : activeProductRoute?.item && activeSingleStandard ? (
          <ProductStandardPage
            category={activeProductRoute.category}
            productItem={activeProductRoute.item}
            standard={activeSingleStandard}
            onNavigate={handleProductNavigation}
          />
        ) : activeProductRoute?.item ? (
          <ProductItemPage
            category={activeProductRoute.category}
            productItem={activeProductRoute.item}
            onNavigate={handleProductNavigation}
          />
        ) : activeProductCategory ? (
          <ProductCategoryPage category={activeProductCategory} onNavigate={handleProductNavigation} />
        ) : isTechnicalInfoPage ? (
          <TechnicalInfoPage pathname={currentPathname} />
        ) : (
          <>
        <section className="hero" id="home" aria-label="Destaques da AltaPress">
          <div className="hero-carousel-shell">
            <div className="hero-carousel" aria-roledescription="carousel" aria-label="Carrossel principal">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`hero-slide ${slide.className ?? ''} ${activeHeroSlide === index ? 'is-active' : ''}`.trim()}
                  aria-hidden={activeHeroSlide !== index}
                >
                  <img src={slide.image} alt={slide.alt} />
                </div>
              ))}

              <div className="hero-carousel-overlay" aria-hidden="true" />

              {heroSlides.length > 1 && (
                <>
                  <div className="hero-carousel-controls">
                    <button className="hero-carousel-control" type="button" aria-label="Slide anterior" onClick={showPreviousHeroSlide}>
                      <CarouselArrowIcon direction="left" />
                    </button>
                    <button className="hero-carousel-control" type="button" aria-label="Próximo slide" onClick={showNextHeroSlide}>
                      <CarouselArrowIcon direction="right" />
                    </button>
                  </div>

                  <div className="hero-carousel-dots" role="tablist" aria-label="Selecionar slide">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.image}
                        className={`hero-carousel-dot ${activeHeroSlide === index ? 'is-active' : ''}`}
                        type="button"
                        role="tab"
                        aria-label={`Ir para o slide ${index + 1}`}
                        aria-selected={activeHeroSlide === index}
                        onClick={() => goToHeroSlide(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="container hero-intro-wrap">
              <div className="hero-intro-card">
                <div className="hero-copy">
                  <span className="eyebrow eyebrow-dark">AltaPress</span>
                  <h1>Conectando sistemas com qualidade, segurança e precisão.</h1>
                  <p className="lead">
                    Loja especializada em válvulas e conexões hidráulicas para alta pressão, garantindo qualidade,
                    durabilidade e confiança para o seu equipamento.
                  </p>

                  <div className="hero-actions">
                    <a className="button button-primary" href="/produtos" onClick={handleProductNavigation('/produtos')}>
                      Ver Produtos
                    </a>
                    <a
                      className="button button-secondary"
                      href="/quem-somos"
                      onClick={handleInternalNavigation('/quem-somos', 'quem-somos')}
                    >
                      Saiba Mais
                    </a>
                  </div>

                  <div className="highlight-row">
                    {highlights.map((item) => (
                      <span key={item} className="highlight-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-surface" id="produtos">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow eyebrow-dark">Produtos</span>
              <h2>Válvulas, conexões e suporte técnico para sistemas exigentes.</h2>
              <p>
                Na AltaPress, oferecemos peças hidráulicas de alta pressão para garantir segurança e eficiência em seus
                sistemas.
              </p>
            </div>

            <div className="services-grid">
              {serviceCards.map((card) => {
                const category = productCategories.find((item) => item.title === card.title);

                return (
                <article key={card.title} className="service-card">
                  <div className={`service-card__image${card.title === 'Suporte Técnico' ? ' service-card__image--support' : ''}`}>
                    <img src={card.image} alt={card.title} />
                  </div>
                  <div className="service-card__body">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span>{card.detail}</span>
                    {category && (
                      <a className="service-card__link" href={`/produtos/${category.slug}`} onClick={handleProductNavigation(`/produtos/${category.slug}`)}>
                        Ver categoria &rarr;
                      </a>
                    )}
                  </div>
                </article>
                );
              })}
            </div>

            <div className="catalog-grid">
              <article className="catalog-card">
                <span className="eyebrow eyebrow-dark">Portfólio</span>
                <h3>Uma linha completa para aplicações industriais.</h3>
                <p>
                  AltaPress Válvulas e Conexões é especializada no fornecimento de soluções industriais para sistemas
                  hidráulicos, oferecendo produtos de alta qualidade para aplicações que exigem desempenho, segurança e
                  durabilidade.
                </p>
                <p className="catalog-card__note">
                  Trabalhamos com itens selecionados para aplicações industriais. Consulte nossa equipe para confirmar a
                  disponibilidade e a especificação mais adequada ao seu sistema.
                </p>
              </article>

              <article className="catalog-card catalog-card-contrast">
                <span className="eyebrow">Setores Atendidos</span>
                <h3>Presença em diferentes operações e demandas de campo.</h3>
                <p>
                  Atendemos setores como indústria, construção, saneamento, agronegócio, mineração e óleo & gás com
                  soluções sob medida.
                </p>
                <div className="chip-grid">
                  {sectors.map((sector) => (
                    <span key={sector} className="sector-chip">
                      {sector}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="quem-somos">
          <div className="container company-grid">
            <div className="company-copy">
              <span className="eyebrow">Quem Somos</span>
              <h2>Sobre a AltaPress</h2>
              <p>
                A fundação da AltaPress é resultado da união, experiência e visão empreendedora de Francis e Adriano,
                profissionais com mais de 10 anos de atuação no mercado de soluções para a linha hidráulica industrial.
              </p>
              <p>
                Após mais de uma década dedicados ao setor, unimos conhecimento técnico e vivência de mercado para criar
                uma empresa que oferece muito mais do que produtos: uma parceira comprometida em entregar soluções com
                qualidade, agilidade e atendimento especializado.
              </p>
              <p>
                Somos uma empresa familiar, construída sobre ética, transparência e comprometimento, mas com visão moderna
                e inovadora para atender a indústria com eficiência e excelência.
              </p>
              <p>
                Trabalhamos com fornecedores de confiança e produtos de alta qualidade para garantir segurança, desempenho
                e confiabilidade em cada operação, construindo relacionamentos duradouros em todo o Brasil.
              </p>
            </div>

            <div className="showcase-grid" aria-label="Galeria de imagens da AltaPress">
              <div className="showcase-card showcase-card-large">
                <img src={media.showcaseOne} alt="Produtos da AltaPress em exposição" />
              </div>
              <div className="showcase-card">
                <video
                  ref={mascotVideoRef}
                  src={altaPressAboutVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={media.showcaseTwo}
                  onClick={toggleMascotVideoSound}
                  aria-label="Vídeo institucional da AltaPress"
                />
              </div>
              <div className="showcase-card">
                <video
                  src={altaPressShowcaseVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Vídeo de produtos da AltaPress"
                />
              </div>
            </div>

            <div className="company-cta">
              <div className="quote-box">
                <strong>AltaPress</strong>
                <p>Experiência que conecta, qualidade que gera confiança.</p>
              </div>

              <a className="button button-secondary" href={whatsappBase} target="_blank" rel="noreferrer">
                Fale conosco
              </a>
            </div>
          </div>
        </section>

        <section className="section section-surface section-contact" id="contato">
          <div className="container contact-grid">
            <article className="contact-panel">
              <span className="eyebrow eyebrow-dark">Contato</span>
              <h2>Fale conosco</h2>
              <p>Estamos prontos para ajudar com suas peças hidráulicas e encontrar a solução certa para sua operação.</p>

              <div className="contact-list">
                {contacts.map((item) => (
                  <div key={item.label} className="contact-item">
                    <span>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <strong>{item.value}</strong>
                    )}
                  </div>
                ))}
              </div>

              <div className="social-row">
                {socialLinks.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                    {item.label === 'Instagram' && <InstagramIcon />}
                    {item.label === 'WhatsApp' && <WhatsAppIcon />}
                    {item.label === 'LinkedIn' && <LinkedInIcon />}
                    {item.label}
                  </a>
                ))}
              </div>
            </article>

            <article className="form-panel instagram-panel" aria-labelledby="contact-instagram-title">
              <div className="instagram-section__heading">
                <h2 id="contact-instagram-title">Siga no Instagram</h2>
                <span aria-hidden="true" />
              </div>

              <div className="instagram-grid" aria-label="Prévias do Instagram da AltaPress">
                {instagramPreviewItems.map((item, index) => (
                  <a
                  key={`${item.alt}-${index}`}
                  className="instagram-tile"
                  href={item.href ?? socialLinks[0].href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.href ? 'Abrir post da AltaPress no Instagram' : 'Abrir Instagram da AltaPress'}
                >
                    {item.type === 'video' && item.src === altaPressShowcaseVideo ? (
                      <video src={item.src} muted playsInline preload="metadata" aria-label={item.alt} />
                    ) : (
                      <img src={item.src} alt={item.alt} />
                    )}
                    {item.type === 'video' ? (
                      <span className="instagram-tile__play" aria-hidden="true" />
                    ) : null}
                  </a>
                ))}
              </div>

              <a className="instagram-follow-button" href={socialLinks[0].href} target="_blank" rel="noreferrer">
                <InstagramIcon />
                Seguir no Instagram
              </a>
            </article>
          </div>

          <div className="container location-map-wrap">
            <div className="location-map__heading">
              <span className="eyebrow eyebrow-dark">Localização</span>
              <h3>Visite a AltaPress</h3>
              <p>Rua Josias Machado, 236, Inconfidentes — CEP 32260-520</p>
            </div>
            <div className="location-map">
              <iframe
                title="Mapa de localização da AltaPress"
                src="https://www.google.com/maps?q=Rua%20Josias%20Machado%2C%20236%2C%20Inconfidentes%2C%20CEP%2032260-520&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="location-map__actions">
              <a
                className="button button-primary"
                href="https://www.google.com/maps/search/?api=1&query=Rua+Josias+Machado,+236,+Inconfidentes,+CEP+32260-520"
                target="_blank"
                rel="noreferrer"
              >
                <span className="location-map__service-icon"><GoogleMapsIcon /></span>
                Abrir no Google Maps
              </a>
              <a
                className="button button-secondary location-map__waze-button"
                href="https://www.waze.com/ul?q=Rua%20Josias%20Machado%2C%20236%2C%20Inconfidentes%2C%20CEP%2032260-520&navigate=yes"
                target="_blank"
                rel="noreferrer"
              >
                <span className="location-map__service-icon"><WazeIcon /></span>
                Abrir no Waze
              </a>
            </div>
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <img className="footer-logo" src={media.logo} alt="AltaPress" />
            <p>Fornecemos válvulas e conexões hidráulicas de alta pressão com qualidade e confiança.</p>
          </div>

          <div>
            <h3>Links</h3>
            <div className="footer-links">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={handleInternalNavigation(item.href, item.sectionId)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3>Contato</h3>
            <div className="footer-links">
              <a href="mailto:comercial@altapress.com.br">comercial@altapress.com.br</a>
              <a href="tel:+5531972671038">(31) 9 7267-1038</a>
              <span className="footer-address">Rua Josias Machado, 236, Inconfidentes — CEP 32260-520</span>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026. Desenvolvido por VisionSoftDev.</span>
        </div>
      </footer>

      <div className="support-dock">
        <img className="support-dock__mascot" src={altaPressMascotSupport} alt="" aria-hidden="true" />
        <div className="support-dock__controls">
          <SupportChatWidget />
          <a
            className="whatsapp-float"
            href={whatsappBase}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a AltaPress no WhatsApp"
          >
            <span className="whatsapp-float__icon">
              <WhatsAppIcon />
            </span>
            <span className="whatsapp-float__label">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
