import {
  generatedCategories,
  generatedProducts,
  type GeneratedCategory,
  type GeneratedProduct,
} from "@/db/products.generated";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

type MatchedItem = {
  filename: string;
  categorySlug: string;
  brand: string;
  titleFr: string;
  titleAr: string;
  specs: string[];
};

const productByFilename = new Map<string, GeneratedProduct>();
for (const p of generatedProducts) {
  const fname = p.image.split("/").pop()?.toLowerCase();
  if (fname && !productByFilename.has(fname)) {
    productByFilename.set(fname, p);
  }
}

const categoryByFilename = new Map<string, GeneratedCategory>();
for (const c of generatedCategories) {
  const fname = c.image.split("/").pop()?.toLowerCase();
  if (fname && !categoryByFilename.has(fname)) {
    categoryByFilename.set(fname, c);
  }
}

function inferCategoryFromFilename(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes("paneli") || lower.includes("panel") || lower.includes("monokristal") || lower.includes("polikristal")) {
    return "panneaux-solaires";
  }
  if (lower.includes("inverter") || lower.includes("onduleur")) {
    return "onduleurs";
  }
  if (lower.includes("aku") || lower.includes("lifepo4") || lower.includes("lityum") || lower.includes("pylontech")) {
    return "batteries";
  }
  if (lower.includes("sarj") || lower.includes("mppt") || lower.includes("victron") || lower.includes("bluesolar") || lower.includes("smartsolar")) {
    return "regulateurs-charge";
  }
  if (lower.includes("pompa") || lower.includes("dalgic") || lower.includes("hidrofor")) {
    return "pompes-solaires";
  }
  if (lower.includes("kablo") || lower.includes("konnektor") || lower.includes("mc4") || lower.includes("profil") || lower.includes("tutucu") || lower.includes("tutfix")) {
    return "equipements-solaires";
  }
  if (lower.includes("kombi") || lower.includes("petek") || lower.includes("yogusmali") || lower.includes("radiateur")) {
    return "chauffage";
  }
  return "panneaux-solaires";
}

function extractBadgesFromFilename(filename: string, item?: GeneratedProduct): string[] {
  const badges: string[] = [];
  const source = `${filename} ${item?.nameFr ?? ""} ${item?.specsFr ?? ""}`;

  // Wattage / kW / kVA
  const kva = source.match(/\b(\d+(?:[.,]\d+)?)\s*kVA\b/i);
  if (kva) badges.push(`${kva[1]} kVA`);

  const kw = source.match(/\b(\d+(?:[.,]\d+)?)\s*kW\b/i);
  if (kw) badges.push(`${kw[1]} kW`);

  const kwh = source.match(/\b(\d+(?:[.,]\d+)?)\s*kWh\b/i);
  if (kwh) badges.push(`${kwh[1]} kWh`);

  const watt = source.match(/\b(\d{2,4})\s*(?:Watt|W)\b/i);
  if (watt && !badges.some((b) => b.includes("kW"))) badges.push(`${watt[1]} W`);

  // Voltage
  const voltDual = source.match(/\b(12[-/]24|24[-/]48)\s*(?:Volt|V)\b/i);
  if (voltDual) {
    badges.push(`${voltDual[1].replace("-", "/")} V`);
  } else {
    const volt = source.match(/\b(12|24|36|48|72|220|230|380)\s*(?:Volt|V)\b/i);
    if (volt) badges.push(`${volt[1]} V`);
  }

  // Capacity Ah
  const ah = source.match(/\b(\d{1,3})\s*Ah\b/i);
  if (ah) badges.push(`${ah[1]} Ah`);

  // MPPT / PWM
  if (/mppt/i.test(source)) badges.push("MPPT");
  else if (/pwm|ppw/i.test(source)) badges.push("PWM");

  // Battery chemistry
  if (/lifepo4/i.test(source)) badges.push("LiFePO4");
  else if (/\bjel\b|\bgel\b/i.test(source)) badges.push("GEL Deep-Cycle");
  else if (/agm/i.test(source)) badges.push("AGM");

  // Panel tech
  if (/half[- ]?cut/i.test(source)) badges.push("Half-Cut");
  else if (/monokristal|monocristallin/i.test(source)) badges.push("Monocristallin");
  else if (/polikristal|polycristallin/i.test(source)) badges.push("Polycristallin");

  // Sine wave
  if (/tam[- ]sinus|sinus pur/i.test(source) && !/lifepo4|yogusmali/i.test(source)) badges.push("Pur Sinus");
  else if (/modifiye[- ]sinus|sinus modifi/i.test(source)) badges.push("Sinus Modifié");

  // Pump head / flow
  const head = source.match(/\b(\d+)\s*(?:mss|mCE)\b/i);
  if (head) badges.push(`${head[1]} mCE`);
  const flow = source.match(/\b(\d+(?:[.,]\d+)?)\s*m3/i);
  if (flow) badges.push(`${flow[1]} m³/h`);

  // Cable / Radiator mm
  const mm2 = source.match(/\b(\d+)\s*mm2\b/i);
  if (mm2) badges.push(`${mm2[1]} mm²`);
  const radMm = source.match(/\b([3456789]00|550)\s*mm\b/i);
  if (radMm) badges.push(`L ${radMm[1]} mm`);

  if (/mc4/i.test(source)) badges.push("MC4 IP67");
  if (/yogusmali|condensation/i.test(source)) badges.push("Condensation");

  return [...new Set(badges)].slice(0, 3);
}

