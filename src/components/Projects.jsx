import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

// Load all project assets dynamically
const projectAssetMap = import.meta.glob('/src/assets/projects/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

function getProjectImage(projectId) {
  for (const [path, asset] of Object.entries(projectAssetMap)) {
    if (path.includes(projectId)) {
      return asset
    }
  }
  return null
}

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.project-item')

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              once: true, // play-and-stay: never disappear on scroll back
            },
          }
        )
      })

      // Immediate refresh to ensure calculation accuracy
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00] font-semibold font-mono">
            SELECTED WORKS &amp; EXPERIMENTS
          </p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            FEATURED ARCHIVES{' '}
            <span className="font-['Playfair_Display'] italic font-normal text-white">
              Portfolio
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl">
            A curation of exploratory data analysis models, interactive Power BI dashboards, and web development applications.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projectsData.map((project) => {
            const imgSrc = getProjectImage(project.id)

            return (
              <div
                key={project.id}
                className="project-item group border border-white/10 bg-[#08080a] hover:border-[#CCFF00]/40 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 overflow-hidden opacity-100"
              >
                {/* Visual Preview */}
                <div className="lg:col-span-7 relative aspect-video bg-neutral-950 overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-neutral-600">
                      <span className="text-xs font-mono uppercase tracking-widest">
                        Preview Unavailable
                      </span>
                    </div>
                  )}

                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-wider text-[#CCFF00]">
                    {project.category}
                  </div>
                </div>

                {/* Project Details */}
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                      <span>/{project.number}</span>
                      <span className="text-neutral-400">{project.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#CCFF00] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 text-neutral-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                    {project.buttons ? (
                      project.buttons.map((btn) => (
                        <a
                          key={btn.label}
                          href={btn.url}
                          target="_blank"
                          rel="noreferrer"
                          className={
                            btn.primary
                              ? "px-5 py-2.5 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                              : "px-5 py-2.5 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                          }
                        >
                          {btn.label}
                        </a>
                      ))
                    ) : (
                      <>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                        >
                          Live Demo ↗
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                        >
                          Source Code
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
