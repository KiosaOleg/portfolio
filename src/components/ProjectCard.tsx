'use client'

import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Github } from 'lucide-react'
import { Repository } from '@/lib/github'

interface ProjectCardProps {
  repo: Repository
  index: number
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

export default function ProjectCard({ repo, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)]/80 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--shadow-color)]/30"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
            {repo.name}
          </h3>
          <div className="flex gap-2">
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            {repo.homepage && (
              <motion.a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent-primary)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-[var(--text-secondary)]">
          {repo.description || 'No description available'}
        </p>

        <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: languageColors[repo.language] || '#6b7280',
                }}
              />
              <span>{repo.language}</span>
            </div>
          )}
          
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{repo.forks_count}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
