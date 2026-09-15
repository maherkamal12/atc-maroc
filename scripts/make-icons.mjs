/**
 * Generates the app icons (favicon + Apple touch icon) from the brand mark:
 * a navy tile with the gold energy bolt, matching the site's visual identity.
 *
 * Next.js App Router picks up `src/app/icon.png` and `src/app/apple-icon.png`
 * automatically and emits the matching <link> tags.
 *
 *   node scripts/make-icons.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

/* Reuse the Lucide bolt already used across the site. */
const iconSrc = readFileSync(
  resolve(root, 'node_modules/lucide-react/dist/esm/icons/zap.js'),
  'utf8',
);
const nodes = new Function(
  `return (${iconSrc.match(/createLucideIcon\(\s*"[^"]+",\s*(\[[\s\S]*\])\s*\);/)[1]});`,
)();

const bolt = nodes
  .map(([tag, attrs]) =>
    `<${tag} ${Object.entries(attrs)
      .map(([k, v]) => `${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}="${v}"`)
      .join(' ')}/>`,
  )
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="#0d2b4d"/>
      <stop offset="100%" stop-color="#071a31"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fcd34d"/>
      <stop offset="100%" stop-color="#f5a623"/>
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect x="18" y="18" width="476" height="476" rx="98" fill="none"
        stroke="#f5a623" stroke-opacity=".28" stroke-width="6"/>

  <g transform="translate(112 104) scale(12)" fill="none" stroke="url(#gold)"
     stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round">
    ${bolt}
  </g>
</svg>`;

for (const [file, size] of [
  ['src/app/icon.png', 192],
  ['src/app/apple-icon.png', 180],
]) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(resolve(root, file));
  console.log('wrote', file, `${size}×${size}`);
}
