import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const INIT = [
  { id: 1, from: 'bot', text: "Hi! I'm your Verdant property assistant. Looking for a home in Kerala? 🌿" },
]

const QUICK = ['Properties in Kochi', 'Budget under ₹60L', 'Waterfront homes', 'Schedule a visit']

const BOT_REPLIES = [
  "Great choice! We have beautiful properties there. What's your budget range?",
  "We have verified listings in that price range — villas, apartments, and more. Shall I help narrow it down?",
  "Our waterfront estates in Alleppey are stunning. Would you like to schedule a virtual tour?",
  "I'd be happy to arrange a site visit! Please fill out our consultation form and our team will call you within 24 hours.",
  "Excellent! Our advisors are standing by. You can also reach us at +91 98765 43210.",
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INIT)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [replyIdx, setReplyIdx] = useState(0)
  const [showQuick, setShowQuick] = useState(true)
  const endRef = useRef(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setShowQuick(false)
    setMessages(p => [...p, { id: Date.now(), from: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setReplyIdx(i => i + 1)
      setMessages(p => [...p, { id: Date.now() + 1, from: 'bot', text: BOT_REPLIES[replyIdx % BOT_REPLIES.length] }])
    }, 1100 + Math.random() * 600)
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 280, damping: 22 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full copper-gradient shadow-2xl flex items-center justify-center"
        aria-label="Chat"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            {open
              ? <X size={20} className="text-white" strokeWidth={2.5} />
              : <MessageCircle size={20} className="text-white" strokeWidth={2.5} />
            }
          </motion.div>
        </AnimatePresence>
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full copper-gradient opacity-30"
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.35)] border border-white/8"
            style={{ background: 'var(--bg-dark)' }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 border-b border-white/6"
              style={{ background: 'linear-gradient(135deg, var(--bg-dark2), var(--bg-dark))' }}>
              <div className="w-9 h-9 rounded-full copper-gradient flex items-center justify-center shadow-md flex-shrink-0">
                <Bot size={17} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-display font-semibold text-sm">Verdant Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-white/35 font-body text-xs">Online · instant replies</span>
                </div>
              </div>
              <Link to="/contact" className="flex items-center gap-1 text-[var(--copper-light)] text-xs font-body hover:text-[var(--copper)] transition-colors">
                Talk to human <ArrowUpRight size={11} />
              </Link>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto px-4 py-4 flex flex-col gap-2.5">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[82%] px-4 py-2.5 text-sm font-body leading-relaxed rounded-2xl ${
                    msg.from === 'user'
                      ? 'copper-gradient text-white rounded-br-sm font-medium'
                      : 'bg-white/7 text-white/80 border border-white/7 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-white/7 border border-white/7 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--copper)' }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.55, delay: i * 0.12, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick suggestions */}
            <AnimatePresence>
              {showQuick && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-2 flex flex-wrap gap-1.5 overflow-hidden"
                >
                  {QUICK.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs font-body px-3 py-1.5 rounded-full border border-[var(--copper)]/25 text-[var(--copper-light)] hover:bg-[var(--copper)]/10 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/6 flex items-center gap-2.5">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask about properties..."
                className="flex-1 bg-white/5 border border-white/8 rounded-full px-4 py-2.5 text-white placeholder-white/20 font-body text-sm outline-none focus:border-[var(--copper)]/35 transition-all"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full copper-gradient flex items-center justify-center flex-shrink-0 disabled:opacity-35 transition-opacity"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
