import { motion } from 'framer-motion'
import { useCatalog } from '../hooks/useCatalog'

interface CategoryShowcaseProps {
  onSelectCategory: (categoryName: string) => void
}

export default function CategoryShowcase({ onSelectCategory }: CategoryShowcaseProps) {
  const { categories } = useCatalog()

  return (
    <section id="categorias" style={{ padding: '100px 24px', backgroundColor: 'var(--cream)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '28px',
              color: 'var(--rose)',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            Arte em Doces
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 400,
              color: 'var(--brown)',
              marginBottom: '20px',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Nosso Cardápio
          </motion.h2>
          <div className="ornament-divider">
            <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✦</span>
          </div>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '32px' 
        }}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectCategory(category.name)}
              style={{
                position: 'relative',
                height: '400px',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--brown)',
              }}
              whileHover="hover"
            >
              <motion.img
                variants={{
                  hover: { scale: 1.1 }
                }}
                transition={{ duration: 0.6 }}
                src={category.image}
                alt={category.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.85
                }}
              />
              
              {/* Overlay Gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(61, 35, 20, 0.8) 0%, rgba(61, 35, 20, 0.2) 50%, transparent 100%)',
                zIndex: 1
              }} />

              {/* Text Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '40px',
                zIndex: 2,
                textAlign: 'center'
              }}>
                <motion.h3
                  variants={{
                    hover: { y: -10 }
                  }}
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '32px',
                    color: 'white',
                    marginBottom: '8px',
                    fontWeight: 500,
                    letterSpacing: '1px'
                  }}
                >
                  {category.name}
                </motion.h3>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  variants={{
                    hover: { opacity: 1, y: 0 }
                  }}
                  style={{
                    color: 'var(--gold-light)',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Descobrir mais
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '60px',
            textAlign: 'center'
          }}
        >
          <button
            onClick={() => onSelectCategory('Todos')}
            style={{
              background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              padding: '18px 48px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 30px rgba(201, 125, 140, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(201, 125, 140, 0.55)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(201, 125, 140, 0.4)'
            }}
          >
            💖 Ver todos os produtos
          </button>
        </motion.div>
      </div>
    </section>
  )
}
