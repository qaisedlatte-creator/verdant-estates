import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ContainerScroll } from './ui/container-scroll-animation'
import { MapPin, BedDouble, Bath, Maximize, Star, Search, Heart, Filter } from 'lucide-react'

const SHOWCASE_PROPS = [
  {
    id: 1,
    title: 'Seaside Villa',
    location: 'Marine Drive, Kochi',
    price: '₹2.4 Cr',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80&auto=format&fit=crop',
    beds: 5, baths: 4, area: '4,800 sq.ft', rating: 4.9, tag: 'Premium',
  },
  {
    id: 2,
    title: 'Backwater Estate',
    location: 'Alleppey, Kerala',
    price: '₹1.6 Cr',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80&auto=format&fit=crop',
    beds: 5, baths: 4, area: '4,200 sq.ft', rating: 4.8, tag: 'Rare Find',
  },
  {
    id: 3,
    title: 'Hilltop Retreat',
    location: 'Munnar, Idukki',
    price: '₹1.1 Cr',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80&auto=format&fit=crop',
    beds: 4, baths: 3, area: '3,100 sq.ft', rating: 4.9, tag: 'Nature',
  },
  {
    id: 4,
    title: 'Heritage Bungalow',
    location: 'Fort Kochi, Ernakulam',
    price: '₹1.9 Cr',
    image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&q=80&auto=format&fit=crop',
    beds: 6, baths: 5, area: '5,600 sq.ft', rating: 4.7, tag: 'Heritage',
  },
  {
    id: 5,
    title: 'Luxury Villa',
    location: 'Kakkanad, Kochi',
    price: '₹85 L',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop',
    beds: 4, baths: 3, area: '3,200 sq.ft', rating: 4.8, tag: 'New Launch',
  },
  {
    id: 6,
    title: 'Garden Villa',
    location: 'Kozhikode, Calicut',
    price: '₹72 L',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop',
    beds: 4, baths: 3, area: '2,800 sq.ft', rating: 4.6, tag: 'Landscaped',
  },
  {
    id: 7,
    title: 'Sky Residences',
    location: 'Edapally, Kochi',
    price: '₹68 L',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&auto=format&fit=crop',
    beds: 3, baths: 2, area: '1,850 sq.ft', rating: 4.5, tag: 'Ready Move',
  },
  {
    id: 8,
    title: 'Riverview Apartment',
    location: 'Thrissur City',
    price: '₹45 L',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80&auto=format&fit=crop',
    beds: 3, baths: 2, area: '1,650 sq.ft', rating: 4.6, tag: 'Best Value',
  },
  {
    id: 9,
    title: 'Plantation Estate',
    location: 'Wayanad, Kerala',
    price: '₹2.1 Cr',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80&auto=format&fit=crop',
    beds: 5, baths: 4, area: '6,200 sq.ft', rating: 5.0, tag: 'Exclusive',
  },
]

const tagColors = {
  Premium: '#B87B2C',
  'Rare Find': '#4E7A5F',
  Nature: '#3d6e5a',
  Heritage: '#6B4C2A',
  'New Launch': '#1A5276',
  Landscaped: '#2E7D32',
  'Ready Move': '#4A235A',
  'Best Value': '#1B5E20',
  Exclusive: '#7B241C',
}

function MiniCard({ prop, style = {} }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: '200px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        ...style,
      }}
    >
      <div className="relative h-28">
        <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div
          className="absolute top-2 left-2 text-[10px] font-bold tracking-wider px-2 py-1 rounded-full text-white"
          style={{ background: tagColors[prop.tag] || 'var(--copper)' }}
        >
          {prop.tag}
        </div>
        <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Heart size={11} className="text-white" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-white font-display font-semibold text-sm leading-tight">{prop.title}</p>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <MapPin size={9} style={{ color: 'var(--copper)' }} />
          <span className="text-white/40 text-[10px] font-body">{prop.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--copper-light)] font-display font-bold text-sm">{prop.price}</span>
          <div className="flex items-center gap-0.5">
            <Star size={9} fill="var(--copper)" style={{ color: 'var(--copper)' }} />
            <span className="text-white/50 text-[10px] font-body">{prop.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="flex items-center gap-1 text-white/30 text-[9px] font-body"><BedDouble size={8} />{prop.beds}</span>
          <span className="flex items-center gap-1 text-white/30 text-[9px] font-body"><Bath size={8} />{prop.baths}</span>
          <span className="flex items-center gap-1 text-white/30 text-[9px] font-body"><Maximize size={8} />{prop.area}</span>
        </div>
      </div>
    </div>
  )
}

