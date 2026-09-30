import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Plus, Funnel, Eye, Pencil, Wrench, Broom } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { Modal, EmptyState, ConfirmDialog } from '../components/Layout';
import { formatCurrency } from '../data/demoData';

const statusConfig = {
  available:    { label: 'Available',    color: 'var(--status-available)',    bg: 'var(--status-available-bg)' },
  occupied:     { label: 'Occupied',     color: 'var(--status-occupied)',     bg: 'var(--status-occupied-bg)' },
  reserved:     { label: 'Reserved',     color: 'var(--status-reserved)',     bg: 'var(--status-reserved-bg)' },
  dirty:        { label: 'Dirty',        color: 'var(--status-dirty)',        bg: 'var(--status-dirty-bg)' },
  cleaning:     { label: 'Cleaning',     color: 'var(--status-cleaning)',     bg: 'var(--status-cleaning-bg)' },
  maintenance:  { label: 'Maintenance',  color: 'var(--status-maintenance)',  bg: 'var(--status-maintenance-bg)' },
  inspected:    { label: 'Inspected',    color: 'var(--status-inspected)',    bg: 'var(--status-inspected-bg)' },
  'out-of-service': { label: 'Out of Service', color: 'var(--status-out-of-service)', bg: 'var(--status-out-of-service-bg)' },
};

export default function Rooms() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [floorFilter, setFloorFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const floors = [...new Set(state.rooms.map(r => r.floor))].sort();
  const allStatuses = Object.keys(statusConfig);

  const filtered = state.rooms.filter(r => {
    const rt = state.roomTypes.find(t => t.id === r.typeId);
    const matchSearch = !search || r.number.includes(search) || rt?.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchFloor = floorFilter === 'all' || String(r.floor) === floorFilter;
    return matchSearch && matchStatus && matchFloor;
  });

  const statusCounts = state.rooms.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});

  const handleStatusUpdate = () => {
    dispatch({ type: 'UPDATE_ROOM', payload: { id: selectedRoom.id, status: newStatus, housekeepingStatus: newStatus } });
    showToast('success', 'Room Updated', `Room ${selectedRoom.number} status changed to ${newStatus}.`);
    setShowStatusModal(false);
    setSelectedRoom(null);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Rooms</h1>
          <p className="page-subtitle">{state.rooms.length} rooms · {statusCounts.available || 0} available · {statusCounts.occupied || 0} occupied</p>
        </div>
        <div className="page-actions">
          <div style={{ display: 'flex', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', padding: 2 }}>
            {[['grid', '⊞'], ['list', '☰']].map(([m, icon]) => (
              <button key={m} className="btn btn-xs" onClick={() => setViewMode(m)}
                style={{ background: viewMode === m ? 'white' : 'transparent', border: 'none', fontWeight: 'bold', boxShadow: viewMode === m ? 'var(--shadow-xs)' : 'none' }}
              >{icon}</button>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/room-types')}>
            <Plus size={15} /> Add Room
          </button>
        </div>
      </div>

      {/* Status Filter Pills */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <button className="btn btn-xs" style={{ background: statusFilter === 'all' ? 'var(--color-neutral-800)' : 'var(--color-neutral-100)', color: statusFilter === 'all' ? 'white' : 'var(--color-neutral-600)', border: 'none' }} onClick={() => setStatusFilter('all')}>
          All ({state.rooms.length})
        </button>
        {allStatuses.map(s => {
          const cfg = statusConfig[s];
          return (
            <button key={s} className="btn btn-xs"
              style={{ background: statusFilter === s ? cfg.color : cfg.bg, color: statusFilter === s ? 'white' : cfg.color, border: `1px solid ${cfg.color}40` }}
              onClick={() => setStatusFilter(s)}
            >
              {cfg.label} ({statusCounts[s] || 0})
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 280 }}>
          <MagnifyingGlass size={15} className="search-icon" />
          <input type="text" className="form-input" placeholder="Search room number or type..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 'var(--space-8)' }} />
        </div>
        <select className="form-select" style={{ width: 'auto' }} value={floorFilter} onChange={e => setFloorFilter(e.target.value)}>
          <option value="all">All Floors</option>
          {floors.map(f => <option key={f} value={String(f)}>Floor {f}</option>)}
        </select>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--space-3)' }}>
          {filtered.map(room => {
            const rt = state.roomTypes.find(t => t.id === room.typeId);
            const cfg = statusConfig[room.status] || statusConfig['available'];
            return (
              <div key={room.id}
                style={{
                  background: 'white', border: `2px solid ${cfg.color}30`,
                  borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  borderTop: `4px solid ${cfg.color}`
                }}
                onClick={() => navigate(`/app/rooms/${room.id}`)}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)' }}>{room.number}</div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, flexShrink: 0, marginTop: 6 }} />
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-2)' }}>{rt?.name || 'Room'}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginBottom: 'var(--space-3)' }}>Floor {room.floor} · {room.bedType}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.65rem', fontWeight: 'var(--font-semibold)', color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color }} />
                  {cfg.label}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-1)', marginTop: 'var(--space-3)' }}>
                  <button className="btn btn-xs btn-ghost" onClick={e => { e.stopPropagation(); setSelectedRoom(room); setNewStatus(room.status); setShowStatusModal(true); }} title="Change Status">
                    <Broom size={11} />
                  </button>
                  <button className="btn btn-xs btn-ghost" onClick={e => { e.stopPropagation(); navigate(`/app/maintenance`); }} title="Maintenance">
                    <Wrench size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Room</th><th>Type</th><th>Floor</th><th>Bed</th><th>View</th><th>Rate/Night</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(room => {
                  const rt = state.roomTypes.find(t => t.id === room.typeId);
                  return (
                    <tr key={room.id} onClick={() => navigate(`/app/rooms/${room.id}`)} style={{ cursor: 'pointer' }}>
                      <td style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>{room.number}</td>
                      <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{rt?.name}</td>
                      <td style={{ fontSize: 'var(--text-sm)' }}>Floor {room.floor}</td>
                      <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{room.bedType}</td>
                      <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>{room.view}</td>
                      <td style={{ fontWeight: 'var(--font-medium)' }}>{rt ? formatCurrency(rt.basePrice) : '—'}</td>
                      <td><span className={`status-badge ${room.status}`}>{statusConfig[room.status]?.label || room.status}</span></td>
                      <td className="col-actions" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                          <button className="btn btn-icon btn-ghost btn-sm" onClick={() => navigate(`/app/rooms/${room.id}`)}><Eye size={14} /></button>
                          <button className="btn btn-icon btn-ghost btn-sm" onClick={() => { setSelectedRoom(room); setNewStatus(room.status); setShowStatusModal(true); }}><Pencil size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      <Modal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} title={`Change Room ${selectedRoom?.number} Status`} size="sm"
        footer={
          <>
            <button className="btn btn-secondary btn-md" onClick={() => setShowStatusModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-md" onClick={handleStatusUpdate}>Update Status</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">New Status</label>
          <select className="form-select" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
            {allStatuses.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
          </select>
        </div>
      </Modal>
    </div>
  );
}
