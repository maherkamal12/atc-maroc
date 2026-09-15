/**
 * Generates the four illustrated art tiles used by the design gallery.
 * These are hand-authored flat-vector scenes in the ATC palette — they keep the
 * gallery visually complete without depending on stock photography.
 *
 *   node scripts/make-art-tiles.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '../public/images/design');
mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 900;

const grid = (opacity = 0.06) => `
  <g opacity="${opacity}" stroke="#ffffff" stroke-width="1">
    ${Array.from({ length: 19 }, (_, i) => `<line x1="${i * 66}" y1="0" x2="${i * 66}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 66}" x2="${W}" y2="${i * 66}"/>`).join('')}
  </g>`;

function wrap(name, defs, body) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>${defs}</defs>
  ${body}
</svg>`;
  writeFileSync(resolve(outDir, name), svg, 'utf8');
  console.log('wrote', name);
}

/* ------------------------------------------------------------------ cuisine */
wrap(
  'cuisine.svg',
  `
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f5efe6"/><stop offset="100%" stop-color="#dfd3c3"/>
  </linearGradient>
  <linearGradient id="cab" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#6b5844"/><stop offset="100%" stop-color="#4e3f30"/>
  </linearGradient>
  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f5a623" stop-opacity=".55"/><stop offset="100%" stop-color="#f5a623" stop-opacity="0"/>
  </linearGradient>`,
  `
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${grid(0.05)}
  <!-- splashback zellige -->
  <g opacity=".5">
    ${Array.from({ length: 24 }, (_, i) => `<rect x="${i * 50}" y="360" width="46" height="46" fill="#c9b79f" rx="3"/>`).join('')}
    ${Array.from({ length: 24 }, (_, i) => `<rect x="${i * 50 + 25}" y="410" width="46" height="46" fill="#d8c9b4" rx="3"/>`).join('')}
    ${Array.from({ length: 24 }, (_, i) => `<rect x="${i * 50}" y="460" width="46" height="46" fill="#c2ad93" rx="3"/>`).join('')}
  </g>
  <!-- upper cabinets -->
  <rect x="40" y="150" width="470" height="200" rx="8" fill="url(#cab)"/>
  <rect x="60" y="170" width="430" height="8" rx="4" fill="#f5a623" opacity=".55"/>
  <rect x="700" y="150" width="460" height="200" rx="8" fill="url(#cab)"/>
  <rect x="720" y="170" width="420" height="8" rx="4" fill="#f5a623" opacity=".55"/>
  <!-- range hood -->
  <path d="M545 150 h110 l34 196 h-178 Z" fill="#3f342a"/>
  <rect x="520" y="346" width="160" height="10" rx="5" fill="#f5a623" opacity=".7"/>
  <rect x="556" y="356" width="88" height="14" rx="7" fill="#2d251d"/>
  <!-- under-cabinet light -->
  <rect x="40" y="350" width="470" height="40" fill="url(#glow)"/>
  <rect x="700" y="350" width="460" height="40" fill="url(#glow)"/>
  <!-- counter -->
  <rect x="0" y="540" width="${W}" height="46" fill="#e9e2d6"/>
  <rect x="0" y="580" width="${W}" height="10" fill="#cbc0ae"/>
  <!-- lower units -->
  <rect x="0" y="590" width="${W}" height="310" fill="url(#cab)"/>
  <g stroke="#3a2e23" stroke-width="3" opacity=".8">
    <line x1="200" y1="590" x2="200" y2="900"/>
    <line x1="400" y1="590" x2="400" y2="900"/>
    <line x1="760" y1="590" x2="760" y2="900"/>
    <line x1="980" y1="590" x2="980" y2="900"/>
  </g>
  <g fill="#f5a623" opacity=".85">
    <rect x="120" y="670" width="60" height="7" rx="3.5"/>
    <rect x="320" y="670" width="60" height="7" rx="3.5"/>
    <rect x="870" y="670" width="60" height="7" rx="3.5"/>
  </g>
  <!-- sink + tap -->
  <rect x="240" y="546" width="210" height="26" rx="8" fill="#b9b2a6"/>
  <path d="M345 546 v-96 h74 v14 h-60 v82" fill="none" stroke="#8e8779" stroke-width="9" stroke-linecap="round"/>
  <!-- pendant lights -->
  <g stroke="#8a7a66" stroke-width="4">
    <line x1="300" y1="0" x2="300" y2="86"/><line x1="600" y1="0" x2="600" y2="66"/><line x1="900" y1="0" x2="900" y2="86"/>
  </g>
  <g fill="#f5a623">
    <path d="M262 86 h76 l-14 44 h-48 Z"/><path d="M566 66 h68 l-12 40 h-44 Z"/><path d="M862 86 h76 l-14 44 h-48 Z"/>
  </g>
  <g fill="#ffffff" opacity=".22">
    <ellipse cx="300" cy="130" rx="52" ry="20"/><ellipse cx="600" cy="106" rx="46" ry="18"/><ellipse cx="900" cy="130" rx="52" ry="20"/>
  </g>
  <!-- island stools -->
  <g fill="#2f261d">
    <rect x="150" y="812" width="120" height="12" rx="6"/><rect x="196" y="824" width="12" height="76"/>
    <rect x="480" y="812" width="120" height="12" rx="6"/><rect x="526" y="824" width="12" height="76"/>
  </g>`,
);

