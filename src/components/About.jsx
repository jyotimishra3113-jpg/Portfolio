import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutData, academy } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

// Load about portrait dynamically with fallback
const aboutImages = import.meta.glob('/src/assets/about/about-portrait.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const aboutPortraitSrc = Object.values(aboutImages)[0] || null

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 about-animate">
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00] font-semibold">
            {aboutData.eyebrow}
          </p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent max-w-4xl">
            {aboutData.heading}{' '}
            <span className="font-['Playfair_Display'] italic font-normal text-white">
              {aboutData.accentWord}
            </span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-5 about-animate flex flex-col items-center gap-6">
            <div className="relative w-full max-w-sm rounded-none border border-white/10 bg-[#09090b] p-3 overflow-hidden group">
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                {aboutPortraitSrc ? (
                  <img
                    src={aboutPortraitSrc}
                    alt="Jyoti Mishra"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#9CA3AF]">
                    <span className="text-xs uppercase tracking-widest">Portrait</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#CCFF00]" />
              </div>

              {/* Internship Tag */}
              <div className="pt-4 pb-2 px-2 flex items-center justify-between text-xs text-[#9CA3AF]">
                <span className="font-mono">INTERNSHIP</span>
                <a
                  href={academy.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#CCFF00] font-semibold transition-colors flex items-center gap-1 font-mono"
                >
                  {academy.name} ↗
                </a>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="w-full max-w-sm border border-white/10 bg-[#08080a] p-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#CCFF00] font-semibold font-mono block">
                CREDENTIALS &amp; CERTIFICATIONS
              </span>
              <div className="space-y-3">
                {aboutData.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3">
                    <span className="text-[#CCFF00] text-sm mt-0.5">✦</span>
                    <div>
                      <p className="text-xs font-semibold text-white tracking-wide">{cert.name}</p>
                      <p className="text-[11px] text-neutral-400 font-mono">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text, Experience, Stats & Education Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* Bio Paragraphs */}
            <div className="space-y-4 text-[#9CA3AF] text-sm sm:text-base leading-relaxed about-animate">
              {aboutData.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Internship Experience Note */}
            <div className="p-6 border-l-2 border-[#CCFF00] bg-white/[0.02] space-y-2 about-animate">
              <p className="text-xs uppercase tracking-widest text-[#CCFF00] font-semibold font-mono">
                Internship Experience
              </p>
              <p className="text-xs sm:text-sm text-neutral-300">
                Currently interning at{' '}
                <a
                  href={academy.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline hover:text-[#CCFF00] transition-colors"
                >
                  {academy.name}
                </a>
                , gaining practical experience in data analysis, business intelligence workflows, and real-world project development.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 about-animate">
              {aboutData.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs uppercase tracking-wider text-[#9CA3AF]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 about-animate">
              {aboutData.highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-5 border border-white/5 bg-[#0a0a0c] hover:border-[#CCFF00]/40 transition-colors duration-300 space-y-2"
                >
                  <h3 className="text-xs uppercase tracking-wider font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Education Timeline */}
            <div className="space-y-4 pt-4 border-t border-white/10 about-animate">
              <h3 className="text-xs uppercase tracking-[0.25em] text-[#CCFF00] font-semibold font-mono">
                ACADEMIC FORMATION
              </h3>
              <div className="space-y-4">
                {aboutData.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="p-5 border border-white/10 bg-[#08080a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/25 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-neutral-300 mt-0.5">{edu.institution}</p>
                      <p className="text-[11px] text-[#9CA3AF] mt-1">{edu.details}</p>
                    </div>
                    <span className="font-mono text-xs text-[#CCFF00] bg-white/5 px-3 py-1 self-start sm:self-center border border-white/5 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
