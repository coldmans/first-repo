// Web Audio API로 간단한 사운드 이펙트 생성

let audioContext = null;

// 오디오 컨텍스트 초기화
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// 룰렛 회전 사운드 (드르륵)
export const playSpinSound = () => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (err) {
    console.log('Sound not supported', err);
  }
};

// 결과 발표 사운드 (짜잔!)
export const playResultSound = () => {
  try {
    const ctx = getAudioContext();

    // 첫 번째 음
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    osc1.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.5);

    // 두 번째 음 (화음)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.2); // C6

    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);

    osc2.start(ctx.currentTime + 0.2);
    osc2.stop(ctx.currentTime + 0.7);
  } catch (err) {
    console.log('Sound not supported', err);
  }
};

// 버튼 클릭 사운드
export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (err) {
    console.log('Sound not supported', err);
  }
};

// 룰렛 회전 중 연속 사운드
export const playSpinningLoop = () => {
  const interval = setInterval(() => {
    playSpinSound();
  }, 100);

  return () => clearInterval(interval);
};
