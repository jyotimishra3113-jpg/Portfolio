import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { contactData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formState.name || !formState.email || !formState.message) {
      setStatus({
        state: 'error',
        message: 'Please complete all required fields.',
      })
      return
    }

    setStatus({ state: 'loading', message: 'Transmitting message...' })

    try {
      if (
        contactData.emailjs.publicKey &&
        contactData.emailjs.publicKey !== 'demo_key'
      ) {
        await emailjs.send(
          contactData.emailjs.serviceId,
          contactData.emailjs.templateId,
          {
            from_name: formState.name,
            from_email: formState.email,
            subject: formState.subject || 'Portfolio Inquiry',
            message: formState.message,
          },
          contactData.emailjs.publicKey
        )
      } else {
        await new Promise((res) => setTimeout(res, 800))
      }

      setStatus({
        state: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      })
      setFormState({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({
        state: 'error',
        message: 'Direct transmission failed. Please email directly at ' + contactData.email,
      })
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3 contact-animate">
          <p className="text-xs uppercase tracking-[0.3em] text-[#CCFF00] font-semibold">
            {contactData.eyebrow}
          </p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent max-w-4xl">
            {contactData.heading}{' '}
            <span className="font-['Playfair_Display'] italic font-normal text-white">
              {contactData.accentWord}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl">
            {contactData.description}
          </p>
        </div>

        {/* Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6 contact-animate">
            <div className="p-8 border border-white/10 bg-[#08080a] space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#9CA3AF] font-mono block mb-1">
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-lg sm:text-xl font-mono text-white hover:text-[#CCFF00] transition-colors break-all"
                >
                  {contactData.email}
                </a>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#9CA3AF] font-mono block mb-1">
                  DIRECT PHONE
                </span>
                <a
                  href={`tel:${contactData.phone}`}
                  className="text-lg sm:text-xl font-mono text-white hover:text-[#CCFF00] transition-colors"
                >
                  {contactData.phone}
                </a>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>LOCATION: {contactData.location}</span>
                <span className="flex items-center gap-2 text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                  Available
                </span>
              </div>
            </div>

            {/* Social / Profiles */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                Direct Handles &amp; Profiles
              </p>
              <div className="flex flex-wrap gap-3">
                {contactData.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 border border-white/10 bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-neutral-300 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                  >
                    {social.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 contact-animate">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 border border-white/10 bg-[#08080a] space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-mono text-neutral-400">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Recruiter / Collaborator"
                    className="w-full bg-[#050505] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-mono text-neutral-400">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="team@organization.com"
                    className="w-full bg-[#050505] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-mono text-neutral-400">
                  Subject / Role Inquiry
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Data Analytics / Full-Stack Developer Opportunity"
                  className="w-full bg-[#050505] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-mono text-neutral-400">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Share details regarding your opportunity, project, or schedule a conversation..."
                  className="w-full bg-[#050505] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CCFF00] transition-colors resize-none"
                />
              </div>

              {/* Status Message */}
              {status.message && (
                <div
                  className={`p-4 text-xs font-mono border ${
                    status.state === 'error'
                      ? 'border-red-500/50 bg-red-500/10 text-red-200'
                      : status.state === 'success'
                        ? 'border-[#CCFF00]/50 bg-[#CCFF00]/10 text-[#CCFF00]'
                        : 'border-white/20 text-neutral-300'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="w-full py-4 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {status.state === 'loading' ? 'Transmitting...' : 'Send Message ↗'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
