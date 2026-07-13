import { useEffect, useRef, useState } from 'react';
import SupportChatWidget from './components/SupportChatWidget';
import altaPressValvulaSeguranca from './assets/alta-press-valvula-seguranca.jpeg';
import altaPressShowcaseVideo from './assets/alta-press-showcase-video.mp4';

const media = {
  logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/B5g6vpLBQyiLl9pq/img_2142-wRwrPYrp3s0MgKXt.PNG',
  heroSlideOne:
    'https://images.unsplash.com/photo-1620203853151-496c7228306c?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwzfHx2YWx2ZXN8ZW58MHx8fHwxNzc0NzI3NzEwfDA&ixlib=rb-4.1.0&w=1366&q=70&auto=format',
  heroSlideTwo: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/sem-nome-2500-x-1000-px-3-6PCHTfsHBWEZasav.png',
  support: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-oj8sLCya4lLhNSvu.jpeg',
  valves: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-18.19.41-1-6m6q7nEyogzsu0W1.jpeg',
  connections: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-18.19.42-2-Wa8AAjmT5haiIglS.jpeg',
  showcaseOne: altaPressValvulaSeguranca,
  showcaseTwo: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-oj8sLCya4lLhNSvu.jpeg',
};

const navItems = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'Produtos', href: '/produtos', sectionId: 'produtos' },
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
    alt: 'Banner institucional da Alta Press com conexões e soluções hidráulicas.',
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
    items: ['Angular', 'Borboleta', 'Descarga de caldeira', 'Diafragma', 'Esfera', 'Gaveta', 'Globo', 'Guilhotina', 'Macho', 'Mangote', 'Para hidrante', 'Passagem reta', 'Redutora de pressão', 'Retenção', 'Segurança e alívio', 'Solenóide', 'Start-up'],
  },
  {
    title: 'Flanges',
    slug: 'flanges',
    items: ['Cego', 'Com pescoço (Welding Neck)', 'Sobreposto com reforço (Slip On)', 'Com encaixe (Socket Welding)', 'Roscado', 'Solto (Lap Joint)', 'Sobreposto plano', 'Orifício', 'De redução'],
  },
  { title: 'Conexões', slug: 'conexoes', items: ['Alta pressão', 'Ferro maleável', 'Colares', 'Conexões tubulares'] },
  { title: 'Filtros', slug: 'filtros', items: ['Tipo cesto', 'Tipo Y'] },
  { title: 'Purgadores', slug: 'purgadores', items: ['Balde invertido', 'Bóia', 'Termodinâmico', 'Termostático'] },
  { title: 'Vedações', slug: 'vedacoes', items: ["Anel O'Ring", 'Fita PTFE', 'Gaxeta', 'Junta de vedação'] },
  { title: 'Instrumentos', slug: 'instrumentos', items: ['Manômetros', 'Termômetros', 'Pressostatos', 'Vacuômetros'] },
  { title: 'Acessórios', slug: 'acessorios', items: ['Amortecedor de vibração', 'Eliminador de ar', 'Grampo U', 'Indicador de nível', 'Juntas de expansão', 'Separador de umidade', 'Ventosas', 'Visor de fluxo'] },
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

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/altapress.conexoes/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

const whatsappBase =
  'https://wa.me/5531991878767?text=Ol%C3%A1%20Seja%20bem%20vindo%20a%20ALTA%20PRESS%2C%20como%20posso%20ajudar%3F';

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