export default function PropertyScrollShowcase() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--bg-dark), var(--bg-dark2) 60%, var(--bg))' }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,123,44,0.08) 0%, transparent 70%)' }}
      />

      <ContainerScroll
        titleComponent={
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="pb-8"
          >
            <p className="text-[var(--copper-light)] text-xs tracking-[0.3em] uppercase font-semibold font-body mb-3">
              Premium Portfolio
            </p>
            <h2 className="font-display text-white font-semibold leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Explore Kerala's Finest<br />
              <em className="italic text-gradient-copper">Properties</em>
            </h2>
            <p className="text-white/40 font-body text-base max-w-xl mx-auto leading-relaxed">
              Every listing rigorously verified. Every location handpicked. Your dream home, waiting.
            </p>
          </motion.div>
        }
      >
        {/* Property browser UI inside the 3D card */}
        <div
          className="h-full w-full flex flex-col"
          style={{ background: 'var(--bg-dark)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {/* Browser chrome */}
          <div
            className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div
              className="flex-1 flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Search size={11} className="text-white/25" />
              <span className="text-white/25 text-xs font-body">verdantestates.in/properties</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(184,123,44,0.15)' }}>
              <Filter size={11} style={{ color: 'var(--copper)' }} />
              <span className="text-xs font-body" style={{ color: 'var(--copper-light)' }}>Filters</span>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-0">
            {/* Sidebar */}
            <div
              className="hidden md:flex flex-col gap-3 p-4 w-48 flex-shrink-0"
              style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-white/30 text-[10px] font-body font-semibold tracking-widest uppercase">Type</p>
              {['All Properties', 'Villas', 'Apartments', 'Waterfront', 'Heritage', 'Plantation'].map((t, i) => (
                <div
                  key={t}
                  className="px-3 py-2 rounded-lg text-xs font-body cursor-pointer transition-all"
                  style={
                    i === 0
                      ? { background: 'rgba(184,123,44,0.2)', color: 'var(--copper-light)', border: '1px solid rgba(184,123,44,0.3)' }
                      : { color: 'rgba(255,255,255,0.35)' }
                  }
                >
                  {t}
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '8px', paddingTop: '12px' }}>
                <p className="text-white/30 text-[10px] font-body font-semibold tracking-widest uppercase mb-3">Budget</p>
                {['Under ₹50L', '₹50L–₹1Cr', '₹1Cr–₹2Cr', 'Above ₹2Cr'].map((b, i) => (
                  <div key={b} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={
                        i === 2
                          ? { background: 'var(--copper)', border: '1px solid var(--copper)' }
                          : { border: '1px solid rgba(255,255,255,0.2)' }
                      }
                    />
                    <span className="text-[10px] font-body" style={{ color: i === 2 ? 'var(--copper-light)' : 'rgba(255,255,255,0.3)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main grid */}
            <div className="flex-1 p-4 overflow-auto">
              {/* Results bar */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/40 text-xs font-body">Showing <span className="text-white font-semibold">9</span> properties</p>
                <div className="flex items-center gap-2">
                  <span className="text-white/25 text-[10px] font-body">Sort:</span>
                  <span className="text-[var(--copper-light)] text-[10px] font-body font-semibold">Recommended ▾</span>
                </div>
              </div>

              {/* Property cards grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {SHOWCASE_PROPS.map((prop) => (
                  <div
                    key={prop.id}
                    className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(184,123,44,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div
                        className="absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wider px-2 py-1 rounded-full text-white"
                        style={{ background: tagColors[prop.tag] || 'var(--copper)' }}
                      >
                        {prop.tag}
                      </div>
                      <button className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <Heart size={10} className="text-white/70" />
                      </button>
                      <div className="absolute bottom-2.5 left-2.5">
                        <p className="text-white font-display font-bold text-sm">{prop.price}</p>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-white font-display font-semibold text-sm">{prop.title}</p>
                      <div className="flex items-center gap-1 mt-0.5 mb-2">
                        <MapPin size={10} style={{ color: 'var(--copper)' }} />
                        <span className="text-white/35 text-[10px] font-body">{prop.location}</span>
                      </div>
                      <div className="flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                        <span className="flex items-center gap-1 text-white/35 text-[10px] font-body"><BedDouble size={9} />{prop.beds} Beds</span>
                        <span className="flex items-center gap-1 text-white/35 text-[10px] font-body"><Bath size={9} />{prop.baths}</span>
                        <span className="flex items-center gap-1 text-white/35 text-[10px] font-body"><Maximize size={9} />{prop.area}</span>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>

      {/* CTA below */}
      <div className="text-center pb-12 px-6 -mt-20 relative z-10">
        <Link
          to="/properties"
          className="btn-copper px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 shadow-xl"
          style={{ boxShadow: '0 8px 40px rgba(184,123,44,0.35)' }}
        >
          <span>Explore All Properties</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
