import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CaretLeft, CaretRight, CalendarBlank, Plus, Eye,
  Funnel, Door, User, Bed, Check, X, CreditCard
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../data/demoData';

export default function RoomCalendar() {
  const { state } = useApp();
  const navigate = useNavigate();

  // Date controls
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 2); // Show 2 days in the past, rest in the future
    return d;
  });
  const [viewDays, setViewDays] = useState(14); // 7, 14, 21
  const [filterType, setFilterType] = useState('ALL');
  const [filterFloor, setFilterFloor] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Generate date array
  const dateRange = useMemo(() => {
    const dates = [];
    const base = new Date(startDate);
    base.setHours(0, 0, 0, 0);

    for (let i = 0; i < viewDays; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const isToday = new Date().toISOString().split('T')[0] === iso;
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      dates.push({
        date: d,
        iso,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' }),
        isToday,
        isWeekend
      });
    }
    return dates;
  }, [startDate, viewDays]);

  const handlePrev = () => {
    setStartDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const handleNext = () => {
    setStartDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const handleToday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    setStartDate(d);
  };

  // Filter rooms
  const filteredRooms = useMemo(() => {
    return state.rooms.filter(room => {
      if (filterType !== 'ALL' && room.typeId !== filterType) return false;
      if (filterFloor !== 'ALL' && room.floor !== parseInt(filterFloor)) return false;
      return true;
    });
  }, [state.rooms, filterType, filterFloor]);

  // Unique floors and room types for filters
  const floors = useMemo(() => {
    const fSet = new Set(state.rooms.map(r => r.floor));
    return Array.from(fSet).sort((a, b) => a - b);
  }, [state.rooms]);

  // Map reservations to rooms and dates
  const roomReservations = useMemo(() => {
    const map = {};
    state.reservations.forEach(res => {
      if (!res.roomId) return;
      if (!map[res.roomId]) map[res.roomId] = [];
      map[res.roomId].push(res);
    });
    return map;
  }, [state.reservations]);

  // Calculate daily occupancy stats
  const dailyOccupancy = useMemo(() => {
    return dateRange.map(({ iso }) => {
      let occupiedCount = 0;
      state.rooms.forEach(room => {
        const bookings = roomReservations[room.id] || [];
        const isOcc = bookings.some(b => {
          return b.status !== 'cancelled' && iso >= b.checkIn && iso < b.checkOut;
        });
        if (isOcc) occupiedCount++;
      });
      const pct = Math.round((occupiedCount / (state.rooms.length || 1)) * 100);
      return { iso, occupiedCount, pct };
    });
  }, [dateRange, state.rooms, roomReservations]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in':
        return { bg: 'linear-gradient(135deg, #1D4ED8, #2563EB)', text: '#ffffff', border: '#1E40AF' };
      case 'confirmed':
        return { bg: 'linear-gradient(135deg, #D97706, #F59E0B)', text: '#ffffff', border: '#B45309' };
      case 'checked-out':
        return { bg: 'linear-gradient(135deg, #475569, #64748B)', text: '#ffffff', border: '#334155' };
      case 'maintenance':
        return { bg: 'linear-gradient(135deg, #EA580C, #F97316)', text: '#ffffff', border: '#C2410C' };
      default:
        return { bg: 'linear-gradient(135deg, #059669, #10B981)', text: '#ffffff', border: '#047857' };
    }
  };

  const getCleanlinessColor = (status) => {
    switch (status) {
      case 'clean': return '#10B981';
      case 'dirty': return '#EF4444';
      case 'inspected': return '#06B6D4';
      case 'in_progress': return '#8B5CF6';
      default: return '#94A3B8';
    }
  };

  return (
    <div className="room-calendar-page">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Room Rack & Calendar</h1>
          <p className="page-subtitle">Interactive 14-day timeline & visual room occupancy grid</p>
        </div>
        <div className="page-actions" style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className="btn btn-secondary btn-sm" onClick={handlePrev} title="Previous 7 Days">
            <CaretLeft size={16} />
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleToday}>
            Today
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleNext} title="Next 7 Days">
            <CaretRight size={16} />
          </button>
          <div style={{ width: 1, height: 28, background: 'var(--color-neutral-300)', margin: '0 4px' }} />
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/reservations/new')}>
            <Plus size={16} /> New Booking
          </button>
        </div>
      </div>

      {/* Control Bar: Filters & Legend */}
      <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Funnel size={16} color="var(--color-neutral-500)" />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-600)' }}>Filters:</span>
            </div>

            <select
              className="form-control"
              style={{ padding: '4px 8px', fontSize: 'var(--text-xs)', height: 32, width: 'auto' }}
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="ALL">All Room Types</option>
              {state.roomTypes.map(rt => (
                <option key={rt.id} value={rt.id}>{rt.name}</option>
              ))}
            </select>

            <select
              className="form-control"
              style={{ padding: '4px 8px', fontSize: 'var(--text-xs)', height: 32, width: 'auto' }}
              value={filterFloor}
              onChange={e => setFilterFloor(e.target.value)}
            >
              <option value="ALL">All Floors</option>
              {floors.map(floor => (
                <option key={floor} value={floor}>Floor {floor}</option>
              ))}
            </select>

            <div style={{ display: 'flex', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', padding: 2 }}>
              {[7, 14, 21].map(days => (
                <button
                  key={days}
                  onClick={() => setViewDays(days)}
                  style={{
                    border: 'none',
                    background: viewDays === days ? 'white' : 'transparent',
                    boxShadow: viewDays === days ? 'var(--shadow-xs)' : 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 8px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: viewDays === days ? 'var(--font-bold)' : 'var(--font-medium)',
                    color: viewDays === days ? 'var(--color-primary-600)' : 'var(--color-neutral-600)',
                    cursor: 'pointer'
                  }}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#2563EB' }} />
              <span>In-House (Checked In)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#F59E0B' }} />
              <span>Reserved (Confirmed)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#64748B' }} />
              <span>Checked Out</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
              <span>Clean</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
              <span>Dirty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rack Timeline Grid */}
      <div className="card" style={{ overflow: 'hidden', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 280px)', position: 'relative' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: viewDays * 70 + 200 }}>
            {/* Table Header: Dates */}
            <thead style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-neutral-50)' }}>
              <tr>
                {/* Pinned Room Header */}
                <th style={{
                  position: 'sticky', left: 0, zIndex: 30, background: 'var(--color-neutral-100)',
                  width: 200, minWidth: 200, padding: '10px 14px', textAlign: 'left',
                  borderBottom: '2px solid var(--color-neutral-300)', borderRight: '2px solid var(--color-neutral-300)',
                  fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-700)',
                  textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  Room / Details ({filteredRooms.length})
                </th>

                {/* Date Columns */}
                {dateRange.map((col, idx) => (
                  <th
                    key={col.iso}
                    style={{
                      width: `${100 / viewDays}%`,
                      minWidth: 64,
                      padding: '8px 4px',
                      textAlign: 'center',
                      borderBottom: '2px solid var(--color-neutral-300)',
                      borderRight: '1px solid var(--color-neutral-200)',
                      background: col.isToday
                        ? 'var(--color-primary-50)'
                        : col.isWeekend ? 'var(--color-neutral-100)' : 'var(--color-neutral-50)',
                      color: col.isToday ? 'var(--color-primary-700)' : 'var(--color-neutral-700)',
                      position: 'relative'
                    }}
                  >
                    {col.isToday && (
                      <span style={{
                        position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)',
                        fontSize: '9px', fontWeight: 'bold', background: 'var(--color-primary-600)',
                        color: 'white', padding: '1px 5px', borderRadius: 4, textTransform: 'uppercase'
                      }}>
                        Today
                      </span>
                    )}
                    <div style={{ fontSize: '11px', fontWeight: col.isToday ? 'bold' : 'normal', color: 'var(--color-neutral-500)', marginTop: col.isToday ? 10 : 0 }}>
                      {col.dayName}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: 1 }}>
                      {col.dayNum}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-neutral-400)' }}>
                      {col.monthName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: Rooms & Booking Blocks */}
            <tbody>
              {filteredRooms.map((room, roomIdx) => {
                const rt = state.roomTypes.find(t => t.id === room.typeId);
                const bookings = roomReservations[room.id] || [];

                return (
                  <tr key={room.id} style={{ height: 52 }}>
                    {/* Room Info Left Column */}
                    <td style={{
                      position: 'sticky', left: 0, zIndex: 10,
                      background: roomIdx % 2 === 0 ? 'white' : 'var(--color-neutral-50)',
                      padding: '8px 12px',
                      borderBottom: '1px solid var(--color-neutral-200)',
                      borderRight: '2px solid var(--color-neutral-300)',
                      boxShadow: '2px 0 4px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span
                            title={`Housekeeping: ${room.housekeepingStatus}`}
                            style={{
                              width: 8, height: 8, borderRadius: '50%',
                              backgroundColor: getCleanlinessColor(room.housekeepingStatus),
                              flexShrink: 0
                            }}
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                                {room.number}
                              </span>
                              <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: 4, background: 'var(--color-neutral-200)', color: 'var(--color-neutral-700)' }}>
                                F{room.floor}
                              </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                              {rt ? rt.name : 'Standard'}
                            </div>
                          </div>
                        </div>

                        <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-neutral-600)' }}>
                          {formatCurrency(room.baseRate || rt?.basePrice || 8500).split('.')[0]}
                        </span>
                      </div>
                    </td>

                    {/* Timeline Cells */}
                    {dateRange.map((col) => {
                      // Check if a reservation starts or covers this date
                      const currentBooking = bookings.find(b => {
                        return b.status !== 'cancelled' && col.iso >= b.checkIn && col.iso < b.checkOut;
                      });

                      const isCheckInDay = currentBooking && currentBooking.checkIn === col.iso;

                      return (
                        <td
                          key={col.iso}
                          onClick={() => {
                            if (currentBooking) {
                              setSelectedBooking(currentBooking);
                            } else {
                              navigate(`/app/reservations/new?roomId=${room.id}&date=${col.iso}`);
                            }
                          }}
                          style={{
                            padding: 2,
                            borderBottom: '1px solid var(--color-neutral-200)',
                            borderRight: '1px solid var(--color-neutral-200)',
                            background: col.isToday ? 'rgba(59, 130, 246, 0.04)' : col.isWeekend ? '#fafafa' : 'transparent',
                            cursor: 'pointer',
                            position: 'relative',
                            verticalAlign: 'middle'
                          }}
                        >
                          {currentBooking ? (
                            <div
                              style={{
                                background: getStatusColor(currentBooking.status).bg,
                                color: getStatusColor(currentBooking.status).text,
                                border: `1px solid ${getStatusColor(currentBooking.status).border}`,
                                height: 38,
                                borderRadius: isCheckInDay ? '6px 0 0 6px' : (col.iso === new Date(new Date(currentBooking.checkOut).setDate(new Date(currentBooking.checkOut).getDate() - 1)).toISOString().split('T')[0] ? '0 6px 6px 0' : 0),
                                padding: '4px 6px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                fontSize: '10px',
                                lineHeight: '1.2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                                transition: 'transform 0.15s ease, filter 0.15s ease'
                              }}
                              title={`${currentBooking.id} • ${currentBooking.guestName || 'Guest'} (${currentBooking.checkIn} - ${currentBooking.checkOut})`}
                            >
                              {isCheckInDay ? (
                                <>
                                  <div style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {currentBooking.guestName || (state.guests.find(g => g.id === currentBooking.guestId)?.firstName + ' ' + state.guests.find(g => g.id === currentBooking.guestId)?.lastName)}
                                  </div>
                                  <div style={{ opacity: 0.85, fontSize: '9px' }}>
                                    {currentBooking.id} • {currentBooking.nights}N
                                  </div>
                                </>
                              ) : (
                                <div style={{ height: '100%', opacity: 0.8 }} />
                              )}
                            </div>
                          ) : (
                            <div
                              className="empty-cell-hover"
                              style={{
                                height: 38,
                                borderRadius: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.15s ease',
                                color: 'var(--color-primary-500)'
                              }}
                              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                            >
                              <Plus size={14} weight="bold" />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            {/* Table Footer: Daily Occupancy summary */}
            <tfoot style={{ position: 'sticky', bottom: 0, zIndex: 25, background: 'var(--color-neutral-100)' }}>
              <tr>
                <td style={{
                  position: 'sticky', left: 0, zIndex: 30, background: 'var(--color-neutral-200)',
                  padding: '8px 12px', borderTop: '2px solid var(--color-neutral-300)',
                  borderRight: '2px solid var(--color-neutral-300)',
                  fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-800)'
                }}>
                  Daily Occupancy
                </td>
                {dailyOccupancy.map((day) => (
                  <td
                    key={day.iso}
                    style={{
                      padding: '6px 4px', textAlign: 'center',
                      borderTop: '2px solid var(--color-neutral-300)',
                      borderRight: '1px solid var(--color-neutral-200)',
                      fontSize: '11px', fontWeight: 'bold'
                    }}
                  >
                    <div style={{ color: day.pct > 70 ? 'var(--color-error)' : day.pct > 40 ? 'var(--color-warning)' : 'var(--color-success)' }}>
                      {day.pct}%
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--color-neutral-500)', fontWeight: 'normal' }}>
                      {day.occupiedCount}/{filteredRooms.length}
                    </div>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Booking Quick Peek Modal */}
      {selectedBooking && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 'var(--space-4)'
        }}>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-2xl)',
            width: '100%', maxWidth: 520, boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden', animation: 'scaleUp 0.2s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: 'var(--space-5)', borderBottom: '1px solid var(--color-neutral-200)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-800))',
              color: 'white'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 'var(--text-sm)', color: '#93C5FD' }}>
                    {selectedBooking.id}
                  </span>
                  <span className={`badge booking-badge ${selectedBooking.status}`} style={{ fontSize: '10px' }}>
                    {selectedBooking.status?.toUpperCase()}
                  </span>
                </div>
                <h3 style={{ margin: '4px 0 0', fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>
                  {selectedBooking.guestName || 'Guest Details'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Stay Dates</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-neutral-900)', marginTop: 2 }}>
                    {formatDate(selectedBooking.checkIn)} → {formatDate(selectedBooking.checkOut)}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', marginTop: 1 }}>
                    {selectedBooking.nights} Night(s)
                  </div>
                </div>

                <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Assigned Room</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-neutral-900)', marginTop: 2 }}>
                    Room {state.rooms.find(r => r.id === selectedBooking.roomId)?.number || selectedBooking.roomId}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', marginTop: 1 }}>
                    {state.roomTypes.find(rt => rt.id === selectedBooking.roomTypeId)?.name || 'Standard'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>Total Tariff:</span>
                  <div style={{ fontWeight: 'bold', fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                    {formatCurrency(selectedBooking.totalAmount)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}>Outstanding Balance:</span>
                  <div style={{ fontWeight: 'bold', fontSize: 'var(--text-base)', color: selectedBooking.balance > 0 ? 'var(--color-error)' : 'var(--color-success)' }}>
                    {formatCurrency(selectedBooking.balance || 0)}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    navigate(`/app/reservations/${selectedBooking.id}`);
                  }}
                >
                  <Eye size={16} /> Full Details
                </button>
                {selectedBooking.status === 'confirmed' && (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      navigate(`/app/check-in?resId=${selectedBooking.id}`);
                    }}
                  >
                    <Check size={16} /> Check In Now
                  </button>
                )}
                {selectedBooking.status === 'checked-in' && (
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      navigate(`/app/check-out?resId=${selectedBooking.id}`);
                    }}
                  >
                    <Door size={16} /> Check Out Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
