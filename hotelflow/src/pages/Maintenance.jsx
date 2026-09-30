import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Wrench, Warning, CheckCircle, Clock, MagnifyingGlass } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { Modal, EmptyState } from '../components/Layout';

const ticketStatuses = {
  open:        { label: 'Open',       color: 'var(--color-neutral-500)', bg: 'var(--color-neutral-100)' },
  assigned:    { label: 'Assigned',   color: '#7C3AED',                  bg: '#F5F3FF' },
  'in-progress': { label: 'In Progress', color: 'var(--color-warning)',   bg: 'var(--color-warning-light)' },
  resolved:    { label: 'Resolved',   color: 'var(--color-success)',     bg: 'var(--color-success-light)' },
  closed:      { label: 'Closed',     color: 'var(--color-neutral-400)', bg: 'var(--color-neutral-100)' },
};

const priorityColors = { High: 'var(--color-error)', Normal: 'var(--color-warning)', Low: 'var(--color-neutral-400)' };

export default function Maintenance() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTicket, setNewTicket] = useState({ roomId: '', title: '', category: 'HVAC', priority: 'Normal', description: '', assignedTo: '' });

  const filtered = state.maintenanceTickets.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = state.maintenanceTickets.reduce((acc, t) => { acc[t.status] = (acc[t.status] || 0) + 1; return acc; }, {});
  const maintenanceStaff = state.staff.filter(s => s.department === 'Maintenance');

  const handleAddTicket = () => {
    if (!newTicket.title || !newTicket.roomId) { showToast('error', 'Error', 'Title and room are required.'); return; }
    const id = `MT-${Date.now()}`;
    dispatch({
      type: 'ADD_MAINTENANCE_TICKET',
      payload: { id, ...newTicket, status: newTicket.assignedTo ? 'assigned' : 'open', createdAt: new Date().toISOString(), dueDate: null, resolvedAt: null, notes: '' }
    });
    if (newTicket.roomId) dispatch({ type: 'UPDATE_ROOM', payload: { id: newTicket.roomId, status: 'maintenance' } });
    showToast('success', 'Ticket Created', `Maintenance ticket ${id} has been created.`);
    setShowAddModal(false);
    setNewTicket({ roomId: '', title: '', category: 'HVAC', priority: 'Normal', description: '', assignedTo: '' });
  };

  const handleUpdateStatus = (ticketId, newStatus) => {
    const ticket = state.maintenanceTickets.find(t => t.id === ticketId);
    dispatch({ type: 'UPDATE_MAINTENANCE_TICKET', payload: { id: ticketId, status: newStatus, resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : null } });
    if (newStatus === 'resolved' && ticket?.roomId) {
      dispatch({ type: 'UPDATE_ROOM', payload: { id: ticket.roomId, status: 'available' } });
      showToast('success', 'Ticket Resolved', 'Room is now available again.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Maintenance</h1>
          <p className="page-subtitle">{state.maintenanceTickets.filter(t => !['resolved','closed'].includes(t.status)).length} active tickets</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={15} /> New Ticket
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {Object.entries(ticketStatuses).map(([key, cfg]) => (
          <div key={key} style={{ background: 'white', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)', textAlign: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', borderTop: `3px solid ${cfg.color}` }}
            onClick={() => setStatusFilter(key)}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: cfg.color }}>{statusCounts[key] || 0}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{cfg.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 300 }}>
          <MagnifyingGlass size={15} className="search-icon" />
          <input type="text" className="form-input" placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 'var(--space-8)' }} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {['all', ...Object.keys(ticketStatuses)].map(s => (
            <button key={s} className="btn btn-xs"
              style={{ background: statusFilter === s ? 'var(--color-neutral-800)' : 'var(--color-neutral-100)', color: statusFilter === s ? 'white' : 'var(--color-neutral-600)', border: 'none', textTransform: 'capitalize' }}
              onClick={() => setStatusFilter(s)}
            >{s === 'all' ? 'All' : ticketStatuses[s]?.label}</button>
          ))}
        </div>
      </div>

      {/* Ticket Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filtered.map(ticket => {
          const room = state.rooms.find(r => r.id === ticket.roomId);
          const assignee = state.staff.find(s => s.id === ticket.assignedTo);
          const statusCfg = ticketStatuses[ticket.status] || ticketStatuses.open;
          return (
            <div key={ticket.id} style={{
              background: 'white', border: '1px solid var(--color-neutral-200)',
              borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)',
              boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${statusCfg.color}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ width: 40, height: 40, background: `${statusCfg.color}15`, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wrench size={18} color={statusCfg.color} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>{ticket.title}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: priorityColors[ticket.priority], fontWeight: 'var(--font-semibold)', background: `${priorityColors[ticket.priority]}15`, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>{ticket.priority}</span>
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 2 }}>
                      {ticket.id} · Room {room?.number || 'N/A'} · {ticket.category}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: statusCfg.color, background: statusCfg.bg, padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                  {statusCfg.label}
                </span>
              </div>

              {ticket.description && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', marginBottom: 'var(--space-3)', lineHeight: 'var(--leading-relaxed)' }}>{ticket.description}</p>
              )}

              {ticket.notes && (
                <div style={{ background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-3)' }}>
                  Note: {ticket.notes}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>
                  {assignee ? `Assigned to: ${assignee.firstName} ${assignee.lastName}` : 'Unassigned'} · Created: {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {ticket.status === 'open' && (
                    <button className="btn btn-xs btn-primary" onClick={() => handleUpdateStatus(ticket.id, 'in-progress')}>Start Work</button>
                  )}
                  {ticket.status === 'in-progress' && (
                    <button className="btn btn-xs btn-success" onClick={() => handleUpdateStatus(ticket.id, 'resolved')}>
                      <CheckCircle size={12} /> Mark Resolved
                    </button>
                  )}
                  {ticket.status === 'resolved' && (
                    <button className="btn btn-xs btn-ghost" onClick={() => handleUpdateStatus(ticket.id, 'closed')}>Close</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {!filtered.length && (
          <div className="card">
            <EmptyState icon={Wrench} title="No maintenance tickets" description="All systems are running smoothly." />
          </div>
        )}
      </div>

      {/* Add Ticket Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Create Maintenance Ticket" size="md"
        footer={
          <>
            <button className="btn btn-secondary btn-md" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-md" onClick={handleAddTicket}>Create Ticket</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label className="form-label required">Issue Title</label>
            <input className="form-input" placeholder="e.g. AC not cooling properly" value={newTicket.title} onChange={e => setNewTicket(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label required">Room</label>
              <select className="form-select" value={newTicket.roomId} onChange={e => setNewTicket(p => ({ ...p, roomId: e.target.value }))}>
                <option value="">Select room...</option>
                {state.rooms.map(r => <option key={r.id} value={r.id}>Room {r.number}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={newTicket.category} onChange={e => setNewTicket(p => ({ ...p, category: e.target.value }))}>
                {['HVAC', 'Plumbing', 'Electrical', 'Furniture', 'Electronics', 'IT/Internet', 'Bathroom', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-select" value={newTicket.priority} onChange={e => setNewTicket(p => ({ ...p, priority: e.target.value }))}>
                {['High', 'Normal', 'Low'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assign To</label>
              <select className="form-select" value={newTicket.assignedTo} onChange={e => setNewTicket(p => ({ ...p, assignedTo: e.target.value }))}>
                <option value="">Unassigned</option>
                {maintenanceStaff.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" placeholder="Describe the issue in detail..." value={newTicket.description} onChange={e => setNewTicket(p => ({ ...p, description: e.target.value }))} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
