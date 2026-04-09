import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, MapPin, BedDouble, Bath, Maximize, Heart, SlidersHorizontal, X, ArrowUpRight, Eye } from 'lucide-react'
import { ALL_PROPERTIES } from '../components/FeaturedProperties'

const TYPES = ['All', 'Villa', 'Apartment', 'Bungalow']
const BUDGETS = ['Any', 'Under ₹50L', '₹50L–₹1Cr', '₹1Cr–₹2Cr', 'Above ₹2Cr']
const LOCATIONS = ['All', 'Kochi', 'Alleppey', 'Munnar', 'Thrissur', 'Kozhikode']

const tagColors = {
  Premium: { bg: 'var(--copper)', text: '#fff' },
  'Rare Find': { bg: '#2E5040', text: '#A0D9B8' },
  'Nature View': { bg: '#1a3a2a', text: '#7FB896' },
  'New Launch': { bg: '#1e3a5f', text: '#90bde0' },
  'Ready to Move': { bg: '#2d1e42', text: '#c49df0' },
  Heritage: { bg: '#3d2a10', text: '#e0b87a' },
  'Best Value': { bg: '#1f3020', text: '#7de098' },
  Landscaped: { bg: '#1a2e1a', text: '#90d990' },
}

function Card({ prop, index }) {
  const [liked, setLiked] = useState(false)
  const tc = tagColors[prop.tag] || { bg: 'var(--copper)', text: '#fff' }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-3xl overflow-hidden shadow-md card-lift flex flex-col"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={prop.image} alt={prop.title}
          className="w-full h-full object-cover"
          style={{ transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 text-[11px] font-bold tracking-wider px-2.5 py-1.5 rounded-full font-body"
          style={{ background: tc.bg, color: tc.text }}>{prop.tag}</div>
        <button onClick={() => setLiked(l => !l)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
          <Heart size={13} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} strokeWidth={liked ? 0 : 1.8} />
        </button>
        <div className="absolute bottom-3 left-3 glass-dark px-3 py-1.5 rounded-xl">
          <p className="font-display text-white text-sm font-semibold">{prop.price}</p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-[var(--text)] text-lg font-semibold">{prop.title}</h3>
        <div className="flex items-center gap-1.5 mt-1 mb-3">
          <MapPin size={12} style={{ color: 'var(--copper)' }} />
          <span className="text-[var(--muted)] text-xs font-body">{prop.location}</span>
        </div>
        <p className="text-[var(--muted)] text-xs font-body leading-relaxed mb-4 flex-1 line-clamp-2">{prop.desc}</p>
        <div className="flex items-center gap-4 py-3 border-t border-gray-100 mb-4">
          <span className="flex items-center gap-1.5 text-[var(--muted)] text-xs font-body"><BedDouble size={12} />{prop.beds}</span>
          <span className="flex items-center gap-1.5 text-[var(--muted)] text-xs font-body"><Bath size={12} />{prop.baths}</span>
          <span className="flex items-center gap-1.5 text-[var(--muted)] text-xs font-body"><Maximize size={12} />{prop.area}</span>
        </div>
        <div className="flex gap-2">
          <Link to="/contact" className="btn-copper flex-1 py-3 rounded-2xl text-xs font-semibold text-center tracking-wide"><span>Enquire Now</span></Link>
          <button className="w-10 h-10 rounded-2xl border border-gray-200 flex items-center justify-center text-[var(--muted)] hover:border-[var(--copper)] hover:text-[var(--copper)] transition-all">
            <Eye size={14} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Properties() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [budget, setBudget] = useState('Any')
  const [location, setLocation] = useState('All')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    return ALL_PROPERTIES.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
      const matchType = type === 'All' || p.type === type
      const matchLoc = location === 'All' || p.location.toLowerCase().includes(location.toLowerCase())
      const matchBudget = budget === 'Any' ||
        (budget === 'Under ₹50L' && p.priceNum < 5000000) ||
        (budget === '₹50L–₹1Cr' && p.priceNum >= 5000000 && p.priceNum < 10000000) ||
        (budget === '₹1Cr–₹2Cr' && p.priceNum >= 10000000 && p.priceNum < 20000000) ||
        (budget === 'Above ₹2Cr' && p.priceNum >= 20000000)
      return matchSearch && matchType && matchLoc && matchBudget
    })
  }, [search, type, budget, location])

  const hasFilters = type !== 'All' || budget !== 'Any' || location !== 'All' || search

  return (
    <div className="min-h-screen bg-site pt-20">
      {/* Page header */}
      <div style={{ background: 'var(--bg-dark)' }} className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, var(--copper) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-2">Browse</p>
            <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-3">
              All <em className="italic text-gradient-copper">Properties</em>
            </h1>
            <p className="text-white/40 font-body text-base">{ALL_PROPERTIES.length} verified listings across Kerala</p>
          </motion.div>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="sticky top-16 z-40 bg-site border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--border)] rounded-xl text-sm font-body outline-none focus:border-[var(--copper)]/50 transition-colors"
            />
          </div>

          {/* Type tabs */}
          <div className="flex items-center gap-1 bg-[var(--bg-alt)] rounded-xl p-1">
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all duration-200 ${
                  type === t ? 'bg-[var(--bg-dark)] text-white shadow' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}>
                {t}
              </button>
            ))}
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setFiltersOpen(o => !o)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-body font-medium transition-all duration-200 ${
              filtersOpen ? 'border-[var(--copper)] text-[var(--copper)] bg-[var(--copper)]/5' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--copper)]/40'
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-[var(--copper)]" />}
          </button>

          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setType('All'); setBudget('Any'); setLocation('All') }}
              className="flex items-center gap-1.5 text-xs font-body text-[var(--muted)] hover:text-red-500 transition-colors"
            >
              <X size={13} />Clear
            </button>
          )}
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-[var(--border)] bg-site"
            >
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4">
                <div>
                  <label className="text-xs font-body font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5 block">Budget</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map(b => (
                      <button key={b} onClick={() => setBudget(b)}
                        className={`px-3 py-1.5 rounded-full text-xs font-body border transition-all ${
                          budget === b ? 'border-[var(--copper)] bg-[var(--copper)] text-white' : 'border-gray-200 text-[var(--muted)] hover:border-[var(--copper)]/40'
                        }`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5 block">Location</label>
                  <div className="flex flex-wrap gap-2">
                    {LOCATIONS.map(l => (
                      <button key={l} onClick={() => setLocation(l)}
                        className={`px-3 py-1.5 rounded-full text-xs font-body border transition-all ${
                          location === l ? 'border-[var(--copper)] bg-[var(--copper)] text-white' : 'border-gray-200 text-[var(--muted)] hover:border-[var(--copper)]/40'
                        }`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[var(--muted)] font-body text-sm">
            Showing <span className="font-semibold text-[var(--text)]">{filtered.length}</span> properties
          </p>
        </div>

        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <Card key={p.id} prop={p} index={i} />)}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="font-display text-2xl text-[var(--text)] font-semibold mb-2">No properties found</h3>
            <p className="text-[var(--muted)] font-body text-sm mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => { setSearch(''); setType('All'); setBudget('Any'); setLocation('All') }}
              className="btn-copper px-6 py-3 rounded-full text-sm font-semibold"
            >
              <span>Clear Filters</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
