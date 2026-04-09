import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, MapPin, ArrowRight, ChevronDown, Star, TrendingUp } from 'lucide-react'
import { GlassEffect, GlassPill } from './ui/liquid-glass'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=85&auto=format&fit=crop',
]

const WORDS = ['Dream', 'Perfect', 'Luxury', 'Ideal']

const FLOATING_STATS = [
  { icon: Star, value: '4.9★', label: '500+ Reviews', pos: 'top-[28%] left-[5%]', delay: 0.8 },
  { icon: TrendingUp, value: '₹500Cr+', label: 'Properties Sold', pos: 'top-[22%] right-[5%]', delay: 1 },
]

const MARQUEE_ITEMS = [
  'Luxury Villas', 'Waterfront Homes', 'Hill Retreats', 'Premium Apartments',
  'NRI Investment', 'Verified Listings', 'Kerala Properties', 'Dream Homes',
  'Luxury Villas', 'Waterfront Homes', 'Hill Retreats', 'Premium Apartments',
  'NRI Investment', 'Verified Listings', 'Kerala Properties', 'Dream Homes',
]

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const [search, setSearch] = useState('')
  const wrapperRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % HERO_IMAGES.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative w-full overflow-hidden bg-[#040C1C] min-h-screen">

        {/* Background image slideshow with parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={imgIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <motion.img
                src={HERO_IMAGES[imgIdx]}
                alt="Luxury Kerala Property"
                style={{ scale: imgScale }}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Layered overlays for depth and readability */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(4,12,28,0.55) 0%, rgba(4,12,28,0.3) 40%, rgba(4,12,28,0.7) 80%, #040C1C 100%)' }}
        />
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(4,12,28,0.8) 0%, transparent 60%)' }}
        />
        {/* Champagne gold ambient light */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(191,160,90,0.12) 0%, transparent 55%)' }}
        />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex flex-col min-h-screen"
        >
          {/* ── Trust badge ── */}
          <div className="flex-1 flex flex-col items-center justify-center pt-28 pb-8 px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-8"
            >
              <GlassPill className="gap-2 text-sm">
                <span>✨</span>
                <span className="text-white/85 font-body font-medium">
                  Trusted by 1,200+ Kerala families
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)]" />
                <span className="text-[var(--copper-light)] font-body text-xs">RERA Verified</span>
              </GlassPill>
            </motion.div>

            {/* ── Headline ── */}
            <div className="text-center mb-8 max-w-5xl mx-auto">
              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-white font-semibold leading-[1.0]"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                >
                  Find Your
                </motion.h1>
              </div>

              <div className="overflow-hidden flex items-baseline justify-center gap-4 mb-1">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-semibold italic leading-[1.0]"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'transparent' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIdx}
                      initial={{ y: '80%', opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: '-80%', opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block text-gradient-copper font-display italic"
                      style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                    >
                      {WORDS[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-white font-semibold leading-[1.0]"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                >
                  Home in Kerala
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.82 }}
                className="font-cormorant text-white/55 italic leading-relaxed mx-auto"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', maxWidth: '480px' }}
              >
                Luxury living. Trusted investment. Verified properties.
              </motion.p>
            </div>

            {/* ── Floating stat badges ── */}
            {FLOATING_STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: s.delay }}
                className={`absolute ${s.pos} hidden lg:block`}
                style={{ animation: `float ${4 + i}s ease-in-out ${i * 0.8}s infinite` }}
              >
                <GlassCard className="px-4 py-3">
                  <p className="text-white font-display font-bold text-lg leading-none">{s.value}</p>
                  <p className="text-white/50 font-body text-xs mt-0.5">{s.label}</p>
                </GlassCard>
              </motion.div>
            ))}

            {/* ── CTA row ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-14"
            >
              <Link
                to="/properties"
                className="btn-copper px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 shadow-2xl hover:shadow-[var(--copper)]/25"
              >
                <span>Browse Properties</span>
                <ArrowRight size={16} />
              </Link>

              <GlassButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="text-white font-body text-sm font-semibold flex items-center gap-2">
                  Free Consultation
                </span>
              </GlassButton>
            </motion.div>

            {/* ── Search bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.08, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl"
            >
              <GlassEffect className="rounded-2xl p-2 flex flex-col sm:flex-row items-stretch gap-2">
                {/* Search input */}
                <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10">
                  <Search size={15} className="text-[var(--copper)] flex-shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search location, type or keyword..."
                    className="flex-1 bg-transparent text-white placeholder-white/30 text-sm font-body outline-none"
                  />
                </div>
                {/* Location */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 sm:w-40">
                  <MapPin size={14} className="text-[var(--copper)] flex-shrink-0" />
                  <select className="bg-transparent text-white/70 text-sm font-body outline-none w-full cursor-pointer">
                    <option className="bg-[#040C1C]">All Kerala</option>
                    <option className="bg-[#040C1C]">Kochi</option>
                    <option className="bg-[#040C1C]">Alleppey</option>
                    <option className="bg-[#040C1C]">Munnar</option>
                    <option className="bg-[#040C1C]">Thrissur</option>
                    <option className="bg-[#040C1C]">Kozhikode</option>
                  </select>
                </div>
                <Link
                  to={`/properties${search ? `?q=${encodeURIComponent(search)}` : ''}`}
                  className="btn-copper px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight size={14} />
                </Link>
              </GlassEffect>
            </motion.div>
          </div>

          {/* ── Scroll stats strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="px-6 pb-10 max-w-7xl mx-auto w-full"
          >
            <div className="flex items-center justify-center gap-10 md:gap-20 py-5 border-t border-white/8">
              {[
                { num: '1,200+', label: 'Properties' },
                { num: '15 yrs', label: 'Experience' },
                { num: '98%', label: 'Satisfaction' },
                { num: '50+', label: 'Locations' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-white text-xl md:text-2xl font-semibold">{num}</p>
                  <p className="text-white/35 text-xs font-body mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-white/20" />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div
        className="relative z-10 border-t border-white/6 py-3 overflow-hidden"
        style={{ background: 'var(--bg-dark)' }}
      >
        <div className="marquee-track">
          <div className="marquee-inner">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-6">
                <span className="text-white/25 text-xs font-body font-medium tracking-widest uppercase">{item}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--copper)]/40" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Floating glass card helper (used in hero)
function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      {children}
    </div>
  )
}

// Glass button helper (used in hero)
function GlassButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-full px-8 py-4 transition-all duration-500 hover:scale-105"
      style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
      }}
    >
      {children}
    </button>
  )
}
