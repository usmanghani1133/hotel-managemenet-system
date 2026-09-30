import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Envelope, MapPin, Calendar, Star, CreditCard, Clock } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';

const AVATAR_COLORS = [
  { bg: 'var(--color-primary-100)', color: 'var(--color-primary-700)' },
  { bg: 'var(--color-success-light)', color: 'var(--color-success-dark)' },
  { bg: '#F5F3FF', color: '#7C3AED' },
  { bg: '#ECFEFF', color: '#0891B2' },
];

export default function GuestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const g = state.guests.find(g => g.id === id);
  const guestReservations = state.reservations.filter(r => r.guestId === id);
  const c = AVATAR_COLORS[0];

  if (!g) return (
    <div style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
      <h2>Guest not found</h2>
      <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/guests')} style={{ marginTop: 'var(--space-4)' }}>Back</button>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/guests')}><ArrowLeft size={15} /> Back</button>
          <h1 className="page-title">{g.title} {g.firstName} {g.lastName}</h1>
          {g.vip && <span className="badge badge-gold">★ VIP Guest</span>}
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm">Edit Profile</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/reservations/new')}>New Reservation</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-5)' }}>
        {/* Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-2xl)', fontWeight: 'bold', margin: '0 auto var(--space-4)' }}>
                {`${g.firstName[0]}${g.lastName[0]}`}
              </div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', marginBottom: 'var(--space-1)' }}>
                {g.title} {g.firstName} {g.lastName}
              </h2>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-400)', marginBottom: 'var(--space-4)' }}>{g.nationality} · {g.gender}</div>
              {[
                { icon: Phone, value: g.phone },
                { icon: Envelope, value: g.email },
                { icon: MapPin, value: `${g.city}, ${g.country}` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) 0', borderTop: '1px solid var(--color-neutral-100)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
                  <item.icon size={14} />{item.value}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <div className="card-header"><div className="card-title">Guest Statistics</div></div>
            <div className="card-body">
              {[
                { label: 'Total Stays', value: g.totalStays, icon: Calendar },
                { label: 'Total Spending', value: formatCurrency(g.totalSpending), icon: CreditCard },
                { label: 'Last Visit', value: g.lastVisit ? formatDate(g.lastVisit) : 'Never', icon: Clock },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-neutral-100)' }}>
                  <div style={{ width: 32, height: 32, background: 'var(--color-primary-50)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}>
                    <s.icon size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{s.label}</div>
                    <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)' }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          {g.preferences && Object.keys(g.preferences).length > 0 && (
            <div className="card">
              <div className="card-header"><div className="card-title">Preferences</div></div>
              <div className="card-body">
                {Object.entries(g.preferences).map(([k, v]) => v && (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-neutral-50)', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--color-neutral-500)', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--color-neutral-800)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Notes */}
          {g.notes && (
            <div className="card">
              <div className="card-header"><div className="card-title">Notes</div></div>
              <div className="card-body">
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>{g.notes}</p>
              </div>
            </div>
          )}

          {/* Reservation History */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Reservation History</div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{guestReservations.length} bookings</span>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr><th>Booking ID</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {guestReservations.length ? guestReservations.map(r => {
                    const room = state.rooms.find(rm => rm.id === r.roomId);
                    return (
                      <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/app/reservations/${r.id}`)}>
                        <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)' }}>{r.id}</td>
                        <td style={{ fontSize: 'var(--text-sm)' }}>{room ? `Room ${room.number}` : '—'}</td>
                        <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{r.checkIn}</td>
                        <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{r.checkOut}</td>
                        <td style={{ fontWeight: 'var(--font-medium)' }}>{formatCurrency(r.totalAmount)}</td>
                        <td><span className={`badge booking-badge ${r.status}`}>{r.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-neutral-400)', padding: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>No reservation history</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
