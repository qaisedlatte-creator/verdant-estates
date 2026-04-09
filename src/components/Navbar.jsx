import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isLight = pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-4 pt-3"
      >
        {/* Liquid glass navbar pill */}
        <div
          className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden transition-all duration-500"
          style={scrolled || isLight ? {
            background: 'rgba(20,18,16,0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 1px 1px 0 rgba(255,255,255,0.05)',
          } : {
            background: 'rgba(0,0,0,0.15)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Inner highlight ring */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(255,255,255,0.03)' }}
          />

          <div className="relative flex items-center justify-between px-5 py-3">
            {/* Wordmark */}
            <Link to="/" className="flex items-baseline gap-0.5 group">
              <span className="font-display text-white text-lg font-semibold tracking-tight group-hover:text-white/90 transition-colors">Verdant</span>
              <span
                className="font-display text-lg font-light tracking-[0.18em] ml-1 transition-colors"
                style={{ color: 'var(--copper-light)' }}
              >
                Estates
              </span>
              <span className="block w-1 h-1 rounded-full ml-0.5 mb-0.5 self-end" style={{ background: 'var(--copper)' }} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-body font-medium rounded-xl transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-white/45 hover:text-white/80'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'rgba(184,123,44,0.18)', border: '1px solid rgba(184,123,44,0.2)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-1.5 text-white/35 hover:text-white/65 text-xs font-body transition-colors"
              >
                <Phone size={12} />
                <span>+91 98765 43210</span>
              </a>
              <Link
                to="/contact"
                className="btn-copper px-5 py-2.5 rounded-xl text-sm flex items-center gap-1.5 shadow-lg"
                style={{ boxShadow: '0 4px 16px rgba(184,123,44,0.3)' }}
              >
                <span>Free Consultation</span>
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-xl transition-colors"
              style={{ background: menuOpen ? 'rgba(255,255,255,0.08)' : 'transparent' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={menuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-72 flex flex-col pt-20 px-6 gap-1 md:hidden"
              style={{
                background: 'rgba(20,18,16,0.95)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06)' }}
              />
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.08 }}
                >
                  <Link
                    to={link.to}
                    className="block py-4 font-display text-2xl text-white/70 hover:text-white transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  className="btn-copper block text-center py-4 rounded-2xl text-sm font-semibold"
                >
                  <span>Get Free Consultation</span>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
