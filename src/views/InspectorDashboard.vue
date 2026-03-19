<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{collapsed: sidebarCollapsed}">
      <div class="sidebar-header">
        <img v-if="!sidebarCollapsed" src="@/assets/logopmc.png" alt="GSO PMC Logo" class="sidebar-logo-img" />
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
              <label class="form-label">Janitor Name</label>
              <input v-model="newRec.janitorName" type="text" class="form-control" placeholder="Enter janitor's full name" />
            </div>
            <div class="form-group">
              <label class="form-label">Building Name</label>
              <input v-model="newRec.buildingName" type="text" class="form-control" placeholder="e.g. Admin Building" />
            </div>
            <div class="form-group">
              <label class="form-label">Assigned Utility Personnel</label>
              <input v-model="newRec.assignedPersonnel" type="text" class="form-control" placeholder="Personnel name" />
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
              <div class="rc-janitor">{{ rec.janitorName }}</div>
              <div class="rc-building">{{ rec.buildingName }}</div>
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
            <input v-model="searchQ" type="text" class="form-control" placeholder="Search by janitor name..." style="max-width:300px" />
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
              <div class="hc-janitor">{{ rec.janitorName }}</div>
              <div class="hc-details">{{ rec.buildingName }} · {{ rec.assignedPersonnel }}</div>
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
            </div>
          </div>
        </div>
      </div>
    </main>
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

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const now = new Date()
const today = computed(() => now.toLocaleDateString('en-PH', { weekday:'long', year:'numeric', month:'long', day:'numeric' }))
const userInitials = computed(() => {
  const name = auth.currentUser?.name || ''
  return name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()
})

const newRec = ref({
  janitorName: '',
  buildingName: '',
  assignedPersonnel: '',
  month: now.getMonth() + 1,
  year: now.getFullYear(),
})

const myRecords = computed(() => pmc.getByInspector(auth.currentUser?.id))

const filteredRecords = computed(() => {
  let r = myRecords.value
  if (searchQ.value) r = r.filter(x => x.janitorName.toLowerCase().includes(searchQ.value.toLowerCase()))
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
  if (!newRec.value.janitorName.trim()) { createMsg.value = { type:'error', text:'Please enter janitor name.' }; return }
  if (!newRec.value.buildingName.trim()) { createMsg.value = { type:'error', text:'Please enter building name.' }; return }
  if (!newRec.value.assignedPersonnel.trim()) { createMsg.value = { type:'error', text:'Please enter assigned personnel.' }; return }
  
  const id = pmc.createRecord({
    inspectorId: auth.currentUser?.id,
    inspectorName: auth.currentUser?.name,
    janitorName: newRec.value.janitorName,
    buildingName: newRec.value.buildingName,
    assignedPersonnel: newRec.value.assignedPersonnel,
    month: newRec.value.month,
    year: newRec.value.year,
  })
  createMsg.value = { type:'success', text:`Record created for ${newRec.value.janitorName}!` }
  newRec.value = { janitorName:'', buildingName:'', assignedPersonnel:'', month: now.getMonth()+1, year: now.getFullYear() }
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
</script>

<style scoped>
/* ============================================================
   SHARED DESIGN SYSTEM — Poppins + #003300 / #f9dc07 / #ff9900
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* { font-family: 'Poppins', sans-serif !important; }

.dashboard { display: flex; min-height: 100vh; background: #f5f5f0; }

/* ── SIDEBAR ── */
.sidebar {
  width: 260px;
  background: #003300;
  display: flex; flex-direction: column;
  flex-shrink: 0;
  position: sticky; top: 0; height: 100vh;
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
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 14px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.sidebar-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  object-position: center;
  display: block;
  flex-shrink: 0;
}
.sidebar-brand {
  text-align: left;
  flex: 1;
  min-width: 0;
}
.sb-title {
  color: #ffffff;
  font-weight: 800; font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.sb-sub {
  color: #f9dc07;
  font-size: 10px; font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 2px;
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
  background: linear-gradient(105deg, rgba(0,30,0,0.72) 0%, rgba(0,51,0,0.45) 50%, rgba(0,30,0,0.65) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
}
.pmc-hero-title {
  font-size: clamp(14px, 2vw, 25px); font-weight: 800; color: #fff;
  letter-spacing: 3px; text-shadow: 0 2px 16px rgba(0,0,0,0.7);
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
  display: flex; align-items: center; justify-content: space-between;
  transition: all 0.22s;
}
.history-card:hover { border-color: #009900; box-shadow: 0 4px 14px rgba(0,0,0,0.07); }
.hc-month { font-size: 10px; color: #009900; font-weight: 700; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px; }
.hc-janitor { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 3px; }
.hc-details { font-size: 12px; color: #aaa; }
.hc-right { display: flex; align-items: center; gap: 16px; }
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

.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 22px; }
.new-record-form { margin-bottom: 28px; }

/* ── YEAR STEPPER ── */
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
</style>