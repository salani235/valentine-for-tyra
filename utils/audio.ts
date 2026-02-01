
export const playSound = (url: string, volume: number = 0.5) => {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play().catch(err => console.log("Audio play blocked or failed:", err));
};

export const SOUNDS = {
  BOING: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Funny bounce
  DING: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',  // Sweet click
  SEXY: 'https://www.myinstants.com/media/sounds/careless-whisper-sax.mp3',   // Careless Whisper Sax
  SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' // Achievement
};
