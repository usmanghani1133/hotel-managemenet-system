import { useState } from 'react';
import {
  FileText, Download, Printer, CalendarBlank,
  ChartBar, CurrencyDollar, TrendUp, Funnel
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Reports() {
  const { state } = useApp();

  const [selectedReport, setSelectedReport] = useState('manager-flash');
  const [dateRange, setDateRange] = useState('month-to-date');

  const reportsList = [
    { id: 'manager-flash', name: 'Daily Manager Flash Report', category: 'Executive', desc: 'Overview of ADR, RevPAR, Occupancy, total collections and forecast' },
    { id: 'night-audit', name: 'Night Audit Closeout Summary', category: 'Operations', desc: 'Midnight trial balance, folio reconciliations and counter cash audit' },
    { id: 'tax-gst', name: 'Tax / GST Compliance Report', category: 'Finance', desc: 'Federal Excise Duty (FED) and Provincial Sales Tax (15%) breakdown' },
    { id: 'channels', name: 'OTA & Channel Performance', category: 'Sales', desc: 'Direct website vs Booking.com vs Agoda vs Corporate contracts' },
    { id: 'housekeeping', name: 'Housekeeping Efficiency', category: 'Operations', desc: 'Room turnaround speed, cleaning time and inspection pass rates' },
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Metric,Value\nToday,Gross Revenue,2900000\nToday,Occupancy,78%\nToday,ADR,16800\nToday,RevPAR,13104";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hotelflow_report_${selectedReport}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Hospitality Reports & Financial Audits</h1>
          <p className="page-subtitle">Generate official hotel management audits, tax records, revenue reports and night audit summaries</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
            <Download size={16} /> Export CSV
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
            <Printer size={16} /> Print / PDF Report
          </button>
        </div>
      </div>

      <div className="responsive-reports-layout">
        {/* Left Column: Report Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-neutral-400)', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
              Standard Reports Catalog
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {reportsList.map(r => {
                const isSelected = selectedReport === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedReport(r.id)}
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-lg)',
                      border: isSelected ? '2px solid var(--color-primary-600)' : '1px solid var(--color-neutral-200)',
                      background: isSelected ? 'var(--color-primary-50)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontWeight: '600', fontSize: 'var(--text-sm)', color: isSelected ? 'var(--color-primary-700)' : 'var(--color-neutral-900)' }}>
                        {r.name}
                      </span>
                      <span className="badge badge-info" style={{ fontSize: '9px' }}>{r.category}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-neutral-500)', lineHeight: 1.3 }}>
                      {r.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-neutral-400)', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
              Date Range Selection
            </h3>
            <select
              className="form-control"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              style={{ fontSize: 'var(--text-xs)' }}
            >
              <option value="today">Today (26 Sep 2026)</option>
              <option value="yesterday">Yesterday</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="month-to-date">Month-to-Date (September 2026)</option>
              <option value="year-to-date">Year-to-Date (FY 2026-27)</option>
            </select>
          </div>
        </div>

        {/* Right Column: Live Report Preview */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge badge-primary" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                  {state.properties.find(p => p.id === state.currentPropertyId)?.name || 'Pearl Continental Islamabad'}
                </span>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', margin: '6px 0 2px', color: 'var(--color-neutral-900)' }}>
                  {reportsList.find(r => r.id === selectedReport)?.name}
                </h2>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                  Reporting Period: <strong>September 2026 (Month-to-Date)</strong> • Currency: <strong>PKR (₨)</strong>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-neutral-400)' }}>Generated on</div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600' }}>{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Flash Metrics */}
          <div className="responsive-kpi-grid-4">
            <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Gross Revenue</div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-primary-700)', marginTop: 2 }}>
                ₨29,00,000
              </div>
            </div>

            <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Avg Daily Rate (ADR)</div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-neutral-900)', marginTop: 2 }}>
                ₨16,800
              </div>
            </div>

            <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>RevPAR</div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-neutral-900)', marginTop: 2 }}>
                ₨13,104
              </div>
            </div>

            <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Occupancy Rate</div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-success-dark)', marginTop: 2 }}>
                78.0%
              </div>
            </div>
          </div>

          {/* Table Details */}
          <div>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', marginBottom: 'var(--space-3)', color: 'var(--color-neutral-900)' }}>
              Revenue Center Reconciliation
            </h3>
            <div className="table-wrapper">
              <table className="data-table" style={{ fontSize: 'var(--text-xs)' }}>
                <thead>
                  <tr>
                    <th>Department / Revenue Source</th>
                    <th style={{ textAlign: 'right' }}>MTD Revenue</th>
                    <th style={{ textAlign: 'right' }}>Budget Target</th>
                    <th style={{ textAlign: 'right' }}>Variance</th>
                    <th style={{ textAlign: 'right' }}>Tax (15% GST)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Rooms Tariff</strong> (42 Rooms)</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₨22,40,000</td>
                    <td style={{ textAlign: 'right' }}>₨21,00,000</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: 'bold' }}>+ ₨1,40,000</td>
                    <td style={{ textAlign: 'right' }}>₨3,36,000</td>
                  </tr>
                  <tr>
                    <td><strong>Food & Beverage (Restaurant & Room Service)</strong></td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₨4,80,000</td>
                    <td style={{ textAlign: 'right' }}>₨4,50,000</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: 'bold' }}>+ ₨30,000</td>
                    <td style={{ textAlign: 'right' }}>₨72,000</td>
                  </tr>
                  <tr>
                    <td><strong>Guest Services & Transport</strong></td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₨1,20,000</td>
                    <td style={{ textAlign: 'right' }}>₨1,00,000</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: 'bold' }}>+ ₨20,000</td>
                    <td style={{ textAlign: 'right' }}>₨18,000</td>
                  </tr>
                  <tr>
                    <td><strong>Laundry & Incidental Minibar</strong></td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₨60,000</td>
                    <td style={{ textAlign: 'right' }}>₨50,000</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: 'bold' }}>+ ₨10,000</td>
                    <td style={{ textAlign: 'right' }}>₨9,000</td>
                  </tr>
                  <tr style={{ background: 'var(--color-neutral-100)', fontWeight: 'bold' }}>
                    <td>TOTAL NET REVENUE</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-primary-700)' }}>₨29,00,000</td>
                    <td style={{ textAlign: 'right' }}>₨27,00,000</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-success)' }}>+ ₨2,00,000</td>
                    <td style={{ textAlign: 'right' }}>₨4,35,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
