const lang = location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'de';
const rawPath = decodeURI(location.pathname).replace(/\/$/, '') || '/';
const path = lang === 'en' ? rawPath.slice(3) || '/' : rawPath;
const copy = window.VOSSHOERN_I18N[lang];
const c = copy.common;
const asset = '/assets/';
const apartmentMeta = [
  {slug:'kaeptn',number:'01',image:'kaeptn.webp',count:44},
  {slug:'ausguck',number:'02',image:'ausguck.webp',count:25},
  {slug:'steuermann',number:'03',image:'steuermann.webp',count:41},
  {slug:'matrose',number:'04',image:'matrose.webp',count:22}
];
const apartments = apartmentMeta.map((a,i)=>({...a,...copy.apartments[i]}));
const route = p => lang === 'en' ? '/en' + (p === '/' ? '' : p) : p;
const languageRoute = target => target === 'en' ? '/en' + (path === '/' ? '' : path) : path;
const photo = (file, alt, extra = '') => `<img src="${asset}${file}" alt="${alt}" ${extra}>`;
const textLink = (label, href) => `<a class="text-link" href="${href}">${label}<span aria-hidden="true">↗</span></a>`;
const topline = (left, right) => `<div class="section-topline"><span>${left}</span><span>${right}</span></div>`;
const galleryFile = (slug, index) => `${asset}gallery/${slug}-${String(index + 1).padStart(2,'0')}.webp`;

function flags(className = '') {
  return `<div class="language-switch ${className}" aria-label="Language / Sprache">
    <a href="${languageRoute('de')}" lang="de" aria-label="Deutsch" title="Deutsch" ${lang === 'de' ? 'aria-current="true"' : ''}>${photo('flag-de.svg','')}<span>DE</span></a>
    <a href="${languageRoute('en')}" lang="en" aria-label="English" title="English" ${lang === 'en' ? 'aria-current="true"' : ''}>${photo('flag-en.svg','')}<span>EN</span></a>
  </div>`;
}

