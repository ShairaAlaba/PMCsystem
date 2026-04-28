<template>
  <div class="dashboard">
    <!-- Mobile overlay -->
    <div class="mobile-overlay" v-if="mobileNavOpen" @click="mobileNavOpen = false"></div>

    <!-- Mobile Top Bar -->
    <header class="mobile-topbar">
      <div class="mobile-topbar-left">
        <img src="@/assets/pmclogo.png" alt="GSO PMC Logo" class="mobile-logo" />
        <div class="mobile-brand">
          <div class="mb-title">PMC SYSTEM</div>
          <div class="mb-sub">Inspector Panel</div>
        </div>
      </div>
      <button class="hamburger-btn" @click="mobileNavOpen = !mobileNavOpen" :aria-expanded="mobileNavOpen">
        <span class="ham-line" :class="{open: mobileNavOpen}"></span>
        <span class="ham-line" :class="{open: mobileNavOpen}"></span>
        <span class="ham-line" :class="{open: mobileNavOpen}"></span>
      </button>
    </header>

    <!-- Mobile Nav Drawer -->
    <div class="mobile-drawer" :class="{open: mobileNavOpen}">
      <div class="drawer-user">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-info">
          <div class="user-name">{{ auth.currentUser?.name }}</div>
          <div class="user-role">Inspector</div>
        </div>
      </div>
      <nav class="drawer-nav">
        <button class="drawer-item" :class="{active: activeTab === 'new'}" @click="navTo('new')">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          New Record
        </button>
        <button class="drawer-item" :class="{active: activeTab === 'history'}" @click="navTo('history')">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          History
          <span class="drawer-badge" v-if="myRecords.length">{{ myRecords.length }}</span>
        </button>
      </nav>
      <div class="drawer-footer">
        <button class="logout-btn" @click="doLogout">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Sign Out
        </button>
      </div>
    </div>

    <!-- Desktop Sidebar -->
    <aside class="sidebar" :class="{collapsed: sidebarCollapsed}">
      <div class="sidebar-header">
        <img v-if="!sidebarCollapsed" src="@/assets/pmclogo.png" alt="GSO PMC Logo" class="sidebar-logo-img" />
        <div class="sidebar-brand" v-if="!sidebarCollapsed">
          <div class="sb-title">PMC SYSTEM</div>
          <div class="sb-sub">Inspector Panel</div>
        </div>
        <button class="collapse-btn" :class="{centered: sidebarCollapsed}" @click="sidebarCollapsed = !sidebarCollapsed">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      <div class="sidebar-user" v-if="!sidebarCollapsed">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-info">
          <div class="user-name">{{ auth.currentUser?.name }}</div>
          <div class="user-role">Inspector</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-title" v-if="!sidebarCollapsed">Menu</div>
        <button class="nav-item" :class="{active: activeTab === 'new'}" @click="activeTab = 'new'">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span v-if="!sidebarCollapsed">New Record</span>
        </button>
        <button class="nav-item" :class="{active: activeTab === 'history'}" @click="activeTab = 'history'">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span v-if="!sidebarCollapsed">History</span>
          <span class="nav-badge" v-if="!sidebarCollapsed && myRecords.length">{{ myRecords.length }}</span>
        </button>
      </nav>

      <div class="sidebar-footer" v-if="!sidebarCollapsed">
        <button class="logout-btn" @click="doLogout">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- PMC Banner Hero -->
      <div class="pmc-hero">
        <div class="pmc-hero-overlay">
          <h1 class="pmc-hero-title">PREVENTIVE MAINTENANCE CHECKLIST</h1>
          <p class="pmc-hero-sub">Caraga State University — Facilities Management</p>
        </div>
      </div>

      <!-- Header -->
      <div class="content-header">
        <div>
          <h1 class="content-title">{{ activeTab === 'new' ? 'New Record' : 'Record History' }}</h1>
          <p class="content-sub">{{ today }}</p>
        </div>
        <div class="header-actions">
          <div class="online-dot"></div>
          <span class="online-label">Online</span>
        </div>
      </div>

      <!-- NEW RECORD TAB -->
      <div v-if="activeTab === 'new'" class="tab-content">
        <div class="new-record-form card">
          <h3 class="card-title">Create New Checklist Record</h3>
          <p class="card-sub">Add a new janitor's monthly maintenance record</p>
          <div v-if="createMsg" class="alert" :class="createMsg.type === 'success' ? 'alert-success' : 'alert-error'">{{ createMsg.text }}</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Building Name</label>
              <select v-if="!showAddBuilding" v-model="selectedBuilding" class="form-control" @change="onBuildingSelect">
                <option value="" disabled>— Select a building —</option>
                <option v-for="b in allBuildings" :key="b" :value="b">{{ b }}</option>
                <option value="__add_new__">➕ Add New Building...</option>
              </select>
              <div v-if="showAddBuilding" class="new-building-row">
                <input v-model="newBuildingInput" type="text" class="form-control" placeholder="Type new building name..." @keyup.enter="confirmNewBuilding" />
                <button type="button" class="btn btn-primary" style="padding:10px 14px;white-space:nowrap;" @click="confirmNewBuilding">Save</button>
                <button type="button" class="btn btn-ghost" style="padding:10px 10px;" @click="cancelNewBuilding">✕</button>
              </div>
              <div v-if="newRec.buildingName && !showAddBuilding" class="selected-building-tag">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                {{ newRec.buildingName }}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Janitor Name</label>
              <input v-model="newRec.janitorName" type="text" class="form-control" placeholder="Enter janitor's full name" />
            </div>
            <div class="form-group">
              <label class="form-label">Assigned Utility Personnel</label>
              <div class="autofill-field">
                <input v-model="newRec.assignedPersonnel" type="text" class="form-control" readonly />
                <span class="autofill-badge">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  
                </span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Month</label>
              <select v-model="newRec.month" class="form-control">
                <option v-for="(m, i) in months" :key="i" :value="i+1">{{ m }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Year</label>
              <div class="year-stepper">
                <button type="button" class="year-btn" @click="newRec.year--">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <span class="year-display">{{ newRec.year }}</span>
                <button type="button" class="year-btn" @click="newRec.year++">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
          <button class="btn btn-primary" @click="createRecord">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Create Record
          </button>
        </div>

        <!-- Recent Records -->
        <div class="recent-records" v-if="myRecords.length">
          <h3 class="section-title">Your Recent Records</h3>
          <div class="records-grid">
            <div class="record-card" v-for="rec in myRecords.slice().reverse().slice(0,6)" :key="rec.id" @click="openRecord(rec.id)">
              <div class="rc-month-badge">{{ months[rec.month - 1] }} {{ rec.year }}</div>
              <div class="rc-janitor">{{ rec.buildingName }}</div>
              <div class="rc-building">{{ rec.janitorName }}</div>
              <div class="rc-progress">
                <div class="rc-prog-bar">
                  <div class="rc-prog-fill" :style="`width:${recordProgress(rec)}%`"></div>
                </div>
                <span>{{ recordProgress(rec) }}% filled</span>
              </div>
              <div class="rc-arrow">→</div>
            </div>
          </div>
        </div>
      </div>

      <!-- HISTORY TAB -->
      <div v-if="activeTab === 'history'" class="tab-content">
        <div class="history-filters card" style="margin-bottom:20px">
          <div class="filter-row">
            <input v-model="searchQ" type="text" class="form-control" placeholder="Search by building name..." style="max-width:300px" />
            <select v-model="filterMonth" class="form-control" style="max-width:160px">
              <option value="">All Months</option>
              <option v-for="(m, i) in months" :key="i" :value="i+1">{{ m }}</option>
            </select>
          </div>
        </div>

        <div v-if="filteredRecords.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-title">No records found</div>
          <div class="empty-sub">Create your first checklist record using the "New Record" menu</div>
        </div>

        <div class="records-list" v-else>
          <div class="history-card" v-for="rec in filteredRecords" :key="rec.id">
            <div class="hc-left">
              <div class="hc-month">{{ months[rec.month-1] }} {{ rec.year }}</div>
              <div class="hc-janitor">{{ rec.buildingName }}</div>
              <div class="hc-details">{{ rec.janitorName }} · {{ rec.assignedPersonnel }}</div>
            </div>
            <div class="hc-right">
              <div class="hc-progress">
                <div class="hc-bar">
                  <div class="hc-fill" :style="`width:${recordProgress(rec)}%`"></div>
                </div>
                <span>{{ recordProgress(rec) }}%</span>
              </div>
              <div class="hc-actions">
                <button class="btn btn-primary" style="padding:8px 18px;font-size:13px" @click="openRecord(rec.id)">
                  Open
                </button>
                <button class="btn btn-ghost" style="padding:8px;color:#dc2626" @click="deleteRec(rec.id)">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
              <button class="btn btn-add-month" @click.stop="openAddMonth(rec)">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                New Month
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add New Month Modal -->
    <div v-if="addMonthModal.show" class="modal-backdrop" @click.self="addMonthModal.show = false">
      <div class="modal-box">
        <div class="modal-header">
          <div class="modal-title">Add New Month</div>
          <button class="modal-close" @click="addMonthModal.show = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-rec-info">
            <div class="modal-building">{{ addMonthModal.buildingName }}</div>
            <div class="modal-janitor">{{ addMonthModal.janitorName }}</div>
          </div>
          <div v-if="addMonthModal.msg" class="alert" :class="addMonthModal.msg.type === 'error' ? 'alert-error' : 'alert-success'" style="margin-bottom:12px">{{ addMonthModal.msg.text }}</div>
          <div class="modal-fields">
            <div class="form-group" style="margin-bottom:14px">
              <label class="form-label">Month</label>
              <select v-model="addMonthModal.month" class="form-control">
                <option v-for="(m, i) in months" :key="i" :value="i+1">{{ m }}</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label">Year</label>
              <div class="year-stepper">
                <button type="button" class="year-btn" @click="addMonthModal.year--">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <span class="year-display">{{ addMonthModal.year }}</span>
                <button type="button" class="year-btn" @click="addMonthModal.year++">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" @click="addMonthModal.show = false">Cancel</button>
          <button class="btn btn-primary" @click="confirmAddMonth">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Create Record
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { usePmcStore } from '@/store/pmc'

const router = useRouter()
const auth = useAuthStore()
const pmc = usePmcStore()

const sidebarCollapsed = ref(false)
const activeTab = ref('new')
const searchQ = ref('')
const filterMonth = ref('')
const createMsg = ref(null)
const mobileNavOpen = ref(false)

function navTo(tab) {
  activeTab.value = tab
  mobileNavOpen.value = false
}

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const now = new Date()
const today = computed(() => now.toLocaleDateString('en-PH', { weekday:'long', year:'numeric', month:'long', day:'numeric' }))
const userInitials = computed(() => {
  const name = auth.currentUser?.name || ''
  return name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()
})

// ── Building Name Dropdown ──────────────────────────────────────
const DEFAULT_BUILDINGS = [
  'AGRO-FORESTRY SHED','AGRO-WORKSHOP/TESDA','ALUMNI OFFICE','AMANTE BUILDING',
  'ANNEX 2 (OLD LADIES DORM)','ANNEX 3','BARN HOUSE','BATOK HALL',
  'BEEF CATTLE BUILDING','BOOKSTORE AND ORGMS OFFICE','CAA CANTEEN',
  'CAA SWINE LABORATORY','CARAGA BLACK NATIVE CHICKEN','CCARD OFFICE',
  'CED BUILDING','CED CANTEEN','CED RESTROOM','CED STUDENT CENTER',
  'CFES CLASSROOM','CHURCH','CMNS LSG','COFES BUILDING',
  'COFES CLASSROOM/HOSTEL','CSU STUDENT CENTER','DAIRY',
  'DAIRY CARABAO FACILITY','DAIRY PROCESSING PLANT','ECO LODGE',
  'ECO PARK BUILDING','FARM MECHANIZATION CENTER','FEEDMILL',
  'FOOD INNOVATION CENT','FOOD TECH BUILDING',"GENTS' DORMITORY",
  "GENTS' DORMITORY (UNDER CONS.)",'GOAT HOUSE','GUARD HOUSE',
  'H.E.R.O. LEARNING COMMONS','HARDENING AREA','HINANG BUILDING',
  'HIRAYA BUILDING','HOSTEL','ITSO-TTLO OFFICE','KALINAW HALL',
  'KINAADMAN HALL',"LADIES' DORMITORY (UNDER CONS.)",'LIBRARY BUILDING',
  'MASAWA BUILDING','MICORIZA OFFICE','MOLBAM','NEW ADMINISTRATIVE BLDG',
  'OATC','OLD ADMINISTRATIVE BUILDING','OLD CAS BUILDING',
  'OLD FARM MECHANIZATION CENTER','PHYSICAL FITNESS OFFICE',
  'ROOTING RECOVERY','ROTC OFFICE','SCHOOL OF MEDICINE (UNDER CONS.)',
  'SHEEP HOUSE','TISSUE CULTURE LAB','UNIVERSITY GYMNASIUM (UNDER CONS.)',
  'VERMI HOUSE','WOOD WORKSHOP/TECH VOC BUILDING',
]
const customBuildings = ref(JSON.parse(localStorage.getItem('pmc_custom_buildings') || '[]'))
const allBuildings = computed(() => [...DEFAULT_BUILDINGS, ...customBuildings.value].sort((a, b) => a.localeCompare(b)))
const selectedBuilding = ref('')
const showAddBuilding = ref(false)
const newBuildingInput = ref('')

function onBuildingSelect() {
  if (selectedBuilding.value === '__add_new__') {
    selectedBuilding.value = ''
    showAddBuilding.value = true
    newBuildingInput.value = ''
  } else {
    newRec.value.buildingName = selectedBuilding.value
  }
}
function confirmNewBuilding() {
  const name = newBuildingInput.value.trim().toUpperCase()
  if (!name) return
  if (!DEFAULT_BUILDINGS.includes(name) && !customBuildings.value.includes(name)) {
    customBuildings.value.push(name)
    localStorage.setItem('pmc_custom_buildings', JSON.stringify(customBuildings.value))
  }
  newRec.value.buildingName = name
  selectedBuilding.value = name
  showAddBuilding.value = false
  newBuildingInput.value = ''
}
function cancelNewBuilding() {
  showAddBuilding.value = false
  newBuildingInput.value = ''
  selectedBuilding.value = ''
  newRec.value.buildingName = ''
}
// ────────────────────────────────────────────────────────────────

const newRec = ref({
  janitorName: '',
  buildingName: '',
  assignedPersonnel: auth.currentUser?.name || '',
  month: now.getMonth() + 1,
  year: now.getFullYear(),
})

const myRecords = computed(() => pmc.getByInspector(auth.currentUser?.id))

const filteredRecords = computed(() => {
  let r = myRecords.value
  if (searchQ.value) {
    const q = searchQ.value.toLowerCase()
    r = r.filter(x =>
      x.buildingName?.toLowerCase().includes(q) ||
      x.janitorName?.toLowerCase().includes(q)
    )
  }
  if (filterMonth.value) r = r.filter(x => x.month === Number(filterMonth.value))
  return r.slice().reverse()
})

function recordProgress(rec) {
  if (!rec.days?.length) return 0
  const today = new Date()
  const daysToCheck = rec.days.filter(d => {
    const date = new Date(rec.year, rec.month - 1, d.day)
    return date <= today
  })
  if (!daysToCheck.length) return 0
  let filled = 0, total = 0
  daysToCheck.forEach(d => {
    Object.values(d.am).forEach(v => { total++; if (v) filled++ })
    Object.values(d.pm).forEach(v => { total++; if (v) filled++ })
  })
  return total ? Math.round((filled / total) * 100) : 0
}

function createRecord() {
  createMsg.value = null
  if (!newRec.value.buildingName.trim()) { createMsg.value = { type:'error', text:'Please enter building name.' }; return }
  if (!newRec.value.janitorName.trim()) { createMsg.value = { type:'error', text:'Please enter janitor name.' }; return }
  
  const id = pmc.createRecord({
    inspectorId: auth.currentUser?.id,
    inspectorName: auth.currentUser?.name,
    janitorName: newRec.value.janitorName,
    buildingName: newRec.value.buildingName,
    assignedPersonnel: newRec.value.assignedPersonnel,
    month: newRec.value.month,
    year: newRec.value.year,
  })
  createMsg.value = { type:'success', text:`Record created for ${newRec.value.buildingName}!` }
  newRec.value = { janitorName:'', buildingName:'', assignedPersonnel: auth.currentUser?.name || '', month: now.getMonth()+1, year: now.getFullYear() }
  selectedBuilding.value = ''
  showAddBuilding.value = false
  setTimeout(() => router.push(`/inspector/record/${id}`), 800)
}

function openRecord(id) {
  router.push(`/inspector/record/${id}`)
}

function deleteRec(id) {
  if (confirm('Delete this record?')) pmc.deleteRecord(id)
}

function doLogout() {
  auth.logout()
  router.push('/')
}

// ── Add New Month Modal ──────────────────────────────────────────
const addMonthModal = ref({
  show: false,
  sourceId: null,
  buildingName: '',
  janitorName: '',
  assignedPersonnel: '',
  month: now.getMonth() + 1,
  year: now.getFullYear(),
  msg: null,
})

function openAddMonth(rec) {
  // Default to next month from this record
  let nextMonth = rec.month + 1
  let nextYear = rec.year
  if (nextMonth > 12) { nextMonth = 1; nextYear++ }
  addMonthModal.value = {
    show: true,
    sourceId: rec.id,
    buildingName: rec.buildingName,
    janitorName: rec.janitorName,
    assignedPersonnel: rec.assignedPersonnel,
    month: nextMonth,
    year: nextYear,
    msg: null,
  }
}

function confirmAddMonth() {
  addMonthModal.value.msg = null
  const { buildingName, janitorName, assignedPersonnel, month, year } = addMonthModal.value
  // Check duplicate
  const duplicate = pmc.records.find(r =>
    r.inspectorId === auth.currentUser?.id &&
    r.buildingName === buildingName &&
    r.janitorName === janitorName &&
    r.month === month &&
    r.year === year
  )
  if (duplicate) {
    addMonthModal.value.msg = { type: 'error', text: `A record for ${buildingName} — ${months[month-1]} ${year} already exists.` }
    return
  }
  const id = pmc.createRecord({
    inspectorId: auth.currentUser?.id,
    inspectorName: auth.currentUser?.name,
    janitorName,
    buildingName,
    assignedPersonnel,
    month,
    year,
  })
  addMonthModal.value.show = false
  setTimeout(() => router.push(`/inspector/record/${id}`), 100)
}
// ────────────────────────────────────────────────────────────────
</script>

<style scoped>
/* ============================================================
   SHARED DESIGN SYSTEM — Poppins + #003300 / #f9dc07 / #ff9900
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* { font-family: 'Poppins', sans-serif !important; }

.dashboard { display: flex; height: 100dvh; background: #f5f5f0; overflow: hidden; }
:global(html), :global(body) { overflow-x: hidden; max-width: 100%; }

/* ── SIDEBAR ── */
.sidebar {
  width: 260px;
  background: #003300;
  display: flex; flex-direction: column;
  flex-shrink: 0;
  position: relative; height: 100vh;
  overflow: hidden;
  box-shadow: 4px 0 24px rgba(0,0,0,0.18);
  transition: width 0.3s ease;
}
.sidebar.collapsed { width: 64px; }
.sidebar::before {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, #f9dc07, #ff9900, #f9dc07);
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 14px 14px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.sidebar-logo-img {
  width: 94px;
  height: 94px;
  object-fit: contain;
  object-position: center;
  display: block;
  flex-shrink: 0;
  margin-bottom: 2px;
}
.sidebar-brand {
  text-align: center;
  flex: 1;
  min-width: 0;
}
.sb-title {
  color: #ffffff;
  font-weight: 800; font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  line-height: 1.1;
}
.sb-sub {
  color: #f9dc07;
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 1px;
}

.collapse-btn {
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.35); padding: 4px; border-radius: 6px;
  display: flex; flex-shrink: 0; transition: all 0.2s;
}
.collapse-btn:hover { background: rgba(255,255,255,0.1); color: white; }
.collapse-btn.centered { width: 100%; justify-content: center; }

.sidebar-user {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.07);
  background: rgba(0,0,0,0.15); overflow: hidden;
}
.user-avatar {
  width: 36px; height: 36px; flex-shrink: 0;
  background: linear-gradient(135deg, #f9dc07, #ff9900);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; color: #003300;
}
.user-name { color: #fff; font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { color: #f9dc07; font-size: 10px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; }

.sidebar-nav { flex: 1; padding: 12px 8px; overflow-y: auto; }
.nav-section-title { color: rgba(255,255,255,0.22); font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 0 8px; margin-bottom: 8px; margin-top: 4px; white-space: nowrap; }
.nav-item {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border: none; border-radius: 8px;
  background: transparent; color: rgba(255,255,255,0.48);
  font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.22s ease; margin-bottom: 2px;
  text-align: left; white-space: nowrap; overflow: hidden;
  font-family: 'Poppins', sans-serif !important;
}
.nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; transform: translateX(3px); }
.nav-item.active {
  background: linear-gradient(135deg, #f9dc07, #e8cc00);
  color: #003300; font-weight: 700;
  box-shadow: 0 4px 12px rgba(249,220,7,0.28);
}
.nav-item.active svg { stroke: #003300; }
.nav-badge {
  margin-left: auto; background: rgba(249,220,7,0.18); color: #f9dc07;
  font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 99px;
  border: 1px solid rgba(249,220,7,0.25); flex-shrink: 0;
}
.nav-item.active .nav-badge { background: rgba(0,51,0,0.18); color: #003300; border-color: rgba(0,51,0,0.25); }

.sidebar-footer { padding: 12px; border-top: 1px solid rgba(255,255,255,0.07); }
.logout-btn {
  width: 100%; display: flex; align-items: center; gap: 8px;
  padding: 10px 12px; border: none; border-radius: 8px;
  background: rgba(255,80,80,0.08); color: rgba(255,120,120,0.8);
  font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s;
  font-family: 'Poppins', sans-serif !important; white-space: nowrap;
}
.logout-btn:hover { background: rgba(255,80,80,0.18); color: #ff6b6b; }

/* ── MAIN ── */
.main-content { flex: 1; overflow-y: auto; background: #f5f5f0; }

.content-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 28px 0; margin-bottom: 20px;
}
.content-title { font-size: 21px; font-weight: 700; color: #003300; letter-spacing: -0.2px; }
.content-sub { font-size: 11px; color: #999; margin-top: 2px; }
.header-actions { display: flex; align-items: center; gap: 8px; }
.online-dot { width: 9px; height: 9px; background: #22c55e; border-radius: 50%; animation: pulseGreen 2s infinite; }
.online-label { font-size: 12px; color: #009900; font-weight: 600; }

@keyframes pulseGreen {
  0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
  50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
}

.tab-content { padding: 0 28px 28px; animation: fadeUp 0.32s ease both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── CARDS ── */
.card {
  background: #fff; border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.055);
  padding: 22px; border: 1px solid rgba(0,0,0,0.045);
}
.card-title { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
.card-sub { font-size: 13px; color: #999; margin-bottom: 22px; }

/* ── PMC HERO BANNER ── */
.pmc-hero {
  width: 100%; padding-top: 21.05%; position: relative;
  overflow: hidden; flex-shrink: 0;
  background: url('@/assets/pmc.png') center center / 100% 100% no-repeat;
}
.pmc-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, rgba(0,30,0,0.72) 0%, rgba(0,51,0,0.45) 50%,);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
}
.pmc-hero-title {
  font-size: clamp(14px, 2vw, 25px); font-weight: 800; color: #fff;
  letter-spacing: 3px; text-shadow: 0 2px 16px rgb(0, 0, 0);
  margin: 0; line-height: 1.2; text-transform: uppercase;
}
.pmc-hero-sub { font-size: clamp(9px, 1vw, 12px); color: #f9dc07; margin-top: 6px; letter-spacing: 1px; font-weight: 500; }

/* ── FORMS ── */
.form-group { margin-bottom: 18px; }
.form-label { font-size: 11px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.6px; display: block; margin-bottom: 6px; }
.form-control {
  width: 100%; border: 1.5px solid #e5e5e5; border-radius: 8px;
  font-size: 13px; padding: 10px 13px; transition: border-color 0.2s, box-shadow 0.2s;
  color: #1a1a1a; background: #fafafa;
  font-family: 'Poppins', sans-serif !important;
}
.form-control:focus { border-color: #009900; outline: none; box-shadow: 0 0 0 3px rgba(0,153,0,0.1); background: #fff; }

/* ── BUTTONS ── */
.btn { font-family: 'Poppins', sans-serif !important; font-weight: 600; border-radius: 8px; transition: all 0.2s; }
.btn-primary { background: linear-gradient(135deg,#009900,#006600); color: #fff; box-shadow: 0 3px 10px rgba(0,153,0,0.28); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,153,0,0.36); }
.btn-ghost { background: transparent; color: #666; }
.btn-ghost:hover { background: #f0f0ea; color: #003300; }

/* ── BADGES ── */
.badge-online { background: #e6f7e6; color: #007700; }
.badge-offline { background: #ffeaea; color: #cc0000; }

/* ── ALERTS ── */
.alert-success { background: #e6f7e6; color: #006600; border-left: 4px solid #009900; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
.alert-error { background: #ffeaea; color: #cc0000; border-left: 4px solid #ff4444; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }

/* ── TABLE ── */
th { background: #003300 !important; color: #fff !important; font-family: 'Poppins',sans-serif !important; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.4px; padding: 10px 14px !important; }
td { font-family: 'Poppins',sans-serif !important; font-size: 13px !important; color: #333; }
tr:nth-child(even) td { background: #f9f9f5 !important; }
tr:hover td { background: #f0f5f0 !important; }

/* ── EMPTY STATE ── */
.empty-state { text-align: center; padding: 60px 20px; }
.empty-icon { font-size: 44px; margin-bottom: 12px; }
.empty-title { font-size: 17px; font-weight: 600; color: #777; }
.empty-sub { font-size: 13px; color: #aaa; margin-top: 6px; }

.delete-btn { color: #cc2200 !important; padding: 6px !important; }
.delete-btn:hover { background: #fff0ee !important; }

/* History / records */
.history-filters .filter-row { display: flex; gap: 12px; align-items: center; }
.records-list { display: flex; flex-direction: column; gap: 10px; }
.history-card {
  background: #fff; border: 1.5px solid #eee;
  border-radius: 12px; padding: 16px 20px;
  display: flex; align-items: flex-start; justify-content: space-between;
  transition: all 0.22s; gap: 16px;
}
.history-card:hover { border-color: #009900; box-shadow: 0 4px 14px rgba(0,0,0,0.07); }
.hc-month { font-size: 10px; color: #009900; font-weight: 700; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px; }
.hc-janitor { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 3px; }
.hc-details { font-size: 12px; color: #aaa; }
.hc-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.hc-progress { display: flex; align-items: center; gap: 8px; }
.hc-bar { width: 110px; height: 7px; background: #eee; border-radius: 99px; overflow: hidden; }
.hc-fill { height: 100%; background: linear-gradient(90deg,#009900,#44cc44); border-radius: 99px; transition: width 0.5s; }
.hc-progress span { font-size: 12px; color: #888; width: 34px; }
.hc-actions { display: flex; gap: 6px; }

/* Record grid */
.section-title { font-size: 17px; font-weight: 700; color: #1a1a1a; margin-bottom: 14px; }
.records-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
.record-card {
  background: #fff; border: 1.5px solid #eee; border-radius: 12px;
  padding: 18px; cursor: pointer; transition: all 0.22s; position: relative;
}
.record-card:hover { border-color: #009900; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.09); }
.rc-month-badge {
  display: inline-block; background: linear-gradient(135deg,#f9dc07,#ff9900);
  color: #003300; padding: 3px 10px; border-radius: 99px;
  font-size: 11px; font-weight: 700; margin-bottom: 10px;
}
.rc-janitor { font-weight: 700; font-size: 14px; color: #1a1a1a; margin-bottom: 3px; }
.rc-building { font-size: 12px; color: #aaa; margin-bottom: 12px; }
.rc-progress { display: flex; align-items: center; gap: 8px; }
.rc-prog-bar { flex: 1; height: 5px; background: #eee; border-radius: 99px; overflow: hidden; }
.rc-prog-fill { height: 100%; background: linear-gradient(90deg,#009900,#44cc44); border-radius: 99px; transition: width 0.5s; }
.rc-progress span { font-size: 11px; color: #aaa; white-space: nowrap; }
.rc-arrow { position: absolute; top: 18px; right: 18px; color: #009900; font-size: 16px; }

.autofill-field { position: relative; }
.autofill-field .form-control { background: #f0fdf4; border-color: #bbf7d0; color: #166534; font-weight: 600; cursor: default; }
.autofill-badge {
  position: absolute; top: 50%; right: 10px; transform: translateY(-50%);
  display: inline-flex; align-items: center; gap: 4px;
  background: #dcfce7; color: #166534;
  font-size: 10px; font-weight: 700; padding: 2px 8px;
  border-radius: 99px; pointer-events: none;
  letter-spacing: 0.3px;
}

.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 22px; }
.new-record-form { margin-bottom: 28px; }

/* ── YEAR STEPPER ── */
.new-building-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.new-building-row .form-control {
  flex: 1;
}
.selected-building-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  padding: 4px 10px;
  background: #e8f5e9;
  color: #1b5e20;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
}

.year-stepper {
  display: flex;
  align-items: center;
  border: 1.5px solid #e5e5e5;
  border-radius: 8px;
  background: #fafafa;
  overflow: hidden;
  height: 42px;
}
.year-btn {
  width: 40px; height: 100%;
  border: none; background: transparent;
  cursor: pointer; color: #555;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.18s;
  flex-shrink: 0;
  font-family: 'Poppins', sans-serif !important;
}
.year-btn:hover { background: #003300; color: #f9dc07; }
.year-display {
  flex: 1; text-align: center;
  font-size: 15px; font-weight: 700; color: #1a1a1a;
  font-family: 'Poppins', sans-serif !important;
  border-left: 1.5px solid #e5e5e5;
  border-right: 1.5px solid #e5e5e5;
  user-select: none;
}

/* ══════════════════════════════════════
   RESPONSIVE — Tablet & Mobile
   ══════════════════════════════════════ */

/* Tablet (768–1024px): sidebar collapses, content reflows */
@media (max-width: 1024px) {
  .sidebar { width: 220px; }
  .tab-content { padding: 0 16px 24px; }
  .records-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
}

/* ── Mobile Top Bar & Hamburger ── */
.mobile-topbar { display: none; }
.mobile-overlay { display: none; }
.mobile-drawer { display: none; }

/* Mobile (≤768px) */
/* Mobile (≤768px) */
@media (max-width: 768px) {
  /* Hide desktop sidebar */
  .sidebar { display: none !important; }
  .dashboard { flex-direction: column; height: 100svh; overflow: auto; }

  /* Sticky top bar */
  .mobile-topbar {
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 200; background: #003300;
    padding: 0 16px; height: 58px; flex-shrink: 0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  }
  .mobile-topbar::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f9dc07, #ff9900, #f9dc07);
  }
  .mobile-topbar-left { display: flex; align-items: center; gap: 10px; }
  .mobile-logo { width: 36px; height: 36px; object-fit: contain; }
  .mobile-brand .mb-title { font-size: 13px; font-weight: 800; color: #f9dc07; letter-spacing: 0.5px; line-height: 1.1; }
  .mobile-brand .mb-sub { font-size: 10px; color: rgba(255,255,255,0.55); letter-spacing: 0.3px; }

  .hamburger-btn {
    background: transparent; border: none; cursor: pointer;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    gap: 5px; width: 42px; height: 42px; border-radius: 8px; transition: background 0.2s;
    padding: 0; flex-shrink: 0;
  }
  .hamburger-btn:hover { background: rgba(255,255,255,0.08); }
  .ham-line {
    display: block; width: 22px; height: 2.5px; background: #f9dc07;
    border-radius: 2px; transition: all 0.3s ease; transform-origin: center;
  }
  .ham-line.open:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
  .ham-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ham-line.open:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

  .mobile-overlay {
    display: block; position: fixed; inset: 0;
    background: rgba(0,0,0,0.45); z-index: 150; animation: fadeIn 0.2s ease;
  }
  .mobile-drawer {
    display: flex; flex-direction: column;
    position: fixed; top: 58px; left: 0; right: 0; z-index: 160; background: #003300;
    transform: translateY(-110%); transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.35); border-bottom: 3px solid #f9dc07;
    max-height: calc(100svh - 58px); overflow-y: auto;
  }
  .mobile-drawer.open { transform: translateY(0); }
  .drawer-user { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .drawer-nav { display: flex; flex-direction: column; padding: 10px 12px; gap: 4px; }
  .drawer-item {
    display: flex; align-items: center; gap: 12px; padding: 13px 16px;
    border: none; background: transparent; color: rgba(255,255,255,0.75);
    border-radius: 10px; font-family: 'Poppins', sans-serif; font-size: 14px;
    font-weight: 500; cursor: pointer; transition: all 0.2s; text-align: left; width: 100%;
  }
  .drawer-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .drawer-item.active { background: linear-gradient(135deg, #f9dc07, #ff9900); color: #003300; font-weight: 700; }
  .drawer-badge { margin-left: auto; background: rgba(255,255,255,0.15); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 99px; }
  .drawer-item.active .drawer-badge { background: rgba(0,51,0,0.2); color: #003300; }
  .drawer-footer { padding: 12px 20px 20px; border-top: 1px solid rgba(255,255,255,0.08); }

  /* No horizontal scroll on main */
  .main-content { width: 100%; max-width: 100vw; overflow-x: hidden; overflow-y: auto; flex: 1; }

  /* Hero */
  .pmc-hero { padding-top: 38%; background-size: cover !important; }
  .pmc-hero-title { font-size: clamp(9px, 3.5vw, 15px); letter-spacing: 1px; }
  .pmc-hero-sub { font-size: clamp(7px, 2.2vw, 10px); margin-top: 3px; }

  /* Content header */
  .content-header { padding: 14px 12px 0; margin-bottom: 10px; flex-wrap: wrap; gap: 4px; }
  .content-title { font-size: 17px; }
  .header-actions { gap: 6px; }

  /* Tab */
  .tab-content { padding: 0 12px 24px; }

  /* Cards */
  .card { padding: 14px; border-radius: 12px; overflow-wrap: break-word; word-break: break-word; }
  .card-title { font-size: 14px; }
  .card-sub { font-size: 12px; margin-bottom: 14px; }

  /* Forms */
  .form-grid { grid-template-columns: 1fr; gap: 12px; }
  .form-control { font-size: 14px; padding: 11px 13px; }

  /* Record cards */
  .records-grid { grid-template-columns: 1fr; gap: 10px; }
  .record-card { padding: 14px; }

  /* History filters */
  .history-filters { margin-bottom: 14px; }
  .history-filters .filter-row { flex-direction: column; gap: 10px; }
  .history-filters .form-control { max-width: 100% !important; width: 100%; }

  /* History cards */
  .history-card { flex-direction: column; align-items: flex-start; gap: 10px; padding: 14px; }
  .hc-right { width: 100%; justify-content: space-between; align-items: center; flex-direction: row; gap: 10px; }
  .hc-bar { flex: 1; width: auto; min-width: 60px; }
  .hc-progress { flex: 1; gap: 8px; }
  .hc-actions { flex-shrink: 0; }
  .hc-janitor { font-size: 14px; }

  /* Legend */
  .legend { flex-wrap: wrap; gap: 8px; padding: 10px 12px; margin: 0 0 12px; }

  /* Buttons */
  .btn { font-size: 12px; padding: 8px 14px; }
}

/* Small mobile (≤420px) */
@media (max-width: 420px) {
  .tab-content { padding: 0 10px 20px; }
  .content-header { padding: 12px 10px 0; }
  .content-title { font-size: 15px; }
  .card { padding: 12px; }
  .btn { font-size: 12px; padding: 8px 12px; }
}

/* ── Add New Month button ── */
.btn-add-month {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; font-size: 12px; font-weight: 600;
  background: #f0fdf4; color: #166534;
  border: 1.5px solid #bbf7d0; border-radius: 99px;
  cursor: pointer; transition: all 0.2s; white-space: nowrap;
  margin-top: 10px;
  font-family: 'Poppins', sans-serif !important;
}
.btn-add-month:hover { background: #dcfce7; border-color: #4ade80; color: #14532d; }

/* ── Modal ── */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
  animation: fadeIn 0.18s ease;
}
.modal-box {
  background: #fff; border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.22);
  width: 100%; max-width: 400px;
  animation: fadeUp 0.22s ease;
  overflow: hidden;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #f0f0f0;
}
.modal-title { font-size: 16px; font-weight: 700; color: #003300; }
.modal-close {
  background: none; border: none; font-size: 16px; cursor: pointer;
  color: #aaa; line-height: 1; padding: 2px 6px; border-radius: 6px;
  transition: all 0.15s;
}
.modal-close:hover { background: #fee2e2; color: #dc2626; }
.modal-body { padding: 18px 20px; }
.modal-rec-info { margin-bottom: 16px; padding: 10px 14px; background: #f0fdf4; border-radius: 10px; border-left: 3px solid #22c55e; }
.modal-building { font-size: 14px; font-weight: 700; color: #14532d; }
.modal-janitor { font-size: 12px; color: #166534; margin-top: 2px; }
.modal-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.modal-footer {
  display: flex; justify-content: flex-end; gap: 10px;
  padding: 14px 20px 18px;
  border-top: 1px solid #f0f0f0;
}
</style>