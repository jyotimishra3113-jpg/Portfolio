import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo, navLinks, skillsTicker } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

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
      // Entrance timeline for hero elements
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
        .from('.hero-nav', { opacity: 0, y: -20, duration: 0.8 }, '-=0.6')
        .from('.hero-title-line', {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 1,
        }, '-=0.5')
        .from('.hero-bio', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { opacity: 0, scale: 0.95, duration: 0.8 }, '-=0.6')
        .from('.hero-image-wrap', { opacity: 0, y: 30, duration: 1.2 }, '-=0.8')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between overflow-hidden pt-6 pb-0"
    >
      {/* Top Bar / Anchor Navigation */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
        <div className="hero-badge flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-[#9CA3AF] font-medium">
            {personalInfo.availability}
          </span>
        </div>

        {/* Minimal Anchor Links */}
        <nav className="hero-nav flex items-center gap-6 text-xs uppercase tracking-wider text-[#9CA3AF]">
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
      </div>

      {/* Main Hero Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12 lg:py-16 my-auto">
        {/* Left Column: Huge Editorial Headings & Bio */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <p className="hero-title-line text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#CCFF00]">
              {personalInfo.title}
            </p>
            <h1 className="hero-title-line text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9] bg-gradient-to-b from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent">
              {personalInfo.name.split(' ')[0]}
              <br />
              {personalInfo.name.split(' ')[1]}
            </h1>
            <p className="hero-title-line text-2xl sm:text-3xl font-light text-[#9CA3AF] mt-2">
              <span className="font-['Playfair_Display'] italic font-normal text-white">
                Data
              </span>{' '}
              Analytics &amp; Software Engineering
            </p>
          </div>

          <p className="hero-bio text-sm sm:text-base text-[#9CA3AF] max-w-xl leading-relaxed">
            {personalInfo.bio}
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 bg-[#CCFF00] text-black font-semibold text-xs uppercase tracking-wider rounded-none hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(204,255,0,0.25)]"
            >
              View Featured Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-none hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300"
            >
              Initiate Contact
            </a>
          </div>
        </div>

        {/* Right Column: Hero Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
          <div className="hero-image-wrap relative w-full max-w-sm sm:max-w-md aspect-[3/4] flex items-center justify-center">
            {/* Subtle glow behind photo */}
            <div className="absolute inset-0 bg-radial from-[#CCFF00]/15 to-transparent rounded-full blur-3xl -z-10" />

            {heroPortraitSrc ? (
              <img
                src={heroPortraitSrc}
                alt={personalInfo.name}
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            ) : (
              <div className="w-full h-full border border-white/10 bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
                <span className="w-12 h-12 rounded-full border border-[#CCFF00] flex items-center justify-center text-[#CCFF00] font-bold text-lg mb-3">
                  JM
                </span>
                <p className="text-xs text-[#9CA3AF] uppercase tracking-widest">
                  Portrait Placeholder
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skills Infinite Ticker */}
      <div className="w-full border-y border-white/10 bg-[#070707] py-3 overflow-hidden select-none">
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
