import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { personalInfo, navLinks, skillsTicker } from '../data/portfolioData'

// Explicitly load transparent PNG portrait first, with fallback to other formats
const heroPngImages = import.meta.glob('/src/assets/hero/hero-portrait.png', {
  eager: true,
  import: 'default',
})
const heroFallbackImages = import.meta.glob('/src/assets/hero/hero-portrait.{webp,jpg,jpeg}', {
  eager: true,
  import: 'default',
})
const heroPortraitSrc = Object.values(heroPngImages)[0] || Object.values(heroFallbackImages)[0] || null

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-top-bar', { opacity: 0, y: -20, duration: 0.8, delay: 0.1 })
        .from('.hero-portfolio-heading', {
          opacity: 0,
          scale: 0.96,
          y: 25,
          duration: 1.2,
        }, '-=0.5')
        .from('.hero-portrait-layer', {
          opacity: 0,
          y: 35,
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
      <header className="hero-top-bar max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between z-20 pb-4">
        {/* Prominent Name Identity */}
        <a
          href="#home"
          className="flex items-center gap-5 sm:gap-6 group"
        >
          <span className="text-lg sm:text-xl font-bold uppercase tracking-[0.25em] text-white group-hover:text-[#CCFF00] transition-colors whitespace-nowrap">
            {personalInfo.name}
          </span>
          <span className="text-white/25 hidden xl:inline text-xs">•</span>
          <div className="hidden xl:flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] whitespace-nowrap">
              {personalInfo.availability}
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs uppercase tracking-wider text-[#9CA3AF]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#CCFF00] transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Central Cinematic Stage */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-6 md:px-12 my-auto py-4 sm:py-6">
        {/* Balanced "PORTFOLIO" Heading (Reduced by ~12% for optimal balance) */}
        <div className="hero-portfolio-heading w-full text-center relative z-0 pointer-events-none">
          <h1 className="text-[9.5vw] sm:text-[10.5vw] lg:text-[11vw] font-black uppercase tracking-tight leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent drop-shadow-2xl opacity-90">
            PORTFOLIO
          </h1>
        </div>

        {/* Prominent Full-Body Portrait Overlapping on the Right */}
        <div className="hero-portrait-layer absolute inset-0 flex items-end justify-center lg:justify-end z-10 pointer-events-none pr-0 lg:pr-12 xl:pr-20">
          <div className="relative h-[60vh] sm:h-[66vh] lg:h-[72vh] max-h-[630px] aspect-[682/1024] flex items-end justify-center translate-y-[35px]">
            {heroPortraitSrc ? (
              <img
                src={heroPortraitSrc}
                alt={personalInfo.name}
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
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

      {/* Bottom Bar: Bottom-Left Specialization & Bottom-Right Pill Button + Arrow */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-8 md:pb-10 pt-2 z-20">
        {/* Bottom Left: Data Analyst Typography (Consistent Bold Sans-Serif) */}
        <div className="hero-bottom-left space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9CA3AF]">
            ROLE / SPECIALIZATION
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            DATA ANALYST
          </h2>
        </div>

        {/* Bottom Right: Circular Arrow Icon + Outlined Pill Contact Button */}
        <div className="hero-bottom-right flex items-center gap-4">
          <a
            href="#about"
            aria-label="Scroll to introduction"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#CCFF00] hover:text-[#CCFF00] hover:scale-105 transition-all duration-300 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7l10 10m0 0V9m0 8H9"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-white/30 text-xs font-semibold uppercase tracking-wider text-white hover:border-[#CCFF00] hover:text-[#CCFF00] hover:bg-[#CCFF00]/5 transition-all duration-300"
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
