import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, UserPlus, MagnifyingGlass, Funnel, Phone,
  Envelope, CalendarBlank, CurrencyDollar, Briefcase,
  CheckCircle, Clock, X, Plus
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Staff() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedShift, setSelectedShift] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New staff form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: 'Front Office',
    role: 'Front Desk Associate',
    shift: 'Morning',
    phone: '',
    email: '',
    salary: 45000,
    joiningDate: new Date().toISOString().split('T')[0]
  });

  const departments = ['Front Office', 'Housekeeping', 'Maintenance', 'F&B', 'Finance', 'Management'];

  // Total payroll calculation
  const totalPayroll = useMemo(() => {
    return state.staff.reduce((acc, s) => acc + (s.salary || 0), 0);
  }, [state.staff]);

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return state.staff.filter(s => {
      if (selectedDept !== 'ALL' && s.department !== selectedDept) return false;
      if (selectedShift !== 'ALL' && s.shift !== selectedShift) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
        const empId = s.employeeId?.toLowerCase() || '';
        const phone = s.phone?.toLowerCase() || '';
        const email = s.email?.toLowerCase() || '';
        if (!fullName.includes(q) && !empId.includes(q) && !phone.includes(q) && !email.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [state.staff, selectedDept, selectedShift, searchQuery]);

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) return;

    const newStaff = {
      id: `staff-${Date.now()}`,
      propertyId: state.currentPropertyId,
      employeeId: `EMP-${String(state.staff.length + 1).padStart(3, '0')}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      department: formData.department,
      phone: formData.phone || '+92-300-0000000',
      email: formData.email || `${formData.firstName.toLowerCase()}@pchotels.pk`,
      joiningDate: formData.joiningDate,
      shift: formData.shift,
      status: 'active',
      salary: Number(formData.salary)
    };

    dispatch({ type: 'ADD_STAFF', payload: newStaff });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Staff Member Added',
        message: `${newStaff.firstName} ${newStaff.lastName} registered successfully.`
      }
    });

    setIsAddModalOpen(false);
    setFormData({
      firstName: '',
      lastName: '',
      department: 'Front Office',
      role: 'Front Desk Associate',
      shift: 'Morning',
      phone: '',
      email: '',
      salary: 45000,
      joiningDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleToggleStatus = (staffMember) => {
    const nextStatus = staffMember.status === 'active' ? 'on-leave' : 'active';
    dispatch({
      type: 'UPDATE_STAFF',
      payload: { ...staffMember, status: nextStatus }
    });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'info',
        title: 'Status Updated',
        message: `${staffMember.firstName} is now marked ${nextStatus}.`
      }
    });
  };

  const getShiftColor = (shift) => {
    switch (shift) {
      case 'Morning': return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE', time: '07:00 - 15:00' };
      case 'Evening': return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', time: '15:00 - 23:00' };
      case 'Night': return { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE', time: '23:00 - 07:00' };
      default: return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0', time: 'Flexible' };
    }
  };

  return (
    <div className="staff-page">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Staff & Human Resources</h1>
          <p className="page-subtitle">Manage hotel staff directory, departments, shift schedules and payroll</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/attendance')}>
            <Clock size={16} /> Shift Attendance
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus size={16} /> Add Staff Member
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="responsive-kpi-grid-4">
        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {state.staff.length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Total Hotel Staff</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {state.staff.filter(s => s.status === 'active').length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Active On Duty</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {departments.length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Hotel Departments</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurrencyDollar size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(totalPayroll)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Monthly Payroll Cost</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          {/* Search */}
          <div style={{ position: 'relative', width: 300 }}>
            <MagnifyingGlass size={16} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--color-neutral-400)' }} />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: 36, height: 38, fontSize: 'var(--text-xs)' }}
              placeholder="Search by name, ID, phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: '600' }}>Dept:</span>
            <select
              className="form-control"
              style={{ height: 38, fontSize: 'var(--text-xs)', width: 'auto' }}
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
            >
              <option value="ALL">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: '600', marginLeft: 8 }}>Shift:</span>
            <select
              className="form-control"
              style={{ height: 38, fontSize: 'var(--text-xs)', width: 'auto' }}
              value={selectedShift}
              onChange={e => setSelectedShift(e.target.value)}
            >
              <option value="ALL">All Shifts</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
              <option value="Any">Flexible / Any</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department & Role</th>
                <th>Shift Schedule</th>
                <th>Contact Info</th>
                <th>Joining Date</th>
                <th>Monthly Salary</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(staffMember => {
                const shiftInfo = getShiftColor(staffMember.shift);

                return (
                  <tr key={staffMember.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))',
                          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 'var(--text-xs)', fontWeight: 'bold', flexShrink: 0
                        }}>
                          {staffMember.firstName[0]}{staffMember.lastName[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>
                            {staffMember.firstName} {staffMember.lastName}
                          </div>
                          <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--color-neutral-400)' }}>
                            {staffMember.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: '500', color: 'var(--color-neutral-800)' }}>
                        {staffMember.role}
                      </div>
                      <span className="badge badge-info" style={{ fontSize: '10px', marginTop: 2 }}>
                        {staffMember.department}
                      </span>
                    </td>

                    <td>
                      <div style={{
                        display: 'inline-flex', flexDirection: 'column',
                        background: shiftInfo.bg, color: shiftInfo.text, border: `1px solid ${shiftInfo.border}`,
                        padding: '3px 8px', borderRadius: 'var(--radius-md)', fontSize: '11px'
                      }}>
                        <span style={{ fontWeight: 'bold' }}>{staffMember.shift}</span>
                        <span style={{ fontSize: '9px', opacity: 0.8 }}>{shiftInfo.time}</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Phone size={12} color="var(--color-neutral-400)" /> {staffMember.phone}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Envelope size={12} color="var(--color-neutral-400)" /> {staffMember.email}
                      </div>
                    </td>

                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                      {staffMember.joiningDate}
                    </td>

                    <td style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>
                      {formatCurrency(staffMember.salary || 0)}
                    </td>

                    <td>
                      <span className={`badge ${staffMember.status === 'active' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                        {staffMember.status === 'active' ? 'Active' : 'On Leave'}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-xs btn-ghost"
                        onClick={() => handleToggleStatus(staffMember)}
                        title="Toggle status"
                      >
                        {staffMember.status === 'active' ? 'Set Leave' : 'Set Active'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredStaff.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-neutral-400)' }}>
              No staff members match the selected filters.
            </div>
          )}
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 'var(--space-4)'
        }}>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-2xl)',
            width: '100%', maxWidth: 540, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-neutral-50)'
            }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                Add New Staff Member
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddStaff} style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Tariq"
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Aziz"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Department</label>
                  <select
                    className="form-control"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                  >
                    {departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Designation / Role</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Concierge"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Shift</label>
                  <select
                    className="form-control"
                    value={formData.shift}
                    onChange={e => setFormData({ ...formData, shift: e.target.value })}
                  >
                    <option value="Morning">Morning (07:00 - 15:00)</option>
                    <option value="Evening">Evening (15:00 - 23:00)</option>
                    <option value="Night">Night (23:00 - 07:00)</option>
                    <option value="Any">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Monthly Salary (PKR)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.salary}
                    onChange={e => setFormData({ ...formData, salary: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92-300-1234567"
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="staff@pchotels.pk"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
