/* Rede Coopen — interface demonstrativa. Sem chamadas de rede ou dados reais. */
(function () {
  "use strict";

  var DATA = window.REDE_DATA;
  if (!DATA) return;

  var PAGES = ["inicio", "rede", "oportunidades", "ofertas", "favoritos", "meu-perfil", "gestao"];
  var KEYS = {
    favorites: "redecoopen.demo.favorites",
    demands: "redecoopen.demo.demands",
    profile: "redecoopen.demo.profile",
    moderation: "redecoopen.demo.moderation"
  };
  function read(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key));
      return value === null ? fallback : value;
    } catch (_) { return fallback; }
  }
  function store(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }
  var state = {
    page: PAGES.indexOf(decodeURIComponent(location.hash.slice(1))) >= 0 ? decodeURIComponent(location.hash.slice(1)) : "inicio",
    query: "",
    category: "todos",
    profileType: "todos",
    demandKind: "todos",
    favorites: new Set(read(KEYS.favorites, [])),
    addedDemands: read(KEYS.demands, []),
    myProfile: read(KEYS.profile, {
      name: "Seu nome", profession: "Sua atividade", company: "",
      city: "São José do Rio Preto", description: "", services: ""
    }),
    moderation: read(KEYS.moderation, {}),
    modal: null,
    menuOpen: false,
    toast: ""
  };

  var PATHS = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 12h20"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M12 8H8a3 3 0 1 1 3-3c0 1.5 1 3 1 3ZM12 8h4a3 3 0 1 0-3-3c0 1.5-1 3-1 3Z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    user: '<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    settings: '<path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/><circle cx="12" cy="12" r="5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    checkcircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sparkles: '<path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM19 18l.8 1.8L22 20.5l-2.2.7L19 23l-.8-1.8-2.2-.7 2.2-.7L19 18Z"/>',
    shield: '<path d="m12 22 7-4V6l-7-4-7 4v12z"/><path d="m9 12 2 2 4-4"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/>',
    message: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 1 1 16.1-4Z"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M10 21v-3h4v3"/>',
    filter: '<path d="M4 7h16M7 12h10m-7 5h4"/>',
    edit: '<path d="M12 20h9M16 4l4 4-11 11-5 1 1-5L16 4Z"/>',
    trash: '<path d="M4 7h16M10 11v7m4-7v7M6 7l1 14h10l1-14M9 7V4h6v3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>',
    handshake: '<path d="M2 12 7 7l4 1 3-1 8 5-5 7-5-3-3 2-7-6Z"/><path d="m7 7 2-2h5l3 2M8 12l5 4m-2-7 5 4"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6l3 3M21 3v6h-6M21 12a9 9 0 0 1-15 6l-3-3M3 21v-6h6"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z"/>'
  };
  function icon(name, size) {
    return '<svg class="icon" width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (PATHS[name] || PATHS.star) + '</svg>';
  }
  function safe(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (x) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[x];
    });
  }
  function normalize(text) {
    return String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  function categoryName(id) {
    var item = DATA.categories.find(function (c) { return c.id === id; });
    return item ? item.name : "Outros";
  }
  function categoryIcon(id) {
    var item = DATA.categories.find(function (c) { return c.id === id; });
    return item ? item.emoji : "✳️";
  }
  function profileById(id) {
    return DATA.profiles.find(function (p) { return p.id === id; });
  }
  function button(label, action, klass, extra) {
    return '<button type="button" class="' + (klass || "button") + '" data-action="' + action + '"' + (extra || "") + '>' + label + '</button>';
  }
  function navTo(page) {
    if (PAGES.indexOf(page) < 0) page = "inicio";
    state.page = page;
    state.modal = null;
    state.menuOpen = false;
    if (location.hash.slice(1) !== page) location.hash = page;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function titleBlock(kicker, heading, desc, extra) {
    return '<div class="page-heading"><div><p class="eyebrow">' + safe(kicker) + '</p><h1>' + heading + '</h1><p class="subheading">' + safe(desc) + '</p></div>' + (extra || "") + '</div>';
  }
  function sidebar() {
    var links = [
      ["inicio", "home", "Início"],
      ["rede", "users", "Encontrar serviços"],
      ["oportunidades", "briefcase", "Pedidos e oportunidades"],
      ["ofertas", "gift", "Benefícios e ofertas"],
      ["favoritos", "heart", "Meus favoritos"]
    ];
    var html = '<aside class="sidebar' + (state.menuOpen ? ' sidebar-open' : '') + '" aria-label="Navegação principal">';
    html += '<div class="brand" role="img" aria-label="Rede Coopen"><div class="brand-symbol">co<span>.</span></div><div><strong>rede coopen</strong><small>Conexões que fortalecem</small></div></div>';
    html += '<div class="sidebar-label">EXPLORAR</div><nav class="nav-list">';
    html += links.map(function (link) {
      return '<button type="button" class="nav-link' + (state.page === link[0] ? ' active' : '') + '" data-action="nav" data-page="' + link[0] + '" ' + (state.page === link[0] ? 'aria-current="page"' : '') + '>' + icon(link[1], 19) + '<span>' + link[2] + '</span>' + (link[0] === "favoritos" && state.favorites.size ? '<em>' + state.favorites.size + '</em>' : '') + '</button>';
    }).join("");
    html += '</nav><div class="sidebar-label second-label">SUA ÁREA</div><nav class="nav-list">';
    html += '<button type="button" class="nav-link' + (state.page === "meu-perfil" ? ' active' : '') + '" data-action="nav" data-page="meu-perfil">' + icon("user", 19) + '<span>Meu perfil</span></button>';
    html += '<button type="button" class="nav-link' + (state.page === "gestao" ? ' active' : '') + '" data-action="nav" data-page="gestao">' + icon("settings", 19) + '<span>Visão da gestão</span><b class="tag-demo">DEMO</b></button></nav>';
    html += '<div class="sidebar-bottom"><div class="sidebar-callout"><div class="sidebar-callout-icon">' + icon("sparkles", 20) + '</div><strong>Uma rede mais próxima</strong><p>Encontre talentos, descubra serviços e crie novas parcerias.</p></div>';
    html += '<div class="sidebar-disclaimer">' + icon("info", 15) + '<span>Protótipo independente, não oficial e com dados fictícios.</span></div></div></aside>';
    return html;
  }
  function topbar() {
    return '<header class="topbar"><div class="topbar-left">' +
      button(icon("menu", 22), "menu", "icon-button mobile-menu", ' aria-label="Abrir mais opções"') +
      '<span class="mobile-header-brand">rede <strong>coopen</strong></span>' +
      '<div class="topbar-search">' + icon("search", 20) +
      '<input id="global-search" data-search type="search" placeholder="Buscar serviço ou profissional" value="' + safe(state.query) + '" aria-label="Pesquisar na rede">' +
      (state.query ? button(icon("x", 15), "clear-search", "search-clear", ' aria-label="Limpar pesquisa"') : '<span class="search-shortcut">Buscar</span>') +
      '</div></div><div class="topbar-right"><span class="prototype-pill"><span></span> Protótipo interativo</span>' +
      button('<span class="top-avatar">C</span><span class="top-person">Cooperado demo</span>' + icon("down", 15), "my-profile", "account-button", ' aria-label="Abrir meu perfil"') +
      '</div></header>';
  }
  function smallHeading(title, desc, target, actionLabel) {
    return '<div class="section-header"><div><h2>' + title + '</h2>' + (desc ? '<p>' + desc + '</p>' : '') + '</div>' +
      (target ? button(safe(actionLabel || "Ver todos") + icon("arrow", 17), "nav", "text-link", ' data-page="' + target + '"') : '') + '</div>';
  }
  function metric(value, label, symbol) {
    return '<div class="metric-card"><div class="metric-icon">' + icon(symbol, 21) + '</div><div><strong>' + safe(value) + '</strong><span>' + safe(label) + '</span></div></div>';
  }
  function categoryButtons(isCompact) {
    return '<div class="categories-row' + (isCompact ? ' categories-compact' : '') + '">' +
      DATA.categories.map(function (c) {
        return '<button type="button" class="category-chip' + (state.category === c.id ? " selected" : "") + '" data-action="category" data-id="' + c.id + '"><span>' + c.emoji + '</span>' + safe(c.name) + '</button>';
      }).join("") + '</div>';
  }
  function profileCards(items, limit) {
    if (typeof limit === "number") items = items.slice(0, limit);
    if (!items.length) return emptyState("Nenhum perfil encontrado", "Experimente outra busca ou remova alguns filtros.", "rede", "Limpar filtros");
    return '<div class="profile-grid">' + items.map(function (p) {
      var fav = state.favorites.has(p.id);
      return '<article class="profile-card"><div class="profile-cover tone-' + p.accent + '"><span class="cover-shape shape-a"></span><span class="cover-shape shape-b"></span><span class="cover-glyph">' + safe(p.emoji) + '</span></div>' +
        '<button type="button" class="favorite-button' + (fav ? " is-favorite" : "") + '" data-action="favorite" data-id="' + p.id + '" aria-label="' + (fav ? "Remover dos favoritos" : "Adicionar aos favoritos") + '" aria-pressed="' + fav + '">' + icon("heart", 19) + '</button>' +
        '<div class="profile-body"><div class="avatar tone-' + p.accent + '">' + safe(p.initials) + '</div><div class="profile-type">' + (p.type === "empresa" ? icon("building", 14) + " Empresa" : icon("user", 14) + " Profissional") + '</div>' +
        '<h3>' + safe(p.company) + '</h3><p class="profile-owner">' + safe(p.name) + ' · ' + safe(p.profession) + '</p><p class="profile-description">' + safe(p.short) + '</p>' +
        '<div class="tag-list">' + p.tags.slice(0, 2).map(function (tag) { return '<span>' + safe(tag) + '</span>'; }).join("") + '</div>' +
        '<div class="profile-footer"><span>' + icon("pin", 15) + safe(p.city) + '</span>' +
        button("Ver perfil " + icon("arrow", 16), "open-profile", "card-link", ' data-id="' + p.id + '"') + '</div></div></article>';
    }).join("") + '</div>';
  }
  function demandCards(items, limit) {
    if (typeof limit === "number") items = items.slice(0, limit);
    if (!items.length) return emptyState("Nenhuma demanda encontrada", "Altere os filtros ou explore todas as oportunidades.", "oportunidades", "Ver todas");
    return '<div class="demands-grid">' + items.map(function (d) {
      var institutional = d.kind === "institucional";
      return '<article class="demand-card"><div class="demand-top"><span class="demand-kind ' + (institutional ? "kind-institutional" : "kind-member") + '">' + icon(institutional ? "building" : "users", 15) + safe(d.label) + '</span><span class="demand-time">' + icon("clock", 14) + safe(d.time) + '</span></div>' +
        '<h3>' + safe(d.title) + '</h3><p class="demand-description">' + safe(d.description) + '</p>' +
        '<div class="demand-footer"><div class="demand-meta"><span>' + categoryIcon(d.category) + ' ' + safe(categoryName(d.category)) + '</span><span>' + safe(d.author) + '</span></div>' +
        button("Ver detalhes " + icon("arrow", 16), "open-demand", "card-link", ' data-id="' + safe(d.id) + '"') + '</div></article>';
    }).join("") + '</div>';
  }
  function offerCards(items) {
    if (!items.length) return emptyState("Nenhuma oferta encontrada", "Tente buscar por outra palavra ou categoria.", "ofertas", "Ver ofertas");
    return '<div class="offers-grid">' + items.map(function (o) {
      var p = profileById(o.providerId);
      return '<article class="offer-card"><div class="offer-illustration tone-' + o.accent + '"><span class="offer-glyph">' + safe(o.emoji) + '</span><span class="offer-decor"></span></div><div class="offer-content"><span class="offer-tag">' + icon("gift", 14) + ' Exemplo de benefício</span><h3>' + safe(o.title) + '</h3><p>' + safe(o.description) + '</p><span class="offer-benefit">' + icon("sparkles", 15) + safe(o.benefit) + '</span><div class="offer-bottom"><span>Por ' + safe(p ? p.company : "Perfil demonstrativo") + '</span>' + button("Ver detalhes " + icon("arrow", 16), "open-offer", "card-link", ' data-id="' + o.id + '"') + '</div></div></article>';
    }).join("") + '</div>';
  }
  function emptyState(title, message, page, label) {
    return '<div class="empty-state"><div class="empty-symbol">' + icon("search", 27) + '</div><h3>' + title + '</h3><p>' + message + '</p>' +
      button(safe(label) + icon("arrow", 16), "reset-to", "button button-primary", ' data-page="' + page + '"') + '</div>';
  }
  function matchesQuery(values) {
    if (!state.query.trim()) return true;
    var needle = normalize(state.query.trim());
    return values.some(function (v) { return normalize(v).includes(needle); });
  }
  function filteredProfiles() {
    return DATA.profiles.filter(function (p) {
      return (state.category === "todos" || p.category === state.category) &&
        (state.profileType === "todos" || p.type === state.profileType) &&
        matchesQuery([p.name, p.company, p.short, p.description, p.profession, p.city, p.category].concat(p.services, p.tags));
    });
  }
  function allDemands() {
    return state.addedDemands.concat(DATA.demands);
  }
  function filteredDemands() {
    return allDemands().filter(function (d) {
      return (state.demandKind === "todos" || d.kind === state.demandKind) &&
        matchesQuery([d.title, d.description, d.author, categoryName(d.category)]);
    });
  }
  function filteredOffers() {
    return DATA.offers.filter(function (o) {
      var p = profileById(o.providerId);
      return (state.category === "todos" || state.category === o.category) &&
        matchesQuery([o.title, o.description, o.benefit, categoryName(o.category), p && p.company]);
    });
  }

  function mobileWelcome() {
    return '<section class="mobile-welcome" aria-label="Escolha o que deseja fazer">' +
      '<span class="welcome-kicker">BEM-VINDO À REDE</span>' +
      '<h1>O que você precisa hoje?</h1><p>Escolha uma opção para começar.</p>' +
      '<div class="mobile-quick-actions">' +
      '<button type="button" class="quick-action quick-action-primary" data-action="nav" data-page="rede">' +
      '<span class="quick-icon">' + icon("search", 24) + '</span><span class="quick-text"><strong>Encontrar um serviço</strong><small>Veja quem pode ajudar você</small></span>' + icon("chevron", 23) + '</button>' +
      '<button type="button" class="quick-action" data-action="new-demand">' +
      '<span class="quick-icon">' + icon("plus", 24) + '</span><span class="quick-text"><strong>Preciso contratar alguém</strong><small>Conte o que está procurando</small></span>' + icon("chevron", 23) + '</button>' +
      '<button type="button" class="quick-action" data-action="nav" data-page="meu-perfil">' +
      '<span class="quick-icon">' + icon("user", 24) + '</span><span class="quick-text"><strong>Divulgar meu trabalho</strong><small>Crie seu cartão profissional</small></span>' + icon("chevron", 23) + '</button>' +
      '</div></section>';
  }
  function renderHome() {
    var picks = DATA.profiles.filter(function (p) { return p.featured; });
    return mobileWelcome() + '<section class="hero"><div class="hero-copy"><span class="hero-kicker">' + icon("sparkles", 16) + ' Uma comunidade, muitas possibilidades</span>' +
      '<h1>Boas conexões.<br><em>Grandes oportunidades.</em></h1><p>Descubra os talentos e negócios da nossa comunidade. Encontre quem oferece o que você precisa — e faça parte dessa rede.</p>' +
      '<div class="hero-actions">' + button("Explorar cooperados " + icon("arrow", 18), "nav", "button button-light", ' data-page="rede"') +
      button(icon("plus", 17) + " Publicar necessidade", "new-demand", "button button-outline-light") + '</div></div>' +
      '<div class="hero-visual" aria-hidden="true"><div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="hero-center"><span>co<span>.</span></span></div>' +
      '<div class="float-bubble bubble-a">💻 <span>Tecnologia</span></div><div class="float-bubble bubble-b">🏠 <span>Serviços</span></div><div class="float-bubble bubble-c">✳️ <span>Conexões</span></div></div></section>' +
      '<div class="demo-caption">' + icon("info", 16) + ' Esta é uma apresentação conceitual. Todos os perfis, ofertas e demandas exibidos são fictícios.</div>' +
      '<div class="metrics-grid">' +
      metric(DATA.profiles.length, "Perfis demonstrativos", "users") +
      metric(DATA.categories.length - 1, "Áreas de atuação", "briefcase") +
      metric(DATA.demands.length, "Demandas de exemplo", "message") +
      metric(DATA.offers.length, "Benefícios ilustrativos", "gift") + '</div>' +
      '<section class="content-section">' + smallHeading("O que você está procurando?", "Navegue pelas áreas de atuação da comunidade.") + categoryButtons(false) + '</section>' +
      '<section class="content-section">' + smallHeading("Conheça a comunidade", "Alguns exemplos de negócios e profissionais que poderiam fazer parte da rede.", "rede", "Ver todos os perfis") +
      profileCards(picks, 3) + '</section>' +
      '<section class="content-section section-alt">' + smallHeading("Oportunidades que conectam", "Pedidos de cooperados e necessidades da própria escola.", "oportunidades", "Ver mural completo") +
      demandCards(DATA.demands.slice(0, 2)) + '</section>' +
      '<section class="content-section">' + smallHeading("Benefícios entre cooperados", "Condições especiais que podem incentivar negócios dentro da comunidade.", "ofertas", "Ver benefícios") +
      offerCards(DATA.offers.slice(0, 2)) + '</section>' +
      '<section class="join-banner"><div><span class="eyebrow">FAÇA PARTE</span><h2>Seu talento também tem lugar aqui.</h2><p>Descubra como seria apresentar sua atividade profissional para a comunidade.</p></div>' +
      button("Montar meu perfil " + icon("arrow", 18), "nav", "button button-primary", ' data-page="meu-perfil"') + '</section>';
  }
  function renderDirectory() {
    var profiles = filteredProfiles();
    return titleBlock("ENCONTRE UM SERVIÇO", "Quem pode ajudar você?", "Busque pelo serviço que precisa ou escolha uma área.") +
      '<div class="filter-panel"><div class="filter-head"><strong>' + icon("filter", 18) + ' Filtrar por área</strong><span>Selecione uma categoria</span></div>' + categoryButtons(true) +
      '<div class="filter-bottom"><span>Tipo de perfil</span><div class="segmented">' +
      [["todos", "Todos"], ["empresa", "Empresas"], ["profissional", "Profissionais"]].map(function (item) {
        return button(item[1], "profile-type", "segment" + (state.profileType === item[0] ? " active" : ""), ' data-id="' + item[0] + '"');
      }).join("") + '</div></div></div>' +

      '<details class="mobile-filter-panel"><summary>' + icon("filter", 20) + ' Filtrar resultados ' + icon("down", 19) + '</summary><div class="mobile-filter-content"><p>Área do serviço</p>' + categoryButtons(true) +
      '<p>Tipo de cadastro</p><div class="segmented">' +
      [["todos", "Todos"], ["empresa", "Empresas"], ["profissional", "Profissionais"]].map(function (item) {
        return button(item[1], "profile-type", "segment" + (state.profileType === item[0] ? " active" : ""), ' data-id="' + item[0] + '"');
      }).join("") + '</div>' +
      button("Limpar filtros", "reset-to", "button button-secondary mobile-reset", ' data-page="rede"') + '</div></details>' +
      '<div class="results-header"><div><strong>' + profiles.length + '</strong> ' + (profiles.length === 1 ? "perfil encontrado" : "perfis encontrados") + '</div><span>Resultados de demonstração</span></div>' +
      profileCards(profiles);
  }
  function renderOpportunities() {
    var demands = filteredDemands();
    return titleBlock("PEDIDOS DA COMUNIDADE", "Pedidos e oportunidades.", "Encontre pedidos de serviços ou publique o que precisa.",
      button(icon("plus", 18) + " Publicar meu pedido", "new-demand", "button button-primary")) +
      '<div class="info-banner">' + icon("info", 19) + '<p><strong>Como funciona?</strong> Cooperados podem encontrar prestadores e publicar pedidos. Demandas institucionais reais exigirão critérios próprios de aprovação e seleção.</p></div>' +
      '<div class="filter-line"><div class="segmented">' +
      [["todos", "Todas as demandas"], ["cooperado", "De cooperados"], ["institucional", "Da Coopen"]].map(function (item) {
        return button(item[1], "demand-kind", "segment" + (state.demandKind === item[0] ? " active" : ""), ' data-id="' + item[0] + '"');
      }).join("") + '</div><span>' + demands.length + ' ' + (demands.length === 1 ? "oportunidade" : "oportunidades") + '</span></div>' + demandCards(demands);
  }
  function renderOffers() {
    return titleBlock("BENEFÍCIOS DA REDE", "Vantagens de estar conectado.", "Uma vitrine demonstrativa para condições especiais oferecidas por membros da comunidade.") +
      '<div class="info-banner">' + icon("gift", 20) + '<p><strong>Ofertas ilustrativas.</strong> Não há descontos, preços ou condições comerciais reais nesta versão.</p></div>' +
      '<section class="content-section first-section">' + smallHeading("Explore os benefícios", "Clique nas categorias para descobrir exemplos de ofertas.") + categoryButtons(true) +
      '<div class="spaced-grid">' + offerCards(filteredOffers()) + '</div></section>';
  }
  function renderFavorites() {
    var profiles = DATA.profiles.filter(function (p) { return state.favorites.has(p.id); });
    return titleBlock("SUA LISTA", "Seus perfis favoritos.", "Guarde os negócios e profissionais que mais chamaram sua atenção neste navegador.") +
      (profiles.length ? '<div class="results-header"><div><strong>' + profiles.length + '</strong> perfis salvos</div><span>Armazenamento local</span></div>' + profileCards(profiles) :
        '<div class="empty-state spacious"><div class="empty-symbol">' + icon("heart", 31) + '</div><h3>Você ainda não salvou ninguém.</h3><p>Explore os perfis e clique no coração para criar sua lista de favoritos.</p>' +
        button("Explorar cooperados " + icon("arrow", 17), "nav", "button button-primary", ' data-page="rede"') + '</div>');
  }
  function renderMyProfile() {
    var p = state.myProfile;
    return titleBlock("MEU CARTÃO PROFISSIONAL", "Divulgue seu trabalho.", "Preencha seus dados para ver como outras pessoas encontrariam seu serviço.") +
      '<div class="info-banner">' + icon("info", 19) + '<p><strong>Somente demonstração.</strong> Os campos abaixo ficam guardados neste navegador. Não envie dados sensíveis; nenhum cadastro será enviado à Coopen.</p></div>' +
      '<div class="profile-editor-layout"><form id="profile-form" class="form-panel"><div class="form-heading"><h2>Meu cartão profissional</h2><span>Prévia de cadastro</span></div>' +
      '<div class="fields-grid"><label>Seu nome<input type="text" name="name" maxlength="70" required value="' + safe(p.name) + '" placeholder="Como você quer ser chamado"></label>' +
      '<label>Profissão ou atividade<input type="text" name="profession" maxlength="80" required value="' + safe(p.profession) + '" placeholder="Ex.: Desenvolvedor web"></label></div>' +
      '<label>Empresa ou nome comercial <small>(opcional)</small><input type="text" name="company" maxlength="90" value="' + safe(p.company) + '" placeholder="Ex.: Minha Empresa"></label>' +
      '<label>Cidade<input type="text" name="city" maxlength="80" value="' + safe(p.city) + '" placeholder="Cidade de atendimento"></label>' +
      '<label>Sobre seu trabalho<textarea name="description" maxlength="600" rows="5" placeholder="Conte um pouco sobre o que você oferece">' + safe(p.description) + '</textarea></label>' +
      '<label>Serviços oferecidos <small>(separados por vírgula)</small><input type="text" name="services" maxlength="250" value="' + safe(p.services) + '" placeholder="Ex.: Sites, aplicativos, suporte técnico"></label>' +
      '<div class="form-actions"><button class="button button-primary" type="submit">' + icon("check", 18) + ' Salvar demonstração</button>' +
      button("Limpar meus dados", "reset-profile", "button button-secondary") + '</div></form>' +
      '<div class="preview-column"><div class="preview-panel"><span class="preview-label">VISUALIZAÇÃO PRÉVIA</span><div class="preview-cover"><span>co.</span></div><div class="preview-avatar">' + safe((p.name || "Cooperado").trim().split(/\s+/).map(function (word) { return word[0]; }).slice(0, 2).join("").toUpperCase()) + '</div>' +
      '<h3>' + safe(p.company || p.name || "Seu nome") + '</h3><p>' + safe(p.profession || "Sua atividade") + '</p><span class="preview-city">' + icon("pin", 15) + safe(p.city || "Sua cidade") + '</span>' +
      '<div class="preview-divider"></div><h4>Sobre</h4><p>' + safe(p.description || "Sua apresentação profissional aparecerá aqui depois que preencher o formulário.") + '</p>' +
      '<h4>Serviços</h4><div class="tag-list">' + (p.services ? p.services.split(",").filter(Boolean).map(function (item) { return '<span>' + safe(item.trim()) + '</span>'; }).join("") : "<span>Adicione serviços no formulário</span>") + '</div></div></div></div>';
  }
  function renderManagement() {
    var reviewQueue = [
      { id: "m1", company: "Empresa Exemplo Alfa", category: "Tecnologia", kind: "Novo perfil", initials: "EA" },
      { id: "m2", company: "Profissional Exemplo Beta", category: "Educação", kind: "Novo perfil", initials: "PB" },
      { id: "m3", company: "Oferta Exemplo Gama", category: "Casa e obras", kind: "Nova oferta", initials: "OG" }
    ];
    var pending = reviewQueue.filter(function (i) { return !state.moderation[i.id]; });
    return titleBlock("VISÃO DA COOPERATIVA", "Gestão e moderação da rede.", "Uma simulação do painel administrativo para avaliar quais controles a equipe da Coopen realmente precisa.") +
      '<div class="info-banner">' + icon("shield", 19) + '<p><strong>Área demonstrativa sem controle de acesso.</strong> Aprovar ou recusar aqui não altera cadastros reais. Na versão de produção, este espaço será restrito a pessoas autorizadas.</p></div>' +
      '<div class="metrics-grid management-metrics">' + metric(DATA.profiles.length, "Perfis fictícios", "users") +
      metric(pending.length, "Itens aguardando revisão", "clock") + metric(DATA.offers.length, "Ofertas ilustrativas", "gift") +
      metric(allDemands().length, "Demandas no navegador", "briefcase") + '</div>' +
      '<div class="management-layout"><div class="form-panel"><div class="form-heading"><h2>Fila de moderação</h2><span>' + pending.length + ' pendente(s)</span></div>' +
      (pending.length ? pending.map(function (i) {
        return '<div class="review-item"><div class="review-avatar">' + i.initials + '</div><div class="review-details"><strong>' + safe(i.company) + '</strong><span>' + safe(i.kind) + ' · ' + safe(i.category) + '</span></div><div class="review-actions">' +
          button(icon("check", 17) + " Aprovar", "moderate", "mini-button mini-approve", ' data-id="' + i.id + '" data-status="aprovado"') +
          button(icon("x", 16), "moderate", "mini-button mini-reject", ' data-id="' + i.id + '" data-status="recusado" aria-label="Recusar item"') +
          '</div></div>';
      }).join("") : '<div class="queue-empty">' + icon("checkcircle", 30) + '<strong>Nenhum item pendente!</strong><p>Você pode reiniciar a demonstração para testar novamente.</p></div>') +
      button(icon("refresh", 16) + " Reiniciar moderação", "reset-moderation", "button button-secondary") + '</div>' +
      '<div class="management-notes"><h3>Decisões de produto a validar</h3><div class="check-list">' +
      ["Quem pode aprovar novos perfis?", "Ofertas exigem revisão antes de publicar?", "Demandas institucionais precisam de critérios de cotação?", "Quais informações podem ser públicas?", "Como lidar com denúncias e perfis desatualizados?"].map(function (t) {
        return '<div>' + icon("checkcircle", 18) + '<span>' + safe(t) + '</span></div>';
      }).join("") + '</div><div class="management-note-foot">' + icon("info", 18) + ' Essas regras devem ser aprovadas pela cooperativa antes de qualquer uso real.</div></div></div>';
  }
  function renderPage() {
    if (state.page === "rede") return renderDirectory();
    if (state.page === "oportunidades") return renderOpportunities();
    if (state.page === "ofertas") return renderOffers();
    if (state.page === "favoritos") return renderFavorites();
    if (state.page === "meu-perfil") return renderMyProfile();
    if (state.page === "gestao") return renderManagement();
    return renderHome();
  }
  function modalShell(content, wide) {
    return '<div class="modal-backdrop" data-action="close-modal" role="presentation"><section class="modal' + (wide ? " modal-wide" : "") +
      '" role="dialog" aria-modal="true" aria-label="Detalhes da demonstração"><button type="button" class="modal-close" data-action="close-modal" aria-label="Fechar">' +
      icon("x", 21) + '</button>' + content + '</section></div>';
  }
  function renderModal() {
    if (!state.modal) return "";
    var id = state.modal.id;
    if (state.modal.kind === "profile") {
      var p = profileById(id);
      if (!p) return "";
      return modalShell('<div class="modal-cover tone-' + p.accent + '"><span class="modal-cover-symbol">' + safe(p.emoji) + '</span></div>' +
        '<div class="modal-content"><div class="modal-profile-heading"><div class="modal-avatar tone-' + p.accent + '">' + safe(p.initials) + '</div>' +
        '<span class="demo-tag">Perfil fictício</span></div><h2>' + safe(p.company) + '</h2><p class="modal-subtitle">' + safe(p.name) + ' · ' + safe(p.profession) + '</p>' +
        '<div class="modal-meta">' + icon("pin", 16) + safe(p.city) + ' <span class="meta-divider"></span> ' + categoryIcon(p.category) + ' ' + safe(categoryName(p.category)) + '</div>' +
        '<h3>Sobre</h3><p>' + safe(p.description) + '</p><h3>Serviços oferecidos</h3><div class="services-list">' + p.services.map(function (s) {
          return '<div>' + icon("checkcircle", 17) + safe(s) + '</div>';
        }).join("") + '</div><div class="modal-actions">' +
        button(icon("message", 17) + " Simular contato", "contact", "button button-primary", ' data-id="' + p.id + '"') +
        button(icon("heart", 17) + (state.favorites.has(p.id) ? " Remover favorito" : " Salvar favorito"), "favorite", "button button-secondary", ' data-id="' + p.id + '"') +
        '</div><p class="modal-fineprint">Nenhum contato real é disponibilizado neste protótipo.</p></div>', true);
    }
    if (state.modal.kind === "demand") {
      var d = allDemands().find(function (x) { return x.id === id; });
      if (!d) return "";
      return modalShell('<div class="modal-content modal-simple"><span class="demand-kind ' + (d.kind === "institucional" ? "kind-institutional" : "kind-member") + '">' +
        icon(d.kind === "institucional" ? "building" : "users", 15) + safe(d.label) + '</span><h2>' + safe(d.title) + '</h2>' +
        '<p class="modal-subtitle">' + safe(d.author) + ' · ' + safe(categoryName(d.category)) + '</p>' +
        '<h3>Sobre a necessidade</h3><p>' + safe(d.description) + '</p><div class="modal-note">' + icon("info", 19) +
        '<span>Em uma versão futura, o interessado poderá enviar uma manifestação de interesse ou solicitar contato. Esta demanda não é real.</span></div>' +
        '<div class="modal-actions">' + button(icon("message", 17) + " Simular interesse", "interest", "button button-primary") +
        button("Voltar ao mural", "close-modal", "button button-secondary") + '</div></div>', false);
    }
    if (state.modal.kind === "offer") {
      var o = DATA.offers.find(function (x) { return x.id === id; });
      if (!o) return "";
      var provider = profileById(o.providerId);
      return modalShell('<div class="modal-content modal-simple"><span class="offer-tag">' + icon("gift", 15) + ' Oferta fictícia</span><h2>' + safe(o.title) + '</h2>' +
        '<p class="modal-subtitle">Por ' + safe(provider ? provider.company : "Cooperado demonstrativo") + '</p><h3>Benefício de exemplo</h3><p>' + safe(o.benefit) + '.</p><p>' + safe(o.description) + '</p>' +
        '<div class="modal-note">' + icon("info", 19) + '<span>Nenhuma vantagem comercial está sendo oferecida de verdade nesta demonstração.</span></div>' +
        '<div class="modal-actions">' + button("Conhecer perfil " + icon("arrow", 17), "open-profile", "button button-primary", ' data-id="' + o.providerId + '"') +
        button("Fechar", "close-modal", "button button-secondary") + '</div></div>', false);
    }
    if (state.modal.kind === "contact") {
      var contacted = profileById(id);
      return modalShell('<div class="modal-content modal-simple"><div class="contact-symbol">' + icon("message", 30) + '</div><h2>Contato entre cooperados</h2>' +
        '<p>Na plataforma real, este botão poderá abrir o WhatsApp profissional de <strong>' + safe(contacted ? contacted.company : "um cooperado") + '</strong> ou outro canal autorizado.</p>' +
        '<div class="modal-note">' + icon("shield", 20) + '<span>Este protótipo não possui números, mensagens enviadas ou integração com serviços externos.</span></div>' +
        '<div class="modal-actions">' + button("Voltar ao perfil", "open-profile", "button button-primary", ' data-id="' + id + '"') + '</div></div>', false);
    }
    if (state.modal.kind === "new-demand") {
      return modalShell('<div class="modal-content modal-simple"><span class="eyebrow">PUBLICAR NECESSIDADE</span><h2>O que você está procurando?</h2>' +
        '<p class="modal-subtitle">Experimente a publicação de um pedido no mural da comunidade.</p>' +
        '<div class="modal-note">' + icon("info", 19) + '<span>Seu pedido será salvo apenas neste navegador. Não haverá envio, divulgação ou resposta de fornecedores.</span></div>' +
        '<form id="demand-form" class="modal-form"><label>Título da necessidade<input type="text" name="title" maxlength="100" required placeholder="Ex.: Preciso de um fotógrafo para evento"></label>' +
        '<label>Área do serviço<select name="category" required>' + DATA.categories.filter(function (c) { return c.id !== "todos"; }).map(function (c) {
          return '<option value="' + c.id + '">' + safe(c.name) + '</option>';
        }).join("") + '</select></label>' +
        '<label>Descreva o que precisa<textarea name="description" rows="5" maxlength="750" required placeholder="Conte o que você está procurando, sem incluir dados pessoais."></textarea></label>' +
        '<div class="form-actions"><button type="submit" class="button button-primary">' + icon("plus", 17) + ' Adicionar ao mural demo</button>' +
        button("Cancelar", "close-modal", "button button-secondary") + '</div></form></div>', false);
    }
    return "";
  }

  function mobileBottomNav() {
    var tabs = [
      ["inicio", "home", "Início"],
      ["rede", "search", "Buscar"],
      ["oportunidades", "briefcase", "Pedidos"],
      ["meu-perfil", "user", "Meu perfil"]
    ];
    return '<nav class="mobile-bottom-nav" aria-label="Navegação rápida">' + tabs.map(function (tab) {
      return '<button type="button" class="bottom-tab' + (state.page === tab[0] ? ' bottom-tab-active' : '') +
        '" data-action="nav" data-page="' + tab[0] + '"' + (state.page === tab[0] ? ' aria-current="page"' : '') +
        '>' + icon(tab[1], 23) + '<span>' + tab[2] + '</span></button>';
    }).join("") + '</nav>';
  }
  function footer() {
    return '<footer class="site-footer"><span><strong>rede coopen</strong> · Protótipo conceitual independente e não oficial</span><span>Dados fictícios · Sem backend · Feito para validar ideias</span></footer>';
  }
  function render() {
    document.getElementById("app").innerHTML =
      (state.menuOpen ? '<button class="sidebar-overlay" type="button" data-action="menu" aria-label="Fechar menu"></button>' : "") +
      sidebar() + '<div class="main-shell">' + topbar() + '<main id="page-content" class="main-content">' + renderPage() + '</main>' +
      footer() + '</div>' + mobileBottomNav() + renderModal() + (state.toast ? '<div class="toast" role="status">' + icon("checkcircle", 20) + safe(state.toast) + '</div>' : "");
    document.body.classList.toggle("has-modal", !!state.modal);
  }
  var toastTimer;
  function notify(message) {
    state.toast = message;
    render();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { state.toast = ""; var item = document.querySelector(".toast"); if (item) item.remove(); }, 3500);
  }
  document.addEventListener("click", function (event) {
    var target = event.target.closest("[data-action]");
    if (!target) return;
    var action = target.dataset.action;
    if (action === "close-modal" && event.target.closest(".modal") && !event.target.closest(".modal-close") && target.classList.contains("modal-backdrop")) return;
    var id = target.dataset.id;
    if (action === "nav") { navTo(target.dataset.page); return; }
    if (action === "reset-to") { state.query = ""; state.category = "todos"; state.profileType = "todos"; state.demandKind = "todos"; navTo(target.dataset.page); return; }
    if (action === "my-profile") { navTo("meu-perfil"); return; }
    if (action === "menu") { state.menuOpen = !state.menuOpen; render(); return; }
    if (action === "category") { state.category = id; navTo(state.page === "ofertas" ? "ofertas" : "rede"); return; }
    if (action === "profile-type") { state.profileType = id; render(); return; }
    if (action === "demand-kind") { state.demandKind = id; render(); return; }
    if (action === "clear-search") { state.query = ""; render(); var search = document.getElementById("global-search"); if (search) search.focus(); return; }
    if (action === "favorite") {
      if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
      store(KEYS.favorites, Array.from(state.favorites));
      render(); return;
    }
    if (action === "open-profile") { state.modal = { kind: "profile", id: id }; render(); return; }
    if (action === "open-demand") { state.modal = { kind: "demand", id: id }; render(); return; }
    if (action === "open-offer") { state.modal = { kind: "offer", id: id }; render(); return; }
    if (action === "contact") { state.modal = { kind: "contact", id: id }; render(); return; }
    if (action === "interest") { state.modal = null; notify("Interesse simulado! Nenhuma mensagem foi enviada."); return; }
    if (action === "new-demand") { state.modal = { kind: "new-demand" }; render(); return; }
    if (action === "close-modal") { state.modal = null; render(); return; }
    if (action === "moderate") {
      state.moderation[id] = target.dataset.status;
      store(KEYS.moderation, state.moderation);
      notify("Item de exemplo marcado como " + target.dataset.status + "."); return;
    }
    if (action === "reset-moderation") { state.moderation = {}; store(KEYS.moderation, {}); notify("Fila demonstrativa reiniciada."); return; }
    if (action === "reset-profile") {
      state.myProfile = { name: "Seu nome", profession: "Sua atividade", company: "", city: "São José do Rio Preto", description: "", services: "" };
      store(KEYS.profile, state.myProfile);
      notify("Dados locais do perfil reiniciados."); return;
    }
  });
  document.addEventListener("input", function (event) {
    if (!event.target.matches("[data-search]")) return;
    var caret = event.target.selectionStart;
    state.query = event.target.value;
    if (state.query && state.page === "inicio") {
      state.page = "rede";
      location.hash = "rede";
    }
    render();
    var nextInput = document.getElementById("global-search");
    if (nextInput) {
      nextInput.focus();
      if (typeof caret === "number") nextInput.setSelectionRange(caret, caret);
    }
  });
  document.addEventListener("submit", function (event) {
    if (event.target.id === "profile-form") {
      event.preventDefault();
      var f = event.target.elements;
      state.myProfile = {
        name: f.namedItem("name").value.trim(), profession: f.namedItem("profession").value.trim(),
        company: f.namedItem("company").value.trim(), city: f.namedItem("city").value.trim(),
        description: f.namedItem("description").value.trim(), services: f.namedItem("services").value.trim()
      };
      store(KEYS.profile, state.myProfile);
      notify("Seu perfil demonstrativo foi salvo neste navegador."); return;
    }
    if (event.target.id === "demand-form") {
      event.preventDefault();
      var fields = event.target.elements;
      var title = fields.namedItem("title").value.trim();
      var description = fields.namedItem("description").value.trim();
      if (!title || !description) return;
      state.addedDemands.unshift({
        id: "local-" + Date.now(), title: title, description: description,
        category: fields.namedItem("category").value, author: "Você (neste navegador)",
        kind: "cooperado", label: "Pedido demonstrativo", time: "Criado localmente", status: "aberta"
      });
      store(KEYS.demands, state.addedDemands);
      state.modal = null;
      state.demandKind = "todos";
      navTo("oportunidades");
      notify("Demanda adicionada somente à sua demonstração local.");
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && (state.modal || state.menuOpen)) {
      state.modal = null; state.menuOpen = false; render();
    }
  });
  window.addEventListener("hashchange", function () {
    var nextPage = decodeURIComponent(location.hash.slice(1));
    if (PAGES.indexOf(nextPage) >= 0 && nextPage !== state.page) {
      state.page = nextPage; state.modal = null; state.menuOpen = false; render();
    }
  });
  render();
})();