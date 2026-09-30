import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, Plus, CheckCircle, Clock, Truck,
  CurrencyDollar, Buildings, FileText, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Purchases() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Demo purchase orders state
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: 'PO-2026-001', vendorName: 'Continental Linens Co.', orderDate: '2026-09-20', expectedDate: '2026-09-28', items: '50x King Bed Sheets, 100x Pillow Covers', totalAmount: 185000, status: 'shipped' },
    { id: 'PO-2026-002', vendorName: 'TechnoClean Supplies', orderDate: '2026-09-22', expectedDate: '2026-09-27', items: '20x Multi-Purpose Cleaner (5L), 500x Hotel Soap Bars', totalAmount: 48000, status: 'pending' },
    { id: 'PO-2026-003', vendorName: 'Islamabad Fresh Farms', orderDate: '2026-09-25', expectedDate: '2026-09-26', items: 'Fresh Dairy, Free-Range Eggs, Gourmet Vegetables', totalAmount: 72000, status: 'delivered' },
    { id: 'PO-2026-004', vendorName: 'Continental Linens Co.', orderDate: '2026-09-10', expectedDate: '2026-09-15', items: '80x Luxury Bath Towels, 40x Bathrobes', totalAmount: 120000, status: 'delivered' },
  ]);

  const [formData, setFormData] = useState({
    vendorName: 'Continental Linens Co.',
    items: '',
    totalAmount: 50000,
    expectedDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  });

  const handleCreatePO = (e) => {
    e.preventDefault();
    if (!formData.items) return;

    const newPO = {
      id: `PO-2026-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      vendorName: formData.vendorName,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: formData.expectedDate,
      items: formData.items,
      totalAmount: Number(formData.totalAmount),
      status: 'pending'
    };

    setPurchaseOrders(prev => [newPO, ...prev]);

    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Purchase Order Created',
        message: `${newPO.id} dispatched to ${newPO.vendorName}.`
      }
    });

    setIsModalOpen(false);
  };

  const handleMarkDelivered = (poId) => {
    setPurchaseOrders(prev => prev.map(po => po.id === poId ? { ...po, status: 'delivered' } : po));
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Order Received & Restocked',
        message: `Stock from ${poId} credited to hotel inventory.`
      }
    });
  };

  return (
    <div className="purchases-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Procurement & Purchase Orders</h1>
          <p className="page-subtitle">Manage supplier purchase orders, shipment tracking and inventory receiving</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/inventory')}>
            <Package size={16} /> Inventory Stock
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Create Purchase Order
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="responsive-kpi-grid-4">
        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {purchaseOrders.length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Total Purchase Orders</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {purchaseOrders.filter(p => p.status !== 'delivered').length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Open & In Transit</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {purchaseOrders.filter(p => p.status === 'delivered').length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Delivered & Restocked</div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurrencyDollar size={22} weight="duotone" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
              {formatCurrency(purchaseOrders.reduce((sum, p) => sum + p.totalAmount, 0))}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Procurement Spend</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Line Items Description</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th>Total Value</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map(po => (
                <tr key={po.id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)' }}>
                      {po.id}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>
                    {po.vendorName}
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)', maxWidth: 280 }}>
                    {po.items}
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                    {po.orderDate}
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                    {po.expectedDate}
                  </td>
                  <td style={{ fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                    {formatCurrency(po.totalAmount)}
                  </td>
                  <td>
                    <span className={`badge ${po.status === 'delivered' ? 'badge-success' : po.status === 'shipped' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                      {po.status?.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {po.status !== 'delivered' && (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleMarkDelivered(po.id)}
                      >
                        Receive Stock
                      </button>
                    )}
                    {po.status === 'delivered' && (
                      <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 'bold' }}>
                        ✓ Completed
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
            width: '100%', maxWidth: 500, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-neutral-50)'
            }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
                Create Purchase Order
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePO} style={{ padding: 'var(--space-5)' }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Select Supplier</label>
                <select
                  className="form-control"
                  value={formData.vendorName}
                  onChange={e => setFormData({ ...formData, vendorName: e.target.value })}
                >
                  <option value="Continental Linens Co.">Continental Linens Co.</option>
                  <option value="TechnoClean Supplies">TechnoClean Supplies</option>
                  <option value="Islamabad Fresh Farms">Islamabad Fresh Farms</option>
                </select>
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Items & Quantity Details</label>
                <textarea
                  className="form-control"
                  rows={2}
                  required
                  placeholder="e.g. 50x Bed Covers, 100x Bath Mats, 20x Mattress Protectors"
                  value={formData.items}
                  onChange={e => setFormData({ ...formData, items: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Estimated Value (PKR)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.totalAmount}
                    onChange={e => setFormData({ ...formData, totalAmount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Expected Delivery</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.expectedDate}
                    onChange={e => setFormData({ ...formData, expectedDate: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Dispatch Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
