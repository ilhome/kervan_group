import { useEffect } from 'react';
import { NAV, PERMISSIONS } from '../../utils/appData.js';

export default function Sidebar({ role, view, menuOpen, menuButton, t, navigate, setMenuOpen }) {
  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen, menuButton, setMenuOpen]);

  return (
    <>
      <header className="mobile-header">
        <div className="brand-mark" aria-hidden="true">K</div>
        <div className="header-brand">
          <div className="brand">Kervan Restaurant</div>
          <div className="brand-caption">{t(role === 'driver' ? 'driverRole' : role)}</div>
        </div>
        <button
          ref={menuButton}
          type="button"
          className="menu-button"
          aria-label={t(menuOpen ? 'closeMenu' : 'menu')}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </header>
      <button
        type="button"
        className={`sidebar-shade ${menuOpen ? 'open' : ''}`}
        aria-label={t('closeMenu')}
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
      />
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label={t('menu')}>
        <div className="sidebar-inner">
          <div className="desktop-brand items-center gap-3 px-2 mb-7">
            <div className="brand-mark" aria-hidden="true">K</div>
            <div>
              <div className="brand">Kervan</div>
              <div className="brand-caption">Restaurant · Warehouse</div>
            </div>
          </div>
          <nav id="main-navigation" aria-label="Main navigation">
            {PERMISSIONS[role].map((name) => (
              <button
                key={name}
                type="button"
                className={`nav-button ${view === name ? 'active' : ''}`}
                aria-current={view === name ? 'page' : undefined}
                onClick={() => navigate(name)}
              >
                <span className="nav-icon" aria-hidden="true">{NAV[name]}</span>
                <span>{t(name)}</span>
              </button>
            ))}
          </nav>
          <p className="small-meta px-3 mt-8" style={{ color: '#c8beb0' }}>
            {t('tagline')}
          </p>
        </div>
      </aside>
    </>
  );
}