export function matchCatalogItem(rawPath: string): MatchedItem {
  const filename = (rawPath.split("/").pop() ?? rawPath).replace(/\?.*$/, "");
  const key = filename.toLowerCase();

  const prod = productByFilename.get(key);
  if (prod) {
    const specs = prod.specsFr
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s && !s.toLowerCase().includes("produit d'origine"));
    const badges = extractBadgesFromFilename(filename, prod);
    return {
      filename,
      categorySlug: prod.categorySlug,
      brand: prod.brand || "ATC",
      titleFr: prod.nameFr,
      titleAr: prod.nameAr,
      specs: badges.length ? badges : specs.slice(0, 3),
    };
  }

  const cat = categoryByFilename.get(key) ?? generatedCategories.find((c) => key.includes(c.slug));
  if (cat) {
    return {
      filename,
      categorySlug: cat.slug,
      brand: "ATC MAROC",
      titleFr: cat.nameFr,
      titleAr: cat.nameAr,
      specs: extractBadgesFromFilename(filename),
    };
  }

  const categorySlug = inferCategoryFromFilename(filename);
  const fallbackCat = generatedCategories.find((c) => c.slug === categorySlug);
  const humanName = filename
    .replace(/\.(jpe?g|png|webp|svg)$/i, "")
    .replace(/^TG-[A-Za-z-]+-\d+-/i, "")
    .replace(/-/g, " ")
    .trim();

  return {
    filename,
    categorySlug,
    brand: "ATC",
    titleFr: humanName || fallbackCat?.nameFr || "Équipement technique ATC",
    titleAr: fallbackCat?.nameAr || "معدات تقنية ATC",
    specs: extractBadgesFromFilename(filename),
  };
}

/* --------------------- Hardware Vector Illustrations ---------------------- */

function renderSolarPanelArtwork(filename: string, badges: string[]): string {
  const lower = filename.toLowerCase();
  const isMono = lower.includes("mono") || lower.includes("half-cut");
  const isHalfCut = lower.includes("half-cut");
  const cellFill = isMono ? "#0f2447" : "#1d4ed8";
  const cellHighlight = isMono ? "#1e3a8a" : "#2563eb";
  const mainWatt = badges.find((b) => b.endsWith("W")) ?? "SOLAR PV";

  const cells: string[] = [];
  const cols = 6;
  const rows = isHalfCut ? 8 : 6;
  const startX = 248;
  const startY = 104;
  const gridW = 304;
  const gridH = 272;
  const gap = 4;
  const cellW = (gridW - gap * (cols - 1)) / cols;
  const cellH = (gridH - gap * (rows - 1)) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (cellW + gap);
      const y = startY + r * (cellH + gap);
      const shade = (r + c) % 2 === 0 ? cellFill : cellHighlight;
      cells.push(
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cellW.toFixed(1)}" height="${cellH.toFixed(1)}" rx="${isMono ? 4 : 1.5}" fill="${shade}"/>`,
        `<line x1="${(x + cellW * 0.33).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + cellW * 0.33).toFixed(1)}" y2="${(y + cellH).toFixed(1)}" stroke="#93c5fd" stroke-opacity="0.38" stroke-width="0.9"/>`,
        `<line x1="${(x + cellW * 0.67).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + cellW * 0.67).toFixed(1)}" y2="${(y + cellH).toFixed(1)}" stroke="#93c5fd" stroke-opacity="0.38" stroke-width="0.9"/>`,
      );
    }
  }

  return `
    <!-- Ambient sun glow -->
    <circle cx="575" cy="108" r="46" fill="#fbbf24" fill-opacity="0.22"/>
    <circle cx="575" cy="108" r="26" fill="#f59e0b" fill-opacity="0.9"/>
    <!-- Floor shadow -->
    <ellipse cx="400" cy="414" rx="195" ry="18" fill="#0f172a" fill-opacity="0.12"/>
    <!-- Anodized aluminum outer frame -->
    <rect x="228" y="84" width="344" height="312" rx="10" fill="url(#metalFrame)" stroke="#64748b" stroke-width="2"/>
    <rect x="238" y="94" width="324" height="292" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
    <!-- Solar cell matrix -->
    ${cells.join("\n    ")}
    ${isHalfCut ? `<line x1="242" y1="240" x2="558" y2="240" stroke="#cbd5e1" stroke-width="3.5"/>` : ""}
    <!-- Glass reflection sweep -->
    <polygon points="242,96 420,96 290,382 242,382" fill="white" fill-opacity="0.11"/>
    <!-- Corner reinforcements -->
    <path d="M228 104 L228 88 Q228 84 232 84 L248 84" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M572 104 L572 88 Q572 84 568 84 L552 84" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M228 376 L228 392 Q228 396 232 396 L248 396" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M572 376 L572 392 Q572 396 568 396 L552 396" fill="none" stroke="#334155" stroke-width="3"/>
    <!-- Power overlay badge on frame -->
    <rect x="330" y="362" width="140" height="30" rx="15" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="400" y="382" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="800" fill="#fbbf24">${esc(mainWatt)}</text>
  `;
}

