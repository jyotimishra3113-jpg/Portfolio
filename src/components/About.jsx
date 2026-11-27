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
      // Heading reveal
      gsap.fromTo(
        '.intro-heading',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Two-column cards reveal
      gsap.fromTo(
        '.intro-col-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Supporting details reveal
      gsap.fromTo(
        '.intro-details-reveal',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.intro-details-grid',
            start: 'top 85%',
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
        {/* Oversized INTRO Heading */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00] font-semibold font-mono">
            SECTION // 02
          </p>
          <h2 className="intro-heading text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent select-none">
            INTRO
          </h2>
        </div>

        {/* Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Clean Professional Portrait */}
          <div className="intro-col-reveal lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0a0a0d] p-4 sm:p-5 shadow-2xl">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black">
              {aboutPortraitSrc ? (
                <img
                  src={aboutPortraitSrc}
                  alt="Jyoti Mishra"
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#9CA3AF]">
                  <span className="text-xs uppercase tracking-widest font-mono">
                    Portrait
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Meta Pill under portrait */}
            <div className="pt-4 px-2 flex items-center justify-between text-xs text-[#9CA3AF] border-t border-white/5 mt-4">
              <span className="font-mono text-[11px] tracking-wider text-[#CCFF00]">
                DATA ANALYST
              </span>
              <a
                href={academy.url}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#CCFF00] font-semibold transition-colors flex items-center gap-1 font-mono text-[11px]"
              >
                {academy.name} ↗
              </a>
            </div>
          </div>

          {/* Right Column: Large Rounded Dark-Grey Introduction Card */}
          <div className="intro-col-reveal lg:col-span-7 rounded-3xl border border-white/10 bg-[#0e1015] p-8 sm:p-12 md:p-14 flex flex-col justify-between space-y-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#CCFF00]">
                  EDITORIAL STATEMENT
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  BENGALURU, IN
                </span>
              </div>

              {/* Exact Introduction Copy */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Hey, I'm Jyoti.
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                <p>
                  I am a BCA graduate with a strong interest in Data Analytics and Business Intelligence. I enjoy exploring datasets, identifying meaningful patterns, and transforming raw data into actionable insights.
                </p>
                <p>
                  Through hands-on projects, I have worked with Python, SQL, Excel, Power BI, and Tableau, developing skills in data analysis, statistical techniques, and interactive dashboard development. I am continuously learning and looking forward to applying my analytical skills to real-world challenges.
                </p>
              </div>
            </div>

            {/* Quick Skill Badges at bottom of card */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'DAX & Power Query', 'Statistical Analysis'].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-full bg-white/5 text-[11px] font-mono text-neutral-300 border border-white/5"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Preserved Educational Formation, Certifications & Metrics */}
        <div className="intro-details-grid pt-12 border-t border-white/10 space-y-12">
          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4">
            {aboutData.stats.map((stat) => (
              <div key={stat.label} className="intro-details-reveal p-5 rounded-2xl border border-white/5 bg-[#08080a] space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-[#9CA3AF]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Academic Formation & Credentials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Education Timeline */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#CCFF00] font-semibold font-mono">
                ACADEMIC FORMATION
              </h4>
              <div className="space-y-3">
                {aboutData.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="intro-details-reveal p-5 rounded-2xl border border-white/10 bg-[#08080a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-white uppercase tracking-tight">
                        {edu.degree}
                      </h5>
                      <p className="text-xs text-neutral-300 mt-0.5">{edu.institution}</p>
                      <p className="text-[11px] text-[#9CA3AF] mt-1">{edu.details}</p>
                    </div>
                    <span className="font-mono text-xs text-[#CCFF00] bg-white/5 px-3 py-1 rounded-full self-start sm:self-center border border-white/5 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials & Internship Box */}
            <div className="lg:col-span-5 space-y-6">
              {/* Certifications */}
              <div className="intro-details-reveal rounded-2xl border border-white/10 bg-[#08080a] p-6 space-y-4">
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

              {/* Internship Note */}
              <div className="intro-details-reveal p-6 rounded-2xl border-l-2 border-[#CCFF00] bg-[#0a0a0d] border border-white/5 space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#CCFF00] font-semibold font-mono">
                  Internship Experience
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
