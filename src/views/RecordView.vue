<template>
  <div class="record-page">
    <!-- Top Bar -->
    <div class="top-bar no-print">
      <button class="btn btn-ghost" @click="goBack">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back
      </button>
      <div class="top-title">
        <span>{{ displayPersonnel }}</span>
        <span class="top-month">— {{ months[record?.month - 1] }} {{ record?.year }}</span>
      </div>
      <div class="top-actions">
        <transition name="fade-saved">
          <span v-if="savedMsg" class="saved-msg">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            Saved
          </span>
        </transition>
        <button v-if="!isAdmin && hasEdits" class="btn btn-primary" @click="saveAll">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save
        </button>
        <button v-if="isAdmin" class="btn btn-primary" @click="printRecord">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Print
        </button>
      </div>
    </div>

    <!-- Printable Area -->
    <div class="print-area" ref="printArea">
      <!-- Print Header -->
      <div class="print-header">
        <div class="header-left">
          <img src="../assets/1.png" alt="Caraga State University" class="header-img">
        </div>
        <div class="header-right">
          <img src="../assets/2.png" alt="Bagong Pilipinas Logos" class="header-img">
        </div>
      </div>

      <!-- Record Info -->
      <div class="rec-info">
        <div class="ri-field">
          <span class="ri-label">Building Name:</span>
          <span class="ri-value ri-value--wide">{{ record?.buildingName }}</span>
        </div>
        <div class="ri-field">
          <span class="ri-label">Month:</span>
          <span class="ri-value ri-value--wide">{{ months[record?.month - 1] }} {{ record?.year }}</span>
        </div>
        <div class="ri-field">
          <span class="ri-label">Inspected by:</span>
          <span class="ri-value ri-value--wide">{{ record?.inspectorName }}</span>
        </div>
      </div>
      <div class="rec-info" style="margin-bottom: 8px;">
        <div class="ri-field">
          <span class="ri-label">Assigned Utility Personnel:</span>
          <span class="ri-value">{{ displayPersonnel }}</span>
        </div>
      </div>

      <!-- CHECKLIST TABLE -->
      <div class="table-wrap">
        <table class="pmc-table">
          <thead>
            <tr>
              <th rowspan="2" class="th-date">DATE</th>
              <th colspan="2" class="th-task">Mopping<br>of Floor</th>
              <th colspan="2" class="th-task">Cleaning<br>Lavatory</th>
              <th colspan="2" class="th-task">Cleaning<br>Water Closet</th>
              <th colspan="2" class="th-task">Cleaning<br>Wall Tiles</th>
              <th colspan="2" class="th-task">Cleaning<br>of Urinals</th>
              <th colspan="2" class="th-task">Spraying<br>Air Refresher</th>
              <th colspan="2" class="th-task">Disposing<br>of Garbage</th>
              <th colspan="2" class="th-task">Cleaning<br>Dust/Window</th>
              <th colspan="2" class="th-task">Cleaning<br>of Mirror</th>
              <th colspan="2" class="th-task">Checking<br>Floor Drain</th>
              <th colspan="2" class="th-task">Checking<br>of Faucet</th>
              <th rowspan="2" class="th-remarks">REMARKS</th>
              <th rowspan="2" class="th-inspected">INSPECTED<br>BY</th>
            </tr>
            <tr>
              <th class="th-ampm" v-for="n in 22" :key="n">{{ n % 2 === 1 ? 'AM' : 'PM' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(day, idx) in record?.days" :key="idx" :class="{today: isToday(day.day), locked: !canEdit(day.day)}">
              <td class="td-date">{{ day.day }}</td>
              <template v-for="field in taskFields" :key="field + '-am'">
                <td><div class="cell-wrap" :class="{editable: canEdit(day.day)}" @click.stop="openPicker($event, idx, 'am', field, day.day)"><span v-if="cellVal(day.am[field]) === 'check'" class="check-mark">✓</span><span v-else-if="cellVal(day.am[field]) === 'x'" class="x-mark">✗</span></div></td>
                <td><div class="cell-wrap" :class="{editable: canEdit(day.day)}" @click.stop="openPicker($event, idx, 'pm', field, day.day)"><span v-if="cellVal(day.pm[field]) === 'check'" class="check-mark">✓</span><span v-else-if="cellVal(day.pm[field]) === 'x'" class="x-mark">✗</span></div></td>
              </template>
              <td class="td-remarks">
                <input v-if="canEdit(day.day)" v-model="day.remarks" @change="saveRemarks(idx, day.remarks)" type="text" class="remarks-input" placeholder="..." />
                <span v-else>{{ day.remarks }}</span>
              </td>
              <td class="td-inspected">
                <input v-if="canEdit(day.day)" v-model="day.inspectedBy" @change="saveInspectedBy(idx, day.inspectedBy)" type="text" class="remarks-input" placeholder="..." />
                <span v-else>{{ day.inspectedBy }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Print Footer -->
      <div class="print-footer">
        <span class="print-footer-label">F-GEN-PMC-003b Rev. 3, {{ printDate }}</span>
      </div>
    </div>

    <!-- Cell Picker Popup -->
    <teleport to="body">
      <div v-if="picker.visible" class="cell-picker" :style="{ top: picker.y + 'px', left: picker.x + 'px' }" @click.stop>
        <button class="picker-btn picker-check" @click="pickValue('check')">
          <span class="picker-icon">✓</span>
          <span class="picker-label">Check</span>
        </button>
        <button class="picker-btn picker-x" @click="pickValue('x')">
          <span class="picker-icon">✗</span>
          <span class="picker-label">Not Done</span>
        </button>
        <button class="picker-btn picker-clear" @click="pickValue(null)">
          <span class="picker-icon">—</span>
          <span class="picker-label">Clear</span>
        </button>
      </div>
      <div v-if="picker.visible" class="picker-backdrop" @click="closePicker"></div>
    </teleport>

    <!-- Legend -->
    <div class="legend no-print">
      <div class="legend-item"><div class="leg-check">✓</div> Completed / Done</div>
      <div class="legend-item"><div class="leg-x">✗</div> Not Done</div>
      <div class="legend-item"><div class="leg-empty"></div> No entry</div>
      <div class="legend-item today-leg"><div class="leg-today"></div> Today (editable)</div>
      <div class="legend-item"><div class="leg-locked"></div> Locked</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePmcStore } from '@/store/pmc'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()
const pmc = usePmcStore()
const auth = useAuthStore()

onMounted(() => { pmc.refresh() })

const isAdmin = computed(() => auth.isAdmin)
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const now = new Date()
const todayDate = now.getDate()
const todayMonth = now.getMonth() + 1
const todayYear = now.getFullYear()
const record = computed(() => pmc.getRecord(route.params.id))

// Show assignedPersonnel; but if it was incorrectly saved as the inspector's name
// (old records), fall back to janitorName, then empty string.
const displayPersonnel = computed(() => {
  const r = record.value
  if (!r) return ''
  const assigned = r.assignedPersonnel || ''
  const inspector = r.inspectorName || ''
  // If assignedPersonnel is blank or is the same as the inspector, use janitorName
  if (!assigned || assigned === inspector) return r.janitorName || ''
  return assigned
})

const taskFields = ['mopFloor','cleanLavatory','cleanWaterCloset','cleanWallTiles','cleanUrinals','sprayAir','disposeGarbage','cleanDustWindow','cleanMirror','checkFloorDrain','checkFaucet']

const printDate = computed(() => {
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = String(now.getFullYear())
  return `${dd}/${mm}/${yyyy}`
})

const hasEdits = ref(false)
const savedMsg = ref(false)
const hasSaved = ref(false)
let savedTimer = null

// Picker state
const picker = ref({ visible: false, x: 0, y: 0, dayIdx: null, amPm: null, field: null })

function cellVal(raw) {
  // Support legacy boolean true → 'check'
  if (raw === true) return 'check'
  if (raw === 'check' || raw === 'x') return raw
  return null
}

function openPicker(e, dayIdx, amPm, field, dayNum) {
  if (!canEdit(dayNum)) return
  const rect = e.currentTarget.getBoundingClientRect()
  const popupW = 200
  const popupH = 80
  // Clamp x so popup never exits right edge
  let x = rect.left + window.scrollX
  if (x + popupW > window.innerWidth + window.scrollX - 8) {
    x = window.innerWidth + window.scrollX - popupW - 8
  }
  // Clamp y so popup never exits bottom edge
  let y = rect.bottom + window.scrollY + 4
  if (y + popupH > window.innerHeight + window.scrollY - 8) {
    y = rect.top + window.scrollY - popupH - 4
  }
  picker.value = { visible: true, x, y, dayIdx, amPm, field }
}

function pickValue(val) {
  const { dayIdx, amPm, field } = picker.value
  if (dayIdx === null) return
  pmc.updateDay(route.params.id, dayIdx, amPm, field, val)
  hasEdits.value = true
  closePicker()
}

function closePicker() {
  picker.value = { ...picker.value, visible: false }
}

function onKeydown(e) { if (e.key === 'Escape') closePicker() }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

function goBack() { router.push(auth.isAdmin ? '/admin' : '/inspector') }

function flashSaved() {
  savedMsg.value = true
  hasEdits.value = false
  hasSaved.value = true
  clearTimeout(savedTimer)
  savedTimer = setTimeout(() => { savedMsg.value = false }, 2500)
}

async function saveAll() {
  flashSaved()
  await new Promise(resolve => setTimeout(resolve, 800))
  router.push(auth.isAdmin ? '/admin' : '/inspector')
}

function isToday(day) {
  return day === todayDate && record.value?.month === todayMonth && record.value?.year === todayYear
}

function canEdit(day) {
  if (!record.value) return false
  if (auth.isAdmin) return false
  // Only the inspector who owns this record can edit it
  if (record.value.inspectorId !== auth.currentUser?.id) return false
  if (record.value.year !== todayYear || record.value.month !== todayMonth) return false
  return day === todayDate
}

function saveRemarks(dayIdx, val) { pmc.updateDayRemarks(route.params.id, dayIdx, val); hasEdits.value = true }
function saveInspectedBy(dayIdx, val) { pmc.updateDayInspectedBy(route.params.id, dayIdx, val); hasEdits.value = true }
function printRecord() { window.print() }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');

.record-page { height: 100vh; display: flex; flex-direction: column; background: var(--green-mist); overflow: hidden; }

.top-bar {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 24px;
  background: white;
  border-bottom: 1px solid var(--gray-200);
  position: sticky; top: 0; z-index: 50;
  box-shadow: var(--shadow-sm);
}
.top-title { flex: 1; font-weight: 700; font-size: 16px; color: var(--green-darkest); }
.top-month { font-weight: 400; color: var(--gray-500); }
.top-actions { display: flex; gap: 10px; min-width: 100px; justify-content: flex-end; }

.print-area {
  background: white;
  margin: 20px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 24px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* =====================
   PRINT STYLES
   ===================== */
@media print {
  @page {
    size: 13in 8.5in;
    /* margin: 0 removes all browser-injected title / date / page-number headers & footers */
    margin: 0;
  }

  .no-print, .legend, .top-bar { display: none !important; }
  .record-page { background: white !important; }

  .print-area {
    margin: 0 !important;
    padding: 8mm 8mm 5mm 8mm !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    overflow: visible !important;
    width: 100% !important;
    box-sizing: border-box !important;
    height: auto !important;
    max-height: none !important;
    display: flex !important;
    flex-direction: column !important;
  }

  /* ── Header images ── */
  .print-header {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    margin: 0 0 3mm 0 !important;
    padding: 0 !important;
    flex-shrink: 0 !important;
    box-sizing: border-box !important;
  }
  .header-left, .header-right { flex: 0 0 auto !important; max-width: 45% !important; }
  .header-img { max-height: 90px !important; max-width: 100% !important; height: auto !important; display: block !important; object-fit: contain !important; }

  /* ── Record info ── */
  .rec-info { display: flex !important; gap: 24px !important; margin-bottom: 2px !important; margin-top: 2px !important; flex-wrap: nowrap !important; flex-shrink: 0 !important; }
  .ri-label { font-size: 10px !important; font-weight: 700 !important; color: #000 !important; white-space: nowrap !important; }
  .ri-value { font-size: 10px !important; color: #000 !important; min-width: 70px !important; }
  .ri-value--wide { min-width: 160px !important; }

  .table-wrap { overflow: visible !important; width: 100% !important; flex: 1 !important; }

  /* ══════════════════════════════════════
     TABLE — uniform layout
     Column budget (13in landscape, ~297mm usable after padding):
       DATE         :  3%
       22 AM/PM cols:  3% each  → 66%
       REMARKS      : 16%
       INSPECTED BY : 15%
       TOTAL        : 100%
     Task header rows span 2 AM/PM cols = 6% each (via colspan="2")
     ══════════════════════════════════════ */
  .pmc-table {
    width: 100% !important;
    min-width: 0 !important;
    table-layout: fixed !important;
    border-collapse: collapse !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  /* Fixed column widths */
  .th-date      { width: 3%  !important; }
  .th-ampm      { width: 3%  !important; }
  .th-remarks   { width: 11% !important; }
  .th-inspected { width: 10% !important; }

  /* ── All <th> cells — shared base styles ── */
  .pmc-table th {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 700 !important;
    font-size: 5.8px !important;
    line-height: 1.35 !important;
    letter-spacing: 0.02em !important;
    text-align: center !important;
    vertical-align: middle !important;
    color: #fff !important;
    background: #1a5c1a !important;
    border-top: 1px solid #000000 !important;
    border-right: 1px solid #000000 !important;
    border-bottom: 1px solid #000000 !important;
    border-left: 1px solid #000000 !important;
    padding: 2px 1px !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    white-space: normal !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Task header row — fixed height so all 11 task cells are identical */
  .pmc-table thead tr:first-child th {
    height: 6mm !important;
  }

  /* DATE / REMARKS / INSPECTED BY span both header rows — centered */
  .th-date, .th-remarks, .th-inspected {
    font-size: 6px !important;
    font-weight: 800 !important;
    letter-spacing: 0.06em !important;
    text-transform: uppercase !important;
  }

  /* ── AM / PM row — yellow, uniform height ── */
  .pmc-table thead tr:nth-child(2) th.th-ampm {
    background: #f9dc07 !important;
    color: #000 !important;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 800 !important;
    font-size: 6px !important;
    letter-spacing: 0.05em !important;
    height: 4.5mm !important;
    text-align: center !important;
    vertical-align: middle !important;
    border: 1px solid #000000 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* ── Data cells ── */
  .pmc-table td {
    height: 4.2mm !important;
    max-height: 4.2mm !important;
    padding: 0 !important;
    font-size: 7px !important;
    color: #000 !important;
    text-align: center !important;
    vertical-align: middle !important;
    border: 1px solid #808080 !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
  }

  .td-date {
    font-size: 7px !important;
    font-weight: 700 !important;
    color: #000 !important;
    background: #efefef !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .td-remarks, .td-inspected {
    font-size: 6.5px !important;
    color: #000 !important;
    padding: 0 2px !important;
    text-align: left !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .check-mark {
    font-size: 8px !important;
    color: #1a5c1a !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .x-mark {
    font-size: 8px !important;
    color: #dc2626 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .cell-wrap {
    min-height: 0 !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  tr.today > td { background: white !important; }
  tr:nth-child(even) td {
    background: #f5f5f5 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  tr { page-break-inside: avoid !important; break-inside: avoid !important; }
  thead { display: table-header-group !important; }
  .pmc-table thead { position: static !important; }  /* fix sticky header breaking print layout */

  /* ── Footer right below the table ── */
  .print-footer {
    display: flex !important;
    justify-content: flex-start !important;
    margin-top: 4px !important;
    padding-top: 2px !important;
    padding-bottom: 0 !important;
    flex-shrink: 0 !important;
  }
  .print-footer-label {
    font-family: 'Poppins', sans-serif !important;
    font-size: 9px !important;
    color: #000 !important;
    font-style: normal !important;
  }
}


/* =====================
   SCREEN STYLES
   ===================== */
.print-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}
.header-left, .header-right { flex: 0 0 auto; }
.header-img { max-height: 70px; height: auto; display: block; object-fit: contain; }

.rec-info { display: flex; gap: 32px; margin-bottom: 4px; }
.ri-field { display: flex; gap: 6px; align-items: baseline; }
.ri-label { font-size: 12px; font-weight: 600; color: var(--gray-700); white-space: nowrap; }
.ri-value {
  font-size: 12px; min-width: 200px;
  border-bottom: 1px solid var(--gray-400);
  padding-bottom: 2px;
}
.ri-value--wide { min-width: 200px; }

.table-wrap {
  flex: 1;
  overflow: auto;
  min-height: 0;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  /* Always-visible scrollbars */
  scrollbar-width: thin;
  scrollbar-color: #1a5c1a #e8f5e9;
}
.table-wrap::-webkit-scrollbar { width: 8px; height: 8px; }
.table-wrap::-webkit-scrollbar-track { background: #e8f5e9; border-radius: 4px; }
.table-wrap::-webkit-scrollbar-thumb { background: #1a5c1a; border-radius: 4px; }
.table-wrap::-webkit-scrollbar-thumb:hover { background: #003300; }
.table-wrap::-webkit-scrollbar-corner { background: #e8f5e9; }

.pmc-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1100px;
  font-size: 11px;
  margin-top: 12px;
}
.pmc-table thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
.pmc-table th {
  background: #1a5c1a;
  color: white;
  padding: 6px 4px;
  font-size: 9.5px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #000;
  line-height: 1.35;
  letter-spacing: 0.02em;
  word-break: break-word;
  white-space: normal;
}
.pmc-table .th-ampm {
  width: 22px;
  font-size: 8.5px;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  text-align: center;
  vertical-align: middle;
  background: #f9dc07 !important;
  color: #000 !important;
}
.pmc-table td {
  padding: 2px;
  border: 1px solid #808080;
  text-align: center;
  vertical-align: middle;
  height: 22px;
  min-width: 22px;
}
.th-date { width: 28px; font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
.th-task { min-width: 44px; font-size: 9px; line-height: 1.35; }
.th-remarks { width: 72px; min-width: 72px; max-width: 72px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
.th-inspected { width: 72px; min-width: 72px; max-width: 72px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
.td-date { font-weight: 700; background: #f5f5f5; font-size: 12px; }
.td-remarks, .td-inspected {
  text-align: left; padding: 2px 4px;
  max-width: 72px; overflow: hidden;
  white-space: nowrap; text-overflow: ellipsis;
}

tr.today > td { background: #abd1b5 !important; }

@media print {
  tr.today > td { background: white !important; }
}
tr.locked > td { background: #fafafa; }

.cell-wrap {
  width: 100%; height: 100%;
  min-height: 20px;
  display: flex; align-items: center; justify-content: center;
  cursor: default;
  touch-action: manipulation; /* removes 300ms tap delay on mobile */
}
.cell-wrap.editable { cursor: pointer; }
.cell-wrap.editable:hover { background: rgba(0,192,75,0.1); }
.check-mark { color: var(--green-forest); font-weight: 700; font-size: 12px; }

.remarks-input {
  width: 100%; border: none; background: transparent;
  font-size: 11px; outline: none; padding: 2px;
}
.remarks-input:focus { background: rgba(0,192,75,0.05); }

.legend {
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
  padding: 10px 20px;
  margin: 0 20px 16px;
  background: white;
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--gray-700);
  flex-shrink: 0;
}
.legend-item { display: flex; align-items: center; gap: 8px; }
.leg-check { width: 20px; height: 20px; background: #e8f5e9; border: 1px solid #bbb; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--green-forest); font-weight: 700; }
.leg-empty { width: 20px; height: 20px; border: 1px solid #bbb; }
.leg-today { width: 20px; height: 20px; background: #abd1b5; border: 1px solid #bbb; }
.leg-locked { width: 20px; height: 20px; background: #fafafa; border: 1px solid #bbb; }

.save-btn { animation: pulse 0.3s ease; }

.saved-msg {
  display: inline-flex; align-items: center; gap: 5px;
  color: var(--green-forest); font-size: 13px; font-weight: 600;
  background: var(--green-pale); padding: 6px 12px;
  border-radius: var(--radius-sm);
}

.fade-saved-enter-active,
.fade-saved-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-saved-enter-from,
.fade-saved-leave-to { opacity: 0; transform: translateX(8px); }
.x-mark { color: #dc2626; font-weight: 700; font-size: 12px; }
.leg-x { width: 20px; height: 20px; background: #fff0f0; border: 1px solid #fca5a5; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #dc2626; font-weight: 700; }

/* Print footer — hidden on screen */
.print-footer { display: none; }



/* ══════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════ */
@media (max-width: 768px) {
  /* Restore normal scroll on mobile */
  .record-page { height: 100svh; overflow: hidden; }
  .print-area { margin: 10px; overflow: hidden; }

  /* Top bar — compact, prevent overflow */
  .top-bar {
    padding: 10px 12px;
    gap: 8px;
    flex-wrap: nowrap;
  }
  .top-title {
    font-size: 13px;
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .top-month { display: none; }
  .top-actions { gap: 6px; flex-shrink: 0; }
  .top-actions .btn {
    font-size: 12px;
    padding: 8px 12px;
    white-space: nowrap;
  }
  .top-actions .saved-msg { font-size: 11px; padding: 5px 9px; }

  /* Print area — tighter padding on mobile */
  .print-area { padding: 14px 12px; border-radius: 8px; }

  /* Record info — stack vertically on mobile */
  .rec-info {
    flex-direction: column;
    gap: 6px;
    margin-bottom: 6px;
  }
  .ri-field { flex-wrap: wrap; gap: 4px; }
  .ri-label { font-size: 11px; }
  .ri-value {
    font-size: 11px;
    min-width: 0;
    width: 100%;
    flex: 1;
  }
  .ri-value--wide { min-width: 0; }

  /* Print header images — smaller on mobile */
  .header-img { max-height: 48px; }

  /* Table — full scroll with touch support */
  .table-wrap {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    min-height: 150px;
  }

  /* Legend — compact wrap */
  .legend {
    flex-wrap: wrap;
    gap: 6px 14px;
    padding: 10px 12px;
    margin: 0 10px 14px;
    font-size: 11px;
  }
  .legend-item { gap: 6px; }
}

/* ── Very small mobile (≤480px) ── */
@media (max-width: 480px) {
  .top-bar { padding: 8px 10px; }
  .top-title { font-size: 12px; }
  .top-actions .btn { font-size: 11px; padding: 7px 10px; }

  /* Back button — icon only on tiny screens */
  .top-bar > .btn:first-child span { display: none; }

  .print-area { margin: 8px; padding: 10px; }
  .legend { padding: 8px 10px; margin: 0 8px 10px; font-size: 10px; }
  .legend-item { gap: 5px; }
}

/* ── Cell picker — center on mobile instead of anchoring to cell ── */
@media (max-width: 600px) {
  .cell-picker {
    position: fixed !important;
    /* Override the JS-positioned top/left with centered fixed position */
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 9999;
    /* Make it bigger and easier to tap */
    padding: 12px;
    gap: 8px;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.2);
  }
  .picker-btn {
    padding: 14px 20px;
    min-width: 72px;
    min-height: 72px; /* larger tap target */
  }
  .picker-icon { font-size: 24px; }
  .picker-label { font-size: 9px; }
}

/* ══════════════════════════════════════
   CELL PICKER POPUP
   ══════════════════════════════════════ */
.picker-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: transparent;
}
.cell-picker {
  position: absolute;
  z-index: 9999;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  gap: 6px;
  padding: 8px;
  border: 1px solid var(--gray-200);
  animation: fadeUp 0.15s ease;
}
.picker-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 16px;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  background: var(--gray-100);
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: var(--font-body);
  min-width: 60px;
}
.picker-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.picker-icon { font-size: 20px; font-weight: 700; line-height: 1; }
.picker-label { font-size: 10px; font-weight: 600; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.4px; }
.picker-check { border-color: #bbf7d0; background: #f0fdf4; }
.picker-check:hover { background: #dcfce7; border-color: #4ade80; }
.picker-check .picker-icon { color: var(--green-forest); }
.picker-x { border-color: #fecaca; background: #fff5f5; }
.picker-x:hover { background: #fecaca; border-color: #f87171; }
.picker-x .picker-icon { color: #dc2626; }
.picker-clear { border-color: var(--gray-300); }
.picker-clear:hover { background: var(--gray-200); }
.picker-clear .picker-icon { color: var(--gray-500); font-size: 16px; }

</style>