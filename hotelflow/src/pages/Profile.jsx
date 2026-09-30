import { useState } from 'react';
import {
  UserCircle, Lock, ShieldCheck, DeviceMobile,
  CheckCircle, FloppyDisk, Key
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { state, dispatch } = useApp();

  const [profileData, setProfileData] = useState({
    name: state.currentUser.name,
    email: state.currentUser.email,
    phone: '+92-333-9876543',
    role: state.currentUser.role,
    department: 'Management'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Profile Updated',
        message: 'Your personal details have been saved.'
      }
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Password Changed',
        message: 'Security credentials updated successfully.'
      }
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="profile-page" style={{ maxWidth: 860, margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">User Profile & Account Security</h1>
          <p className="page-subtitle">Manage your personal credentials, contact info, shift preferences and login security</p>
        </div>
      </div>

      {/* User Header Card */}
      <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--text-2xl)', fontWeight: 'bold'
        }}>
          {profileData.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', margin: 0, color: 'var(--color-neutral-900)' }}>
              {profileData.name}
            </h2>
            <span className="badge badge-primary" style={{ fontSize: '10px' }}>
              {profileData.role}
            </span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 4 }}>
            {profileData.email} • Employee ID: <strong>EMP-003</strong> • Pearl Continental Islamabad
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Personal Details Form */}
        <form onSubmit={handleSaveProfile} className="card" style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
            Personal Information
          </h3>

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={profileData.name}
              onChange={e => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Official Email</label>
            <input
              type="email"
              className="form-control"
              value={profileData.email}
              onChange={e => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Contact Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={profileData.phone}
              onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <FloppyDisk size={15} /> Save Changes
            </button>
          </div>
        </form>

        {/* Change Password Card */}
        <form onSubmit={handleChangePassword} className="card" style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
            Change Password
          </h3>

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Current Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="••••••••"
              value={passwordData.currentPassword}
              onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>New Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Min. 8 characters"
              value={passwordData.newPassword}
              onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-secondary btn-sm">
              <Key size={15} /> Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
