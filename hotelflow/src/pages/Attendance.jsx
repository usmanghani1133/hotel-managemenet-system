import { useState } from 'react';
import {
  Clock, CheckCircle, WarningCircle, XCircle, CalendarBlank,
  Users, ArrowRight, SignIn, SignOut, Plus
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function Attendance() {
  const { state, dispatch } = useApp();

  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedShift, setSelectedShift] = useState('ALL');

  // Simulated attendance state based on staff
  const [records, setRecords] = useState(() => {
    return state.staff.map((s, idx) => ({
      staffId: s.id,
      name: `${s.firstName} ${s.lastName}`,
      department: s.department,
      shift: s.shift,
      clockIn: idx % 4 === 0 ? null : (idx % 3 === 0 ? '07:42 AM' : '06:55 AM'),
      clockOut: idx % 5 === 0 ? '03:10 PM' : null,
      status: idx % 4 === 0 ? 'absent' : (idx % 3 === 0 ? 'late' : 'present'),
      hoursWorked: idx % 5 === 0 ? '8.2 hrs' : (idx % 4 === 0 ? '0.0 hrs' : '4.5 hrs')
    }));
  });

  const handleToggleClockIn = (staffId) => {
    setRecords(prev => prev.map(r => {
      if (r.staffId === staffId) {
        if (!r.clockIn) {
          return {
            ...r,
            clockIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'present',
            hoursWorked: '0.1 hrs'
          };
        } else if (!r.clockOut) {
          return {
            ...r,
            clockOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hoursWorked: '8.0 hrs'
          };
        }
      }
      return r;
    }));

    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'info',
        title: 'Attendance Updated',
        message: 'Shift punch recorded successfully.'
      }
    });
  };

  const filteredRecords = records.filter(r => {
    if (selectedShift !== 'ALL' && r.shift !== selectedShift) return false;
    return true;
  });

  const presentCount = records.filter(r => r.status === 'present').length;
  const lateCount = records.filter(r => r.status === 'late').length;
  const absentCount = records.filter(r => r.status === 'absent').length;

  return (
    <div className="attendance-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Shift Attendance & Time Clock</h1>
          <p className="page-subtitle">Track daily staff check-ins, shift punctuality, overtime and clock-out status</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <input
            type="date"
            className="form-control"
            style={{ width: 'auto', fontSize: 'var(--text-xs)', height: 36 }}
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
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
              {records.length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Scheduled Today</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {presentCount}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Present & On Time</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <WarningCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {lateCount}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Late Arrivals</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-error-light)', color: 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {absentCount}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Absent / Leave</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {['ALL', 'Morning', 'Evening', 'Night'].map(shift => (
              <button
                key={shift}
                onClick={() => setSelectedShift(shift)}
                className={`btn btn-sm ${selectedShift === shift ? 'btn-primary' : 'btn-secondary'}`}
              >
                {shift === 'ALL' ? 'All Shifts' : `${shift} Shift`}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
            Biometric Timeclock Synced: <strong>Online</strong>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Department</th>
                <th>Assigned Shift</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Hours Worked</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Punch Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(r => (
                <tr key={r.staffId}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>{r.name}</div>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>{r.department}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: '500', color: 'var(--color-neutral-700)' }}>{r.shift}</span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', fontWeight: 'bold', color: r.clockIn ? 'var(--color-neutral-900)' : 'var(--color-neutral-400)' }}>
                      {r.clockIn || '— : —'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', fontWeight: 'bold', color: r.clockOut ? 'var(--color-neutral-900)' : 'var(--color-neutral-400)' }}>
                      {r.clockOut || '— : —'}
                    </span>
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                    {r.hoursWorked}
                  </td>
                  <td>
                    {r.status === 'present' && <span className="badge badge-success" style={{ fontSize: '10px' }}>On Time</span>}
                    {r.status === 'late' && <span className="badge badge-warning" style={{ fontSize: '10px' }}>Late</span>}
                    {r.status === 'absent' && <span className="badge badge-error" style={{ fontSize: '10px' }}>Absent</span>}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-xs btn-secondary"
                      onClick={() => handleToggleClockIn(r.staffId)}
                    >
                      {!r.clockIn ? 'Clock In' : (!r.clockOut ? 'Clock Out' : 'Completed')}
                    </button>
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
