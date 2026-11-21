import { academy, personalInfo, navLinks, footerData } from '../data/portfolioData'

// Load footer background dynamically
const footerImages = import.meta.glob('/src/assets/footer/footer-bg.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const footerBgSrc = Object.values(footerImages)[0] || null

const currentYear = new Date().getFullYear()

export default function Footer() {

  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Background Graphic if present */}
      {footerBgSrc && (
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
          <img
            src={footerBgSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Top Tier: Big Editorial Logo / Name & Back to Top */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mt-1 font-mono">
              {footerData.tagline}
            </p>
          </div>

          <a
            href="#home"
            className="px-4 py-2 border border-white/15 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors flex items-center gap-2"
          >
            <span>Top</span>
            <span>↑</span>
          </a>
        </div>

        {/* Middle Tier: Quick Anchors */}
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-wider font-mono text-[#9CA3AF]">
          <div className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#CCFF00] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <span>Direct: </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-white hover:text-[#CCFF00] transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>

        {/* Bottom Tier: Copyright & TAP Academy Credit Convention */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-neutral-500">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>

          {/* TAP Academy Credit */}
          <div className="flex items-center gap-2">
            <span>{footerData.credit.split(academy.name)[0]}</span>
            <a
              href={academy.url}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-300 hover:text-[#CCFF00] underline font-medium transition-colors"
            >
              {academy.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
