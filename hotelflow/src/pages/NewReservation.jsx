// NewReservation - Full multi-step booking form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, User, Bed, CreditCard } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';

const STEPS = [
  { id: 1, label: 'Guest', icon: User },
  { id: 2, label: 'Room & Dates', icon: Bed },
  { id: 3, label: 'Billing', icon: CreditCard },
  { id: 4, label: 'Confirm', icon: CheckCircle },
];

export default function NewReservation() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [guestMode, setGuestMode] = useState('existing'); // 'existing' | 'new'
  const [form, setForm] = useState({
    guestId: '',
    newGuest: { title: 'Mr.', firstName: '', lastName: '', email: '', phone: '', country: 'Pakistan', city: '', nationality: 'Pakistani', cnic: '' },
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 1,
    children: 0,
    roomTypeId: '',
    specialRequests: '',
    source: 'Direct',
    discount: 0,
    discountReason: '',
    depositAmount: 0,
    paymentMethod: 'Cash',
  });

  const nights = Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000));
  const selectedRoomType = state.roomTypes.find(rt => rt.id === form.roomTypeId);
  const totalRoomCharge = selectedRoomType ? selectedRoomType.basePrice * nights : 0;
  const discountAmt = form.discount ? Math.round(totalRoomCharge * (form.discount / 100)) : 0;
  const taxableAmount = totalRoomCharge - discountAmt;
  const taxAmt = Math.round(taxableAmount * 0.15);
  const totalAmount = taxableAmount + taxAmt;

  const update = (key, value) => setForm(p => ({ ...p, [key]: value }));
  const updateNested = (parent, key, value) => setForm(p => ({ ...p, [parent]: { ...p[parent], [key]: value } }));

  const canProceed = () => {
    if (step === 1) return guestMode === 'existing' ? !!form.guestId : (!!form.newGuest.firstName && !!form.newGuest.phone);
    if (step === 2) return !!form.roomTypeId && !!form.checkIn && !!form.checkOut && nights >= 1;
    return true;
  };

  const handleSubmit = () => {
    let guestId = form.guestId;
    if (guestMode === 'new') {
      guestId = `g-${Date.now()}`;
      dispatch({
        type: 'ADD_GUEST',
        payload: { id: guestId, propertyId: 'prop-1', ...form.newGuest, vip: false, totalStays: 0, totalSpending: 0, lastVisit: null, notes: '', preferences: {}, createdAt: new Date().toISOString().split('T')[0] }
      });
    }
    const resId = `BK-2026-${String(state.reservations.length + 1).padStart(4, '0')}`;
    const confirmNo = `CF-2026-${String(state.reservations.length + 1).padStart(4, '0')}`;
    dispatch({
      type: 'ADD_RESERVATION',
      payload: {
        id: resId, propertyId: 'prop-1', guestId, roomId: null, roomTypeId: form.roomTypeId,
        checkIn: form.checkIn, checkOut: form.checkOut, nights,
        adults: form.adults, children: form.children,
        ratePerNight: selectedRoomType?.basePrice || 0, totalRoomCharge,
        discount: discountAmt, discountReason: form.discountReason || null,
        tax: taxAmt, totalAmount, deposit: form.depositAmount,
        balance: totalAmount - form.depositAmount,
        status: 'confirmed', source: form.source,
        specialRequests: form.specialRequests, notes: '',
        confirmationNo: confirmNo, createdAt: new Date().toISOString().split('T')[0],
        createdBy: state.currentUser.id, checkedInAt: null
      }
    });
    showToast('success', 'Reservation Created!', `Booking ${resId} confirmed for ${nights} nights.`);
    navigate(`/app/reservations/${resId}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/reservations')}><ArrowLeft size={15} /> Back</button>
          <h1 className="page-title">New Reservation</h1>
        </div>
      </div>

      {/* Step Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 'var(--space-8)' }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: step >= s.id ? 'var(--color-primary-600)' : 'var(--color-neutral-100)',
                color: step >= s.id ? 'white' : 'var(--color-neutral-400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)',
                border: step === s.id ? '2px solid var(--color-primary-300)' : 'none',
                transition: 'all 0.3s'
              }}>
                {step > s.id ? <CheckCircle size={18} weight="bold" /> : s.id}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: step >= s.id ? 'var(--color-primary-600)' : 'var(--color-neutral-400)', marginTop: 4, fontWeight: step === s.id ? 'var(--font-semibold)' : 'var(--font-regular)' }}>
                {s.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: step > s.id ? 'var(--color-primary-600)' : 'var(--color-neutral-200)', margin: '-16px var(--space-4) 0', transition: 'background 0.3s' }} />
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 'var(--space-8)' }}>
          {/* Step 1: Guest */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-6)', color: 'var(--color-neutral-800)' }}>Select or Add Guest</h2>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                {['existing', 'new'].map(mode => (
                  <button key={mode} className="btn btn-md"
                    style={{ background: guestMode === mode ? 'var(--color-primary-600)' : 'var(--color-neutral-100)', color: guestMode === mode ? 'white' : 'var(--color-neutral-600)', border: 'none', fontWeight: guestMode === mode ? 'var(--font-semibold)' : 'var(--font-regular)' }}
                    onClick={() => setGuestMode(mode)}
                  >{mode === 'existing' ? 'Existing Guest' : '+ New Guest'}</button>
                ))}
              </div>

              {guestMode === 'existing' ? (
                <div className="form-group">
                  <label className="form-label required">Select Guest</label>
                  <select className="form-select" value={form.guestId} onChange={e => update('guestId', e.target.value)} style={{ fontSize: 'var(--text-base)', padding: 'var(--space-3) var(--space-4)' }}>
                    <option value="">Search and select guest...</option>
                    {state.guests.map(g => (
                      <option key={g.id} value={g.id}>{g.title} {g.firstName} {g.lastName} — {g.phone}</option>
                    ))}
                  </select>
                  {form.guestId && (() => {
                    const guest = state.guests.find(g => g.id === form.guestId);
                    return guest && (
                      <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-primary-100)' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-800)' }}>{guest.title} {guest.firstName} {guest.lastName} {guest.vip && '⭐'}</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginTop: 4 }}>{guest.phone} · {guest.email} · {guest.totalStays} previous stays</div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div>
                  <div className="form-grid form-grid-3" style={{ marginBottom: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <select className="form-select" value={form.newGuest.title} onChange={e => updateNested('newGuest', 'title', e.target.value)}>
                        {['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label required">First Name</label>
                      <input className="form-input" value={form.newGuest.firstName} onChange={e => updateNested('newGuest', 'firstName', e.target.value)} placeholder="Ahmed" />
                    </div>
                    <div className="form-group">
                      <label className="form-label required">Last Name</label>
                      <input className="form-input" value={form.newGuest.lastName} onChange={e => updateNested('newGuest', 'lastName', e.target.value)} placeholder="Khan" />
                    </div>
                  </div>
                  <div className="form-grid form-grid-2">
                    <div className="form-group">
                      <label className="form-label required">Phone</label>
                      <input className="form-input" value={form.newGuest.phone} onChange={e => updateNested('newGuest', 'phone', e.target.value)} placeholder="+92-321-1234567" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" value={form.newGuest.email} onChange={e => updateNested('newGuest', 'email', e.target.value)} placeholder="ahmed@example.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input className="form-input" value={form.newGuest.city} onChange={e => updateNested('newGuest', 'city', e.target.value)} placeholder="Lahore" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CNIC / Passport</label>
                      <input className="form-input" value={form.newGuest.cnic} onChange={e => updateNested('newGuest', 'cnic', e.target.value)} placeholder="35201-1234567-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Room & Dates */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-6)', color: 'var(--color-neutral-800)' }}>Room & Stay Details</h2>
              <div className="form-grid form-grid-2" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label required">Check-in Date</label>
                  <input type="date" className="form-input" value={form.checkIn} min={new Date().toISOString().split('T')[0]} onChange={e => update('checkIn', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label required">Check-out Date</label>
                  <input type="date" className="form-input" value={form.checkOut} min={form.checkIn} onChange={e => update('checkOut', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Adults</label>
                  <input type="number" className="form-input" value={form.adults} min={1} max={6} onChange={e => update('adults', Number(e.target.value))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Children</label>
                  <input type="number" className="form-input" value={form.children} min={0} max={4} onChange={e => update('children', Number(e.target.value))} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
                <label className="form-label required">Room Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                  {state.roomTypes.map(rt => (
                    <div key={rt.id}
                      onClick={() => update('roomTypeId', rt.id)}
                      style={{
                        border: `2px solid ${form.roomTypeId === rt.id ? 'var(--color-primary-500)' : 'var(--color-neutral-200)'}`,
                        borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)', cursor: 'pointer',
                        background: form.roomTypeId === rt.id ? 'var(--color-primary-50)' : 'white',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)', marginBottom: 4 }}>{rt.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 8 }}>{rt.bedType} · {rt.sizeSqft} sqft</div>
                      <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)', color: 'var(--color-primary-600)' }}>{formatCurrency(rt.basePrice)}<span style={{ fontWeight: 'normal', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>/night</span></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Source</label>
                <select className="form-select" value={form.source} onChange={e => update('source', e.target.value)} style={{ width: 'auto' }}>
                  {['Direct', 'Online', 'Phone', 'Corporate', 'Travel Agent', 'OTA', 'Walk-in'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests</label>
                <textarea className="form-textarea" placeholder="Any special requests..." value={form.specialRequests} onChange={e => update('specialRequests', e.target.value)} rows={2} />
              </div>
            </div>
          )}

          {/* Step 3: Billing */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-6)', color: 'var(--color-neutral-800)' }}>Billing & Payment</h2>

              {/* Rate Summary */}
              <div style={{ background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
                <div style={{ fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-700)' }}>Booking Summary</div>
                {[
                  { label: `${selectedRoomType?.name} × ${nights} nights @ ${formatCurrency(selectedRoomType?.basePrice || 0)}`, amount: totalRoomCharge },
                  ...(discountAmt ? [{ label: `Discount (${form.discount}%)`, amount: -discountAmt, negative: true }] : []),
                  { label: 'Tax (15%)', amount: taxAmt },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)', color: item.negative ? 'var(--color-success)' : 'var(--color-neutral-600)' }}>
                    <span>{item.label}</span>
                    <span style={{ fontWeight: 'var(--font-medium)' }}>{item.negative ? '−' : ''}{formatCurrency(Math.abs(item.amount))}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)', marginTop: 'var(--space-2)' }}>
                  <span>Total</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Discount (%)</label>
                  <input type="number" className="form-input" value={form.discount} min={0} max={100} onChange={e => update('discount', Number(e.target.value))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Discount Reason</label>
                  <input className="form-input" placeholder="e.g. Loyalty Discount" value={form.discountReason} onChange={e => update('discountReason', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Deposit Amount</label>
                  <input type="number" className="form-input" value={form.depositAmount} min={0} onChange={e => update('depositAmount', Number(e.target.value))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select" value={form.paymentMethod} onChange={e => update('paymentMethod', e.target.value)}>
                    {['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Cheque'].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-6)', color: 'var(--color-neutral-800)' }}>Confirm Reservation</h2>
              {(() => {
                const guest = guestMode === 'existing' ? state.guests.find(g => g.id === form.guestId) : form.newGuest;
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                    <div className="card" style={{ background: 'var(--color-neutral-50)', boxShadow: 'none' }}>
                      <div className="card-header"><div className="card-title">Guest Information</div></div>
                      <div className="card-body">
                        <div style={{ fontWeight: 'var(--font-semibold)', marginBottom: 4 }}>{guest?.title} {guest?.firstName || form.newGuest.firstName} {guest?.lastName || form.newGuest.lastName}</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>{guest?.phone || form.newGuest.phone}</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>{guest?.email || form.newGuest.email}</div>
                      </div>
                    </div>
                    <div className="card" style={{ background: 'var(--color-neutral-50)', boxShadow: 'none' }}>
                      <div className="card-header"><div className="card-title">Stay Details</div></div>
                      <div className="card-body">
                        <div style={{ fontSize: 'var(--text-sm)' }}><strong>Check-in:</strong> {formatDate(form.checkIn)}</div>
                        <div style={{ fontSize: 'var(--text-sm)' }}><strong>Check-out:</strong> {formatDate(form.checkOut)}</div>
                        <div style={{ fontSize: 'var(--text-sm)' }}><strong>Nights:</strong> {nights}</div>
                        <div style={{ fontSize: 'var(--text-sm)' }}><strong>Room:</strong> {selectedRoomType?.name}</div>
                        <div style={{ fontSize: 'var(--text-sm)' }}><strong>Guests:</strong> {form.adults} adults, {form.children} children</div>
                      </div>
                    </div>
                    <div className="card" style={{ background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-200)', boxShadow: 'none', gridColumn: '1/-1' }}>
                      <div className="card-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ color: 'var(--color-neutral-600)' }}>Total Amount</span>
                          <span style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-lg)', color: 'var(--color-primary-700)' }}>{formatCurrency(totalAmount)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-neutral-600)' }}>Deposit Collected</span>
                          <span style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-success)' }}>{formatCurrency(form.depositAmount)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                          <span style={{ color: 'var(--color-neutral-600)' }}>Balance Due</span>
                          <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-warning-dark)' }}>{formatCurrency(totalAmount - form.depositAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-8)', borderTop: '1px solid var(--border-color)' }}>
          <button className="btn btn-secondary btn-md" onClick={() => step === 1 ? navigate('/app/reservations') : setStep(s => s - 1)}>
            <ArrowLeft size={15} /> {step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 4 ? (
            <button className="btn btn-primary btn-md" disabled={!canProceed()} onClick={() => setStep(s => s + 1)}>
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button className="btn btn-success btn-md" onClick={handleSubmit}>
              <CheckCircle size={15} /> Confirm Reservation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