function header() {
  return `<header class="site-header" id="site-header">
    <a class="brand" href="${route('/')}" aria-label="${c.brandAlt}">${photo('vosshoern-logo.jpg','Das Vosshörn')}</a>
    <div class="header-actions">
      <nav class="header-nav" aria-label="${c.menu}">${c.nav.map(([p,label])=>`<a href="${route(p)}" ${path === p ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
      ${flags()}
      <a class="pill desktop-cta" href="${route('/kontakt')}">${c.ask} <span aria-hidden="true">↗</span></a>
      <button class="menu-button" type="button" aria-label="${c.openMenu}" aria-expanded="false"><span>${c.menu}</span><span class="menu-lines"><i></i><i></i></span></button>
    </div>
  </header>`;
}

function mobileMenu() {
  return `<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <div class="mobile-top"><a class="brand" href="${route('/')}" aria-label="${c.brandAlt}">${photo('vosshoern-logo.jpg','Das Vosshörn')}</a><button class="menu-close" type="button" aria-label="${c.closeMenu}">×</button></div>
    <nav class="mobile-links" aria-label="${c.menu}">${[...c.nav,['/kontakt',c.contact]].map(([p,label])=>`<a href="${route(p)}">${label}</a>`).join('')}</nav>
    <div class="mobile-foot">${flags('language-switch-mobile')}<span>Cuxhaven-Duhnen · Nordsee</span></div>
  </div>`;
}

function footer() {
  return `<footer class="footer"><div class="footer-inner"><div class="footer-main">
    <div class="footer-brand">${c.footerTitle}</div>
    <div class="footer-col"><strong>${c.discover}</strong>${[...c.nav,['/kontakt',c.contact]].map(([p,label])=>`<a href="${route(p)}">${label}</a>`).join('')}</div>
    <div class="footer-col"><strong>${c.footerContact}</strong><span>Vosshörn 32<br>27476 Cuxhaven-Duhnen</span><a href="tel:+491729291239">+49 172 929 1239</a><a href="mailto:info@vosshoern.de">info@vosshoern.de</a></div>
    </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Das Vosshörn · ${c.demo}</span><a href="https://www.vosshoern.de/impressum-and-datenschutz" target="_blank" rel="noopener noreferrer">${c.legal}</a></div></div></footer>`;
}

function cta() {
  return `<section class="cta-section"><div class="cta-inner">${topline(c.ctaEyebrow,c.ctaLocation)}<h2>${c.ctaTitle}</h2><div class="cta-row"><p>${c.ctaText}</p><a class="pill" href="${route('/kontakt')}">${c.askNow} <span aria-hidden="true">↗</span></a></div></div></section>`;
}

function card(a) {
  const href = route(`/wohnungen/${a.slug}`);
  return `<article class="apartment-card"><a class="card-image" href="${href}">${photo(a.image,`${c.apartment} ${a.name}`,'loading="lazy"')}<span aria-hidden="true">↗</span></a><div class="card-meta"><span>${c.apartment} ${a.number}</span><span>${a.size} · ${a.guests}</span></div><h3 class="card-title"><a href="${href}">${a.name}</a></h3><p class="card-description">${a.line}</p></article>`;
}

function home() {
  const x = copy.home;
  return `${header()}<main id="main"><section class="hero">${photo('sea-sky.webp',lang === 'de' ? 'Weite Nordseelandschaft mit Himmel und Meer' : 'Wide North Sea sky and sea')}<div class="hero-content"><span class="eyebrow">${x.heroEyebrow}</span><h1>${x.heroTitle}</h1><div class="hero-bottom"><p>${x.heroText}</p><a class="hero-scroll" href="#entdecken">${x.scroll} <span aria-hidden="true">↓</span></a></div></div></section>
    <section class="section" id="entdecken"><div class="section-inner">${topline(x.introLeft,x.introRight)}<div class="intro-grid"><h2 class="display">${x.introTitle}</h2><div><p class="lead">${x.introText}</p>${textLink(x.introLink,route('/haus'))}</div></div></div></section>
    <div class="image-band tint">${photo('house-garden.webp',lang === 'de' ? 'Das Ferienhaus Vosshörn mit Garten' : 'Das Vosshörn holiday house and garden','loading="lazy"')}</div>
    <section class="section apartments"><div class="section-inner">${topline(x.apartmentsLeft,x.apartmentsRight)}<div class="section-heading"><h2>${x.apartmentsTitle}</h2><p>${x.apartmentsText}</p></div><div class="card-grid">${apartments.map(card).join('')}</div><div class="apartments-end">${textLink(x.apartmentsLink,route('/wohnungen'))}</div></div></section>
    <section class="split-section"><div class="split-image">${photo('house-exterior.webp',lang === 'de' ? 'Außenansicht des Hauses in Duhnen' : 'Exterior of the house in Duhnen','loading="lazy"')}</div><div class="split-copy"><span class="eyebrow">${x.houseEyebrow}</span><div><h2>${x.houseTitle}</h2><p>${x.houseText}</p></div>${textLink(x.houseLink,route('/haus'))}</div></section>
    <section class="section"><div class="section-inner">${topline(x.togetherLeft,x.togetherRight)}<h2 class="display">${x.togetherTitle}</h2><div class="number-grid">${['4','12','1'].map((n,i)=>`<article><strong>${n}</strong><span>${x.stats[i]}</span></article>`).join('')}</div></div></section>
    <section class="quote-section section"><div class="section-inner"><div class="eyebrow">${x.quoteEyebrow}</div><p>${x.quote}</p>${textLink(x.quoteLink,route('/region'))}</div></section>
    <section class="split-section"><div class="split-copy split-copy-light"><span class="eyebrow">${x.guestEyebrow}</span><div><h2>${x.guestTitle}</h2><p>${x.guestText}</p></div>${textLink(x.guestLink,route('/gaestehaus'))}</div><div class="split-image">${photo('guesthouse.webp',lang === 'de' ? 'Wohnbereich im Gästehaus' : 'Living area in the guest house','loading="lazy"')}</div></section>${cta()}</main>${footer()}${mobileMenu()}`;
}

function pageHero(kicker,title,text) {
  return `${header()}<main id="main"><section class="page-hero"><div class="page-hero-inner"><div class="breadcrumb"><a href="${route('/')}">${c.home}</a><span>/</span><span>${kicker}</span></div><h1>${title}</h1><p>${text}</p></div></section>`;
}

function listing() {
  const x = copy.listing;
  return `${pageHero(x.kicker,x.title,x.intro)}<section class="section listing"><div class="section-inner"><div class="card-grid">${apartments.map(card).join('')}</div><p class="notice">${c.priceNotice}</p></div></section><section class="split-section"><div class="split-image">${photo('house-garden.webp',lang === 'de' ? 'Das Vosshörn mit Garten' : 'Das Vosshörn with its garden','loading="lazy"')}</div><div class="split-copy"><span class="eyebrow">${x.togetherEyebrow}</span><div><h2>${x.togetherTitle}</h2><p>${x.togetherText}</p></div>${textLink(x.togetherLink,route('/kontakt'))}</div></section>${cta()}</main>${footer()}${mobileMenu()}`;
}

function gallery(a) {
  const thumbs = Array.from({length:Math.min(4,a.count)},(_,i)=>`<button class="gallery-thumb ${i === 0 ? 'active' : ''}" type="button" data-photo-index="${i}" aria-label="${c.showImage} ${i + 1}" aria-pressed="${i === 0}"><img src="${galleryFile(a.slug,i)}" alt=""></button>`).join('');
  return `<section class="section gallery-section" id="gallery" data-gallery="${a.slug}" data-count="${a.count}"><div class="section-inner">${topline(c.galleryLabel,`${a.count} ${c.images}`)}<div class="gallery-heading"><h2>${a.name}<span>.</span></h2><p>${c.galleryIntro}</p></div><div class="gallery-stage">${photo(`gallery/${a.slug}-01.webp`,`${c.image} 1 ${c.galleryOf} ${a.count}: ${a.name}`,'class="gallery-main-image"')}<button class="gallery-arrow gallery-arrow-left" type="button" data-gallery-direction="-1" aria-label="${c.previousImages}" disabled>←</button><button class="gallery-arrow gallery-arrow-right" type="button" data-gallery-direction="1" aria-label="${c.nextImages}">→</button></div><div class="gallery-lower"><button class="gallery-set-arrow" type="button" data-gallery-direction="-1" aria-label="${c.previousImages}" disabled>←</button><div class="gallery-thumbs">${thumbs}</div><button class="gallery-set-arrow" type="button" data-gallery-direction="1" aria-label="${c.nextImages}">→</button></div><p class="gallery-counter" aria-live="polite">01 / ${a.count}</p></div></section>`;
}

function detail(a) {
  return `${pageHero(`${c.apartment} ${a.number}`,`${a.name}.`,a.line)}<div class="detail-image">${photo(a.image,`${c.apartment} ${a.name}`)}</div><section class="section detail-section"><div class="section-inner detail-content"><div class="detail-sticky"><span class="eyebrow">${c.apartment} ${a.number} / Das Vosshörn</span><h2>${a.size}<br>${a.guests}</h2>${textLink(c.inquireStay,route(`/kontakt?wohnung=${a.slug}`))}</div><div><h2>${a.line}</h2><p>${a.description}</p><div class="feature-list">${a.features.map(f=>`<span>${f}</span>`).join('')}</div><div class="price-note"><strong>${a.price}</strong>${c.priceDetail}</div><div class="back-row">${textLink(c.allApartments,route('/wohnungen'))}</div></div></div></section>${gallery(a)}${cta()}</main>${footer()}${mobileMenu()}`;
}

function factGrid(facts, extra = '') {
  return `<div class="info-grid">${facts.map(([title,text],i)=>`<article><h3>${title}</h3><p>${text}</p>${extra && i === facts.length-1 ? extra : ''}</article>`).join('')}</div>`;
}

function house() {
  const x = copy.house;
  return `${pageHero(x.kicker,x.title,x.intro)}<div class="detail-image">${photo('house-exterior.webp',lang === 'de' ? 'Das Ferienhaus Das Vosshörn von außen' : 'Das Vosshörn holiday house exterior')}</div><section class="section"><div class="section-inner">${topline(x.left,x.right)}<div class="intro-grid"><h2 class="display">${x.headline}</h2><div><p class="lead">${x.text}</p>${textLink(x.link,route('/wohnungen'))}</div></div></div></section><div class="image-band">${photo('house-history.webp',lang === 'de' ? 'Impression vom Ferienhaus' : 'View of the holiday house','loading="lazy"')}</div><section class="section"><div class="section-inner">${topline(x.infoLeft,x.infoRight)}${factGrid(x.facts)}</div></section>${cta()}</main>${footer()}${mobileMenu()}`;
}

function guesthouse() {
  const x = copy.guesthouse;
  return `${pageHero(x.kicker,x.title,x.intro)}<div class="detail-image">${photo('guesthouse.webp',lang === 'de' ? 'Wohnbereich im Gästehaus am Brockeswald' : 'Living area in the Brockeswald guest house')}</div><section class="section"><div class="section-inner detail-content"><div class="detail-sticky"><span class="eyebrow">${x.eyebrow}</span><h2>${x.size}</h2>${textLink(c.inquireStay,route('/kontakt?wohnung=gaestehaus'))}</div><div><h2>${x.headline}</h2><p>${x.text}</p><div class="feature-list">${x.features.map(f=>`<span>${f}</span>`).join('')}</div><div class="price-note"><strong>${x.price}</strong>${c.priceGuest}</div></div></div><div class="section-inner photo-pair">${photo('guesthouse-bedroom.webp',lang === 'de' ? 'Schlafzimmer im Gästehaus' : 'Guest house bedroom','loading="lazy"')}${photo('guesthouse-exterior.webp',lang === 'de' ? 'Außenansicht des Gästehauses' : 'Guest house exterior','loading="lazy"')}</div></section>${cta()}</main>${footer()}${mobileMenu()}`;
}

function region() {
  const x = copy.region;
  return `${pageHero(x.kicker,x.title,x.intro)}<div class="detail-image">${photo('sea-evening.webp',lang === 'de' ? 'Nordsee am Abend' : 'North Sea in the evening')}</div><section class="section"><div class="section-inner">${topline(x.left,x.right)}${factGrid(x.facts,`<a href="https://www.vosshoern.de/umgebung" target="_blank" rel="noopener noreferrer">${x.externalLabel}</a>`)}</div></section><div class="image-band">${photo('sea-sky.webp',lang === 'de' ? 'Weite an der Nordseeküste' : 'Open North Sea coast','loading="lazy"')}</div>${cta()}</main>${footer()}${mobileMenu()}`;
}

function info() {
  const x = copy.info;
  return `${pageHero(x.kicker,x.title,x.intro)}<section class="section"><div class="section-inner">${topline(x.left,x.right)}${factGrid(x.facts,`<a href="${route('/kontakt')}">${x.contactLink}</a>`)}</div></section>${cta()}</main>${footer()}${mobileMenu()}`;
}

function contact() {
  const x = copy.contact;
  return `${pageHero(x.kicker,x.title,x.intro)}<section class="section contact-main"><div class="section-inner">${topline(x.left,x.right)}<div class="intro-grid"><div><h2 class="display">${x.headline}</h2><div class="contact-links"><a href="mailto:info@vosshoern.de?subject=Anfrage%20Das%20Vossh%C3%B6rn">info@vosshoern.de ↗</a><a href="tel:+491729291239">0172 929 1239 ↗</a></div><p class="micro">${x.hint}</p></div><div><p class="lead">${x.text}</p><a class="pill dark" href="https://www.vosshoern.de/kontakt" target="_blank" rel="noopener noreferrer">${x.formLink}</a></div></div></div></section><section class="section location-section"><div class="section-inner">${topline(x.addressesLeft,x.addressesRight)}<div class="location-grid"><article><span class="eyebrow">01 / ${x.flats}</span><h2>Das Vosshörn</h2><p>Vosshörn 32<br>27476 Cuxhaven-Duhnen</p>${textLink(x.route,'https://www.openstreetmap.org/search?query=Vossh%C3%B6rn%2032%2C%2027476%20Cuxhaven')}</article><article><span class="eyebrow">02 / ${x.guest}</span><h2>Am Brockeswald</h2><p>Sahlenburger Chaussee 31A<br>27476 Cuxhaven-Stickenbüttel</p>${textLink(x.route,'https://www.openstreetmap.org/search?query=Sahlenburger%20Chaussee%2031A%2C%2027476%20Cuxhaven')}</article></div></div></section></main>${footer()}${mobileMenu()}`;
}

const apartment = path.startsWith('/wohnungen/') ? apartments.find(a=>path === `/wohnungen/${a.slug}`) : null;
const pages = {'/':home,'/wohnungen':listing,'/haus':house,'/gaestehaus':guesthouse,'/region':region,'/wissenswertes':info,'/kontakt':contact};
const markup = apartment ? detail(apartment) : pages[path] ? pages[path]() : `${header()}<main id="main"><section class="page-hero"><div class="page-hero-inner"><span class="eyebrow">404 / ${c.notFound}</span><h1>${c.notFoundTitle}</h1>${textLink(c.backHome,route('/'))}</div></section></main>${footer()}${mobileMenu()}`;
document.getElementById('app').innerHTML = markup;
document.documentElement.lang = lang;
document.querySelector('.skip-link').textContent = lang === 'de' ? 'Zum Inhalt springen' : 'Skip to content';
document.title = path === '/' ? (lang === 'de' ? 'Das Vosshörn — Ferien am Meer' : 'Das Vosshörn — North Sea holidays') : `${apartment ? apartment.name : (c.nav.find(([p])=>p === path)?.[1] || c.contact)} — Das Vosshörn`;
if (lang === 'en') document.querySelector('meta[name="description"]').content = 'Four holiday apartments in Cuxhaven-Duhnen, Germany. Time together and the North Sea nearby at Das Vosshörn.';

const menu = document.querySelector('.mobile-menu');
const menuButton = document.querySelector('.menu-button');
function setMenu(open) {
  menu.classList.toggle('open',open);
  menu.setAttribute('aria-hidden',String(!open));
  menuButton.setAttribute('aria-expanded',String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  (open ? menu.querySelector('.menu-close') : menuButton).focus();
}
menuButton.addEventListener('click',()=>setMenu(true));
menu.querySelector('.menu-close').addEventListener('click',()=>setMenu(false));
document.addEventListener('keydown',event=>{if(event.key === 'Escape' && menu.classList.contains('open')) setMenu(false)});

const headerElement = document.getElementById('site-header');
function updateHeader() { headerElement.classList.toggle('scrolled',window.scrollY > 12); }
window.addEventListener('scroll',updateHeader,{passive:true});
updateHeader();

if (apartment) {
  const element = document.querySelector('.gallery-section');
  const main = element.querySelector('.gallery-main-image');
  const thumbs = element.querySelector('.gallery-thumbs');
  const counter = element.querySelector('.gallery-counter');
  const controls = element.querySelectorAll('[data-gallery-direction]');
  const mobile = window.matchMedia('(max-width: 700px)');
  let selected = 0;
  let group = 0;

  function renderGallery() {
    main.src = galleryFile(apartment.slug,selected);
    main.alt = `${c.image} ${selected + 1} ${c.galleryOf} ${apartment.count}: ${apartment.name}`;
    thumbs.innerHTML = Array.from({length:Math.min(4,apartment.count - group)},(_,offset)=>{
      const index = group + offset;
      return `<button class="gallery-thumb ${index === selected ? 'active' : ''}" type="button" data-photo-index="${index}" aria-label="${c.showImage} ${index + 1}" aria-pressed="${index === selected}"><img src="${galleryFile(apartment.slug,index)}" alt="" loading="lazy"></button>`;
    }).join('');
    counter.textContent = `${String(selected + 1).padStart(2,'0')} / ${apartment.count}`;
    controls.forEach(button=>{
      const direction = Number(button.dataset.galleryDirection);
      button.disabled = mobile.matches ? (direction < 0 ? selected === 0 : selected === apartment.count - 1) : (direction < 0 ? group === 0 : group + 4 >= apartment.count);
    });
  }

  function move(direction) {
    if (mobile.matches) {
      selected = Math.max(0,Math.min(apartment.count - 1,selected + direction));
      group = Math.floor(selected / 4) * 4;
    } else {
      group = Math.max(0,Math.min(Math.floor((apartment.count - 1) / 4) * 4,group + direction * 4));
      selected = group;
    }
    renderGallery();
  }

  controls.forEach(button=>button.addEventListener('click',()=>move(Number(button.dataset.galleryDirection))));
  thumbs.addEventListener('click',event=>{
    const button = event.target.closest('[data-photo-index]');
    if (!button) return;
    selected = Number(button.dataset.photoIndex);
    renderGallery();
  });
  element.addEventListener('keydown',event=>{
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  let startX = 0, startY = 0;
  element.querySelector('.gallery-stage').addEventListener('touchstart',event=>{startX = event.changedTouches[0].screenX;startY = event.changedTouches[0].screenY;},{passive:true});
  element.querySelector('.gallery-stage').addEventListener('touchend',event=>{
    if (!mobile.matches) return;
    const dx = event.changedTouches[0].screenX - startX;
    const dy = event.changedTouches[0].screenY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
  },{passive:true});
  mobile.addEventListener('change',renderGallery);
}
