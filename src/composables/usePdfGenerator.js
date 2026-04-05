// src/composables/usePdfGenerator.js
import { jsPDF } from 'jspdf';
import { useI18n } from 'vue-i18n';

export function usePdfGenerator() {
  const { t } = useI18n();

  const generateManual = async (results, userName) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const goldColor = [212, 175, 55]; // Gold RGB
    const darkBg = [10, 10, 10]; // Near black

    // Portada / Header
    doc.setFillColor(...darkBg);
    doc.rect(0, 0, 210, 297, 'F');

    // Ornato Dorado
    doc.setDrawColor(...goldColor);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // Título
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text('ser', 105, 40, { align: 'center' });
    
    doc.setTextColor(...goldColor);
    doc.setFontSize(16);
    doc.text(t('app.subtitle').toUpperCase(), 105, 50, { align: 'center' });

    doc.setDrawColor(...goldColor);
    doc.line(80, 55, 130, 55);

    // Nombre del Usuario
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(userName.toUpperCase(), 105, 80, { align: 'center' });

    // --- SECCIÓN 1: NUMEROLOGÍA PITAGÓRICA ---
    doc.setTextColor(...goldColor);
    doc.setFontSize(14);
    doc.text(t('results.title').toUpperCase(), 20, 100);
    doc.line(20, 102, 60, 102);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    const pitagoreanStats = [
      { label: t('results.lifePath'), val: results.lifePath },
      { label: t('results.soul'), val: results.soulNumber },
      { label: t('results.personality'), val: results.personalityNumber },
      { label: t('results.destiny'), val: results.destinyNumber }
    ];

    let y = 115;
    pitagoreanStats.forEach(stat => {
      doc.setTextColor(200, 200, 200);
      doc.text(stat.label + ':', 25, y);
      doc.setTextColor(...goldColor);
      doc.setFontSize(14);
      doc.text(String(stat.val), 90, y);
      doc.setFontSize(10);
      y += 10;
    });

    // --- SECCIÓN 2: OMKIN KAY ---
    y += 10;
    doc.setTextColor(...goldColor);
    doc.setFontSize(14);
    doc.text(t('results.tantricTitle').toUpperCase(), 20, y);
    doc.line(20, y + 2, 60, y + 2);
    
    y += 15;
    const omkin = results.omkin;
    const omkinStats = [
      { label: t('results.factors.essence'), val: omkin.essence },
      { label: t('results.factors.karma'), val: omkin.karma },
      { label: t('results.factors.gift'), val: omkin.gift },
      { label: t('results.factors.pastLives'), val: omkin.pastLives },
      { label: t('results.factors.mission'), val: omkin.mission }
    ];

    omkinStats.forEach(stat => {
      doc.setTextColor(200, 200, 200);
      doc.text(stat.label + ':', 25, y);
      doc.setTextColor(...goldColor);
      doc.setFontSize(14);
      doc.text(String(stat.val), 90, y);
      doc.setFontSize(10);
      y += 10;
    });

    // --- SECCIÓN 3: GEMATRÍA ---
    y += 10;
    doc.setTextColor(...goldColor);
    doc.setFontSize(14);
    doc.text(t('results.gematria.title').toUpperCase(), 20, y);
    doc.line(20, y + 2, 60, y + 2);

    y += 15;
    const gematria = results.gematria;
    const gematriaStats = [
      { label: t('results.gematria.chaldean'), val: gematria.chaldean },
      { label: t('results.gematria.simple'), val: gematria.simple },
      { label: t('results.gematria.hebrew'), val: gematria.hebrew }
    ];

    gematriaStats.forEach(stat => {
      doc.setTextColor(200, 200, 200);
      doc.text(stat.label + ':', 25, y);
      doc.setTextColor(...goldColor);
      doc.setFontSize(14);
      doc.text(String(stat.val), 90, y);
      doc.setFontSize(10);
      y += 10;
    });

    // Pie de Página
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    const dateStr = new Date().toLocaleDateString();
    doc.text(`Generado por ser33 - Manual del Destino | ${dateStr}`, 105, 285, { align: 'center' });

    // Guardar
    doc.save(`Manual_del_Destino_${userName.replace(/\s+/g, '_')}.pdf`);
  };

  return { generateManual };
}
