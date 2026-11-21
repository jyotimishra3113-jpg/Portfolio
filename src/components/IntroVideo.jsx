import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function IntroVideo() {
  const sectionRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.intro-video-wrap', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative bg-[#050505] text-white py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00] font-semibold font-mono">
              DIGITAL REEL // 00
            </p>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              ENGINEERING IN{' '}
              <span className="font-['Playfair_Display'] italic font-normal text-white">
                Motion
              </span>
            </h2>
          </div>
          <p className="text-xs text-[#9CA3AF] max-w-md font-mono">
            Interactive showreel demonstrating data pipelines, analytical dashboard models, and reactive frontend architectures.
          </p>
        </div>

        {/* Video / Showcase Canvas */}
        <div className="intro-video-wrap relative aspect-[16/9] w-full max-w-5xl mx-auto border border-white/10 bg-[#08080a] overflow-hidden group">
          {isPlaying ? (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center p-8 font-mono text-xs text-neutral-400 space-y-4">
              <div className="w-full max-w-2xl bg-[#0d0e12] border border-white/10 p-6 rounded text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-neutral-500">
                  <span className="text-[#CCFF00]">● REEL_EXECUTION.sh</span>
                  <span>STATUS: RUNNING</span>
                </div>
                <p className="text-[#CCFF00]">&gt; Initializing GlobalAKJobs recruitment engine...</p>
                <p className="text-white">&gt; Authenticating Guest &amp; Security modules [OK]</p>
                <p className="text-[#CCFF00]">&gt; Loading smartphone dataset (Python Pandas EDA)...</p>
                <p className="text-white">&gt; Computing Pearson correlations &amp; hypothesis tests [P &lt; 0.05]</p>
                <p className="text-[#CCFF00]">&gt; Rendering Power BI DAX revenue measures [KPI: $2.48M]</p>
                <p className="text-neutral-400">&gt; Mounting React 19 + GSAP UI layer...</p>
                <p className="text-[#CCFF00] font-bold">&gt;&gt; Ready for production deployment.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="px-4 py-2 border border-white/20 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors uppercase tracking-wider text-[11px]"
              >
                Close Showcase
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0e1014] to-[#050505] p-8 text-center cursor-pointer" onClick={() => setIsPlaying(true)}>
              {/* Animated Radar / Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              
              {/* Play Button */}
              <div className="relative w-20 h-20 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center group-hover:border-[#CCFF00] group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <span className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-[#CCFF00] ml-1" />
                <div className="absolute inset-0 rounded-full border border-[#CCFF00]/30 animate-ping" />
              </div>

              <div className="mt-6 space-y-1 relative z-10">
                <p className="text-xs uppercase tracking-widest text-white font-bold">
                  LAUNCH INTERACTIVE REEL
                </p>
                <p className="text-[11px] text-[#9CA3AF] font-mono">
                  Click to inspect live pipeline execution &amp; code flow
                </p>
              </div>

              <div className="absolute bottom-4 left-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                TAP ACADEMY // PRODUCTION LABS
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
