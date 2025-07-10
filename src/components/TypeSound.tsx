import { useRef } from 'react'

const SOUND_SRC = '/src/assets/sounds/digital_typing.wav'

export function useTypeSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = () => {
    if (!audioRef.current) {
      const audio = new Audio(SOUND_SRC)
      audio.volume = 0.3
      audioRef.current = audio
    }
    // Always clone for overlapping sounds
    const sound = audioRef.current.cloneNode() as HTMLAudioElement
    sound.volume = 0.3
    sound.play()
  }

  return play
}

// Optional: a component to preload the sound
export const TypeSoundPreload = () => (
  <audio src={SOUND_SRC} preload="auto" style={{ display: 'none' }} />
)
