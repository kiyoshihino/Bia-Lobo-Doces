import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const products = [
  {
    emoji: '🍫',
    name: 'Brigadeiro Gourmet',
    desc: 'Brigadeiros artesanais com coberturas especiais: chocolate belga, pistache, maracujá, doce de leite e muito mais.',
    tags: ['Clássico', 'Gourmet', 'Personalizado'],
    color: '#6B3D2E',
    bgColor: 'rgba(107, 61, 46, 0.08)',
  },
  {
    emoji: '🎂',
    name: 'Bolos Artesanais',
    desc: 'Bolos decorados para todas as ocasiões: aniversários, casamentos, chás de bebê. Beleza e sabor em harmonia.',
    tags: ['Decorado', 'Encomenda', 'Ocasião'],
    color: '#C97D8C',
    bgColor: 'rgba(201, 125, 140, 0.08)',
  },
  {
    emoji: '🍮',
    name: 'Bolo de Pote',
    desc: 'Camadas de sabor em porções individuais. Perfeito para eventos, mesas de doces e mimos especiais.',
    tags: ['Individual', 'Evento', 'Mimo'],
    color: '#C9A84C',
    bgColor: 'rgba(201, 168, 76, 0.08)',
  },
  {
    emoji: '🍭',
    name: 'Mesa de Doces',
    desc: 'Montagem completa de mesa de doces para eventos. Brigadeiros, bem-casados, doces finos e muito mais.',
    tags: ['Evento', 'Completo', 'Premium'],
    color: '#9B5A6A',
    bgColor: 'rgba(155, 90, 106, 0.08)',
  },
  {
    emoji: '🥐',
    name: 'Docinhos Finos',
    desc: 'Travesseiros de noiva, cajuzinhos, olho de sogra, beijinhos e outros clássicos da confeitaria brasileira.',
    tags: ['Tradição', 'Fino', 'Casamento'],
    color: '#8B6914',
    bgColor: 'rgba(139, 105, 20, 0.08)',
  },
  {
    emoji: '🎁',
    name: 'Kits Presenteáveis',
    desc: 'Caixinhas e kits de doces personalizados para presentear com estilo. Embalagem premium inclusa.',
    tags: ['Presente', 'Personalizado', 'Embalagem'],
    color: '#C97D8C',
    bgColor: 'rgba(242, 196, 206, 0.2)',
  },
]

function ProductCard({ product, index }: { product: typeof products[0], index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-hover"
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 4px 20px rgba(61,35,20,0.06)',
        border: '1px solid rgba(201,168,76,0.1)',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        background: product.bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        marginBottom: '16px',
      }}>
        {product.emoji}
      </div>

      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '20px',
        fontWeight: 600,
        color: 'var(--brown)',
        marginBottom: '10px',
      }}>
        {product.name}
      </h3>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        lineHeight: 1.6,
        color: 'var(--brown-mid)',
        marginBottom: '16px',
      }}>
        {product.desc}
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {product.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '50px',
            background: product.bgColor,
            color: product.color,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="doces" style={{
      background: 'linear-gradient(160deg, #F5E9D8 0%, #FDF6EE 100%)',
      padding: 'clamp(60px, 8vw, 100px) 24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '22px',
            color: 'var(--rose)',
            display: 'block',
            marginBottom: '8px',
          }}>
            Cardápio
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--brown)',
            marginBottom: '16px',
          }}>
            Nossos Doces
          </h2>
          <div className="ornament-divider">
            <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✦</span>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--brown-mid)',
            maxWidth: '520px',
            margin: '16px auto 0',
            lineHeight: 1.7,
          }}>
            Doces artesanais feitos sob encomenda com ingredientes de qualidade. Consulte disponibilidade e personalizações.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="products-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px',
          marginBottom: '48px',
        }}>
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://wa.me/5561992590209?text=Olá%20Bia!%20Gostaria%20de%20saber%20mais%20sobre%20os%20doces%20e%20fazer%20um%20orçamento%20🍰"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, var(--brown), var(--brown-mid))',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              padding: '16px 40px',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(61,35,20,0.25)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(61,35,20,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(61,35,20,0.25)'
            }}
          >
            📱 Solicitar Orçamento pelo WhatsApp
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .products-grid > div {
            padding: 20px 16px !important;
          }
          .products-grid h3 {
            font-size: 16px !important;
            margin-bottom: 6px !important;
          }
          .products-grid p {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
    </section>
  )
}
