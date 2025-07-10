import { useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const MUSIC_SRC = '/src/assets/music/synthwave.mp3'
const ATTRIBUTION = 'Synthetic by | e s c p | https://www.escp.space'

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(false)

  const toggleMute = () => {
    setMuted((m) => {
      if (audioRef.current) {
        audioRef.current.muted = !m
      }
      return !m
    })
  }

  const handlePlay = () => {
    // setPlaying(true) // This line was removed as per the edit hint.
  }

  return null;
}

export default BackgroundMusic 