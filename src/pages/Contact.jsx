import LeadForm from '../components/LeadForm'
import MapSection from '../components/MapSection'
import { motion } from 'framer-motion'
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react'

const quickContact = [
  { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210', desc: 'Mon–Sat, 9 AM – 7 PM' },
  { icon: Mail, label: 'Email Us', value: 'hello@verdantestates.in', href: 'mailto:hello@verdantestates.in', desc: 'We reply within 2 hours' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat Now', href: 'https://wa.me/919876543210', desc: 'Fastest response' },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Sat', desc: '9:00 AM – 7:00 PM IST', href: null },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-site pt-20">
      {/* Header */}
      <div style={{ background: 'var(--bg-dark)' }} className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, var(--copper) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-2">Get In Touch</p>
            <h1 className="font-display text-5xl md:text-6xl text-white font-semibold mb-4">
              Let's Find Your<br /><em className="italic text-gradient-copper">Dream Home</em>
            </h1>
            <p className="text-white/40 font-body text-base max-w-md mx-auto">
              Our Kerala property experts are ready to guide you — call, email, or fill the form below.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick contact cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickContact.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {c.href ? (
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="block p-6 bg-white rounded-3xl shadow-sm border border-[var(--border)] hover:border-[var(--copper)]/30 hover:shadow-lg transition-all duration-300 card-lift group">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: 'rgba(184,123,44,0.1)' }}>
                    <c.icon size={18} style={{ color: 'var(--copper)' }} strokeWidth={1.8} />
                  </div>
                  <p className="text-[var(--muted)] text-xs font-body mb-1">{c.label}</p>
                  <p className="font-display text-[var(--text)] font-semibold text-sm mb-1">{c.value}</p>
                  <p className="text-[var(--muted)] text-xs font-body">{c.desc}</p>
                </a>
              ) : (
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-[var(--border)]">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(184,123,44,0.1)' }}>
                    <c.icon size={18} style={{ color: 'var(--copper)' }} strokeWidth={1.8} />
                  </div>
                  <p className="text-[var(--muted)] text-xs font-body mb-1">{c.label}</p>
                  <p className="font-display text-[var(--text)] font-semibold text-sm mb-1">{c.value}</p>
                  <p className="text-[var(--muted)] text-xs font-body">{c.desc}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <LeadForm />
      <MapSection />
    </div>
  )
}
