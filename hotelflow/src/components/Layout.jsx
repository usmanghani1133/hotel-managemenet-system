import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  House, CalendarBlank, Users, Door, Bed, Broom, Wrench,
  Receipt, CreditCard, ForkKnife, Package, Truck, Money,
  ChartBar, Bell, Gear, SignOut, CaretDown, List, X,
  MagnifyingGlass, Buildings, UserCircle, ShieldCheck,
  ClipboardText, Envelope, CurrencyDollar, FileText,
  WarningCircle, CheckCircle, Info, XCircle, SpinnerGap,
  Star, Storefront, Calendar, ArrowRight, HandCoins
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

// ============================================================
// SIDEBAR
// ============================================================
const navSections = [
  {
    label: 'Operations',
    items: [
      { to: '/app/dashboard', icon: House, label: 'Dashboard' },
      { to: '/app/front-desk', icon: Door, label: 'Front Desk', badge: 3 },
      { to: '/app/reservations', icon: CalendarBlank, label: 'Reservations' },
      { to: '/app/calendar', icon: Calendar, label: 'Room Calendar' },
    ]
  },
  {
    label: 'Guests & Rooms',
    items: [
      { to: '/app/guests', icon: Users, label: 'Guests' },
      { to: '/app/rooms', icon: Bed, label: 'Rooms' },
      { to: '/app/room-types', icon: Buildings, label: 'Room Types' },
    ]
  },
  {
    label: 'Services',
    items: [
      { to: '/app/housekeeping', icon: Broom, label: 'Housekeeping', badge: 2 },
      { to: '/app/maintenance', icon: Wrench, label: 'Maintenance', badge: 1 },
      { to: '/app/services', icon: Star, label: 'Hotel Services' },
    ]
  },
  {
    label: 'Revenue',
    items: [
      { to: '/app/billing', icon: Receipt, label: 'Billing' },
      { to: '/app/payments', icon: CreditCard, label: 'Payments' },
      { to: '/app/restaurant', icon: ForkKnife, label: 'Restaurant / POS' },
    ]
  },
  {
    label: 'Procurement',
    items: [
      { to: '/app/inventory', icon: Package, label: 'Inventory', badge: 2 },
      { to: '/app/vendors', icon: Truck, label: 'Vendors' },
      { to: '/app/purchases', icon: HandCoins, label: 'Purchases' },
      { to: '/app/expenses', icon: Money, label: 'Expenses' },
    ]
  },
  {
    label: 'Staff',
    items: [
      { to: '/app/staff', icon: UserCircle, label: 'Staff' },
      { to: '/app/attendance', icon: ClipboardText, label: 'Attendance' },
    ]
  },
  {
    label: 'Analytics',
    items: [
      { to: '/app/reports', icon: FileText, label: 'Reports' },
      { to: '/app/analytics', icon: ChartBar, label: 'Analytics' },
    ]
  },
  {
    label: 'Administration',
    items: [
      { to: '/app/properties', icon: Buildings, label: 'Properties' },
      { to: '/app/users', icon: Users, label: 'Users & Roles' },
      { to: '/app/notifications', icon: Bell, label: 'Notifications' },
      { to: '/app/communication', icon: Envelope, label: 'Communication' },
      { to: '/app/audit-logs', icon: ShieldCheck, label: 'Audit Logs' },
      { to: '/app/subscription', icon: CurrencyDollar, label: 'Subscription' },
      { to: '/app/settings', icon: Gear, label: 'Settings' },
    ]
  }
];

