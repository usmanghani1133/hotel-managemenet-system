import { createContext, useContext, useReducer, useCallback } from 'react';
import {
  properties, rooms, roomTypes, guests, reservations, staff,
  housekeepingTasks, maintenanceTickets, invoices, payments,
  menuItems, menuCategories, restaurantTables, restaurantOrders,
  inventoryItems, inventoryCategories, expenses, notifications,
  auditLogs, vendors, communicationTemplates
} from '../data/demoData';

// ============================================================
// INITIAL STATE
// ============================================================
const initialState = {
  // Auth
  currentUser: {
    id: 'staff-003',
    name: 'Zahid Mehmood',
    role: 'General Manager',
    email: 'zahid.m@pchotels.pk',
    avatar: null,
  },

  // Property
  currentPropertyId: 'prop-1',
  properties,

  // Data
  rooms: [...rooms],
  roomTypes: [...roomTypes],
  guests: [...guests],
  reservations: [...reservations],
  staff: [...staff],
  housekeepingTasks: [...housekeepingTasks],
  maintenanceTickets: [...maintenanceTickets],
  invoices: [...invoices],
  payments: [...payments],
  menuItems: [...menuItems],
  menuCategories: [...menuCategories],
  restaurantTables: [...restaurantTables],
  restaurantOrders: [...restaurantOrders],
  inventoryItems: [...inventoryItems],
  inventoryCategories: [...inventoryCategories],
  expenses: [...expenses],
  notifications: [...notifications],
  auditLogs: [...auditLogs],
  vendors: [...vendors],
  communicationTemplates: [...communicationTemplates],

  // UI State
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  toasts: [],
  globalSearchOpen: false,

  // Settings
  settings: {
    currency: 'PKR',
    timezone: 'Asia/Karachi',
    dateFormat: 'DD MMM YYYY',
    taxRate: 15,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    notifications: { email: true, sms: false },
  }
};

