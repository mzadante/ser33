// src/composables/usePdfGenerator.js
// ═══════════════════════════════════════════════════════════════════
// PREMIUM PDF GENERATOR — Destiny Manual (12-14 pages)
// Localization: Support for ES and EN
// ═══════════════════════════════════════════════════════════════════

import { interpretations } from '../data/interpretations.js';
import { PDF_CONTENT } from '../data/pdfContent.js';
import { GRABOVOI_SEQUENCES } from '../data/grabovoiCatalog.js';
import i18n from '../i18n.js';

function getLocale() {
  try {
    if (i18n?.global?.locale) {
      return i18n.global.locale.value || i18n.global.locale || 'es';
    }
  } catch (e) {
    console.warn('PDF Generator: Could not detect locale, defaulting to es', e);
  }
  return 'es';
}

// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const COLORS = {
  gold:       [212, 175, 55],
  goldDim:    [170, 140, 45],
  goldLight:  [235, 210, 130],
  white:      [255, 255, 255],
  offWhite:   [220, 220, 220],
  silver:     [180, 180, 180],
  darkBg:     [12, 12, 15],
  sectionBg:  [18, 18, 22],
  cardBg:     [25, 25, 32],
  muted:      [120, 120, 130],
  accent:     [160, 130, 200],
};

const MARGIN = { left: 20, right: 20, top: 20, bottom: 25 };
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN.left - MARGIN.right;

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function registerFonts(doc, CormorantGaramond_Bold, Montserrat_Regular) {
  doc.addFileToVFS('CormorantGaramond-Bold.ttf', CormorantGaramond_Bold);
  doc.addFont('CormorantGaramond-Bold.ttf', 'Cormorant', 'bold');
  doc.addFileToVFS('Montserrat-Regular.ttf', Montserrat_Regular);
  doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal');
}

function setTitle(doc, size = 22) {
  doc.setFont('Cormorant', 'bold');
  doc.setFontSize(size);
  doc.setTextColor(...COLORS.gold);
}

function setBody(doc, size = 10) {
  doc.setFont('Montserrat', 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...COLORS.offWhite);
}

function setMuted(doc, size = 9) {
  doc.setFont('Montserrat', 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...COLORS.silver);
}

function setGold(doc, size = 10) {
  doc.setFont('Montserrat', 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...COLORS.gold);
}

function drawPageBg(doc) {
  doc.setFillColor(...COLORS.darkBg);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
}

function drawFrame(doc, inset = 10) {
  doc.setDrawColor(...COLORS.goldDim);
  doc.setLineWidth(0.3);
  doc.rect(inset, inset, PAGE_W - inset * 2, PAGE_H - inset * 2);
  doc.setLineWidth(0.15);
  doc.rect(inset + 2, inset + 2, PAGE_W - (inset + 2) * 2, PAGE_H - (inset + 2) * 2);
}

function drawCornerOrnaments(doc, inset = 12) {
  const len = 8;
  doc.setDrawColor(...COLORS.gold);
  doc.setLineWidth(0.5);
  // TL
  doc.line(inset, inset + len, inset, inset);
  doc.line(inset, inset, inset + len, inset);
  // TR
  doc.line(PAGE_W - inset - len, inset, PAGE_W - inset, inset);
  doc.line(PAGE_W - inset, inset, PAGE_W - inset, inset + len);
  // BL
  doc.line(inset, PAGE_H - inset - len, inset, PAGE_H - inset);
  doc.line(inset, PAGE_H - inset, inset + len, PAGE_H - inset);
  // BR
  doc.line(PAGE_W - inset - len, PAGE_H - inset, PAGE_W - inset, PAGE_H - inset);
  doc.line(PAGE_W - inset, PAGE_H - inset - len, PAGE_W - inset, PAGE_H - inset);
}

function drawSeparator(doc, y, width = 40) {
  const cx = PAGE_W / 2;
  doc.setDrawColor(...COLORS.gold);
  doc.setLineWidth(0.4);
  doc.line(cx - width / 2, y, cx + width / 2, y);
  doc.setFillColor(...COLORS.gold);
  doc.circle(cx, y, 0.8, 'F');
}

function drawSectionHeader(doc, text, y) {
  setTitle(doc, 16);
  doc.text(text, MARGIN.left, y);
  doc.setDrawColor(...COLORS.gold);
  doc.setLineWidth(0.3);
  doc.line(MARGIN.left, y + 2, MARGIN.left + doc.getTextWidth(text), y + 2);
  return y + 10;
}

