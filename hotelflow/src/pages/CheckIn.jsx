import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Door, CheckCircle, MagnifyingGlass, User, IdentificationCard,
  CreditCard, Key, ArrowRight, Printer, CalendarBlank, ShieldCheck, Check
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';

export default function CheckIn() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialResId = searchParams.get('resId');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResId, setSelectedResId] = useState(initialResId || '');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [idType, setIdType] = useState('CNIC');
  const [idNumber, setIdNumber] = useState('');
  const [keycardNumber, setKeycardNumber] = useState('KC-104-A');
  const [keyCount, setKeyCount] = useState(2);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [checkInCompleted, setCheckInCompleted] = useState(false);

  // Eligible reservations for check-in (confirmed or pending)
  const eligibleReservations = state.reservations.filter(
    r => r.status === 'confirmed' || r.status === 'pending'
  );

  // Find currently selected reservation
  const reservation = state.reservations.find(r => r.id === selectedResId);
  const guest = reservation ? state.guests.find(g => g.id === reservation.guestId) : null;
  const roomType = reservation ? state.roomTypes.find(rt => rt.id === reservation.roomTypeId) : null;

  // Auto-fill details when reservation selected
  useEffect(() => {
    if (reservation) {
      setSelectedRoomId(reservation.roomId || '');
      setAdvancePayment(reservation.balance > 0 ? reservation.balance : 0);
      if (guest) {
        setIdNumber(guest.idNumber || '35201-1234567-1');
      }
      if (reservation.roomId) {
        const room = state.rooms.find(r => r.id === reservation.roomId);
        setKeycardNumber(`KC-${room ? room.number : '101'}-A`);
      }
    }
  }, [reservation, guest, state.rooms]);

  // Filtered reservations for selection
  const filteredReservations = eligibleReservations.filter(r => {
    const g = state.guests.find(guest => guest.id === r.guestId);
    const q = searchQuery.toLowerCase();
    const gName = g ? `${g.firstName} ${g.lastName}`.toLowerCase() : '';
    return r.id.toLowerCase().includes(q) || gName.includes(q) || (g?.phone && g.phone.includes(q));
  });

  // Available clean rooms for this room type
  const availableRooms = state.rooms.filter(r => {
    if (reservation && r.typeId !== reservation.roomTypeId) return false;
    return r.status === 'available' || r.id === reservation?.roomId;
  });

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    if (!reservation) return;

    const finalRoomId = selectedRoomId || reservation.roomId || availableRooms[0]?.id;
    if (!finalRoomId) {
      alert('Please assign an available room before checking in.');
      return;
    }

    // Dispatch check-in
    dispatch({
      type: 'CHECK_IN_RESERVATION',
      payload: {
        reservationId: reservation.id,
        roomId: finalRoomId,
      }
    });

    // If advance payment recorded
    if (advancePayment > 0) {
      dispatch({
        type: 'ADD_PAYMENT',
        payload: {
          id: `pay-${Date.now()}`,
          reservationId: reservation.id,
          amount: parseFloat(advancePayment),
          method: paymentMethod,
          status: 'completed',
          date: new Date().toISOString(),
          notes: 'Advance check-in deposit'
        }
      });
    }

    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Check-in Completed!',
        message: `Guest ${guest?.firstName || ''} ${guest?.lastName || ''} checked in to Room ${state.rooms.find(r => r.id === finalRoomId)?.number || finalRoomId}.`
      }
    });

    setCheckInCompleted(true);
  };

  return (
    <div className="check-in-page" style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Front Desk Express Check-In</h1>
          <p className="page-subtitle">Verify guest identity, assign room keycard, collect advance and complete check-in</p>
        </div>
      </div>

      {checkInCompleted ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)', animation: 'fadeIn 0.3s ease-in-out' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-light)',
            color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto var(--space-4)'
          }}>
            <CheckCircle size={48} weight="fill" />
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)', marginBottom: 8 }}>
            Check-In Successful!
          </h2>
          <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-base)', maxWidth: 500, margin: '0 auto var(--space-6)' }}>
            <strong>{guest?.title} {guest?.firstName} {guest?.lastName}</strong> has been successfully checked into <strong>Room {state.rooms.find(r => r.id === selectedRoomId)?.number}</strong>. Keycards issued ({keycardNumber}).
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <Printer size={16} /> Print Registration Card
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/app/reservations/${reservation.id}`)}>
              View In-House Folio
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCheckInCompleted(false);
                setSelectedResId('');
              }}
            >
              Check In Another Guest
            </button>
          </div>
        </div>
      ) : (
        <div className={selectedResId ? "responsive-split-layout" : ""}>
          {/* Left Column: Search & Select Reservation */}
          <div className="card">
            <div className="card-header" style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)' }}>
              <div className="card-title" style={{ fontSize: 'var(--text-base)' }}>Expected Arrivals ({eligibleReservations.length})</div>
            </div>
            <div className="card-body" style={{ padding: 'var(--space-4)' }}>
              {/* Search input */}
              <div style={{ position: 'relative', marginBottom: 'var(--space-4)' }}>
                <MagnifyingGlass size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-neutral-400)' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: 36 }}
                  placeholder="Search guest name, booking #..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxHeight: 520, overflowY: 'auto' }}>
                {filteredReservations.map(res => {
                  const g = state.guests.find(gst => gst.id === res.guestId);
                  const rt = state.roomTypes.find(t => t.id === res.roomTypeId);
                  const isSelected = selectedResId === res.id;

                  return (
                    <div
                      key={res.id}
                      onClick={() => setSelectedResId(res.id)}
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        border: isSelected ? '2px solid var(--color-primary-600)' : '1px solid var(--color-neutral-200)',
                        background: isSelected ? 'var(--color-primary-50)' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 'var(--text-xs)', color: 'var(--color-primary-700)' }}>
                          {res.id}
                        </span>
                        <span className="badge badge-success" style={{ fontSize: '10px' }}>
                          Arrival Today
                        </span>
                      </div>
                      <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                        {g ? `${g.title} ${g.firstName} ${g.lastName}` : 'Guest'}
                        {g?.vip && <span className="badge badge-gold" style={{ marginLeft: 6, fontSize: '9px' }}>VIP</span>}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 2 }}>
                        {rt?.name} • {res.nights} Nights • {formatCurrency(res.totalAmount)}
                      </div>
                    </div>
                  );
                })}
                {filteredReservations.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-neutral-400)' }}>
                    No matching reservations found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Check-in Form */}
          {reservation && guest ? (
            <form onSubmit={handleCheckInSubmit} className="card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Selected Reservation</span>
                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                      {guest.title} {guest.firstName} {guest.lastName}
                    </h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Booking Ref</div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--color-primary-600)' }}>{reservation.id}</div>
                  </div>
                </div>

                {/* Stay Badges */}
                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                  <span><strong>Check In:</strong> {formatDate(reservation.checkIn)}</span>
                  <span><strong>Check Out:</strong> {formatDate(reservation.checkOut)} ({reservation.nights}N)</span>
                  <span><strong>Booked Type:</strong> {roomType?.name}</span>
                </div>
              </div>

              {/* Step 1: ID Verification */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-neutral-800)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 'var(--space-3)' }}>
                  <IdentificationCard size={18} color="var(--color-primary-600)" />
                  1. Guest Identity & Verification
                </h3>
                <div className="form-grid-responsive-2">
                  <div>
                    <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>ID Type</label>
                    <select className="form-control" value={idType} onChange={e => setIdType(e.target.value)}>
                      <option value="CNIC">National CNIC</option>
                      <option value="Passport">Passport</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>ID / Passport Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={idNumber}
                      onChange={e => setIdNumber(e.target.value)}
                      placeholder="e.g. 35201-1234567-1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Room Assignment & Keycard */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-neutral-800)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 'var(--space-3)' }}>
                  <Key size={18} color="var(--color-primary-600)" />
                  2. Room Allocation & Keycard
                </h3>
                <div className="form-grid-responsive-3">
                  <div>
                    <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Select Room</label>
                    <select
                      className="form-control"
                      value={selectedRoomId}
                      onChange={e => setSelectedRoomId(e.target.value)}
                      required
                    >
                      <option value="">-- Choose Clean Room --</option>
                      {availableRooms.map(r => (
                        <option key={r.id} value={r.id}>
                          Room {r.number} (Floor {r.floor} • {r.status})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Keycard ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={keycardNumber}
                      onChange={e => setKeycardNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Keys Issued</label>
                    <select className="form-control" value={keyCount} onChange={e => setKeyCount(Number(e.target.value))}>
                      <option value="1">1 Key</option>
                      <option value="2">2 Keys</option>
                      <option value="3">3 Keys</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Advance Settlement */}
              <div style={{ marginBottom: 'var(--space-5)', background: 'var(--color-neutral-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-neutral-800)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 'var(--space-3)' }}>
                  <CreditCard size={18} color="var(--color-primary-600)" />
                  3. Payment Settlement
                </h3>
                <div className="form-grid-responsive-2">
                  <div>
                    <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Advance / Full Deposit (PKR)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={advancePayment}
                      onChange={e => setAdvancePayment(e.target.value)}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--color-neutral-500)' }}>
                      Total booking cost: {formatCurrency(reservation.totalAmount)}
                    </span>
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Payment Method</label>
                    <select className="form-control" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                      <option value="Credit Card">Credit / Debit Card (Visa/Mastercard)</option>
                      <option value="Cash">Cash at Counter</option>
                      <option value="Bank Transfer">Direct Bank Transfer</option>
                      <option value="JazzCash">JazzCash / EasyPaisa</option>
                      <option value="Company Billing">Company Direct Billing (BTC)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms & Digital Signature */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={e => setTermsAgreed(e.target.checked)}
                    required
                  />
                  <span>Guest acknowledges hotel policies, check-out time (12:00 PM), and non-smoking regulations.</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedResId('')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                  <Check size={18} weight="bold" /> Complete Check-In & Issue Keys
                </button>
              </div>
            </form>
          ) : (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-16)', textAlign: 'center' }}>
              <Door size={48} color="var(--color-neutral-300)" style={{ marginBottom: 'var(--space-3)' }} />
              <h3 style={{ color: 'var(--color-neutral-700)', marginBottom: 4 }}>Select a Reservation</h3>
              <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)', maxWidth: 360 }}>
                Choose an expected arrival from the left list or search by guest name to begin the check-in process.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
