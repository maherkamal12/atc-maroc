/**
 * Generates the product catalogue imagery: one 1200×900 JPEG per product.
 *
 * These are flat technical illustrations built from the Lucide icon set
 * (already a project dependency, ISC licensed) rendered in the ATC palette on
 * a blueprint background — the same visual language as the design gallery and
 * the `bg-blueprint` surfaces. They keep the shop complete and consistent
 * without depending on stock photography.
 *
 *   node scripts/make-product-tiles.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = resolve(root, 'public/images/products');
const iconsDir = resolve(root, 'node_modules/lucide-react/dist/esm/icons');
mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 900;

/* Palette — mirrors tailwind.config.ts. */
const NAVY = '#0d2b4d';
const NAVY_DEEP = '#071a31';
const GOLD = '#f5a623';
const BLUE = '#2f74c0';
const SKY = '#4a90d9';
const GREEN = '#22c55e';
const SLATE = '#334155';

/**
 * file name → [lucide icon, accent colour]
 * The scene is chosen per product family so every tile is recognisable.
 */
const TILES = {
  'cat-electrique': ['zap', GOLD],
  'cat-plomberie': ['droplets', BLUE],
  'cat-clim': ['snowflake', SKY],
  'cat-solaire': ['sun', GOLD],
  'cat-electromenager': ['refrigerator', SLATE],

  'tableau-distribution': ['layout-dashboard', GOLD],
  'cable-cuivre': ['cable', GOLD],
  prise: ['plug', GOLD],
  'spot-led': ['lightbulb', GOLD],
  'kit-terre': ['shield-check', GREEN],
  camera: ['cctv', SLATE],

  'tube-ppr': ['cylinder', BLUE],
  mitigeur: ['shower-head', BLUE],
  pompe: ['gauge', BLUE],
  adoucisseur: ['filter', BLUE],
  'chauffe-eau': ['thermometer', GOLD],
  'salle-bain': ['bath', BLUE],

  'split-12000': ['air-vent', SKY],
  'split-18000': ['air-vent', SKY],
  vrv: ['fan', SKY],
  cassette: ['grid-2x2', SKY],
  vmc: ['wind', SKY],

  'panneau-550': ['panels-top-left', GOLD],
  'onduleur-5kw': ['activity', GOLD],
  batterie: ['battery-charging', GREEN],
  'kit-solaire': ['sun-medium', GOLD],
  'solaire-thermique': ['thermometer-sun', GOLD],
  structure: ['frame', GOLD],

  refrigerateur: ['refrigerator', SLATE],
  'lave-linge': ['washing-machine', SLATE],
  'lave-vaisselle': ['utensils', SLATE],
  four: ['microwave', SLATE],
  'plaque-induction': ['flame', SLATE],
  hotte: ['fan', SLATE],
  'hotte-menagere': ['wind', SLATE],
};

/** Fallback per accent family when an icon is missing from the installed set. */
const FALLBACK = {
  [GOLD]: 'zap',
  [BLUE]: 'droplets',
  [SKY]: 'snowflake',
  [GREEN]: 'leaf',
  [SLATE]: 'package',
};

/** Read a Lucide icon source and pull out its `IconNode` array. */
function iconNodes(name) {
  const file = resolve(iconsDir, `${name}.js`);
  if (!existsSync(file)) return null;
  const src = readFileSync(file, 'utf8');
  const match = src.match(/createLucideIcon\(\s*"[^"]+",\s*(\[[\s\S]*\])\s*\);/);
  if (!match) return null;
  try {
    // Trusted input: the array literal inside our own node_modules dependency.
    return new Function(`return (${match[1]});`)();
  } catch {
    return null;
  }
}

const toKebab = (key) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function renderNodes(nodes) {
  return nodes
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .map(([k, v]) => `${toKebab(k)}="${v}"`)
        .join(' ');
      return `<${tag} ${a}/>`;
    })
    .join('');
}

const gridLines = `
  <g stroke="${NAVY}" stroke-opacity=".055" stroke-width="1">
    ${Array.from({ length: 21 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="${W}" y2="${i * 60}"/>`).join('')}
  </g>`;

/** Corner ticks — technical-drawing framing. */
const ticks = `
  <g fill="none" stroke="${NAVY}" stroke-opacity=".22" stroke-width="2.5" stroke-linecap="square">
    <path d="M60 96 L60 60 L96 60"/>
    <path d="M1104 60 L1140 60 L1140 96"/>
    <path d="M1140 804 L1140 840 L1104 840"/>
    <path d="M96 840 L60 840 L60 804"/>
  </g>`;

function scene(nodes, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#fcfdff"/>
      <stop offset="100%" stop-color="#e8eef7"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#ffffff" stop-opacity=".95"/>
      <stop offset="70%" stop-color="#ffffff" stop-opacity=".45"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${NAVY_DEEP}" stop-opacity=".18"/>
      <stop offset="100%" stop-color="${NAVY_DEEP}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${gridLines}
  ${ticks}

  <circle cx="600" cy="420" r="330" fill="url(#glow)"/>
  <circle cx="600" cy="420" r="292" fill="none" stroke="${NAVY}" stroke-opacity=".10" stroke-width="2"/>
  <circle cx="600" cy="420" r="262" fill="none" stroke="${accent}" stroke-opacity=".28" stroke-width="2" stroke-dasharray="10 14"/>

  <ellipse cx="600" cy="706" rx="240" ry="34" fill="url(#shadow)"/>

  <g transform="translate(420 240) scale(15)" fill="none" stroke="${accent}" stroke-width="1"
     stroke-linecap="round" stroke-linejoin="round">
    ${nodes}
  </g>

  <g>
    <rect x="566" y="792" width="68" height="7" rx="3.5" fill="${NAVY}"/>
    <rect x="520" y="792" width="38" height="7" rx="3.5" fill="${GOLD}"/>
    <rect x="642" y="792" width="38" height="7" rx="3.5" fill="${NAVY}" fill-opacity=".28"/>
  </g>
</svg>`;
}

const missing = [];
let written = 0;

for (const [name, [icon, accent]] of Object.entries(TILES)) {
  let nodes = iconNodes(icon);
  if (!nodes) {
    const alt = FALLBACK[accent] ?? 'package';
    missing.push(`${name} → ${icon} (used ${alt})`);
    nodes = iconNodes(alt) ?? iconNodes('package');
  }
  const svg = scene(renderNodes(nodes), accent);
  await sharp(Buffer.from(svg))
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(resolve(outDir, `${name}.jpg`));
  written += 1;
}

console.log(`wrote ${written} product tiles to public/images/products`);
if (missing.length) console.log('fallbacks used:\n  ' + missing.join('\n  '));
