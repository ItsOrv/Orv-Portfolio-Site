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

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        autoPlay
        loop
        muted={muted}
        onPlay={handlePlay}
        preload="auto"
      />
      <button
        onClick={toggleMute}
        className={`mb-1 p-2 rounded-full bg-terminal-bg bg-opacity-70 border border-terminal-fg hover:bg-neon-green hover:text-black transition-colors shadow-lg`}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      <span className="text-xs text-terminal-fg bg-terminal-bg bg-opacity-60 px-2 py-1 rounded select-none">
        {ATTRIBUTION}
      </span>
    </div>
  )
}

export default BackgroundMusic 