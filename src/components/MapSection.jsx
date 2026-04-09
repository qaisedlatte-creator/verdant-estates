import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowUpRight, Navigation } from 'lucide-react'

const LOCATIONS = [
  {
    id: 'kochi',
    name: 'Kochi Office',
    address: 'Marine Drive, Ernakulam, Kochi – 682 031',
    phone: '+91 484 299 5555',
    hours: 'Mon–Sat: 9 AM – 7 PM',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62890.63477521!2d76.2513!3d9.9816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5f6a2b47!2sMarine%20Drive%2C%20Ernakulam!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin',
    primary: true,
  },
  {
    id: 'thrissur',
    name: 'Thrissur Office',
    address: 'Round South, Thrissur – 680 001',
    phone: '+91 487 238 7777',
    hours: 'Mon–Sat: 9 AM – 6 PM',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62889!2d76.2144!3d10.5276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee13f87cf10f%3A0x9e1da6b6d67e0e0c!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1680000000001!5m2!1sen!2sin',
  },
  {
    id: 'kozhikode',
    name: 'Kozhikode Office',
    address: 'SM Street, Kozhikode – 673 001',
    phone: '+91 495 272 4444',
    hours: 'Mon–Sat: 9 AM – 6 PM',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62890!2d75.7804!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x6132bd01c5a0f3ae!2sKozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1680000000002!5m2!1sen!2sin',
  },
]

export default function MapSection() {
  const [active, setActive] = useState('kochi')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const loc = LOCATIONS.find(l => l.id === active)

  return (
    <section ref={ref} className="py-28 bg-site-alt relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--copper)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[var(--copper)] font-body text-xs tracking-[0.3em] uppercase font-semibold mb-2">Find Us</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] font-semibold mb-3">
            Our <em className="italic" style={{ color: 'var(--sage)' }}>Offices</em>
          </h2>
          <div className="divider-copper mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Left panel: location list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {LOCATIONS.map((l) => (
              <button
                key={l.id}
                onClick={() => setActive(l.id)}
                className={`w-full text-left rounded-2xl p-5 border transition-all duration-350 ${
                  active === l.id
                    ? 'bg-[var(--bg-dark)] border-[var(--copper)]/40 shadow-xl'
                    : 'bg-white border-transparent hover:border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: active === l.id ? 'var(--copper)' : '#ccc' }}
                      />
                      <p className={`font-display font-semibold text-base ${active === l.id ? 'text-white' : 'text-[var(--text)]'}`}>
                        {l.name}
                      </p>
                      {l.primary && (
                        <span className="text-[10px] font-body font-bold tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(184,123,44,0.15)', color: 'var(--copper)' }}>
                          HQ
                        </span>
                      )}
                    </div>
                    <p className={`text-xs font-body leading-relaxed ${active === l.id ? 'text-white/55' : 'text-[var(--muted)]'}`}>
                      {l.address}
                    </p>
                  </div>
                  <Navigation size={14} className={`flex-shrink-0 mt-1 ${active === l.id ? 'text-[var(--copper)]' : 'text-gray-300'}`} />
                </div>

                {active === l.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5 overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone size={12} className="text-[var(--copper)]" />
                      <span className="text-white/60 text-xs font-body">{l.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={12} className="text-[var(--copper)]" />
                      <span className="text-white/60 text-xs font-body">{l.hours}</span>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(l.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1.5 text-[var(--copper)] text-xs font-body font-semibold hover:underline"
                    >
                      Get Directions <ArrowUpRight size={11} />
                    </a>
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>

          {/* Right panel: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] bg-gray-200"
          >
            {/* Map address bar */}
            <div className="absolute top-4 left-4 right-4 z-10 glass-light rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-md">
              <MapPin size={14} style={{ color: 'var(--copper)' }} />
              <span className="text-[var(--text)] text-xs font-body font-medium truncate">{loc.address}</span>
            </div>

            <iframe
              key={active}
              src={loc.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', filter: 'contrast(1.05) saturate(0.85)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${loc.name}`}
            />

            {/* Branding overlay bottom */}
            <div className="absolute bottom-4 right-4 glass-dark px-4 py-3 rounded-xl">
              <p className="text-white font-display text-sm font-semibold">Verdant Estates</p>
              <p className="text-white/40 text-xs font-body">{loc.name}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
