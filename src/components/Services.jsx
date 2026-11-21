import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { servicesData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card')

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          }
        )
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00] font-semibold font-mono">
            CORE SERVICES &amp; EXPERTISE
          </p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            TECHNICAL EXPERTISE &amp;{' '}
            <span className="font-['Playfair_Display'] italic font-normal text-white">
              Solutions
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl">
            Delivering data-driven analytics, interactive Power BI dashboards, and automated data pipelines.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesData.map((service) => (
            <div
              key={service.number}
              className="service-card group relative p-8 md:p-10 border border-white/10 bg-[#08080a] hover:border-[#CCFF00]/50 transition-all duration-300 flex flex-col justify-between space-y-6 opacity-100"
            >
              {/* Top Row: Index & Accent */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="font-mono text-2xl font-bold text-neutral-600 group-hover:text-[#CCFF00] transition-colors">
                  /{service.number}
                </span>
                <span className="text-xs font-['Playfair_Display'] italic text-neutral-400 group-hover:text-white transition-colors">
                  {service.accent}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#CCFF00] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 text-neutral-300 border border-white/5 group-hover:border-[#CCFF00]/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom decorative line */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
