import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Shield, Heart, Leaf, Briefcase, Scale, Globe, Users } from 'lucide-react'

/* ─── Team – no faces, styled avatar cards ─── */
const team = [
  {
    name: 'Arjun Pillai',
    role: 'Founder & CEO',
    exp: '18 yrs',
    initial: 'A',
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #B87B2C 0%, #6B3E1A 100%)',
    pattern: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.12) 0%, transparent 55%)',
    specialty: 'Strategy & Vision',
  },
  {
    name: 'Meera Krishnan',
    role: 'Head of Sales',
    exp: '12 yrs',
    initial: 'M',
    icon: Users,
    gradient: 'linear-gradient(135deg, #4E7A5F 0%, #243D2E 100%)',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.10) 0%, transparent 55%)',
    specialty: 'Client Relations',
  },
  {
    name: 'Suresh Nambiar',
    role: 'Legal Director',
    exp: '15 yrs',
    initial: 'S',
    icon: Scale,
    gradient: 'linear-gradient(135deg, #2A4B6B 0%, #0F1E2E 100%)',
    pattern: 'radial-gradient(circle at 60% 30%, rgba(255,255,255,0.10) 0%, transparent 55%)',
    specialty: 'Property Law',
  },
  {
    name: 'Anjali Menon',
    role: 'NRI Relations',
    exp: '9 yrs',
    initial: 'A',
    icon: Globe,
    gradient: 'linear-gradient(135deg, #6B2A4B 0%, #2E0F1E 100%)',
    pattern: 'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.10) 0%, transparent 55%)',
    specialty: 'NRI Investment',
  },
]

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Absolute transparency in every transaction — no hidden costs, no surprises.', color: 'var(--copper)' },
  { icon: Heart, title: 'Client First', desc: 'Your dream home is our mission. We put your needs above everything else.', color: '#e05c5c' },
  { icon: Award, title: 'Excellence', desc: 'Only the finest, most rigorously verified properties make our listings.', color: 'var(--sage)' },
  { icon: Leaf, title: 'Sustainability', desc: "We champion eco-friendly developments that respect Kerala's natural beauty.", color: '#5c9e6b' },
]

const timeline = [
  { year: '2010', title: 'Founded', desc: 'Arjun Pillai launches Verdant Estates from a small Kochi office with a single mission: make property buying transparent.' },
  { year: '2014', title: 'First 500 Families', desc: 'Hit the milestone of 500 happy families served across Kochi and Thrissur.' },
  { year: '2017', title: 'NRI Desk Launch', desc: 'Dedicated NRI investment advisory launched, serving the global Kerala diaspora.' },
  { year: '2021', title: 'Digital-First', desc: 'Launched virtual tours and digital verification, enabling remote buyers to invest with confidence.' },
  { year: '2025', title: '1,200+ Families', desc: 'Today, Verdant Estates is Kerala\'s most trusted luxury real estate partner with offices in 3 cities.' },
]

/* Parallax wrapper using scroll */
function ParallaxSection({ children, className = '', offset = 60 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [-offset, offset])
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* Horizontal reveal line */
function RevealLine({ delay = 0 }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0 }}
      className="divider-copper-left mt-4 mb-6"
    />
  )
}

