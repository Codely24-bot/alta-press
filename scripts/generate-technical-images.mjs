import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dataModule = await import(pathToFileURL(path.join(root, 'src', 'data', 'technical', 'valacoTechnicalData.js')));
const outputRoot = path.join(root, 'public', 'technical-images');

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugColor(slug, offset = 0) {
  let hash = offset + 37;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

function titleLines(title) {
  const words = title.replace(/\s+/g, ' ').trim().split(' ');
  const lines = [''];
  for (const word of words) {
    const current = lines[lines.length - 1];
    if (`${current} ${word}`.trim().length > 26 && lines.length < 3) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${current} ${word}`.trim();
    }
  }
  return lines;
}

function categoryObject(page) {
  const title = `${page.category} ${page.title}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  if (title.includes('flange') || title.includes('furo') || title.includes('prisioneiro') || title.includes('parafuso')) {
    return `
      <g transform="translate(675 350)">
        <ellipse cx="0" cy="78" rx="210" ry="72" fill="rgba(0,0,0,.28)"/>
        <circle cx="0" cy="0" r="176" fill="url(#steel)" stroke="url(#rim)" stroke-width="18"/>
        <circle cx="0" cy="0" r="72" fill="#101318" stroke="#e21d2f" stroke-width="10"/>
        ${Array.from({ length: 12 }, (_, index) => {
          const angle = (Math.PI * 2 * index) / 12;
          const x = Math.cos(angle) * 125;
          const y = Math.sin(angle) * 125;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16" fill="#171b20" stroke="#eef2f5" stroke-width="5"/>`;
        }).join('')}
        <path d="M-136 60 C-80 118 82 118 140 56" fill="none" stroke="#f3f4f6" stroke-width="7" opacity=".35"/>
      </g>`;
  }

  if (title.includes('rosca') || title.includes('bsp') || title.includes('npt')) {
    return `
      <g transform="translate(670 355) rotate(-10)">
        <ellipse cx="-20" cy="112" rx="245" ry="56" fill="rgba(0,0,0,.28)"/>
        <rect x="-250" y="-58" width="500" height="116" rx="58" fill="url(#steel)" stroke="#cfd7df" stroke-width="6"/>
        ${Array.from({ length: 13 }, (_, index) => `<path d="M${-220 + index * 38} -62 L${-178 + index * 38} 62" stroke="#1d2228" stroke-width="9" opacity=".72"/>`).join('')}
        <ellipse cx="-250" cy="0" rx="40" ry="58" fill="#eef2f5" stroke="#87909a" stroke-width="6"/>
        <ellipse cx="250" cy="0" rx="40" ry="58" fill="#9aa3ad" stroke="#f9fafb" stroke-width="6"/>
        <path d="M-235 -15 C-110 -42 90 -42 235 -12" stroke="#fff" stroke-width="8" opacity=".42"/>
      </g>`;
  }

  if (title.includes('valvula') || title.includes('válvula')) {
    return `
      <g transform="translate(670 355)">
        <ellipse cx="0" cy="128" rx="245" ry="55" fill="rgba(0,0,0,.28)"/>
        <rect x="-255" y="-45" width="510" height="90" rx="45" fill="url(#steel)" stroke="#d5dde5" stroke-width="6"/>
        <circle cx="0" cy="0" r="105" fill="url(#yellow)" stroke="#f5d26e" stroke-width="10"/>
        <rect x="-36" y="-168" width="72" height="104" rx="18" fill="#20242b" stroke="#e7edf3" stroke-width="6"/>
        <path d="M-130 -175 H130" stroke="#20242b" stroke-width="28" stroke-linecap="round"/>
        <path d="M-96 -175 H96" stroke="#e21d2f" stroke-width="10" stroke-linecap="round"/>
        <path d="M-58 35 C-20 72 32 72 66 34" fill="none" stroke="#111827" stroke-width="13" stroke-linecap="round"/>
      </g>`;
  }

  if (title.includes('vapor') || title.includes('temperatura')) {
    return `
      <g transform="translate(680 350)">
        <ellipse cx="0" cy="140" rx="250" ry="50" fill="rgba(0,0,0,.25)"/>
        <path d="M-265 55 H185 C230 55 250 92 216 119 H-230 C-275 119 -295 82 -265 55Z" fill="url(#steel)" stroke="#e7edf3" stroke-width="7"/>
        <circle cx="222" cy="88" r="38" fill="#e21d2f" stroke="#ffd4d9" stroke-width="7"/>
        <path d="M-150 8 C-185 -54 -78 -72 -112 -138 M-15 10 C-60 -52 44 -80 8 -142 M118 6 C80 -52 178 -76 140 -138" fill="none" stroke="#dce8f2" stroke-width="18" stroke-linecap="round" opacity=".78"/>
        <path d="M-238 76 H150" stroke="#fff" stroke-width="8" opacity=".38"/>
      </g>`;
  }

  if (title.includes('corros') || title.includes('quimica') || title.includes('material') || title.includes('astm') || title.includes('diafragma')) {
    return `
      <g transform="translate(675 350)">
        <ellipse cx="0" cy="138" rx="250" ry="58" fill="rgba(0,0,0,.25)"/>
        <rect x="-245" y="-72" width="490" height="144" rx="34" fill="url(#steel)" stroke="#e5ebf0" stroke-width="7"/>
        <path d="M-196 -20 H196 M-196 22 H196 M-120 -66 V70 M0 -66 V70 M120 -66 V70" stroke="#20252c" stroke-width="5" opacity=".72"/>
        <g fill="url(#yellow)" stroke="#fff2bc" stroke-width="4">
          <circle cx="-178" cy="-44" r="18"/><circle cx="-58" cy="-44" r="18"/><circle cx="62" cy="-44" r="18"/><circle cx="178" cy="-44" r="18"/>
          <circle cx="-118" cy="48" r="18"/><circle cx="6" cy="48" r="18"/><circle cx="128" cy="48" r="18"/>
        </g>
        <path d="M-230 -88 C-142 -122 70 -122 230 -72" stroke="#fff" stroke-width="8" opacity=".34"/>
      </g>`;
  }

  if (title.includes('vazao') || title.includes('vazão') || title.includes('agua') || title.includes('ar comprimido')) {
    return `
      <g transform="translate(680 355)">
        <ellipse cx="0" cy="120" rx="260" ry="55" fill="rgba(0,0,0,.26)"/>
        <path d="M-280 -50 H215 C270 -50 290 50 220 70 H-260 C-310 54 -325 -34 -280 -50Z" fill="url(#steel)" stroke="#ecf2f8" stroke-width="7"/>
        <path d="M-230 8 C-130 -48 -38 62 70 4 S210 -18 255 24" fill="none" stroke="#38bdf8" stroke-width="22" stroke-linecap="round" opacity=".78"/>
        <path d="M168 -6 L256 24 L180 74" fill="none" stroke="#e21d2f" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      </g>`;
  }

  if (title.includes('schedule') || title.includes('sch') || title.includes('espessura') || title.includes('tubo')) {
    return `
      <g transform="translate(675 350)">
        <ellipse cx="0" cy="135" rx="255" ry="58" fill="rgba(0,0,0,.25)"/>
        <ellipse cx="0" cy="0" rx="245" ry="108" fill="url(#steel)" stroke="#eef2f6" stroke-width="8"/>
        <ellipse cx="0" cy="0" rx="138" ry="58" fill="#11161d" stroke="#e21d2f" stroke-width="15"/>
        <path d="M-216 -40 C-118 -93 114 -94 218 -38" stroke="#fff" stroke-width="10" opacity=".35"/>
        <path d="M-168 75 H168" stroke="#1e242b" stroke-width="9" opacity=".55"/>
      </g>`;
  }

  return `
    <g transform="translate(675 355)">
      <ellipse cx="0" cy="130" rx="245" ry="56" fill="rgba(0,0,0,.25)"/>
      <rect x="-210" y="-112" width="420" height="224" rx="32" fill="url(#steel)" stroke="#eef2f6" stroke-width="7"/>
      <path d="M-156 -58 H156 M-156 0 H156 M-156 58 H156" stroke="#1c2229" stroke-width="11" opacity=".66"/>
      <circle cx="-178" cy="-88" r="23" fill="url(#yellow)" stroke="#fff2bc" stroke-width="5"/>
      <circle cx="178" cy="88" r="23" fill="url(#yellow)" stroke="#fff2bc" stroke-width="5"/>
      <path d="M-184 -126 C-72 -166 102 -156 184 -114" stroke="#fff" stroke-width="9" opacity=".32"/>
    </g>`;
}

function buildSvg(page) {
  const hue = slugColor(`${page.categorySlug}-${page.slug}`);
  const accent = slugColor(page.slug, 90);
  const lines = titleLines(page.title);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(page.title)}</title>
  <desc id="desc">${escapeXml(page.imageAlt || `Ilustração técnica 3D sobre ${page.title}`)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#08090b"/>
      <stop offset=".48" stop-color="hsl(${hue} 16% 18%)"/>
      <stop offset="1" stop-color="#17130b"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f5f7f9"/>
      <stop offset=".18" stop-color="#9aa3ad"/>
      <stop offset=".52" stop-color="#343b44"/>
      <stop offset=".78" stop-color="#c9d1d9"/>
      <stop offset="1" stop-color="#606974"/>
    </linearGradient>
    <linearGradient id="yellow" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff2b6"/>
      <stop offset=".48" stop-color="#e21d2f"/>
      <stop offset="1" stop-color="#8c6219"/>
    </linearGradient>
    <linearGradient id="rim" x1="0" x2="1">
      <stop offset="0" stop-color="#fafafa"/>
      <stop offset=".55" stop-color="#505962"/>
      <stop offset="1" stop-color="#f6f8fb"/>
    </linearGradient>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="28" stdDeviation="22" flood-color="#000" flood-opacity=".42"/>
    </filter>
    <pattern id="grid" width="70" height="70" patternUnits="userSpaceOnUse">
      <path d="M70 0H0V70" fill="none" stroke="#ffffff" stroke-opacity=".07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1400" height="900" fill="url(#bg)"/>
  <rect width="1400" height="900" fill="url(#grid)"/>
  <path d="M78 690 C310 580 470 752 704 642 C940 532 1090 602 1324 498" fill="none" stroke="hsl(${accent} 52% 58%)" stroke-width="2" opacity=".34"/>
  <g filter="url(#softShadow)">
    ${categoryObject(page)}
  </g>
  <g transform="translate(96 112)">
    <rect x="0" y="0" width="438" height="8" rx="4" fill="#e21d2f"/>
    <text x="0" y="72" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">${escapeXml(page.category.toUpperCase())}</text>
    ${lines.map((line, index) => `<text x="0" y="${150 + index * 76}" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="${lines.length > 2 ? 55 : 64}" font-weight="800">${escapeXml(line)}</text>`).join('\n    ')}
    <text x="0" y="420" fill="#e21d2f" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">ALTA PRESS | CENTRAL TECNICA</text>
    <text x="0" y="462" fill="#d6dde6" font-family="Arial, Helvetica, sans-serif" font-size="24">Dados tecnicos preservados para consulta</text>
  </g>
  <g transform="translate(1040 720)" opacity=".9">
    <rect x="0" y="0" width="220" height="88" rx="14" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)"/>
    <text x="24" y="36" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">3D TECHNICAL</text>
    <text x="24" y="64" fill="#e21d2f" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">ORIGINAL ASSET</text>
  </g>
</svg>`;
}

const manifest = [];

for (const page of dataModule.valacoTechnicalPages) {
  const categoryDir = path.join(outputRoot, page.categorySlug);
  await mkdir(categoryDir, { recursive: true });
  const filename = `${page.slug}.svg`;
  const relativePath = `/technical-images/${page.categorySlug}/${filename}`;
  await writeFile(path.join(categoryDir, filename), buildSvg(page), 'utf8');
  manifest.push({
    slug: page.slug,
    categorySlug: page.categorySlug,
    title: page.title,
    imagePath: relativePath,
  });
}

await writeFile(path.join(outputRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated ${manifest.length} technical images in ${path.relative(root, outputRoot)}`);
