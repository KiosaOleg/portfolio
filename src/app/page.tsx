import { getRepos } from '@/lib/github'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const repos = await getRepos()

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              My Projects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
              Here are some of my recent projects from GitHub. These are automatically updated from my repositories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              About Me
            </h2>
            <p className="mb-6 text-lg text-[var(--text-secondary)]">
              I'm a passionate developer who loves building things that live on the internet. 
              I enjoy creating beautiful, functional, and user-friendly applications.
            </p>
            <p className="mb-6 text-lg text-[var(--text-secondary)]">
              This portfolio is built with Next.js, TypeScript, Tailwind CSS, and the GitHub API. 
              It automatically fetches my latest repositories and updates every hour.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[var(--glass-border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[var(--bg-tertiary)] text-[var(--text-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Get In Touch
          </h2>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, 
            feel free to reach out!
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-8 py-4 font-medium text-white shadow-lg shadow-[var(--accent-primary)]/30 transition-transform hover:-translate-y-0.5"
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-tertiary)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[var(--text-tertiary)]">
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS.{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
