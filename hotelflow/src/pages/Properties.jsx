import { useState } from 'react';
import {
  Buildings, Plus, CheckCircle, MapPin, Phone,
  Envelope, Bed, Star, ArrowRight, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function Properties() {
  const { state, dispatch } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    type: 'Business Hotel',
    address: '',
    phone: '',
    email: '',
    totalRooms: 30,
    floors: 4,
    starRating: 5
  });

  const handleSwitchProperty = (propId) => {
    dispatch({ type: 'SET_PROPERTY', payload: propId });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'info',
        title: 'Active Property Switched',
        message: `Now viewing operations for ${state.properties.find(p => p.id === propId)?.name}.`
      }
    });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newProp = {
      id: `prop-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      shortName: formData.shortName || formData.name.split(' ')[0],
      type: formData.type,
      address: formData.address,
      phone: formData.phone || '+92-51-0000000',
      email: formData.email || 'info@hotel.pk',
      totalRooms: Number(formData.totalRooms),
      floors: Number(formData.floors),
      starRating: Number(formData.starRating),
      checkInTime: '14:00',
      checkOutTime: '12:00',
      currency: 'PKR',
      timezone: 'Asia/Karachi',
      active: true
    };

    // Add to state
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Property Registered',
        message: `${newProp.name} has been added to enterprise portfolio.`
      }
    });

    setIsModalOpen(false);
  };

  return (
    <div className="properties-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Multi-Property Management</h1>
          <p className="page-subtitle">Centralized chain operations, multi-branch hotel portfolio and property switcher</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Property Branch
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 'var(--space-6)' }}>
        {state.properties.map(property => {
          const isCurrent = state.currentPropertyId === property.id;
          const matchingRooms = state.rooms.filter(r => r.propertyId === property.id);
          const occupiedCount = matchingRooms.filter(r => r.status === 'occupied').length;

          return (
            <div
              key={property.id}
              className="card"
              style={{
                border: isCurrent ? '2px solid var(--color-primary-600)' : '1px solid var(--color-neutral-200)',
                boxShadow: isCurrent ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Card Banner */}
              <div style={{
                background: isCurrent ? 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700))' : 'var(--color-neutral-800)',
                padding: 'var(--space-5)',
                color: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-gold" style={{ fontSize: '10px' }}>
                    ★ {property.starRating} Star {property.type}
                  </span>
                  {isCurrent && (
                    <span className="badge badge-success" style={{ fontSize: '10px', background: '#10B981', color: 'white' }}>
                      ✓ Active Property
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', margin: '8px 0 4px', color: 'white' }}>
                  {property.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: '#CBD5E1' }}>
                  <MapPin size={14} /> {property.address}
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Total Capacity</div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                        {property.totalRooms} Rooms
                      </div>
                    </div>
                    <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Floors</div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                        {property.floors} Levels
                      </div>
                    </div>
                    <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Occupancy</div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-primary-600)' }}>
                        {Math.round((occupiedCount / (matchingRooms.length || 1)) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div><strong>Phone:</strong> {property.phone}</div>
                    <div><strong>Email:</strong> {property.email}</div>
                    <div><strong>Operating Hours:</strong> Check-in {property.checkInTime} • Check-out {property.checkOutTime}</div>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'flex-end' }}>
                  {isCurrent ? (
                    <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.7 }}>
                      Currently Selected
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSwitchProperty(property.id)}
                    >
                      Switch to this Hotel <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Property Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 'var(--space-4)'
        }}>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-2xl)',
            width: '100%', maxWidth: 520, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-neutral-50)'
            }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
                Add Hotel Branch
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProperty} style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Property Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. PC Bhurban Resort"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Type</label>
                  <select
                    className="form-control"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Business Hotel">Business</option>
                    <option value="Luxury Resort">Resort</option>
                    <option value="Boutique Hotel">Boutique</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Address & City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Murree Hills, Bhurban, Pakistan"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Rooms</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.totalRooms}
                    onChange={e => setFormData({ ...formData, totalRooms: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Floors</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.floors}
                    onChange={e => setFormData({ ...formData, floors: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Rating</label>
                  <select
                    className="form-control"
                    value={formData.starRating}
                    onChange={e => setFormData({ ...formData, starRating: e.target.value })}
                  >
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