export function Sidebar() {
  const { state, dispatch, currentProperty } = useApp();
  const { sidebarCollapsed, mobileSidebarOpen } = state;
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent background scrolling when mobile sidebar drawer is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${mobileSidebarOpen ? 'visible' : ''}`}
        onClick={() => dispatch({ type: 'CLOSE_MOBILE_SIDEBAR' })}
      />

      <aside className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Buildings size={18} color="white" weight="fill" />
          </div>
          {!sidebarCollapsed && (
            <div className="sidebar-logo-text">
              <div className="brand-name">HotelFlow</div>
              <div className="brand-sub">Management Platform</div>
            </div>
          )}
        </div>

        {/* Property Switcher */}
        {!sidebarCollapsed && (
          <div className="sidebar-property-switcher">
            <button className="property-switcher-btn" onClick={() => navigate('/app/properties')}>
              <Storefront size={14} style={{ flexShrink: 0 }} />
              <span className="property-name">{currentProperty?.shortName || 'Select Property'}</span>
              <CaretDown size={12} />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navSections.map(section => (
            <div key={section.label} className="nav-section">
              {!sidebarCollapsed && (
                <div className="nav-section-label">{section.label}</div>
              )}
              {section.items.map(item => {
                const isActive = location.pathname === item.to ||
                  (item.to !== '/app/dashboard' && location.pathname.startsWith(item.to));
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    title={sidebarCollapsed ? item.label : ''}
                    onClick={() => dispatch({ type: 'CLOSE_MOBILE_SIDEBAR' })}
                  >
                    <item.icon
                      size={18}
                      className="nav-item-icon"
                      weight={isActive ? 'fill' : 'regular'}
                    />
                    {!sidebarCollapsed && (
                      <>
                        <span className="nav-item-text">{item.label}</span>
                        {item.badge && (
                          <span className="nav-item-badge">{item.badge}</span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <Link to="/app/profile" className="nav-item" onClick={() => dispatch({ type: 'CLOSE_MOBILE_SIDEBAR' })}>
            <UserCircle size={18} className="nav-item-icon" />
            {!sidebarCollapsed && <span className="nav-item-text">Profile</span>}
          </Link>
          <Link to="/login" className="nav-item" onClick={() => dispatch({ type: 'CLOSE_MOBILE_SIDEBAR' })}>
            <SignOut size={18} className="nav-item-icon" />
            {!sidebarCollapsed && <span className="nav-item-text">Sign Out</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}

// ============================================================
// TOPBAR
// ============================================================
const breadcrumbMap = {
  '/app/dashboard': ['Dashboard'],
  '/app/front-desk': ['Front Desk'],
  '/app/reservations': ['Reservations'],
  '/app/calendar': ['Room Calendar'],
  '/app/guests': ['Guests'],
  '/app/rooms': ['Rooms'],
  '/app/room-types': ['Room Types'],
  '/app/housekeeping': ['Housekeeping'],
  '/app/maintenance': ['Maintenance'],
  '/app/services': ['Hotel Services'],
  '/app/billing': ['Billing'],
  '/app/payments': ['Payments'],
  '/app/restaurant': ['Restaurant / POS'],
  '/app/inventory': ['Inventory'],
  '/app/vendors': ['Vendors'],
  '/app/purchases': ['Purchases'],
  '/app/expenses': ['Expenses'],
  '/app/staff': ['Staff'],
  '/app/attendance': ['Attendance'],
  '/app/reports': ['Reports'],
  '/app/analytics': ['Analytics'],
  '/app/notifications': ['Notifications'],
  '/app/communication': ['Communication'],
  '/app/audit-logs': ['Audit Logs'],
  '/app/subscription': ['Subscription'],
  '/app/settings': ['Settings'],
  '/app/profile': ['Profile'],
  '/app/properties': ['Properties'],
  '/app/users': ['Users & Roles'],
  '/app/help': ['Help Center'],
};

export function Topbar() {
  const { state, dispatch, currentUser, unreadNotifications } = useApp();
  const { sidebarCollapsed } = state;
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const crumbs = breadcrumbMap[location.pathname] || ['Page'];

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2);

  const handleToggleMenu = () => {
    if (window.innerWidth <= 1024) {
      dispatch({ type: 'TOGGLE_MOBILE_SIDEBAR' });
    } else {
      dispatch({ type: 'TOGGLE_SIDEBAR' });
    }
  };

  return (
    <header className="app-topbar">
      {/* Navigation menu toggle */}
      <button
        className="topbar-toggle-btn"
        onClick={handleToggleMenu}
        aria-label="Toggle navigation menu"
        id="mobile-menu-btn"
      >
        <List size={20} />
      </button>

      {/* Breadcrumbs */}
      <div className="topbar-breadcrumbs">
        {crumbs.map((crumb, i) => (
          <div key={i} className={`breadcrumb-item ${i === crumbs.length - 1 ? 'current' : ''}`}>
            {i > 0 && <ArrowRight size={12} />}
            <span>{crumb}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div
        className="topbar-search"
        onClick={() => dispatch({ type: 'TOGGLE_GLOBAL_SEARCH' })}
      >
        <MagnifyingGlass size={16} color="var(--color-neutral-400)" />
        <input
          type="text"
          placeholder="Search anything... (⌘K)"
          readOnly
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        <button
          className="topbar-icon-btn"
          onClick={() => navigate('/app/notifications')}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadNotifications > 0 && <span className="badge" />}
        </button>

        {/* User Menu */}
        <div className="dropdown-wrapper" ref={userMenuRef}>
          <div
            className="topbar-avatar"
            onClick={() => setShowUserMenu(!showUserMenu)}
            title={currentUser.name}
          >
            {initials}
          </div>
          {showUserMenu && (
            <div className="dropdown-menu" style={{ minWidth: 200 }}>
              <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 2 }}>
                  {currentUser.role}
                </div>
              </div>
              <button className="dropdown-item" onClick={() => { navigate('/app/profile'); setShowUserMenu(false); }}>
                <UserCircle size={15} />
                My Profile
              </button>
              <button className="dropdown-item" onClick={() => { navigate('/app/settings'); setShowUserMenu(false); }}>
                <Gear size={15} />
                Settings
              </button>
              <div className="dropdown-divider" />
              <button className="dropdown-item danger" onClick={() => navigate('/login')}>
                <SignOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ============================================================
// TOAST CONTAINER
// ============================================================
const iconMap = {
  success: <CheckCircle size={18} color="var(--color-success)" weight="fill" />,
  error: <XCircle size={18} color="var(--color-error)" weight="fill" />,
  warning: <WarningCircle size={18} color="var(--color-warning)" weight="fill" />,
  info: <Info size={18} color="var(--color-info)" weight="fill" />,
};

export function ToastContainer() {
  const { state, dispatch } = useApp();
  const { toasts } = state;

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`} role="alert">
          <div className="toast-icon">{iconMap[toast.type] || iconMap.info}</div>
          <div className="toast-content">
            {toast.title && <div className="toast-title">{toast.title}</div>}
            {toast.message && <div className="toast-message">{toast.message}</div>}
          </div>
          <button
            className="toast-close"
            onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// GLOBAL SEARCH MODAL
