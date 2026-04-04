import { ref, onUnmounted } from 'vue';

/**
 * Motor de Sonificación Sagrada (Solfeggio & 432Hz)
 * Fuente de Verdad: Skill audio_processing.md y Agente audio_engineer.md
 */
export function useAudioSynthesis() {
  const audioCtx = ref(null);
  const masterGain = ref(null);
  const isPlaying = ref(false);

  // Mapeo Solfeggio Sagrado
  const SOLFEGGIO_MAP = {
    1: 174, // Seguridad / Reducción del dolor
    2: 285, // Influencia en campos energéticos
    3: 396, // Liberar miedo y culpa
    4: 417, // Facilitar el cambio
    5: 528, // Transformación y milagros (Reparación ADN)
    6: 639, // Conexión y relaciones
    7: 741, // Despertar la intuición
    8: 852, // Retorno al orden espiritual
    9: 963, // Sagrada Conexión Universal (Cierre)
  };

  const initAudio = () => {
    if (audioCtx.value) return;
    
    audioCtx.value = new (window.AudioContext || window.webkitAudioContext)();
    masterGain.value = audioCtx.value.createGain();
    masterGain.value.connect(audioCtx.value.destination);
    masterGain.value.gain.value = 0.5; // Seguridad de volumen
  };

  const playFrequency = (hz, duration = 3) => {
    if (!audioCtx.value) initAudio();
    
    if (audioCtx.value.state === 'suspended') {
      audioCtx.value.resume();
    }

    const osc = audioCtx.value.createOscillator();
    const gainNode = audioCtx.value.createGain();

    osc.type = 'sine'; // Tono puro espiritual
    osc.frequency.setValueAtTime(hz, audioCtx.value.currentTime);

    // Envolvente ADSR (Soft Attack/Release)
    gainNode.gain.setValueAtTime(0, audioCtx.value.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.value.currentTime + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.value.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(masterGain.value);

    osc.start();
    osc.stop(audioCtx.value.currentTime + duration);
    
    isPlaying.value = true;
    setTimeout(() => { isPlaying.value = false; }, duration * 1000);
  };

  const playLifeScore = (results) => {
    const lifePathHz = SOLFEGGIO_MAP[results.lifePath] || 432;
    playFrequency(lifePathHz, 5);
  };

  onUnmounted(() => {
    if (audioCtx.value) {
      audioCtx.value.close();
    }
  });

  return { initAudio, playFrequency, playLifeScore, isPlaying };
}
