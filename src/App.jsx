import { useEffect, useRef, useState } from 'react';
import SupportChatWidget from './components/SupportChatWidget';
import { technicalContent } from './data/technicalContent';
import altaPressMascotSupport from './assets/alta-press-mascot-support.png';
import altaPressShowcaseGrid from './assets/alta-press-showcase-grid.png';
import altaPressValvulaSeguranca from './assets/alta-press-valvula-seguranca.jpeg';
import altaPressShowcaseVideo from './assets/alta-press-showcase-video.mp4';
import productAcessorios from './assets/product-categories/acessorios.jpg';
import productAcessorioGrampoU from './assets/product-accessories-normalized/grampo-u.png';
import productAcessorioIndicadorNivel from './assets/product-accessories-normalized/indicador-de-nivel.png';
import productAcessorioJuntaExpansao from './assets/product-accessories-normalized/junta-expansao.png';
import productAcessorioVisorFluxo from './assets/product-accessories-normalized/visor-de-fluxo.png';
import productConexoes from './assets/product-categories/conexoes.png';
import productConexaoAltaPressao from './assets/product-connections-normalized/alta-pressao.png';
import productConexaoColares from './assets/product-connections-normalized/colares.png';
import productConexaoTubulares from './assets/product-connections-normalized/conexoes-tubulares.png';
import productConexaoFerroMaleavel from './assets/product-connections-normalized/ferro-maleavel.png';
import productFlanges from './assets/product-categories/flanges.png';
import productFlangeCego from './assets/product-flanges-normalized/flange-cego.png';
import productFlangeReducao from './assets/product-flanges-normalized/flange-de-reducao.png';
import productFlangeEncaixe from './assets/product-flanges-normalized/flange-encaixe.png';
import productFlangeLiso from './assets/product-flanges-normalized/flange-liso.png';
import productFlangePescoco from './assets/product-flanges-normalized/flange-pescoco.png';
import productFlangeRoscado from './assets/product-flanges-normalized/flange-roscado.png';
import productFlangeSlipOn from './assets/product-flanges-normalized/flange-slip-on.png';
import productFlangeSolto from './assets/product-flanges-normalized/flange-solto.png';
import productInstrumentos from './assets/product-categories/instrumentos.jpg';
import productValvulas from './assets/product-categories/valvulas.jpg';
import productOrificioPescoco from './assets/product-flanges-normalized/orificio-pescoco.png';
import productOrificioRoscado from './assets/product-flanges-normalized/orificio-roscado.png';
import productOrificioSlipOn from './assets/product-flanges-normalized/orificio-slip-on.png';
import productFiltroCesto from './assets/product-filters-normalized/filtro-cesto.png';
import productFiltroY from './assets/product-filters-normalized/filtro-y.png';
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
import productValvulaDescargaCaldeira from './assets/product-valves-normalized/valvula-descarga-caldeira.png';
import productValvulaDiafragma from './assets/product-valves-normalized/valvula-diafragma.png';
import productValvulaEsfera from './assets/product-valves-normalized/valvula-esfera.png';
import productValvulaGaveta from './assets/product-valves-normalized/valvula-gaveta.png';
import productValvulaGlobo from './assets/product-valves-normalized/valvula-globo.png';
import productValvulaGuilhotina from './assets/product-valves-normalized/valvula-guilhotina.png';
import productValvulaMangote from './assets/product-valves-normalized/valvula-mangote.png';
import productValvulaMacho from './assets/product-valves-normalized/valvula-macho.png';
import productValvulaParaHidrante from './assets/product-valves-normalized/valvula-para-hidrante.png';
import productValvulaPassagemReta from './assets/product-valves-normalized/valvula-passagem-reta.png';
import productValvulaRedutoraPressao from './assets/product-valves-normalized/valvula-redutora-pressao.png';
import productValvulaRetencao from './assets/product-valves-normalized/valvula-retencao.png';
import productValvulaSegurancaAlivio from './assets/product-valves-normalized/valvula-seguranca-alivio.png';
import productValvulaSolenoide from './assets/product-valves-normalized/valvula-solenoide.png';

