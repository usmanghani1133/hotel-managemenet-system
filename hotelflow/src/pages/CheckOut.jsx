import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Door, CheckCircle, MagnifyingGlass, Receipt, CreditCard,
  Printer, Envelope, Plus, Trash, ArrowRight, CurrencyDollar, FileText, Check
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';

export default function CheckOut() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialResId = searchParams.get('resId');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResId, setSelectedResId] = useState(initialResId || '');
  const [incidentals, setIncidentals] = useState([]);
  const [newIncidentalTitle, setNewIncidentalTitle] = useState('');
  const [newIncidentalAmount, setNewIncidentalAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [checkOutCompleted, setCheckOutCompleted] = useState(false);

  // In-house reservations eligible for check-out
  const inHouseReservations = state.reservations.filter(r => r.status === 'checked-in');

  // Find currently selected reservation
  const reservation = state.reservations.find(r => r.id === selectedResId);
  const guest = reservation ? state.guests.find(g => g.id === reservation.guestId) : null;
  const room = reservation ? state.rooms.find(r => r.id === reservation.roomId) : null;
  const roomType = reservation ? state.roomTypes.find(rt => rt.id === reservation.roomTypeId) : null;

  // Set default selection if none
  useEffect(() => {
    if (!selectedResId && inHouseReservations.length > 0) {
      setSelectedResId(inHouseReservations[0].id);
    }
  }, [inHouseReservations, selectedResId]);

  // Filter list
  const filteredReservations = inHouseReservations.filter(r => {
    const g = state.guests.find(guest => guest.id === r.guestId);
    const rm = state.rooms.find(room => room.id === r.roomId);
    const q = searchQuery.toLowerCase();
    const gName = g ? `${g.firstName} ${g.lastName}`.toLowerCase() : '';
    const rNum = rm ? rm.number.toString() : '';
    return r.id.toLowerCase().includes(q) || gName.includes(q) || rNum.includes(q);
  });

  // Incidentals total
  const incidentalsTotal = incidentals.reduce((sum, item) => sum + item.amount, 0);
  const baseBalance = reservation ? (reservation.balance || 0) : 0;
  const totalSettlementDue = Math.max(0, baseBalance + incidentalsTotal);

  const handleAddIncidental = (e) => {
    e.preventDefault();
    if (!newIncidentalTitle || !newIncidentalAmount) return;
    setIncidentals(prev => [
      ...prev,
      { id: Date.now(), title: newIncidentalTitle, amount: parseFloat(newIncidentalAmount) }
    ]);
    setNewIncidentalTitle('');
    setNewIncidentalAmount('');
  };

  const handleRemoveIncidental = (id) => {
    setIncidentals(prev => prev.filter(i => i.id !== id));
  };

  const handleCompleteCheckOut = () => {
    if (!reservation) return;

    // 1. Dispatch check-out
    dispatch({
      type: 'CHECK_OUT_RESERVATION',
      payload: {
        reservationId: reservation.id
      }
    });

    // 2. Dispatch settlement payment if balance due
    if (totalSettlementDue > 0) {
      dispatch({
        type: 'ADD_PAYMENT',
        payload: {
          id: `pay-${Date.now()}`,
          reservationId: reservation.id,
          amount: totalSettlementDue,
          method: paymentMethod,
          status: 'completed',
          date: new Date().toISOString(),
          notes: 'Checkout final settlement'
        }
      });
    }

    // 3. Dispatch Housekeeping task automatically
    dispatch({
      type: 'ADD_HOUSEKEEPING_TASK',
      payload: {
        id: `hk-${Date.now()}`,
        roomId: reservation.roomId,
        taskType: 'checkout_clean',
        priority: 'high',
        status: 'pending',
        assignedTo: null,
        scheduledDate: new Date().toISOString().split('T')[0],
        notes: `Immediate checkout turnover cleaning for Room ${room?.number || ''}`
      }
    });

    // 4. Toast
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Check-Out Completed',
        message: `Room ${room?.number || ''} checked out. Turnover task sent to Housekeeping.`
      }
    });

    setCheckOutCompleted(true);
  };

  return (
    <div className="check-out-page" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Front Desk Express Check-Out</h1>
          <p className="page-subtitle">Folio review, add incidental charges, settle payment and trigger housekeeping</p>
        </div>
      </div>

      {checkOutCompleted ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)', animation: 'fadeIn 0.3s ease-in-out' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: 'var(--color-success-light)',
            color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto var(--space-4)'
          }}>
            <CheckCircle size={48} weight="fill" />
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)', marginBottom: 8 }}>
            Check-Out Completed & Settled!
          </h2>
          <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-base)', maxWidth: 520, margin: '0 auto var(--space-6)' }}>
            <strong>{guest?.title} {guest?.firstName} {guest?.lastName}</strong> has checked out of <strong>Room {room?.number}</strong>. Folio balance is settled. Room marked <strong>Dirty</strong> and priority housekeeping cleaning ticket generated.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <Printer size={16} /> Print Tax Invoice (GST)
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                alert(`Official invoice has been emailed to ${guest?.email || 'guest'}`);
              }}
            >
              <Envelope size={16} /> Email Invoice
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCheckOutCompleted(false);
                setSelectedResId('');
                setIncidentals([]);
              }}
            >
              Check Out Next Guest
            </button>
          </div>
        </div>
      ) : (
        <div className={selectedResId ? "responsive-split-layout" : ""}>
          {/* Left Column: In-House Guests List */}
          <div className="card">
            <div className="card-header" style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)' }}>
              <div className="card-title" style={{ fontSize: 'var(--text-base)' }}>In-House Rooms ({inHouseReservations.length})</div>
            </div>
            <div className="card-body" style={{ padding: 'var(--space-4)' }}>
              <div style={{ position: 'relative', marginBottom: 'var(--space-4)' }}>
                <MagnifyingGlass size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-neutral-400)' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: 36 }}
                  placeholder="Search room #, guest name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxHeight: 520, overflowY: 'auto' }}>
                {filteredReservations.map(res => {
                  const g = state.guests.find(gst => gst.id === res.guestId);
                  const rm = state.rooms.find(room => room.id === res.roomId);
                  const isSelected = selectedResId === res.id;

                  return (
                    <div
                      key={res.id}
                      onClick={() => {
                        setSelectedResId(res.id);
                        setIncidentals([]);
                      }}
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
                        <span style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)', color: 'var(--color-primary-700)' }}>
                          Room {rm ? rm.number : 'TBD'}
                        </span>
                        <span style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                          {res.id}
                        </span>
                      </div>
                      <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                        {g ? `${g.title} ${g.firstName} ${g.lastName}` : 'Guest'}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 2 }}>
                        <span>Out: {formatDate(res.checkOut)}</span>
                        <span style={{ fontWeight: 'bold', color: res.balance > 0 ? 'var(--color-warning-dark)' : 'var(--color-success)' }}>
                          Due: {formatCurrency(res.balance || 0)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {filteredReservations.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-neutral-400)' }}>
                    No in-house guests currently available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Folio Settlement Review */}
          {reservation && guest ? (
            <div className="card" style={{ padding: 'var(--space-6)' }}>
              {/* Header */}
              <div style={{ borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Guest Folio Review</span>
                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                      Room {room?.number} — {guest.title} {guest.firstName} {guest.lastName}
                    </h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Booking Ref</div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--color-primary-600)' }}>{reservation.id}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                  <span><strong>Stay:</strong> {formatDate(reservation.checkIn)} → {formatDate(reservation.checkOut)} ({reservation.nights} Nights)</span>
                  <span><strong>Room:</strong> {roomType?.name}</span>
                </div>
              </div>

              {/* Folio Line Items Table */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-neutral-800)', marginBottom: 'var(--space-3)' }}>
                  Folio Charges Breakdown
                </h3>
                <div className="table-wrapper">
                  <table className="data-table" style={{ fontSize: 'var(--text-xs)' }}>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Room Tariff ({reservation.nights} Nights @ {formatCurrency(roomType?.basePrice || 8500)}/night)</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formatCurrency(reservation.totalAmount * 0.85)}</td>
                      </tr>
                      <tr>
                        <td>GST / Federal Excise Tax (15%)</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formatCurrency(reservation.totalAmount * 0.15)}</td>
                      </tr>
                      {incidentals.map(inc => (
                        <tr key={inc.id} style={{ background: '#FFFBEB' }}>
                          <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{inc.title} (Incidental)</span>
                            <button
                              onClick={() => handleRemoveIncidental(inc.id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-error)', cursor: 'pointer', padding: 2 }}
                              title="Remove charge"
                            >
                              <Trash size={14} />
                            </button>
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--color-warning-dark)' }}>
                            {formatCurrency(inc.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ background: 'var(--color-neutral-50)' }}>
                        <td><strong>Total Billed</strong></td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formatCurrency(reservation.totalAmount + incidentalsTotal)}</td>
                      </tr>
                      <tr>
                        <td style={{ color: 'var(--color-success)' }}>Less: Payments / Advance Received</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--color-success)' }}>
                          - {formatCurrency(reservation.totalAmount - (reservation.balance || 0))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Incidental Charge Accordion */}
              <div style={{ marginBottom: 'var(--space-5)', background: 'var(--color-neutral-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
                  + Add Last-Minute Incidental (Minibar, Laundry, Damages, Late Checkout)
                </div>
                <form onSubmit={handleAddIncidental} style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: 'var(--text-xs)', height: 34 }}
                    placeholder="e.g. Minibar Snacks & Beverages"
                    value={newIncidentalTitle}
                    onChange={e => setNewIncidentalTitle(e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    style={{ fontSize: 'var(--text-xs)', height: 34, width: 140 }}
                    placeholder="PKR Amount"
                    value={newIncidentalAmount}
                    onChange={e => setNewIncidentalAmount(e.target.value)}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap', height: 34 }}>
                    <Plus size={14} /> Add
                  </button>
                </form>
              </div>

              {/* Settlement Summary Box */}
              <div style={{
                background: totalSettlementDue > 0 ? 'var(--color-warning-light)' : 'var(--color-success-light)',
                border: `1px solid ${totalSettlementDue > 0 ? 'var(--color-warning)' : 'var(--color-success)'}`,
                padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: totalSettlementDue > 0 ? 'var(--color-warning-dark)' : 'var(--color-success-dark)' }}>
                      {totalSettlementDue > 0 ? 'BALANCE PAYABLE NOW' : 'ALL CHARGES FULLY SETTLED'}
                    </div>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: totalSettlementDue > 0 ? 'var(--color-warning-dark)' : 'var(--color-success-dark)' }}>
                      {formatCurrency(totalSettlementDue)}
                    </div>
                  </div>

                  {totalSettlementDue > 0 && (
                    <div style={{ minWidth: 200 }}>
                      <label className="form-label" style={{ fontSize: '11px', marginBottom: 2 }}>Settlement Method</label>
                      <select
                        className="form-control"
                        style={{ height: 32, fontSize: 'var(--text-xs)' }}
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                      >
                        <option value="Credit Card">Credit Card (POS Terminal)</option>
                        <option value="Cash">Cash Currency</option>
                        <option value="Bank Transfer">Direct Bank Transfer</option>
                        <option value="JazzCash">JazzCash / EasyPaisa</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedResId('')}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCompleteCheckOut}
                  style={{ padding: '10px 24px', background: 'var(--color-warning-dark)', borderColor: 'var(--color-warning-dark)' }}
                >
                  <Door size={18} weight="bold" /> Settle & Complete Check-Out
                </button>
              </div>
            </div>
          ) : (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-16)', textAlign: 'center' }}>
              <Receipt size={48} color="var(--color-neutral-300)" style={{ marginBottom: 'var(--space-3)' }} />
              <h3 style={{ color: 'var(--color-neutral-700)', marginBottom: 4 }}>Select an In-House Guest</h3>
              <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)', maxWidth: 360 }}>
                Choose an occupied room from the left list to review folio charges and process check-out.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
