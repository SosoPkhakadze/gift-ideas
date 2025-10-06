// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/30 dark:to-purple-950/20"></div>

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      </div>

      {/* Dynamic grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(99,102,241,0.05)_1.5px,transparent_1.5px)] bg-[size:80px_80px] dark:bg-[linear-gradient(rgba(139,92,246,0.08)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,0.08)_1.5px,transparent_1.5px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Floating orbs with improved animations */}
      <div className="relative h-full w-full">
        {/* Large purple orb - top left */}
        <motion.div
          animate={{
            x: ['-20%', '10%', '-15%', '-20%'],
            y: ['-20%', '5%', '15%', '-20%'],
            scale: [1, 1.15, 0.95, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-400/40 via-purple-400/30 to-pink-400/20 dark:from-indigo-600/25 dark:via-purple-600/20 dark:to-pink-600/15 blur-3xl"
        />

        {/* Medium blue orb - top right */}
        <motion.div
          animate={{
            x: ['90%', '70%', '95%', '90%'],
            y: ['-10%', '15%', '5%', '-10%'],
            scale: [1, 0.9, 1.1, 1],
            rotate: [0, -90, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-blue-400/35 via-cyan-400/25 to-indigo-400/20 dark:from-blue-600/20 dark:via-cyan-600/15 dark:to-indigo-600/12 blur-3xl"
        />

        {/* Large pink orb - bottom right */}
        <motion.div
          animate={{
            x: ['80%', '60%', '85%', '80%'],
            y: ['80%', '60%', '90%', '80%'],
            scale: [0.95, 1.1, 0.98, 0.95],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 5,
          }}
          className="absolute -bottom-1/4 -right-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-pink-400/35 via-rose-400/25 to-purple-400/20 dark:from-pink-600/18 dark:via-rose-600/12 dark:to-purple-600/10 blur-3xl"
        />

        {/* Medium amber orb - bottom left */}
        <motion.div
          animate={{
            x: ['10%', '25%', '5%', '10%'],
            y: ['85%', '65%', '90%', '85%'],
            scale: [1, 0.92, 1.05, 1],
            rotate: [0, -120, -240, -360],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 7,
          }}
          className="absolute -bottom-1/4 -left-1/4 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-amber-400/30 via-orange-400/20 to-yellow-400/15 dark:from-amber-600/15 dark:via-orange-600/10 dark:to-yellow-600/8 blur-3xl"
        />

        {/* Small accent orb - center */}
        <motion.div
          animate={{
            x: ['45%', '55%', '40%', '45%'],
            y: ['45%', '35%', '50%', '45%'],
            scale: [0.9, 1.15, 0.95, 0.9],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 10,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-violet-400/25 via-fuchsia-400/20 to-purple-400/15 dark:from-violet-600/12 dark:via-fuchsia-600/10 dark:to-purple-600/8 blur-3xl"
        />
      </div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Enhanced vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/40 dark:to-black/50"></div>
    </div>
  );
};