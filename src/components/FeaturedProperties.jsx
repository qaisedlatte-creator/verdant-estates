import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, BedDouble, Bath, Maximize, ArrowUpRight, Heart, Eye } from 'lucide-react'

export const ALL_PROPERTIES = [
  {
    id: 1, title: 'Seaside Villa', location: 'Marine Drive, Kochi', price: '₹2.4 Cr', priceNum: 24000000,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80&auto=format&fit=crop',
    beds: 5, baths: 4, area: '4,800 sq.ft', tag: 'Premium', type: 'Villa', featured: true,
    desc: 'Stunning seafront villa with private pool, Italian marble interiors, and panoramic Arabian Sea views.',
  },
  {
    id: 2, title: 'Backwater Estate', location: 'Alleppey, Alappuzha', price: '₹1.6 Cr', priceNum: 16000000,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80&auto=format&fit=crop',
    beds: 5, baths: 4, area: '4,200 sq.ft', tag: 'Rare Find', type: 'Villa', featured: true,
    desc: 'Exclusive waterfront estate with private jetty, infinity pool, and breathtaking backwater vistas.',
  },
  {
    id: 3, title: 'Hilltop Retreat', location: 'Munnar, Idukki', price: '₹1.1 Cr', priceNum: 11000000,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=700&q=80&auto=format&fit=crop',
    beds: 4, baths: 3, area: '3,100 sq.ft', tag: 'Nature View', type: 'Villa', featured: true,
    desc: 'Serene hill station villa surrounded by tea estates with misty mountain views.',
  },
  {
    id: 4, title: 'Luxury Villa', location: 'Kakkanad, Kochi', price: '₹85 L', priceNum: 8500000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80&auto=format&fit=crop',
    beds: 4, baths: 3, area: '3,200 sq.ft', tag: 'New Launch', type: 'Villa',
    desc: 'Contemporary villa with private pool, smart home automation, and landscaped gardens.',
  },
  {
    id: 5, title: 'Sky Residences', location: 'Edapally, Kochi', price: '₹68 L', priceNum: 6800000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80&auto=format&fit=crop',
    beds: 3, baths: 2, area: '1,850 sq.ft', tag: 'Ready to Move', type: 'Apartment',
    desc: 'Premium high-rise apartment with city views, gym, swimming pool, and 24/7 concierge.',
  },
  {
    id: 6, title: 'Heritage Bungalow', location: 'Fort Kochi, Ernakulam', price: '₹1.9 Cr', priceNum: 19000000,
    image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=700&q=80&auto=format&fit=crop',
    beds: 6, baths: 5, area: '5,600 sq.ft', tag: 'Heritage', type: 'Bungalow',
    desc: 'Restored colonial-era bungalow in the heart of Fort Kochi with original teak woodwork.',
  },
  {
    id: 7, title: 'Riverview Apartment', location: 'Thrissur City', price: '₹45 L', priceNum: 4500000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80&auto=format&fit=crop',
    beds: 3, baths: 2, area: '1,650 sq.ft', tag: 'Best Value', type: 'Apartment',
    desc: 'Modern apartment with river views in the cultural capital of Kerala.',
  },
  {
    id: 8, title: 'Garden Villa', location: 'Kozhikode, Calicut', price: '₹72 L', priceNum: 7200000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80&auto=format&fit=crop',
    beds: 4, baths: 3, area: '2,800 sq.ft', tag: 'Landscaped', type: 'Villa',
    desc: 'Lush garden villa with traditional Kerala architecture and modern amenities.',
  },
]

const TAGS = ['All', 'Villa', 'Apartment', 'Bungalow']

const tagStyles = {
  'Premium': { bg: 'var(--copper)', text: '#fff' },
  'Rare Find': { bg: '#2E5040', text: '#A0D9B8' },
  'Nature View': { bg: '#1a3a2a', text: '#7FB896' },
  'New Launch': { bg: '#1e3a5f', text: '#90bde0' },
  'Ready to Move': { bg: '#2d1e42', text: '#c49df0' },
  'Heritage': { bg: '#3d2a10', text: '#e0b87a' },
  'Best Value': { bg: '#1f3020', text: '#7de098' },
  'Landscaped': { bg: '#1a2e1a', text: '#90d990' },
}

function PropertyCard({ prop, index }) {
  const [liked, setLiked] = useState(false)
  const style = tagStyles[prop.tag] || { bg: 'var(--copper)', text: '#fff' }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-3xl overflow-hidden shadow-md card-lift flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={prop.image}
          alt={prop.title}
          className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-700"
          style={{ transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Tag */}
        <div
          className="absolute top-3.5 left-3.5 text-[11px] font-body font-bold tracking-wider px-2.5 py-1.5 rounded-full"
          style={{ background: style.bg, color: style.text }}
        >
          {prop.tag}
        </div>

        {/* Like button */}
        <button
          onClick={() => setLiked(l => !l)}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={14}
            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            strokeWidth={liked ? 0 : 1.8}
          />
        </button>

        {/* Price */}
        <div className="absolute bottom-3.5 left-3.5 glass-dark px-3 py-2 rounded-xl">
          <p className="font-display text-white text-base font-semibold leading-none">{prop.price}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-1">
          <h3 className="font-display text-[var(--text)] text-lg font-semibold leading-tight">{prop.title}</h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin size={12} style={{ color: 'var(--copper)' }} />
            <span className="text-[var(--muted)] text-xs font-body">{prop.location}</span>
          </div>
        </div>

        <p className="text-[var(--muted)] text-xs font-body leading-relaxed mt-2 mb-4 flex-1 line-clamp-2">
          {prop.desc}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 py-3 border-t border-gray-100 mb-4">
          <div className="flex items-center gap-1.5 text-[var(--muted)] text-xs font-body">
            <BedDouble size={13} /><span>{prop.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--muted)] text-xs font-body">
            <Bath size={13} /><span>{prop.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--muted)] text-xs font-body">
            <Maximize size={13} /><span>{prop.area}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to="/contact"
            className="btn-copper flex-1 py-3 rounded-2xl text-xs font-semibold tracking-wide text-center"
          >
            <span>Enquire Now</span>
          </Link>
          <button className="w-10 h-10 rounded-2xl border border-gray-200 flex items-center justify-center text-[var(--muted)] hover:border-[var(--copper)] hover:text-[var(--copper)] transition-all duration-200">
            <Eye size={14} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedProperties({ limit = 6 }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = ALL_PROPERTIES
    .filter(p => activeFilter === 'All' || p.type === activeFilter)
    .slice(0, limit)

  return (
    <section id="properties" className="py-28 bg-site relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-[0.06] pointer-events-none" style={{ background: 'var(--copper)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--copper)] font-body text-xs tracking-[0.28em] uppercase font-semibold mb-2">
              Curated Collection
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] font-semibold mb-1">
              Featured <em className="italic" style={{ color: 'var(--sage)' }}>Properties</em>
            </h2>
            <div className="divider-copper-left mt-3" />
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-2 bg-[var(--bg-alt)] rounded-2xl p-1.5"
          >
            {TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-300 ${
                  activeFilter === tag
                    ? 'bg-[var(--bg-dark)] text-white shadow-md'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((prop, i) => (
              <PropertyCard key={prop.id} prop={prop} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/properties"
            className="btn-outline px-8 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2"
          >
            View All {ALL_PROPERTIES.length}+ Properties
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
