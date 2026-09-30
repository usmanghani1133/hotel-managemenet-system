import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buildings, Eye, EyeSlash, ArrowRight } from '@phosphor-icons/react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('zahid.m@pchotels.pk');
  const [password, setPassword] = useState('demo1234');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    // Simulate auth
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate('/app/dashboard');
  };

  const demoAccounts = [
    { role: 'General Manager', email: 'zahid.m@pchotels.pk', password: 'demo1234' },
    { role: 'Front Desk', email: 'bilal.h@pchotels.pk', password: 'demo1234' },
    { role: 'Accountant', email: 'sara.i@pchotels.pk', password: 'demo1234' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-700) 50%, #2449D8 100%)'
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--space-12)',
        color: 'white', justifyContent: 'center', maxWidth: 520
      }}>
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-10)' }}>
            <div style={{
              width: 40, height: 40, background: 'rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.25)'
            }}>
              <Buildings size={22} color="white" weight="fill" />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)' }}>HotelFlow</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)' }}>Management Platform</div>
            </div>
          </div>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
            Run Your Hotel Smarter
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
            Complete Property Management System for hotels, resorts, and guest houses.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {['Reservations & Room Management', 'Billing & Payments', 'Housekeeping & Maintenance', 'Analytics & Reports'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-sm)' }}>
              <div style={{ width: 20, height: 20, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</div>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel (Login Form) */}
      <div style={{
        flex: 1, background: 'white', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 'var(--space-8)'
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', marginBottom: 'var(--space-2)' }}>
              Welcome back
            </h2>
            <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
              Sign in to your HotelFlow account
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@hotel.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-base)' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ padding: 'var(--space-3) var(--space-10) var(--space-3) var(--space-4)', fontSize: 'var(--text-base)' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)', display: 'flex'
                }}>
                  {showPass ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)' }}>Forgot password?</a>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'var(--color-error-light)', border: '1px solid #FECACA',
                borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)',
                color: 'var(--color-error)', fontSize: 'var(--text-sm)'
              }}>{error}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full"
              disabled={loading}
              style={{ justifyContent: 'center', fontSize: 'var(--text-base)', marginTop: 'var(--space-2)' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="divider-label" style={{ margin: 'var(--space-6) 0' }}>Demo Accounts</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {demoAccounts.map(acc => (
              <button
                key={acc.role}
                className="btn btn-secondary btn-sm w-full"
                style={{ justifyContent: 'flex-start', gap: 'var(--space-3)' }}
                onClick={() => { setEmail(acc.email); setPassword(acc.password); }}
              >
                <div style={{
                  width: 28, height: 28, background: 'var(--color-primary-50)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 'bold', color: 'var(--color-primary-600)', flexShrink: 0
                }}>
                  {acc.role.split(' ').map(w => w[0]).join('')}
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>{acc.role}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-neutral-400)' }}>{acc.email}</div>
                </div>
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>
            Back to{' '}
            <a href="/" style={{ color: 'var(--color-primary-600)' }}>hotelflow.io</a>
          </p>
        </div>
      </div>
    </div>
  );
}
