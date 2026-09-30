import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, MagnifyingGlass, Funnel, ArrowRight, CalendarBlank,
  Download, Eye, Pencil, Trash, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getGuestName } from '../data/demoData';
import { StatusBadge, Modal, EmptyState, ConfirmDialog } from '../components/Layout';

export default function Reservations() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showConfirm, setShowConfirm] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const statuses = ['all', 'confirmed', 'checked-in', 'checked-out', 'pending', 'cancelled', 'no-show'];
  const sources = ['all', 'Direct', 'Online', 'Corporate', 'Travel Agent', 'Phone', 'OTA'];

  const filtered = state.reservations.filter(r => {
    const guest = state.guests.find(g => g.id === r.guestId);
    const guestName = guest ? `${guest.firstName} ${guest.lastName}`.toLowerCase() : '';
    const matchSearch = !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      guestName.includes(search.toLowerCase()) ||
      r.confirmationNo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchSource = sourceFilter === 'all' || r.source === sourceFilter;
    return matchSearch && matchStatus && matchSource;
  });

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleCancel = (id) => {
    dispatch({ type: 'UPDATE_RESERVATION', payload: { id, status: 'cancelled' } });
    showToast('success', 'Reservation Cancelled', `Booking ${id} has been cancelled.`);
  };

  const statusCounts = state.reservations.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Reservations</h1>
          <p className="page-subtitle">{state.reservations.length} total bookings · {statusCounts['checked-in'] || 0} in-house</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm">
            <Download size={15} />
            Export
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/reservations/new')}>
            <Plus size={15} />
            New Reservation
          </button>
        </div>
      </div>

      {/* Status Filter Pills */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
        {statuses.map(s => {
          const count = s === 'all' ? state.reservations.length : (statusCounts[s] || 0);
          return (
            <button
              key={s}
              className="btn btn-xs"
              style={{
                background: statusFilter === s ? 'var(--color-primary-600)' : 'var(--color-neutral-100)',
                color: statusFilter === s ? 'white' : 'var(--color-neutral-600)',
                border: 'none',
                textTransform: 'capitalize',
                fontWeight: statusFilter === s ? 'var(--font-semibold)' : 'var(--font-regular)'
              }}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'all' ? 'All' : s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} ({count})
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 340 }}>
          <MagnifyingGlass size={15} className="search-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="Search by ID, guest name or confirmation..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 'var(--space-8)' }}
          />
        </div>
        <select className="form-select" style={{ width: 'auto' }} value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
          {sources.map(s => <option key={s} value={s}>{s === 'all' ? 'All Sources' : s}</option>)}
        </select>
        <button className="btn btn-secondary btn-sm">
          <Funnel size={15} />
          More Filters
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Room / Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nights</th>
                <th>Total</th>
                <th>Balance</th>
                <th>Source</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(res => {
                const guest = state.guests.find(g => g.id === res.guestId);
                const room = state.rooms.find(r => r.id === res.roomId);
                const roomType = state.roomTypes.find(rt => rt.id === res.roomTypeId);
                return (
                  <tr key={res.id}>
                    <td>
                      <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-primary-600)' }}>{res.id}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--color-neutral-400)' }}>{res.confirmationNo}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--color-primary-100)', color: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', flexShrink: 0 }}>
                          {guest ? `${guest.firstName[0]}${guest.lastName[0]}` : '?'}
                        </div>
                        <div>
                          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--color-neutral-800)' }}>
                            {guest ? `${guest.firstName} ${guest.lastName}` : '—'}
                          </div>
                          {guest?.vip && <span className="badge badge-gold" style={{ fontSize: '0.58rem' }}>VIP</span>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>{room ? `Room ${room.number}` : '—'}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{roomType?.name}</div>
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>{res.checkIn}</td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>{res.checkOut}</td>
                    <td style={{ textAlign: 'center', fontWeight: 'var(--font-medium)' }}>{res.nights}</td>
                    <td style={{ fontWeight: 'var(--font-semibold)' }}>{formatCurrency(res.totalAmount)}</td>
                    <td>
                      <span style={{ fontWeight: 'var(--font-semibold)', color: res.balance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success)', fontSize: 'var(--text-xs)' }}>
                        {formatCurrency(res.balance)}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 'var(--text-xs)', background: 'var(--color-neutral-100)', padding: '2px 8px', borderRadius: 'var(--radius-full)', color: 'var(--color-neutral-600)' }}>
                        {res.source}
                      </span>
                    </td>
                    <td><span className={`badge booking-badge ${res.status}`}>{res.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></td>
                    <td className="col-actions">
                      <div style={{ display: 'flex', gap: 'var(--space-1)', justifyContent: 'flex-end' }}>
                        <button className="btn btn-icon btn-ghost btn-sm" onClick={() => navigate(`/app/reservations/${res.id}`)} title="View"><Eye size={14} /></button>
                        <button className="btn btn-icon btn-ghost btn-sm" onClick={() => navigate(`/app/reservations/${res.id}`)} title="Edit"><Pencil size={14} /></button>
                        {res.status !== 'cancelled' && res.status !== 'checked-out' && (
                          <button
                            className="btn btn-icon btn-ghost btn-sm"
                            style={{ color: 'var(--color-error)' }}
                            onClick={() => setShowConfirm(res.id)}
                            title="Cancel"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!paged.length && (
            <EmptyState
              icon={CalendarBlank}
              title="No reservations found"
              description="Try adjusting your search or filters to find what you're looking for."
              action={<button className="btn btn-primary btn-sm" onClick={() => navigate('/app/reservations/new')}>Create First Reservation</button>}
            />
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <div className="pagination-info">
              Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </div>
            <div className="pagination-controls">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!showConfirm}
        onClose={() => setShowConfirm(null)}
        onConfirm={() => handleCancel(showConfirm)}
        title="Cancel Reservation"
        message={`Are you sure you want to cancel booking ${showConfirm}? This action cannot be undone.`}
        confirmLabel="Cancel Reservation"
        danger
      />
    </div>
  );
}
