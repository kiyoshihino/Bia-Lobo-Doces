import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Mariana Silva',
    text: 'Os doces da Bia são simplesmente divinos! O brigadeiro de pistache é o melhor que já comi na vida. Recomendo para todos os meus amigos.',
    rating: 5,
    role: 'Cliente desde 2021'
  },
  {
    name: 'Ricardo Lima',
    text: 'Encomendei o bolo de aniversário da minha filha e superou todas as expectativas. Além de lindo, o sabor era equilibrado e muito fresco.',
    rating: 5,
    role: 'Festa Infantil'
  },
  {
    name: 'Ana Paula G.',
    text: 'Atendimento impecável e doces que são verdadeiras obras de arte. A Bia é extremamente atenciosa com cada detalhe do pedido.',
    rating: 5,
    role: 'Casamento'
  }
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="depoimentos" style={{ padding: '80px 24px', backgroundColor: 'white', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: '24px', color: 'var(--rose)', display: 'block', marginBottom: '8px' }}>
            Depoimentos
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--brown)', marginBottom: '24px' }}>
            O que nossos clientes dizem
          </h2>
          <div className="ornament-divider">
            <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✦</span>
          </div>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px' 
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              style={{
                padding: '40px',
                borderRadius: '32px',
                backgroundColor: 'var(--cream)',
                border: '1px solid rgba(201, 168, 76, 0.15)',
                position: 'relative',
                transition: 'transform 0.3s ease',
              }}
              className="card-hover"
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '40px',
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--rose)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 10px 20px rgba(201, 125, 140, 0.3)'
              }}>
                <Quote size={20} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', marginBottom: '20px' }}>
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} style={{ fill: 'var(--gold)', color: 'var(--gold)' }} />
                ))}
              </div>

              <p style={{ 
                fontFamily: 'Inter, sans-serif', 
                color: 'var(--brown-mid)', 
                fontStyle: 'italic', 
                marginBottom: '24px', 
                lineHeight: 1.7 
              }}>
                "{t.text}"
              </p>

              <div>
                <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--brown)', fontSize: '18px' }}>
                  {t.name}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--rose)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
