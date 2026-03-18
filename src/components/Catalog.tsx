import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCatalog } from '../hooks/useCatalog'
import type { Product } from '../hooks/useCatalog'

interface CatalogProps {
  onSelectProduct?: (product: Product) => void
  initialCategory?: string
}

export default function Catalog({ onSelectProduct, initialCategory = 'Todos' }: CatalogProps) {
  const { products, categories, profile } = useCatalog()
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([])
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id)
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) return

    const message = encodeURIComponent(
      `Olá ${profile.name}! Gostaria de fazer um pedido:\n\n` +
      cart.map(item => `- ${item.quantity}x ${item.product.name} (R$ ${(item.product.price * item.quantity).toFixed(2)})`).join('\n') +
      `\n\nTotal: R$ ${cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}\n\n` +
      `Vim pelo site! ✨`
    )
    window.open(`https://wa.me/${profile.whatsapp}?text=${message}`, '_blank')
  }

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter((p: Product) => p.category === activeCategory)

  return (
    <section id="doces" style={{ padding: 'clamp(100px, 15vh, 160px) 24px 100px', backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'inline-block', marginBottom: '20px' }}
          >
            <span style={{ 
              fontFamily: 'Dancing Script, cursive', 
              fontSize: '32px', 
              color: 'var(--rose)', 
              display: 'block'
            }}>
              Arte em Doces
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontSize: 'clamp(40px, 8vw, 72px)', 
              fontWeight: 400, 
              color: 'var(--brown)', 
              marginBottom: '32px', 
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-2px'
            }}
          >
            Nosso Cardápio
          </motion.h2>
          
          {/* Elegant Category Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '40px', 
            overflowX: 'auto', 
            padding: '20px 0',
            marginBottom: '60px',
            borderTop: '1px solid rgba(61, 35, 20, 0.1)',
            borderBottom: '1px solid rgba(61, 35, 20, 0.1)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }} className="category-nav hide-scrollbar">
            <button
               onClick={() => setActiveCategory('Todos')}
               style={{
                 background: 'none',
                 border: 'none',
                 cursor: 'pointer',
                 fontFamily: 'Inter, sans-serif',
                 fontSize: '14px',
                 fontWeight: 600,
                 textTransform: 'uppercase',
                 letterSpacing: '2px',
                 color: activeCategory === 'Todos' ? 'var(--rose)' : 'var(--brown-mid)',
                 position: 'relative',
                 transition: 'color 0.3s'
               }}
            >
              Todos
              {activeCategory === 'Todos' && <motion.div layoutId="cat-underline" style={{ position: 'absolute', bottom: '-22px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--rose)' }} />}
            </button>

            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: activeCategory === cat.name ? 'var(--rose)' : 'var(--brown-mid)',
                  position: 'relative',
                  transition: 'color 0.3s'
                }}
              >
                {cat.name}
                {activeCategory === cat.name && <motion.div layoutId="cat-underline" style={{ position: 'absolute', bottom: '-22px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--rose)' }} />}
              </button>
            ))}
          </div>
        </header>

        {/* High-End Layout Grid */}
        <div className="catalog-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', 
          gap: '40px 24px' 
        }}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product: Product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                <div style={{ 
                  aspectRatio: '4/5', 
                  overflow: 'hidden', 
                  position: 'relative',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  boxShadow: '0 20px 40px rgba(61, 35, 20, 0.05)'
                }}>
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                    <h3 
                      onClick={() => onSelectProduct?.(product)}
                      style={{ 
                        fontSize: '28px', 
                        fontWeight: 500, 
                        color: 'var(--brown)', 
                        fontFamily: 'Playfair Display, serif',
                        lineHeight: 1.2,
                        cursor: 'pointer'
                      }}
                    >
                      {product.name}
                    </h3>
                  </div>
                  

                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    color: 'var(--rose)', 
                    marginBottom: '20px',
                    fontFamily: 'Playfair Display, serif'
                  }}>
                    R$ {product.price.toFixed(2)}
                  </div>
                  
                  <button 
                    onClick={() => onSelectProduct ? onSelectProduct(product) : addToCart(product)}
                    style={{ 
                      backgroundColor: 'transparent', 
                      color: 'var(--brown)', 
                      border: '1px solid var(--brown)', 
                      padding: '12px 32px', 
                      borderRadius: '100px', 
                      fontWeight: 600, 
                      fontSize: '13px',
                      textTransform: 'uppercase', 
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'var(--brown)'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--brown)'
                    }}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Float Cart Button */}
        {cart.length > 0 && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ 
              position: 'fixed', 
              bottom: '40px', 
              right: '40px', 
              zIndex: 1000 
            }}
          >
            <button 
              onClick={handleCheckout}
              style={{
                backgroundColor: 'var(--brown)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '100px',
                border: 'none',
                boxShadow: '0 20px 40px rgba(61,35,20,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <ShoppingCart size={24} />
              Finalizar Pedido ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </button>
          </motion.div>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .category-nav {
            gap: 15px !important;
            flex-wrap: wrap !important;
            padding: 15px 0 !important;
            margin-bottom: 40px !important;
          }
          .category-nav button {
            font-size: 11px !important;
            letter-spacing: 0.5px !important;
          }
          .category-nav div[style*="height: '2px'"] {
            bottom: -17px !important;
          }
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px 12px !important;
          }
          .catalog-grid h3 {
            font-size: 18px !important;
          }
          .catalog-grid div[style*="fontSize: '18px'"] {
            font-size: 16px !important;
            margin-bottom: 12px !important;
          }
          .catalog-grid button {
            padding: 8px 16px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </section>
  )
}