// ============================================================
// REDUCER
// ============================================================
function appReducer(state, action) {
  switch (action.type) {
    // ---- UI ----
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'TOGGLE_MOBILE_SIDEBAR':
      return { ...state, mobileSidebarOpen: !state.mobileSidebarOpen };
    case 'CLOSE_MOBILE_SIDEBAR':
      return { ...state, mobileSidebarOpen: false };
    case 'TOGGLE_GLOBAL_SEARCH':
      return { ...state, globalSearchOpen: !state.globalSearchOpen };
    case 'SET_PROPERTY':
      return { ...state, currentPropertyId: action.payload };

    // ---- TOASTS ----
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };

    // ---- ROOMS ----
    case 'UPDATE_ROOM':
      return {
        ...state,
        rooms: state.rooms.map(r => r.id === action.payload.id ? { ...r, ...action.payload } : r)
      };
    case 'ADD_ROOM':
      return { ...state, rooms: [...state.rooms, action.payload] };

    // ---- GUESTS ----
    case 'ADD_GUEST':
      return { ...state, guests: [...state.guests, action.payload] };
    case 'UPDATE_GUEST':
      return {
        ...state,
        guests: state.guests.map(g => g.id === action.payload.id ? { ...g, ...action.payload } : g)
      };

    // ---- RESERVATIONS ----
    case 'ADD_RESERVATION':
      return { ...state, reservations: [...state.reservations, action.payload] };
    case 'UPDATE_RESERVATION':
      return {
        ...state,
        reservations: state.reservations.map(r =>
          r.id === action.payload.id ? { ...r, ...action.payload } : r
        )
      };
    case 'CHECK_IN_RESERVATION': {
      const { reservationId, roomId } = action.payload;
      const now = new Date().toISOString();
      return {
        ...state,
        reservations: state.reservations.map(r =>
          r.id === reservationId
            ? { ...r, status: 'checked-in', roomId, checkedInAt: now }
            : r
        ),
        rooms: state.rooms.map(r =>
          r.id === roomId ? { ...r, status: 'occupied', housekeepingStatus: 'occupied' } : r
        ),
        auditLogs: [{
          id: `al-${Date.now()}`,
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          action: 'CHECK_IN',
          module: 'Front Desk',
          description: `Checked in reservation ${reservationId} to Room ${roomId}`,
          previousValue: 'confirmed',
          newValue: 'checked-in',
          createdAt: now
        }, ...state.auditLogs]
      };
    }
    case 'CHECK_OUT_RESERVATION': {
      const { reservationId } = action.payload;
      const res = state.reservations.find(r => r.id === reservationId);
      const now = new Date().toISOString();
      return {
        ...state,
        reservations: state.reservations.map(r =>
          r.id === reservationId ? { ...r, status: 'checked-out', checkedOutAt: now } : r
        ),
        rooms: state.rooms.map(r =>
          r.id === res?.roomId
            ? { ...r, status: 'dirty', housekeepingStatus: 'dirty' }
            : r
        ),
        auditLogs: [{
          id: `al-${Date.now()}`,
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          action: 'CHECK_OUT',
          module: 'Front Desk',
          description: `Checked out reservation ${reservationId}`,
          previousValue: 'checked-in',
          newValue: 'checked-out',
          createdAt: now
        }, ...state.auditLogs]
      };
    }

    // ---- HOUSEKEEPING ----
    case 'UPDATE_HOUSEKEEPING_TASK':
      return {
        ...state,
        housekeepingTasks: state.housekeepingTasks.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        )
      };
    case 'ADD_HOUSEKEEPING_TASK':
      return { ...state, housekeepingTasks: [...state.housekeepingTasks, action.payload] };

    // ---- MAINTENANCE ----
    case 'UPDATE_MAINTENANCE_TICKET':
      return {
        ...state,
        maintenanceTickets: state.maintenanceTickets.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        )
      };
    case 'ADD_MAINTENANCE_TICKET':
      return { ...state, maintenanceTickets: [...state.maintenanceTickets, action.payload] };

    // ---- PAYMENTS ----
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };
    case 'UPDATE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.map(inv =>
          inv.id === action.payload.id ? { ...inv, ...action.payload } : inv
        )
      };

    // ---- NOTIFICATIONS ----
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      };

    // ---- RESTAURANT ----
    case 'ADD_RESTAURANT_ORDER':
      return { ...state, restaurantOrders: [action.payload, ...state.restaurantOrders] };
    case 'UPDATE_RESTAURANT_ORDER':
      return {
        ...state,
        restaurantOrders: state.restaurantOrders.map(o =>
          o.id === action.payload.id ? { ...o, ...action.payload } : o
        )
      };
    case 'UPDATE_TABLE':
      return {
        ...state,
        restaurantTables: state.restaurantTables.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        )
      };

    // ---- INVENTORY ----
    case 'UPDATE_INVENTORY_ITEM':
      return {
        ...state,
        inventoryItems: state.inventoryItems.map(i =>
          i.id === action.payload.id ? { ...i, ...action.payload } : i
        )
      };

    // ---- EXPENSES ----
    case 'ADD_EXPENSE':
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        )
      };

    // ---- STAFF ----
    case 'ADD_STAFF':
      return { ...state, staff: [...state.staff, action.payload] };
    case 'UPDATE_STAFF':
      return {
        ...state,
        staff: state.staff.map(s =>
          s.id === action.payload.id ? { ...s, ...action.payload } : s
        )
      };

    // ---- ROOM TYPES ----
    case 'ADD_ROOM_TYPE':
      return { ...state, roomTypes: [...state.roomTypes, action.payload] };

    // ---- SETTINGS ----
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };

    default:
      return state;
  }
}

// ============================================================
// CONTEXT
// ============================================================
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const showToast = useCallback((type, title, message, duration = 4000) => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', payload: { id, type, title, message } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), duration);
  }, []);

  const addAuditLog = useCallback((action, module, description, prev = null, next = null) => {
    // Logs are automatically added by relevant reducer cases
  }, []);

  const value = {
    state,
    dispatch,
    showToast,
    addAuditLog,
    // Convenience selectors
    currentProperty: state.properties.find(p => p.id === state.currentPropertyId),
    currentUser: state.currentUser,
    unreadNotifications: state.notifications.filter(n => !n.read).length,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
