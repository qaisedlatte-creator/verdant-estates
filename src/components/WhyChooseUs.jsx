import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BadgeCheck, Users, Handshake, TrendingUp, Shield, Clock } from 'lucide-react'

const features = [
  {
    icon: BadgeCheck,
    title: 'Every Listing Verified',
    description: "Our legal team inspects every property before it's listed. Title deeds, encumbrance certificates, approvals — all checked.",
    stat: '1,200+',
    statLabel: 'verified listings',
    color: 'var(--copper)',
  },
  {
    icon: Users,
    title: 'Kerala Market Experts',
    description: "15+ years of deep local roots across Kochi, Alleppey, Munnar, Thrissur, and Kozhikode — we know every neighbourhood.",
    stat: '15 yrs',
    statLabel: 'local expertise',
    color: 'var(--sage)',
  },
  {
    icon: Handshake,
    title: 'End-to-End Guidance',
    description: 'From your first site visit to key handover — legal checks, bank liaison, registration, and post-sale support included.',
    stat: '98%',
    statLabel: 'client satisfaction',
    color: '#6b9fd4',
  },
]

const extras = [
  { icon: TrendingUp, label: 'Best Price Guarantee' },
  { icon: Shield, label: 'Zero Hidden Charges' },
  { icon: Clock, label: '24/7 Expert Support' },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-40, 0])
  const rightX = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} id="why-us" className="py-28 relative overflow-hidden noise" style={{ background: 'var(--bg-dark2)' }}>
      {/* Parallax background texture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(var(--copper) 1px, transparent 1px), linear-gradient(90deg, var(--copper) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </motion.div>

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.06] pointer-events-none" style={{ background: 'var(--copper)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-[0.04] pointer-events-none" style={{ background: 'var(--sage)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div style={{ x: leftX, opacity }}>
            <p className="text-[var(--copper-light)] font-body text-xs tracking-[0.3em] uppercase font-semibold mb-3">Our Promise</p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-semibold leading-tight">
              Why Choose<br />
              <em className="italic text-gradient-copper">Verdant Estates?</em>
            </h2>
            <div className="divider-copper-left mt-5 mb-6" />
            <p className="text-white/45 font-body text-base leading-relaxed max-w-sm">
              We don't just sell properties — we build lasting relationships founded on trust, expertise, and absolute transparency.
            </p>
          </motion.div>

          <motion.div style={{ x: rightX, opacity }} className="flex flex-col gap-3">
            {extras.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 glass-dark p-4 rounded-2xl group hover:border-[var(--copper)]/25 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,123,44,0.15)' }}>
                  <Icon size={17} style={{ color: 'var(--copper)' }} strokeWidth={1.8} />
                </div>
                <span className="text-white/75 font-body font-medium text-sm">{label}</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--copper)]/40 group-hover:bg-[var(--copper)] transition-colors" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl p-8 border border-white/6 bg-white/[0.03] hover:bg-white/[0.055] transition-all duration-400 overflow-hidden"
            >
              {/* Top color bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
              />

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${f.color}18` }}
              >
                <f.icon size={22} style={{ color: f.color }} strokeWidth={1.8} />
              </div>

              <h3 className="font-display text-white text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-white/45 font-body text-sm leading-relaxed mb-7">{f.description}</p>

              <div className="pt-5 border-t border-white/8 flex items-baseline gap-2">
                <span
                  className="font-display text-3xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${f.color}, ${f.color}bb)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {f.stat}
                </span>
                <span className="text-white/35 text-sm font-body">{f.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
