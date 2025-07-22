const SOUND_SRC = '/src/assets/sounds/digital_typing.wav'

// Component to preload the sound
const TypeSoundPreload = () => (
  <audio src={SOUND_SRC} preload="auto" style={{ display: 'none' }} />
)

export default TypeSoundPreload
