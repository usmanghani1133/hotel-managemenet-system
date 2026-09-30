import { useState } from 'react';
import { Warning, Package, Plus, MagnifyingGlass, ArrowUp, ArrowDown } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';
import { Modal, EmptyState } from '../components/Layout';

export default function Inventory() {
  const { state, dispatch, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(null);
  const [adjustQty, setAdjustQty] = useState(0);
  const [adjustType, setAdjustType] = useState('add');
  const [newItem, setNewItem] = useState({ name: '', categoryId: '', sku: '', unit: 'Piece', currentStock: 0, minimumStock: 0, unitCost: 0 });

  const lowStockItems = state.inventoryItems.filter(i => i.currentStock <= i.minimumStock);

  const filtered = state.inventoryItems.filter(item => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || item.categoryId === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleAdjust = () => {
    const item = state.inventoryItems.find(i => i.id === showAdjustModal);
    const qty = Number(adjustQty);
    const newStock = adjustType === 'add' ? item.currentStock + qty : Math.max(0, item.currentStock - qty);
    dispatch({ type: 'UPDATE_INVENTORY_ITEM', payload: { id: showAdjustModal, currentStock: newStock } });
    showToast('success', 'Stock Updated', `${item.name} stock updated to ${newStock} ${item.unit}(s).`);
    setShowAdjustModal(null);
    setAdjustQty(0);
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.categoryId) { showToast('error', 'Error', 'Name and category required.'); return; }
    dispatch({ type: 'UPDATE_INVENTORY_ITEM', payload: { id: `inv-${Date.now()}`, ...newItem } });
    showToast('success', 'Item Added', 'Inventory item created successfully.');
    setShowAddModal(false);
    setNewItem({ name: '', categoryId: '', sku: '', unit: 'Piece', currentStock: 0, minimumStock: 0, unitCost: 0 });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Inventory</h1>
          <p className="page-subtitle">{state.inventoryItems.length} items · {lowStockItems.length} low stock alerts</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={15} /> Add Item
          </button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div style={{ background: 'var(--color-warning-light)', border: '1px solid #FDE68A', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)', marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <Warning size={20} color="var(--color-warning-dark)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-warning-dark)', marginBottom: 4 }}>Low Stock Alert — {lowStockItems.length} items need restocking</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warning-dark)', opacity: 0.8 }}>
              {lowStockItems.map(i => `${i.name} (${i.currentStock} ${i.unit}s remaining)`).join(' · ')}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-input-wrapper" style={{ flex: 1, maxWidth: 300 }}>
          <MagnifyingGlass size={15} className="search-icon" />
          <input type="text" className="form-input" placeholder="Search items or SKU..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 'var(--space-8)' }} />
        </div>
        <select className="form-select" style={{ width: 'auto' }} value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {state.inventoryCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Item</th><th>SKU</th><th>Category</th><th>Unit</th><th>In Stock</th><th>Min Stock</th><th>Unit Cost</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const cat = state.inventoryCategories.find(c => c.id === item.categoryId);
                const isLow = item.currentStock <= item.minimumStock;
                const stockPercent = Math.min(100, (item.currentStock / (item.minimumStock * 2 || 1)) * 100);
                return (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)' }}>{item.name}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{item.sku}</td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{cat?.name}</td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>{item.unit}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span style={{ fontWeight: 'var(--font-bold)', color: isLow ? 'var(--color-error)' : 'var(--color-neutral-900)' }}>{item.currentStock}</span>
                        <div style={{ width: 60, height: 4, background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${stockPercent}%`, background: isLow ? 'var(--color-error)' : 'var(--color-success)', borderRadius: 'var(--radius-full)' }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>{item.minimumStock}</td>
                    <td style={{ fontWeight: 'var(--font-medium)' }}>{formatCurrency(item.unitCost)}</td>
                    <td>
                      {isLow ? (
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-error)', background: 'var(--color-error-light)', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>Low Stock</span>
                      ) : (
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-success)', background: 'var(--color-success-light)', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>OK</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button className="btn btn-xs btn-ghost" title="Add Stock" onClick={() => { setShowAdjustModal(item.id); setAdjustType('add'); setAdjustQty(0); }}><ArrowUp size={13} /></button>
                        <button className="btn btn-xs btn-ghost" title="Use Stock" onClick={() => { setShowAdjustModal(item.id); setAdjustType('remove'); setAdjustQty(0); }}><ArrowDown size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!filtered.length && <EmptyState icon={Package} title="No items found" />}
        </div>
      </div>

      {/* Adjust Modal */}
      {showAdjustModal && (() => {
        const item = state.inventoryItems.find(i => i.id === showAdjustModal);
        return (
          <Modal isOpen={true} onClose={() => setShowAdjustModal(null)} title={`Adjust Stock — ${item?.name}`} size="sm"
            footer={
              <>
                <button className="btn btn-secondary btn-md" onClick={() => setShowAdjustModal(null)}>Cancel</button>
                <button className="btn btn-primary btn-md" onClick={handleAdjust}>Update Stock</button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
                Current stock: <strong>{item?.currentStock} {item?.unit}(s)</strong>
              </div>
              <div className="form-group">
                <label className="form-label">Adjustment Type</label>
                <select className="form-select" value={adjustType} onChange={e => setAdjustType(e.target.value)}>
                  <option value="add">Add Stock (Restock)</option>
                  <option value="remove">Remove Stock (Used / Expired)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Quantity ({item?.unit}s)</label>
                <input type="number" className="form-input" min={1} value={adjustQty} onChange={e => setAdjustQty(Number(e.target.value))} />
              </div>
            </div>
          </Modal>
        );
      })()}

      {/* Add Item Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Inventory Item" size="md"
        footer={
          <>
            <button className="btn btn-secondary btn-md" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-md" onClick={handleAddItem}>Add Item</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="form-grid form-grid-2">
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label required">Item Name</label>
              <input className="form-input" placeholder="e.g. Bath Towel Large" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label required">Category</label>
              <select className="form-select" value={newItem.categoryId} onChange={e => setNewItem(p => ({ ...p, categoryId: e.target.value }))}>
                <option value="">Select category...</option>
                {state.inventoryCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">SKU</label>
              <input className="form-input" placeholder="LIN-BT-002" value={newItem.sku} onChange={e => setNewItem(p => ({ ...p, sku: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Unit</label>
              <select className="form-select" value={newItem.unit} onChange={e => setNewItem(p => ({ ...p, unit: e.target.value }))}>
                {['Piece', 'Bottle', 'Box', 'Litre', 'Kg', 'Set', 'Roll', 'Pack'].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Initial Stock</label>
              <input type="number" className="form-input" min={0} value={newItem.currentStock} onChange={e => setNewItem(p => ({ ...p, currentStock: Number(e.target.value) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Minimum Stock</label>
              <input type="number" className="form-input" min={0} value={newItem.minimumStock} onChange={e => setNewItem(p => ({ ...p, minimumStock: Number(e.target.value) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Unit Cost (PKR)</label>
              <input type="number" className="form-input" min={0} value={newItem.unitCost} onChange={e => setNewItem(p => ({ ...p, unitCost: Number(e.target.value) }))} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
