import { useState, useMemo } from 'react';
import {
  CurrencyDollar, Plus, CheckCircle, Clock, Funnel,
  Receipt, ArrowUp, ArrowDown, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Expenses() {
  const { state, dispatch } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    category: 'Utilities',
    description: '',
    amount: 15000,
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Utilities', 'Salaries', 'Maintenance', 'Marketing', 'Supplies', 'F&B Provisions'];

  const totalExpenses = useMemo(() => {
    return state.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [state.expenses]);

  const approvedTotal = useMemo(() => {
    return state.expenses
      .filter(e => e.status === 'approved')
      .reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [state.expenses]);

  const pendingCount = useMemo(() => {
    return state.expenses.filter(e => e.status === 'pending').length;
  }, [state.expenses]);

  const filteredExpenses = useMemo(() => {
    return state.expenses.filter(e => {
      if (categoryFilter !== 'ALL' && e.category !== categoryFilter) return false;
      if (statusFilter !== 'ALL' && e.status !== statusFilter) return false;
      return true;
    });
  }, [state.expenses, categoryFilter, statusFilter]);

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const newExp = {
      id: `exp-${Date.now().toString().slice(-4)}`,
      propertyId: state.currentPropertyId,
      category: formData.category,
      description: formData.description,
      amount: Number(formData.amount),
      date: formData.date,
      status: 'pending',
      submittedBy: state.currentUser.id,
      approvedBy: null,
      receipt: null
    };

    dispatch({ type: 'ADD_EXPENSE', payload: newExp });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Expense Submitted',
        message: `${newExp.description} submitted for management approval.`
      }
    });

    setIsModalOpen(false);
    setFormData({
      category: 'Utilities',
      description: '',
      amount: 15000,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleApprove = (expId) => {
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: {
        id: expId,
        status: 'approved',
        approvedBy: state.currentUser.id
      }
    });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Expense Approved',
        message: 'Expense item approved for accounts disbursement.'
      }
    });
  };

  return (
    <div className="expenses-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Operational Expenses & Disbursements</h1>
          <p className="page-subtitle">Track hotel operating overheads, utilities, supplier bills and approval workflows</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Record Expense
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="responsive-kpi-grid-4">
        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-error-light)', color: 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurrencyDollar size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(totalExpenses)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Total Monthly Expenses</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(approvedTotal)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Approved & Disbursed</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {pendingCount}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Pending GM Approval</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Receipt size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {categories.length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Cost Centers</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: '600' }}>Category:</span>
            <select
              className="form-control"
              style={{ height: 38, fontSize: 'var(--text-xs)', width: 'auto' }}
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: '600', marginLeft: 8 }}>Status:</span>
            <select
              className="form-control"
              style={{ height: 38, fontSize: 'var(--text-xs)', width: 'auto' }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
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
                <th>Expense ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount (PKR)</th>
                <th>Submitted By</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(exp => (
                <tr key={exp.id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)' }}>
                      {exp.id}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>
                      {exp.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>
                      {exp.description}
                    </div>
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                    {exp.date}
                  </td>
                  <td style={{ fontWeight: 'bold', color: 'var(--color-error)' }}>
                    {formatCurrency(exp.amount)}
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                    {state.staff.find(s => s.id === exp.submittedBy)?.firstName || 'Finance'}
                  </td>
                  <td>
                    <span className={`badge ${exp.status === 'approved' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                      {exp.status?.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {exp.status === 'pending' && (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleApprove(exp.id)}
                      >
                        Approve
                      </button>
                    )}
                    {exp.status === 'approved' && (
                      <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 'bold' }}>
                        ✓ Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 'var(--space-4)'
        }}>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-2xl)',
            width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-neutral-50)'
            }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
                Record Operational Expense
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} style={{ padding: 'var(--space-5)' }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Cost Center / Category</label>
                <select
                  className="form-control"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Description / Bill Details</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Generator Diesel & Fuel Refill"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
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
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Bill Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
