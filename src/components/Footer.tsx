import { Instagram, Mail, MapPin } from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'

interface FooterProps {
  onNavigate: (page: 'home' | 'policies' | 'dashboard' | 'catalog' | 'links') => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const { profile, categories } = useCatalog()
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--brown)', color: 'var(--cream)', padding: '80px 24px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          gap: '60px', 
          justifyContent: 'space-between', 
          marginBottom: '80px' 
        }} className="footer-links-container">
          
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: profile.logo && (profile.logo.startsWith('/') || profile.logo.startsWith('./') || profile.logo.startsWith('http') || profile.logo.startsWith('data:')) ? 'transparent' : 'linear-gradient(135deg, var(--blush), var(--rose))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                overflow: 'hidden'
              }}>
                {profile.logo && (profile.logo.startsWith('/') || profile.logo.startsWith('./') || profile.logo.startsWith('http') || profile.logo.startsWith('data:')) ? (
                  <img src={profile.logo} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  profile.logo || '🌸'
                )}
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '22px', lineHeight: 1 }}>{profile.name}</h3>
                <p style={{ fontFamily: 'Dancing Script, cursive', color: 'var(--gold-light)', fontSize: '14px', letterSpacing: '2px' }}>Doces</p>
              </div>
            </div>
            <p style={{ color: 'rgba(253, 246, 238, 0.6)', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px' }}>
              {profile.bio.substring(0, 100)}...
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href={`https://www.instagram.com/${profile.instagram.replace('@', '')}/`} target="_blank" rel="noopener noreferrer" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--rose)'; e.currentTarget.style.borderColor = 'var(--rose)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              >
                <Instagram size={18} />
              </a>
              <a href={`mailto:${profile.email}`} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--rose)'; e.currentTarget.style.borderColor = 'var(--rose)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div style={{ minWidth: '150px' }}>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '18px', color: 'var(--gold-light)', marginBottom: '24px' }}>Explorar</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(253, 246, 238, 0.7)', fontSize: '14px' }}>Início</button></li>
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('sobre')?.scrollIntoView({behavior:'smooth'}), 100)}} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(253, 246, 238, 0.7)', fontSize: '14px' }}>Sobre Nós</button></li>
              <li><button onClick={() => onNavigate('policies')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(253, 246, 238, 0.7)', fontSize: '14px' }}>Políticas</button></li>
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('galeria')?.scrollIntoView({behavior:'smooth'}), 100)}} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(253, 246, 238, 0.7)', fontSize: '14px' }}>Galeria</button></li>
            </ul>
          </div>

          <div style={{ minWidth: '150px' }}>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '18px', color: 'var(--gold-light)', marginBottom: '24px' }}>Categorias</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categories.slice(0, 4).map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate('catalog')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(253, 246, 238, 0.7)', fontSize: '14px' }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ width: '100%', maxWidth: '280px' }}>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '18px', color: 'var(--gold-light)', marginBottom: '24px' }}>Localização</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--rose)', flexShrink: 0 }} />
                <p style={{ color: 'rgba(253, 246, 238, 0.7)', fontSize: '14px', lineHeight: 1.5 }}>
                  {profile.address}
                </p>
              </div>
              <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'var(--gold-light)', fontSize: '12px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>Área de Atendimento:</p>
                <p style={{ color: 'rgba(253, 246, 238, 0.7)', fontSize: '12px', lineHeight: 1.5 }}>
                  Santa Maria, Brasília e região administrativa (sob consulta).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '24px', 
          flexWrap: 'wrap' 
        }} className="footer-bottom">
          <p style={{ color: 'rgba(253, 246, 238, 0.4)', fontSize: '12px', letterSpacing: '1px' }}>
            &copy; {currentYear} {profile.name}. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: '30px' }}>
            <button 
              onClick={() => onNavigate('dashboard')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(253, 246, 238, 0.2)', fontSize: '10px', textDecoration: 'none' }}
            >
              Admin
            </button>
            <button onClick={() => onNavigate('policies')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(253, 246, 238, 0.4)', fontSize: '12px' }}>Privacidade</button>
            <button onClick={() => onNavigate('policies')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(253, 246, 238, 0.4)', fontSize: '12px' }}>Termos</button>
            <p style={{ color: 'rgba(253, 246, 238, 0.4)', fontSize: '12px' }}>Feito com Amore ❤️</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-links-container { flex-direction: column !important; }
          .footer-bottom { flex-direction: column !important; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
