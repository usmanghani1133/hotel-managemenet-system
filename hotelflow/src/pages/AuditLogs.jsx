import { useState, useMemo } from 'react';
import {
  ShieldCheck, MagnifyingGlass, Funnel, Clock,
  User, CheckCircle, Warning, ArrowRight
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatDateTime } from '../data/demoData';

export default function AuditLogs() {
  const { state } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  const modules = ['Front Desk', 'Billing', 'Housekeeping', 'Maintenance', 'Expenses'];

  const filteredLogs = useMemo(() => {
    return state.auditLogs.filter(log => {
      if (moduleFilter !== 'ALL' && log.module !== moduleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const desc = log.description?.toLowerCase() || '';
        const user = log.userName?.toLowerCase() || '';
        const action = log.action?.toLowerCase() || '';
        if (!desc.includes(q) && !user.includes(q) && !action.includes(q)) return false;
      }
      return true;
    });
  }, [state.auditLogs, moduleFilter, searchQuery]);

  return (
    <div className="audit-logs-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Enterprise Audit Trail & Compliance</h1>
          <p className="page-subtitle">Immutable chronological log of all hotel transactions, status shifts, staff actions and cash flows</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div style={{ position: 'relative', width: 340 }}>
            <MagnifyingGlass size={16} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--color-neutral-400)' }} />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: 36, height: 38, fontSize: 'var(--text-xs)' }}
              placeholder="Search description, staff name, action..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: '600' }}>Module:</span>
            <select
              className="form-control"
              style={{ height: 38, fontSize: 'var(--text-xs)', width: 'auto' }}
              value={moduleFilter}
              onChange={e => setModuleFilter(e.target.value)}
            >
              <option value="ALL">All Modules</option>
              {modules.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Log ID & Time</th>
                <th>Staff Member</th>
                <th>Module</th>
                <th>Action Type</th>
                <th>Operation Description</th>
                <th>State Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>
                    <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '11px', color: 'var(--color-primary-600)' }}>
                      {log.id}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-neutral-400)', marginTop: 2 }}>
                      {formatDateTime(log.createdAt)}
                    </div>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'var(--color-primary-100)', color: 'var(--color-primary-700)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 'bold'
                      }}>
                        {log.userName ? log.userName[0] : 'S'}
                      </div>
                      <span style={{ fontWeight: '500', fontSize: 'var(--text-xs)' }}>{log.userName || 'System Auto'}</span>
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>
                      {log.module}
                    </span>
                  </td>

                  <td>
                    <span style={{
                      fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold',
                      background: 'var(--color-neutral-100)', padding: '2px 6px',
                      borderRadius: 4, color: 'var(--color-neutral-800)'
                    }}>
                      {log.action}
                    </span>
                  </td>

                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-800)', maxWidth: 320 }}>
                    {log.description}
                  </td>

                  <td>
                    {log.previousValue !== null && log.newValue !== null ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px' }}>
                        <span style={{ color: 'var(--color-neutral-400)' }}>{log.previousValue || 'none'}</span>
                        <ArrowRight size={12} color="var(--color-neutral-400)" />
                        <span style={{ fontWeight: 'bold', color: 'var(--color-success-dark)' }}>{log.newValue}</span>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--color-neutral-400)', fontSize: '11px' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
