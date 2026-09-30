import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Bed, User, CalendarBlank, Wrench, Broom,
  CheckCircle, Warning, Clock, ShieldCheck, Door, Key,
  CurrencyDollar, Eye, Plus
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';

export default function RoomDetail() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  // Find room or fallback to first room
  const room = state.rooms.find(r => r.id === id) || state.rooms[0];
  const roomType = state.roomTypes.find(rt => rt.id === room?.typeId);

  // Active reservation for this room
  const currentReservation = state.reservations.find(
    r => r.roomId === room?.id && r.status === 'checked-in'
  );
  const activeGuest = currentReservation
    ? state.guests.find(g => g.id === currentReservation.guestId)
    : null;

  // Upcoming reservations for this room
  const upcomingReservations = state.reservations.filter(
    r => r.roomId === room?.id && r.status !== 'cancelled' && r.status !== 'checked-out' && r.id !== currentReservation?.id
  );

  // Housekeeping tasks for this room
  const roomHkTasks = state.housekeepingTasks.filter(t => t.roomId === room?.id);

  // Maintenance tickets for this room
  const roomMaintTickets = state.maintenanceTickets.filter(t => t.roomId === room?.id);

  const handleUpdateStatus = (newStatus, newHkStatus) => {
    dispatch({
      type: 'UPDATE_ROOM',
      payload: {
        id: room.id,
        status: newStatus,
        housekeepingStatus: newHkStatus || room.housekeepingStatus
      }
    });

    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Room Status Updated',
        message: `Room ${room.number} is now marked ${newStatus}.`
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available': return <span className="badge badge-success">Available</span>;
      case 'occupied': return <span className="badge badge-info">Occupied</span>;
      case 'reserved': return <span className="badge badge-warning">Reserved</span>;
      case 'dirty': return <span className="badge badge-error">Dirty</span>;
      case 'cleaning': return <span className="badge badge-purple">Cleaning</span>;
      case 'maintenance': return <span className="badge badge-orange">Maintenance</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  if (!room) {
    return (
      <div className="page-container" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <h2>Room not found</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/app/rooms')}>
          Back to Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="room-detail-page" style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/rooms')}>
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <h1 className="page-title" style={{ margin: 0 }}>Room {room.number}</h1>
              {getStatusBadge(room.status)}
              <span className="badge" style={{ background: 'var(--color-neutral-200)', color: 'var(--color-neutral-700)' }}>
                Floor {room.floor}
              </span>
            </div>
            <p className="page-subtitle" style={{ margin: '4px 0 0' }}>
              {roomType?.name} • Keycard System Linked
            </p>
          </div>
        </div>

        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {room.status === 'dirty' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleUpdateStatus('available', 'clean')}
            >
              <CheckCircle size={15} /> Mark Clean & Ready
            </button>
          )}
          {room.status === 'available' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/app/reservations/new?roomId=${room.id}`)}
            >
              <Plus size={15} /> Book This Room
            </button>
          )}
          {room.status === 'occupied' && (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => navigate(`/app/check-out?resId=${currentReservation?.id}`)}
            >
              <Door size={15} /> Check Out Guest
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="responsive-details-layout">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Active In-House Guest Card */}
          <div className="card">
            <div className="card-header" style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)' }}>
              <div className="card-title" style={{ fontSize: 'var(--text-base)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <User size={18} color="var(--color-primary-600)" />
                Current In-House Guest
              </div>
            </div>
            <div className="card-body" style={{ padding: 'var(--space-5)' }}>
              {currentReservation && activeGuest ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'var(--color-primary-600)', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', fontSize: 'var(--text-sm)'
                      }}>
                        {activeGuest.firstName[0]}{activeGuest.lastName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                          {activeGuest.title} {activeGuest.firstName} {activeGuest.lastName}
                          {activeGuest.vip && <span className="badge badge-gold" style={{ marginLeft: 6, fontSize: '10px' }}>VIP</span>}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                          {activeGuest.phone} • {activeGuest.email}
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-secondary btn-xs"
                      onClick={() => navigate(`/app/reservations/${currentReservation.id}`)}
                    >
                      <Eye size={12} /> View Folio
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--color-neutral-400)', textTransform: 'uppercase' }}>Check In</div>
                      <div style={{ fontWeight: '600', fontSize: 'var(--text-xs)' }}>{formatDate(currentReservation.checkIn)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--color-neutral-400)', textTransform: 'uppercase' }}>Check Out</div>
                      <div style={{ fontWeight: '600', fontSize: 'var(--text-xs)' }}>{formatDate(currentReservation.checkOut)} ({currentReservation.nights}N)</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--color-neutral-400)', textTransform: 'uppercase' }}>Balance Due</div>
                      <div style={{ fontWeight: 'bold', fontSize: 'var(--text-xs)', color: currentReservation.balance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success)' }}>
                        {formatCurrency(currentReservation.balance || 0)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--color-neutral-400)' }}>
                  <Door size={36} color="var(--color-neutral-300)" style={{ marginBottom: 6 }} />
                  <div>No guest currently checked into this room.</div>
                  {room.status === 'available' && (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ marginTop: 'var(--space-3)' }}
                      onClick={() => navigate(`/app/reservations/new?roomId=${room.id}`)}
                    >
                      Assign New Guest
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Specifications & Amenities */}
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
              Room Specifications & Amenities
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-500)' }}>Base Rate</span>
                <div style={{ fontWeight: 'bold', fontSize: 'var(--text-lg)', color: 'var(--color-primary-700)' }}>
                  {formatCurrency(room.baseRate || roomType?.basePrice || 8500)}
                </div>
              </div>

              <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-500)' }}>Bed Configuration</span>
                <div style={{ fontWeight: 'bold', fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                  {roomType?.bedType || 'King'} Bed
                </div>
              </div>

              <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-500)' }}>Square Footage</span>
                <div style={{ fontWeight: 'bold', fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                  {roomType?.sizeSqft || 350} sq.ft
                </div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>
                Included Amenities
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {roomType?.amenities?.map((a, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px', background: 'var(--color-neutral-100)',
                      color: 'var(--color-neutral-700)', padding: '3px 10px',
                      borderRadius: 'var(--radius-full)', border: '1px solid var(--color-neutral-200)'
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Upcoming Reservations */}
          <div className="card">
            <div className="card-header" style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)' }}>
              <div className="card-title" style={{ fontSize: 'var(--text-base)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarBlank size={18} color="var(--color-primary-600)" />
                Upcoming Bookings ({upcomingReservations.length})
              </div>
            </div>
            <div className="card-body" style={{ padding: 'var(--space-4)' }}>
              {upcomingReservations.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {upcomingReservations.map(res => {
                    const g = state.guests.find(gst => gst.id === res.guestId);
                    return (
                      <div
                        key={res.id}
                        style={{
                          padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--color-neutral-200)', background: 'var(--color-neutral-50)',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)' }}>
                            {g ? `${g.title} ${g.firstName} ${g.lastName}` : 'Guest'}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 2 }}>
                            {formatDate(res.checkIn)} → {formatDate(res.checkOut)} ({res.nights}N)
                          </div>
                        </div>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => navigate(`/app/reservations/${res.id}`)}
                        >
                          <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--color-neutral-400)', fontSize: 'var(--text-xs)' }}>
                  No future bookings scheduled for this room.
                </div>
              )}
            </div>
          </div>

          {/* Housekeeping & Maintenance History */}
          <div className="card">
            <div className="card-header" style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)' }}>
              <div className="card-title" style={{ fontSize: 'var(--text-base)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Broom size={18} color="#7C3AED" />
                Housekeeping & Maintenance
              </div>
            </div>
            <div className="card-body" style={{ padding: 'var(--space-4)' }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>Housekeeping Status:</span>
                  <span className={`badge ${room.housekeepingStatus === 'clean' ? 'badge-success' : 'badge-error'}`} style={{ fontSize: '10px' }}>
                    {room.housekeepingStatus?.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>Active Cleaning Tasks:</span>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold' }}>{roomHkTasks.length}</span>
                </div>
              </div>

              {roomMaintTickets.length > 0 && (
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>
                    Maintenance Tickets
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 6 }}>
                    {roomMaintTickets.map(t => (
                      <div key={t.id} style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '6px 10px', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}>
                        <div style={{ fontWeight: 'bold', color: '#B45309' }}>{t.title}</div>
                        <div style={{ color: '#92400E', fontSize: '10px' }}>{t.status} • Priority: {t.priority}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
