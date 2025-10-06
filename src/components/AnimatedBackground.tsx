// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden">
      {/* Enhanced Day Mode: Vibrant gradient background with warm tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-100 dark:from-gray-950 dark:via-indigo-950/30 dark:to-purple-950/20"></div>

      {/* Day Mode: Colorful mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(236,72,153,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      </div>

      {/* Dynamic grid pattern - more visible in day mode */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.08)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(99,102,241,0.08)_1.5px,transparent_1.5px)] bg-[size:80px_80px] dark:bg-[linear-gradient(rgba(139,92,246,0.08)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,0.08)_1.5px,transparent_1.5px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Floating orbs with improved day mode colors */}
      <div className="relative h-full w-full">
        {/* Orb 1 - Warm amber/orange for day mode */}
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
          className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-300/50 via-orange-300/40 to-rose-300/30 dark:from-indigo-600/25 dark:via-purple-600/20 dark:to-pink-600/15 blur-3xl"
        />

        {/* Orb 2 - Rose/pink for day mode */}
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
          className="absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-rose-300/45 via-pink-300/35 to-fuchsia-300/25 dark:from-blue-600/20 dark:via-cyan-600/15 dark:to-indigo-600/12 blur-3xl"
        />

        {/* Orb 3 - Indigo/blue for contrast */}
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
          className="absolute -bottom-1/4 -right-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-indigo-300/45 via-blue-300/35 to-cyan-300/25 dark:from-pink-600/18 dark:via-rose-600/12 dark:to-purple-600/10 blur-3xl"
        />

        {/* Orb 4 - Emerald/green for freshness */}
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
          className="absolute -bottom-1/4 -left-1/4 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-emerald-300/35 via-green-300/25 to-lime-300/20 dark:from-amber-600/15 dark:via-orange-600/10 dark:to-yellow-600/8 blur-3xl"
        />

        {/* Orb 5 - Violet/purple center accent */}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-violet-300/35 via-purple-300/25 to-fuchsia-300/20 dark:from-violet-600/12 dark:via-fuchsia-600/10 dark:to-purple-600/8 blur-3xl"
        />
      </div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Enhanced vignette - lighter in day mode */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50 dark:to-black/50"></div>
      
      {/* Day mode sparkle effect */}
      <div className="absolute inset-0 opacity-30 dark:opacity-0">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[30%] left-[25%] w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] right-[35%] w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};