export default function About() {
  const storyRef = useRef(null)
  const { scrollYProgress: storyScroll } = useScroll({ target: storyRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(storyScroll, [0, 1], ['-10%', '10%'])
  const imgScale = useTransform(storyScroll, [0, 0.5, 1], [1.08, 1, 1.08])

  const timelineRef = useRef(null)
  const { scrollYProgress: tlScroll } = useScroll({ target: timelineRef, offset: ['start center', 'end center'] })
  const tlLine = useTransform(tlScroll, [0, 1], ['0%', '100%'])

  return (
    <div className="min-h-screen bg-site pt-20 overflow-x-hidden">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden py-28 px-6" style={{ background: 'var(--bg-dark)' }}>
        {/* animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(var(--copper) 1px, transparent 1px), linear-gradient(90deg, var(--copper) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.07] pointer-events-none" style={{ background: 'var(--copper)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-[0.05] pointer-events-none" style={{ background: 'var(--sage)' }} />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-4 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-[var(--copper)]" />
              Our Story
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-6xl text-white font-semibold leading-tight"
              >
                Rooted in Kerala.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-6xl font-semibold leading-tight italic text-gradient-copper"
              >
                Built on Trust.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-white/45 font-body text-base leading-relaxed mb-8 max-w-lg"
            >
              Founded in 2010, Verdant Estates was born from a simple belief: buying a home in Kerala should be a joyful, transparent experience — not a stressful ordeal. Fifteen years and 1,200+ happy families later, that belief drives everything we do.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link to="/contact" className="btn-copper px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                <span>Work With Us</span>
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { num: '2010', label: 'Founded', sub: 'Kochi, Kerala' },
              { num: '1,200+', label: 'Families', sub: 'Across Kerala' },
              { num: '50+', label: 'Locations', sub: 'Cities & towns' },
              { num: '₹500Cr+', label: 'Properties', sub: 'Total value sold' },
            ].map(({ num, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.08 }}
                className="glass-dark rounded-3xl p-7 text-center group hover:border-[var(--copper)]/20 transition-all duration-300"
              >
                <p className="font-display text-3xl font-bold text-gradient-copper mb-1">{num}</p>
                <p className="text-white/70 text-sm font-body font-medium">{label}</p>
                <p className="text-white/25 text-xs font-body mt-0.5">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── STORY + PARALLAX IMAGE ── */}
      <section ref={storyRef} className="py-28 px-6 bg-site-alt relative overflow-hidden">
        {/* floating accent */}
        <ParallaxSection offset={30} className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-[0.07] pointer-events-none" >
          <div className="w-full h-full" style={{ background: 'var(--copper)' }} />
        </ParallaxSection>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Parallax image – proper luxury property, no faces */}
          <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-2xl">
            <motion.img
              style={{ y: imgY, scale: imgScale }}
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85&auto=format&fit=crop"
              alt="Luxury Kerala villa exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* floating badge – parallax opposite direction */}
            <ParallaxSection offset={-18} className="absolute bottom-6 left-6 right-6">
              <div className="glass-light rounded-2xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl copper-gradient flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-[var(--text)] font-semibold text-sm">15+ Years of Excellence</p>
                  <p className="text-[var(--muted)] text-xs font-body">Kerala's most trusted real estate partner</p>
                </div>
              </div>
            </ParallaxSection>

            {/* top corner decoration */}
            <div className="absolute top-4 right-4 glass-dark px-3 py-2 rounded-xl">
              <p className="text-[var(--copper-light)] text-xs font-body font-semibold tracking-wider">VERIFIED SINCE 2010</p>
            </div>
          </div>

          {/* Text – scroll reveal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[var(--copper)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-[var(--copper)]" />
              Why We Exist
            </p>
            <h2 className="font-display text-4xl text-[var(--text)] font-semibold mb-3 leading-tight">
              Every Family Deserves a<br />
              <em className="italic" style={{ color: 'var(--sage)' }}>Perfect Home</em>
            </h2>
            <RevealLine />
            <p className="text-[var(--muted)] font-body text-base leading-relaxed mb-5">
              Kerala is one of India's most beautiful states — and its real estate market is full of hidden gems. But navigating it requires local knowledge, legal expertise, and genuine care.
            </p>
            <p className="text-[var(--muted)] font-body text-base leading-relaxed mb-8">
              That's exactly what Verdant Estates provides. From NRI investors buying remotely to first-time buyers in Thrissur, we've guided thousands of families to their dream homes — with total transparency and zero stress.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {[
                'All listings legally verified before publishing',
                'Dedicated support from search to key handover',
                'Zero brokerage surprises — prices upfront',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--copper)' }} />
                  <span className="text-[var(--muted)] font-body text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/properties" className="btn-outline px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2">
              Browse Properties <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ── horizontal scroll-driven */}
      <section ref={timelineRef} className="py-24 px-6 relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-2">Our Journey</p>
            <h2 className="font-display text-4xl text-white font-semibold">
              15 Years of <em className="italic text-gradient-copper">Growth</em>
            </h2>
          </motion.div>

          {/* Timeline track */}
          <div className="relative">
            {/* background line */}
            <div className="absolute left-0 right-0 top-6 h-px bg-white/8 hidden md:block" />
            {/* animated fill line */}
            <div className="absolute left-0 top-6 h-px bg-gradient-to-r from-[var(--copper)] to-[var(--copper-light)] hidden md:block overflow-hidden" style={{ right: 0 }}>
              <motion.div className="absolute inset-0 origin-left" style={{ scaleX: tlLine }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pt-14 md:pt-16 group"
                >
                  {/* dot */}
                  <div className="absolute top-4 left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--copper)] bg-[var(--bg-dark)] group-hover:bg-[var(--copper)] transition-colors duration-300 z-10 hidden md:block" />

                  <div className="md:text-center">
                    <span className="font-display text-[var(--copper)] text-2xl font-bold block mb-2">{item.year}</span>
                    <h4 className="text-white font-body font-semibold text-sm mb-2">{item.title}</h4>
                    <p className="text-white/35 font-body text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6 bg-site-alt relative overflow-hidden">
        <ParallaxSection offset={20} className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-[0.08] pointer-events-none">
          <div className="w-full h-full" style={{ background: 'var(--sage)' }} />
        </ParallaxSection>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[var(--copper)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-2">What Drives Us</p>
            <h2 className="font-display text-4xl text-[var(--text)] font-semibold">
              Our <em className="italic" style={{ color: 'var(--sage)' }}>Values</em>
            </h2>
            <div className="divider-copper mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl p-7 shadow-sm border border-[var(--border)] group hover:shadow-xl hover:-translate-y-2 transition-all duration-400"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md"
                  style={{ background: `${v.color}18` }}
                >
                  <v.icon size={22} style={{ color: v.color }} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-[var(--text)] text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-[var(--muted)] font-body text-sm leading-relaxed">{v.desc}</p>
                {/* bottom accent line */}
                <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: v.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM – no faces ── */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ background: 'var(--bg-dark2)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-2">The People</p>
            <h2 className="font-display text-4xl text-white font-semibold">
              Meet Our <em className="italic text-gradient-copper">Team</em>
            </h2>
            <div className="divider-copper mt-4" />
            <p className="text-white/35 font-body text-sm mt-4 max-w-md mx-auto">
              The experts behind every successful property journey in Kerala.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 48, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                {/* Avatar card – no face */}
                <div
                  className="relative rounded-3xl overflow-hidden aspect-square mb-4 shadow-xl group-hover:shadow-2xl transition-shadow duration-500"
                  style={{ background: m.gradient }}
                >
                  {/* Pattern overlay */}
                  <div className="absolute inset-0" style={{ background: m.pattern }} />

                  {/* Decorative rings */}
                  <motion.div
                    className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute -top-6 -left-6 w-28 h-28 rounded-full border border-white/8"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Large initial */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span
                      className="font-display text-7xl font-bold text-white/20 leading-none select-none"
                      style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
                    >
                      {m.initial}
                    </span>
                  </div>

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/12 backdrop-blur-sm flex items-center justify-center">
                    <m.icon size={18} className="text-white/70" strokeWidth={1.8} />
                  </div>

                  {/* Hover reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-4 bottom-4 glass-dark rounded-2xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <p className="text-white/50 text-[10px] font-body uppercase tracking-wider">{m.specialty}</p>
                    <p className="text-white font-body font-semibold text-sm mt-0.5">{m.exp} experience</p>
                  </motion.div>
                </div>

                <div className="text-center">
                  <h3 className="font-display text-white font-semibold text-base">{m.name}</h3>
                  <p className="text-white/40 text-xs font-body mt-0.5">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-site relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[var(--copper)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-3">Ready to Begin?</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] font-semibold mb-5 leading-tight">
            Let Us Help You Find<br />
            <em className="italic" style={{ color: 'var(--sage)' }}>Your Dream Home</em>
          </h2>
          <p className="text-[var(--muted)] font-body text-base mb-8 max-w-md mx-auto leading-relaxed">
            Talk to our Kerala property experts today. Free consultation, no obligations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-copper px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <span>Get Free Consultation</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/properties" className="btn-outline px-8 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2">
              Browse Properties
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
