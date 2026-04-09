import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Phone, IndianRupee, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react'

const budgets = ['Under ₹30 Lakhs', '₹30L – ₹60L', '₹60L – ₹1 Crore', '₹1Cr – ₹2Cr', 'Above ₹2 Crore']
const locations = ['Kochi / Ernakulam', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Alappuzha', 'Munnar', 'Other']

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', budget: '', location: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden noise" style={{ background: 'var(--bg-dark)' }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(ellipse at 70% 30%, var(--copper) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-3">Free Consultation</p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-semibold leading-tight mb-5">
              Your Perfect Home<br />
              <em className="italic text-gradient-copper">Awaits You</em>
            </h2>
            <p className="text-white/45 font-body text-base leading-relaxed mb-8 max-w-md">
              Share your requirements and our Kerala property experts will reach out within 24 hours with personalised recommendations — completely free.
            </p>

            {[
              'No obligation — completely free consultation',
              'Expert advisors with 15+ years in Kerala market',
              'Confidential — your data is never shared',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 rounded-full copper-gradient flex items-center justify-center flex-shrink-0 shadow">
                  <CheckCircle size={10} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-white/55 font-body text-sm">{item}</span>
              </div>
            ))}

            <Link
              to="/properties"
              className="inline-flex items-center gap-2 mt-8 text-[var(--copper-light)] text-sm font-body hover-underline hover:text-[var(--copper)]"
            >
              Browse all properties <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-dark rounded-3xl p-8 md:p-10 border border-white/8">
              {!submitted ? (
                <>
                  <h3 className="font-display text-2xl text-white font-semibold mb-1.5">Get Free Consultation</h3>
                  <p className="text-white/35 font-body text-sm mb-8">Fill in your details — we'll call back within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                      { icon: User, label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
                      { icon: Phone, label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                    ].map(({ icon: Icon, label, name, type, placeholder }) => (
                      <div key={name}>
                        <label className="block text-white/40 text-[11px] font-body font-semibold tracking-widest uppercase mb-1.5">{label}</label>
                        <div className="relative">
                          <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--copper)]/60" />
                          <input
                            type={type} name={name} value={form[name]} onChange={handleChange}
                            placeholder={placeholder} required
                            className="w-full bg-white/5 border border-white/10 focus:border-[var(--copper)]/50 rounded-2xl py-3.5 pl-10 pr-4 text-white placeholder-white/20 font-body text-sm outline-none transition-all duration-300"
                          />
                        </div>
                      </div>
                    ))}

                    {[
                      { icon: IndianRupee, label: 'Budget', name: 'budget', options: budgets, placeholder: 'Select your budget' },
                      { icon: MapPin, label: 'Preferred Location', name: 'location', options: locations, placeholder: 'Where in Kerala?' },
                    ].map(({ icon: Icon, label, name, options, placeholder }) => (
                      <div key={name}>
                        <label className="block text-white/40 text-[11px] font-body font-semibold tracking-widest uppercase mb-1.5">{label}</label>
                        <div className="relative">
                          <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--copper)]/60 z-10 pointer-events-none" />
                          <select
                            name={name} value={form[name]} onChange={handleChange} required
                            className="w-full bg-white/5 border border-white/10 focus:border-[var(--copper)]/50 rounded-2xl py-3.5 pl-10 pr-4 text-sm outline-none transition-all duration-300 appearance-none cursor-pointer"
                            style={{ color: form[name] ? 'white' : 'rgba(255,255,255,0.2)' }}
                          >
                            <option value="" disabled className="bg-[#040C1C] text-white/30">{placeholder}</option>
                            {options.map(o => <option key={o} value={o} className="bg-[#040C1C] text-white">{o}</option>)}
                          </select>
                        </div>
                      </div>
                    ))}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.01 }}
                      whileTap={{ scale: loading ? 1 : 0.99 }}
                      className="btn-copper mt-2 py-4 rounded-2xl text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                          />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <><span>Get Free Consultation</span><Send size={14} /></>
                      )}
                    </motion.button>
                  </form>
                  <p className="text-white/20 font-body text-xs text-center mt-4">No spam, ever. We respect your privacy.</p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full copper-gradient flex items-center justify-center mx-auto mb-5 shadow-xl">
                    <CheckCircle size={28} className="text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-2xl text-white font-semibold mb-2">Thank You!</h3>
                  <p className="text-white/45 font-body text-sm leading-relaxed">
                    Our property expert will call you within <span style={{ color: 'var(--copper-light)' }}>24 hours</span> with tailored options.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
