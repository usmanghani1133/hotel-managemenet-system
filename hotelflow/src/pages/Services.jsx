import { useState } from 'react';
import {
  Bell, Plus, CheckCircle, Clock, CurrencyDollar,
  Car, Sparkle, TShirt, Flower, Coffee, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Services() {
  const { state, dispatch } = useApp();

  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'catalog'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Available service catalog
  const catalog = [
    { id: 'srv-1', name: 'Airport VIP Limousine Transfer', category: 'Transport', price: 6500, icon: Car, duration: '45 mins' },
    { id: 'srv-2', name: 'Express Laundry & Dry Cleaning', category: 'Housekeeping', price: 2500, icon: TShirt, duration: '3 hours' },
    { id: 'srv-3', name: 'Executive Spa & Swedish Massage', category: 'Wellness', price: 8000, icon: Sparkle, duration: '60 mins' },
    { id: 'srv-4', name: 'Romantic Room Setup & Rose Petals', category: 'Concierge', price: 5000, icon: Flower, duration: 'Immediate' },
    { id: 'srv-5', name: 'Extra Rollaway Bed with Linens', category: 'Room', price: 3000, icon: Coffee, duration: '30 mins' },
    { id: 'srv-6', name: 'Late Check-out Privilege (till 4 PM)', category: 'Front Desk', price: 4000, icon: Clock, duration: 'Stay extension' },
  ];

  // Active service requests state
  const [requests, setRequests] = useState([
    { id: 'SR-101', roomId: 'rm-101', guestName: 'Mr. Tariq Mehmood', serviceName: 'Airport VIP Limousine Transfer', price: 6500, status: 'in-progress', scheduledTime: 'Today 04:30 PM', assignedTo: 'Bilal Hussain' },
    { id: 'SR-102', roomId: 'rm-201', guestName: 'Ms. Ayesha Khan', serviceName: 'Express Laundry & Dry Cleaning', price: 2500, status: 'delivered', scheduledTime: 'Today 11:00 AM', assignedTo: 'Rukhsana Bibi' },
    { id: 'SR-103', roomId: 'rm-401', guestName: 'Dr. Farooq Sattar', serviceName: 'Late Check-out Privilege (till 4 PM)', price: 4000, status: 'requested', scheduledTime: 'Tomorrow 02:00 PM', assignedTo: 'Nadia Ansari' },
    { id: 'SR-104', roomId: 'rm-302', guestName: 'Mr. Salman Butt', serviceName: 'Executive Spa & Swedish Massage', price: 8000, status: 'requested', scheduledTime: 'Today 07:00 PM', assignedTo: 'Unassigned' },
  ]);

  const [formData, setFormData] = useState({
    roomId: state.rooms[0]?.id || '',
    serviceId: 'srv-1',
    scheduledTime: 'Today 06:00 PM',
    notes: ''
  });

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const service = catalog.find(s => s.id === formData.serviceId);
    const room = state.rooms.find(r => r.id === formData.roomId);

    const newReq = {
      id: `SR-${Math.floor(100 + Math.random() * 900)}`,
      roomId: formData.roomId,
      guestName: `Room ${room?.number} Guest`,
      serviceName: service?.name || 'Hotel Service',
      price: service?.price || 3000,
      status: 'requested',
      scheduledTime: formData.scheduledTime,
      assignedTo: 'Front Desk'
    };

    setRequests(prev => [newReq, ...prev]);

    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Service Request Created',
        message: `${newReq.serviceName} dispatched for Room ${room?.number}.`
      }
    });

    setIsModalOpen(false);
  };

  const handleUpdateStatus = (reqId, nextStatus) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: nextStatus } : r));
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'info',
        title: 'Status Updated',
        message: `Service order is now ${nextStatus}.`
      }
    });
  };

  return (
    <div className="services-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Guest Services & Concierge</h1>
          <p className="page-subtitle">Manage guest requests, airport transfers, spa bookings and incidental services</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', padding: 2 }}>
            <button
              onClick={() => setActiveTab('requests')}
              className={`btn btn-sm ${activeTab === 'requests' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Active Requests ({requests.length})
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`btn btn-sm ${activeTab === 'catalog' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Service Catalog
            </button>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Request Service
          </button>
        </div>
      </div>

      {activeTab === 'requests' ? (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Room & Guest</th>
                  <th>Service Requested</th>
                  <th>Charge (PKR)</th>
                  <th>Scheduled Time</th>
                  <th>Assigned Staff</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => {
                  const room = state.rooms.find(r => r.id === req.roomId);

                  return (
                    <tr key={req.id}>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)' }}>
                          {req.id}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--color-neutral-900)' }}>
                          Room {room?.number || req.roomId}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)' }}>
                          {req.guestName}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '500', color: 'var(--color-neutral-800)' }}>
                          {req.serviceName}
                        </div>
                      </td>
                      <td style={{ fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                        {formatCurrency(req.price)}
                      </td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                        {req.scheduledTime}
                      </td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>
                        {req.assignedTo}
                      </td>
                      <td>
                        <span className={`badge ${req.status === 'delivered' ? 'badge-success' : req.status === 'in-progress' ? 'badge-warning' : 'badge-info'}`} style={{ fontSize: '10px' }}>
                          {req.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {req.status === 'requested' && (
                          <button className="btn btn-xs btn-secondary" onClick={() => handleUpdateStatus(req.id, 'in-progress')}>
                            Dispatch
                          </button>
                        )}
                        {req.status === 'in-progress' && (
                          <button className="btn btn-xs btn-success" onClick={() => handleUpdateStatus(req.id, 'delivered')}>
                            Complete & Bill
                          </button>
                        )}
                        {req.status === 'delivered' && (
                          <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 'bold' }}>
                            ✓ Billed to Room
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {catalog.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} weight="duotone" />
                    </div>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>{item.category}</span>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'bold', margin: '0 0 6px', color: 'var(--color-neutral-900)' }}>
                    {item.name}
                  </h3>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                    Turnaround: {item.duration}
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-primary-700)' }}>
                    {formatCurrency(item.price)}
                  </div>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, serviceId: item.id }));
                      setIsModalOpen(true);
                    }}
                  >
                    Order Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Service Modal */}
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
                Dispatch Guest Service
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} style={{ padding: 'var(--space-5)' }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Room #</label>
                <select
                  className="form-control"
                  value={formData.roomId}
                  onChange={e => setFormData({ ...formData, roomId: e.target.value })}
                >
                  {state.rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      Room {r.number} (Floor {r.floor} • {r.status})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Select Service</label>
                <select
                  className="form-control"
                  value={formData.serviceId}
                  onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                >
                  {catalog.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {formatCurrency(c.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Execution Time / Schedule</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.scheduledTime}
                  onChange={e => setFormData({ ...formData, scheduledTime: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm & Dispatch Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
