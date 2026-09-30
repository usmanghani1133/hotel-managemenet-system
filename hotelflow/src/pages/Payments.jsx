import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Plus, MagnifyingGlass, Funnel, Printer,
  CheckCircle, ArrowUpRight, CurrencyDollar, FileText,
  CalendarBlank, User, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDateTime } from '../data/demoData';

export default function Payments() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Payment Form
  const [formData, setFormData] = useState({
    reservationId: '',
    guestId: '',
    amount: 10000,
    method: 'Credit Card',
    reference: '',
    notes: ''
  });

  // Calculate totals
  const totalAmount = useMemo(() => {
    return state.payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  }, [state.payments]);

  const cardTotal = useMemo(() => {
    return state.payments
      .filter(p => p.method?.toLowerCase().includes('card') || p.method === 'Credit Card')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
  }, [state.payments]);

  const bankTotal = useMemo(() => {
    return state.payments
      .filter(p => p.method?.toLowerCase().includes('bank') || p.method === 'Bank Transfer')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
  }, [state.payments]);

  const filteredPayments = useMemo(() => {
    return state.payments.filter(p => {
      if (methodFilter !== 'ALL' && p.method !== methodFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const ref = p.reference?.toLowerCase() || '';
        const id = p.id.toLowerCase();
        const g = state.guests.find(gst => gst.id === p.guestId);
        const gName = g ? `${g.firstName} ${g.lastName}`.toLowerCase() : '';
        if (!ref.includes(q) && !id.includes(q) && !gName.includes(q)) return false;
      }
      return true;
    });
  }, [state.payments, methodFilter, searchQuery, state.guests]);

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!formData.amount) return;

    const newPayment = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      invoiceId: formData.reservationId ? `INV-${formData.reservationId}` : 'INV-DIRECT',
      reservationId: formData.reservationId,
      guestId: formData.guestId || state.guests[0]?.id,
      amount: Number(formData.amount),
      method: formData.method,
      reference: formData.reference || `REF-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      collectedBy: state.currentUser.id
    };

    dispatch({ type: 'ADD_PAYMENT', payload: newPayment });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Payment Recorded',
        message: `${formatCurrency(newPayment.amount)} collected via ${newPayment.method}.`
      }
    });

    setIsModalOpen(false);
  };

  return (
    <div className="payments-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Payments & Transactions</h1>
          <p className="page-subtitle">Real-time payment gateway logs, counter settlements and receipt registry</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/billing')}>
            <FileText size={16} /> Invoices & Folios
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Record Counter Payment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="responsive-kpi-grid-4">
        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurrencyDollar size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(totalAmount)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Total Collections</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CreditCard size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(cardTotal)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Card Payments</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowUpRight size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(bankTotal)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Direct Bank Transfer</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {state.payments.length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Transactions Logged</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div style={{ position: 'relative', width: 320 }}>
            <MagnifyingGlass size={16} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--color-neutral-400)' }} />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: 36, height: 38, fontSize: 'var(--text-xs)' }}
              placeholder="Search reference #, guest name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: '600' }}>Method:</span>
            <select
              className="form-control"
              style={{ height: 38, fontSize: 'var(--text-xs)', width: 'auto' }}
              value={methodFilter}
              onChange={e => setMethodFilter(e.target.value)}
            >
              <option value="ALL">All Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="JazzCash">JazzCash / EasyPaisa</option>
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
                <th>Txn ID</th>
                <th>Guest & Booking</th>
                <th>Method</th>
                <th>Reference #</th>
                <th>Amount (PKR)</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(p => {
                const guest = state.guests.find(g => g.id === p.guestId);

                return (
                  <tr key={p.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)' }}>
                        {p.id}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>
                        {guest ? `${guest.title} ${guest.firstName} ${guest.lastName}` : 'Guest Settlement'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-neutral-400)' }}>
                        {p.reservationId || p.invoiceId || 'Counter Sale'}
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-info" style={{ fontSize: '11px' }}>
                        {p.method}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                        {p.reference}
                      </span>
                    </td>

                    <td style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)', color: 'var(--color-success-dark)' }}>
                      {formatCurrency(p.amount)}
                    </td>

                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                      {formatDateTime(p.createdAt || p.date)}
                    </td>

                    <td>
                      <span className="badge badge-success" style={{ fontSize: '10px' }}>
                        {p.status?.toUpperCase() || 'COMPLETED'}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-xs btn-secondary"
                        onClick={() => window.print()}
                        title="Print receipt"
                      >
                        <Printer size={13} /> Print
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-neutral-400)' }}>
              No payments match the selected criteria.
            </div>
          )}
        </div>
      </div>

      {/* Record Payment Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 'var(--space-4)'
        }}>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-2xl)',
            width: '100%', maxWidth: 500, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-neutral-50)'
            }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
                Record Payment
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} style={{ padding: 'var(--space-5)' }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Reservation / Folio</label>
                <select
                  className="form-control"
                  value={formData.reservationId}
                  onChange={e => {
                    const res = state.reservations.find(r => r.id === e.target.value);
                    setFormData({
                      ...formData,
                      reservationId: e.target.value,
                      guestId: res ? res.guestId : '',
                      amount: res && res.balance > 0 ? res.balance : formData.amount
                    });
                  }}
                >
                  <option value="">-- Direct Counter Sale --</option>
                  {state.reservations.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.id} • Balance: {formatCurrency(r.balance || 0)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Amount (PKR)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Payment Method</label>
                  <select
                    className="form-control"
                    value={formData.method}
                    onChange={e => setFormData({ ...formData, method: e.target.value })}
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="JazzCash">JazzCash / EasyPaisa</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Transaction Reference / Slip #</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. VISA-4821 or Bank Txn ID"
                  value={formData.reference}
                  onChange={e => setFormData({ ...formData, reference: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
