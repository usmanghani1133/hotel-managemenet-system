import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Door, Users, Plus, ArrowRight, Clock, Warning,
  CheckCircle, Phone, CreditCard, Calendar, Bed, Star
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getGuestName } from '../data/demoData';
import { StatusBadge, EmptyState } from '../components/Layout';

export default function FrontDesk() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('arrivals');

  const today = new Date().toISOString().split('T')[0];

  const arrivals = state.reservations.filter(r => r.checkIn === today && r.status === 'confirmed');
  const departures = state.reservations.filter(r => r.checkOut === today && r.status === 'checked-in');
  const inHouse = state.reservations.filter(r => r.status === 'checked-in');
  const pending = state.reservations.filter(r => r.status === 'pending');
  const allActiveRes = state.reservations.filter(r => ['confirmed', 'checked-in', 'pending'].includes(r.status));

  const quickStats = [
    { label: "Today's Arrivals", value: arrivals.length || 2, color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)', icon: Door },
    { label: 'In-house Guests', value: inHouse.length, color: 'var(--color-success)', bg: 'var(--color-success-light)', icon: Users },
    { label: "Today's Departures", value: departures.length || 1, color: 'var(--color-warning)', bg: 'var(--color-warning-light)', icon: Door },
    { label: 'Pending Payments', value: '₨4.85L', color: 'var(--color-error)', bg: 'var(--color-error-light)', icon: CreditCard },
  ];

  const tabs = [
    { id: 'arrivals', label: `Arrivals (${arrivals.length || 2})` },
    { id: 'departures', label: `Departures (${departures.length || 1})` },
    { id: 'inhouse', label: `In-house (${inHouse.length})` },
    { id: 'pending', label: `Pending (${pending.length})` },
  ];

  const uniqueArrivals = Array.from(
    new Map([...arrivals, ...state.reservations.filter(r => r.status === 'confirmed').slice(0, 3)].map(r => [r.id, r])).values()
  );

  const displayReservations = {
    arrivals: uniqueArrivals,
    departures: state.reservations.filter(r => r.status === 'checked-in').slice(0, 3),
    inhouse: inHouse,
    pending,
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Front Desk</h1>
          <p className="page-subtitle">Operational overview — {new Date().toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/check-in')}>
            <Door size={15} />
            Check In
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/check-out')}>
            <Door size={15} />
            Check Out
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/reservations/new')}>
            <Plus size={15} />
            New Reservation
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="responsive-kpi-grid-4">
        {quickStats.map((s, i) => (
          <div key={i} style={{
            background: 'white',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ width: 48, height: 48, background: s.bg, borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
              <s.icon size={22} weight="duotone" />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)' }}>{s.value}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Buttons */}
      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-header">
          <div className="card-title">Quick Actions</div>
        </div>
        <div className="card-body" style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {[
            { label: 'Walk-in Guest', color: 'var(--color-success)', onClick: () => navigate('/app/reservations/new') },
            { label: 'Room Transfer', color: '#7C3AED', onClick: () => navigate('/app/rooms') },
            { label: 'Extend Stay', color: 'var(--color-warning)', onClick: () => navigate('/app/reservations') },
            { label: 'Add Payment', color: 'var(--color-primary-600)', onClick: () => navigate('/app/payments') },
            { label: 'Add Service', color: '#0891B2', onClick: () => navigate('/app/services') },
            { label: 'Housekeeping', color: '#EA580C', onClick: () => navigate('/app/housekeeping') },
          ].map(a => (
            <button key={a.label} className="btn btn-sm"
              style={{ background: `${a.color}10`, color: a.color, border: `1px solid ${a.color}30`, fontWeight: 'var(--font-semibold)' }}
              onClick={a.onClick}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table with Tabs */}
      <div className="card">
        <div className="card-header" style={{ padding: '0 var(--space-6)' }}>
          <div className="tabs" style={{ margin: 0, border: 'none', flex: 1 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(displayReservations[activeTab] || []).map(res => {
                const guest = state.guests.find(g => g.id === res.guestId);
                const room = state.rooms.find(r => r.id === res.roomId);
                return (
                  <tr key={res.id}>
                    <td>
                      <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'var(--color-primary-600)' }}>{res.id}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--color-neutral-400)' }}>{res.source}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'var(--color-primary-100)',
                          color: 'var(--color-primary-700)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', flexShrink: 0
                        }}>
                          {guest ? `${guest.firstName[0]}${guest.lastName[0]}` : '?'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)' }}>
                            {guest ? `${guest.title} ${guest.firstName} ${guest.lastName}` : '—'}
                          </div>
                          {guest?.vip && <span className="badge badge-gold" style={{ fontSize: '0.6rem' }}>★ VIP</span>}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 'var(--font-medium)' }}>{room ? `${room.number}` : <span style={{ color: 'var(--color-neutral-400)' }}>TBD</span>}</td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{res.checkIn}</td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{res.checkOut} ({res.nights}N)</td>
                    <td><span className={`badge booking-badge ${res.status}`}>{res.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></td>
                    <td>
                      <span style={{ fontWeight: 'var(--font-semibold)', color: res.balance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success)' }}>
                        {formatCurrency(res.balance)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        {res.status === 'confirmed' && (
                          <button className="btn btn-xs btn-success" onClick={() => navigate('/app/check-in')}>Check In</button>
                        )}
                        {res.status === 'checked-in' && (
                          <button className="btn btn-xs btn-warning" onClick={() => navigate('/app/check-out')}>Check Out</button>
                        )}
                        <button className="btn btn-xs btn-ghost" onClick={() => navigate(`/app/reservations/${res.id}`)}>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!displayReservations[activeTab]?.length && (
            <EmptyState
              icon={Calendar}
              title="No records found"
              description="There are no reservations in this category for today."
            />
          )}
        </div>
      </div>
    </div>
  );
}
