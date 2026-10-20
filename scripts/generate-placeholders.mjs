/* Generate clean studio SVG placeholders for ATC categories + generic product */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "placeholders");
mkdirSync(outDir, { recursive: true });

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function svg({ titleAr, titleFr, badgeFr, artwork, accent = "#0ea5e9", pillBg = "#f0f9ff" }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${escapeXml(titleFr)}">
  <defs>
    <radialGradient id="studioBg" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>
    <linearGradient id="metalFrame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="45%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" rx="24" fill="url(#studioBg)"/>
  <rect x="12" y="12" width="776" height="576" rx="20" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

  <rect x="36" y="28" width="160" height="36" rx="18" fill="#0f172a"/>
  <text x="116" y="51" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff" letter-spacing="1">ATC MAROC</text>

  <rect x="564" y="28" width="200" height="36" rx="18" fill="${pillBg}" stroke="${accent}" stroke-width="1.5"/>
  <text x="664" y="51" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#0f172a" letter-spacing="0.8">${escapeXml(badgeFr)}</text>

  <ellipse cx="400" cy="414" rx="185" ry="15" fill="#0f172a" fill-opacity="0.12"/>
  ${artwork}

  <rect x="36" y="444" width="728" height="124" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <rect x="36" y="444" width="8" height="124" rx="4" fill="${accent}"/>
  <text x="64" y="486" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="800" fill="#0f172a">${escapeXml(titleFr)}</text>
  <text x="64" y="520" font-family="Cairo, Inter, system-ui, sans-serif" font-size="17" font-weight="700" fill="#475569">${escapeXml(titleAr)}</text>
  <text x="740" y="544" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#94a3b8" letter-spacing="1">ATLAS TECH CONCEPT · TANGER</text>
</svg>`;
}

const solarPanelArt = `
  <circle cx="575" cy="108" r="42" fill="#fbbf24" fill-opacity="0.22"/>
  <circle cx="575" cy="108" r="24" fill="#f59e0b" fill-opacity="0.9"/>
  <rect x="236" y="92" width="328" height="296" rx="10" fill="url(#metalFrame)" stroke="#64748b" stroke-width="2"/>
  <rect x="248" y="104" width="304" height="272" rx="6" fill="#1e3a8a"/>
  ${Array.from({ length: 5 }).map((_, i) => `<line x1="${248 + (i + 1) * 50.6}" y1="104" x2="${248 + (i + 1) * 50.6}" y2="376" stroke="#93c5fd" stroke-width="1.5"/>`).join("")}
  ${Array.from({ length: 5 }).map((_, i) => `<line x1="248" y1="${104 + (i + 1) * 45.3}" x2="552" y2="${104 + (i + 1) * 45.3}" stroke="#93c5fd" stroke-width="1.5"/>`).join("")}
  <polygon points="248,104 420,104 295,376 248,376" fill="white" fill-opacity="0.12"/>
`;

const inverterArt = `
  <rect x="226" y="102" width="348" height="290" rx="18" fill="#0369a1" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="262" y="156" width="276" height="116" rx="10" fill="#022c22" stroke="#10b981" stroke-width="2"/>
  <text x="288" y="202" font-family="monospace" font-size="24" font-weight="800" fill="#34d399">230V AC · 50Hz</text>
  <text x="288" y="232" font-family="monospace" font-size="14" font-weight="700" fill="#a7f3d0">SOLAR INVERTER</text>
  <circle cx="290" cy="312" r="7" fill="#22c55e"/>
  <circle cx="330" cy="312" r="7" fill="#f59e0b"/>
`;

const batteryArt = `
  <rect x="276" y="96" width="34" height="24" rx="5" fill="#dc2626"/>
  <rect x="490" y="96" width="34" height="24" rx="5" fill="#1e293b"/>
  <rect x="228" y="118" width="344" height="276" rx="14" fill="#0f172a" stroke="#334155" stroke-width="2.5"/>
  <text x="270" y="236" font-family="Inter, sans-serif" font-size="38" font-weight="900" fill="#fbbf24">LiFePO4 / GEL</text>
  <text x="270" y="272" font-family="Inter, sans-serif" font-size="16" font-weight="700" fill="#34d399">12V · 24V · 48V SOLAR STORAGE</text>
`;

const controllerArt = `
  <rect x="250" y="100" width="300" height="292" rx="16" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
  <rect x="280" y="154" width="240" height="102" rx="10" fill="#082f49" stroke="#38bdf8" stroke-width="2"/>
  <text x="400" y="206" text-anchor="middle" font-family="monospace" font-size="24" font-weight="800" fill="#38bdf8">MPPT / PWM</text>
  <text x="400" y="234" text-anchor="middle" font-family="monospace" font-size="13" fill="#bae6fd">12V / 24V / 48V</text>
  <rect x="250" y="320" width="300" height="72" rx="10" fill="#0f172a"/>
`;

const pumpArt = `
  <rect x="366" y="76" width="68" height="34" rx="8" fill="#d97706"/>
  <rect x="358" y="108" width="84" height="292" rx="14" fill="url(#metalFrame)" stroke="#64748b" stroke-width="2"/>
  <rect x="358" y="220" width="84" height="46" fill="#475569"/>
  <path d="M 358 118 C 320 118, 318 220, 318 390" fill="none" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
`;

const equipArt = `
  <polygon points="210,320 590,260 590,330 210,390" fill="url(#metalFrame)" stroke="#64748b" stroke-width="2.5"/>
  <rect x="345" y="160" width="110" height="115" rx="10" fill="url(#metalFrame)" stroke="#475569" stroke-width="2.5"/>
  <rect x="335" y="270" width="130" height="18" rx="4" fill="#0f172a"/>
`;

const heatingArt = `
  <rect x="180" y="136" width="440" height="232" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
  ${Array.from({ length: 15 }).map((_, i) => `<rect x="${204 + i * 26.5}" y="166" width="14" height="180" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>`).join("")}
`;

const items = [
  { file: "product-generic.svg", titleAr: "معدات وتجهيزات ATC", titleFr: "Équipement technique ATC", badgeFr: "CATALOGUE ATC", artwork: solarPanelArt, accent: "#f59e0b", pillBg: "#fffbeb" },
  { file: "panneaux-solaires.svg", titleAr: "الألواح الشمسية", titleFr: "Panneaux solaires", badgeFr: "PANNEAU SOLAIRE", artwork: solarPanelArt, accent: "#f59e0b", pillBg: "#fffbeb" },
  { file: "onduleurs.svg", titleAr: "المحولات (العواكس)", titleFr: "Onduleurs solaires", badgeFr: "ONDULEUR SOLAIRE", artwork: inverterArt, accent: "#0ea5e9", pillBg: "#f0f9ff" },
  { file: "batteries.svg", titleAr: "البطاريات", titleFr: "Batteries solaires", badgeFr: "BATTERIE SOLAIRE", artwork: batteryArt, accent: "#10b981", pillBg: "#ecfdf5" },
  { file: "regulateurs-charge.svg", titleAr: "وحدات التحكم في الشحن", titleFr: "Régulateurs de charge", badgeFr: "RÉGULATEUR MPPT", artwork: controllerArt, accent: "#6366f1", pillBg: "#eef2ff" },
  { file: "pompes-solaires.svg", titleAr: "المضخات الغاطسة الشمسية", titleFr: "Pompes solaires", badgeFr: "POMPE SOLAIRE DC", artwork: pumpArt, accent: "#06b6d4", pillBg: "#ecfeff" },
  { file: "equipements-solaires.svg", titleAr: "معدات وهياكل التثبيت", titleFr: "Équipements solaires", badgeFr: "ÉQUIPEMENT SOLAIRE", artwork: equipArt, accent: "#475569", pillBg: "#f8fafc" },
  { file: "chauffage.svg", titleAr: "التدفئة: مراجل ومشعات", titleFr: "Chauffage central", badgeFr: "CHAUFFAGE CENTRAL", artwork: heatingArt, accent: "#ef4444", pillBg: "#fef2f2" },
];

for (const item of items) {
  const out = path.join(outDir, item.file);
  writeFileSync(out, svg(item), "utf8");
  console.log("wrote", out);
}
