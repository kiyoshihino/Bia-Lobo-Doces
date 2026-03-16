import { motion } from 'framer-motion'
import { Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../hooks/useProducts'
import { useProducts } from '../hooks/useProducts'

export default function Catalog() {
  const { products } = useProducts()
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([])

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
      `Olá Bia! Gostaria de fazer um pedido:\n\n` +
      cart.map(item => `- ${item.quantity}x ${item.product.name} (R$ ${(item.product.price * item.quantity).toFixed(2)})`).join('\n') +
      `\n\nTotal: R$ ${cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}\n\n` +
      `Vim pelo site! ✨`
    )
    window.open(`https://wa.me/5561992590209?text=${message}`, '_blank')
  }

  return (
    <section id="doces" style={{ padding: '100px 24px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: '24px', color: 'var(--rose)', display: 'block', marginBottom: '8px' }}>
            Cardápio Online
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--brown)', marginBottom: '24px' }}>
            Nossas Doçuras Artesanais
          </h2>
          <div className="ornament-divider">
            <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✦</span>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-hover"
              style={{
                backgroundColor: 'var(--cream)',
                borderRadius: '30px',
                overflow: 'hidden',
                border: '1px solid rgba(201, 168, 76, 0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  className="product-img"
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  right: '16px', 
                  backgroundColor: 'white', 
                  color: 'var(--brown)', 
                  fontWeight: 700, 
                  padding: '6px 14px', 
                  borderRadius: '100px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '14px'
                }}>
                  R$ {product.price.toFixed(2)}
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brown)', marginBottom: '8px' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--brown-mid)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {product.description}
                </p>
                
                <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                   <button 
                    onClick={() => addToCart(product)}
                    style={{ 
                      flex: 1,
                      backgroundColor: 'var(--rose)', 
                      color: 'white', 
                      border: 'none', 
                      padding: '12px', 
                      borderRadius: '16px', 
                      fontWeight: 600, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Plus size={18} /> Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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
    </section>
  )
}
