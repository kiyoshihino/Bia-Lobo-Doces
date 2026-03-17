import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Heart, Award } from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'

const values = [
  { icon: '🌸', title: 'Amor em cada detalhe', desc: 'Cada doce é preparado com cuidado e carinho, como se fosse para a própria família.' },
  { icon: '✨', title: 'Ingredientes selecionados', desc: 'Utilizamos apenas os melhores ingredientes para garantir sabor e qualidade excepcionais.' },
  { icon: '🎁', title: 'Personalização total', desc: 'Criamos doces únicos para cada ocasião, do sabor à embalagem, tudo do seu jeito.' },
]

export default function About() {
  const { profile } = useCatalog()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" ref={ref} style={{
      background: 'linear-gradient(135deg, #FDF6EE 0%, #F5E9D8 100%)',
      padding: 'clamp(60px, 8vw, 100px) 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-150px',
        transform: 'translateY(-50%)',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242,196,206,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
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
            Nossa história
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--brown)',
            marginBottom: '16px',
          }}>
            Quem é a Bia
          </h2>
          <div className="ornament-divider" style={{ marginBottom: '40px' }}>
            <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✦</span>
          </div>
        </motion.div>

        {/* Content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }} className="about-grid">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(61,35,20,0.15)',
              aspectRatio: '4/5',
            }}>
              <img
                src="/about_bia.jpg"
                alt="Bia Lobo - Confeiteira"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '-24px',
                right: '-24px',
                background: 'white',
                borderRadius: '16px',
                padding: '20px 24px',
                boxShadow: '0 10px 40px rgba(61,35,20,0.12)',
                maxWidth: '220px',
                borderLeft: '4px solid var(--rose)',
              }}
            >
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '14px',
                fontStyle: 'italic',
                color: 'var(--brown)',
                lineHeight: 1.5,
              }}>
                "Cada doce é uma expressão de afeto e dedicação."
              </p>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: Sparkles, label: 'Ingredientes Premium' },
                  { icon: Heart, label: 'Feito com Amor' },
                  { icon: Award, label: `${profile.experience} de Experiência` }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <item.icon size={16} color="var(--rose)" />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rose)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ color: 'var(--brown-mid)', fontSize: '18px', lineHeight: 1.8 }}>
                <p>
                  {profile.bio}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {values.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '16px',
                      background: 'rgba(242,196,206,0.1)',
                      borderRadius: '12px',
                      border: '1px solid rgba(201,168,76,0.15)',
                    }}
                  >
                    <div style={{
                      fontSize: '24px',
                      flexShrink: 0,
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(242,196,206,0.3)',
                      borderRadius: '12px',
                    }}>
                      {value.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--brown)',
                        marginBottom: '4px',
                      }}>
                        {value.title}
                      </h3>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: 'var(--brown-mid)',
                        lineHeight: 1.5,
                      }}>
                        {value.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
