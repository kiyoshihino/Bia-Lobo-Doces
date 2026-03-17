import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'
import type { Product } from '../hooks/useCatalog'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { profile } = useCatalog()

  if (!product) return null

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Olá ${profile.name}! Gostaria de encomendar o produto:\n\n` +
      `*${product.name}*\n` +
      `Valor: R$ ${product.price.toFixed(2)}\n\n` +
      `Vim pelo site! ✨`
    )
    window.open(`https://wa.me/${profile.whatsapp}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {product && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 9999, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px'
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(61, 35, 20, 0.4)',
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              backgroundColor: 'var(--cream)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'row',
              boxShadow: '0 50px 100px rgba(0,0,0,0.2)'
            }}
            className="product-modal-content"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: 'var(--brown)'
              }}
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div style={{ 
              flex: '1.2', 
              backgroundColor: 'white',
              position: 'relative',
              minHeight: '400px'
            }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content Section */}
            <div style={{ 
              flex: '1', 
              padding: 'clamp(40px, 5vw, 60px) clamp(20px, 4vw, 40px)', 
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: 'var(--cream)',
              overflowY: 'auto',
              position: 'relative'
            }}>
              <span style={{ 
                fontFamily: 'Dancing Script, cursive', 
                fontSize: '24px', 
                color: 'var(--rose)', 
                display: 'block',
                marginBottom: '8px'
              }}>
                {product.category}
              </span>
              <h2 style={{ 
                fontFamily: 'Playfair Display, serif', 
                fontSize: '36px', 
                color: 'var(--brown)', 
                marginBottom: '20px',
                lineHeight: 1.2
              }}>
                {product.name}
              </h2>
              
              <div style={{ 
                fontSize: 'clamp(24px, 4vw, 28px)', 
                fontFamily: 'Playfair Display, serif', 
                color: 'var(--rose)', 
                fontWeight: 600, 
                marginBottom: '24px'
              }}>
                R$ {product.price.toFixed(2)}
              </div>

              <p style={{ 
                fontSize: '15px', 
                lineHeight: 1.8, 
                color: 'var(--brown-mid)',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '40px',
                fontStyle: 'italic',
                opacity: 0.9,
                whiteSpace: 'pre-wrap',
                flexShrink: 0
              }}>
                {product.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={handleWhatsAppOrder}
                  style={{ 
                    backgroundColor: 'var(--brown)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '18px 32px', 
                    borderRadius: '100px', 
                    fontWeight: 700, 
                    fontSize: '15px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 10px 20px rgba(61, 35, 20, 0.15)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(61, 35, 20, 0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(61, 35, 20, 0.15)'
                  }}
                >
                  <MessageCircle size={20} /> Pedir pelo WhatsApp
                </button>
              </div>
            </div>
          </motion.div>

          <style>{`
            @media (max-width: 768px) {
              .product-modal-content {
                flex-direction: column !important;
                max-height: 95vh !important;
              }
              .product-modal-content > div:first-child {
                min-height: 250px !important;
                flex: none !important;
              }
              .product-modal-content > div:last-child {
                padding: 30px 20px !important;
                flex: 1 !important;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  )
}
