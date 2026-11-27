import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { personalInfo, navLinks, skillsTicker } from '../data/portfolioData'

// Load hero portrait dynamically with fallback
const heroImages = import.meta.glob('/src/assets/hero/hero-portrait.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const heroPortraitSrc = Object.values(heroImages)[0] || null

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-nav-bar', { opacity: 0, y: -20, duration: 0.8, delay: 0.1 })
        .from('.hero-portfolio-title', {
          opacity: 0,
          scale: 0.96,
          y: 30,
          duration: 1.2,
        }, '-=0.5')
        .from('.hero-portrait-layer', {
          opacity: 0,
          y: 40,
          duration: 1.2,
        }, '-=0.9')
        .from('.hero-bottom-left', {
          opacity: 0,
          y: 20,
          duration: 0.8,
        }, '-=0.7')
        .from('.hero-bottom-right', {
          opacity: 0,
          y: 20,
          duration: 0.8,
        }, '-=0.7')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between overflow-hidden pt-6 pb-0 select-none"
    >
      {/* Top Bar / Navigation */}
      <header className="hero-nav-bar max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between z-20">
        <a
          href="#home"
          className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-white hover:text-[#CCFF00] transition-colors"
        >
          {personalInfo.name}
        </a>

        <nav className="flex items-center gap-6 text-xs uppercase tracking-wider text-[#9CA3AF]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#CCFF00] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Central Cinematic Stage */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-6 md:px-12 my-auto">
        {/* Massive Centered "PORTFOLIO" Heading */}
        <div className="hero-portfolio-title w-full text-center relative z-0 pointer-events-none">
          <h1 className="text-[17vw] sm:text-[18vw] font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-700 bg-clip-text text-transparent drop-shadow-2xl opacity-90">
            PORTFOLIO
          </h1>
        </div>

        {/* Overlapping Foreground Portrait positioned towards the right */}
        <div className="hero-portrait-layer absolute inset-0 flex items-end justify-center lg:justify-end z-10 pointer-events-none pr-0 lg:pr-12">
          <div className="relative h-[65vh] sm:h-[75vh] max-h-[700px] aspect-[3/4] flex items-end justify-center">
            {heroPortraitSrc ? (
              <img
                src={heroPortraitSrc}
                alt={personalInfo.name}
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
              />
            ) : (
              <div className="w-full h-full border border-white/10 bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
                <span className="w-12 h-12 rounded-full border border-[#CCFF00] flex items-center justify-center text-[#CCFF00] font-bold text-lg mb-3">
                  JM
                </span>
                <p className="text-xs text-[#9CA3AF] uppercase tracking-widest">
                  Portrait
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Bottom-Left Title & Bottom-Right Pill Button + Arrow */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-10 z-20">
        {/* Bottom Left: Data Analyst Typography with Italic Serif Accent */}
        <div className="hero-bottom-left space-y-1">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#9CA3AF]">
            ROLE / SPECIALIZATION
          </p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              DATA
            </span>
            <span className="font-['Playfair_Display'] italic font-normal text-3xl sm:text-4xl md:text-5xl text-white">
              Analyst
            </span>
          </div>
        </div>

        {/* Bottom Right: Circular Arrow Icon + Outlined Pill Contact Button */}
        <div className="hero-bottom-right flex items-center gap-4">
          <a
            href="#about"
            aria-label="Scroll to introduction"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300 group"
          >
            <span className="transform group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-sm">
              ↘
            </span>
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full border border-white/30 text-xs font-semibold uppercase tracking-wider text-white hover:border-[#CCFF00] hover:text-[#CCFF00] hover:bg-[#CCFF00]/5 transition-all duration-300"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Seamless Skills Infinite Ticker */}
      <div className="w-full border-y border-white/10 bg-[#070707] py-3 overflow-hidden select-none z-20">
        <div className="flex w-max marquee-left gap-8 text-xs font-mono tracking-widest uppercase text-[#9CA3AF]">
          {[...skillsTicker, ...skillsTicker].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="hover:text-[#CCFF00] transition-colors">{skill}</span>
              <span className="text-[#CCFF00]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
