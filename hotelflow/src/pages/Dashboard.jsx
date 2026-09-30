import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  TrendUp, TrendDown, Bed, Users, Receipt, CreditCard,
  Door, Broom, Wrench, Warning, ArrowRight, Calendar,
  ChartBar, Buildings, ForkKnife, Package
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/Layout';
import {
  formatCurrency, revenueData, occupancyData,
  bookingSourceData, roomTypeRevenue, weeklyCheckins,
  getOccupancyStats, getTodayStats
} from '../data/demoData';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#2449D8', '#7C3AED', '#059669', '#D97706', '#94A3B8'];

function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-800)' }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginTop: 2 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export default function Dashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('month');
  const occupancy = getOccupancyStats();
  const todayStats = getTodayStats();

  const kpis = [
    {
      label: 'Monthly Revenue',
      value: '₨29,00,000',
      change: 12,
      period: 'vs last month',
      icon: Receipt,
      accentColor: 'var(--color-primary-600)',
      iconBg: 'var(--color-primary-50)'
    },
    {
      label: 'Today\'s Revenue',
      value: '₨1,45,000',
      change: 8,
      period: 'vs yesterday',
      icon: CreditCard,
      accentColor: 'var(--color-success)',
      iconBg: 'var(--color-success-light)'
    },
    {
      label: 'Occupancy Rate',
      value: `${occupancy.occupancyRate}%`,
      change: 5,
      period: 'vs last month',
      icon: Bed,
      accentColor: '#7C3AED',
      iconBg: '#F5F3FF'
    },
    {
      label: 'ADR',
      value: '₨16,800',
      change: 8,
      period: 'Average Daily Rate',
      icon: TrendUp,
      accentColor: 'var(--color-gold)',
      iconBg: 'var(--color-gold-light)'
    },
    {
      label: 'RevPAR',
      value: '₨13,104',
      change: 14,
      period: 'Revenue Per Avail. Room',
      icon: ChartBar,
      accentColor: '#0891B2',
      iconBg: '#ECFEFF'
    },
    {
      label: 'Available Rooms',
      value: String(occupancy.available),
      changeLabel: `${occupancy.occupied} occupied · ${occupancy.reserved} reserved`,
      icon: Bed,
      accentColor: 'var(--color-success)',
      iconBg: 'var(--color-success-light)'
    },
    {
      label: 'Today Check-ins',
      value: String(todayStats.todayCheckins),
      changeLabel: 'Expected arrivals',
      icon: Door,
      accentColor: 'var(--color-primary-600)',
      iconBg: 'var(--color-primary-50)'
    },
    {
      label: 'Today Check-outs',
      value: String(todayStats.todayCheckouts),
      changeLabel: 'Expected departures',
      icon: Door,
      accentColor: 'var(--color-warning)',
      iconBg: 'var(--color-warning-light)'
    },
    {
      label: 'Pending Payments',
      value: '₨4,85,000',
      change: -3,
      period: 'Outstanding balance',
      icon: Warning,
      accentColor: 'var(--color-warning)',
      iconBg: 'var(--color-warning-light)'
    },
    {
      label: 'Housekeeping Tasks',
      value: String(state.housekeepingTasks.filter(t => t.status !== 'completed').length),
      changeLabel: 'Pending tasks',
      icon: Broom,
      accentColor: '#7C3AED',
      iconBg: '#F5F3FF'
    },
    {
      label: 'Open Maintenance',
      value: String(state.maintenanceTickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length),
      changeLabel: 'Active tickets',
      icon: Wrench,
      accentColor: 'var(--color-warning)',
      iconBg: 'var(--color-warning-light)'
    },
    {
      label: 'Total Guests In-house',
      value: String(occupancy.occupied * 2),
      changeLabel: 'Currently staying',
      icon: Users,
      accentColor: '#0891B2',
      iconBg: '#ECFEFF'
    },
  ];

  const todayReservations = state.reservations.filter(r =>
    r.status === 'checked-in' || r.status === 'confirmed'
  ).slice(0, 5);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Pearl Continental Islamabad — {new Date().toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="page-actions">
          <div style={{ display: 'flex', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', padding: 2 }}>
            {['today', 'week', 'month', 'year'].map(f => (
              <button
                key={f}
                className="btn btn-xs"
                style={{
                  background: dateFilter === f ? 'white' : 'transparent',
                  color: dateFilter === f ? 'var(--color-neutral-800)' : 'var(--color-neutral-500)',
                  boxShadow: dateFilter === f ? 'var(--shadow-xs)' : 'none',
                  border: 'none',
                  textTransform: 'capitalize',
                  fontWeight: dateFilter === f ? 'var(--font-semibold)' : 'var(--font-regular)'
                }}
                onClick={() => setDateFilter(f)}
              >
                {f === 'today' ? 'Today' : f === 'week' ? 'Week' : f === 'month' ? 'Month' : 'Year'}
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/reservations/new')}>
            + New Reservation
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        {kpis.map((kpi, i) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="dashboard-charts-row-main">
        {/* Revenue Trend */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Revenue Trend</div>
              <div className="card-subtitle">Monthly revenue vs expenses</div>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2449D8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2449D8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-100)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-neutral-400)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-neutral-400)' }} axisLine={false} tickLine={false} tickFormatter={v => `₨${(v/100000).toFixed(1)}L`} />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), '']}
                  contentStyle={{ borderRadius: 8, border: '1px solid var(--color-neutral-200)', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2449D8" strokeWidth={2} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#DC2626" strokeWidth={2} fill="url(#expGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Sources */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Booking Sources</div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={bookingSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                >
                  {bookingSourceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              {bookingSourceData.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-800)' }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="dashboard-charts-row-split">
        {/* Occupancy Trend */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Occupancy Trend</div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-100)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-neutral-400)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-neutral-400)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v, name) => [name === 'occupancy' ? `${v}%` : formatCurrency(v), name === 'occupancy' ? 'Occupancy' : name.toUpperCase()]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="occupancy" name="Occupancy %" stroke="#7C3AED" strokeWidth={2} dot={{ r: 4, fill: '#7C3AED' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Check-in vs Check-out */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Weekly Check-in vs Check-out</div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyCheckins}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-100)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--color-neutral-400)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-neutral-400)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="checkins" name="Check-ins" fill="#2449D8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="checkouts" name="Check-outs" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue by Room Type */}
      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-header">
          <div className="card-title">Revenue by Room Type</div>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={roomTypeRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-100)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-neutral-400)' }} axisLine={false} tickLine={false} tickFormatter={v => `₨${(v/1000).toFixed(0)}K`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--color-neutral-600)' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip formatter={(v) => [formatCurrency(v), 'Revenue']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {roomTypeRevenue.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Recent Reservations + Room Status + Quick Actions */}
      <div className="dashboard-charts-row-main">
        {/* Recent Reservations */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Active Reservations</div>
              <div className="card-subtitle">Current and upcoming bookings</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/reservations')}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {todayReservations.map(res => {
                  const guest = state.guests.find(g => g.id === res.guestId);
                  const room = state.rooms.find(r => r.id === res.roomId);
                  return (
                    <tr key={res.id} onClick={() => navigate(`/app/reservations/${res.id}`)} style={{ cursor: 'pointer' }}>
                      <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'var(--color-primary-600)' }}>{res.id}</td>
                      <td>
                        <div style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)' }}>
                          {guest ? `${guest.firstName} ${guest.lastName}` : '—'}
                          {guest?.vip && <span className="badge badge-gold" style={{ marginLeft: 'var(--space-1)', fontSize: '0.6rem' }}>VIP</span>}
                        </div>
                      </td>
                      <td style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)' }}>{room ? `Rm ${room.number}` : 'TBD'}</td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{res.checkIn}</td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{res.checkOut}</td>
                      <td><span className={`badge booking-badge ${res.status}`}>{res.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></td>
                      <td style={{ fontWeight: 'var(--font-semibold)', color: res.balance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success)' }}>
                        {formatCurrency(res.balance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Room Status Summary + Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Room Status */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Room Status</div>
            </div>
            <div className="card-body" style={{ padding: 'var(--space-4)' }}>
              {[
                { label: 'Available', count: occupancy.available, color: 'var(--status-available)', bg: 'var(--status-available-bg)' },
                { label: 'Occupied', count: occupancy.occupied, color: 'var(--status-occupied)', bg: 'var(--status-occupied-bg)' },
                { label: 'Reserved', count: occupancy.reserved, color: 'var(--status-reserved)', bg: 'var(--status-reserved-bg)' },
                { label: 'Dirty', count: occupancy.dirty, color: 'var(--status-dirty)', bg: 'var(--status-dirty-bg)' },
                { label: 'Cleaning', count: occupancy.cleaning, color: 'var(--status-cleaning)', bg: 'var(--status-cleaning-bg)' },
                { label: 'Maintenance', count: occupancy.maintenance, color: 'var(--status-maintenance)', bg: 'var(--status-maintenance-bg)' },
              ].map(s => (
                <div key={s.label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'var(--space-2) 0',
                  borderBottom: '1px solid var(--color-neutral-50)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{s.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)' }}>{s.count}</span>
                    <div style={{ width: 50, height: 4, background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(s.count / occupancy.totalRooms) * 100}%`, background: s.color, borderRadius: 'var(--radius-full)', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--color-neutral-500)' }}>Total Rooms</span>
                  <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)' }}>{occupancy.totalRooms}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Quick Actions</div>
            </div>
            <div className="card-body" style={{ padding: 'var(--space-4)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
              {[
                { label: 'New Reservation', icon: Calendar, to: '/app/reservations/new', color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)' },
                { label: 'Check In', icon: Door, to: '/app/check-in', color: 'var(--color-success)', bg: 'var(--color-success-light)' },
                { label: 'Check Out', icon: Door, to: '/app/check-out', color: 'var(--color-warning)', bg: 'var(--color-warning-light)' },
                { label: 'Add Guest', icon: Users, to: '/app/guests', color: '#7C3AED', bg: '#F5F3FF' },
                { label: 'Restaurant', icon: ForkKnife, to: '/app/restaurant', color: '#EA580C', bg: '#FFF7ED' },
                { label: 'Inventory', icon: Package, to: '/app/inventory', color: '#0891B2', bg: '#ECFEFF' },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.to)}
                  style={{
                    background: action.bg,
                    border: `1px solid ${action.color}20`,
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-3)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    transition: 'all 0.15s ease',
                    color: action.color
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <action.icon size={20} weight="duotone" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-700)', textAlign: 'center' }}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
