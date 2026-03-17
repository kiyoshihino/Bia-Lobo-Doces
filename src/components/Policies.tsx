import { motion } from 'framer-motion'
import { ArrowLeft, Info, AlertTriangle, Truck, Clock, Palette, Utensils, Calendar } from 'lucide-react'

interface PoliciesProps {
  onBack: () => void
}

export default function Policies({ onBack }: PoliciesProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--cream)', paddingTop: '80px' }}>
      {/* Header section */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))', 
        padding: '60px 24px', 
        color: 'white', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, opacity: 0.1, transform: 'scale(1.5)', pointerEvents: 'none' }}>
           <Palette size={400} />
        </div>
        
        <button 
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >
          <ArrowLeft size={24} />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: '24px', color: 'var(--blush)', display: 'block', marginBottom: '8px' }}>
            Informações importantes
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: '24px' }}>
            Políticas e Cuidados
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px', opacity: 0.9 }}>
            BIA LOBO — Confeitaria artesanal para momentos especiais. Tudo o que você precisa saber para garantir a melhor experiência.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        
        {/* Section 1: Sobre os Produtos */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ color: 'var(--rose)', backgroundColor: 'var(--blush)', padding: '12px', borderRadius: '16px' }}><Info size={28} /></div>
            <h2 style={{ fontSize: '28px', color: 'var(--brown)', fontWeight: 700 }}>Sobre nossos Produtos</h2>
          </div>
          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--brown-mid)' }}>
            Nossos doces e bolos são produzidos artesanalmente, com acabamento refinado e estrutura sensível à manipulação e temperatura. Por esse motivo, requerem cuidados específicos de transporte e conservação para manter qualidade, sabor e apresentação.
          </p>
        </motion.section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '60px' }} className="policy-grid">
          
          {/* Section 2: Política de Compras */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(61,35,20,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Calendar size={24} style={{ color: 'var(--gold)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brown)' }}>Política de Compras</h3>
            </div>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--brown-mid)', fontSize: '15px' }}>
              <li>Pedidos devem ser realizados com mínimo de <strong>7 dias de antecedência</strong>.</li>
              <li>A confirmação do pedido ocorre mediante pagamento de <strong>50% do valor total (sinal)</strong>.</li>
              <li>O saldo restante deverá ser quitado até a data combinada de entrega/retirada.</li>
            </ul>
          </motion.div>

          {/* Section 3: Cancelamento */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(61,35,20,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <AlertTriangle size={24} style={{ color: 'var(--rose)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--brown)' }}>Política de Cancelamento</h3>
            </div>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--brown-mid)', fontSize: '15px' }}>
              <li>Cancelamentos com até <strong>4 dias de antecedência</strong>: devolução integral do valor pago.</li>
              <li>Após esse prazo: o valor do sinal (50%) <strong>não é reembolsado</strong>.</li>
            </ul>
          </motion.div>
        </div>

        {/* Section 4: Entrega e Retirada */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            marginBottom: '60px', 
            backgroundColor: 'var(--cream-dark)', 
            padding: '40px', 
            borderRadius: '32px',
            border: '2px dashed var(--gold)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <Truck size={28} style={{ color: 'var(--gold)' }} />
            <h2 style={{ fontSize: '28px', color: 'var(--brown)', fontWeight: 700 }}>Entrega e Retirada</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="delivery-grid">
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🛵 Entrega:
              </h4>
              <p style={{ color: 'var(--brown-mid)' }}>Realizada mediante taxa calculada conforme distância/localização em Brasília.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> Retirada:
              </h4>
              <ul style={{ listStyle: 'none', color: 'var(--brown-mid)' }}>
                <li><strong>Sábado:</strong> até 16h</li>
                <li><strong>Domingo:</strong> até 11h</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Cuidados e Consumo */}
        <section style={{ marginBottom: '80px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }} className="care-grid">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <AlertTriangle size={24} style={{ color: 'var(--rose)' }} />
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--brown)' }}>Cuidados com o Pedido</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Transportar sempre no chão do carro (superfície plana).',
                    'Manter o ar-condicionado ligado durante o trajeto.',
                    'Manter refrigerado imediatamente após o recebimento.',
                    'Não deixar fora da geladeira por mais de 2 horas.'
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--brown-mid)' }}>
                      <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--rose)', borderRadius: '50%' }}></div>
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Utensils size={24} style={{ color: 'var(--brown)' }} />
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--brown)' }}>Consumo</h3>
                </div>
                <p style={{ color: 'var(--brown-mid)', lineHeight: 1.8 }}>
                  Nossos bolos atingem melhor textura e sabor em temperatura ambiente. <strong>Retire da geladeira 30 minutos antes de servir</strong> para que a massa e o recheio fiquem perfeitos.
                </p>
              </motion.div>
           </div>
        </section>

        {/* Section 6: Orçamento e Personalização */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '80px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Palette size={40} style={{ color: 'var(--rose)', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--brown)', marginBottom: '16px' }}>Orçamento e Personalização</h2>
            <div className="ornament-divider"></div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(61,35,20,0.06)', marginBottom: '40px' }}>
            <p style={{ color: 'var(--brown-mid)', lineHeight: 1.8, marginBottom: '20px' }}>
              O orçamento final pode variar conforme a decoração escolhida, considerando a complexidade dos materiais, tempo de execução e valor artístico.
            </p>
            <p style={{ color: 'var(--brown-mid)', lineHeight: 1.8 }}>
              Envie referências, inspirações ou tema do evento para desenvolvermos um bolo exclusivo. Por se tratar de uma decoração personalizada e feita à mão, o valor é cobrado separadamente do bolo e varia conforme tamanho e elementos adicionais.
            </p>
          </div>

          {/* decoration Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr>
                  {['Tamanho', 'Diâmetro', 'Valor adicional — Decoração'].map((header, idx) => (
                    <th key={header} style={{ 
                      textAlign: 'left', 
                      padding: '16px 24px', 
                      backgroundColor: 'var(--brown)', 
                      color: 'white', 
                      fontFamily: 'Playfair Display, serif',
                      borderRadius: idx === 0 ? '12px 0 0 12px' : idx === 2 ? '0 12px 12px 0' : '0'
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'PP', diam: '13 cm', price: 'R$ 50' },
                  { size: 'P', diam: '15 cm', price: 'R$ 70' },
                  { size: 'M', diam: '20 cm', price: 'R$ 120' },
                  { size: 'G', diam: '23 cm', price: 'R$ 150' },
                  { size: 'GG', diam: '25 cm', price: 'R$ 180' },
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: 'white', transition: 'transform 0.2s' }}>
                    <td style={{ padding: '20px 24px', borderRadius: '12px 0 0 12px', fontWeight: 700, color: 'var(--rose)' }}>{row.size}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--brown-mid)' }}>{row.diam}</td>
                    <td style={{ padding: '20px 24px', borderRadius: '0 12px 12px 0', fontWeight: 700, color: 'var(--brown)' }}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--brown-mid)', marginTop: '16px', fontStyle: 'italic' }}>
            * O valor pode sofrer ajustes conforme elementos extras, nível de detalhamento e complexidade da arte.
          </p>
        </motion.section>

        {/* Footer info */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(61,35,20,0.1)', paddingTop: '40px' }}>
           <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: '20px', color: 'var(--rose)' }}>
             Bia Lobo — feito à mão para celebrar momentos únicos
           </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .policy-grid, .delivery-grid, .care-grid {
             grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
