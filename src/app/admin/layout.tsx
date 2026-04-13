'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Check if already authenticated by trying to fetch admin data
    fetch('/api/admin/songs')
      .then(r => {
        setAuthenticated(r.ok);
      })
      .catch(() => setAuthenticated(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthenticated(false);
    setPassword('');
  }

  // Loading state
  if (authenticated === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}>Loading...</p>
      </div>
    );
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-box">
          <h1>Himalaya Folk</h1>
          <p>Admin Dashboard</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit">Sign In</button>
            {error && <p className="admin-error">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  // Admin layout with sidebar
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '◉' },
    { href: '/admin/songs', label: 'Songs', icon: '♪' },
    { href: '/admin/folk-songs', label: 'Folk Songs', icon: '♬' },
    { href: '/admin/submissions', label: 'Submissions', icon: '✉' },
    { href: '/admin/import', label: 'Import Song', icon: '↓' },
    { href: '/admin/newsletter', label: 'Newsletter', icon: '◈' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Himalaya Folk</h2>
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-item" target="_blank">
            <span className="admin-nav-icon">↗</span>
            View Site
          </Link>
          <button onClick={handleLogout} className="admin-logout-btn">
            Sign Out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