function getSectionIdFromLocation(location) {
  if (getProductCategoryFromPath(location.pathname)) {
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
        <a className="product-page__back" href="/produtos" onClick={onNavigate('/produtos', 'produtos')}>
          ← Voltar para produtos
        </a>

        <div className="product-page__intro">
          <span className="eyebrow eyebrow-dark">Linha de produtos</span>
          <h1>{category.title}</h1>
          <p>
            Confira as opções da nossa linha de {category.title.toLowerCase()}. Nossa equipe ajuda a definir a solução,
            o material e as dimensões ideais para a sua operação.
          </p>
        </div>

        <div className="product-page__content">
          <article className="product-page__list-card">
            <h2>Subcategorias disponíveis</h2>
            <div className="product-page__items">
              {category.items.map((item) => (
                <div key={item} className="product-page__item">
                  <span>{item}</span>
                  <a href={whatsappBase} target="_blank" rel="noreferrer" aria-label={`Consultar ${item}`}>
                    Consultar →
                  </a>
                </div>
              ))}
            </div>
          </article>

          <aside className="product-page__cta">
            <span className="eyebrow">Precisa de ajuda?</span>
            <h2>Encontre a peça certa para sua instalação.</h2>
            <p>Fale com a Alta Press para confirmar disponibilidade, especificações e condições de fornecimento.</p>
            <a className="button button-secondary" href={whatsappBase} target="_blank" rel="noreferrer">
              Fale Conosco
            </a>
          </aside>
        </div>

        <div className="product-page__other-categories">
          <h2>Outras categorias</h2>
          <div>
            {productCategories.filter((item) => item.slug !== category.slug).map((item) => (
              <a key={item.slug} href={`/produtos/${item.slug}`} onClick={onNavigate(`/produtos/${item.slug}`)}>
                {item.title} →
              </a>
            ))}
          </div>
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
      ? `Olá, meu nome é ${name.trim()}. Gostaria de falar com a Alta Press sobre peças hidráulicas de alta pressão.`
      : 'Olá, gostaria de falar com a Alta Press sobre peças hidráulicas de alta pressão.';

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

  const activeProductCategory = getProductCategoryFromPath(currentPathname);

  return (
    <div className="site-shell">
      <header ref={headerRef} className="site-header">
        <div className="container nav-bar">
          <a
            className="brand"
            href="/"
            aria-label="Ir para a home da Alta Press"
            onClick={handleInternalNavigation('/', 'home')}
          >
            <img src={media.logo} alt="Logo Alta Press" />
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
              <a href={socialLinks[0].href} target="_blank" rel="noreferrer" aria-label="Instagram da Alta Press">
                <InstagramIcon />
              </a>
              <a href={socialLinks[2].href} target="_blank" rel="noreferrer" aria-label="LinkedIn da Alta Press">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {activeProductCategory ? (
          <ProductCategoryPage category={activeProductCategory} onNavigate={handleInternalNavigation} />
        ) : (
          <>
        <section className="hero" id="home" aria-label="Destaques da Alta Press">
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
                Na Alta Press, oferecemos peças hidráulicas de alta pressão para garantir segurança e eficiência em seus
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
                        Ver categoria →
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
              <h2>Sobre a Alta Press</h2>
              <p>
                Especialistas em peças hidráulicas de alta pressão, oferecemos qualidade e confiança para manter seus
                sistemas funcionando com segurança.
              </p>
              <p>
                Nossa missão é garantir peças hidráulicas duráveis que mantenham seu equipamento funcionando sem falhas,
                com apoio próximo e atendimento personalizado.
              </p>

              <div className="quote-box">
                <strong>Missão</strong>
                <p>Garantir peças hidráulicas duráveis que mantenham seu equipamento funcionando sem falhas.</p>
              </div>

              <a className="button button-secondary" href={whatsappBase} target="_blank" rel="noreferrer">
                Fale Conosco
              </a>
            </div>

            <div className="showcase-grid" aria-label="Galeria de imagens da Alta Press">
              <div className="showcase-card showcase-card-large">
                <img src={media.showcaseOne} alt="Equipe e estrutura da Alta Press" />
              </div>
              <div className="showcase-card">
                <img src={media.showcaseTwo} alt="Produtos e atendimento Alta Press" />
              </div>
              <div className="showcase-card">
                <video
                  src={altaPressShowcaseVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Video de produtos da Alta Press"
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
              <p>Digite seu nome e continue a conversa pelo WhatsApp da Alta Press.</p>

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
              <h3>Visite a Alta Press</h3>
              <p>Rua Josias Machado, 236, Inconfidentes — CEP 32260-520</p>
            </div>
            <div className="location-map">
              <iframe
                title="Mapa de localização da Alta Press"
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
            <img className="footer-logo" src={media.logo} alt="Alta Press" />
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
              <a
                className="footer-map-button"
                href="https://www.google.com/maps/search/?api=1&query=Rua+Josias+Machado,+236,+Inconfidentes,+CEP+32260-520"
                target="_blank"
                rel="noreferrer"
              >
                Abrir no mapa ↗
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026. Desenvolvido Por Visionsoftdev</span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappBase}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Alta Press no WhatsApp"
      >
        <span className="whatsapp-float__icon">
          <WhatsAppIcon />
        </span>
        <span className="whatsapp-float__label">WhatsApp</span>
      </a>

      <SupportChatWidget />
    </div>
  );
}

export default App;
