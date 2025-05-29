export const formatTime = (time, is24Hour = false) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);

  if (is24Hour) {
    return `${hours}:${minutes}`;
  }

  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour % 12 || 12;
  return `${period} ${displayHour}:${minutes}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
};

export const createAudioPlayer = (soundId, volume, isMuted) => {
  const audio = new Audio(`/sounds/${soundId}.mp3`);
  audio.volume = isMuted ? 0 : volume;
  return audio;
};

export const AudioManager = {
  currentAudio: null,

  playSound(soundId, volume = 0.7, isLoop = false) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    const audio = createAudioPlayer(soundId, volume, false);
    audio.loop = isLoop;
    audio.play();
    this.currentAudio = audio;
    return audio;
  },

  stopSound() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  },

  updateVolume(volume) {
    if (this.currentAudio) {
      this.currentAudio.volume = volume;
    }
  },

  toggleMute(isMuted) {
    if (this.currentAudio) {
      this.currentAudio.volume = isMuted ? 0 : this.currentAudio.volume;
    }
  }
}; 