/* -------------------------------------------------------------- salle de bain */
wrap(
  'salle-bain.svg',
  `
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#f7f3ee"/><stop offset="55%" stop-color="#e6dcd0"/><stop offset="100%" stop-color="#d3c6b6"/>
  </linearGradient>
  <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#e6b877"/><stop offset="100%" stop-color="#b8863f"/>
  </linearGradient>
  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#cfe3e6" stop-opacity=".75"/><stop offset="100%" stop-color="#cfe3e6" stop-opacity="0"/>
  </linearGradient>
  <pattern id="veins" width="140" height="140" patternUnits="userSpaceOnUse" patternTransform="rotate(24)">
    <path d="M0 70 Q35 30 70 70 T140 70" fill="none" stroke="#b9a893" stroke-width="1.6" opacity=".55"/>
    <path d="M0 118 Q40 92 80 118" fill="none" stroke="#c4b4a0" stroke-width="1.2" opacity=".4"/>
  </pattern>`,
  `
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#veins)"/>
  ${grid(0.045)}
  <!-- book-matched marble panels -->
  <g opacity=".5">
    <rect x="0" y="0" width="600" height="${H}" fill="#efe8de"/>
    <rect x="600" y="0" width="600" height="${H}" fill="#e7dfd3"/>
    <rect x="592" y="0" width="16" height="${H}" fill="#cfc2b0"/>
  </g>
  <!-- rain shower -->
  <rect x="150" y="96" width="300" height="26" rx="13" fill="url(#brass)"/>
  <rect x="286" y="40" width="18" height="60" fill="url(#brass)"/>
  <rect x="140" y="122" width="320" height="300" fill="url(#water)"/>
  <g stroke="#bfd8dc" stroke-width="3" opacity=".6" stroke-linecap="round">
    ${Array.from({ length: 16 }, (_, i) => `<line x1="${158 + i * 19}" y1="130" x2="${158 + i * 19}" y2="${300 + ((i * 37) % 110)}"/>`).join('')}
  </g>
  <!-- glass panel -->
  <rect x="500" y="130" width="14" height="700" rx="6" fill="#ffffff" opacity=".55"/>
  <rect x="500" y="130" width="14" height="700" rx="6" fill="none" stroke="#b9c9cc" stroke-width="3"/>
  <!-- vanity -->
  <rect x="700" y="560" width="440" height="200" rx="14" fill="#efe6da"/>
  <rect x="700" y="560" width="440" height="16" rx="8" fill="#d9cdbc"/>
  <rect x="760" y="640" width="320" height="8" rx="4" fill="#c6b7a3"/>
  <ellipse cx="920" cy="546" rx="118" ry="34" fill="#fbf8f4"/>
  <ellipse cx="920" cy="540" rx="102" ry="27" fill="#e2d7c8"/>
  <path d="M920 520 v-88 h-70 v16 h56 v72" fill="none" stroke="url(#brass)" stroke-width="12" stroke-linecap="round"/>
  <!-- mirror + backlight -->
  <circle cx="920" cy="300" r="150" fill="#ffffff" opacity=".5"/>
  <circle cx="920" cy="300" r="150" fill="none" stroke="url(#brass)" stroke-width="9"/>
  <circle cx="920" cy="300" r="168" fill="none" stroke="#f5a623" stroke-width="14" opacity=".22"/>
  <!-- floor -->
  <rect x="0" y="820" width="${W}" height="80" fill="#ded2c1"/>
  <rect x="0" y="820" width="${W}" height="6" fill="#cbbdab"/>`,
);