const media = {
  logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/B5g6vpLBQyiLl9pq/img_2142-wRwrPYrp3s0MgKXt.PNG',
  heroSlideOne:
    'https://images.unsplash.com/photo-1620203853151-496c7228306c?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwzfHx2YWx2ZXN8ZW58MHx8fHwxNzc0NzI3NzEwfDA&ixlib=rb-4.1.0&w=1366&q=70&auto=format',
  heroSlideTwo: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/sem-nome-2500-x-1000-px-3-6PCHTfsHBWEZasav.png',
  support: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-oj8sLCya4lLhNSvu.jpeg',
  valves: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-18.19.41-1-6m6q7nEyogzsu0W1.jpeg',
  connections: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-18.19.42-2-Wa8AAjmT5haiIglS.jpeg',
  showcaseOne: altaPressValvulaSeguranca,
  showcaseTwo: altaPressShowcaseGrid,
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
    image: media.heroSlideTwo,
    alt: 'Banner institucional da AltaPress com conexões e soluções hidráulicas.',
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
      { label: 'Angular', image: productValvulaAngular, alt: 'Válvula angular da AltaPress.' },
      { label: 'Borboleta', image: productValvulaBorboleta, alt: 'Válvula borboleta da AltaPress.' },
      { label: 'Descarga de caldeira', image: productValvulaDescargaCaldeira, alt: 'Válvula de descarga de caldeira da AltaPress.' },
      { label: 'Diafragma', image: productValvulaDiafragma, alt: 'Válvula diafragma da AltaPress.' },
      { label: 'Esfera', image: productValvulaEsfera, alt: 'Válvula esfera da AltaPress.' },
      {
        label: 'Gaveta',
        image: productValvulaGaveta,
        alt: 'Válvula gaveta da AltaPress.',
        mediaClassName: 'product-page__item-media--blend',
      },
      { label: 'Globo', image: productValvulaGlobo, alt: 'Válvula globo da AltaPress.' },
      { label: 'Guilhotina', image: productValvulaGuilhotina, alt: 'Válvula guilhotina da AltaPress.' },
      { label: 'Macho', image: productValvulaMacho, alt: 'Válvula macho da AltaPress.' },
      { label: 'Mangote', image: productValvulaMangote, alt: 'Válvula mangote da AltaPress.' },
      { label: 'Para hidrante', image: productValvulaParaHidrante, alt: 'Válvula para hidrante da AltaPress.' },
      { label: 'Passagem reta', image: productValvulaPassagemReta, alt: 'Válvula de passagem reta da AltaPress.' },
      { label: 'Redutora de pressão', image: productValvulaRedutoraPressao, alt: 'Válvula redutora de pressão da AltaPress.' },
      { label: 'Retenção', image: productValvulaRetencao, alt: 'Válvula de retenção da AltaPress.' },
      { label: 'Segurança e alívio', image: productValvulaSegurancaAlivio, alt: 'Válvula de segurança e alívio da AltaPress.' },
      { label: 'Solenóide', image: productValvulaSolenoide, alt: 'Válvula solenóide da AltaPress.' },
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
    image: productConexoes,
    items: [
      { label: 'Alta pressão', image: productConexaoAltaPressao, alt: 'Conexões de alta pressão da AltaPress.' },
      { label: 'Ferro maleável', image: productConexaoFerroMaleavel, alt: 'Conexões em ferro maleável da AltaPress.' },
      { label: 'Colares', image: productConexaoColares, alt: 'Colares metálicos da AltaPress.' },
      { label: 'Conexões tubulares', image: productConexaoTubulares, alt: 'Conexões tubulares da AltaPress.' },
    ],
  },
  {
    title: 'Filtros',
    slug: 'filtros',
    items: [
      { label: 'Tipo cesto', image: productFiltroCesto, alt: 'Filtro tipo cesto da AltaPress.' },
      { label: 'Tipo Y', image: productFiltroY, alt: 'Filtro tipo Y da AltaPress.' },
    ],
  },
  {
    title: 'Purgadores',
    slug: 'purgadores',
    items: [
      { label: 'Bóia', image: productPurgadorBoia, alt: 'Purgador tipo bóia da AltaPress.' },
      { label: 'Termodinâmico', image: productPurgadorTermodinamico, alt: 'Purgador termodinâmico da AltaPress.' },
    ],
  },
  {
    title: 'Vedações',
    slug: 'vedacoes',
    items: [
      { label: 'Fita PTFE', image: productVedacaoFitaPtfe, alt: 'Fita PTFE da AltaPress.' },
      { label: 'Junta de vedação', image: productVedacaoJuntaVedacao, alt: 'Junta de vedação da AltaPress.' },
    ],
  },
  {
    title: 'Instrumentação',
    slug: 'instrumentos',
    image: productInstrumentos,
    items: [
      { label: 'Manômetros', image: productInstrumentoManometro, alt: 'Manômetro da AltaPress.' },
      { label: 'Termômetros', image: productInstrumentoTermometro, alt: 'Termômetro da AltaPress.' },
      { label: 'Pressostatos', image: productInstrumentoPressostatos, alt: 'Pressostato da AltaPress.' },
      { label: 'Vacuômetros', image: productInstrumentoVacuometro, alt: 'Vacuômetro da AltaPress.' },
    ],
  },
  {
    title: 'Acessórios',
    slug: 'acessorios',
    image: productAcessorios,
    items: [
      { label: 'Grampo U', image: productAcessorioGrampoU, alt: 'Grampo U da AltaPress.' },
      { label: 'Indicador de nível', image: productAcessorioIndicadorNivel, alt: 'Indicador de nível da AltaPress.' },
      { label: 'Juntas de expansão', image: productAcessorioJuntaExpansao, alt: 'Junta de expansão da AltaPress.' },
      { label: 'Visor de fluxo', image: productAcessorioVisorFluxo, alt: 'Visor de fluxo da AltaPress.' },
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
    value: '(31) 9 7267-1038',
    href: 'tel:+5531972671038',
  },
  {
    label: 'Email',
    value: 'comercial@altapress.com.br',
    href: 'mailto:comercial@altapress.com.br',
  },
  {
    label: 'Endereço',
    value: 'Rua Josias Machado, 236, Inconfidentes — CEP 32260-520',
    href: 'https://www.google.com/maps/search/?api=1&query=Rua+Josias+Machado,+236,+Inconfidentes,+CEP+32260-520',
  },
  {
    label: 'Horário',
    value: 'Seg a Sex',
    href: null,
  },
];

