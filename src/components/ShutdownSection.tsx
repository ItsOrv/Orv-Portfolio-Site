import { motion } from 'framer-motion'

const ShutdownSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-terminal-bg">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-black bg-opacity-80 border border-terminal-fg p-8 rounded-lg text-center"
      >
        <div className="font-mono text-terminal-fg text-lg mb-4">
          $ sudo poweroff
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-terminal-fg text-md mb-8"
        >
          [System shutting down...]
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center justify-center mt-8"
        >
          <div className="w-24 h-24 rounded-lg bg-terminal-bg border-2 border-neon-green flex items-center justify-center text-neon-green text-3xl font-bold mb-2">
            orv.dev
          </div>
          <div className="text-terminal-fg text-xs">Scan QR to connect</div>
          {/* Placeholder for QR code, can be replaced with real QR */}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ShutdownSection 