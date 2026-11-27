import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { contactData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  // Form input values
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Validation errors per field
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Track which fields have been focused and blurred
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })

  // Submission status ('idle' | 'loading' | 'success' | 'error')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  // GSAP Entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-animate',
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

  // Field validation rules
  const validateField = (fieldName, value) => {
    const trimmed = (value || '').trim()
    switch (fieldName) {
      case 'name':
        if (!trimmed) return 'Your name is required.'
        if (trimmed.length < 2) return 'Name must be at least 2 characters.'
        return ''
      case 'email':
        if (!trimmed) return 'Your email address is required.'
        // Standard email regex format
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
          return 'Please enter a valid email address (e.g. name@domain.com).'
        }
        return ''
      case 'subject':
        if (!trimmed) return 'Subject / Role inquiry is required.'
        if (trimmed.length < 3) return 'Subject must be at least 3 characters.'
        return ''
      case 'message':
        if (!trimmed) return 'Message is required.'
        if (trimmed.length < 10) return 'Message must be at least 10 characters long.'
        return ''
      default:
        return ''
    }
  }

  // Handle real-time input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Re-validate if field was already blurred
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }

    // Reset status banner on user typing
    if (status.state !== 'idle' && status.state !== 'loading') {
      setStatus({ state: 'idle', message: '' })
    }
  }

  // Handle field blur for inline validation
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  // Validate all fields before sending
  const validateForm = () => {
    const nameErr = validateField('name', formState.name)
    const emailErr = validateField('email', formState.email)
    const subjectErr = validateField('subject', formState.subject)
    const messageErr = validateField('message', formState.message)

    setErrors({
      name: nameErr,
      email: emailErr,
      subject: subjectErr,
      message: messageErr,
    })

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    })

    return !nameErr && !emailErr && !subjectErr && !messageErr
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prevent duplicate concurrent submissions
    if (status.state === 'loading') return

    // Run complete validation
    if (!validateForm()) {
      setStatus({
        state: 'error',
        message: 'Please complete all required fields with valid information.',
      })
      return
    }

    setStatus({ state: 'loading', message: 'Transmitting inquiry...' })

    // Resolve EmailJS configuration from environment variables or portfolioData
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || contactData.emailjs?.serviceId
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || contactData.emailjs?.templateId
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || contactData.emailjs?.publicKey
    const recipientEmail =
      import.meta.env.VITE_RECIPIENT_EMAIL ||
      contactData.emailjs?.recipientEmail ||
      contactData.email ||
      'jyotimishra3113@gmail.com'

    try {
      let isDelivered = false

      // Strategy 1: Attempt EmailJS delivery if valid environment credentials are provided
      if (serviceId && templateId && publicKey) {
        try {
          const emailJsResponse = await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: formState.name.trim(),
              from_email: formState.email.trim(),
              reply_to: formState.email.trim(),
              to_email: recipientEmail,
              recipient_email: recipientEmail,
              subject: formState.subject.trim(),
              message: formState.message.trim(),
              submission_date: new Date().toLocaleString('en-IN', {
                dateStyle: 'full',
                timeStyle: 'short',
              }),
            },
            publicKey
          )

          if (emailJsResponse && (emailJsResponse.status === 200 || emailJsResponse.text === 'OK')) {
            isDelivered = true
          }
        } catch (emailJsErr) {
          console.warn('EmailJS attempt failed, routing through direct delivery gateway:', emailJsErr)
        }
      }

      // Strategy 2: Direct production email delivery gateway to recipientEmail (zero-configuration)
      if (!isDelivered) {
        const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            _replyto: formState.email.trim(),
            _subject: `Portfolio Inquiry: ${formState.subject.trim()}`,
            message: formState.message.trim(),
            submission_date: new Date().toLocaleString('en-IN', {
              dateStyle: 'full',
              timeStyle: 'short',
            }),
            _captcha: 'false',
            _template: 'table',
          }),
        })

        const result = await response.json()

        if (response.ok && (result.success === 'true' || result.success === true)) {
          isDelivered = true
        } else if (result?.message && result.message.includes('Activation')) {
          // One-time activation required by FormSubmit
          setStatus({
            state: 'success',
            message: `Almost done! An activation email was sent to ${recipientEmail}. Please check your Gmail inbox and click 'Activate Form' once to activate direct delivery.`,
          })
          setFormState({ name: '', email: '', subject: '', message: '' })
          setTouched({ name: false, email: false, subject: false, message: false })
          setErrors({ name: '', email: '', subject: '', message: '' })
          return
        } else {
          throw new Error(result?.message || 'Form delivery service rejected the request.')
        }
      }

      // ONLY report success if the email provider confirms delivery
      if (isDelivered) {
        setStatus({
          state: 'success',
          message: `Inquiry successfully delivered to ${recipientEmail}! Thank you for reaching out, ${formState.name.trim()}. Jyoti will respond to ${formState.email.trim()} shortly.`,
        })

        // Clear the form only after confirmed successful delivery
        setFormState({ name: '', email: '', subject: '', message: '' })
        setTouched({ name: false, email: false, subject: false, message: false })
        setErrors({ name: '', email: '', subject: '', message: '' })
      }
    } catch (err) {
      console.error('Email transmission error:', err)
      const errorDetail = err?.text || err?.message || 'Transmission failed.'
      setStatus({
        state: 'error',
        message: `Delivery failed (${errorDetail}). You can also send directly using the link below.`,
      })
      // Form content is intentionally PRESERVED on error so user does not lose their typed input
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
              noValidate
              className="p-8 lg:p-10 border border-white/10 bg-[#08080a] space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Your Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-wider font-mono text-neutral-400"
                  >
                    Your Name <span className="text-[#CCFF00]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(touched.name && errors.name)}
                    placeholder="Recruiter / Collaborator"
                    className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                      touched.name && errors.name
                        ? 'border-red-500/60 focus:border-red-400 bg-red-950/10'
                        : 'border-white/15 focus:border-[#CCFF00]'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                {/* Your Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs uppercase tracking-wider font-mono text-neutral-400"
                  >
                    Your Email <span className="text-[#CCFF00]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(touched.email && errors.email)}
                    placeholder="team@organization.com"
                    className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                      touched.email && errors.email
                        ? 'border-red-500/60 focus:border-red-400 bg-red-950/10'
                        : 'border-white/15 focus:border-[#CCFF00]'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject / Role Inquiry */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs uppercase tracking-wider font-mono text-neutral-400"
                >
                  Subject / Role Inquiry <span className="text-[#CCFF00]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(touched.subject && errors.subject)}
                  placeholder="Data Analytics / Full-Stack Developer Opportunity"
                  className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                    touched.subject && errors.subject
                      ? 'border-red-500/60 focus:border-red-400 bg-red-950/10'
                      : 'border-white/15 focus:border-[#CCFF00]'
                  }`}
                />
                {touched.subject && errors.subject && (
                  <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-xs uppercase tracking-wider font-mono text-neutral-400"
                >
                  Message <span className="text-[#CCFF00]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(touched.message && errors.message)}
                  placeholder="Share details regarding your opportunity, project, or schedule a conversation..."
                  className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none ${
                    touched.message && errors.message
                      ? 'border-red-500/60 focus:border-red-400 bg-red-950/10'
                      : 'border-white/15 focus:border-[#CCFF00]'
                  }`}
                />
                {touched.message && errors.message && (
                  <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.message}
                  </p>
                )}
              </div>

              {/* Status Message Banner */}
              {status.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`p-4 text-xs font-mono border transition-all duration-300 flex items-start gap-3 ${
                    status.state === 'error'
                      ? 'border-red-500/50 bg-red-500/10 text-red-200'
                      : status.state === 'success'
                        ? 'border-[#CCFF00]/50 bg-[#CCFF00]/10 text-[#CCFF00]'
                        : 'border-white/20 bg-white/5 text-neutral-300'
                  }`}
                >
                  <span className="font-bold text-sm leading-none mt-0.5">
                    {status.state === 'error' ? '✕' : status.state === 'success' ? '✓' : 'ℹ'}
                  </span>
                  <div className="flex-1 leading-relaxed">
                    <p>{status.message}</p>
                    {status.state === 'error' && (formState.name || formState.email) && (
                      <a
                        href={`mailto:${contactData.email}?subject=${encodeURIComponent(
                          formState.subject || 'Portfolio Inquiry from ' + formState.name
                        )}&body=${encodeURIComponent(
                          `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
                        )}`}
                        className="inline-block mt-2 text-[#CCFF00] underline underline-offset-4 hover:text-white transition-colors"
                      >
                        Click here to send directly via your email client ↗
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="w-full py-4 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {status.state === 'loading' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <span>Send Message ↗</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
