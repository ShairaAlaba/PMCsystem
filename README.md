# CSU Preventive Maintenance Checklist System

## Stack
- **Vue 3** (Composition API)
- **Vue Router 4** (Hash mode)
- **Pinia** (State Management)
- **Vite** (Build Tool)
- **localStorage** (Data Persistence)

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open: http://localhost:5173

### 3. Build for Production
```bash
npm run build
```

---

## Project Structure

```
src/
├── assets/
│   └── global.css          # Green theme CSS variables & utilities
├── store/
│   ├── auth.js             # Auth store (login, register, roles)
│   └── pmc.js              # PMC records store (CRUD)
├── router/
│   └── index.js            # Routes with auth guards
├── views/
│   ├── LandingPage.vue     # Public landing page
│   ├── AuthPage.vue        # Login + Register (2-step)
│   ├── InspectorDashboard.vue  # Inspector panel
│   ├── RecordView.vue      # PMC checklist form
│   └── AdminDashboard.vue  # Admin panel
└── App.vue
```

---

## Features

### Landing Page
- Animated green-themed hero with floating UI cards
- Features section, CTA, footer
- "Get Started" button → Auth page

### Authentication
- Two roles: **Inspector** and **Admin**
- 2-step registration: info → email verification code
- Email code verification (demo: shows code in UI for testing)
- Route guards — redirect based on role

### Inspector Panel
- **New Record** — create checklist for any janitor
- Can add **multiple records** (different janitors, different months)
- **Record View** — full 31-day PMC table (AM & PM for 11 tasks)
- **Only today's row is editable** — past/future days are locked
- **History** — view all records, filter by month/name

### Record View (Checklist)
- Matches official CSU PMC format exactly
- 11 maintenance tasks × AM/PM = 22 columns
- Click cell to toggle ✓
- Remarks and Inspected By fields per day
- **Print button** → browser print with proper print CSS

### Admin Panel
- **Overview** — stats cards + inspector online/offline status
- **All Records** — view any inspector's records
- **View & Print** — print any record from modal
- **Inspectors** — list with status, join date, login time, record count
- **Activity Logs** — full login/logout history with duration

---

## Data Storage
All data is stored in **localStorage**:
- `pmc_accounts` — user accounts
- `pmc_user` — current logged-in user
- `pmc_records` — all PMC records
- `pmc_online_logs` — activity logs

> For production: replace localStorage with a backend API (Node.js + MySQL or Firebase)

---

## Print Format
The printed output matches the official CSU government form:
- CSU header with logo area, address, ISO certifications
- Building Name, Month, Inspected By, Assigned Personnel
- 31-row table with all 11 tasks (AM/PM), Remarks, Inspected By columns

---

## Colors (Green Theme)
```
--green-darkest: #003300
--green-forest:  #228b22
--green-primary: #00c04b
--green-light:   #70c247
--green-lighter: #8dd06c
```

---

## Demo Account Setup
1. Go to `/auth` → Create Account
2. Choose role: **Inspector** or **Admin**
3. Copy the verification code shown in the blue info box
4. Paste it in the verification field → Create Account

Or create two accounts (one Inspector, one Admin) to test both panels.
