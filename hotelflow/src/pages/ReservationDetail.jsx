import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, Pencil, Printer, CreditCard, Door, Phone,
  Envelope, MapPin, Calendar, Bed, Receipt, CheckCircle,
  Warning, Star, Clock, FileText
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, formatDateTime } from '../data/demoData';
import { Modal, ConfirmDialog } from '../components/Layout';

export default function ReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, showToast } = useApp();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  const res = state.reservations.find(r => r.id === id);
  const guest = res ? state.guests.find(g => g.id === res.guestId) : null;
  const room = res ? state.rooms.find(r => r.id === res.roomId) : null;
  const roomType = res ? state.roomTypes.find(rt => rt.id === res.roomTypeId) : null;
  const invoice = state.invoices.find(inv => inv.reservationId === id);

  const availableRooms = state.rooms.filter(r =>
    r.status === 'available' && r.typeId === res?.roomTypeId
  );

  if (!res) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
        <h2>Reservation not found</h2>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/reservations')} style={{ marginTop: 'var(--space-4)' }}>
          Back to Reservations
        </button>
      </div>
    );
  }

  const handleCheckIn = () => {
    if (!selectedRoom) { showToast('error', 'Room Required', 'Please select a room to check in.'); return; }
    dispatch({ type: 'CHECK_IN_RESERVATION', payload: { reservationId: res.id, roomId: selectedRoom } });
    showToast('success', 'Checked In Successfully', `${guest?.firstName} ${guest?.lastName} has been checked into Room ${state.rooms.find(r => r.id === selectedRoom)?.number}.`);
    setShowCheckIn(false);
  };

  const handleCheckOut = () => {
    dispatch({ type: 'CHECK_OUT_RESERVATION', payload: { reservationId: res.id } });
    showToast('success', 'Checked Out Successfully', `${guest?.firstName} ${guest?.lastName} has been checked out. Room marked for housekeeping.`);
    setShowCheckOut(false);
  };

  const statusColors = {
    confirmed: 'var(--color-success)',
    'checked-in': 'var(--color-primary-600)',
    'checked-out': 'var(--color-neutral-500)',
    pending: 'var(--color-warning)',
    cancelled: 'var(--color-error)',
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/reservations')}>
            <ArrowLeft size={15} /> Back
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <h1 className="page-title">{res.id}</h1>
              <span className={`badge booking-badge ${res.status}`}>
                {res.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
            <p className="page-subtitle">Confirmation: {res.confirmationNo} · Source: {res.source}</p>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm"><Printer size={15} /> Print</button>
          <button className="btn btn-secondary btn-sm"><Pencil size={15} /> Edit</button>
          {res.status === 'confirmed' && (
            <button className="btn btn-success btn-sm" onClick={() => setShowCheckIn(true)}>
              <Door size={15} /> Check In
            </button>
          )}
          {res.status === 'checked-in' && (
            <button className="btn btn-warning btn-sm" onClick={() => setShowCheckOut(true)}>
              <Door size={15} /> Check Out
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-5)' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Stay Details */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Stay Details</div>
            </div>
            <div className="card-body">
              <div className="form-grid form-grid-2" style={{ gap: 'var(--space-5)' }}>
                {[
                  { label: 'Check-in', value: formatDate(res.checkIn) },
                  { label: 'Check-out', value: formatDate(res.checkOut) },
                  { label: 'Nights', value: `${res.nights} nights` },
                  { label: 'Adults / Children', value: `${res.adults} adults · ${res.children} children` },
                  { label: 'Room Type', value: roomType?.name || '—' },
                  { label: 'Assigned Room', value: room ? `Room ${room.number} (Floor ${room.floor})` : 'Not yet assigned' },
                  { label: 'Rate per Night', value: formatCurrency(res.ratePerNight) },
                  { label: 'Booking Source', value: res.source },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', fontWeight: 'var(--font-medium)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)', fontWeight: 'var(--font-medium)' }}>{f.value}</div>
                  </div>
                ))}
              </div>

              {res.specialRequests && (
                <div style={{ marginTop: 'var(--space-5)', padding: 'var(--space-4)', background: 'var(--color-info-light)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-primary-100)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-info-dark)', marginBottom: 'var(--space-2)' }}>SPECIAL REQUESTS</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)' }}>{res.specialRequests}</div>
                </div>
              )}
            </div>
          </div>

          {/* Billing Summary */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Billing Summary</div>
              {invoice && (
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/billing')}>
                  <Receipt size={14} /> View Invoice
                </button>
              )}
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  { label: `Room Charge (${res.nights} nights × ${formatCurrency(res.ratePerNight)})`, amount: res.totalRoomCharge },
                  ...(res.discount ? [{ label: `Discount (${res.discountReason})`, amount: -res.discount, negative: true }] : []),
                  { label: 'Tax (15%)', amount: res.tax },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: item.negative ? 'var(--color-success)' : 'var(--color-neutral-600)' }}>{item.label}</span>
                    <span style={{ fontWeight: 'var(--font-medium)', color: item.negative ? 'var(--color-success)' : 'var(--color-neutral-800)' }}>
                      {item.negative ? `−` : ''}{formatCurrency(Math.abs(item.amount))}
                    </span>
                  </div>
                ))}
                <div className="divider" style={{ margin: 'var(--space-2) 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>
                  <span>Total Amount</span>
                  <span>{formatCurrency(res.totalAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--color-success)' }}>
                  <span>Deposit Paid</span>
                  <span>−{formatCurrency(res.deposit)}</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', fontWeight: 'var(--font-bold)',
                  fontSize: 'var(--text-lg)', padding: 'var(--space-3)',
                  background: res.balance > 0 ? 'var(--color-warning-light)' : 'var(--color-success-light)',
                  borderRadius: 'var(--radius-lg)',
                  color: res.balance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success-dark)'
                }}>
                  <span>Balance Due</span>
                  <span>{formatCurrency(res.balance)}</span>
                </div>
              </div>
              {res.balance > 0 && (
                <button className="btn btn-primary btn-md w-full" style={{ marginTop: 'var(--space-4)', justifyContent: 'center' }} onClick={() => navigate('/app/payments')}>
                  <CreditCard size={15} />
                  Collect Payment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Guest Info */}
          {guest && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Guest</div>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/app/guests/${guest.id}`)}>
                  View Profile
                </button>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--color-primary-100)', color: 'var(--color-primary-700)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)'
                  }}>
                    {`${guest.firstName[0]}${guest.lastName[0]}`}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {guest.title} {guest.firstName} {guest.lastName}
                      {guest.vip && <span className="badge badge-gold" style={{ marginLeft: 8, fontSize: 'var(--text-xs)' }}>★ VIP</span>}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>{guest.nationality}</div>
                  </div>
                </div>
                {[
                  { icon: Phone, value: guest.phone },
                  { icon: Envelope, value: guest.email },
                  { icon: MapPin, value: `${guest.city}, ${guest.country}` },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
                    <item.icon size={14} />
                    {item.value}
                  </div>
                ))}
                <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginBottom: 2 }}>Total Stays</div>
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)' }}>{guest.totalStays}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginBottom: 2 }}>Total Spending</div>
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)' }}>{formatCurrency(guest.totalSpending)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Room Info */}
          {room && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Room {room.number}</div>
                <span className={`status-badge ${room.status}`}>{room.status.replace('-', ' ')}</span>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                  {[
                    { label: 'Floor', value: `Floor ${room.floor}` },
                    { label: 'Bed Type', value: room.bedType },
                    { label: 'View', value: room.view },
                    { label: 'Max Occupancy', value: `${room.maxOccupancy} guests` },
                  ].map(f => (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-neutral-500)' }}>{f.label}</span>
                      <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--color-neutral-800)' }}>{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="card">
            <div className="card-header"><div className="card-title">Timeline</div></div>
            <div className="card-body">
              {[
                { event: 'Reservation Created', time: formatDateTime(res.createdAt), icon: FileText, color: 'var(--color-neutral-400)' },
                { event: 'Confirmed', time: formatDateTime(res.createdAt), icon: CheckCircle, color: 'var(--color-success)' },
                ...(res.checkedInAt ? [{ event: 'Checked In', time: formatDateTime(res.checkedInAt), icon: Door, color: 'var(--color-primary-600)' }] : []),
                ...(res.checkedOutAt ? [{ event: 'Checked Out', time: formatDateTime(res.checkedOutAt), icon: Door, color: 'var(--color-warning)' }] : []),
              ].reverse().map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={14} color={item.color} weight="fill" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--color-neutral-800)' }}>{item.event}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginTop: 2 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Check-In Modal */}
      <Modal isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} title="Check In Guest" size="sm"
        footer={
          <>
            <button className="btn btn-secondary btn-md" onClick={() => setShowCheckIn(false)}>Cancel</button>
            <button className="btn btn-success btn-md" onClick={handleCheckIn}>Confirm Check In</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-sm)' }}>
            Checking in <strong>{guest?.firstName} {guest?.lastName}</strong> for {res.nights} nights.
          </p>
          <div className="form-group">
            <label className="form-label required">Assign Room</label>
            <select className="form-select" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
              <option value="">Select a room...</option>
              {availableRooms.map(r => (
                <option key={r.id} value={r.id}>
                  Room {r.number} — Floor {r.floor} · {r.bedType} · {r.view}
                </option>
              ))}
            </select>
            {availableRooms.length === 0 && (
              <div className="form-error">No available rooms of this type. Please check room availability.</div>
            )}
          </div>
        </div>
      </Modal>

      {/* Check-Out Confirm */}
      <ConfirmDialog
        isOpen={showCheckOut}
        onClose={() => setShowCheckOut(false)}
        onConfirm={handleCheckOut}
        title="Check Out Guest"
        message={`Check out ${guest?.firstName} ${guest?.lastName}? The balance of ${formatCurrency(res.balance)} must be collected. The room will be marked for housekeeping.`}
        confirmLabel="Confirm Check Out"
      />
    </div>
  );
}
