# Hotel Management System (HotelFlow)

[![React Version](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7-red.svg)](https://reactrouter.com/)
[![CI](https://github.com/usmanghani1133/hotel-managemenet-system/actions/workflows/ci.yml/badge.svg)](https://github.com/usmanghani1133/hotel-managemenet-system/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, comprehensive **Hotel Management System** designed to streamline and automate day-to-day hospitality operations. From front desk check-in/check-out to room reservations, guest relationship management, housekeeping, billing, restaurant POS, inventory, staff management, and financial analytics, **HotelFlow** delivers an end-to-end property management system (PMS) and hotel administration software suite.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation Guide](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Key Benefits](#key-benefits)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

Managing hotel operations requires coordinating reservations, housekeeping, guest requests, inventory, billing, and staff schedules. **HotelFlow** is a full-featured **Hotel Management Software** solution built to simplify hotel administration. It provides hoteliers, property managers, and front-desk personnel with an intuitive interface and real-time operational clarity across single or multiple hotel properties.

Whether handling a sudden walk-in guest, coordinating room turnaround with housekeeping, charging a dining tab to a guest folio, or analyzing RevPAR and occupancy trends, HotelFlow provides a centralized hospitality workspace.

---

## Features

### 1. Executive Dashboard & KPI Metrics
- Real-time key performance indicators: **Occupancy Rate**, **Average Daily Rate (ADR)**, and **Revenue Per Available Room (RevPAR)**.
- Daily operational summary: Today's scheduled arrivals, departures, occupied rooms, and pending tasks.
- Visual revenue trends and weekly occupancy breakdown charts using Recharts.
- Quick action shortcuts for new bookings, guest check-in, room assignments, and maintenance requests.

### 2. Front Desk Operations & Quick Actions
- Rapid front desk counter view tailored for front-office receptionists.
- Instant search and filtering of checked-in guests, pending arrivals, and due check-outs.
- One-click room status transitions and rapid key issuance workflows.

### 3. Hotel Reservation & Booking System
- Comprehensive reservation lifecycle management (**Confirmed**, **Checked In**, **Checked Out**, **Cancelled**).
- Multi-step **New Reservation Wizard** with guest details, room selection, occupancy specification, special requests, and advance payment recording.
- Detailed reservation view with billing breakdown, room allocation, and activity timeline.

### 4. Interactive Room Calendar & Timeline Matrix
- Grid-based visual reservation timeline across custom date ranges.
- Quick visual identification of room statuses (Available, Booked, Checked In, Maintenance).
- Fast date navigation and date picker filtering.

### 5. Room Management System
- Live room directory with status badges: **Available**, **Occupied**, **Dirty**, **Cleaning**, **Maintenance**, and **Reserved**.
- Filter rooms by floor, room type, occupancy, and status.
- Detailed room profiles displaying amenities, bed configurations, pricing, and historical stay records.

### 6. Room Types & Rate Management
- Configure multiple room tiers (e.g., Standard Room, Deluxe Room, Executive Suite, Junior Suite, Presidential Suite).
- Manage base rates, weekend surcharges, maximum adult/child occupancy limits, room dimensions (sqft), and amenity catalogs.

### 7. Guest Management System (CRM)
- Centralized guest profiles with full contact information, VIP tier tags (Standard, Silver, Gold, Platinum), and identification records (CNIC / Passport).
- Stay history records, special preferences (e.g., non-smoking, high floor, feather pillows), and cumulative spend tracking.

### 8. Streamlined Check-In & Check-Out Workflows
- **Check-In**: Guest identity verification, room assignment, advance deposit processing, and automated room status change to Occupied.
- **Check-Out**: Comprehensive folio audit, outstanding balance reconciliation, payment capture, invoice generation, and room status change to Dirty for housekeeping.

### 9. Hotel Billing & Multi-Method Payment System
- Itemized guest folios detailing room charges, meals, laundry, mini-bar, and supplementary services.
- Automated tax calculation (e.g., GST / service tax) and discount application.
- Multi-channel payment recording: Cash, Credit/Debit Card, Bank Transfer, and mobile wallets (JazzCash, EasyPaisa).
- Invoice generation with printable payment summaries and transaction histories.

### 10. Housekeeping & Room Turnaround Management
- Real-time housekeeping boards with task assignment by room and floor.
- Task prioritization (**Urgent**, **High**, **Normal**) and status transitions (**Dirty**, **Cleaning**, **Clean**, **Inspected**).
- Assign specific staff members to cleaning orders with time logging.

### 11. Maintenance & Facility Work Orders
- Facility issue tracking with category tags (Plumbing, Electrical, HVAC, Carpentry, Electronics).
- Priority-based maintenance tickets with status tracking (**Open**, **In Progress**, **Resolved**).
- Assigned technician tracking and repair resolution notes.

### 12. Restaurant & Food & Beverage POS
- Restaurant dining table management with real-time seating and status.
- Categorized food and beverage menus with pricing and availability.
- Order management with the ability to settle immediately or charge directly to a guest room folio.

### 13. Inventory & Stock Management
- Real-time inventory tracking across categories: Linens, Guest Toiletries, F&B Supplies, Cleaning Chemicals, and Equipment.
- Minimum stock threshold warnings and automatic low-stock indicators.
- Unit-of-measure tracking, supplier details, and item location data.

### 14. Vendors & Purchase Orders
- Comprehensive vendor directory with contact points, service categories, and payment terms.
- Purchase order management with status workflow (**Draft**, **Ordered**, **Received**, **Cancelled**).

### 15. Expense & Financial Tracking
- Record operational expenditures across categories (Utilities, Payroll, Repairs, F&B Supplies, Marketing).
- Payment method recording and vendor cross-referencing.
- Expense vs. revenue comparison for financial health visibility.

### 16. Staff Management & Human Resources
- Employee directory covering Front Office, Housekeeping, F&B, Maintenance, Security, and Executive Management.
- Role management, contact details, hire dates, shift assignments, and salary records.

### 17. Staff Attendance Management
- Daily clock-in and clock-out logs.
- Attendance status tracking: **Present**, **Late**, **Absent**, and **On Leave**.
- Punctuality metrics and monthly shift tracking.

### 18. Analytics & Operational Reports
- In-depth business analytics: Occupancy trends, RevPAR, ADR, monthly revenue breakdowns, and expense ratios.
- Filterable date ranges and performance summaries for management reviews.

### 19. Guest Communication & Messaging
- Pre-built templates for booking confirmations, pre-arrival notices, check-in greetings, and feedback requests.
- Communication logs tracking SMS and email interactions.

### 20. Multi-Property Support & System Settings
- Support for managing multiple hotel properties under a unified platform.
- Configurable settings: Currency (PKR ₨, USD, EUR, etc.), timezones, check-in/out default times, tax percentages, and audit logs.

---

## Technologies Used

| Category | Technology | Description |
|---|---|---|
| **Core Framework** | [React 19](https://react.dev/) | High-performance user interface library |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Next-generation fast frontend tooling and dev server |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) | Declarative client-side routing and navigation |
| **Data Visualization** | [Recharts v3](https://recharts.org/) | Responsive charting library for revenue & occupancy analytics |
| **Iconography** | [Phosphor Icons](https://phosphoricons.com/) | Flexible and consistent icon library |
| **Date Manipulation** | [date-fns v4](https://date-fns.org/) | Modern, lightweight date utility library |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) | Modular drag-and-drop utilities for Kanban & reordering |
| **Code Quality** | [Oxlint](https://oxc.rs/) | High-performance JavaScript/React linter |
| **Styling** | Vanilla Modular CSS | Custom CSS variables, responsive design, and glassmorphic UI |

---

## Project Structure

```
Hotel Management System/
├── hotelflow/                     # Frontend Application Directory
│   ├── public/                    # Static assets & SVG icons
│   │   ├── favicon.svg            # HotelFlow application favicon
│   │   └── icons.svg              # SVG sprite icons
│   ├── src/                       # Application source code
│   │   ├── assets/                # Media assets & hero graphics
│   │   ├── components/            # Reusable UI components
│   │   │   └── Layout.jsx         # Sidebar, Topbar, Global Search, Toast system
│   │   ├── context/               # State management
│   │   │   └── AppContext.jsx     # Global Context API & action dispatchers
│   │   ├── data/                  # Domain mock data & initial state
│   │   │   └── demoData.js        # Properties, rooms, guests, bookings, menu, etc.
│   │   ├── pages/                 # 38 Modular page views
│   │   │   ├── Dashboard.jsx      # Executive KPI overview
│   │   │   ├── FrontDesk.jsx      # Front desk operations
│   │   │   ├── Reservations.jsx   # Booking management
│   │   │   ├── RoomCalendar.jsx   # Visual reservation timeline
│   │   │   ├── Rooms.jsx          # Room inventory & statuses
│   │   │   ├── RoomTypes.jsx      # Room categories & pricing
│   │   │   ├── Guests.jsx         # Guest directory & profiles
│   │   │   ├── CheckIn.jsx        # Arrival check-in workflow
│   │   │   ├── CheckOut.jsx       # Departure billing & check-out
│   │   │   ├── Billing.jsx        # Folios, invoices & charges
│   │   │   ├── Payments.jsx       # Multi-method payment log
│   │   │   ├── Housekeeping.jsx   # Room cleaning boards
│   │   │   ├── Maintenance.jsx    # Facility maintenance tickets
│   │   │   ├── Restaurant.jsx     # F&B table & order management
│   │   │   ├── Inventory.jsx      # Stock & supply control
│   │   │   ├── Vendors.jsx        # Supplier directory
│   │   │   ├── Purchases.jsx      # Purchase orders
│   │   │   ├── Expenses.jsx       # Operational expenditures
│   │   │   ├── Staff.jsx          # Employee directory
│   │   │   ├── Attendance.jsx     # Shift & attendance tracking
│   │   │   ├── Reports.jsx        # Operational reports
│   │   │   ├── Analytics.jsx      # Revenue & occupancy analytics
│   │   │   ├── Settings.jsx       # Property & system configuration
│   │   │   └── ...                # Other dedicated views
│   │   ├── App.css                # Application-specific styling
│   │   ├── App.jsx                # Main route definitions & application shell
│   │   ├── index.css              # Global styles, variables, typography, reset
│   │   └── main.jsx               # Application entry point
│   ├── index.html                 # HTML5 template
│   ├── package.json               # NPM package manifest & scripts
│   ├── vite.config.js             # Vite configuration
│   └── .oxlintrc.json             # Oxlint configuration
├── .gitignore                     # Git ignore rules for node_modules, build, secrets
└── README.md                      # Project documentation
```

---

## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version `18.0.0` or higher recommended)
- [npm](https://www.npmjs.com/) (version `9.0.0` or higher) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hotel-management-system.git
   cd hotel-management-system
   ```

2. **Navigate to the application folder:**
   ```bash
   cd hotelflow
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Configuration

The application is pre-configured with a comprehensive local dataset for demonstration and evaluation.

To configure optional environment variables in the future, create a `.env` file inside the `hotelflow/` directory:

```env
# Optional Environment Configurations
VITE_APP_TITLE=HotelFlow
VITE_DEFAULT_CURRENCY=PKR
VITE_API_BASE_URL=http://localhost:5000/api
```

> **Note:** Never commit `.env` or sensitive credential files to source control. A `.gitignore` file is included to keep your credentials secure.

---

## Running the Project

All commands should be executed from within the `hotelflow` directory:

### Start Development Server
```bash
npm run dev
```
The application will start locally at `http://localhost:5173/` (or the next available port) with Hot Module Replacement (HMR).

### Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
The compiled output will be placed in the `hotelflow/dist/` directory.

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

### Run Code Linter
To verify code formatting and identify potential issues:
```bash
npm run lint
```

---

## Key Benefits

- **All-in-One Operations**: Replaces fragmented spreadsheets and disparate software with a unified hotel operations management system.
- **Improved Guest Satisfaction**: Faster check-in and check-out processing, personalized guest profiles, and quick response times.
- **Accurate Financial Records**: Transparent folios, multi-method payment capture, automated tax computation, and expense logging eliminate billing discrepancies.
- **Seamless Departmental Coordination**: Real-time room status updates connect front desk receptionists with housekeeping teams instantly.
- **Data-Driven Decision Making**: Clear visualization of RevPAR, ADR, and occupancy patterns empowers hotel owners to optimize room rates and maximize profitability.

---

## Future Improvements

- [ ] **Backend API Integration**: Connect to a robust backend (Node.js/Express, Python/FastAPI, or Go) with PostgreSQL/MongoDB persistence.
- [ ] **Payment Gateway Integration**: Direct integration with payment gateways (Stripe, PayPal, local banking APIs) for real-time card processing.
- [ ] **Public Booking Engine**: Guest-facing online booking widget for direct website reservations.
- [ ] **OTA Channel Manager**: Real-time two-way synchronization with Booking.com, Expedia, Airbnb, and Agoda.
- [ ] **Mobile Companion App**: Progressive Web App (PWA) or dedicated mobile app for housekeeping and maintenance staff.
- [ ] **Keycard Encoder Integration**: Hardware integration for RFID and digital door lock systems.

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software for personal and commercial projects.
