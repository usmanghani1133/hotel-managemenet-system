// Restaurant POS page - Full implementation
import { useState } from 'react';
import { ForkKnife, Plus, Minus, X, CheckCircle, Table, Package, Printer } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Restaurant() {
  const { state, dispatch, showToast } = useApp();
  const [activeTable, setActiveTable] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [chargeToRoom, setChargeToRoom] = useState(false);
  const [chargeRoomId, setChargeRoomId] = useState('');

  const filteredItems = state.menuItems.filter(item =>
    selectedCategory === 'all' || item.categoryId === selectedCategory
  );

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === item.id);
      if (existing) return prev.map(c => c.menuItemId === item.id ? { ...c, qty: c.qty + 1, amount: (c.qty + 1) * c.price } : c);
      return [...prev, { menuItemId: item.id, name: item.name, qty: 1, price: item.price, amount: item.price }];
    });
  };

  const removeFromCart = (menuItemId) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === menuItemId);
      if (existing.qty === 1) return prev.filter(c => c.menuItemId !== menuItemId);
      return prev.map(c => c.menuItemId === menuItemId ? { ...c, qty: c.qty - 1, amount: (c.qty - 1) * c.price } : c);
    });
  };

  const subtotal = cart.reduce((s, c) => s + c.amount, 0);
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    if (!cart.length) { showToast('error', 'Error', 'Add items to the cart first.'); return; }
    const orderId = `RO-${Date.now()}`;
    dispatch({
      type: 'ADD_RESTAURANT_ORDER',
      payload: { id: orderId, tableId: activeTable, guestId: null, roomId: chargeRoomId || null, chargeToRoom, status: 'preparing', items: cart, subtotal, tax, total, createdAt: new Date().toISOString(), completedAt: null }
    });
    if (activeTable) {
      dispatch({ type: 'UPDATE_TABLE', payload: { id: activeTable, status: 'occupied' } });
    }
    showToast('success', 'Order Placed!', `Order ${orderId} sent to kitchen.`);
    setCart([]);
    setActiveTable(null);
  };

  const occupiedTables = state.restaurantTables.filter(t => t.status === 'occupied').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-5)', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
      {/* Left: Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h1 className="page-title">Restaurant / POS</h1>
            <p className="page-subtitle">{occupiedTables} tables occupied · {state.restaurantOrders.filter(o => o.status === 'preparing').length} orders preparing</p>
          </div>
        </div>

        {/* Table Selection */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', flexShrink: 0 }}>
          <button className={`btn btn-xs ${!activeTable ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTable(null)}>
            Walk-in / Counter
          </button>
          {state.restaurantTables.map(table => (
            <button key={table.id}
              className={`btn btn-xs ${activeTable === table.id ? 'btn-primary' : ''}`}
              style={activeTable === table.id ? {} : {
                background: table.status === 'occupied' ? 'var(--color-warning-light)' : table.status === 'reserved' ? 'var(--color-primary-50)' : 'var(--color-neutral-100)',
                color: table.status === 'occupied' ? 'var(--color-warning-dark)' : table.status === 'reserved' ? 'var(--color-primary-700)' : 'var(--color-neutral-600)',
                border: 'none'
              }}
              onClick={() => setActiveTable(table.id)}
            >
              {table.number} ({table.capacity}) {table.status === 'occupied' ? '●' : table.status === 'reserved' ? '○' : '◇'}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', flexShrink: 0 }}>
          <button
            className="btn btn-xs"
            style={{ background: selectedCategory === 'all' ? 'var(--color-neutral-800)' : 'var(--color-neutral-100)', color: selectedCategory === 'all' ? 'white' : 'var(--color-neutral-600)', border: 'none' }}
            onClick={() => setSelectedCategory('all')}
          >
            All Items
          </button>
          {state.menuCategories.map(cat => (
            <button key={cat.id}
              className="btn btn-xs"
              style={{
                background: selectedCategory === cat.id ? 'var(--color-primary-600)' : 'var(--color-neutral-100)',
                color: selectedCategory === cat.id ? 'white' : 'var(--color-neutral-600)', border: 'none'
              }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-3)', overflow: 'auto', paddingBottom: 'var(--space-4)' }}>
          {filteredItems.map(item => {
            const inCart = cart.find(c => c.menuItemId === item.id);
            return (
              <div key={item.id}
                style={{
                  background: 'white', border: `2px solid ${inCart ? 'var(--color-primary-400)' : 'var(--color-neutral-200)'}`,
                  borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)', cursor: 'pointer',
                  transition: 'all 0.15s', boxShadow: inCart ? 'var(--shadow-sm)' : 'none'
                }}
                onClick={() => addToCart(item)}
                onMouseEnter={e => !inCart && (e.currentTarget.style.borderColor = 'var(--color-primary-200)')}
                onMouseLeave={e => !inCart && (e.currentTarget.style.borderColor = 'var(--color-neutral-200)')}
              >
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-800)', marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-neutral-400)', marginBottom: 'var(--space-3)', lineHeight: 1.3 }}>{item.description}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-primary-600)' }}>{formatCurrency(item.price)}</span>
                  {inCart && (
                    <div style={{
                      background: 'var(--color-primary-600)', color: 'white',
                      borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 'bold',
                      width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {inCart.qty}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Order Cart */}
      <div style={{ background: 'white', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ padding: 'var(--space-5)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
            {activeTable ? `Table ${state.restaurantTables.find(t => t.id === activeTable)?.number}` : 'Counter / Walk-in'}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginTop: 2 }}>{cart.length} items in cart</div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-4)' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-neutral-400)' }}>
              <ForkKnife size={28} style={{ marginBottom: 8, opacity: 0.3 }} />
              <div style={{ fontSize: 'var(--text-sm)' }}>Tap menu items to add them</div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.menuItemId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-neutral-100)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--color-neutral-800)' }}>{item.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{formatCurrency(item.price)} each</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <button className="btn btn-xs btn-ghost" onClick={() => removeFromCart(item.menuItemId)} style={{ width: 24, height: 24, padding: 0 }}><Minus size={12} /></button>
                  <span style={{ fontWeight: 'var(--font-bold)', minWidth: 20, textAlign: 'center', fontSize: 'var(--text-sm)' }}>{item.qty}</span>
                  <button className="btn btn-xs btn-ghost" onClick={() => addToCart({ id: item.menuItemId, name: item.name, price: item.price })} style={{ width: 24, height: 24, padding: 0 }}><Plus size={12} /></button>
                </div>
                <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', minWidth: 70, textAlign: 'right', color: 'var(--color-neutral-800)' }}>{formatCurrency(item.amount)}</div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div style={{ padding: 'var(--space-5)', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
              <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
              <span>Tax (15%)</span><span>{formatCurrency(tax)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-color)' }}>
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Charge to Room */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', cursor: 'pointer', marginBottom: 'var(--space-2)' }}>
              <input type="checkbox" checked={chargeToRoom} onChange={e => setChargeToRoom(e.target.checked)} />
              Charge to Room
            </label>
            {chargeToRoom && (
              <select className="form-select form-select-sm" value={chargeRoomId} onChange={e => setChargeRoomId(e.target.value)}>
                <option value="">Select room...</option>
                {state.rooms.filter(r => r.status === 'occupied').map(r => <option key={r.id} value={r.id}>Room {r.number}</option>)}
              </select>
            )}
          </div>

          <button className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }} onClick={handlePlaceOrder} disabled={!cart.length}>
            <CheckCircle size={16} />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
