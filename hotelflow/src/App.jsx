import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Sidebar, Topbar, ToastContainer, GlobalSearch } from './components/Layout';
import { useApp } from './context/AppContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FrontDesk from './pages/FrontDesk';
import Reservations from './pages/Reservations';
import ReservationDetail from './pages/ReservationDetail';
import NewReservation from './pages/NewReservation';
import RoomCalendar from './pages/RoomCalendar';
import Guests from './pages/Guests';
import GuestDetail from './pages/GuestDetail';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import RoomTypes from './pages/RoomTypes';
import CheckIn from './pages/CheckIn';
import CheckOut from './pages/CheckOut';
import Billing from './pages/Billing';
import Payments from './pages/Payments';
import Housekeeping from './pages/Housekeeping';
import Maintenance from './pages/Maintenance';
import Services from './pages/Services';
import Restaurant from './pages/Restaurant';
import Inventory from './pages/Inventory';
import Vendors from './pages/Vendors';
import Purchases from './pages/Purchases';
import Expenses from './pages/Expenses';
import Staff from './pages/Staff';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Communication from './pages/Communication';
import Properties from './pages/Properties';
import Users from './pages/Users';
import AuditLogs from './pages/AuditLogs';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';

// App Shell Layout
function AppShell() {
  const { state } = useApp();
  const { sidebarCollapsed } = state;

  return (
    <div className="app-layout">
      <Sidebar />
      <GlobalSearch />
      <ToastContainer />
      <main className={`app-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Topbar />
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <AppProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* App routes */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="front-desk" element={<FrontDesk />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="reservations/new" element={<NewReservation />} />
            <Route path="reservations/:id" element={<ReservationDetail />} />
            <Route path="calendar" element={<RoomCalendar />} />
            <Route path="guests" element={<Guests />} />
            <Route path="guests/:id" element={<GuestDetail />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:id" element={<RoomDetail />} />
            <Route path="room-types" element={<RoomTypes />} />
            <Route path="check-in" element={<CheckIn />} />
            <Route path="check-out" element={<CheckOut />} />
            <Route path="billing" element={<Billing />} />
            <Route path="payments" element={<Payments />} />
            <Route path="housekeeping" element={<Housekeeping />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="services" element={<Services />} />
            <Route path="restaurant" element={<Restaurant />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="staff" element={<Staff />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="communication" element={<Communication />} />
            <Route path="properties" element={<Properties />} />
            <Route path="users" element={<Users />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
