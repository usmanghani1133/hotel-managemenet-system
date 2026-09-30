import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, Plus, MagnifyingGlass, Phone, Envelope,
  CurrencyDollar, Buildings, CheckCircle, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Vendors() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendorsList, setVendorsList] = useState(state.vendors || []);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Linens',
    contact: '',
    phone: '',
    email: '',
    outstandingBalance: 0
  });

  const totalOutstanding = useMemo(() => {
    return vendorsList.reduce((sum, v) => sum + (v.outstandingBalance || 0), 0);
  }, [vendorsList]);

  const totalProcurement = useMemo(() => {
    return vendorsList.reduce((sum, v) => sum + (v.totalPurchases || 0), 0);
  }, [vendorsList]);

  const filteredVendors = useMemo(() => {
    return vendorsList.filter(v => {
      const q = searchQuery.toLowerCase();
      return v.name.toLowerCase().includes(q) ||
        v.contact.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);
    });
  }, [vendorsList, searchQuery]);

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newVendor = {
      id: `vnd-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      category: formData.category,
      contact: formData.contact,
      phone: formData.phone,
      email: formData.email,
      outstandingBalance: Number(formData.outstandingBalance) || 0,
      totalPurchases: 0
    };

    setVendorsList(prev => [...prev, newVendor]);
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Vendor Registered',
        message: `${newVendor.name} added to approved suppliers list.`
      }
    });

    setIsModalOpen(false);
    setFormData({
      name: '',
      category: 'Linens',
      contact: '',
      phone: '',
      email: '',
      outstandingBalance: 0
    });
  };

  return (
    <div className="vendors-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Suppliers & Vendor Registry</h1>
          <p className="page-subtitle">Manage approved hotel suppliers, procurement accounts and accounts payable</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/purchases')}>
            <Truck size={16} /> Purchase Orders
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Supplier
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="responsive-kpi-grid-3">
        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Buildings size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {vendorsList.length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Approved Suppliers</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurrencyDollar size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(totalProcurement)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Total Procurement Volume</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-warning-dark)' }}>
              {formatCurrency(totalOutstanding)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Outstanding Accounts Payable</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-4)' }}>
        <div style={{ position: 'relative', width: 340 }}>
          <MagnifyingGlass size={16} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--color-neutral-400)' }} />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: 36, height: 38, fontSize: 'var(--text-xs)' }}
            placeholder="Search vendor name, contact person..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Category</th>
                <th>Contact Representative</th>
                <th>Phone & Email</th>
                <th>Total Purchases</th>
                <th>Outstanding Balance</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map(v => (
                <tr key={v.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>{v.name}</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--color-neutral-400)' }}>{v.id}</div>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>{v.category}</span>
                  </td>
                  <td style={{ fontWeight: '500', color: 'var(--color-neutral-800)' }}>
                    {v.contact}
                  </td>
                  <td>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>{v.phone}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-neutral-400)' }}>{v.email}</div>
                  </td>
                  <td style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>
                    {formatCurrency(v.totalPurchases || 0)}
                  </td>
                  <td>
                    <span style={{ fontWeight: 'bold', color: v.outstandingBalance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success)' }}>
                      {formatCurrency(v.outstandingBalance || 0)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-xs btn-secondary"
                      onClick={() => navigate('/app/purchases')}
                    >
                      New PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vendor Modal */}
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
                Add Supplier / Vendor
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddVendor} style={{ padding: 'var(--space-5)' }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Kohinoor Textile Mills"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Category</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Linens">Linens & Bedding</option>
                    <option value="Cleaning Supplies">Cleaning & Chemicals</option>
                    <option value="Food & Beverages">Food & Provisions</option>
                    <option value="Maintenance">Electrical & Maintenance</option>
                    <option value="Toiletries">Guest Toiletries</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Contact Representative</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Asad Malik"
                    value={formData.contact}
                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+92-300-1234567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="sales@vendor.pk"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
