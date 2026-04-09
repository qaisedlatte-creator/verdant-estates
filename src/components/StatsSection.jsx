import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Home, Users, Award } from 'lucide-react'

const stats = [
  { icon: Home, end: 1247, suffix: '+', label: 'Properties Sold', desc: 'Across all of Kerala' },
  { icon: Users, end: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Based on verified reviews' },
  { icon: TrendingUp, end: 15, suffix: ' yrs', label: 'Market Experience', desc: 'Deep Kerala expertise' },
  { icon: Award, end: 50, suffix: '+', label: 'Locations Covered', desc: 'Cities & towns in Kerala' },
]

function Counter({ end, suffix, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
      {/* Decorative ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.04] border border-[var(--copper)]"
        style={{ animation: 'spin-slow 40s linear infinite' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none opacity-[0.03] border border-[var(--copper)]"
      />

      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-[0.07] pointer-events-none" style={{ background: 'var(--copper)' }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-[0.05] pointer-events-none" style={{ background: 'var(--sage)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-3">By The Numbers</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-semibold">
            Trusted by <em className="italic text-gradient-copper">Thousands</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl p-7 border border-white/6 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-400 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(184,123,44,0.12), transparent 70%)' }} />

              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(184,123,44,0.15)' }}>
                <s.icon size={18} style={{ color: 'var(--copper)' }} strokeWidth={1.8} />
              </div>

              <div className="font-display text-4xl md:text-5xl font-bold mb-2 text-gradient-copper">
                <Counter end={s.end} suffix={s.suffix} duration={2} />
              </div>

              <p className="text-white font-body font-semibold text-sm mb-1">{s.label}</p>
              <p className="text-white/35 font-body text-xs leading-relaxed">{s.desc}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--copper)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
