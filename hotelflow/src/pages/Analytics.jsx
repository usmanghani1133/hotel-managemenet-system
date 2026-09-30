import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import { revenueData, occupancyData, bookingSourceData, roomTypeRevenue, weeklyCheckins, formatCurrency } from '../data/demoData';

export default function Analytics() {
  const { state } = useApp();
  const navigate = useNavigate();

  const COLORS = ['#2449D8', '#7C3AED', '#059669', '#D97706', '#94A3B8'];

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Performance insights — September 2026</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/reports')}>View Reports</button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Occupancy Rate', value: '78%', change: '+5%', color: '#7C3AED' },
          { label: 'ADR', value: '₨16,800', change: '+8%', color: 'var(--color-primary-600)' },
          { label: 'RevPAR', value: '₨13,104', change: '+14%', color: 'var(--color-success)' },
          { label: 'GOPPAR', value: '₨8,950', change: '+11%', color: 'var(--color-gold)' },
        ].map((m, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)', borderTop: `4px solid ${m.color}` }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>{m.label}</div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', marginBottom: 'var(--space-1)' }}>{m.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 'var(--font-semibold)' }}>{m.change} vs last month</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Revenue vs Expenses Trend</div></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2449D8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2449D8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-100)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₨${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={(v) => [formatCurrency(v), '']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2449D8" strokeWidth={2} fill="url(#revG)" />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#059669" strokeWidth={2} fill="none" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#DC2626" strokeWidth={1.5} fill="none" opacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Revenue by Room Type</div></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={roomTypeRevenue} cx="50%" cy="50%" outerRadius={90} dataKey="revenue" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {roomTypeRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [formatCurrency(v), 'Revenue']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Occupancy & ADR Trend</div></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-100)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₨${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="occupancy" name="Occupancy %" stroke="#7C3AED" strokeWidth={2} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="adr" name="ADR" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Booking Sources</div></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bookingSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-neutral-100)" />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip formatter={(v) => [`${v}%`, 'Share']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {bookingSourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
