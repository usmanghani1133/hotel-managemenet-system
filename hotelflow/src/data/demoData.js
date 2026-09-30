// ============================================================
// HotelFlow — Complete Demo Data
// Realistic Pakistani hotel context with PKR currency
// ============================================================

export const CURRENCY = { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' };

// ============================================================
// PROPERTIES
// ============================================================
export const properties = [
  {
    id: 'prop-1',
    name: 'Pearl Continental Islamabad',
    shortName: 'PC Islamabad',
    address: 'Club Road, Islamabad, Pakistan',
    phone: '+92-51-2279011',
    email: 'islamabad@pchotels.pk',
    type: 'Business Hotel',
    totalRooms: 42,
    floors: 8,
    starRating: 5,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    currency: 'PKR',
    timezone: 'Asia/Karachi',
    logo: null,
    active: true
  },
  {
    id: 'prop-2',
    name: 'Serena Hotel Lahore',
    shortName: 'Serena Lahore',
    address: '73-W, Ferozepur Road, Lahore, Pakistan',
    phone: '+92-42-35756000',
    email: 'lahore@serenahotels.pk',
    type: 'Luxury Hotel',
    totalRooms: 28,
    floors: 5,
    starRating: 5,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    currency: 'PKR',
    timezone: 'Asia/Karachi',
    logo: null,
    active: true
  }
];

// ============================================================
// ROOM TYPES
// ============================================================
export const roomTypes = [
  {
    id: 'rt-1',
    propertyId: 'prop-1',
    name: 'Standard Room',
    code: 'STD',
    description: 'Comfortable standard room with city view, queen bed and modern amenities',
    basePrice: 8500,
    weekendPrice: 10000,
    maxAdults: 2,
    maxChildren: 1,
    maxOccupancy: 3,
    bedType: 'Queen',
    sizeSqft: 320,
    amenities: ['AC', 'WiFi', 'TV', 'Minibar', 'Safe', 'Iron'],
    images: [],
    roomCount: 12,
    active: true
  },
  {
    id: 'rt-2',
    propertyId: 'prop-1',
    name: 'Deluxe Room',
    code: 'DLX',
    description: 'Spacious deluxe room with panoramic views and premium furnishings',
    basePrice: 12500,
    weekendPrice: 15000,
    maxAdults: 2,
    maxChildren: 2,
    maxOccupancy: 4,
    bedType: 'King',
    sizeSqft: 450,
    amenities: ['AC', 'WiFi', 'TV', 'Minibar', 'Safe', 'Iron', 'Bathrobe', 'Slippers'],
    images: [],
    roomCount: 14,
    active: true
  },
  {
    id: 'rt-3',
    propertyId: 'prop-1',
    name: 'Executive Room',
    code: 'EXE',
    description: 'Executive room with lounge access, premium bedding and business amenities',
    basePrice: 18000,
    weekendPrice: 22000,
    maxAdults: 2,
    maxChildren: 2,
    maxOccupancy: 4,
    bedType: 'King',
    sizeSqft: 560,
    amenities: ['AC', 'WiFi', 'TV', 'Minibar', 'Safe', 'Iron', 'Bathrobe', 'Slippers', 'Lounge Access', 'Butler Service'],
    images: [],
    roomCount: 8,
    active: true
  },
  {
    id: 'rt-4',
    propertyId: 'prop-1',
    name: 'Junior Suite',
    code: 'JSU',
    description: 'Elegant junior suite with separate sitting area and luxurious bathroom',
    basePrice: 28000,
    weekendPrice: 35000,
    maxAdults: 2,
    maxChildren: 2,
    maxOccupancy: 4,
    bedType: 'King',
    sizeSqft: 720,
    amenities: ['AC', 'WiFi', 'TV', 'Minibar', 'Safe', 'Jacuzzi', 'Bathrobe', 'Slippers', 'Lounge Access', 'Butler Service', 'Sitting Area'],
    images: [],
    roomCount: 6,
    active: true
  },
  {
    id: 'rt-5',
    propertyId: 'prop-1',
    name: 'Presidential Suite',
    code: 'PSU',
    description: 'The pinnacle of luxury — sprawling Presidential Suite with private dining room and 360° views',
    basePrice: 85000,
    weekendPrice: 95000,
    maxAdults: 4,
    maxChildren: 2,
    maxOccupancy: 6,
    bedType: 'Super King',
    sizeSqft: 1800,
    amenities: ['AC', 'WiFi', '2x TV', 'Full Minibar', 'Safe', 'Jacuzzi', 'Bathrobe', 'Slippers', 'Private Lounge', 'Personal Butler', 'Private Dining', 'Piano'],
    images: [],
    roomCount: 2,
    active: true
  }
];

// ============================================================
// ROOMS
// ============================================================
export const rooms = [
  // Floor 1 - Standard Rooms
  { id: 'rm-101', number: '101', floor: 1, typeId: 'rt-1', propertyId: 'prop-1', status: 'available', housekeepingStatus: 'clean', bedType: 'Queen', view: 'Garden', maxOccupancy: 3, notes: '' },
  { id: 'rm-102', number: '102', floor: 1, typeId: 'rt-1', propertyId: 'prop-1', status: 'occupied', housekeepingStatus: 'occupied', bedType: 'Queen', view: 'Garden', maxOccupancy: 3, notes: '' },
  { id: 'rm-103', number: '103', floor: 1, typeId: 'rt-1', propertyId: 'prop-1', status: 'reserved', housekeepingStatus: 'clean', bedType: 'Twin', view: 'Garden', maxOccupancy: 3, notes: '' },
  { id: 'rm-104', number: '104', floor: 1, typeId: 'rt-1', propertyId: 'prop-1', status: 'dirty', housekeepingStatus: 'dirty', bedType: 'Queen', view: 'Garden', maxOccupancy: 3, notes: 'Late checkout yesterday' },
  { id: 'rm-105', number: '105', floor: 1, typeId: 'rt-1', propertyId: 'prop-1', status: 'available', housekeepingStatus: 'inspected', bedType: 'Queen', view: 'City', maxOccupancy: 3, notes: '' },
  // Floor 2 - Deluxe Rooms
  { id: 'rm-201', number: '201', floor: 2, typeId: 'rt-2', propertyId: 'prop-1', status: 'occupied', housekeepingStatus: 'occupied', bedType: 'King', view: 'City', maxOccupancy: 4, notes: '' },
  { id: 'rm-202', number: '202', floor: 2, typeId: 'rt-2', propertyId: 'prop-1', status: 'available', housekeepingStatus: 'clean', bedType: 'King', view: 'City', maxOccupancy: 4, notes: '' },
  { id: 'rm-203', number: '203', floor: 2, typeId: 'rt-2', propertyId: 'prop-1', status: 'occupied', housekeepingStatus: 'occupied', bedType: 'King', view: 'Mountain', maxOccupancy: 4, notes: 'VIP Guest' },
  { id: 'rm-204', number: '204', floor: 2, typeId: 'rt-2', propertyId: 'prop-1', status: 'cleaning', housekeepingStatus: 'cleaning', bedType: 'King', view: 'Mountain', maxOccupancy: 4, notes: '' },
  { id: 'rm-205', number: '205', floor: 2, typeId: 'rt-2', propertyId: 'prop-1', status: 'reserved', housekeepingStatus: 'clean', bedType: 'Twin', view: 'City', maxOccupancy: 4, notes: '' },
  { id: 'rm-206', number: '206', floor: 2, typeId: 'rt-2', propertyId: 'prop-1', status: 'maintenance', housekeepingStatus: 'maintenance', bedType: 'King', view: 'City', maxOccupancy: 4, notes: 'AC repair in progress' },
  // Floor 3 - Executive Rooms
  { id: 'rm-301', number: '301', floor: 3, typeId: 'rt-3', propertyId: 'prop-1', status: 'available', housekeepingStatus: 'inspected', bedType: 'King', view: 'Panoramic', maxOccupancy: 4, notes: '' },
  { id: 'rm-302', number: '302', floor: 3, typeId: 'rt-3', propertyId: 'prop-1', status: 'occupied', housekeepingStatus: 'occupied', bedType: 'King', view: 'Panoramic', maxOccupancy: 4, notes: '' },
  { id: 'rm-303', number: '303', floor: 3, typeId: 'rt-3', propertyId: 'prop-1', status: 'available', housekeepingStatus: 'clean', bedType: 'King', view: 'City', maxOccupancy: 4, notes: '' },
  // Floor 4 - Junior Suites
  { id: 'rm-401', number: '401', floor: 4, typeId: 'rt-4', propertyId: 'prop-1', status: 'occupied', housekeepingStatus: 'occupied', bedType: 'King', view: 'Panoramic', maxOccupancy: 4, notes: 'Corporate booking' },
  { id: 'rm-402', number: '402', floor: 4, typeId: 'rt-4', propertyId: 'prop-1', status: 'available', housekeepingStatus: 'inspected', bedType: 'King', view: 'Panoramic', maxOccupancy: 4, notes: '' },
  { id: 'rm-403', number: '403', floor: 4, typeId: 'rt-4', propertyId: 'prop-1', status: 'reserved', housekeepingStatus: 'clean', bedType: 'King', view: 'Mountain', maxOccupancy: 4, notes: 'Honeymoon package' },
  // Floor 8 - Presidential Suite
  { id: 'rm-801', number: '801', floor: 8, typeId: 'rt-5', propertyId: 'prop-1', status: 'available', housekeepingStatus: 'inspected', bedType: 'Super King', view: 'Panoramic 360°', maxOccupancy: 6, notes: '' },
  { id: 'rm-802', number: '802', floor: 8, typeId: 'rt-5', propertyId: 'prop-1', status: 'occupied', housekeepingStatus: 'occupied', bedType: 'Super King', view: 'Panoramic 360°', maxOccupancy: 6, notes: 'PM Suite - High Security' },
];

// ============================================================
// GUESTS
// ============================================================
export const guests = [
  {
    id: 'g-001',
    propertyId: 'prop-1',
    title: 'Mr.',
    firstName: 'Ahmed',
    lastName: 'Raza Khan',
    email: 'ahmed.raza@gmail.com',
    phone: '+92-321-5551234',
    country: 'Pakistan',
    city: 'Lahore',
    address: '47-B, Gulberg III, Lahore',
    nationality: 'Pakistani',
    cnic: '35201-1234567-1',
    passport: null,
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    vip: true,
    notes: 'Prefers high floor, non-smoking room. Repeat guest since 2019.',
    preferences: { roomType: 'Deluxe', floor: 'High', bed: 'King', pillows: 'Soft', newspaper: 'Dawn', dietaryRestrictions: 'None' },
    totalStays: 14,
    totalSpending: 425000,
    lastVisit: '2026-08-12',
    createdAt: '2019-05-20'
  },
  {
    id: 'g-002',
    propertyId: 'prop-1',
    title: 'Ms.',
    firstName: 'Sana',
    lastName: 'Mirza',
    email: 'sana.mirza@hotmail.com',
    phone: '+92-300-7891234',
    country: 'Pakistan',
    city: 'Karachi',
    address: 'F-7/3, Block 13-A, Karachi',
    nationality: 'Pakistani',
    cnic: '42101-9876543-2',
    passport: 'AK5678901',
    dateOfBirth: '1991-07-22',
    gender: 'Female',
    vip: false,
    notes: 'Corporate client from TechCorp. Often travels on business.',
    preferences: { roomType: 'Executive', floor: 'Any', bed: 'King', pillows: 'Firm', newspaper: 'The News', dietaryRestrictions: 'Vegetarian' },
    totalStays: 6,
    totalSpending: 185000,
    lastVisit: '2026-09-01',
    createdAt: '2022-11-15'
  },
  {
    id: 'g-003',
    propertyId: 'prop-1',
    title: 'Dr.',
    firstName: 'Tariq',
    lastName: 'Mahmood',
    email: 'dr.tariq@medpk.com',
    phone: '+92-333-4561234',
    country: 'Pakistan',
    city: 'Islamabad',
    address: 'House 7, Street 4, F-7/1, Islamabad',
    nationality: 'Pakistani',
    cnic: '61101-5678901-3',
    passport: null,
    dateOfBirth: '1978-12-05',
    gender: 'Male',
    vip: true,
    notes: 'Senior surgeon. Requires complete quiet. Early riser — breakfast at 6 AM.',
    preferences: { roomType: 'Executive', floor: 'High', bed: 'King', pillows: 'Soft', newspaper: 'Dawn', dietaryRestrictions: 'Halal only' },
    totalStays: 22,
    totalSpending: 780000,
    lastVisit: '2026-09-10',
    createdAt: '2017-03-08'
  },
  {
    id: 'g-004',
    propertyId: 'prop-1',
    title: 'Mr.',
    firstName: 'James',
    lastName: 'Whitfield',
    email: 'j.whitfield@globalinvest.com',
    phone: '+44-7700-900456',
    country: 'United Kingdom',
    city: 'London',
    address: '22 Baker Street, London W1U 3BW',
    nationality: 'British',
    cnic: null,
    passport: 'GB12345678',
    dateOfBirth: '1973-09-18',
    gender: 'Male',
    vip: true,
    notes: 'Investment banker visiting Pakistan for business meetings. Requires limousine service.',
    preferences: { roomType: 'Presidential Suite', floor: 'Top', bed: 'Super King', pillows: 'Soft', newspaper: 'FT', dietaryRestrictions: 'None' },
    totalStays: 3,
    totalSpending: 380000,
    lastVisit: '2026-09-15',
    createdAt: '2024-01-10'
  },
  {
    id: 'g-005',
    propertyId: 'prop-1',
    title: 'Mrs.',
    firstName: 'Fatima',
    lastName: 'Zaidi',
    email: 'fatima.zaidi@yahoo.com',
    phone: '+92-312-3456789',
    country: 'Pakistan',
    city: 'Multan',
    address: 'Block B, New Multan, Multan',
    nationality: 'Pakistani',
    cnic: '36302-8765432-0',
    passport: null,
    dateOfBirth: '1988-04-30',
    gender: 'Female',
    vip: false,
    notes: 'Honeymoon couple. Room decoration requested.',
    preferences: { roomType: 'Junior Suite', floor: 'High', bed: 'King', pillows: 'Soft', newspaper: 'None', dietaryRestrictions: 'None' },
    totalStays: 1,
    totalSpending: 95000,
    lastVisit: '2026-09-20',
    createdAt: '2026-09-15'
  },
  {
    id: 'g-006',
    propertyId: 'prop-1',
    title: 'Mr.',
    firstName: 'Usman',
    lastName: 'Nawaz',
    email: 'usman.nawaz@psl.com.pk',
    phone: '+92-345-7891234',
    country: 'Pakistan',
    city: 'Lahore',
    address: 'DHA Phase 5, Lahore',
    nationality: 'Pakistani',
    cnic: '35202-4567890-5',
    passport: 'AK8901234',
    dateOfBirth: '1995-06-12',
    gender: 'Male',
    vip: false,
    notes: 'Professional cricketer. Needs gym access. Quiet room away from elevators.',
    preferences: { roomType: 'Deluxe', floor: 'Mid', bed: 'King', pillows: 'Firm', newspaper: 'None', dietaryRestrictions: 'High protein diet' },
    totalStays: 4,
    totalSpending: 68000,
    lastVisit: '2026-07-15',
    createdAt: '2023-06-01'
  },
  {
    id: 'g-007',
    propertyId: 'prop-1',
    title: 'Ms.',
    firstName: 'Aisha',
    lastName: 'Baig',
    email: 'aisha.baig@unops.org',
    phone: '+92-51-8273645',
    country: 'Pakistan',
    city: 'Islamabad',
    address: 'G-10/3, Islamabad',
    nationality: 'Pakistani',
    cnic: '61101-2345678-4',
    passport: 'AP2345678',
    dateOfBirth: '1982-11-14',
    gender: 'Female',
    vip: false,
    notes: 'UN Employee. Long-term corporate stay.',
    preferences: { roomType: 'Standard', floor: 'Any', bed: 'Queen', pillows: 'Soft', newspaper: 'Dawn', dietaryRestrictions: 'Vegetarian' },
    totalStays: 9,
    totalSpending: 145000,
    lastVisit: '2026-09-22',
    createdAt: '2021-08-20'
  }
];

// ============================================================
// RESERVATIONS
// ============================================================
export const reservations = [
  {
    id: 'BK-2026-0001',
    propertyId: 'prop-1',
    guestId: 'g-001',
    roomId: 'rm-201',
    roomTypeId: 'rt-2',
    checkIn: '2026-09-24',
    checkOut: '2026-09-28',
    nights: 4,
    adults: 2,
    children: 0,
    ratePerNight: 12500,
    totalRoomCharge: 50000,
    discount: 5000,
    discountReason: 'Loyalty Discount',
    tax: 7500,
    totalAmount: 52500,
    deposit: 25000,
    balance: 27500,
    status: 'checked-in',
    source: 'Direct',
    specialRequests: 'Extra pillows, high floor preferred',
    notes: 'Corporate account — TechPak Ltd.',
    confirmationNo: 'CF-2026-0001',
    createdAt: '2026-09-20',
    createdBy: 'staff-001',
    checkedInAt: '2026-09-24T14:30:00'
  },
  {
    id: 'BK-2026-0002',
    propertyId: 'prop-1',
    guestId: 'g-002',
    roomId: 'rm-302',
    roomTypeId: 'rt-3',
    checkIn: '2026-09-25',
    checkOut: '2026-09-27',
    nights: 2,
    adults: 1,
    children: 0,
    ratePerNight: 18000,
    totalRoomCharge: 36000,
    discount: 0,
    discountReason: null,
    tax: 5400,
    totalAmount: 41400,
    deposit: 20000,
    balance: 21400,
    status: 'checked-in',
    source: 'Online',
    specialRequests: 'Vegetarian breakfast',
    notes: '',
    confirmationNo: 'CF-2026-0002',
    createdAt: '2026-09-22',
    createdBy: 'staff-002',
    checkedInAt: '2026-09-25T15:00:00'
  },
  {
    id: 'BK-2026-0003',
    propertyId: 'prop-1',
    guestId: 'g-004',
    roomId: 'rm-802',
    roomTypeId: 'rt-5',
    checkIn: '2026-09-23',
    checkOut: '2026-09-27',
    nights: 4,
    adults: 2,
    children: 0,
    ratePerNight: 85000,
    totalRoomCharge: 340000,
    discount: 0,
    discountReason: null,
    tax: 51000,
    totalAmount: 391000,
    deposit: 200000,
    balance: 191000,
    status: 'checked-in',
    source: 'Travel Agent',
    specialRequests: 'Airport limousine, champagne on arrival, daily fresh flowers',
    notes: 'VIP — Personalized service required',
    confirmationNo: 'CF-2026-0003',
    createdAt: '2026-09-10',
    createdBy: 'staff-001',
    checkedInAt: '2026-09-23T18:00:00'
  },
  {
    id: 'BK-2026-0004',
    propertyId: 'prop-1',
    guestId: 'g-005',
    roomId: 'rm-403',
    roomTypeId: 'rt-4',
    checkIn: '2026-09-26',
    checkOut: '2026-09-29',
    nights: 3,
    adults: 2,
    children: 0,
    ratePerNight: 28000,
    totalRoomCharge: 84000,
    discount: 8400,
    discountReason: 'Honeymoon Package',
    tax: 11340,
    totalAmount: 86940,
    deposit: 43000,
    balance: 43940,
    status: 'confirmed',
    source: 'Direct',
    specialRequests: 'Romantic room decoration, rose petals, chocolates',
    notes: 'Honeymoon package — welcome amenities included',
    confirmationNo: 'CF-2026-0004',
    createdAt: '2026-09-15',
    createdBy: 'staff-003',
    checkedInAt: null
  },
  {
    id: 'BK-2026-0005',
    propertyId: 'prop-1',
    guestId: 'g-003',
    roomId: 'rm-301',
    roomTypeId: 'rt-3',
    checkIn: '2026-09-27',
    checkOut: '2026-09-30',
    nights: 3,
    adults: 1,
    children: 0,
    ratePerNight: 18000,
    totalRoomCharge: 54000,
    discount: 2700,
    discountReason: 'Loyalty Discount 5%',
    tax: 7695,
    totalAmount: 58995,
    deposit: 30000,
    balance: 28995,
    status: 'confirmed',
    source: 'Phone',
    specialRequests: 'Extra quiet room, breakfast at 6 AM',
    notes: 'VIP Doctor — handle with care',
    confirmationNo: 'CF-2026-0005',
    createdAt: '2026-09-23',
    createdBy: 'staff-001',
    checkedInAt: null
  },
  {
    id: 'BK-2026-0006',
    propertyId: 'prop-1',
    guestId: 'g-007',
    roomId: 'rm-103',
    roomTypeId: 'rt-1',
    checkIn: '2026-09-26',
    checkOut: '2026-10-10',
    nights: 14,
    adults: 1,
    children: 0,
    ratePerNight: 7500,
    totalRoomCharge: 105000,
    discount: 10500,
    discountReason: 'Long-stay Corporate Rate',
    tax: 14175,
    totalAmount: 108675,
    deposit: 54000,
    balance: 54675,
    status: 'confirmed',
    source: 'Corporate',
    specialRequests: 'Daily newspaper, kettle in room',
    notes: 'UN Staff — Corporate account',
    confirmationNo: 'CF-2026-0006',
    createdAt: '2026-09-18',
    createdBy: 'staff-002',
    checkedInAt: null
  },
  {
    id: 'BK-2026-0007',
    propertyId: 'prop-1',
    guestId: 'g-006',
    roomId: null,
    roomTypeId: 'rt-2',
    checkIn: '2026-10-05',
    checkOut: '2026-10-08',
    nights: 3,
    adults: 1,
    children: 0,
    ratePerNight: 12500,
    totalRoomCharge: 37500,
    discount: 0,
    discountReason: null,
    tax: 5625,
    totalAmount: 43125,
    deposit: 20000,
    balance: 23125,
    status: 'pending',
    source: 'OTA',
    specialRequests: 'Gym access required, high protein breakfast',
    notes: '',
    confirmationNo: 'CF-2026-0007',
    createdAt: '2026-09-25',
    createdBy: 'staff-003',
    checkedInAt: null
  }
];

// ============================================================
// STAFF
// ============================================================
export const staff = [
  { id: 'staff-001', propertyId: 'prop-1', employeeId: 'EMP-001', firstName: 'Bilal', lastName: 'Hussain', role: 'Front Desk', department: 'Front Office', phone: '+92-311-2345678', email: 'bilal.h@pchotels.pk', joiningDate: '2021-03-15', shift: 'Morning', status: 'active', salary: 45000 },
  { id: 'staff-002', propertyId: 'prop-1', employeeId: 'EMP-002', firstName: 'Nadia', lastName: 'Ansari', role: 'Front Desk', department: 'Front Office', phone: '+92-312-3456789', email: 'nadia.a@pchotels.pk', joiningDate: '2020-07-01', shift: 'Evening', status: 'active', salary: 48000 },
  { id: 'staff-003', propertyId: 'prop-1', employeeId: 'EMP-003', firstName: 'Zahid', lastName: 'Mehmood', role: 'General Manager', department: 'Management', phone: '+92-333-9876543', email: 'zahid.m@pchotels.pk', joiningDate: '2018-01-10', shift: 'Morning', status: 'active', salary: 180000 },
  { id: 'staff-004', propertyId: 'prop-1', employeeId: 'EMP-004', firstName: 'Rukhsana', lastName: 'Bibi', role: 'Housekeeping', department: 'Housekeeping', phone: '+92-345-2345678', email: 'rukhsana.b@pchotels.pk', joiningDate: '2022-05-20', shift: 'Morning', status: 'active', salary: 28000 },
  { id: 'staff-005', propertyId: 'prop-1', employeeId: 'EMP-005', firstName: 'Imran', lastName: 'Ali', role: 'Maintenance', department: 'Maintenance', phone: '+92-321-4567890', email: 'imran.a@pchotels.pk', joiningDate: '2019-09-01', shift: 'Any', status: 'active', salary: 35000 },
  { id: 'staff-006', propertyId: 'prop-1', employeeId: 'EMP-006', firstName: 'Sara', lastName: 'Iqbal', role: 'Accountant', department: 'Finance', phone: '+92-300-5678901', email: 'sara.i@pchotels.pk', joiningDate: '2020-11-15', shift: 'Morning', status: 'active', salary: 65000 },
  { id: 'staff-007', propertyId: 'prop-1', employeeId: 'EMP-007', firstName: 'Kashif', lastName: 'Rehman', role: 'Restaurant Manager', department: 'F&B', phone: '+92-344-6789012', email: 'kashif.r@pchotels.pk', joiningDate: '2021-06-01', shift: 'Morning', status: 'active', salary: 70000 },
  { id: 'staff-008', propertyId: 'prop-1', employeeId: 'EMP-008', firstName: 'Habib', lastName: 'Ullah', role: 'Housekeeping', department: 'Housekeeping', phone: '+92-315-7890123', email: 'habib.u@pchotels.pk', joiningDate: '2023-02-10', shift: 'Evening', status: 'active', salary: 26000 },
];

// ============================================================
// HOUSEKEEPING TASKS
// ============================================================
export const housekeepingTasks = [
  { id: 'hk-001', roomId: 'rm-104', assignedTo: 'staff-004', priority: 'High', status: 'pending', type: 'Full Clean', notes: 'Guest checked out, requires thorough cleaning', createdAt: '2026-09-26T08:00:00', scheduledFor: '2026-09-26T09:00:00', completedAt: null },
  { id: 'hk-002', roomId: 'rm-204', assignedTo: 'staff-008', priority: 'Normal', status: 'in-progress', type: 'Full Clean', notes: '', createdAt: '2026-09-26T07:30:00', scheduledFor: '2026-09-26T08:30:00', completedAt: null },
  { id: 'hk-003', roomId: 'rm-201', assignedTo: 'staff-004', priority: 'Low', status: 'pending', type: 'Turndown', notes: 'Evening turndown for occupied room', createdAt: '2026-09-26T09:00:00', scheduledFor: '2026-09-26T18:00:00', completedAt: null },
  { id: 'hk-004', roomId: 'rm-105', assignedTo: 'staff-008', priority: 'Normal', status: 'completed', type: 'Inspection', notes: 'Room passed inspection', createdAt: '2026-09-26T06:00:00', scheduledFor: '2026-09-26T07:00:00', completedAt: '2026-09-26T07:45:00' },
];

// ============================================================
// MAINTENANCE TICKETS
// ============================================================
export const maintenanceTickets = [
  { id: 'MT-001', roomId: 'rm-206', title: 'AC Not Cooling', category: 'HVAC', priority: 'High', status: 'in-progress', assignedTo: 'staff-005', description: 'Air conditioning unit not cooling below 25°C. Guest complained.', createdAt: '2026-09-25T10:00:00', dueDate: '2026-09-26T17:00:00', resolvedAt: null, notes: 'Technician on site, replacement part ordered' },
  { id: 'MT-002', roomId: 'rm-104', title: 'Bathroom Tap Leaking', category: 'Plumbing', priority: 'Normal', status: 'open', assignedTo: null, description: 'Hot water tap in bathroom dripping continuously.', createdAt: '2026-09-26T08:30:00', dueDate: '2026-09-27T12:00:00', resolvedAt: null, notes: '' },
  { id: 'MT-003', roomId: 'rm-301', title: 'TV Remote Not Working', category: 'Electronics', priority: 'Low', status: 'resolved', assignedTo: 'staff-005', description: 'TV remote control batteries dead.', createdAt: '2026-09-24T15:00:00', dueDate: '2026-09-24T18:00:00', resolvedAt: '2026-09-24T16:30:00', notes: 'Replaced batteries' },
  { id: 'MT-004', roomId: 'rm-802', title: 'Internet Very Slow', category: 'IT/Internet', priority: 'High', status: 'assigned', assignedTo: 'staff-005', description: 'VIP guest reporting very slow WiFi speed. Needs priority.', createdAt: '2026-09-26T07:00:00', dueDate: '2026-09-26T10:00:00', resolvedAt: null, notes: 'Checking router configuration' },
];

// ============================================================
// INVOICES & PAYMENTS
// ============================================================
export const invoices = [
  {
    id: 'INV-2026-0001',
    reservationId: 'BK-2026-0001',
    guestId: 'g-001',
    propertyId: 'prop-1',
    status: 'partial',
    items: [
      { id: 'ii-1', type: 'Room', description: 'Deluxe Room 201 × 4 nights', qty: 4, rate: 12500, amount: 50000 },
      { id: 'ii-2', type: 'Service', description: 'Laundry Service', qty: 1, rate: 2500, amount: 2500 },
      { id: 'ii-3', type: 'Restaurant', description: 'Restaurant Charges', qty: 1, rate: 8500, amount: 8500 },
      { id: 'ii-4', type: 'Discount', description: 'Loyalty Discount', qty: 1, rate: -5000, amount: -5000 },
      { id: 'ii-5', type: 'Tax', description: 'Tax (15%)', qty: 1, rate: 8400, amount: 8400 },
    ],
    subtotal: 61000,
    discountTotal: 5000,
    taxTotal: 8400,
    grandTotal: 64400,
    paidAmount: 25000,
    balance: 39400,
    dueDate: '2026-09-28',
    createdAt: '2026-09-24',
    notes: ''
  },
  {
    id: 'INV-2026-0002',
    reservationId: 'BK-2026-0002',
    guestId: 'g-002',
    propertyId: 'prop-1',
    status: 'partial',
    items: [
      { id: 'ii-6', type: 'Room', description: 'Executive Room 302 × 2 nights', qty: 2, rate: 18000, amount: 36000 },
      { id: 'ii-7', type: 'Service', description: 'Airport Transfer', qty: 1, rate: 3500, amount: 3500 },
      { id: 'ii-8', type: 'Tax', description: 'Tax (15%)', qty: 1, rate: 5925, amount: 5925 },
    ],
    subtotal: 39500,
    discountTotal: 0,
    taxTotal: 5925,
    grandTotal: 45425,
    paidAmount: 20000,
    balance: 25425,
    dueDate: '2026-09-27',
    createdAt: '2026-09-25',
    notes: ''
  }
];

export const payments = [
  { id: 'PAY-001', invoiceId: 'INV-2026-0001', guestId: 'g-001', amount: 25000, method: 'Credit Card', reference: 'VISA-4523-****', status: 'completed', createdAt: '2026-09-24T14:30:00', collectedBy: 'staff-001' },
  { id: 'PAY-002', invoiceId: 'INV-2026-0002', guestId: 'g-002', amount: 20000, method: 'Bank Transfer', reference: 'TXN-88721', status: 'completed', createdAt: '2026-09-25T15:00:00', collectedBy: 'staff-002' },
  { id: 'PAY-003', invoiceId: 'INV-2026-0003', guestId: 'g-004', amount: 200000, method: 'Bank Transfer', reference: 'TXN-99812-INT', status: 'completed', createdAt: '2026-09-23T17:00:00', collectedBy: 'staff-001' },
];

// ============================================================
// RESTAURANT / POS
// ============================================================
export const menuCategories = [
  { id: 'mc-1', name: 'Breakfast', icon: '☕', active: true },
  { id: 'mc-2', name: 'Starters', icon: '🥗', active: true },
  { id: 'mc-3', name: 'Main Course', icon: '🍽️', active: true },
  { id: 'mc-4', name: 'Desserts', icon: '🍰', active: true },
  { id: 'mc-5', name: 'Beverages', icon: '🥤', active: true },
  { id: 'mc-6', name: 'Pakistani', icon: '🍛', active: true },
];

export const menuItems = [
  { id: 'mi-1', categoryId: 'mc-1', name: 'Continental Breakfast', price: 1800, description: 'Eggs, toast, fresh juice, coffee', available: true },
  { id: 'mi-2', categoryId: 'mc-1', name: 'Full Pakistani Breakfast', price: 2200, description: 'Halwa puri, nihari, chai', available: true },
  { id: 'mi-3', categoryId: 'mc-2', name: 'Chicken Tikka', price: 1600, description: 'Tender marinated chicken with mint chutney', available: true },
  { id: 'mi-4', categoryId: 'mc-2', name: 'Seekh Kebab', price: 1400, description: 'Minced beef seekh with raita', available: true },
  { id: 'mi-5', categoryId: 'mc-3', name: 'Mutton Biryani', price: 2800, description: 'Aromatic basmati with slow-cooked mutton', available: true },
  { id: 'mi-6', categoryId: 'mc-3', name: 'Chicken Karahi', price: 2400, description: 'Wok-cooked chicken in spiced tomato gravy', available: true },
  { id: 'mi-7', categoryId: 'mc-3', name: 'Club Sandwich', price: 1200, description: 'Triple decker with fries', available: true },
  { id: 'mi-8', categoryId: 'mc-4', name: 'Gulab Jamun', price: 600, description: 'Classic Pakistani sweet, 6 pieces', available: true },
  { id: 'mi-9', categoryId: 'mc-4', name: 'Kheer', price: 500, description: 'Traditional rice pudding', available: true },
  { id: 'mi-10', categoryId: 'mc-5', name: 'Fresh Lime Soda', price: 350, description: 'Sweet or salty', available: true },
  { id: 'mi-11', categoryId: 'mc-5', name: 'Mango Shake', price: 550, description: 'Fresh mango milkshake', available: true },
  { id: 'mi-12', categoryId: 'mc-5', name: 'Green Tea', price: 300, description: 'Herbal or plain', available: true },
  { id: 'mi-13', categoryId: 'mc-6', name: 'Dal Makhani', price: 1000, description: 'Slow-cooked black lentils with cream', available: true },
  { id: 'mi-14', categoryId: 'mc-6', name: 'Palak Paneer', price: 1100, description: 'Fresh spinach with cottage cheese', available: true },
];

export const restaurantTables = [
  { id: 'tbl-1', number: 'T1', capacity: 2, status: 'available', location: 'Main Hall' },
  { id: 'tbl-2', number: 'T2', capacity: 4, status: 'occupied', location: 'Main Hall' },
  { id: 'tbl-3', number: 'T3', capacity: 4, status: 'available', location: 'Main Hall' },
  { id: 'tbl-4', number: 'T4', capacity: 6, status: 'occupied', location: 'Main Hall' },
  { id: 'tbl-5', number: 'T5', capacity: 2, status: 'reserved', location: 'Window' },
  { id: 'tbl-6', number: 'T6', capacity: 8, status: 'available', location: 'Private Room' },
  { id: 'tbl-7', number: 'T7', capacity: 4, status: 'available', location: 'Outdoor' },
  { id: 'tbl-8', number: 'T8', capacity: 4, status: 'occupied', location: 'Outdoor' },
];

export const restaurantOrders = [
  {
    id: 'RO-001', tableId: 'tbl-2', guestId: null, roomId: null, chargeToRoom: false,
    status: 'served',
    items: [
      { menuItemId: 'mi-5', name: 'Mutton Biryani', qty: 2, price: 2800, amount: 5600 },
      { menuItemId: 'mi-10', name: 'Fresh Lime Soda', qty: 2, price: 350, amount: 700 },
    ],
    subtotal: 6300, tax: 945, total: 7245,
    createdAt: '2026-09-26T12:30:00', completedAt: '2026-09-26T13:15:00'
  },
  {
    id: 'RO-002', tableId: null, guestId: 'g-001', roomId: 'rm-201', chargeToRoom: true,
    status: 'delivered',
    items: [
      { menuItemId: 'mi-1', name: 'Continental Breakfast', qty: 2, price: 1800, amount: 3600 },
      { menuItemId: 'mi-12', name: 'Green Tea', qty: 2, price: 300, amount: 600 },
    ],
    subtotal: 4200, tax: 630, total: 4830,
    createdAt: '2026-09-26T07:30:00', completedAt: '2026-09-26T08:10:00'
  }
];

// ============================================================
// INVENTORY
// ============================================================
export const inventoryCategories = [
  { id: 'ic-1', name: 'Linens', description: 'Bedsheets, towels, pillow covers' },
  { id: 'ic-2', name: 'Toiletries', description: 'Soap, shampoo, conditioner, toothpaste' },
  { id: 'ic-3', name: 'Cleaning Supplies', description: 'Detergents, disinfectants, mops' },
  { id: 'ic-4', name: 'Food & Beverages', description: 'Restaurant ingredients and beverages' },
  { id: 'ic-5', name: 'Office Supplies', description: 'Paper, pens, stationery' },
  { id: 'ic-6', name: 'Maintenance', description: 'Tools, spare parts, bulbs' },
];

export const inventoryItems = [
  { id: 'inv-1', categoryId: 'ic-1', name: 'King Size Bedsheet Set', sku: 'LIN-KG-001', unit: 'Set', currentStock: 85, minimumStock: 40, unitCost: 3500 },
  { id: 'inv-2', categoryId: 'ic-1', name: 'Bath Towel (Large)', sku: 'LIN-BT-001', unit: 'Piece', currentStock: 220, minimumStock: 100, unitCost: 850 },
  { id: 'inv-3', categoryId: 'ic-2', name: 'Shampoo (50ml)', sku: 'TOI-SH-001', unit: 'Bottle', currentStock: 480, minimumStock: 200, unitCost: 120 },
  { id: 'inv-4', categoryId: 'ic-2', name: 'Soap Bar (Hotel)', sku: 'TOI-SP-001', unit: 'Piece', currentStock: 35, minimumStock: 200, unitCost: 45 },  // Low stock!
  { id: 'inv-5', categoryId: 'ic-3', name: 'Multi-Purpose Cleaner', sku: 'CLN-MP-001', unit: 'Litre', currentStock: 45, minimumStock: 20, unitCost: 380 },
  { id: 'inv-6', categoryId: 'ic-4', name: 'Bottled Water (1L)', sku: 'BEV-WA-001', unit: 'Bottle', currentStock: 650, minimumStock: 300, unitCost: 60 },
  { id: 'inv-7', categoryId: 'ic-4', name: 'Tea Bags (Premium)', sku: 'BEV-TB-001', unit: 'Box', currentStock: 8, minimumStock: 20, unitCost: 450 },  // Low stock!
  { id: 'inv-8', categoryId: 'ic-6', name: 'LED Bulb (10W)', sku: 'MNT-LB-001', unit: 'Piece', currentStock: 60, minimumStock: 30, unitCost: 280 },
];

// ============================================================
// EXPENSES
// ============================================================
export const expenses = [
  { id: 'exp-001', propertyId: 'prop-1', category: 'Utilities', description: 'Electricity Bill - September 2026', amount: 185000, date: '2026-09-20', status: 'approved', submittedBy: 'staff-006', approvedBy: 'staff-003', receipt: null },
  { id: 'exp-002', propertyId: 'prop-1', category: 'Salaries', description: 'Staff Salaries - September 2026', amount: 750000, date: '2026-09-25', status: 'approved', submittedBy: 'staff-006', approvedBy: 'staff-003', receipt: null },
  { id: 'exp-003', propertyId: 'prop-1', category: 'Maintenance', description: 'AC Unit Replacement Parts', amount: 45000, date: '2026-09-25', status: 'pending', submittedBy: 'staff-005', approvedBy: null, receipt: null },
  { id: 'exp-004', propertyId: 'prop-1', category: 'Marketing', description: 'Digital Advertising - Q3 2026', amount: 55000, date: '2026-09-15', status: 'approved', submittedBy: 'staff-003', approvedBy: 'staff-003', receipt: null },
  { id: 'exp-005', propertyId: 'prop-1', category: 'Supplies', description: 'Guest Toiletries Restock', amount: 28000, date: '2026-09-22', status: 'approved', submittedBy: 'staff-004', approvedBy: 'staff-003', receipt: null },
];

// ============================================================
// NOTIFICATIONS
// ============================================================
export const notifications = [
  { id: 'notif-001', type: 'reservation', title: 'New Reservation', message: 'Booking BK-2026-0007 received from Usman Nawaz via OTA for Oct 5-8', time: '2026-09-25T14:30:00', read: false, priority: 'normal' },
  { id: 'notif-002', type: 'payment', title: 'Payment Overdue', message: 'Invoice INV-2026-0001 balance of ₨39,400 due on Sep 28', time: '2026-09-26T09:00:00', read: false, priority: 'high' },
  { id: 'notif-003', type: 'maintenance', title: 'Maintenance Ticket', message: 'Room 206 AC repair ticket MT-001 still in progress', time: '2026-09-26T08:00:00', read: true, priority: 'high' },
  { id: 'notif-004', type: 'inventory', title: 'Low Stock Alert', message: 'Soap Bar stock critically low — only 35 units remaining (min: 200)', time: '2026-09-26T07:00:00', read: false, priority: 'high' },
  { id: 'notif-005', type: 'checkin', title: 'Today\'s Arrivals', message: '2 guests expected today: Fatima Zaidi and Aisha Baig', time: '2026-09-26T06:00:00', read: true, priority: 'normal' },
  { id: 'notif-006', type: 'inventory', title: 'Low Stock Alert', message: 'Tea Bags (Premium) stock low — 8 boxes remaining (min: 20)', time: '2026-09-26T07:00:00', read: false, priority: 'normal' },
];

// ============================================================
// AUDIT LOGS
// ============================================================
export const auditLogs = [
  { id: 'al-001', userId: 'staff-001', userName: 'Bilal Hussain', action: 'CHECK_IN', module: 'Front Desk', description: 'Checked in guest Ahmed Raza Khan to Room 201', previousValue: 'reserved', newValue: 'checked-in', createdAt: '2026-09-24T14:35:00' },
  { id: 'al-002', userId: 'staff-002', userName: 'Nadia Ansari', action: 'PAYMENT_RECEIVED', module: 'Billing', description: 'Payment of ₨20,000 received from Sana Mirza via Bank Transfer', previousValue: null, newValue: '20000', createdAt: '2026-09-25T15:05:00' },
  { id: 'al-003', userId: 'staff-004', userName: 'Rukhsana Bibi', action: 'ROOM_STATUS_CHANGE', module: 'Housekeeping', description: 'Changed Room 105 status from Dirty to Inspected', previousValue: 'dirty', newValue: 'inspected', createdAt: '2026-09-26T07:45:00' },
  { id: 'al-004', userId: 'staff-005', userName: 'Imran Ali', action: 'TICKET_UPDATE', module: 'Maintenance', description: 'Updated ticket MT-001 status from Open to In Progress', previousValue: 'open', newValue: 'in-progress', createdAt: '2026-09-25T11:00:00' },
  { id: 'al-005', userId: 'staff-003', userName: 'Zahid Mehmood', action: 'EXPENSE_APPROVED', module: 'Expenses', description: 'Approved expense EXP-001: Electricity Bill ₨185,000', previousValue: 'pending', newValue: 'approved', createdAt: '2026-09-20T10:00:00' },
];

// ============================================================
// ANALYTICS DATA (For Charts)
// ============================================================
export const revenueData = [
  { month: 'Apr', revenue: 1850000, expenses: 1200000, profit: 650000 },
  { month: 'May', revenue: 2100000, expenses: 1250000, profit: 850000 },
  { month: 'Jun', revenue: 2450000, expenses: 1350000, profit: 1100000 },
  { month: 'Jul', revenue: 2800000, expenses: 1400000, profit: 1400000 },
  { month: 'Aug', revenue: 3100000, expenses: 1500000, profit: 1600000 },
  { month: 'Sep', revenue: 2900000, expenses: 1450000, profit: 1450000 },
];

export const occupancyData = [
  { month: 'Apr', occupancy: 65, adr: 14200, revpar: 9230 },
  { month: 'May', occupancy: 72, adr: 15100, revpar: 10872 },
  { month: 'Jun', occupancy: 81, adr: 16400, revpar: 13284 },
  { month: 'Jul', occupancy: 88, adr: 17800, revpar: 15664 },
  { month: 'Aug', occupancy: 91, adr: 18200, revpar: 16562 },
  { month: 'Sep', occupancy: 78, adr: 16800, revpar: 13104 },
];

export const bookingSourceData = [
  { name: 'Direct', value: 35, color: '#2449D8' },
  { name: 'Online (OTA)', value: 28, color: '#7C3AED' },
  { name: 'Corporate', value: 22, color: '#059669' },
  { name: 'Travel Agent', value: 10, color: '#D97706' },
  { name: 'Phone', value: 5, color: '#94A3B8' },
];

export const roomTypeRevenue = [
  { name: 'Presidential', revenue: 850000, color: '#B8952A' },
  { name: 'Junior Suite', revenue: 580000, color: '#2449D8' },
  { name: 'Executive', revenue: 720000, color: '#7C3AED' },
  { name: 'Deluxe', revenue: 520000, color: '#059669' },
  { name: 'Standard', revenue: 230000, color: '#0891B2' },
];

export const weeklyCheckins = [
  { day: 'Mon', checkins: 8, checkouts: 5 },
  { day: 'Tue', checkins: 6, checkouts: 7 },
  { day: 'Wed', checkins: 9, checkouts: 8 },
  { day: 'Thu', checkins: 11, checkouts: 6 },
  { day: 'Fri', checkins: 14, checkouts: 10 },
  { day: 'Sat', checkins: 12, checkouts: 9 },
  { day: 'Sun', checkins: 7, checkouts: 11 },
];

// ============================================================
// SUBSCRIPTION PLANS
// ============================================================
export const subscriptionPlans = [
  {
    id: 'plan-starter',
    name: 'Starter',
    tagline: 'For small guest houses',
    monthlyPrice: 9900,
    yearlyPrice: 99000,
    properties: 1,
    rooms: 20,
    staff: 5,
    features: ['Reservations', 'Check-in/out', 'Basic Billing', 'Housekeeping', 'Email Support'],
    advanced: false,
    popular: false,
    color: '#64748B'
  },
  {
    id: 'plan-professional',
    name: 'Professional',
    tagline: 'For growing hotels',
    monthlyPrice: 24900,
    yearlyPrice: 249000,
    properties: 1,
    rooms: 100,
    staff: 25,
    features: ['Everything in Starter', 'Restaurant POS', 'Inventory', 'Maintenance', 'Staff Management', 'Analytics & Reports', 'Phone Support'],
    advanced: false,
    popular: true,
    color: '#2449D8'
  },
  {
    id: 'plan-business',
    name: 'Business',
    tagline: 'For larger properties',
    monthlyPrice: 59900,
    yearlyPrice: 599000,
    properties: 3,
    rooms: 300,
    staff: 100,
    features: ['Everything in Professional', 'Multi-property', 'Advanced Analytics', 'API Access', 'Custom Reports', 'Vendor Management', 'Priority Support'],
    advanced: true,
    popular: false,
    color: '#7C3AED'
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    tagline: 'For hotel groups',
    monthlyPrice: null,
    yearlyPrice: null,
    properties: 'Unlimited',
    rooms: 'Unlimited',
    staff: 'Unlimited',
    features: ['Everything in Business', 'Custom Integrations', 'White Labeling', 'Dedicated Account Manager', 'SLA Guarantee', 'On-site Training', '24/7 Premium Support'],
    advanced: true,
    popular: false,
    color: '#B8952A'
  }
];

// ============================================================
// VENDORS
// ============================================================
export const vendors = [
  { id: 'vnd-001', name: 'Continental Linens Co.', contact: 'Rafiq Ahmed', phone: '+92-21-3455678', email: 'rafiq@continentallinens.pk', category: 'Linens', outstandingBalance: 85000, totalPurchases: 450000 },
  { id: 'vnd-002', name: 'TechnoClean Supplies', contact: 'Rashida Begum', phone: '+92-42-3556789', email: 'rashida@technoclean.pk', category: 'Cleaning Supplies', outstandingBalance: 12000, totalPurchases: 180000 },
  { id: 'vnd-003', name: 'Islamabad Fresh Farms', contact: 'Tariq Ali', phone: '+92-51-4567890', email: 'tariq@islamabadfarms.pk', category: 'Food & Beverages', outstandingBalance: 35000, totalPurchases: 620000 },
];

// ============================================================
// COMMUNICATION TEMPLATES
// ============================================================
export const communicationTemplates = [
  { id: 'ct-1', name: 'Booking Confirmation', trigger: 'On Reservation', subject: 'Your Booking is Confirmed — {{hotel_name}}', type: 'Email', active: true },
  { id: 'ct-2', name: 'Pre-arrival Welcome', trigger: '1 day before check-in', subject: 'We Look Forward to Welcoming You Tomorrow!', type: 'Email', active: true },
  { id: 'ct-3', name: 'Check-in Confirmation', trigger: 'On Check-in', subject: 'Welcome to {{hotel_name}} — Room {{room_number}}', type: 'Email', active: true },
  { id: 'ct-4', name: 'Payment Receipt', trigger: 'On Payment', subject: 'Payment Receipt — {{hotel_name}}', type: 'Email', active: true },
  { id: 'ct-5', name: 'Checkout Invoice', trigger: 'On Check-out', subject: 'Thank You for Staying — Your Invoice', type: 'Email', active: true },
  { id: 'ct-6', name: 'Cancellation Confirmation', trigger: 'On Cancellation', subject: 'Booking Cancellation Confirmed', type: 'Email', active: true },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export const formatCurrency = (amount, currency = 'PKR') => {
  if (currency === 'PKR') {
    return `₨${Number(amount).toLocaleString('en-PK')}`;
  }
  return `${currency} ${Number(amount).toLocaleString()}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const getGuestName = (guest) => {
  if (!guest) return 'Unknown Guest';
  return `${guest.title} ${guest.firstName} ${guest.lastName}`;
};

export const getRoomType = (typeId) => roomTypes.find(rt => rt.id === typeId);
export const getRoom = (roomId) => rooms.find(r => r.id === roomId);
export const getGuest = (guestId) => guests.find(g => g.id === guestId);
export const getStaffMember = (staffId) => staff.find(s => s.id === staffId);

export const getOccupancyStats = () => {
  const totalRooms = rooms.filter(r => r.propertyId === 'prop-1').length;
  const occupied = rooms.filter(r => r.status === 'occupied').length;
  const reserved = rooms.filter(r => r.status === 'reserved').length;
  const available = rooms.filter(r => r.status === 'available').length;
  const maintenance = rooms.filter(r => r.status === 'maintenance').length;
  const dirty = rooms.filter(r => r.status === 'dirty').length;
  const cleaning = rooms.filter(r => r.status === 'cleaning').length;
  const occupancyRate = Math.round((occupied / totalRooms) * 100);
  return { totalRooms, occupied, reserved, available, maintenance, dirty, cleaning, occupancyRate };
};

export const getTodayStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheckins = reservations.filter(r => r.checkIn === today || r.status === 'checked-in').length;
  const todayCheckouts = reservations.filter(r => r.checkOut === today).length;
  return { todayCheckins, todayCheckouts };
};
