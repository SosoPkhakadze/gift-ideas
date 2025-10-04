// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed left-0 top-0 -z-50 h-full w-full">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/10"></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]"></div>

      {/* Container for the glowing orbs */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Orb 1 - Purple gradient */}
        <motion.div
          animate={{
            x: ['-10%', '15%', '-5%', '-10%'],
            y: ['-15%', '5%', '20%', '-15%'],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/30 dark:from-purple-600/20 dark:to-indigo-600/20 opacity-60 blur-3xl"
        />

        {/* Orb 2 - Blue gradient */}
        <motion.div
          animate={{
            x: ['85%', '60%', '90%', '85%'],
            y: ['10%', '-10%', '30%', '10%'],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-blue-400/25 to-cyan-400/25 dark:from-blue-600/15 dark:to-cyan-600/15 opacity-60 blur-3xl"
        />

        {/* Orb 3 - Pink accent */}
        <motion.div
          animate={{
            x: ['40%', '55%', '35%', '40%'],
            y: ['60%', '40%', '70%', '60%'],
            scale: [0.95, 1.05, 0.98, 0.95],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 6,
          }}
          className="absolute bottom-1/3 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-400/20 dark:from-pink-600/12 dark:to-purple-600/12 opacity-50 blur-3xl"
        />

        {/* Orb 4 - Amber accent for warmth */}
        <motion.div
          animate={{
            x: ['20%', '30%', '15%', '20%'],
            y: ['80%', '60%', '85%', '80%'],
            scale: [1, 0.95, 1.02, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 9,
          }}
          className="absolute bottom-0 left-1/4 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-amber-400/15 to-orange-400/15 dark:from-amber-600/10 dark:to-orange-600/10 opacity-40 blur-3xl"
        />
      </div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/20 dark:to-black/30"></div>
    </div>
  );
};