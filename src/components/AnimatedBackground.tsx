// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed left-0 top-0 -z-50 h-full w-full">
      {/* Base background color */}
      <div className="absolute inset-0 bg-white dark:bg-dark-mode-black"></div>

      {/* Container for the glowing blobs */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Each motion.div is a "blob" of light */}
        
        {/* Blob 1 */}
        <motion.div
          animate={{
            x: ['-20%', '30%', '0%', '-20%'],
            y: ['-30%', '0%', '40%', '-30%'],
            rotate: [0, 180, 360, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-primary-purple/40 opacity-70 blur-3xl filter"
        />

        {/* Blob 2 */}
        <motion.div
          animate={{
            x: ['80%', '40%', '100%', '80%'],
            y: ['20%', '-20%', '50%', '20%'],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 5, // Stagger the animations
          }}
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-purple-glow/30 opacity-70 blur-3xl filter"
        />

        {/* Blob 3 */}
        <motion.div
          animate={{
            x: ['10%', '60%', '20%', '10%'],
            y: ['70%', '30%', '100%', '70%'],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 10,
          }}
          className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-light-purple/30 dark:bg-light-purple/20 opacity-60 blur-3xl filter"
        />
      </div>
    </div>
  );
};