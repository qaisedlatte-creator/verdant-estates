import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.95] : [1.04, 1])
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-4 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: '1200px' }}>
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  )
}

export function ScrollHeader({ translate, titleComponent }) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center mb-2"
    >
      {titleComponent}
    </motion.div>
  )
}

export function ScrollCard({ rotate, scale, children }) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        transformOrigin: 'top center',
        border: '1px solid rgba(184,123,44,0.22)',
        background: 'var(--bg-dark)',
        borderRadius: '28px',
        overflow: 'hidden',
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[44rem] w-full"
    >
      <div className="scroll-card-inner">
        {children}
      </div>
    </motion.div>
  )
}
