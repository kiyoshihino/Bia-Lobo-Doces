import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, MessageCircle, Globe, MapPin, ShoppingBag, ExternalLink } from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'
import { useState } from 'react'

interface BioLinksProps {
  onNavigate: (page: 'home' | 'policies' | 'dashboard' | 'catalog' | 'links') => void
}

export default function BioLinks({ onNavigate }: BioLinksProps) {
  const { profile } = useCatalog()
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const links = [
    {
      id: 1,
      title: 'Nosso Cardápio',
      subtitle: 'Principais delícias Bia Lobo',
      icon: ShoppingBag,
      gradient: 'linear-gradient(135deg, #9B5A6A 0%, #C97D8C 50%, #F2C4CE 100%)',
      shadowColor: 'rgba(155, 90, 106, 0.4)',
      featured: true,
      action: () => onNavigate('catalog'),
    },
    {
      id: 2,
      title: 'Falar com a Bia',
      subtitle: 'Tire suas dúvidas agora',
      icon: MessageCircle,
      gradient: 'linear-gradient(135deg, #128C7E 0%, #25D366 100%)',
      shadowColor: 'rgba(37, 211, 102, 0.3)',
      href: `https://wa.me/5561992590209?text=${encodeURIComponent('Olá Bia, tudo bem? Vim através do link de Bio e gostaria de tirar algumas dúvidas, pode me ajudar?')}`,
    },
    {
      id: 3,
      title: 'Instagram',
      subtitle: `@${profile.instagram.replace('@', '')}`,
      icon: Instagram,
      gradient: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)',
      shadowColor: 'rgba(225, 48, 108, 0.3)',
      href: `https://www.instagram.com/${profile.instagram.replace('@', '')}/`,
    },
    {
      id: 4,
      title: 'Nosso Website',
      subtitle: 'Conheça nossa história',
      icon: Globe,
      gradient: 'linear-gradient(135deg, #6B3D2E 0%, #9B5A6A 100%)',
      shadowColor: 'rgba(107, 61, 46, 0.3)',
      action: () => onNavigate('home'),
    },
    {
      id: 5,
      title: 'Localização',
      subtitle: profile.addressShort || 'Santa Maria, Brasília',
      icon: MapPin,
      gradient: 'linear-gradient(135deg, #C9A84C 0%, #E8D5A3 100%)',
      shadowColor: 'rgba(201, 168, 76, 0.3)',
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address)}`,
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Full-page background photo */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundImage: 'url(/biolinks-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        transform: 'scale(1.05)',
        filter: 'blur(2px) brightness(0.45)',
      }} />

      {/* Gradient overlays for depth and readability */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(14,10,15,0.5) 0%, rgba(14,10,15,0.1) 30%, rgba(14,10,15,0.2) 70%, rgba(14,10,15,0.7) 100%)',
      }} />
      {/* Subtle rose vignette at top */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top, rgba(155,90,106,0.18) 0%, transparent 65%)',
      }} />
      {/* Gold shimmer at bottom */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at bottom, rgba(201,168,76,0.12) 0%, transparent 60%)',
      }} />

      {/* Content Wrapper */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '480px',
        padding: '60px 24px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          {/* Logo with glow ring */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: '-6px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #9B5A6A, #C9A84C, #F2C4CE, #C9A84C, #9B5A6A)',
                padding: '3px',
                zIndex: 0,
              }}
            />
            <div style={{
              position: 'relative', zIndex: 1,
              width: '110px', height: '110px',
              borderRadius: '50%',
              border: '3px solid #0e0a0f',
              overflow: 'hidden',
              background: '#1a1020',
            }}>
              {profile.logo && profile.logo !== '🌸' ? (
                <img src={profile.logo.replace(/^\.\//, '/')} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', background: 'linear-gradient(135deg, #9B5A6A, #C97D8C)' }}>🌸</div>
              )}
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(26px, 6vw, 34px)',
              fontWeight: 800,
              color: '#F5E9D8',
              marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '20px',
              color: '#C9A84C',
              letterSpacing: '1px',
              marginBottom: '20px',
            }}
          >
            Doces que encantam
          </motion.p>

          {/* Story badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: 'inline-flex',
              gap: '6px',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '40px',
              padding: '8px 18px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(245,233,216,0.7)', fontWeight: 500 }}>Pedidos abertos agora</span>
          </motion.div>
        </motion.div>

        {/* Links */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                if (link.action) { e.preventDefault(); link.action() }
              }}
              target={link.href ? '_blank' : undefined}
              rel={link.href ? 'noopener noreferrer' : undefined}
              onHoverStart={() => setHoveredId(link.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: link.featured ? '20px 22px' : '16px 20px',
                background: link.featured
                  ? link.gradient
                  : 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                border: link.featured
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.09)',
                boxShadow: link.featured
                  ? `0 16px 40px ${link.shadowColor}`
                  : hoveredId === link.id
                  ? `0 10px 30px ${link.shadowColor}`
                  : '0 4px 15px rgba(0,0,0,0.3)',
                backdropFilter: link.featured ? 'none' : 'blur(16px)',
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Shimmer on hover for non-featured */}
              {!link.featured && (
                <AnimatePresence>
                  {hoveredId === link.id && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      exit={{ x: '200%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: 0, bottom: 0, left: 0,
                        width: '50%',
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
                        transform: 'skewX(-15deg)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </AnimatePresence>
              )}

              {/* Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: link.featured ? '52px' : '46px',
                  height: link.featured ? '52px' : '46px',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: link.featured
                    ? 'rgba(255,255,255,0.25)'
                    : link.gradient,
                  flexShrink: 0,
                  boxShadow: link.featured ? 'none' : `0 6px 20px ${link.shadowColor}`,
                }}>
                  <link.icon size={link.featured ? 26 : 22} color="white" strokeWidth={2} />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: link.featured ? '17px' : '15px',
                    fontWeight: 700,
                    color: link.featured ? 'white' : '#F5E9D8',
                    margin: 0,
                    letterSpacing: '-0.2px',
                  }}>{link.title}</h2>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: link.featured ? 'rgba(255,255,255,0.8)' : 'rgba(245,233,216,0.5)',
                    margin: '2px 0 0',
                    fontWeight: 400,
                  }}>{link.subtitle}</p>
                </div>
              </div>

              <ExternalLink size={16} color={link.featured ? 'rgba(255,255,255,0.6)' : 'rgba(245,233,216,0.3)'} />
            </motion.a>
          ))}
        </div>

        {/* Gallery preview strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ marginTop: '48px', width: '100%', textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, color: 'rgba(245,233,216,0.3)', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '16px' }}>Criações Recentes</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {['/gallery/1.jpg','/gallery/2.jpg','/gallery/3.jpg','/gallery/4.jpg'].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.07, duration: 0.5 }}
                whileHover={{ scale: 1.08 }}
                style={{
                  width: '64px', height: '64px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.08)',
                  flexShrink: 0,
                }}
              >
                <img src={src} alt="Criação" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            marginTop: '48px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: 'rgba(245,233,216,0.2)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          &copy; {new Date().getFullYear()} {profile.name}
        </motion.p>
      </div>
    </div>
  )
}