function renderInverterArtwork(filename: string, brand: string, badges: string[]): string {
  const lower = filename.toLowerCase();
  const isHybrid = lower.includes("hibrit") || lower.includes("akilli") || lower.includes("mppt") || lower.includes("kva");
  const isPure = lower.includes("tam-sinus");
  const bodyColor = isHybrid ? "#1e293b" : brand.toLowerCase().includes("tommatech") ? "#0369a1" : "#0f172a";
  const accentColor = isHybrid ? "#f59e0b" : isPure ? "#10b981" : "#38bdf8";
  const powerText = badges.find((b) => b.includes("W") || b.includes("kVA") || b.includes("kW")) ?? "INVERTER";
  const voltText = badges.find((b) => b.endsWith("V")) ?? "230V AC";

  return `
    <!-- Floor shadow -->
    <ellipse cx="400" cy="416" rx="185" ry="16" fill="#0f172a" fill-opacity="0.14"/>
    <!-- Side heatsink fins -->
    ${Array.from({ length: 9 })
      .map((_, i) => `<rect x="206" y="${120 + i * 28}" width="16" height="18" rx="3" fill="#475569"/>`)
      .join("")}
    ${Array.from({ length: 9 })
      .map((_, i) => `<rect x="578" y="${120 + i * 28}" width="16" height="18" rx="3" fill="#475569"/>`)
      .join("")}
    <!-- Main inverter chassis -->
    <rect x="218" y="96" width="364" height="300" rx="18" fill="${bodyColor}" stroke="#334155" stroke-width="2.5"/>
    <!-- Brushed metallic front plate -->
    <rect x="234" y="112" width="332" height="246" rx="12" fill="#0f172a" fill-opacity="0.55" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
    <!-- Brand & Model header -->
    <text x="256" y="142" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="900" fill="white" letter-spacing="1.5">${esc(brand.toUpperCase())}</text>
    <rect x="454" y="124" width="94" height="24" rx="12" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1.2"/>
    <text x="501" y="140" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="${accentColor}">${esc(voltText)}</text>

    <!-- Backlit LCD screen -->
    <rect x="260" y="162" width="280" height="118" rx="10" fill="#022c22" stroke="#10b981" stroke-width="2"/>
    <rect x="268" y="170" width="264" height="102" rx="6" fill="#064e3b"/>
    <!-- Telemetry readout -->
    <text x="284" y="202" font-family="monospace" font-size="22" font-weight="800" fill="#34d399">${esc(powerText)}</text>
    <text x="284" y="226" font-family="monospace" font-size="13" font-weight="700" fill="#a7f3d0">OUT: 230V AC · 50Hz</text>
    <text x="284" y="248" font-family="monospace" font-size="12" fill="#6ee7b7">MODE: ${isHybrid ? "HYBRID MPPT" : isPure ? "PURE SINE WAVE" : "MODIFIED SINE"}</text>
    <!-- Sine wave graphic inside LCD -->
    <path d="M 442 222 Q 458 188, 474 222 T 506 222" fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round"/>

    <!-- Status LEDs & buttons -->
    <circle cx="280" cy="306" r="6" fill="#22c55e"/>
    <text x="292" y="310" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#cbd5e1">RUN</text>
    <circle cx="340" cy="306" r="6" fill="#f59e0b"/>
    <text x="352" y="310" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#cbd5e1">CHRG</text>
    <circle cx="406" cy="306" r="6" fill="#475569"/>
    <text x="418" y="310" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#cbd5e1">FAULT</text>
    <!-- AC Socket / Terminal representation -->
    <rect x="476" y="292" width="60" height="28" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
    <circle cx="496" cy="306" r="4" fill="#94a3b8"/>
    <circle cx="516" cy="306" r="4" fill="#94a3b8"/>

    <!-- Bottom DC/AC connection gland ports -->
    <rect x="262" y="396" width="38" height="14" rx="4" fill="#dc2626"/>
    <rect x="312" y="396" width="38" height="14" rx="4" fill="#1e293b"/>
    <rect x="450" y="396" width="68" height="14" rx="4" fill="#334155"/>
  `;
}

