import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useCatalog } from '../hooks/useCatalog'

interface HeroProps {
  onNavigate: (page: 'home' | 'policies' | 'dashboard' | 'catalog' | 'links') => void
}

export default function Hero({ onNavigate }: HeroProps) {
  const { profile } = useCatalog()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="inicio"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(160deg, #FDF6EE 0%, #F5E9D8 50%, #F2C4CE22 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: 'min(500px, 100%)',
        height: 'min(500px, 100%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242, 196, 206, 0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: 'min(400px, 100%)',
        height: 'min(400px, 100%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Floating petals */}
      {['🌸', '🌹', '✿', '🌺'].map((petal, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            fontSize: `${18 + i * 5}px`,
            opacity: 0.3,
            top: `${20 + i * 18}%`,
            left: `${5 + i * 4}%`,
            animation: `float ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            pointerEvents: 'none',
          }}
          className="petal"
        >
          {petal}
        </div>
      ))}

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(80px, 12vh, 120px) 24px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        width: '100%',
      }} className="hero-grid">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="hero-text-container"
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(201, 168, 76, 0.1)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            borderRadius: '50px',
            padding: '6px 18px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '14px' }}>✨</span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--gold)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }} className="hero-label">
              Confeitaria Artesanal · Brasília
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 10vw, 80px)',
            fontWeight: 800,
            color: 'var(--brown)',
            lineHeight: 1,
            marginBottom: '24px',
            fontFamily: 'Playfair Display, serif'
          }}>
            {profile.name}<br />
            <span style={{ color: 'var(--rose)' }}>Doces</span>
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--brown-mid)',
            marginBottom: '36px',
            maxWidth: '480px',
          }} className="hero-description">
            Brigadeiros gourmet, bolos artesanais e doces personalizados que encantam paladares e criam memórias afetivas inesquecíveis.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('catalog')}
              style={{
                background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                padding: '14px 32px',
                borderRadius: '50px',
                border: 'none',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 30px rgba(201, 125, 140, 0.4)',
                display: 'inline-block',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(201, 125, 140, 0.55)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(201, 125, 140, 0.4)'
              }}
            >
              🍰 Fazer Pedido
            </button>
            <a
              href="#doces"
              style={{
                background: 'transparent',
                color: 'var(--brown)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                padding: '14px 32px',
                borderRadius: '50px',
                textDecoration: 'none',
                border: '2px solid rgba(61, 35, 20, 0.2)',
                transition: 'all 0.3s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold)'
                e.currentTarget.style.color = 'var(--gold)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(61, 35, 20, 0.2)'
                e.currentTarget.style.color = 'var(--brown)'
              }}
            >
              Ver Cardápio
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display: 'flex',
            gap: 'clamp(20px, 5vw, 40px)',
            marginTop: '48px',
            paddingTop: '36px',
            borderTop: '1px solid rgba(201, 168, 76, 0.2)',
            flexWrap: 'wrap'
          }}>
            {[
              { number: '+500', label: 'Pedidos realizados' },
              { number: '5★', label: 'Avaliação média' },
              { number: '8+', label: 'Anos de experiência' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '24px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  color: 'var(--brown-mid)',
                  marginTop: '2px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          {/* Main image frame */}
          <div style={{
            position: 'relative',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(61, 35, 20, 0.2)',
            aspectRatio: '1',
          }} className="hero-img-frame">
            <img
              src="./hero.png"
              alt="Doces artesanais Bia Lobo"
              fetchPriority="high"
              loading="eager"
              width={600}
              height={600}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(160deg, transparent 60%, rgba(242, 196, 206, 0.3))',
            }} />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              background: 'white',
              borderRadius: '20px',
              padding: '10px 15px',
              boxShadow: '0 10px 30px rgba(61,35,20,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 10
            }}
            className="floating-badge"
          >
            <span style={{ fontSize: '20px' }}>🌸</span>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '11px', fontWeight: 700, color: 'var(--brown)' }}>
                100% Artesanal
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'var(--brown-mid)' }}>
                Feito com amor
              </div>
            </div>
          </motion.div>

          {/* Bottom tag */}
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '-10px',
              background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))',
              borderRadius: '16px',
              padding: '10px 15px',
              boxShadow: '0 10px 30px rgba(201, 125, 140, 0.4)',
              color: 'white',
              zIndex: 10
            }}
            className="bottom-tag"
          >
            <div style={{ fontFamily: 'Dancing Script, cursive', fontSize: '13px', marginBottom: '2px' }}>
              Entrega em Brasília 🗺️
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', opacity: 0.9 }}>
              Santa Maria & região
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        opacity: 0.5,
      }} className="scroll-indicator">
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--brown-mid)',
        }}>
          Explorar
        </div>
        <div style={{
          width: '1px',
          height: '30px',
          background: 'linear-gradient(to bottom, var(--rose), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 100px !important;
          }
          .hero-img-frame {
            max-width: 320px;
            margin: 0 auto;
          }
          .petal, .scroll-indicator { display: none; }
          .hero-label { font-size: 10px !important; }
          
          /* Centering for mobile */
          .hero-text-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .hero-text-container h1 {
            text-align: center !important;
          }
          .hero-text-container p {
            text-align: center !important;
          }
          .hero-buttons {
            justify-content: center !important;
          }
          .hero-stats {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}
