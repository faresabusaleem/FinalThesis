let currentPitch = 1.0;

export function playClickTone() {
  const audio = new Audio('/upperecehelon.mp3');
  audio.volume = 0.6;
  audio.playbackRate = currentPitch;
  audio.play().catch((err) => console.warn('Audio play was blocked:', err));
  currentPitch += 0.05;
}

export function resetPitch() {
  currentPitch = 1.0;
}
