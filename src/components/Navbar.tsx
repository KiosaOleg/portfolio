"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && theme === "dark";
  const links = ["Projects", "About", "Contact"];
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="#"
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            OK.
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="relative h-10 w-[74px] rounded-full border border-[var(--glass-border)] bg-[var(--bg-secondary)]/70 p-1 text-[var(--text-secondary)] shadow-lg shadow-[var(--shadow-color)]/20 transition-colors hover:text-[var(--accent-primary)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <motion.span
                className="absolute inset-y-1 left-1 w-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-md"
                animate={{ x: isDark ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
              <span className="relative z-10 flex h-full items-center justify-between px-1.5">
                <Sun className={`h-4 w-4 transition-opacity ${isDark ? "opacity-50" : "opacity-100"}`} />
                <Moon className={`h-4 w-4 transition-opacity ${isDark ? "opacity-100" : "opacity-50"}`} />
              </span>
            </motion.button>

            <div className="w-px h-6 bg-[var(--glass-border)] mx-2" />

            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}

            <motion.button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2.5 rounded-xl glass text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        className="md:hidden overflow-hidden border-t border-[var(--glass-border)]"
      >
        <div className="px-4 pb-4 pt-3 flex flex-col gap-2 bg-[var(--bg-secondary)]/80 backdrop-blur-xl">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