function renderBatteryArtwork(filename: string, brand: string, badges: string[]): string {
  const lower = filename.toLowerCase();
  const isLiFePO4 = lower.includes("lifepo4") || lower.includes("lityum");
  const isPylontech = lower.includes("pylontech");
  const hasScreen = lower.includes("dijital-ekranli") || isLiFePO4;
  const capBadge = badges.find((b) => b.includes("Ah") || b.includes("kWh")) ?? "SOLAR BATTERY";
  const voltBadge = badges.find((b) => b.endsWith("V")) ?? "12V / 24V";
  const bodyFill = isPylontech ? "#1e293b" : isLiFePO4 ? "#0f172a" : "#1e3a8a";
  const topCapFill = isLiFePO4 ? "#1e293b" : "#0f172a";

  return `
    <!-- Floor shadow -->
    <ellipse cx="400" cy="414" rx="190" ry="16" fill="#0f172a" fill-opacity="0.14"/>
    <!-- Battery Terminal Posts (+ Red / - Black) -->
    <rect x="276" y="96" width="34" height="24" rx="5" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
    <rect x="285" y="84" width="16" height="14" rx="3" fill="#fbbf24"/>
    <text x="293" y="114" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="900" fill="white">+</text>

    <rect x="490" y="96" width="34" height="24" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
    <rect x="499" y="84" width="16" height="14" rx="3" fill="#94a3b8"/>
    <text x="507" y="114" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="900" fill="white">−</text>

    <!-- Top cover lid -->
    <rect x="220" y="116" width="360" height="32" rx="8" fill="${topCapFill}" stroke="#475569" stroke-width="1.5"/>
    <!-- Main battery casing -->
    <rect x="226" y="144" width="348" height="252" rx="14" fill="${bodyFill}" stroke="#334155" stroke-width="2"/>
    <!-- Front label panel -->
    <rect x="248" y="166" width="304" height="208" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" stroke-width="1.2"/>

    <!-- Brand & chemistry -->
    <text x="270" y="198" font-family="Inter, sans-serif" font-size="16" font-weight="900" fill="white" letter-spacing="1.5">${esc(brand.toUpperCase())}</text>
    <rect x="430" y="180" width="104" height="26" rx="13" fill="${isLiFePO4 ? "#10b981" : "#38bdf8"}" fill-opacity="0.2" stroke="${isLiFePO4 ? "#10b981" : "#38bdf8"}" stroke-width="1.2"/>
    <text x="482" y="197" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="800" fill="${isLiFePO4 ? "#34d399" : "#7dd3fc"}">${isLiFePO4 ? "LiFePO4 LITHIUM" : "DEEP CYCLE GEL"}</text>

    <!-- Capacity big readout -->
    <text x="270" y="254" font-family="Inter, sans-serif" font-size="38" font-weight="900" fill="#fbbf24">${esc(capBadge)}</text>
    <text x="270" y="282" font-family="Inter, sans-serif" font-size="16" font-weight="700" fill="#cbd5e1">TENSION : ${esc(voltBadge)}</text>

    ${
      hasScreen
        ? `<!-- Digital LCD SOC Screen -->
    <rect x="434" y="224" width="98" height="64" rx="8" fill="#022c22" stroke="#10b981" stroke-width="1.8"/>
    <text x="483" y="250" text-anchor="middle" font-family="monospace" font-size="15" font-weight="800" fill="#34d399">13.4 V</text>
    <text x="483" y="272" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#6ee7b7">SOC 100%</text>`
        : `<!-- Charge status bar -->
    <rect x="434" y="236" width="98" height="40" rx="8" fill="#0f172a" stroke="#475569"/>
    <rect x="444" y="246" width="16" height="20" rx="3" fill="#22c55e"/>
    <rect x="464" y="246" width="16" height="20" rx="3" fill="#22c55e"/>
    <rect x="484" y="246" width="16" height="20" rx="3" fill="#22c55e"/>
    <rect x="504" y="246" width="16" height="20" rx="3" fill="#22c55e"/>`
    }

    <!-- Safety / Cycle life footer inside label -->
    <line x1="268" y1="312" x2="532" y2="312" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="270" y="338" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#94a3b8">SOLAR ENERGY STORAGE · HIGH DOD · CE / ISO</text>
  `;
}

function renderControllerArtwork(filename: string, brand: string, badges: string[]): string {
  const isVictron = brand.toLowerCase().includes("victron") || filename.toLowerCase().includes("victron");
  const isMppt = /mppt/i.test(filename);
  const bodyColor = isVictron ? "#0284c7" : "#0f172a";
  const ampBadge = badges.find((b) => b.includes("Ah") || b.includes("A"))?.replace("Ah", "A") ?? "MPPT";
  const voltBadge = badges.find((b) => b.endsWith("V")) ?? "12/24V";

  return `
    <!-- Floor shadow -->
    <ellipse cx="400" cy="416" rx="165" ry="15" fill="#0f172a" fill-opacity="0.14"/>
    <!-- Top Aluminum Heatsink Fins -->
    ${Array.from({ length: 13 })
      .map((_, i) => `<rect x="${252 + i * 24}" y="84" width="14" height="24" rx="3" fill="#64748b"/>`)
      .join("")}
    <!-- Controller Enclosure -->
    <rect x="244" y="102" width="312" height="296" rx="16" fill="${bodyColor}" stroke="#0369a1" stroke-width="2.5"/>
    <!-- Upper face -->
    <text x="272" y="138" font-family="Inter, sans-serif" font-size="16" font-weight="900" fill="white" letter-spacing="1.2">${esc(brand.toUpperCase())}</text>
    <rect x="454" y="120" width="80" height="24" rx="12" fill="#fbbf24"/>
    <text x="494" y="136" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="900" fill="#0f172a">${isMppt ? "MPPT" : "PWM"}</text>

    <!-- LCD Display -->
    <rect x="276" y="156" width="248" height="106" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
    <rect x="286" y="166" width="228" height="86" rx="6" fill="#082f49"/>
    <text x="302" y="198" font-family="monospace" font-size="24" font-weight="800" fill="#38bdf8">${esc(ampBadge)} · ${esc(voltBadge)}</text>
    <text x="302" y="222" font-family="monospace" font-size="12" font-weight="700" fill="#bae6fd">PV: 68.4V   BATT: 14.2V</text>
    <text x="302" y="240" font-family="monospace" font-size="11" fill="#7dd3fc">STATE: BULK / ABSORPTION</text>

    <!-- Control buttons -->
    <circle cx="350" cy="290" r="12" fill="#1e293b" stroke="#bae6fd" stroke-width="1.5"/>
    <circle cx="400" cy="290" r="12" fill="#1e293b" stroke="#bae6fd" stroke-width="1.5"/>
    <circle cx="450" cy="290" r="12" fill="#1e293b" stroke="#bae6fd" stroke-width="1.5"/>

    <!-- Black Terminal Bay at Bottom -->
    <rect x="244" y="320" width="312" height="78" rx="12" fill="#0f172a"/>
    <text x="400" y="340" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="800" fill="#94a3b8" letter-spacing="2">PV + −      BATT + −      LOAD + −</text>
    ${Array.from({ length: 6 })
      .map(
        (_, i) => `
      <rect x="${278 + i * 42}" y="350" width="24" height="32" rx="4" fill="#334155" stroke="#64748b"/>
      <circle cx="${290 + i * 42}" cy="366" r="6" fill="${i % 2 === 0 ? "#ef4444" : "#94a3b8"}"/>`,
      )
      .join("")}
  `;
}

function renderPumpArtwork(filename: string, badges: string[]): string {
  const lower = filename.toLowerCase();
  const isBooster = lower.includes("hidrofor") || lower.includes("jet");
  const hasPanel = lower.includes("panolu");
  const specText = badges.join(" · ") || "DC SOLAR PUMP";

  if (isBooster) {
    return `
      <ellipse cx="400" cy="414" rx="190" ry="16" fill="#0f172a" fill-opacity="0.14"/>
      <!-- Horizontal DC Booster / Jet Pump -->
      <!-- Mounting base -->
      <rect x="230" y="366" width="340" height="22" rx="6" fill="#1e293b"/>
      <!-- Motor body (blue/slate) -->
      <rect x="330" y="210" width="210" height="156" rx="22" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
      <!-- Cooling fins on motor -->
      ${Array.from({ length: 6 })
        .map((_, i) => `<line x1="356" y1="${234 + i * 22}" x2="510" y2="${234 + i * 22}" stroke="#bae6fd" stroke-opacity="0.45" stroke-width="4" stroke-linecap="round"/>`)
        .join("")}
      <!-- Terminal box on top of motor -->
      <rect x="390" y="168" width="90" height="42" rx="8" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
      <text x="435" y="194" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="800" fill="#fbbf24">DC SOLAR</text>
      <!-- Stainless Steel Pump Head (left) -->
      <rect x="236" y="226" width="96" height="128" rx="16" fill="url(#metalFrame)" stroke="#64748b" stroke-width="2"/>
      <!-- Suction & Discharge brass ports -->
      <rect x="206" y="266" width="32" height="44" rx="6" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
      <rect x="264" y="182" width="44" height="44" rx="6" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
      <!-- Pressure gauge -->
      <circle cx="316" cy="192" r="22" fill="white" stroke="#0f172a" stroke-width="3"/>
      <line x1="316" y1="192" x2="328" y2="180" stroke="#ef4444" stroke-width="2.5"/>
    `;
  }

  return `
    <ellipse cx="400" cy="418" rx="170" ry="15" fill="#0f172a" fill-opacity="0.14"/>
    <!-- Borehole Submersible Stainless Steel Cylinder -->
    <g transform="translate(${hasPanel ? -55 : 0}, 0)">
      <!-- Brass discharge head -->
      <rect x="366" y="76" width="68" height="34" rx="8" fill="#d97706" stroke="#92400e" stroke-width="2"/>
      <rect x="382" y="60" width="36" height="18" rx="4" fill="#b45309"/>
      <!-- Stainless steel cylindrical body -->
      <rect x="358" y="108" width="84" height="296" rx="14" fill="url(#metalFrame)" stroke="#64748b" stroke-width="2"/>
      <!-- Metallic sheen highlight -->
      <rect x="372" y="112" width="18" height="288" fill="white" fill-opacity="0.45"/>
      <!-- Intake strainer slots -->
      <rect x="358" y="220" width="84" height="48" fill="#475569"/>
      ${Array.from({ length: 5 })
        .map((_, i) => `<rect x="${366 + i * 14}" y="228" width="8" height="32" rx="3" fill="#0f172a"/>`)
        .join("")}
      <!-- Stage rings -->
      <line x1="358" y1="164" x2="442" y2="164" stroke="#475569" stroke-width="2.5"/>
      <line x1="358" y1="320" x2="442" y2="320" stroke="#475569" stroke-width="2.5"/>
      <line x1="358" y1="376" x2="442" y2="376" stroke="#475569" stroke-width="2.5"/>
      <!-- Waterproof blue power cable -->
      <path d="M 358 116 C 320 116, 318 220, 318 390" fill="none" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
    </g>
    ${
      hasPanel
        ? `<!-- External MPPT Pump Controller Box (Panolu) -->
    <g transform="translate(80, 30)">
      <rect x="360" y="130" width="140" height="190" rx="12" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
      <rect x="378" y="152" width="104" height="54" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
      <text x="430" y="178" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="#34d399">MPPT CTRL</text>
      <text x="430" y="196" text-anchor="middle" font-family="monospace" font-size="10" fill="#a7f3d0">${esc(specText.slice(0, 14))}</text>
      <circle cx="400" cy="236" r="7" fill="#22c55e"/>
      <circle cx="430" cy="236" r="7" fill="#f59e0b"/>
      <circle cx="460" cy="236" r="10" fill="#ef4444"/>
      <text x="430" y="286" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">CONTROL BOX</text>
    </g>`
        : ""
    }
  `;
}

function renderSolarEquipmentArtwork(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes("kablo") && !lower.includes("mc4")) {
    const isBlackOnly = lower.includes("siyah");
    return `
      <ellipse cx="400" cy="414" rx="185" ry="15" fill="#0f172a" fill-opacity="0.12"/>
      <!-- Coiled Solar PV Cable Spools (6mm2 UV resistant) -->
      ${
        !isBlackOnly
          ? `<g transform="translate(-65, 0)">
        <circle cx="400" cy="248" r="112" fill="none" stroke="#dc2626" stroke-width="28"/>
        <circle cx="400" cy="248" r="84" fill="none" stroke="#b91c1c" stroke-width="18"/>
        <circle cx="400" cy="248" r="58" fill="#1e293b"/>
        <text x="400" y="254" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="900" fill="white">PV +</text>
      </g>`
          : ""
      }
      <g transform="translate(${isBlackOnly ? 0 : 65}, 10)">
        <circle cx="400" cy="248" r="112" fill="none" stroke="#1e293b" stroke-width="28"/>
        <circle cx="400" cy="248" r="84" fill="none" stroke="#0f172a" stroke-width="18"/>
        <circle cx="400" cy="248" r="58" fill="#e2e8f0"/>
        <text x="400" y="254" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="900" fill="#0f172a">6 mm²</text>
      </g>
    `;
  }

  if (lower.includes("mc4") || lower.includes("konnektor")) {
    const branches = lower.includes("dortlu") ? 4 : lower.includes("uclu") ? 3 : lower.includes("ikili") ? 2 : 1;
    return `
      <ellipse cx="400" cy="414" rx="180" ry="15" fill="#0f172a" fill-opacity="0.12"/>
      <!-- Waterproof IP67 MC4 Connectors -->
      ${Array.from({ length: branches })
        .map((_, i) => {
          const offset = (i - (branches - 1) / 2) * 78;
          return `
        <g transform="translate(${offset}, 0)">
          <!-- Upper pin (copper) -->
          <rect x="392" y="96" width="16" height="32" rx="4" fill="#d97706"/>
          <!-- Connector upper shell -->
          <rect x="378" y="124" width="44" height="86" rx="8" fill="#0f172a" stroke="#475569" stroke-width="2"/>
          <!-- Red IP67 sealing ring -->
          <rect x="376" y="206" width="48" height="10" rx="3" fill="#dc2626"/>
          <!-- Connector lower body -->
          <rect x="374" y="216" width="52" height="96" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2"/>
          <!-- Locking clips -->
          <rect x="366" y="180" width="8" height="44" rx="3" fill="#334155"/>
          <rect x="426" y="180" width="8" height="44" rx="3" fill="#334155"/>
          <!-- Cable gland nut -->
          <polygon points="380,312 420,312 414,348 386,348" fill="#0f172a"/>
          <!-- Solar cable tail -->
          <rect x="392" y="348" width="16" height="48" rx="4" fill="${i % 2 === 0 ? "#0f172a" : "#dc2626"}"/>
        </g>`;
        })
        .join("")}
    `;
  }

  // Aluminum mounting profile & clamps (Tutfix / Solartut)
  return `
    <ellipse cx="400" cy="414" rx="190" ry="15" fill="#0f172a" fill-opacity="0.12"/>
    <!-- Anodized Aluminum Mounting Rail & Clamp Assembly -->
    <!-- Extruded rail base -->
    <polygon points="210,320 590,260 590,330 210,390" fill="url(#metalFrame)" stroke="#64748b" stroke-width="2.5"/>
    <polygon points="210,295 590,235 590,265 210,325" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
    <!-- Clamp bracket on top -->
    <rect x="345" y="160" width="110" height="115" rx="10" fill="url(#metalFrame)" stroke="#475569" stroke-width="2.5"/>
    <!-- EPDM black rubber gasket -->
    <rect x="335" y="270" width="130" height="18" rx="4" fill="#0f172a"/>
    <!-- Stainless steel Allen bolt + flange nut -->
    <rect x="386" y="112" width="28" height="24" rx="4" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
    <rect x="392" y="136" width="16" height="90" fill="#64748b"/>
    <text x="400" y="246" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="900" fill="#0f172a">ALUMINIUM</text>
  `;
}

function renderHeatingArtwork(filename: string, brand: string, badges: string[]): string {
  const lower = filename.toLowerCase();
  const isBoiler = lower.includes("kombi-0") || lower.includes("yogusmali");
  const isDesignerRad =
    lower.includes("petek-00") ||
    lower.includes("petek-01") ||
    lower.includes("petek-020");

  if (isBoiler) {
    const isBlackGlass = lower.includes("siyah-camli");
    const bodyFill = isBlackGlass ? "#0f172a" : "#f8fafc";
    const strokeCol = isBlackGlass ? "#334155" : "#cbd5e1";
    const textCol = isBlackGlass ? "#f8fafc" : "#0f172a";
    const kwBadge = badges.find((b) => b.includes("kW")) ?? "PREMIX";

    return `
      <ellipse cx="400" cy="418" rx="150" ry="15" fill="#0f172a" fill-opacity="0.14"/>
      <!-- Top flue coaxial pipe -->
      <rect x="372" y="64" width="56" height="32" rx="6" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
      <!-- Wall-hung Condensing Boiler Chassis -->
      <rect x="268" y="92" width="264" height="296" rx="22" fill="${bodyFill}" stroke="${strokeCol}" stroke-width="3"/>
      <!-- Subtle inner bevel -->
      <rect x="286" y="110" width="228" height="260" rx="16" fill="none" stroke="${strokeCol}" stroke-width="1.2"/>
      <!-- Brand plate -->
      <text x="400" y="148" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" font-weight="900" fill="${textCol}" letter-spacing="2">${esc(brand.toUpperCase())}</text>
      <text x="400" y="168" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#ef4444">PREMIX CONDENSATION · ${esc(kwBadge)}</text>

      <!-- Circular Digital Control & Flame Gauge -->
      <circle cx="400" cy="252" r="56" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="400" cy="252" r="44" fill="#082f49"/>
      <text x="400" y="246" text-anchor="middle" font-family="monospace" font-size="22" font-weight="800" fill="#38bdf8">64°C</text>
      <text x="400" y="268" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="#f97316">🔥 1.5 bar</text>

      <!-- Bottom rotary knobs -->
      <circle cx="340" cy="338" r="12" fill="#64748b"/>
      <circle cx="460" cy="338" r="12" fill="#64748b"/>

      <!-- Bottom copper/brass hydraulic pipes -->
      ${[316, 356, 396, 436, 476]
        .map((x, idx) => `<rect x="${x}" y="388" width="14" height="22" rx="3" fill="${idx % 2 === 0 ? "#d97706" : "#94a3b8"}"/>`)
        .join("")}
    `;
  }

  if (isDesignerRad) {
    return `
      <ellipse cx="400" cy="418" rx="140" ry="14" fill="#0f172a" fill-opacity="0.12"/>
      <!-- Vertical Designer Architectural Radiator -->
      <rect x="306" y="86" width="22" height="314" rx="8" fill="#1e293b"/>
      <rect x="472" y="86" width="22" height="314" rx="8" fill="#1e293b"/>
      ${Array.from({ length: 11 })
        .map(
          (_, i) =>
            `<rect x="318" y="${102 + i * 26}" width="164" height="14" rx="5" fill="${i % 3 === 0 ? "#334155" : "#475569"}"/>`,
        )
        .join("")}
      <!-- Chrome thermostatic valve -->
      <circle cx="300" cy="388" r="10" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
      <circle cx="500" cy="388" r="10" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
    `;
  }

  // Standard steel panel radiator (Petek 300mm - 900mm)
  const lenBadge = badges.find((b) => b.includes("mm")) ?? "TYPE 22 · PCCP";
  return `
    <ellipse cx="400" cy="412" rx="220" ry="15" fill="#0f172a" fill-opacity="0.12"/>
    <!-- Steel Panel Radiator (White Type 22) -->
    <rect x="176" y="132" width="448" height="238" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
    <!-- Top convector grille bar -->
    <rect x="184" y="138" width="432" height="18" rx="4" fill="#e2e8f0"/>
    <!-- Vertical embossed heating channels -->
    ${Array.from({ length: 16 })
      .map(
        (_, i) =>
          `<rect x="${198 + i * 25.5}" y="166" width="14" height="186" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>`,
      )
      .join("")}
    <!-- Thermostatic Radiator Valve (right) & Bleed Valve (left) -->
    <rect x="624" y="156" width="26" height="42" rx="6" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
    <rect x="624" y="328" width="18" height="26" rx="4" fill="#94a3b8"/>
    <rect x="158" y="328" width="18" height="26" rx="4" fill="#94a3b8"/>
    <!-- Dimension callout line below radiator -->
    <line x1="180" y1="392" x2="620" y2="392" stroke="#0ea5e9" stroke-width="2"/>
    <circle cx="180" cy="392" r="4" fill="#0ea5e9"/>
    <circle cx="620" cy="392" r="4" fill="#0ea5e9"/>
    <rect x="336" y="378" width="128" height="26" rx="13" fill="#0f172a"/>
    <text x="400" y="395" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#38bdf8">${esc(lenBadge)}</text>
  `;
}

const CATEGORY_THEME: Record<string, { accent: string; pillBg: string; labelFr: string }> = {
  "panneaux-solaires": { accent: "#f59e0b", pillBg: "#fffbeb", labelFr: "PANNEAU SOLAIRE" },
  onduleurs: { accent: "#0284c7", pillBg: "#f0f9ff", labelFr: "ONDULEUR SOLAIRE" },
  batteries: { accent: "#10b981", pillBg: "#ecfdf5", labelFr: "BATTERIE SOLAIRE" },
  "regulateurs-charge": { accent: "#6366f1", pillBg: "#eef2ff", labelFr: "RÉGULATEUR MPPT/PWM" },
  "pompes-solaires": { accent: "#0891b2", pillBg: "#ecfeff", labelFr: "POMPE SOLAIRE DC" },
  "equipements-solaires": { accent: "#475569", pillBg: "#f8fafc", labelFr: "ÉQUIPEMENT SOLAIRE" },
  chauffage: { accent: "#ef4444", pillBg: "#fef2f2", labelFr: "CHAUFFAGE CENTRAL" },
};

export function renderProductSvg(rawPath: string): string {
  const matched = matchCatalogItem(rawPath);
  const theme = CATEGORY_THEME[matched.categorySlug] ?? CATEGORY_THEME["panneaux-solaires"];

  let artwork = "";
  switch (matched.categorySlug) {
    case "panneaux-solaires":
      artwork = renderSolarPanelArtwork(matched.filename, matched.specs);
      break;
    case "onduleurs":
      artwork = renderInverterArtwork(matched.filename, matched.brand, matched.specs);
      break;
    case "batteries":
      artwork = renderBatteryArtwork(matched.filename, matched.brand, matched.specs);
      break;
    case "regulateurs-charge":
      artwork = renderControllerArtwork(matched.filename, matched.brand, matched.specs);
      break;
    case "pompes-solaires":
      artwork = renderPumpArtwork(matched.filename, matched.specs);
      break;
    case "equipements-solaires":
      artwork = renderSolarEquipmentArtwork(matched.filename);
      break;
    case "chauffage":
      artwork = renderHeatingArtwork(matched.filename, matched.brand, matched.specs);
      break;
    default:
      artwork = renderSolarPanelArtwork(matched.filename, matched.specs);
  }

  const specPills = matched.specs.slice(0, 3);
  const titleFr = truncate(matched.titleFr, 56);
  const titleAr = truncate(matched.titleAr, 56);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${esc(titleFr)}">
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

  <!-- Studio Product Backdrop -->
  <rect width="800" height="600" rx="24" fill="url(#studioBg)"/>
  <rect x="12" y="12" width="776" height="576" rx="20" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Top Header: Brand Pill (left) + Category Tag (right) -->
  <rect x="36" y="28" width="160" height="36" rx="18" fill="#0f172a"/>
  <text x="116" y="51" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff" letter-spacing="1">${esc(matched.brand.toUpperCase())}</text>

  <rect x="564" y="28" width="200" height="36" rx="18" fill="${theme.pillBg}" stroke="${theme.accent}" stroke-width="1.5"/>
  <text x="664" y="51" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#0f172a" letter-spacing="0.8">${esc(theme.labelFr)}</text>

  <!-- Center Hardware Illustration -->
  ${artwork}

  <!-- Bottom Technical Specification Card -->
  <rect x="36" y="444" width="728" height="124" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <rect x="36" y="444" width="8" height="124" rx="4" fill="${theme.accent}"/>

  <!-- French Product Title -->
  <text x="64" y="480" font-family="Inter, system-ui, sans-serif" font-size="19" font-weight="800" fill="#0f172a">${esc(titleFr)}</text>
  <!-- Arabic Product Title -->
  <text x="64" y="508" font-family="Cairo, Inter, system-ui, sans-serif" font-size="15" font-weight="700" fill="#475569">${esc(titleAr)}</text>

  <!-- Spec Badges Row -->
  <g transform="translate(64, 524)">
    ${specPills
      .map((pill, idx) => {
        const w = Math.max(88, pill.length * 9 + 26);
        const prevW = specPills.slice(0, idx).reduce((acc, p) => acc + Math.max(88, p.length * 9 + 26) + 10, 0);
        return `
      <rect x="${prevW}" y="0" width="${w}" height="28" rx="14" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="${prevW + w / 2}" y="18" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#0f172a">${esc(pill)}</text>`;
      })
      .join("")}
  </g>

  <!-- ATC Maroc Watermark -->
  <text x="740" y="544" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#94a3b8" letter-spacing="1">ATC · TANGER</text>
</svg>`;
}
