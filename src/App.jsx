import { useState } from 'react';

const media = {
  logo: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/B5g6vpLBQyiLl9pq/img_2142-wRwrPYrp3s0MgKXt.PNG',
  hero: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-1-c1wVKmHaNhZOfzHX.jpeg',
  support: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-oj8sLCya4lLhNSvu.jpeg',
  valves: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-18.19.41-1-6m6q7nEyogzsu0W1.jpeg',
  connections: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-18.19.42-2-Wa8AAjmT5haiIglS.jpeg',
  showcaseOne: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-3-VFBl9rokG76PnBm4.jpeg',
  showcaseTwo: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-oj8sLCya4lLhNSvu.jpeg',
  showcaseThree: 'https://assets.zyrosite.com/B5g6vpLBQyiLl9pq/whatsapp-image-2026-01-06-at-20.51.32-2-o0G2INO1fjlvokZE.jpeg',
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Contato', href: '#contato' },
];

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

const portfolioItems = [
  'Válvulas de esfera, gaveta, globo, retenção e borboleta',
  'Conexões em ferro maleável: cotovelos, niples, uniões, tees e reduções',
  'Componentes em aço carbono para alta pressão',
  'Acessórios hidráulicos diversos',
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
    value: 'Rua Carme, 165 Nova Lima',
    href: 'https://www.google.com/maps/search/?api=1&query=Rua+Carme,+165+Nova+Lima',
  },
  {
    label: 'Horário',
    value: 'Seg a Sex',
    href: null,
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

const whatsappBase =
  'https://wa.me/5531991878767?text=Ol%C3%A1%20Seja%20bem%20vindo%20a%20ALTA%20PRESS%2C%20como%20posso%20ajudar%3F';

function App() {
  const [name, setName] = useState('');

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

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-bar">
          <a className="brand" href="#home" aria-label="Ir para a home da Alta Press">
            <img src={media.logo} alt="Logo Alta Press" />
          </a>

          <nav className="main-nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="button button-primary button-compact" href={whatsappBase} target="_blank" rel="noreferrer">
            Fale conosco
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Alta Press</span>
              <h1>Peças hidráulicas de alta pressão com qualidade garantida.</h1>
              <p className="lead">
                Loja especializada em válvulas e conexões hidráulicas para alta pressão, garantindo qualidade,
                durabilidade e confiança para o seu equipamento.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#produtos">
                  Ver produtos
                </a>
                <a className="button button-secondary" href="#quem-somos">
                  Saiba mais
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

            <div className="hero-visual">
              <div className="hero-card hero-card-main">
                <img src={media.hero} alt="Peças e soluções da Alta Press" />
              </div>
              <div className="hero-card hero-card-floating">
                <p>Especialistas em válvulas e conexões hidráulicas</p>
                <strong>Produtos duráveis e atendimento excelente.</strong>
              </div>
              <div className="hero-card hero-card-accent">
                <span>Contato rápido</span>
                <a href="tel:+5531972671038">(31) 9 7267-1038</a>
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
              {serviceCards.map((card) => (
                <article key={card.title} className="service-card">
                  <div className="service-card__image">
                    <img src={card.image} alt={card.title} />
                  </div>
                  <div className="service-card__body">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span>{card.detail}</span>
                  </div>
                </article>
              ))}
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
                <ul className="catalog-list">
                  {portfolioItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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
                Fale conosco
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
                <img src={media.showcaseThree} alt="Conexões e válvulas da Alta Press" />
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

            <a className="button button-primary" href="#contato">
              Ir para contato
            </a>
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
        </section>
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
                <a key={item.label} href={item.href}>
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
              <a href="https://www.google.com/maps/search/?api=1&query=Rua+Carme,+165+Nova+Lima" target="_blank" rel="noreferrer">
                Rua Carme, 165 Nova Lima
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026. Desenvolvido Por Visionsoftdev</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
