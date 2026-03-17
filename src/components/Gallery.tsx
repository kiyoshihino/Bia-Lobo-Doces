import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useCatalog } from '../hooks/useCatalog'

// Google Drive image IDs from the Bia Lobo folder
const galleryItems = [
  { id: 6, src: './gallery/6.jpg', alt: 'Brigadeiros Gourmet' },
  { id: 1, src: './gallery/1.jpg', alt: 'Criação Bia Lobo 1' },
  { id: 7, src: './gallery/7.jpg', alt: 'Bia Lobo com Bolo' },
  { id: 2, src: './gallery/2.jpg', alt: 'Criação Bia Lobo 2' },
  { id: 3, src: './gallery/3.jpg', alt: 'Criação Bia Lobo 3' },
  { id: 4, src: './gallery/4.jpg', alt: 'Criação Bia Lobo 4' },
  { id: 5, src: './gallery/5.jpg', alt: 'Criação Bia Lobo 5' },
]

// Fallback gradient colors in case images don't load
const fallbackColors = [
  'linear-gradient(135deg, #F2C4CE, #C97D8C)',
  'linear-gradient(135deg, #C9A84C, #E8D5A3)',
  'linear-gradient(135deg, #FDF6EE, #F5E9D8)',
  'linear-gradient(135deg, #9B5A6A, #C97D8C)',
  'linear-gradient(135deg, #6B3D2E, #9B5A6A)',
  'linear-gradient(135deg, #F2C4CE, #FDF6EE)',
]

const fallbackEmojis = ['🍫', '🎂', '🍮', '🍭', '🥐', '🎁']

function GalleryCard({ item, index }: { item: typeof galleryItems[0], index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [imageError, setImageError] = useState(false)

  const sizes = [
    { gridColumn: 'span 1', gridRow: 'span 2' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 2' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        ...sizes[index % sizes.length],
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        background: imageError ? fallbackColors[index % fallbackColors.length] : '#F5E9D8',
        minHeight: '200px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(61,35,20,0.2)' }}
    >
      {!imageError ? (
        <img
          src={item.src}
          alt={item.alt}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          background: fallbackColors[index % fallbackColors.length],
          minHeight: '200px',
        }}>
          {fallbackEmojis[index % fallbackEmojis.length]}
        </div>
      )}
    </motion.div>
  )
}

export default function Gallery() {
  const { profile } = useCatalog()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="galeria" style={{
      background: 'white',
      padding: 'clamp(60px, 8vw, 100px) 24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '22px',
            color: 'var(--rose)',
            display: 'block',
            marginBottom: '8px',
          }}>
            Fotos reais
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--brown)',
            marginBottom: '16px',
          }}>
            Galeria de Criações
          </h2>
          <div className="ornament-divider">
            <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✦</span>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--brown-mid)',
            maxWidth: '500px',
            margin: '16px auto 0',
            lineHeight: 1.6,
          }}>
            Cada peça é única, feita com carinho e atenção aos detalhes.<br />
            Inspire-se nas nossas criações.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '220px',
          gap: '16px',
          marginBottom: '48px',
        }} className="gallery-grid">
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            textAlign: 'center',
            padding: '36px',
            background: 'linear-gradient(135deg, #F2C4CE22, #C9A84C11)',
            borderRadius: '20px',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '20px',
            color: 'var(--brown)',
            marginBottom: '16px',
          }}>
            Quer ver mais criações? Nos siga no Instagram! 📸
          </p>
          <a
            href={`https://www.instagram.com/${profile.instagram.replace('@', '')}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #C13584, #E1306C, #F56040, #FFDC80)',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(225, 48, 108, 0.35)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(225, 48, 108, 0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(225, 48, 108, 0.35)'
            }}
          >
            📷 @{profile.instagram.replace('@', '')}
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 160px !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 200px !important;
          }
        }
      `}</style>
    </section>
  )
}
