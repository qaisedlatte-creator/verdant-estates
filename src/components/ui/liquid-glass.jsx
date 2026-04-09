import React from 'react'

// Global SVG filter – render once in the app
export function GlassFilter() {
  return (
    <svg style={{ display: 'none', position: 'absolute', width: 0, height: 0 }} aria-hidden>
      <defs>
        <filter
          id="glass-distortion"
          x="0%" y="0%" width="100%" height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0015 0.006"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0" k2="1" k3="1" k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="180"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

// Core glass wrapper
export function GlassEffect({ children, className = '', style = {}, onClick, as: Tag = 'div' }) {
  return (
    <Tag
      onClick={onClick}
      className={`relative flex font-semibold overflow-hidden cursor-pointer transition-all duration-500 ${className}`}
      style={{
        boxShadow: '0 6px 16px rgba(0,0,0,0.25), 0 0 24px rgba(0,0,0,0.12)',
        transitionTimingFunction: 'cubic-bezier(0.175,0.885,0.32,2.2)',
        ...style,
      }}
    >
      {/* Glass distortion layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          filter: 'url(#glass-distortion)',
          isolation: 'isolate',
        }}
      />
      {/* White tint */}
      <div
        className="absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: 'rgba(255,255,255,0.18)' }}
      />
      {/* Inner highlight ring */}
      <div
        className="absolute inset-0 z-20 rounded-[inherit] overflow-hidden"
        style={{
          boxShadow:
            'inset 1.5px 1.5px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(255,255,255,0.35)',
        }}
      />
      {/* Content */}
      <div className="relative z-30 w-full">{children}</div>
    </Tag>
  )
}

// Pill / badge variant
export function GlassPill({ children, className = '' }) {
  return (
    <GlassEffect className={`rounded-full px-5 py-2.5 ${className}`}>
      {children}
    </GlassEffect>
  )
}

// Card variant
export function GlassCard({ children, className = '' }) {
  return (
    <GlassEffect className={`rounded-3xl ${className}`}>
      {children}
    </GlassEffect>
  )
}

// Button variant with hover expand
export function GlassButton({ children, onClick, className = '' }) {
  return (
    <GlassEffect
      as="button"
      onClick={onClick}
      className={`rounded-2xl px-7 py-3.5 hover:px-8 hover:py-4 hover:rounded-3xl ${className}`}
    >
      <div
        className="transition-all duration-500"
        style={{ transitionTimingFunction: 'cubic-bezier(0.175,0.885,0.32,2.2)' }}
      >
        {children}
      </div>
    </GlassEffect>
  )
}
