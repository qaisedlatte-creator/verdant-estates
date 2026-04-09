import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)

const footerLinks = {
  Properties: [
    { label: 'Villas in Kochi', to: '/properties' },
    { label: 'Waterfront Homes', to: '/properties' },
    { label: 'Hill Station Retreats', to: '/properties' },
    { label: 'Premium Apartments', to: '/properties' },
    { label: 'View All Properties', to: '/properties' },
  ],
  Company: [
    { label: 'About Verdant', to: '/about' },
    { label: 'Our Team', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Careers', to: '/about' },
  ],
  Resources: [
    { label: "Buyer's Guide", to: '/contact' },
    { label: 'NRI Investment', to: '/contact' },
    { label: 'EMI Calculator', to: '/contact' },
    { label: 'Free Consultation', to: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'var(--bg-dark)' }}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--copper)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-baseline gap-0.5 mb-5">
              <span className="font-display text-white text-2xl font-semibold tracking-tight">Verdant</span>
              <span className="font-display text-[var(--copper-light)] text-2xl font-light tracking-[0.18em] ml-1">Estates</span>
              <span className="block w-1.5 h-1.5 rounded-full ml-0.5 mb-1 self-end" style={{ background: 'var(--copper)' }} />
            </Link>
            <p className="text-white/35 font-body text-sm leading-relaxed mb-6 max-w-xs">
              Kerala's most trusted luxury real estate consultancy. We help families find their dream homes with expertise, transparency, and care.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-white/40 hover:text-[var(--copper)] text-sm font-body transition-colors duration-200 group">
                <Phone size={13} className="text-[var(--copper)]/50 group-hover:text-[var(--copper)] transition-colors" />
                +91 98765 43210
              </a>
              <a href="mailto:hello@verdantestates.in" className="flex items-center gap-2.5 text-white/40 hover:text-[var(--copper)] text-sm font-body transition-colors duration-200 group">
                <Mail size={13} className="text-[var(--copper)]/50 group-hover:text-[var(--copper)] transition-colors" />
                hello@verdantestates.in
              </a>
              <div className="flex items-start gap-2.5 text-white/40 text-sm font-body">
                <MapPin size={13} className="text-[var(--copper)]/50 flex-shrink-0 mt-0.5" />
                Marine Drive, Kochi, Kerala 682 031
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {[InstagramIcon, FacebookIcon, YoutubeIcon].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl border border-white/8 text-white/35 hover:text-[var(--copper)] hover:border-[var(--copper)]/30 flex items-center justify-center transition-all duration-300"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="text-white font-display font-semibold text-sm tracking-wide mb-5">{cat}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/35 hover:text-[var(--copper)] font-body text-sm transition-colors duration-200 inline-flex items-center gap-1 group hover-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 font-body text-xs">
            © 2025 Verdant Estates. All rights reserved. · RERA: KL/RERA/2024/001234
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Use', 'RERA Compliance'].map(item => (
              <a key={item} href="#" className="text-white/20 hover:text-white/40 font-body text-xs transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
