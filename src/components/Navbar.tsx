import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'

const navLinks = [
  { label: 'Início', id: 'inicio' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Nossos Doces', id: 'doces' },
  { label: 'Galeria', id: 'galeria' },
  { label: 'Contato', id: 'contato' },
]

interface NavbarProps {
  onNavigate: (page: 'home' | 'policies' | 'dashboard' | 'catalog' | 'links') => void
  isPoliciesPage: boolean
}

export default function Navbar({ onNavigate, isPoliciesPage }: NavbarProps) {
  const { profile } = useCatalog()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (id: string) => {
    if (id === 'doces') {
      onNavigate('catalog')
      setOpen(false)
      return
    }

    if (id === 'links') {
      onNavigate('links')
      setOpen(false)
      return
    }

    if (isPoliciesPage) {
      onNavigate('home')
      // Small delay to allow home to render before scrolling
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled || isPoliciesPage
          ? 'rgba(253, 246, 238, 0.95)'
          : 'transparent',
        backdropFilter: scrolled || isPoliciesPage ? 'blur(12px)' : 'none',
        boxShadow: scrolled || isPoliciesPage ? '0 2px 30px rgba(61,35,20,0.10)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          aria-label="Voltar para o início"
          style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
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
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--brown)',
              lineHeight: 1.1,
            }}>
              {profile.name}
            </div>
            <div style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '13px',
              color: 'var(--gold)',
              letterSpacing: '1px',
              opacity: 0.8
            }}>
              Doces
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.id)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--brown-mid)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--rose)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--brown-mid)')}
            >
              {link.label}
            </button>
          ))}
          
          <button
              onClick={() => onNavigate('policies')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: isPoliciesPage ? 'var(--rose)' : 'var(--brown-mid)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--rose)')}
              onMouseLeave={e => (e.currentTarget.style.color = isPoliciesPage ? 'var(--rose)' : 'var(--brown-mid)')}
            >
              Políticas
            </button>

          <button
              onClick={() => onNavigate('links')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--brown-mid)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--rose)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--brown-mid)')}
            >
              Links
            </button>

          <button
            onClick={() => onNavigate('catalog')}
            style={{
              background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              padding: '10px 22px',
              borderRadius: '50px',
              border: 'none',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(201, 125, 140, 0.4)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(201, 125, 140, 0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(201, 125, 140, 0.4)'
            }}
          >
            Fazer Pedido
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--brown)',
            display: 'none',
          }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          background: 'rgba(253, 246, 238, 0.98)',
          backdropFilter: 'blur(12px)',
          padding: '20px 24px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderTop: '1px solid rgba(201, 168, 76, 0.2)',
        }}>
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.id)}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '20px',
                color: 'var(--brown)',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}
          
          <button
              onClick={() => { onNavigate('policies'); setOpen(false) }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '20px',
                color: isPoliciesPage ? 'var(--rose)' : 'var(--brown)',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Políticas
            </button>

          <button
            onClick={() => { onNavigate('links'); setOpen(false) }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              color: 'var(--brown)',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            Links
          </button>

          <button
            onClick={() => { onNavigate('catalog'); setOpen(false) }}
            style={{
              background: 'linear-gradient(135deg, var(--rose), var(--rose-dark))',
              color: 'white',
              textAlign: 'center',
              padding: '14px',
              borderRadius: '50px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              marginTop: '10px'
            }}
          >
            Fazer Pedido
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
