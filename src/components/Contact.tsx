import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Phone, Instagram, MapPin, Clock } from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'

export default function Contact() {
  const { profile } = useCatalog()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })

  const handleSendMessage = () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Por favor, preencha seu nome e mensagem.')
      return
    }

    const message = encodeURIComponent(
      `Olá ${profile.name}! ✨\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*WhatsApp:* ${formData.phone || 'Não informado'}\n\n` +
      `*Mensagem:* ${formData.message}\n\n` +
      `Vim pelo site! 🍰`
    )
    window.open(`https://wa.me/${profile.whatsapp}?text=${message}`, '_blank')
  }

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      label: 'WhatsApp',
      value: profile.whatsapp,
      link: `https://wa.me/${profile.whatsapp}`
    },
    {
      icon: <Instagram size={24} />,
      label: 'Instagram',
      value: profile.instagram,
      link: `https://www.instagram.com/${profile.instagram.replace('@', '')}/`
    },
    {
      icon: <MapPin size={24} />,
      label: 'Endereço',
      value: profile.address,
      link: `https://maps.google.com/?q=${encodeURIComponent(profile.address)}`
    },
    {
      icon: <Clock size={24} />,
      label: 'Horário',
      value: 'Terça a Sábado, 10h às 19h',
      link: '#'
    }
  ]

  return (
    <section id="contato" ref={ref} style={{ 
      padding: '100px 24px', 
      backgroundColor: 'var(--cream-dark)', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Abstract Shapes */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '250px', height: '250px', backgroundColor: 'rgba(242, 196, 206, 0.2)', borderRadius: '50%', filter: 'blur(60px)', margin: '-100px -100px 0 0' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '300px', height: '300px', backgroundColor: 'rgba(201, 168, 76, 0.1)', borderRadius: '50%', filter: 'blur(80px)', margin: '0 0 -150px -150px' }}></div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'center' }} className="contact-flex-container">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ flex: 1, width: '100%' }}
          >
            <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: '24px', color: 'var(--rose)', display: 'block', marginBottom: '8px' }}>
              Encomendas
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--brown)', marginBottom: '32px' }}>
              Entre em contato e peça sua doçura
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--brown-mid)', marginBottom: '40px', lineHeight: 1.8 }}>
              Estamos prontos para tornar seu evento ou seu momento especial ainda mais doce. 
              Mande uma mensagem e solicite nosso cardápio completo ou um orçamento personalizado.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(201, 125, 140, 0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--rose)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                      {info.label}
                    </p>
                    <p style={{ color: 'var(--brown)', fontWeight: 600, fontSize: '14px' }}>{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ 
              flex: 1, 
              width: '100%', 
              maxWidth: '550px', 
              backgroundColor: 'white', 
              padding: 'clamp(30px, 5vw, 50px)', 
              borderRadius: '40px', 
              boxShadow: '0 30px 60px rgba(61, 35, 20, 0.08)',
              border: '1px solid rgba(201, 168, 76, 0.1)'
            }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--brown)', marginBottom: '32px', textAlign: 'center' }}>
              Mande uma mensagem rápida
            </h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--brown-mid)', marginBottom: '6px', marginLeft: '4px' }}>Seu Nome</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '16px 24px', borderRadius: '16px', backgroundColor: 'var(--cream)', border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }} 
                  placeholder="Como podemos te chamar?" 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--brown-mid)', marginBottom: '6px', marginLeft: '4px' }}>WhatsApp</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '16px 24px', borderRadius: '16px', backgroundColor: 'var(--cream)', border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }} 
                  placeholder={profile.whatsapp} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--brown-mid)', marginBottom: '6px', marginLeft: '4px' }}>Mensagem</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '16px 24px', borderRadius: '16px', backgroundColor: 'var(--cream)', border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'none' }} 
                  placeholder="O que você está procurando?"
                ></textarea>
              </div>
              <button 
                type="button"
                style={{ 
                  width: '100%', 
                  padding: '18px', 
                  borderRadius: '18px', 
                  background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))', 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '18px', 
                  border: 'none', 
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(201, 125, 140, 0.4)',
                  marginTop: '10px'
                }}
                className="btn-hover"
                onClick={handleSendMessage}
              >
                Enviar via WhatsApp 🍰
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-flex-container { flex-direction: row !important; }
        }
      `}</style>
    </section>
  )
}
