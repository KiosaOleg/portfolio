"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Sparkles, Zap, Globe, Terminal } from "lucide-react";

const FloatingIcon = ({
  icon: Icon,
  delay,
  x,
  y,
}: {
  icon: any;
  delay: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute glass rounded-2xl p-4 glow"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
  >
    <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
  </motion.div>
);

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent-primary)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-secondary)]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-tertiary)]/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating icons */}
      <FloatingIcon icon={Code2} delay={0.8} x="15%" y="20%" />
      <FloatingIcon icon={Terminal} delay={1} x="80%" y="25%" />
      <FloatingIcon icon={Globe} delay={1.2} x="10%" y="70%" />
      <FloatingIcon icon={Zap} delay={1.4} x="85%" y="65%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass gradient-border mb-8 cursor-default"
          >
            <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              Available for hire
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-[var(--text-primary)]">Hi, I'm </span>
          <span className="gradient-text">Oleg Kiosa</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl sm:text-2xl lg:text-3xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting digital experiences with{" "}
          <span className="text-[var(--accent-primary)] font-semibold">
            passion
          </span>{" "}
          &{" "}
          <span className="text-[var(--accent-secondary)] font-semibold">
            precision
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl gradient-bg text-white font-semibold shadow-lg shadow-[var(--accent-primary)]/25 relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Code2 className="w-5 h-5" />
              View Projects
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-tertiary)]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass text-[var(--text-primary)] font-semibold gradient-border hover-lift"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get in Touch</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {["React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map(
            (tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="px-4 py-2 rounded-xl glass text-sm font-medium text-[var(--text-secondary)]"
              >
                {tech}
              </motion.span>
            ),
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#projects"
            className="flex flex-col items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Scroll
            </span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