/* ------------------------------------------------------------------ exterieur */
wrap(
  'exterieur.svg',
  `
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#071a31"/><stop offset="58%" stop-color="#1a4c84"/>
    <stop offset="82%" stop-color="#8a6a4a"/><stop offset="100%" stop-color="#f5a623"/>
  </linearGradient>
  <linearGradient id="pool" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1c4a6e"/><stop offset="100%" stop-color="#0b2b45"/>
  </linearGradient>
  <linearGradient id="warm" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffd98a"/><stop offset="100%" stop-color="#f5a623"/>
  </linearGradient>`,
  `
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="880" cy="600" r="200" fill="#f5a623" opacity=".18"/>
  <!-- horizon -->
  <rect x="0" y="640" width="${W}" height="40" fill="#06203a"/>
  <!-- villa massing -->
  <rect x="120" y="300" width="420" height="340" rx="6" fill="#0e2b47"/>
  <rect x="120" y="300" width="420" height="14" fill="#1c4a6e"/>
  <rect x="540" y="400" width="360" height="240" rx="6" fill="#123455"/>
  <rect x="540" y="400" width="360" height="12" fill="#1c4a6e"/>
  <!-- wood cladding -->
  <g fill="#8a5a34">
    ${Array.from({ length: 11 }, (_, i) => `<rect x="${552 + i * 30}" y="420" width="18" height="200" rx="3"/>`).join('')}
  </g>
  <!-- glowing glazing -->
  <g fill="url(#warm)" opacity=".9">
    <rect x="160" y="360" width="150" height="240" rx="4"/>
    <rect x="340" y="360" width="160" height="150" rx="4"/>
    <rect x="600" y="450" width="120" height="160" rx="4"/>
    <rect x="750" y="450" width="120" height="160" rx="4"/>
  </g>
  <g fill="#071a31" opacity=".55">
    <rect x="232" y="360" width="6" height="240"/><rect x="418" y="360" width="6" height="150"/>
    <rect x="658" y="450" width="6" height="160"/><rect x="808" y="450" width="6" height="160"/>
  </g>
  <!-- up-lights -->
  <g opacity=".35" fill="#f5a623">
    <path d="M150 640 L130 700 L170 700 Z"/><path d="M420 640 L400 700 L440 700 Z"/><path d="M880 640 L860 700 L900 700 Z"/>
  </g>
  <!-- pool -->
  <rect x="0" y="680" width="${W}" height="220" fill="url(#pool)"/>
  <g stroke="#7fd4e8" stroke-width="3" opacity=".35" stroke-linecap="round">
    ${Array.from({ length: 9 }, (_, i) => `<line x1="${60 + i * 130}" y1="${716 + (i % 3) * 34}" x2="${190 + i * 130}" y2="${716 + (i % 3) * 34}"/>`).join('')}
  </g>
  <g fill="url(#warm)" opacity=".28">
    <rect x="160" y="680" width="150" height="120"/><rect x="340" y="680" width="160" height="80"/>
    <rect x="600" y="680" width="120" height="90"/><rect x="750" y="680" width="120" height="90"/>
  </g>
  <rect x="0" y="672" width="${W}" height="8" fill="#d9cdbc" opacity=".8"/>
  <!-- palms -->
  <g fill="#04263f">
    <path d="M1040 680 q-16 -110 10 -200 q10 96 18 200 Z"/>
    <path d="M1052 486 q-72 -30 -96 8 q54 -6 92 22 Z"/>
    <path d="M1054 486 q64 -44 106 -14 q-64 0 -98 36 Z"/>
    <path d="M1050 470 q-34 -66 6 -96 q10 54 24 84 Z"/>
    <path d="M1056 470 q46 -60 96 -40 q-56 12 -80 56 Z"/>
    <path d="M830 682 q-12 -80 6 -142 q8 68 14 142 Z"/>
    <path d="M840 546 q-52 -22 -70 6 q40 -4 66 16 Z"/>
    <path d="M842 546 q46 -32 76 -10 q-46 0 -70 26 Z"/>
  </g>
  <!-- terrace pavers -->
  <g stroke="#123455" stroke-width="2" opacity=".7">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="852" x2="${i * 100}" y2="900"/>`).join('')}
  </g>`,
);

/* ----------------------------------------------------------------------- cafe */
wrap(
  'cafe.svg',
  `
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#241d18"/><stop offset="100%" stop-color="#120e0b"/>
  </linearGradient>
  <linearGradient id="brick" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#5a3527"/><stop offset="100%" stop-color="#402318"/>
  </linearGradient>
  <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#8a5a34"/><stop offset="100%" stop-color="#5d3a20"/>
  </linearGradient>
  <radialGradient id="bulb"><stop offset="0%" stop-color="#ffd98a"/><stop offset="100%" stop-color="#f5a623" stop-opacity="0"/></radialGradient>`,
  `
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <!-- brick wall -->
  <g fill="url(#brick)" opacity=".92">
    ${Array.from({ length: 7 }, (_, r) =>
      Array.from({ length: 13 }, (_, c) => {
        const off = r % 2 === 0 ? 0 : -46;
        return `<rect x="${c * 92 + off}" y="${r * 58 + 120}" width="86" height="52" rx="4"/>`;
      }).join(''),
    ).join('')}
  </g>
  <rect x="0" y="120" width="${W}" height="${H - 120}" fill="#0f0b08" opacity=".35"/>
  <!-- steel shelving -->
  <g stroke="#1d1815" stroke-width="7" fill="none">
    <rect x="820" y="150" width="320" height="330"/>
    <line x1="820" y1="260" x2="1140" y2="260"/><line x1="820" y1="370" x2="1140" y2="370"/>
  </g>
  <g fill="#c9a06a" opacity=".85">
    <rect x="850" y="200" width="22" height="60" rx="6"/><rect x="884" y="212" width="22" height="48" rx="6"/>
    <rect x="918" y="196" width="22" height="64" rx="6"/><rect x="952" y="216" width="22" height="44" rx="6"/>
    <rect x="1000" y="204" width="22" height="56" rx="6"/><rect x="1034" y="214" width="22" height="46" rx="6"/>
    <rect x="860" y="300" width="70" height="60" rx="8" fill="#8e8779"/>
    <rect x="960" y="312" width="52" height="48" rx="8" fill="#6f695f"/>
  </g>
  <!-- pendants -->
  <g stroke="#2b231d" stroke-width="4">
    <line x1="220" y1="0" x2="220" y2="200"/><line x1="470" y1="0" x2="470" y2="150"/><line x1="720" y1="0" x2="720" y2="200"/>
  </g>
  <g>
    <circle cx="220" cy="248" r="120" fill="url(#bulb)"/><circle cx="470" cy="200" r="110" fill="url(#bulb)"/><circle cx="720" cy="248" r="120" fill="url(#bulb)"/>
  </g>
  <g fill="#ffd98a">
    <path d="M196 200 h48 l-10 52 h-28 Z"/><path d="M448 152 h44 l-9 48 h-26 Z"/><path d="M696 200 h48 l-10 52 h-28 Z"/>
  </g>
  <g fill="#2b231d">
    <rect x="200" y="188" width="40" height="14" rx="7"/><rect x="452" y="140" width="36" height="14" rx="7"/><rect x="700" y="188" width="40" height="14" rx="7"/>
  </g>
  <!-- counter -->
  <rect x="0" y="600" width="820" height="52" rx="8" fill="url(#wood)"/>
  <rect x="0" y="600" width="820" height="12" rx="6" fill="#a9743f"/>
  <rect x="0" y="652" width="820" height="248" fill="#3a2517"/>
  <g fill="#8a5a34" opacity=".6">
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 92 + 10}" y="666" width="72" height="6" rx="3"/>`).join('')}
  </g>
  <!-- espresso machine -->
  <rect x="300" y="500" width="200" height="100" rx="10" fill="#2b2b2b"/>
  <rect x="322" y="520" width="66" height="46" rx="6" fill="#6b6b6b"/>
  <rect x="412" y="520" width="66" height="46" rx="6" fill="#6b6b6b"/>
  <rect x="368" y="576" width="64" height="14" rx="6" fill="#c9a06a"/>
  <!-- banquette stools -->
  <g fill="#31241a">
    <rect x="880" y="700" width="150" height="18" rx="9"/><rect x="948" y="718" width="14" height="150"/>
    <rect x="1040" y="640" width="150" height="18" rx="9"/><rect x="1108" y="658" width="14" height="150"/>
  </g>
  ${grid(0.05)}`,
);

console.log('\nAll design art tiles generated.');
