import { useNavigate } from 'react-router-dom';
import { Bell, Check, Checks, ArrowRight, Warning, CreditCard, Wrench, Package, Door, Info } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

const iconMap = {
  reservation: <Door size={18} color="var(--color-primary-600)" />,
  payment: <CreditCard size={18} color="var(--color-warning)" />,
  maintenance: <Wrench size={18} color="#7C3AED" />,
  inventory: <Package size={18} color="#0891B2" />,
  checkin: <Door size={18} color="var(--color-success)" />,
};

export default function Notifications() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleMarkRead = (id) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  const handleMarkAll = () => dispatch({ type: 'MARK_ALL_READ' });

  const unread = state.notifications.filter(n => !n.read);
  const read = state.notifications.filter(n => n.read);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{unread.length} unread notifications</p>
        </div>
        {unread.length > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={handleMarkAll}>
            <Checks size={15} /> Mark All Read
          </button>
        )}
      </div>

      {unread.length > 0 && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            Unread ({unread.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {unread.map(n => (
              <div key={n.id} style={{
                background: 'white', border: '1px solid var(--color-primary-100)',
                borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                boxShadow: '0 0 0 3px var(--color-primary-50)',
                display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)'
              }}>
                <div style={{ width: 40, height: 40, background: 'var(--color-primary-50)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {iconMap[n.type] || <Info size={18} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', marginBottom: 4 }}>{n.title}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', marginBottom: 6 }}>{n.message}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{new Date(n.time).toLocaleString()}</div>
                </div>
                <button className="btn btn-xs btn-ghost" onClick={() => handleMarkRead(n.id)} title="Mark as read"><Check size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            Earlier
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {read.map(n => (
              <div key={n.id} style={{
                background: 'white', border: '1px solid var(--color-neutral-200)',
                borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', opacity: 0.7
              }}>
                <div style={{ width: 40, height: 40, background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {iconMap[n.type] || <Info size={18} color="var(--color-neutral-400)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', marginBottom: 4 }}>{n.title}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 6 }}>{n.message}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{new Date(n.time).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