const whatsappBase =
  'https://wa.me/5531991878767?text=Ol%C3%A1%20Seja%20bem%20vindo%20a%20ALTA%20PRESS%2C%20como%20posso%20ajudar%3F';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/altapress.conexoes/' },
  { label: 'WhatsApp', href: whatsappBase },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
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
  const standards = productItem && typeof productItem !== 'string' ? productItem.standards ?? [] : [];
  const standard = standardSlug
    ? standards.find((item) => slugifyProductLabel(item.label) === standardSlug)
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

function ProductCategoryPage({ category, onNavigate }) {
  return (
    <section className="product-page section-surface">
      <div className="container">
        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">Linha de produtos</span>
          <h1>{category.title}</h1>
          <p>
            Confira as opções da nossa linha de {category.title.toLowerCase()}. Nossa equipe ajuda a definir a solução,
            o material e as dimensões ideais para a sua operação.
          </p>
        </div>

        <div className="product-page__layout">
          <aside className="product-page__sidebar" aria-label="Categorias de produtos">
            {productCategories.map((item) => {
              const isActive = item.slug === category.slug;

              return (
                <a
                  key={item.slug}
                  className={isActive ? 'is-active' : ''}
                  href={`/produtos/${item.slug}`}
                  onClick={onNavigate(`/produtos/${item.slug}`)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.title}
                  {isActive ? <span aria-hidden="true">›</span> : null}
                </a>
              );
            })}
          </aside>

          <article className="product-page__catalog" aria-label={`Itens da linha ${category.title}`}>
            <div className="product-page__grid">
              {category.items.map((item) => {
                const label = typeof item === 'string' ? item : item.label;
                const image = typeof item === 'string' ? null : item.image;
                const alt = typeof item === 'string' ? '' : item.alt ?? label;
                const mediaClassName = typeof item === 'string' ? '' : item.mediaClassName ?? '';
                const details = typeof item === 'string' ? [] : item.details ?? [];
                const itemHref = `/produtos/${category.slug}/${slugifyProductLabel(label)}`;

                return (
                  <a
                    key={label}
                    className="product-page__card"
                    href={itemHref}
                    onClick={onNavigate(itemHref)}
                    aria-label={`Ver opções de ${label}`}
                  >
                    <div className={`product-page__card-media ${mediaClassName}`.trim()}>
                      {image ? (
                        <img src={image} alt={alt} />
                      ) : (
                        <span aria-hidden="true">{label.slice(0, 1)}</span>
                      )}
                    </div>
                    <div className="product-page__card-caption">
                      <strong>{label}</strong>
                      {details.length ? (
                        <div className="product-page__card-details" aria-label={`Normas e classes de ${label}`}>
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
  const itemSlug = slugifyProductLabel(label);
  const image = typeof productItem === 'string' ? null : productItem.image;
  const alt = typeof productItem === 'string' ? '' : productItem.alt ?? label;
  const mediaClassName = typeof productItem === 'string' ? '' : productItem.mediaClassName ?? '';
  const standards = typeof productItem === 'string' ? [] : productItem.standards ?? [];
  const fallbackCards = [
    {
      label: 'Especificação sob consulta',
      options: ['Material', 'Bitola', 'Classe de pressão', 'Aplicação'],
    },
  ];
  const cards = standards.length ? standards : fallbackCards;

  return (
    <section className="product-page section-surface">
      <div className="container">
        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">{category.title}</span>
          <h1>{label}</h1>
          <p>
            Selecione uma norma, classe ou condição de fornecimento para falar com a equipe da AltaPress e confirmar a
            peça correta para a sua aplicação.
          </p>
        </div>

        <div className="product-page__layout">
          <aside className="product-page__sidebar" aria-label="Categorias de produtos">
            {productCategories.map((item) => {
              const isActive = item.slug === category.slug;

              return (
                <a
                  key={item.slug}
                  className={isActive ? 'is-active' : ''}
                  href={`/produtos/${item.slug}`}
                  onClick={onNavigate(`/produtos/${item.slug}`)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.title}
                  {isActive ? <span aria-hidden="true">›</span> : null}
                </a>
              );
            })}
          </aside>

          <article className="product-page__catalog" aria-label={`Opções de ${label}`}>
            <a className="product-page__back-inline" href={`/produtos/${category.slug}`} onClick={onNavigate(`/produtos/${category.slug}`)}>
              Voltar para {category.title}
            </a>
            <div className="product-page__grid">
              {cards.map((card) => (
                <a
                  key={card.label}
                  className="product-page__card product-page__card--detail"
                  href={standards.length ? `/produtos/${category.slug}/${slugifyProductLabel(label)}/${slugifyProductLabel(card.label)}` : whatsappBase}
                  target={standards.length ? undefined : '_blank'}
                  rel={standards.length ? undefined : 'noreferrer'}
                  onClick={standards.length ? onNavigate(`/produtos/${category.slug}/${slugifyProductLabel(label)}/${slugifyProductLabel(card.label)}`) : undefined}
                  aria-label={standards.length ? `Ver classes de ${label} ${card.label}` : `Consultar ${label} ${card.label}`}
                >
                  <div className={`product-page__card-media ${mediaClassName}`.trim()}>
                    {image ? (
                      <img src={image} alt={alt} />
                    ) : (
                      <span aria-hidden="true">{label.slice(0, 1)}</span>
                    )}
                  </div>
                  <div className="product-page__card-caption">
                    <strong>{card.label}</strong>
                    <ul className="product-page__card-list">
                      {card.options.map((option) => (
                        <li key={option}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProductStandardPage({ category, productItem, standard, onNavigate }) {
  const label = typeof productItem === 'string' ? productItem : productItem.label;
  const itemSlug = slugifyProductLabel(label);
  const image = typeof productItem === 'string' ? null : productItem.image;
  const alt = typeof productItem === 'string' ? '' : productItem.alt ?? label;
  const mediaClassName = typeof productItem === 'string' ? '' : productItem.mediaClassName ?? '';

  return (
    <section className="product-page section-surface">
      <div className="container">
        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">{label}</span>
          <h1>{standard.label}</h1>
          <p>
            Escolha a classe de fornecimento e fale com a AltaPress para confirmar disponibilidade, dimensão e aplicação.
          </p>
        </div>

        <div className="product-page__layout">
          <aside className="product-page__sidebar" aria-label="Categorias de produtos">
            {productCategories.map((item) => {
              const isActive = item.slug === category.slug;

              return (
                <a
                  key={item.slug}
                  className={isActive ? 'is-active' : ''}
                  href={`/produtos/${item.slug}`}
                  onClick={onNavigate(`/produtos/${item.slug}`)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.title}
                  {isActive ? <span aria-hidden="true">›</span> : null}
                </a>
              );
            })}
          </aside>

          <article className="product-page__catalog" aria-label={`Classes de ${label} ${standard.label}`}>
            <a
              className="product-page__back-inline"
              href={`/produtos/${category.slug}/${slugifyProductLabel(label)}`}
              onClick={onNavigate(`/produtos/${category.slug}/${slugifyProductLabel(label)}`)}
            >
              Voltar para {label}
            </a>
            <div className="product-page__grid">
              {standard.options.map((option) => (
                (() => {
                  const optionSlug = slugifyProductLabel(option);
                  const specHref = `/produtos/${category.slug}/${itemSlug}/${slugifyProductLabel(standard.label)}/${optionSlug}`;

                  return (
                    <a
                      key={option}
                      className="product-page__card product-page__card--class"
                      href={specHref}
                      onClick={onNavigate(specHref)}
                      aria-label={`Ver tabela técnica de ${label} ${standard.label} ${option}`}
                    >
                      <div className={`product-page__card-media ${mediaClassName}`.trim()}>
                        {image ? (
                          <img src={image} alt={alt} />
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

function ProductSpecPage({ category, productItem, standard, optionSlug, onNavigate }) {
  const label = typeof productItem === 'string' ? productItem : productItem.label;
  const itemSlug = slugifyProductLabel(label);
  const standardSlug = slugifyProductLabel(standard.label);
  const image = typeof productItem === 'string' ? null : productItem.image;
  const alt = typeof productItem === 'string' ? label : productItem.alt ?? label;
  const [spec, setSpec] = useState(null);
  const [specStatus, setSpecStatus] = useState('loading');
  const figureImages = spec
    ? [...(image ? [{ src: image, alt }] : []), ...(spec.images?.slice(1) ?? [])]
    : [];

  useEffect(() => {
    let isMounted = true;

    setSpecStatus('loading');

    import('./data/flangeTechnicalSpecs')
      .then((module) => {
        if (!isMounted) {
          return;
        }

        const nextSpec = getTechnicalSpec(module.flangeTechnicalSpecs, itemSlug, standardSlug, optionSlug);
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
        <div className="product-page__layout">
          <aside className="product-page__sidebar" aria-label="Categorias de produtos">
            {productCategories.map((item) => {
              const isActive = item.slug === category.slug;

              return (
                <a
                  key={item.slug}
                  className={isActive ? 'is-active' : ''}
                  href={`/produtos/${item.slug}`}
                  onClick={onNavigate(`/produtos/${item.slug}`)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.title}
                  {isActive ? <span aria-hidden="true">›</span> : null}
                </a>
              );
            })}
          </aside>

          <article className="product-page__spec" aria-label={`Tabela técnica de ${label} ${standard.label}`}>
            <a
              className="product-page__back-inline"
              href={`/produtos/${category.slug}/${itemSlug}/${standardSlug}`}
              onClick={onNavigate(`/produtos/${category.slug}/${itemSlug}/${standardSlug}`)}
            >
              Voltar para {standard.label}
            </a>

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

                <div className="product-page__spec-overview">
                  <div className="product-page__spec-figure">
                    <h2>Figura</h2>
                    {figureImages.length ? (
                      <div className="product-page__spec-images">
                        {figureImages.map((figureImage) => (
                          <img key={figureImage.src} src={figureImage.src} alt={figureImage.alt} />
                        ))}
                      </div>
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
                  </div>
                </div>

                <p className="product-page__spec-note">{spec.note}</p>

                {spec.tables.map((table, tableIndex) => {
                  const [header, ...rows] = table;

                  return (
                    <div className="product-page__spec-table-wrap" key={`${spec.title}-${tableIndex}`}>
                      <h2>Dimensões e peso aproximado</h2>
                      <table className="product-page__spec-table">
                        <thead>
                          <tr>
                            {header.map((cell) => (
                              <th key={cell}>{cell}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, rowIndex) => (
                            <tr key={`${row.join('-')}-${rowIndex}`}>
                              {row.map((cell, cellIndex) => (
                                <td key={`${cell}-${cellIndex}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  );
}

function TechnicalInfoPage() {
  const [activeTabTitle, setActiveTabTitle] = useState(technicalContent[0]?.title ?? '');
  const activeTab = technicalContent.find((tab) => tab.title === activeTabTitle) ?? technicalContent[0];

  return (
    <section className="technical-page section-surface" id="informacoes-tecnicas">
      <div className="container">
        <div className="technical-page__intro">
          <span className="eyebrow eyebrow-dark">Informações Técnicas</span>
          <h1>Biblioteca técnica AltaPress.</h1>
          <p>
            Consulte especificações, tabelas, imagens e orientações técnicas diretamente no site, sem visualizador de PDF
            e com apresentação própria da AltaPress.
          </p>
        </div>

        <div className="technical-tabs">
          <div className="technical-tabs__list" role="tablist" aria-label="Materiais técnicos">
            {technicalContent.map((tab) => (
              <button
                key={tab.title}
                className={`technical-tabs__button ${activeTab?.title === tab.title ? 'is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeTab?.title === tab.title}
                onClick={() => setActiveTabTitle(tab.title)}
              >
                <span>{tab.group}</span>
                {tab.title}
              </button>
            ))}
          </div>

          {activeTab && (
            <article className="technical-tabs__panel" role="tabpanel">
              <div className="technical-tabs__header">
                <span className="eyebrow eyebrow-dark">{activeTab.group}</span>
                <h2>{activeTab.title}</h2>
                <p>{activeTab.description}</p>
              </div>

              <div
                className="technical-tabs__content"
                dangerouslySetInnerHTML={{ __html: activeTab.html }}
              />
            </article>
          )}
        </div>
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
    }, 4000);

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

  const showPreviousHeroSlide = () => {
    setActiveHeroSlide((currentSlide) => (currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const showNextHeroSlide = () => {
    setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  };

  const activeProductRoute = getProductRouteFromPath(currentPathname);
  const activeProductCategory = activeProductRoute?.category ?? null;
  const isTechnicalInfoPage = currentPathname === '/informacoes-tecnicas';

  return (
    <div className="site-shell">
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
        {activeProductRoute?.item && activeProductRoute?.standard && activeProductRoute?.optionSlug ? (
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
        ) : activeProductRoute?.item ? (
          <ProductItemPage
            category={activeProductRoute.category}
            productItem={activeProductRoute.item}
            onNavigate={handleProductNavigation}
          />
        ) : activeProductCategory ? (
          <ProductCategoryPage category={activeProductCategory} onNavigate={handleProductNavigation} />
        ) : isTechnicalInfoPage ? (
          <TechnicalInfoPage />
        ) : (
          <>
        <section className="hero" id="home" aria-label="Destaques da AltaPress">
          <div className="hero-carousel-shell">
            <div className="hero-carousel" aria-roledescription="carousel" aria-label="Carrossel principal">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`hero-slide ${activeHeroSlide === index ? 'is-active' : ''}`}
                  aria-hidden={activeHeroSlide !== index}
                >
                  <img src={slide.image} alt={slide.alt} />
                </div>
              ))}

              <div className="hero-carousel-overlay" aria-hidden="true" />

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
                    <a className="button button-primary" href="/produtos" onClick={handleInternalNavigation('/produtos', 'produtos')}>
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
                  <div className="service-card__image">
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
                  Altapress Válvulas e Conexões é especializada no fornecimento de soluções industriais em sistemas
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
                A fundação da AltaPress é resultado da união da experiência e da visão empreendedora de Francis e Adriano,
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

              <div className="quote-box">
                <strong>AltaPress</strong>
                <p>Experiência que conecta, qualidade que gera confiança.</p>
              </div>

              <a className="button button-secondary" href={whatsappBase} target="_blank" rel="noreferrer">
                Fale Conosco
              </a>
            </div>

            <div className="showcase-grid" aria-label="Galeria de imagens da AltaPress">
              <div className="showcase-card showcase-card-large">
                <img src={media.showcaseOne} alt="Equipe e estrutura da AltaPress" />
              </div>
              <div className="showcase-card">
                <img src={media.showcaseTwo} alt="Produtos e atendimento AltaPress" />
              </div>
              <div className="showcase-card">
                <video
                  src={altaPressShowcaseVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Video de produtos da AltaPress"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-light">
          <div className="container banner-card">
            <div>
              <span className="eyebrow eyebrow-dark">Projetos</span>
              <h2>Produtos duráveis e atendimento excelente.</h2>
              <p>
                Fornecemos válvulas e conexões hidráulicas de alta pressão com qualidade, confiança e uma operação
                pensada para atendimento rápido.
              </p>
            </div>

            <a className="button button-primary" href="/contato" onClick={handleInternalNavigation('/contato', 'contato')}>
              Ir Para Contato
            </a>
          </div>
        </section>

        <section className="section section-surface section-contact" id="contato">
          <div className="container contact-grid">
            <article className="contact-panel">
              <span className="eyebrow eyebrow-dark">Contato</span>
              <h2>Fale Conosco</h2>
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
                    {item.label}
                  </a>
                ))}
              </div>
            </article>

            <article className="form-panel">
              <h3>Seu nome</h3>
              <p>Digite seu nome e continue a conversa pelo WhatsApp da AltaPress.</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="contact-name">Seu nome</label>
                <input
                  id="contact-name"
                  name="contact-name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <button className="button button-primary" type="submit">
                  Enviar
                </button>
              </form>
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
          <span>© 2026. Desenvolvido Por Visionsoftdev</span>
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
