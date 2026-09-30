// Housekeeping page - Full implementation
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Broom, CheckCircle, Clock, Warning, User } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { Modal, EmptyState } from '../components/Layout';

const taskStatusConfig = {
  pending:     { label: 'Pending',     color: 'var(--color-warning)',   bg: 'var(--color-warning-light)' },
  'in-progress': { label: 'In Progress', color: '#7C3AED',               bg: '#F5F3FF' },
  completed:   { label: 'Completed',   color: 'var(--color-success)',   bg: 'var(--color-success-light)' },
  cancelled:   { label: 'Cancelled',   color: 'var(--color-neutral-400)', bg: 'var(--color-neutral-100)' },
};

const priorityConfig = {
  High:   { color: 'var(--color-error)',   bg: 'var(--color-error-light)' },
  Normal: { color: 'var(--color-warning)', bg: 'var(--color-warning-light)' },
  Low:    { color: 'var(--color-neutral-400)', bg: 'var(--color-neutral-100)' },
};

export default function Housekeeping() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ roomId: '', assignedTo: '', type: 'Full Clean', priority: 'Normal', notes: '', scheduledFor: '' });

  const filtered = state.housekeepingTasks.filter(t =>
    statusFilter === 'all' || t.status === statusFilter
  );

  const taskCounts = state.housekeepingTasks.reduce((acc, t) => { acc[t.status] = (acc[t.status] || 0) + 1; return acc; }, {});

  const handleAddTask = () => {
    if (!newTask.roomId) { showToast('error', 'Error', 'Please select a room.'); return; }
    const id = `hk-${Date.now()}`;
    dispatch({
      type: 'ADD_HOUSEKEEPING_TASK',
      payload: { id, ...newTask, status: 'pending', createdAt: new Date().toISOString(), completedAt: null }
    });
    const room = state.rooms.find(r => r.id === newTask.roomId);
    if (room) dispatch({ type: 'UPDATE_ROOM', payload: { id: newTask.roomId, status: 'cleaning', housekeepingStatus: 'cleaning' } });
    showToast('success', 'Task Created', 'Housekeeping task has been created and assigned.');
    setShowAddModal(false);
    setNewTask({ roomId: '', assignedTo: '', type: 'Full Clean', priority: 'Normal', notes: '', scheduledFor: '' });
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const task = state.housekeepingTasks.find(t => t.id === taskId);
    dispatch({ type: 'UPDATE_HOUSEKEEPING_TASK', payload: { id: taskId, status: newStatus, completedAt: newStatus === 'completed' ? new Date().toISOString() : null } });
    if (newStatus === 'completed' && task?.roomId) {
      dispatch({ type: 'UPDATE_ROOM', payload: { id: task.roomId, status: 'inspected', housekeepingStatus: 'inspected' } });
      showToast('success', 'Task Completed', 'Room marked as inspected and available.');
    }
  };

  const housekeepingStaff = state.staff.filter(s => s.department === 'Housekeeping');
  const dirtyRooms = state.rooms.filter(r => ['dirty', 'cleaning'].includes(r.status));

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Housekeeping</h1>
          <p className="page-subtitle">{state.housekeepingTasks.filter(t => t.status !== 'completed').length} active tasks · {dirtyRooms.length} rooms need attention</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={15} /> New Task
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Pending', count: taskCounts.pending || 0, color: 'var(--color-warning)', icon: Clock },
          { label: 'In Progress', count: taskCounts['in-progress'] || 0, color: '#7C3AED', icon: Broom },
          { label: 'Completed Today', count: taskCounts.completed || 0, color: 'var(--color-success)', icon: CheckCircle },
          { label: 'Rooms Dirty', count: dirtyRooms.length, color: 'var(--color-error)', icon: Warning },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 44, height: 44, background: `${s.color}15`, borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
              <s.icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
        {['all', 'pending', 'in-progress', 'completed'].map(s => (
          <button key={s} className={`tab-item ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
            {s === 'all' ? 'All Tasks' : taskStatusConfig[s]?.label || s} {s !== 'all' ? `(${taskCounts[s] || 0})` : `(${state.housekeepingTasks.length})`}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filtered.map(task => {
          const room = state.rooms.find(r => r.id === task.roomId);
          const staffMember = state.staff.find(s => s.id === task.assignedTo);
          const statusCfg = taskStatusConfig[task.status] || taskStatusConfig.pending;
          const priorityCfg = priorityConfig[task.priority] || priorityConfig.Normal;

          return (
            <div key={task.id} style={{
              background: 'white', border: '1px solid var(--color-neutral-200)',
              borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
              borderLeft: `4px solid ${statusCfg.color}`
            }}>
              <div style={{ width: 44, height: 44, background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Broom size={20} color={statusCfg.color} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                    Room {room?.number || 'Unknown'}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: statusCfg.color, background: statusCfg.bg, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                    {statusCfg.label}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: priorityCfg.color, background: priorityCfg.bg, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                    {task.priority}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <span>{task.type}</span>
                  {staffMember && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={12} /> {staffMember.firstName} {staffMember.lastName}</span>}
                  {task.notes && <span>— {task.notes}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0 }}>
                {task.status === 'pending' && (
                  <button className="btn btn-xs btn-primary" onClick={() => handleUpdateStatus(task.id, 'in-progress')}>Start</button>
                )}
                {task.status === 'in-progress' && (
                  <button className="btn btn-xs btn-success" onClick={() => handleUpdateStatus(task.id, 'completed')}>
                    <CheckCircle size={12} /> Complete
                  </button>
                )}
                {task.status === 'completed' && (
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>✓ Done</span>
                )}
              </div>
            </div>
          );
        })}
        {!filtered.length && (
          <div className="card">
            <EmptyState icon={Broom} title="No housekeeping tasks" description="All rooms are clean and ready." />
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Create Housekeeping Task" size="md"
        footer={
          <>
            <button className="btn btn-secondary btn-md" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-md" onClick={handleAddTask}>Create Task</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label required">Room</label>
              <select className="form-select" value={newTask.roomId} onChange={e => setNewTask(p => ({ ...p, roomId: e.target.value }))}>
                <option value="">Select room...</option>
                {state.rooms.map(r => <option key={r.id} value={r.id}>Room {r.number} — {r.status}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assign To</label>
              <select className="form-select" value={newTask.assignedTo} onChange={e => setNewTask(p => ({ ...p, assignedTo: e.target.value }))}>
                <option value="">Unassigned</option>
                {housekeepingStaff.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Task Type</label>
              <select className="form-select" value={newTask.type} onChange={e => setNewTask(p => ({ ...p, type: e.target.value }))}>
                {['Full Clean', 'Turndown', 'Quick Clean', 'Inspection', 'Deep Clean'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-select" value={newTask.priority} onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))}>
                {['High', 'Normal', 'Low'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea className="form-textarea" placeholder="Additional instructions..." value={newTask.notes} onChange={e => setNewTask(p => ({ ...p, notes: e.target.value }))} rows={2} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