// ============================================================
export function GlobalSearch() {
  const { state, dispatch } = useApp();
  const { globalSearchOpen, guests, reservations, rooms } = state;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (globalSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [globalSearchOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const guestResults = guests
      .filter(g => `${g.firstName} ${g.lastName} ${g.email} ${g.phone}`.toLowerCase().includes(q))
      .slice(0, 3)
      .map(g => ({ type: 'Guest', label: `${g.firstName} ${g.lastName}`, sub: g.email, to: `/app/guests/${g.id}` }));

    const resResults = reservations
      .filter(r => r.id.toLowerCase().includes(q) || r.confirmationNo.toLowerCase().includes(q))
      .slice(0, 3)
      .map(r => ({ type: 'Reservation', label: r.id, sub: `${r.status} — ${r.checkIn} to ${r.checkOut}`, to: `/app/reservations/${r.id}` }));

    const roomResults = rooms
      .filter(r => r.number.toLowerCase().includes(q))
      .slice(0, 3)
      .map(r => ({ type: 'Room', label: `Room ${r.number}`, sub: `Floor ${r.floor} — ${r.status}`, to: `/app/rooms/${r.id}` }));

    setResults([...guestResults, ...resResults, ...roomResults]);
  }, [query, guests, reservations, rooms]);

  if (!globalSearchOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => { dispatch({ type: 'TOGGLE_GLOBAL_SEARCH' }); setQuery(''); }}>
      <div
        className="modal modal-md"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '70vh' }}
      >
        <div className="modal-header" style={{ padding: 'var(--space-4) var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1 }}>
            <MagnifyingGlass size={18} color="var(--color-neutral-400)" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search guests, reservations, rooms..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                border: 'none', outline: 'none', flex: 1,
                fontSize: 'var(--text-base)', fontFamily: 'var(--font-sans)',
                color: 'var(--color-neutral-800)', background: 'none'
              }}
            />
          </div>
          <button className="modal-close" onClick={() => { dispatch({ type: 'TOGGLE_GLOBAL_SEARCH' }); setQuery(''); }}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body" style={{ padding: results.length ? 'var(--space-2) 0' : 'var(--space-8) var(--space-6)' }}>
          {!query && (
            <div className="empty-state" style={{ padding: 'var(--space-8) 0' }}>
              <div className="empty-state-icon"><MagnifyingGlass size={28} /></div>
              <div className="empty-state-title">Global Search</div>
              <div className="empty-state-desc">Search across guests, reservations, rooms, invoices and more</div>
            </div>
          )}
          {query && results.length === 0 && (
            <div className="empty-state" style={{ padding: 'var(--space-8) 0' }}>
              <div className="empty-state-desc">No results found for "{query}"</div>
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={i}
              className="dropdown-item"
              style={{ width: '100%', padding: 'var(--space-3) var(--space-5)' }}
              onClick={() => {
                navigate(r.to);
                dispatch({ type: 'TOGGLE_GLOBAL_SEARCH' });
                setQuery('');
              }}
            >
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)',
                background: 'var(--color-primary-50)', color: 'var(--color-primary-600)',
                padding: '2px 6px', borderRadius: 'var(--radius-sm)', flexShrink: 0
              }}>{r.type}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--color-neutral-800)', fontSize: 'var(--text-sm)' }}>
                  {r.label}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 1 }}>
                  {r.sub}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODAL COMPONENT
