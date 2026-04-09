import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Nambiar',
    role: 'Homeowner · Marine Drive, Kochi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop',
    rating: 5,
    quote: 'Verdant made our dream home a reality. Their team guided us from the first site visit to final registration — complete transparency throughout. The Marine Drive apartment exceeded every expectation.',
    property: 'Luxury Apartment, Marine Drive',
    bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=60&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Rajesh Menon',
    role: 'NRI Investor · Based in Dubai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
    rating: 5,
    quote: "As an NRI, I worried about managing a purchase remotely. Verdant's team handled everything — documentation, virtual tours, negotiations — with complete professionalism. My Munnar villa is everything I envisioned.",
    property: 'Hill View Villa, Munnar',
    bg: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=60&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Lakshmi Krishnaswamy',
    role: 'First-Time Buyer · Thrissur',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop',
    rating: 5,
    quote: 'I never thought buying a home could be stress-free. Verdant proved me wrong. Their local knowledge of Thrissur saved us lakhs, and the after-sale support was exceptional. I recommend them to everyone.',
    property: 'Modern Apartment, Thrissur',
    bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=60&auto=format&fit=crop',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const navigate = (d) => { setDir(d); setCurrent(p => (p + d + testimonials.length) % testimonials.length) }

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => navigate(1), 6000)
    return () => clearInterval(t)
  }, [current])

  const t = testimonials[current]

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Large decorative quote */}
      <div className="absolute top-16 right-12 font-display text-[18rem] leading-none text-[var(--copper)]/[0.04] pointer-events-none select-none font-bold">"</div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[var(--copper)] font-body text-xs tracking-[0.3em] uppercase font-semibold mb-2">Client Stories</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] font-semibold">
            Voices of <em className="italic" style={{ color: 'var(--sage)' }}>Trust</em>
          </h2>
          <div className="divider-copper mt-4" />
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Main testimonial */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -48 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Background property image */}
              <div className="absolute top-0 right-0 w-48 h-full opacity-[0.07] pointer-events-none">
                <img src={t.bg} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="var(--copper)" style={{ color: 'var(--copper)' }} />
                  ))}
                </div>

                <blockquote className="font-cormorant text-[var(--text)] text-xl md:text-2xl italic leading-relaxed mb-8">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                      style={{ background: 'var(--copper)' }}
                    >
                      <Star size={9} fill="#fff" className="text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-[var(--text)] font-semibold">{t.name}</p>
                    <p className="text-[var(--muted)] text-xs font-body mt-0.5">{t.role}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1 h-1 rounded-full" style={{ background: 'var(--copper)' }} />
                      <p className="font-body text-[11px]" style={{ color: 'var(--copper)' }}>{t.property}</p>
                    </div>
                  </div>
                </div>

                <Quote size={32} className="opacity-10 text-[var(--text)]" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: nav + other cards */}
          <div className="flex flex-col gap-4">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
                className={`text-left rounded-2xl p-5 border transition-all duration-300 ${
                  i === current
                    ? 'bg-[var(--bg-dark)] border-[var(--copper)]/30 shadow-xl'
                    : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-xl object-cover" />
                  <div>
                    <p className={`font-body font-semibold text-sm ${i === current ? 'text-white' : 'text-[var(--text)]'}`}>{item.name}</p>
                    <p className={`font-body text-xs ${i === current ? 'text-white/40' : 'text-[var(--muted)]'}`}>{item.role.split('·')[1]}</p>
                  </div>
                </div>
                <p className={`font-body text-xs leading-relaxed line-clamp-2 ${i === current ? 'text-white/50' : 'text-[var(--muted)]'}`}>
                  "{item.quote}"
                </p>
              </button>
            ))}

            {/* Arrow controls */}
            <div className="flex items-center gap-2 mt-auto pt-2">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[var(--muted)] hover:border-[var(--copper)] hover:text-[var(--copper)] transition-all duration-300"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[var(--muted)] hover:border-[var(--copper)] hover:text-[var(--copper)] transition-all duration-300"
              >
                <ChevronRight size={16} />
              </button>
              <span className="text-[var(--muted)] text-xs font-body ml-2">{current + 1} / {testimonials.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
