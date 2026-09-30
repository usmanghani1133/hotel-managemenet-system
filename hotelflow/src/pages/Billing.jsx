import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, CreditCard, Plus, Download, Eye, MagnifyingGlass } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';
import { Modal, EmptyState } from '../components/Layout';

export default function Billing() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPayModal, setShowPayModal] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('Cash');
  const [payRef, setPayRef] = useState('');

  const filtered = state.invoices.filter(inv => {
    const guest = state.guests.find(g => g.id === inv.guestId);
    const matchSearch = !search || inv.id.toLowerCase().includes(search.toLowerCase()) ||
      (guest && `${guest.firstName} ${guest.lastName}`.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalOutstanding = state.invoices.filter(inv => inv.balance > 0).reduce((sum, inv) => sum + inv.balance, 0);
  const totalPaid = state.invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);

  const handlePayment = () => {
    if (!showPayModal || !payAmount || Number(payAmount) <= 0) {
      showToast('error', 'Error', 'Please enter a valid amount.');
      return;
    }
    const amount = Number(payAmount);
    const inv = state.invoices.find(i => i.id === showPayModal);
    const newBalance = Math.max(0, inv.balance - amount);
    const newStatus = newBalance === 0 ? 'paid' : 'partial';

    dispatch({ type: 'UPDATE_INVOICE', payload: { id: showPayModal, paidAmount: inv.paidAmount + amount, balance: newBalance, status: newStatus } });
    dispatch({
      type: 'ADD_PAYMENT',
      payload: { id: `PAY-${Date.now()}`, invoiceId: showPayModal, guestId: inv.guestId, amount, method: payMethod, reference: payRef, status: 'completed', createdAt: new Date().toISOString(), collectedBy: state.currentUser.id }
    });
    showToast('success', 'Payment Recorded', `${formatCurrency(amount)} payment recorded successfully.`);
    setShowPayModal(null);
    setPayAmount('');
    setPayRef('');
  };

  const statusConfig = {
    paid:    { label: 'Paid',    color: 'var(--color-success)', bg: 'var(--color-success-light)' },
    partial: { label: 'Partial', color: 'var(--color-warning)', bg: 'var(--color-warning-light)' },
    unpaid:  { label: 'Unpaid',  color: 'var(--color-error)',   bg: 'var(--color-error-light)' },
    draft:   { label: 'Draft',   color: 'var(--color-neutral-400)', bg: 'var(--color-neutral-100)' },
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Billing</h1>
          <p className="page-subtitle">{state.invoices.length} invoices · {formatCurrency(totalOutstanding)} outstanding</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm"><Download size={15} /> Export</button>
          <button className="btn btn-primary btn-sm"><Plus size={15} /> New Invoice</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Total Invoiced', value: formatCurrency(state.invoices.reduce((s, i) => s + i.grandTotal, 0)), color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)' },
          { label: 'Total Collected', value: formatCurrency(totalPaid), color: 'var(--color-success)', bg: 'var(--color-success-light)' },
          { label: 'Outstanding Balance', value: formatCurrency(totalOutstanding), color: 'var(--color-warning)', bg: 'var(--color-warning-light)' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 320 }}>
          <MagnifyingGlass size={15} className="search-icon" />
          <input type="text" className="form-input" placeholder="Search invoice or guest..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 'var(--space-8)' }} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {['all', 'paid', 'partial', 'unpaid'].map(s => (
            <button key={s} className="btn btn-xs"
              style={{ background: statusFilter === s ? 'var(--color-neutral-800)' : 'var(--color-neutral-100)', color: statusFilter === s ? 'white' : 'var(--color-neutral-600)', border: 'none', textTransform: 'capitalize' }}
              onClick={() => setStatusFilter(s)}
            >{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Guest</th>
                <th>Reservation</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const guest = state.guests.find(g => g.id === inv.guestId);
                const statusCfg = statusConfig[inv.status] || statusConfig.draft;
                return (
                  <tr key={inv.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-primary-600)' }}>{inv.id}</td>
                    <td style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)' }}>
                      {guest ? `${guest.firstName} ${guest.lastName}` : '—'}
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{inv.reservationId}</td>
                    <td style={{ fontWeight: 'var(--font-semibold)' }}>{formatCurrency(inv.grandTotal)}</td>
                    <td style={{ color: 'var(--color-success)', fontWeight: 'var(--font-medium)' }}>{formatCurrency(inv.paidAmount)}</td>
                    <td style={{ fontWeight: 'var(--font-bold)', color: inv.balance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success)' }}>
                      {formatCurrency(inv.balance)}
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{formatDate(inv.dueDate)}</td>
                    <td>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: statusCfg.color, background: statusCfg.bg, padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button className="btn btn-xs btn-ghost" title="View"><Eye size={13} /></button>
                        {inv.balance > 0 && (
                          <button className="btn btn-xs btn-primary" onClick={() => { setShowPayModal(inv.id); setPayAmount(String(inv.balance)); }}>
                            <CreditCard size={12} /> Pay
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!filtered.length && <EmptyState icon={Receipt} title="No invoices found" />}
        </div>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={!!showPayModal} onClose={() => setShowPayModal(null)} title="Record Payment" size="sm"
        footer={
          <>
            <button className="btn btn-secondary btn-md" onClick={() => setShowPayModal(null)}>Cancel</button>
            <button className="btn btn-primary btn-md" onClick={handlePayment}>Record Payment</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {showPayModal && (() => {
            const inv = state.invoices.find(i => i.id === showPayModal);
            const guest = inv ? state.guests.find(g => g.id === inv.guestId) : null;
            return (
              <div style={{ background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                <div style={{ fontWeight: 'var(--font-semibold)', marginBottom: 4 }}>{guest ? `${guest.firstName} ${guest.lastName}` : '—'}</div>
                <div style={{ color: 'var(--color-neutral-500)' }}>Outstanding: <strong style={{ color: 'var(--color-warning-dark)' }}>{formatCurrency(inv?.balance || 0)}</strong></div>
              </div>
            );
          })()}
          <div className="form-group">
            <label className="form-label required">Amount (PKR)</label>
            <input type="number" className="form-input" placeholder="0" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select className="form-select" value={payMethod} onChange={e => setPayMethod(e.target.value)}>
              {['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Cheque', 'Mobile Wallet'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Reference / Transaction ID</label>
            <input className="form-input" placeholder="Optional reference number" value={payRef} onChange={e => setPayRef(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