// ============================================================
export function Modal({ isOpen, onClose, title, size = 'md', children, footer }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${size}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ============================================================
// STATUS BADGE COMPONENT
// ============================================================
export function StatusBadge({ status, type = 'room' }) {
  const labels = {
    room: {
      available: 'Available', occupied: 'Occupied', reserved: 'Reserved',
      dirty: 'Dirty', cleaning: 'Cleaning', maintenance: 'Maintenance',
      inspected: 'Inspected', 'out-of-service': 'Out of Service'
    },
    booking: {
      inquiry: 'Inquiry', pending: 'Pending', confirmed: 'Confirmed',
      'checked-in': 'Checked In', 'checked-out': 'Checked Out',
      cancelled: 'Cancelled', 'no-show': 'No Show'
    }
  };

  const label = labels[type]?.[status] || status;

  return (
    <span className={`status-badge ${status}`}>
      {label}
    </span>
  );
}

// ============================================================
// STAT CARD
// ============================================================
export function KpiCard({ label, value, change, changeLabel, icon: Icon, accentColor, iconBg, period }) {
  return (
    <div className="kpi-card" style={{ '--kpi-accent': accentColor, '--kpi-icon-bg': iconBg }}>
      <div className="kpi-header">
        <div className="kpi-label">{label}</div>
        {Icon && (
          <div className="kpi-icon">
            <Icon size={16} weight="bold" />
          </div>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-meta">
        {change !== undefined && (
          <span className={`kpi-change ${change >= 0 ? 'positive' : 'negative'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
        {period && <span className="kpi-period">{period}</span>}
        {changeLabel && <span className="kpi-period">{changeLabel}</span>}
      </div>
    </div>
  );
}

// ============================================================
// LOADING SKELETON
// ============================================================
export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card" style={{ padding: 'var(--space-5)' }}>
      <div className="skeleton" style={{ height: 20, width: '60%', marginBottom: 'var(--space-3)' }} />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton" style={{
          height: 14,
          width: i === lines - 1 ? '40%' : '100%',
          marginBottom: i === lines - 1 ? 0 : 'var(--space-2)'
        }} />
      ))}
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {Icon && <Icon size={28} />}
      </div>
      <div className="empty-state-title">{title}</div>
      {description && <div className="empty-state-desc">{description}</div>}
      {action}
    </div>
  );
}

// ============================================================
// LOADING SPINNER
// ============================================================
export function Spinner({ size = 20 }) {
  return (
    <SpinnerGap
      size={size}
      style={{ animation: 'spin 0.8s linear infinite', color: 'var(--color-primary-500)' }}
    />
  );
}

// ============================================================
// CONFIRM DIALOG
// ============================================================
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm"
      footer={
        <>
          <button className="btn btn-secondary btn-md" onClick={onClose}>Cancel</button>
          <button
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'} btn-md`}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p style={{ color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>{message}</p>
    </Modal>
  );
}
