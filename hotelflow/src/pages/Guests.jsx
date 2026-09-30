import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlass, Plus, Funnel, Eye, Pencil, Phone,
  Envelope, MapPin, Star, ArrowRight, Users, Download
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';
import { EmptyState, Modal } from '../components/Layout';

const AVATAR_COLORS = [
  { bg: 'var(--color-primary-100)', color: 'var(--color-primary-700)' },
  { bg: 'var(--color-success-light)', color: 'var(--color-success-dark)' },
  { bg: '#F5F3FF', color: '#7C3AED' },
  { bg: '#ECFEFF', color: '#0891B2' },
  { bg: '#FFF7ED', color: '#EA580C' },
  { bg: 'var(--color-warning-light)', color: 'var(--color-warning-dark)' },
];

export default function Guests() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [vipFilter, setVipFilter] = useState('all');
  const [view, setView] = useState('table'); // 'table' | 'grid'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGuest, setNewGuest] = useState({
    title: 'Mr.', firstName: '', lastName: '', email: '',
    phone: '', country: 'Pakistan', city: '', nationality: 'Pakistani',
    cnic: '', gender: 'Male'
  });

  const filtered = state.guests.filter(g => {
    const name = `${g.firstName} ${g.lastName} ${g.email} ${g.phone}`.toLowerCase();
    const matchSearch = !search || name.includes(search.toLowerCase());
    const matchVip = vipFilter === 'all' || (vipFilter === 'vip' ? g.vip : !g.vip);
    return matchSearch && matchVip;
  });

  const handleAddGuest = () => {
    if (!newGuest.firstName || !newGuest.lastName || !newGuest.phone) {
      showToast('error', 'Validation Error', 'Please fill in required fields.');
      return;
    }
    const id = `g-${Date.now()}`;
    dispatch({
      type: 'ADD_GUEST',
      payload: {
        id, propertyId: 'prop-1', ...newGuest,
        vip: false, totalStays: 0, totalSpending: 0,
        lastVisit: null, notes: '', preferences: {},
        createdAt: new Date().toISOString().split('T')[0]
      }
    });
    showToast('success', 'Guest Added', `${newGuest.firstName} ${newGuest.lastName} has been added successfully.`);
    setShowAddModal(false);
    setNewGuest({ title: 'Mr.', firstName: '', lastName: '', email: '', phone: '', country: 'Pakistan', city: '', nationality: 'Pakistani', cnic: '', gender: 'Male' });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Guests</h1>
          <p className="page-subtitle">{state.guests.length} registered guests · {state.guests.filter(g => g.vip).length} VIP</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm"><Download size={15} /> Export</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={15} /> Add Guest
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 360 }}>
          <MagnifyingGlass size={15} className="search-icon" />
          <input
            type="text" className="form-input"
            placeholder="Search by name, email or phone..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 'var(--space-8)' }}
          />
        </div>
        <div style={{ display: 'flex', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', padding: 2 }}>
          {[['all', 'All'], ['vip', '★ VIP'], ['regular', 'Regular']].map(([val, label]) => (
            <button key={val} className="btn btn-xs"
              style={{
                background: vipFilter === val ? 'white' : 'transparent',
                color: vipFilter === val ? 'var(--color-neutral-800)' : 'var(--color-neutral-500)',
                boxShadow: vipFilter === val ? 'var(--shadow-xs)' : 'none',
                border: 'none', fontWeight: vipFilter === val ? 'var(--font-semibold)' : 'var(--font-regular)'
              }}
              onClick={() => setVipFilter(val)}
            >{label}</button>
          ))}
        </div>
        <button className="btn btn-secondary btn-sm"><Funnel size={15} /> Filters</button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Contact</th>
                <th>Country</th>
                <th>ID / CNIC</th>
                <th>Total Stays</th>
                <th>Total Spending</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, i) => {
                const c = AVATAR_COLORS[i % AVATAR_COLORS.length];
                return (
                  <tr key={g.id} onClick={() => navigate(`/app/guests/${g.id}`)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 'bold', flexShrink: 0 }}>
                          {`${g.firstName[0]}${g.lastName[0]}`}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            {g.title} {g.firstName} {g.lastName}
                            {g.vip && <span className="badge badge-gold" style={{ fontSize: '0.6rem' }}>★ VIP</span>}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{g.gender} · {g.nationality}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}><Phone size={11} />{g.phone}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Envelope size={11} />{g.email}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)' }}>{g.country}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{g.city}</div>
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)', fontFamily: 'monospace', color: 'var(--color-neutral-600)' }}>
                      {g.cnic || g.passport || '—'}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'var(--font-semibold)' }}>{g.totalStays}</td>
                    <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-800)' }}>{formatCurrency(g.totalSpending)}</td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{g.lastVisit ? formatDate(g.lastVisit) : 'Never'}</td>
                    <td className="col-actions" onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: 'var(--space-1)', justifyContent: 'flex-end' }}>
                        <button className="btn btn-icon btn-ghost btn-sm" onClick={() => navigate(`/app/guests/${g.id}`)} title="View"><Eye size={14} /></button>
                        <button className="btn btn-icon btn-ghost btn-sm" title="Edit"><Pencil size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!filtered.length && (
            <EmptyState icon={Users} title="No guests found" description="Add your first guest or adjust search filters."
              action={<button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>Add Guest</button>}
            />
          )}
        </div>
      </div>

      {/* Add Guest Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Guest" size="lg"
        footer={
          <>
            <button className="btn btn-secondary btn-md" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-md" onClick={handleAddGuest}>Save Guest</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="form-grid form-grid-3">
            <div className="form-group">
              <label className="form-label">Title</label>
              <select className="form-select" value={newGuest.title} onChange={e => setNewGuest(p => ({ ...p, title: e.target.value }))}>
                {['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label required">First Name</label>
              <input className="form-input" placeholder="Ahmed" value={newGuest.firstName} onChange={e => setNewGuest(p => ({ ...p, firstName: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label required">Last Name</label>
              <input className="form-input" placeholder="Khan" value={newGuest.lastName} onChange={e => setNewGuest(p => ({ ...p, lastName: e.target.value }))} />
            </div>
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="ahmed@example.com" value={newGuest.email} onChange={e => setNewGuest(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label required">Phone</label>
              <input className="form-input" placeholder="+92-321-1234567" value={newGuest.phone} onChange={e => setNewGuest(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input className="form-input" value={newGuest.country} onChange={e => setNewGuest(p => ({ ...p, country: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="Lahore" value={newGuest.city} onChange={e => setNewGuest(p => ({ ...p, city: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">CNIC / Passport</label>
              <input className="form-input" placeholder="35201-1234567-1" value={newGuest.cnic} onChange={e => setNewGuest(p => ({ ...p, cnic: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-select" value={newGuest.gender} onChange={e => setNewGuest(p => ({ ...p, gender: e.target.value }))}>
                {['Male', 'Female', 'Other'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
