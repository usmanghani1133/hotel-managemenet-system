import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bed, Plus, Users, CurrencyDollar, Sparkle,
  CheckCircle, Buildings, Ruler, WifiHigh, Television,
  Pencil, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function RoomTypes() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    basePrice: 15000,
    weekendPrice: 18000,
    bedType: 'King',
    sizeSqft: 400,
    maxAdults: 2,
    maxChildren: 1,
    amenities: 'AC, WiFi, Smart TV, Minibar, Safe, Iron'
  });

  const handleAddType = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    const newType = {
      id: `rt-${Date.now()}`,
      propertyId: state.currentPropertyId,
      name: formData.name,
      code: formData.code.toUpperCase(),
      description: formData.description,
      basePrice: Number(formData.basePrice),
      weekendPrice: Number(formData.weekendPrice),
      bedType: formData.bedType,
      sizeSqft: Number(formData.sizeSqft),
      maxAdults: Number(formData.maxAdults),
      maxChildren: Number(formData.maxChildren),
      maxOccupancy: Number(formData.maxAdults) + Number(formData.maxChildren),
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
      roomCount: 4,
      active: true
    };

    dispatch({ type: 'ADD_ROOM_TYPE', payload: newType });
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Room Type Created',
        message: `${newType.name} category has been added to property catalog.`
      }
    });

    setIsModalOpen(false);
  };

  return (
    <div className="room-types-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Room Categories & Pricing</h1>
          <p className="page-subtitle">Configure room configurations, standard nightly rates, capacities and amenity packages</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/rooms')}>
            <Buildings size={16} /> All Rooms Grid
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Create Room Type
          </button>
        </div>
      </div>

      {/* Grid of Room Types */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
        {state.roomTypes.map(rt => {
          const matchingRooms = state.rooms.filter(r => r.typeId === rt.id);
          const occupiedCount = matchingRooms.filter(r => r.status === 'occupied').length;
          const availableCount = matchingRooms.filter(r => r.status === 'available').length;

          return (
            <div
              key={rt.id}
              className="card"
              style={{
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Card Banner */}
              <div style={{
                background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-800))',
                padding: 'var(--space-5)',
                color: 'white',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'monospace', fontWeight: 'bold', fontSize: '11px',
                    background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.05em'
                  }}>
                    {rt.code}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>
                    Active Category
                  </span>
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', margin: '8px 0 4px', color: 'white' }}>
                  {rt.name}
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: '#CBD5E1', margin: 0, lineHeight: 1.4 }}>
                  {rt.description}
                </p>
              </div>

              {/* Pricing & Key Metrics */}
              <div style={{ padding: 'var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)', background: 'var(--color-neutral-50)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Base Nightly Rate</span>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-primary-700)' }}>
                      {formatCurrency(rt.basePrice)}
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'normal', color: 'var(--color-neutral-500)' }}> / night</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Weekend Rate</span>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-neutral-800)' }}>
                      {formatCurrency(rt.weekendPrice || rt.basePrice * 1.2)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                  <div style={{ background: 'white', padding: '6px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ color: 'var(--color-neutral-400)', fontSize: '10px' }}>Bed Type</div>
                    <strong>{rt.bedType} Bed</strong>
                  </div>
                  <div style={{ background: 'white', padding: '6px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ color: 'var(--color-neutral-400)', fontSize: '10px' }}>Room Size</div>
                    <strong>{rt.sizeSqft} sq.ft</strong>
                  </div>
                  <div style={{ background: 'white', padding: '6px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ color: 'var(--color-neutral-400)', fontSize: '10px' }}>Capacity</div>
                    <strong>{rt.maxAdults}A + {rt.maxChildren}C</strong>
                  </div>
                </div>
              </div>

              {/* Amenities & Inventory Count */}
              <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>
                    Included Amenities ({rt.amenities?.length || 0})
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {rt.amenities?.map((amenity, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px', background: 'var(--color-neutral-100)',
                          color: 'var(--color-neutral-700)', padding: '2px 8px',
                          borderRadius: 'var(--radius-full)', border: '1px solid var(--color-neutral-200)'
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 'var(--text-xs)' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>{matchingRooms.length} Rooms</span>
                    <span style={{ color: 'var(--color-neutral-500)', marginLeft: 6 }}>({availableCount} Avail • {occupiedCount} Occ)</span>
                  </div>
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() => navigate(`/app/rooms?type=${rt.id}`)}
                  >
                    View Rooms
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Room Type Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 'var(--space-4)'
        }}>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-2xl)',
            width: '100%', maxWidth: 540, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-neutral-50)'
            }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
                New Room Category
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-400)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddType} style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="e.g. Royal Penthouse Suite"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Code (3-4 chars)</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    maxLength={4}
                    placeholder="RPS"
                    value={formData.code}
                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Summary of view, furnishings and special benefits..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Base Nightly Rate (PKR)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.basePrice}
                    onChange={e => setFormData({ ...formData, basePrice: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Weekend Rate (PKR)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.weekendPrice}
                    onChange={e => setFormData({ ...formData, weekendPrice: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Bed Type</label>
                  <select
                    className="form-control"
                    value={formData.bedType}
                    onChange={e => setFormData({ ...formData, bedType: e.target.value })}
                  >
                    <option value="King">King Bed</option>
                    <option value="Queen">Queen Bed</option>
                    <option value="Twin">Twin Beds</option>
                    <option value="Double">Double Bed</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Size (sq.ft)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.sizeSqft}
                    onChange={e => setFormData({ ...formData, sizeSqft: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Max Adults</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.maxAdults}
                    onChange={e => setFormData({ ...formData, maxAdults: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Amenities (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.amenities}
                  onChange={e => setFormData({ ...formData, amenities: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Room Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