function writeWrapped(doc, text, x, y, maxWidth, lineHeight = 5) {
  if (!text) return y;
  const lines = doc.splitTextToSize(text, maxWidth);
  for (const line of lines) {
    if (y > PAGE_H - 20) {
      doc.addPage();
      drawPageBg(doc);
      drawCornerOrnaments(doc);
      y = MARGIN.top + 10;
    }
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

function drawNumberCard(doc, label, value, interpretation, y, contextDesc = '', lang = 'es') {
  // Pre-calcular alturas para evitar desbordamiento
  const HEADER_H = 15;
  const interpLines = (interpretation && interpretation.essence) ? 1 : 0;
  const contextLines = contextDesc ? doc.splitTextToSize(contextDesc, CONTENT_W - 20).length : 0;
  const lightLines = (interpretation && interpretation.light) ? doc.splitTextToSize(interpretation.light, CONTENT_W - 35).length : 0;
  
  const estimatedH = HEADER_H + (contextLines * 4.5) + (lightLines * 3.5) + 12;

  if (y + estimatedH > PAGE_H - 15) {
    doc.addPage();
    drawPageBg(doc);
    drawCornerOrnaments(doc);
    y = MARGIN.top + 10;
  }

  const startY = y;
  doc.setFillColor(...COLORS.cardBg);
  doc.roundedRect(MARGIN.left, y - 5, CONTENT_W, estimatedH, 2, 2, 'F');

  doc.setFillColor(...COLORS.gold);
  doc.circle(MARGIN.left + 15, y + 8, 8, 'F');
  doc.setTextColor(...COLORS.darkBg);
  doc.setFont('Cormorant', 'bold');
  doc.setFontSize(16);
  doc.text(String(value), MARGIN.left + 15, y + 11, { align: 'center' });

  setTitle(doc, 13);
  doc.text(label, MARGIN.left + 28, y + 5);

  if (interpretation && interpretation.essence) {
    setGold(doc, 9);
    doc.text(interpretation.essence, MARGIN.left + 28, y + 11);
  }

  y += HEADER_H;

  if (contextDesc) {
    setBody(doc, 8.5);
    y = writeWrapped(doc, contextDesc, MARGIN.left + 10, y + 4, CONTENT_W - 20, 4.5);
  }

  if (interpretation && interpretation.light) {
    y += 4;
    setGold(doc, 7);
    doc.text(lang === 'es' ? 'VIBRACIÓN EN LUZ:' : 'LIGHT VIBRATION:', MARGIN.left + 10, y);
    setBody(doc, 7.5);
    y = writeWrapped(doc, interpretation.light, MARGIN.left + 35, y, CONTENT_W - 45, 3.5);
  }

  return startY + estimatedH + 5;
}

function drawFooter(doc, pageNum, lang = 'es') {
  doc.setFont('Montserrat', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.muted);
  const footerLabel = lang === 'es' ? 'ser33 — Manual del Destino' : 'ser33 — Destiny Manual';
  doc.text(footerLabel, MARGIN.left, PAGE_H - 12);
  doc.text(String(pageNum), PAGE_W - MARGIN.right, PAGE_H - 12, { align: 'right' });
  doc.setDrawColor(...COLORS.goldDim);
  doc.setLineWidth(0.15);
  doc.line(MARGIN.left, PAGE_H - 15, PAGE_W - MARGIN.right, PAGE_H - 15);
}

// ═══════════════════════════════════════════════════════════════════
// PAGE BUILDERS
// ═══════════════════════════════════════════════════════════════════

function buildCoverPage(doc, userName, birthDate, lang = 'es') {
  drawPageBg(doc);
  drawFrame(doc);
  drawCornerOrnaments(doc);

  doc.setFont('Cormorant', 'bold');
  doc.setFontSize(48);
  doc.setTextColor(...COLORS.white);
  doc.text('ser', PAGE_W / 2 - 10, 80, { align: 'right' });
  doc.setTextColor(...COLORS.gold);
  doc.text('33', PAGE_W / 2 - 10, 80);

  setTitle(doc, 14);
  const subtitle = lang === 'es' ? 'MANUAL DEL DESTINO' : 'DESTINY MANUAL';
  doc.text(subtitle, PAGE_W / 2, 95, { align: 'center' });

  drawSeparator(doc, 105);

  doc.setFont('Cormorant', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...COLORS.white);
  doc.text(userName.toUpperCase(), PAGE_W / 2, 130, { align: 'center' });

  setMuted(doc, 11);
  const [y, m, d] = birthDate.split('-');
  doc.text(`${d} / ${m} / ${y}`, PAGE_W / 2, 142, { align: 'center' });

  drawSeparator(doc, 155);

  setBody(doc, 9);
  doc.setTextColor(...COLORS.silver);
  const tagline = lang === 'es' 
    ? 'Tu carta numerológica completa: Pitagórica · Omkin Kay · Gematría · Ciclos de Vida'
    : 'Your complete numerology chart: Pythagorean · Omkin Kay · Gematria · Life Cycles';
  doc.text(tagline, PAGE_W / 2, 170, { align: 'center' });

  setMuted(doc, 8);
  const now = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const genDateStr = lang === 'es' ? 'Generado el ' : 'Generated on ';
  const dateLocale = lang === 'es' ? 'es-ES' : 'en-US';
  doc.text(`${genDateStr}${now.toLocaleDateString(dateLocale, options)}`, PAGE_W / 2, PAGE_H - 35, { align: 'center' });

  doc.setFillColor(...COLORS.gold);
  const cx = PAGE_W / 2;
  const cy = PAGE_H - 50;
  doc.triangle(cx, cy - 4, cx - 3, cy, cx + 3, cy, 'F');
  doc.triangle(cx, cy + 4, cx - 3, cy, cx + 3, cy, 'F');
}

function buildIntroPage(doc, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];

  y = drawSectionHeader(doc, content.intro.title, y);
  setBody(doc, 9);
  y = writeWrapped(doc, content.intro.body, MARGIN.left + 2, y, CONTENT_W - 4, 4.5);
  y += 8;

  drawSeparator(doc, y);
  y += 10;

  y = drawSectionHeader(doc, content.howToRead.title, y);
  setBody(doc, 9);
  y = writeWrapped(doc, content.howToRead.body, MARGIN.left + 2, y, CONTENT_W - 4, 4.5);
  y += 10;

  drawSeparator(doc, y);
  y += 10;

  const tocTitle = lang === 'es' ? 'Contenido de Este Manual' : 'Table of Contents';
  y = drawSectionHeader(doc, tocTitle, y);
  const tocES = [
    { num: '01', title: 'Tu Código Pitagórico', desc: 'Camino de Vida · Alma · Personalidad · Destino' },
    { num: '02', title: 'Mapa Tántrico Omkin Kay', desc: 'Los 5 Factores de Consciencia' },
    { num: '03', title: 'Gematría Sagrada', desc: 'Caldea · Simple · Hebrea' },
    { num: '04', title: 'Tu Año Personal', desc: 'El ciclo que rige tu vida ahora' },
    { num: '05', title: 'Pinnacles y Desafíos', desc: 'Las 4 cimas y los 4 obstáculos de tu vida' },
    { num: '06', title: 'Números Profundos', desc: 'Madurez · Pasión Oculta · Yo Subconsciente' },
    { num: '07', title: 'Deuda Kármica', desc: 'Lecciones de vidas pasadas' },
    { num: '08', title: 'Códigos Grabovoi', desc: 'Secuencias de activación personalizadas' },
    { num: '09', title: 'Recursos y Cierre', desc: 'Libros, canales y siguiente paso' },
  ];
  const tocEN = [
    { num: '01', title: 'Your Pythagorean Code', desc: 'Life Path · Soul · Personality · Destiny' },
    { num: '02', title: 'Omkin Kay Tantric Map', desc: 'The 5 Consciousness Factors' },
    { num: '03', title: 'Sacred Gematria', desc: 'Chaldean · Simple · Hebrew' },
    { num: '04', title: 'Your Personal Year', desc: 'The cycle ruling your life right now' },
    { num: '05', title: 'Pinnacles & Challenges', desc: 'The 4 peaks and 4 obstacles of your life' },
    { num: '06', title: 'Deep Numbers', desc: 'Maturity · Hidden Passion · Subconscious Self' },
    { num: '07', title: 'Karmic Debt', desc: 'Lessons from past lives' },
    { num: '08', title: 'Grabovoi Codes', desc: 'Personalized activation sequences' },
    { num: '09', title: 'Resources & Closing', desc: 'Books, channels and next steps' },
  ];
  const toc = lang === 'es' ? tocES : tocEN;

  for (const item of toc) {
    setGold(doc, 10);
    doc.text(item.num, MARGIN.left + 5, y);
    setBody(doc, 10);
    doc.setTextColor(...COLORS.white);
    doc.text(item.title, MARGIN.left + 18, y);
    setMuted(doc, 8);
    doc.text(item.desc, MARGIN.left + 18, y + 4.5);
    y += 12;
  }
  drawFooter(doc, 2, lang);
}

function buildPythagoreanPages(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];
  const nums = interpretations[lang].numbers;

  y = drawSectionHeader(doc, content.sections.pythagorean.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.pythagorean.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 6;

  const lpLabel = lang === 'es' ? 'Camino de Vida' : 'Life Path';
  const lpData = nums[results.lifePath] || {};
  y = drawNumberCard(doc, lpLabel, results.lifePath, lpData, y, lpData.lifePathDesc || '', lang);
  y += 2;

  const soulLabel = lang === 'es' ? 'Número del Alma' : 'Soul Number';
  const soulData = nums[results.soulNumber] || {};
  y = drawNumberCard(doc, soulLabel, results.soulNumber, soulData, y, content.sections.soul.why, lang);
  y += 2;

  if (y > PAGE_H - 100) {
    drawFooter(doc, 3, lang);
    doc.addPage();
    drawPageBg(doc);
    drawCornerOrnaments(doc);
    y = MARGIN.top + 10;
  }

  const persLabel = lang === 'es' ? 'Número de Personalidad' : 'Personality Number';
  const persData = nums[results.personalityNumber] || {};
  y = drawNumberCard(doc, persLabel, results.personalityNumber, persData, y, content.sections.personality.why, lang);
  y += 2;

  const destLabel = lang === 'es' ? 'Número de Destino' : 'Destiny Number';
  const destData = nums[results.destinyNumber] || {};
  y = drawNumberCard(doc, destLabel, results.destinyNumber, destData, y, content.sections.destiny.why, lang);

  drawFooter(doc, 4, lang);
}

function buildOmkinPage(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];
  const omkin = results.omkin;

  y = drawSectionHeader(doc, content.sections.omkin.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.omkin.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 8;

  const factorsLabels = {
    es: { essence: 'Esencia', karma: 'Karma', gift: 'Regalo Divino', pastLives: 'Vidas Pasadas', mission: 'Misión' },
    en: { essence: 'Essence', karma: 'Karma', gift: 'Divine Gift', pastLives: 'Past Lives', mission: 'Mission' }
  };
  const labels = factorsLabels[lang];

  const factors = [
    { key: 'essence', label: labels.essence, val: omkin.essence },
    { key: 'karma', label: labels.karma, val: omkin.karma },
    { key: 'gift', label: labels.gift, val: omkin.gift },
    { key: 'pastLives', label: labels.pastLives, val: omkin.pastLives },
    { key: 'mission', label: labels.mission, val: omkin.mission },
  ];

  for (const f of factors) {
    if (y > PAGE_H - 40) {
      drawFooter(doc, 5, lang);
      doc.addPage();
      drawPageBg(doc);
      drawCornerOrnaments(doc);
      y = MARGIN.top + 10;
    }
    doc.setFillColor(...COLORS.cardBg);
    doc.roundedRect(MARGIN.left, y - 3, CONTENT_W, 25, 2, 2, 'F');
    doc.setFillColor(...COLORS.gold);
    doc.circle(MARGIN.left + 12, y + 6, 6, 'F');
    doc.setTextColor(...COLORS.darkBg);
    doc.setFont('Cormorant', 'bold');
    doc.setFontSize(14);
    doc.text(String(f.val), MARGIN.left + 12, y + 8.5, { align: 'center' });
    setTitle(doc, 11);
    doc.text(f.label, MARGIN.left + 22, y + 4);
    setBody(doc, 8);
    const desc = content.sections.omkin.factors[f.key] || '';
    y = writeWrapped(doc, desc, MARGIN.left + 22, y + 10, CONTENT_W - 30, 3.5);
    y += 18;
  }
  drawFooter(doc, 5, lang);
}

function buildGematriaPage(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];
  const gem = results.gematria;

  y = drawSectionHeader(doc, content.sections.gematria.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.gematria.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 8;

  const types = [
    { label: lang === 'es' ? 'Gematría Caldea' : 'Chaldean Gematria', val: gem.chaldean, desc: content.sections.gematria.chaldean },
    { label: lang === 'es' ? 'Gematría Simple' : 'Simple Gematria', val: gem.simple, desc: content.sections.gematria.simple },
    { label: lang === 'es' ? 'Gematría Hebrea' : 'Hebrew Gematria', val: gem.hebrew, desc: content.sections.gematria.hebrew },
  ];

  for (const t of types) {
    doc.setFillColor(...COLORS.cardBg);
    doc.roundedRect(MARGIN.left, y - 3, CONTENT_W, 30, 2, 2, 'F');
    setTitle(doc, 28);
    doc.text(String(t.val), PAGE_W / 2, y + 10, { align: 'center' });
    setGold(doc, 10);
    doc.text(t.label, PAGE_W / 2, y + 18, { align: 'center' });
    setMuted(doc, 7);
    y = writeWrapped(doc, t.desc, MARGIN.left + 8, y + 24, CONTENT_W - 16, 3.5);
    y += 8;
  }
  drawFooter(doc, 6, lang);
}

function buildPersonalYearPage(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];
  const adv = results.advanced;
  const pyMeaning = content.personalYearMeanings[adv.personalYear] || {};
  const uniYear = interpretations[lang].universalYear2026;

  y = drawSectionHeader(doc, `${content.sections.personalYear.title} ${adv.personalYearOf}`, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.personalYear.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 6;

  doc.setFillColor(...COLORS.sectionBg);
  doc.roundedRect(MARGIN.left, y - 3, CONTENT_W, 50, 3, 3, 'F');
  setTitle(doc, 56);
  doc.text(String(adv.personalYear), PAGE_W / 2, y + 25, { align: 'center' });
  setGold(doc, 12);
  doc.text(pyMeaning.title || '', PAGE_W / 2, y + 38, { align: 'center' });
  setMuted(doc, 8);
  const energyLabel = lang === 'es' ? 'Energía: ' : 'Energy: ';
  doc.text(`${energyLabel}${pyMeaning.energy || ''}`, PAGE_W / 2, y + 45, { align: 'center' });
  y += 58;

  setBody(doc, 9);
  y = writeWrapped(doc, pyMeaning.description || '', MARGIN.left + 5, y, CONTENT_W - 10, 4.5);
  y += 6;

  doc.setFillColor(...COLORS.cardBg);
  doc.roundedRect(MARGIN.left, y - 3, CONTENT_W / 2 - 3, 30, 2, 2, 'F');
  doc.roundedRect(MARGIN.left + CONTENT_W / 2 + 3, y - 3, CONTENT_W / 2 - 3, 30, 2, 2, 'F');

  setGold(doc, 9);
  const sowLabel = lang === 'es' ? '✦ SIEMBRA ESTO' : '✦ SOW THIS';
  const avoidLabel = lang === 'es' ? '✧ EVITA ESTO' : '✧ AVOID THIS';
  doc.text(sowLabel, MARGIN.left + 5, y + 3);
  setBody(doc, 8);
  writeWrapped(doc, pyMeaning.doThis || '', MARGIN.left + 5, y + 9, CONTENT_W / 2 - 13, 3.8);
  setGold(doc, 9);
  doc.text(avoidLabel, MARGIN.left + CONTENT_W / 2 + 8, y + 3);
  setBody(doc, 8);
  writeWrapped(doc, pyMeaning.avoidThis || '', MARGIN.left + CONTENT_W / 2 + 8, y + 9, CONTENT_W / 2 - 13, 3.8);
  y += 38;

  drawSeparator(doc, y);
  y += 8;
  setTitle(doc, 12);
  const ctxLabel = lang === 'es' ? 'Contexto: Año Universal' : 'Context: Universal Year';
  doc.text(`${ctxLabel} ${uniYear.number} (${adv.personalYearOf})`, MARGIN.left + 2, y);
  y += 6;
  setBody(doc, 8.5);
  y = writeWrapped(doc, uniYear.description, MARGIN.left + 5, y, CONTENT_W - 10, 4);
  y += 4;
  setGold(doc, 8);
  const adviceLabel = lang === 'es' ? 'Consejo: ' : 'Advice: ';
  doc.text(`${adviceLabel}${uniYear.advice}`, MARGIN.left + 5, y);

  drawFooter(doc, 7, lang);
}

function buildPinnaclesPage(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];
  const adv = results.advanced;
  const pMeanings = interpretations[lang].pinnacleMeanings || {};
  const cMeanings = interpretations[lang].challengeMeanings || {};

  y = drawSectionHeader(doc, content.sections.pinnacles.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.pinnacles.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 6;

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - results.birthYear;

  for (const [index, pin] of adv.pinnacles.entries()) {
    const isCurrent = currentAge >= pin.fromAge && currentAge <= pin.toAge;
    const meaning = pMeanings[pin.value] || '';
    const meaningLines = doc.splitTextToSize(meaning, CONTENT_W - 35).length;
    const blockH = 15 + (meaningLines * 3.5) + 5;

    if (y + blockH > PAGE_H - 15) {
      drawFooter(doc, 'Pinnacles', lang);
      doc.addPage();
      drawPageBg(doc);
      drawCornerOrnaments(doc);
      y = MARGIN.top + 10;
    }

    doc.setFillColor(...(isCurrent ? COLORS.sectionBg : COLORS.cardBg));
    doc.roundedRect(MARGIN.left, y - 3, CONTENT_W, blockH, 2, 2, 'F');
    if (isCurrent) {
      doc.setDrawColor(...COLORS.gold); doc.setLineWidth(0.4);
      doc.roundedRect(MARGIN.left, y - 3, CONTENT_W, blockH, 2, 2, 'S');
    }
    doc.setFillColor(...COLORS.gold); doc.circle(MARGIN.left + 12, y + 6, 5, 'F');
    doc.setTextColor(...COLORS.darkBg); doc.setFont('Cormorant', 'bold'); doc.setFontSize(12);
    doc.text(String(pin.value), MARGIN.left + 12, y + 8, { align: 'center' });
    setTitle(doc, 10);
    const actualTag = lang === 'es' ? ' ← ACTUAL' : ' ← CURRENT';
    const pName = content.sections.challenges.pinnacleNames[index] || `Pinnacle ${index + 1}`;
    doc.text(`${pName}${isCurrent ? actualTag : ''}`, MARGIN.left + 22, y + 4);
    setMuted(doc, 8);
    const ageLabel = lang === 'es' ? 'Edades: ' : 'Ages: ';
    doc.text(`${ageLabel}${pin.fromAge} – ${pin.toAge > 90 ? '∞' : pin.toAge}`, MARGIN.left + 22, y + 9);
    setBody(doc, 7.5);
    y = writeWrapped(doc, meaning, MARGIN.left + 25, y + 14, CONTENT_W - 35, 3.5);
    y += 10;
  }
  y += 5; drawSeparator(doc, y); y += 8;

  y = drawSectionHeader(doc, content.sections.challenges.title, y);
  setBody(doc, 8);
  y = writeWrapped(doc, content.sections.challenges.intro.substring(0, 200) + '...', MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 4;

  for (const [index, ch] of adv.challenges.entries()) {
    const isCurrent = currentAge >= ch.fromAge && currentAge <= ch.toAge;
    const cMeaning = cMeanings[ch.value] || '';
    const meaningLines = doc.splitTextToSize(cMeaning, CONTENT_W - 80).length;
    const blockH = Math.max(16, (meaningLines * 3.5) + 8);

    if (y + blockH > PAGE_H - 15) {
      drawFooter(doc, 8, lang); doc.addPage(); drawPageBg(doc); drawCornerOrnaments(doc); y = MARGIN.top + 10;
    }
    
    doc.setFillColor(...COLORS.cardBg); 
    doc.roundedRect(MARGIN.left, y - 3, CONTENT_W, blockH, 2, 2, 'F');
    if (isCurrent) {
      doc.setDrawColor(...COLORS.accent); doc.setLineWidth(0.3);
      doc.roundedRect(MARGIN.left, y - 3, CONTENT_W, blockH, 2, 2, 'S');
    }
    setGold(doc, 10); doc.text(String(ch.value), MARGIN.left + 10, y + 5, { align: 'center' });
    setTitle(doc, 9);
    const actualTag = lang === 'es' ? ' ← ACTUAL' : ' ← CURRENT';
    const cName = content.sections.challenges.challengeNames[index] || `Challenge ${index + 1}`;
    doc.text(`${cName}${isCurrent ? actualTag : ''}`, MARGIN.left + 20, y + 4);
    setMuted(doc, 7);
    const ageLabel = lang === 'es' ? 'Edades: ' : 'Ages: ';
    doc.text(`${ageLabel}${ch.fromAge} – ${ch.toAge > 90 ? '∞' : ch.toAge}`, MARGIN.left + 20, y + 9);
    setBody(doc, 7);
    y = writeWrapped(doc, cMeaning, MARGIN.left + 75, y + 4, CONTENT_W - 80, 3.5);
    y += 10;
  }
  drawFooter(doc, 8, lang);
}

function buildDeepNumbersPage(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];
  const adv = results.advanced;
  const meanings = interpretations[lang];

  y = drawSectionHeader(doc, content.sections.maturity.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.maturity.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 6;
  const maturityLabel = lang === 'es' ? 'Número de Madurez' : 'Maturity Number';
  y = drawNumberCard(doc, maturityLabel, adv.maturityNumber, { essence: meanings.maturityMeanings[adv.maturityNumber], light: '' }, y, content.sections.maturity.what, lang);
  y += 5;

  y = drawSectionHeader(doc, content.sections.hiddenPassion.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.hiddenPassion.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 6;
  const hpLabel = lang === 'es' ? 'Pasión Oculta' : 'Hidden Passion';
  y = drawNumberCard(doc, hpLabel, adv.hiddenPassion, { essence: content.hiddenPassionMeanings[adv.hiddenPassion], light: '' }, y, content.sections.hiddenPassion.what, lang);
  y += 5;

  y = drawSectionHeader(doc, content.sections.subconsciousSelf.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.subconsciousSelf.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 6;
  const subLabel = lang === 'es' ? 'Yo Subconsciente' : 'Subconscious Self';
  y = drawNumberCard(doc, subLabel, adv.subconsciousSelf, { essence: content.subconsciousMeanings[adv.subconsciousSelf], light: '' }, y, content.sections.subconsciousSelf.what, lang);

  drawFooter(doc, 9, lang);
}

function buildKarmicDebtPage(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];
  const deb = results.advanced.karmicDebts;

  y = drawSectionHeader(doc, content.sections.karmicDebt.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.karmicDebt.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 10;

  if (deb.length === 0) {
    doc.setFillColor(...COLORS.cardBg);
    doc.roundedRect(MARGIN.left, y, CONTENT_W, 20, 2, 2, 'F');
    setGold(doc, 10);
    doc.text(lang === 'es' ? '✧ SIN DEUDAS DETECTADAS' : '✧ NO DEBTS DETECTED', PAGE_W / 2, y + 8, { align: 'center' });
    setBody(doc, 8);
    doc.text(content.sections.karmicDebt.clean, PAGE_W / 2, y + 14, { align: 'center' });
  } else {
    for (const d of deb) {
      const details = interpretations[lang].karmicDebtDetails[d.number];
      if (!details) continue;
      doc.setFillColor(...COLORS.sectionBg);
      doc.roundedRect(MARGIN.left, y, CONTENT_W, 60, 2, 2, 'F');
      setTitle(doc, 14);
      doc.text(details.title, MARGIN.left + 6, y + 8);
      setGold(doc, 8);
      const lessonTag = lang === 'es' ? 'LECCIÓN:' : 'LESSON:';
      const transTag = lang === 'es' ? 'TRANSMUTACIÓN:' : 'TRANSMUTATION:';
      doc.text(lessonTag, MARGIN.left + 6, y + 15);
      setBody(doc, 8);
      y = writeWrapped(doc, details.lesson, MARGIN.left + 6, y + 20, CONTENT_W - 12, 3.5);
      setGold(doc, 8);
      doc.text(transTag, MARGIN.left + 6, y + 5);
      setBody(doc, 8);
      y = writeWrapped(doc, details.transmutation, MARGIN.left + 6, y + 10, CONTENT_W - 12, 3.5);
      y += 15;
    }
  }
  drawFooter(doc, 10, lang);
}

function buildGrabovoiPage(doc, results, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];

  y = drawSectionHeader(doc, content.sections.grabovoi.title, y);
  setBody(doc, 8.5);
  y = writeWrapped(doc, content.sections.grabovoi.intro, MARGIN.left + 2, y, CONTENT_W - 4, 4);
  y += 10;

  const codesES = [
    { label: 'Autocuración del Cuerpo', code: '9187948181' },
    { label: 'Abundancia Financiera', code: '318798' },
    { label: 'Armonía Universal', code: '14111963' },
    { label: 'Desarrollo del Espíritu', code: '1231115025' },
    { label: 'Solución de Cuestiones', code: '212309909' }
  ];
  const codesEN = [
    { label: 'Self-Healing of the Body', code: '9187948181' },
    { label: 'Financial Abundance', code: '318798' },
    { label: 'Universal Harmony', code: '14111963' },
    { label: 'Spirit Development', code: '1231115025' },
    { label: 'Problem Solving', code: '212309909' }
  ];
  const codes = lang === 'es' ? codesES : codesEN;

  for (const c of codes) {
    doc.setFillColor(...COLORS.cardBg);
    doc.roundedRect(MARGIN.left, y, CONTENT_W, 15, 2, 2, 'F');
    setGold(doc, 9);
    doc.text(c.label, MARGIN.left + 5, y + 9);
    setTitle(doc, 14);
    doc.text(c.code, PAGE_W - MARGIN.right - 5, y + 10, { align: 'right' });
    y += 18;
  }
  drawFooter(doc, 11, lang);
}

function buildResourcesPage(doc, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawCornerOrnaments(doc);
  let y = MARGIN.top + 10;
  const content = PDF_CONTENT[lang];

  y = drawSectionHeader(doc, content.resources.title, y);
  setGold(doc, 10);
  doc.text(content.resources.books.title, MARGIN.left + 2, y);
  y += 6;
  for (const b of content.resources.books.items) {
    setBody(doc, 9);
    doc.text(`• ${b.title}`, MARGIN.left + 4, y);
    setMuted(doc, 7.5);
    y = writeWrapped(doc, `${b.author}: ${b.description}`, MARGIN.left + 8, y + 4, CONTENT_W - 12, 3.5);
    y += 2;
  }
  y += 5;
  setGold(doc, 10);
  doc.text(content.resources.youtube.title, MARGIN.left + 2, y);
  y += 6;
  for (const ch of content.resources.youtube.items) {
    setBody(doc, 9);
    doc.text(`• ${ch.name}`, MARGIN.left + 4, y);
    setMuted(doc, 7.5);
    y = writeWrapped(doc, `${ch.specialty} (${ch.subscribers})`, MARGIN.left + 8, y + 4, CONTENT_W - 12, 3.5);
    y += 2;
  }
  drawFooter(doc, 12, lang);
}

function buildBackCover(doc, lang = 'es') {
  doc.addPage();
  drawPageBg(doc);
  drawFrame(doc);
  drawCornerOrnaments(doc);
  let y = 80;
  const content = PDF_CONTENT[lang];

  setTitle(doc, 22);
  doc.text(content.closing.title, PAGE_W / 2, y, { align: 'center' });
  y += 10;
  setBody(doc, 10);
  y = writeWrapped(doc, content.closing.body, PAGE_W / 2 - 40, y + 5, 80, 5);

  doc.setFillColor(...COLORS.gold);
  const cx = PAGE_W / 2;
  doc.triangle(cx, y + 10, cx - 4, y + 16, cx + 4, y + 16, 'F');
  doc.triangle(cx, y + 22, cx - 4, y + 16, cx + 4, y + 16, 'F');

  setMuted(doc, 6.5);
  const discLines = doc.splitTextToSize(content.disclaimer, CONTENT_W - 20);
  let dy = PAGE_H - 60;
  for (const line of discLines) {
    doc.text(line, PAGE_W / 2, dy, { align: 'center' }); dy += 3.5;
  }

  doc.setFont('Cormorant', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.white);
  doc.text('ser', PAGE_W / 2 - 5, PAGE_H - 30, { align: 'right' });
  doc.setTextColor(...COLORS.gold);
  doc.text('33', PAGE_W / 2 - 5, PAGE_H - 30);
  setMuted(doc, 7);
  doc.text('www.ser33.com', PAGE_W / 2, PAGE_H - 22, { align: 'center' });
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT — COMPOSABLE
// ═══════════════════════════════════════════════════════════════════

export function usePdfGenerator() {
  const generateManual = async (results, userName) => {
    const lang = getLocale();
    
    // Lazy load heavy dependencies
    const { jsPDF } = await import('jspdf');
    const { CormorantGaramond_Bold } = await import('../assets/fonts/CormorantGaramond_Bold.js');
    const { Montserrat_Regular } = await import('../assets/fonts/Montserrat_Regular.js');
    
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    registerFonts(doc, CormorantGaramond_Bold, Montserrat_Regular);

    const birthDate = `${results.birthYear}-${String(results.birthMonth).padStart(2, '0')}-${String(results.birthDay).padStart(2, '0')}`;

    buildCoverPage(doc, userName, birthDate, lang);
    buildIntroPage(doc, lang);
    buildPythagoreanPages(doc, results, lang);
    buildOmkinPage(doc, results, lang);
    buildGematriaPage(doc, results, lang);
    buildPersonalYearPage(doc, results, lang);
    buildPinnaclesPage(doc, results, lang);
    buildDeepNumbersPage(doc, results, lang);
    buildKarmicDebtPage(doc, results, lang);
    buildGrabovoiPage(doc, results, lang);
    buildResourcesPage(doc, lang);
    buildBackCover(doc, lang);

    const normalize = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const safeName = normalize(userName).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') || 'Manual';
    const fileName = lang === 'es' ? `Manual_Destino_${safeName}.pdf` : `Destiny_Manual_${safeName}.pdf`;

    try {
      console.log('Generating PDF for:', fileName);
      // Intentamos el método estándar de jsPDF
      doc.save(fileName);
      console.log('Standard doc.save() called.');
    } catch (e) {
      console.warn('Standard doc.save failed, trying manual Blob fallback...', e);
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.setAttribute('download', fileName); // Force attribute
      link.style.visibility = 'hidden';
      link.style.position = 'absolute';
      document.body.appendChild(link);
      
      // Simular clic
      const clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      link.dispatchEvent(clickEvent);
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 200);
    }
  };

  return { generateManual };
}
