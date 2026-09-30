import { useState } from 'react';
import {
  UserCircle, Plus, ShieldCheck, CheckCircle, XCircle,
  Key, Lock, Envelope, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function Users() {
  const { state, dispatch } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: 'Zahid Mehmood', email: 'zahid.m@pchotels.pk', role: 'General Manager', property: 'All Properties', status: 'active', lastLogin: 'Today 08:30 AM' },
    { id: 'usr-2', name: 'Bilal Hussain', email: 'bilal.h@pchotels.pk', role: 'Front Desk Associate', property: 'PC Islamabad', status: 'active', lastLogin: 'Today 06:45 AM' },
    { id: 'usr-3', name: 'Nadia Ansari', email: 'nadia.a@pchotels.pk', role: 'Front Desk Associate', property: 'PC Islamabad', status: 'active', lastLogin: 'Yesterday 03:00 PM' },
    { id: 'usr-4', name: 'Sara Iqbal', email: 'sara.i@pchotels.pk', role: 'Chief Accountant', property: 'PC Islamabad', status: 'active', lastLogin: 'Today 09:15 AM' },
    { id: 'usr-5', name: 'Rukhsana Bibi', email: 'rukhsana.b@pchotels.pk', role: 'Housekeeping Lead', property: 'PC Islamabad', status: 'active', lastLogin: 'Today 07:00 AM' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Front Desk Associate',
    property: 'PC Islamabad'
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      property: formData.property,
      status: 'active',
      lastLogin: 'Never'
    };

    setUsersList(prev => [...prev, newUser]);
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'User Invitation Sent',
        message: `Login credentials sent to ${newUser.email}.`
      }
    });

    setIsModalOpen(false);
  };

  const handleToggleStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="users-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Users & Role-Based Access</h1>
          <p className="page-subtitle">Manage system administrators, front desk staff logins and role permission matrices</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Invite User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role & Permissions</th>
                <th>Assigned Property</th>
                <th>Last Login</th>
                <th>Account Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: 'var(--color-primary-100)', color: 'var(--color-primary-700)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', fontSize: 'var(--text-xs)'
                      }}>
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>{u.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ShieldCheck size={16} color="var(--color-primary-600)" />
                      <span style={{ fontWeight: '500', fontSize: 'var(--text-xs)' }}>{u.role}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>
                    {u.property}
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                    {u.lastLogin}
                  </td>
                  <td>
                    <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-error'}`} style={{ fontSize: '10px' }}>
                      {u.status?.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-xs btn-ghost"
                      onClick={() => handleToggleStatus(u.id)}
                    >
                      {u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite User Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 'var(--space-4)'
        }}>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-2xl)',
            width: '100%', maxWidth: 460, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-neutral-50)'
            }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
                Invite System User
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUser} style={{ padding: 'var(--space-5)' }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Asim Raza"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="asim.r@pchotels.pk"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Role & Access Level</label>
                <select
                  className="form-control"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="General Manager">General Manager (All Access)</option>
                  <option value="Front Desk Associate">Front Desk Associate</option>
                  <option value="Chief Accountant">Chief Accountant (Finance only)</option>
                  <option value="Housekeeping Lead">Housekeeping Lead</option>
                  <option value="Night Auditor">Night Auditor</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send User Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
