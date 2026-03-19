<template>
  <div class="record-page">
    <!-- Top Bar -->
    <div class="top-bar no-print">
      <button class="btn btn-ghost" @click="goBack">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back
      </button>
      <div class="top-title">
        <span>{{ record?.janitorName }}</span>
        <span class="top-month">— {{ months[record?.month - 1] }} {{ record?.year }}</span>
      </div>
      <!-- Print button only for admin -->
      <div class="top-actions">
        <!-- Save feedback -->
        <transition name="fade-saved">
          <span v-if="savedMsg" class="saved-msg">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            Saved
          </span>
        </transition>
        <!-- Save button for inspector -->
        <button v-if="!isAdmin && hasEdits" class="btn btn-primary" @click="saveAll">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save
        </button>
        <!-- Print button for admin -->
        <button v-if="isAdmin" class="btn btn-primary" @click="printRecord">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Print
        </button>
      </div>
    </div>

    <!-- Printable Area -->
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
<br>
      <!-- Record Info -->
      <div class="rec-info">
        <div class="ri-field">
          <span class="ri-label">Building Name:</span>
          <span class="ri-value">{{ record?.buildingName }}</span>
        </div>
        <div class="ri-field">
          <span class="ri-label">Month:</span>
          <span class="ri-value">{{ months[record?.month - 1] }} {{ record?.year }}</span>
        </div>
        <div class="ri-field">
          <span class="ri-label">Inspected by:</span>
          <span class="ri-value">{{ record?.inspectorName }}</span>
        </div>
      </div>
      <div class="rec-info" style="margin-bottom: 8px;">
        <div class="ri-field">
          <span class="ri-label">Assigned Utility Personnel:</span>
          <span class="ri-value">{{ record?.assignedPersonnel }}</span>
        </div>
      </div>

      <!-- CHECKLIST TABLE -->
      <div class="table-wrap">
        <table class="pmc-table">
          <thead>
            <tr>
              <th rowspan="2" class="th-date">DATE</th>
              <th colspan="2" class="th-task">Moping of floor</th>
              <th colspan="2" class="th-task">Cleaning Lavatory</th>
              <th colspan="2" class="th-task">Cleaning of water closet</th>
              <th colspan="2" class="th-task">Cleaning wall tiles</th>
              <th colspan="2" class="th-task">Cleaning of urinals</th>
              <th colspan="2" class="th-task">Spraying Air Refresher</th>
              <th colspan="2" class="th-task">Disposing of garbages</th>
              <th colspan="2" class="th-task">Cleaning dust in the window</th>
              <th colspan="2" class="th-task">Cleaning of mirror</th>
              <th colspan="2" class="th-task">Checking of floor drain</th>
              <th colspan="2" class="th-task">Checking of faucet</th>
              <th rowspan="2" class="th-remarks">REMARKS</th>
              <th rowspan="2" class="th-inspected">INSPECTED BY</th>
            </tr>
            <tr>
              <th class="th-ampm" v-for="n in 22" :key="n">{{ n % 2 === 1 ? 'AM' : 'PM' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(day, idx) in record?.days" :key="idx" :class="{today: isToday(day.day), locked: !canEdit(day.day)}">
              <td class="td-date">{{ day.day }}</td>
              <!-- Mop Floor -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'mopFloor')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.mopFloor" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'mopFloor')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.mopFloor" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Lavatory -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'cleanLavatory')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.cleanLavatory" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'cleanLavatory')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.cleanLavatory" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Water Closet -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'cleanWaterCloset')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.cleanWaterCloset" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'cleanWaterCloset')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.cleanWaterCloset" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Wall Tiles -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'cleanWallTiles')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.cleanWallTiles" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'cleanWallTiles')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.cleanWallTiles" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Urinals -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'cleanUrinals')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.cleanUrinals" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'cleanUrinals')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.cleanUrinals" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Spray Air -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'sprayAir')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.sprayAir" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'sprayAir')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.sprayAir" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Garbage -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'disposeGarbage')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.disposeGarbage" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'disposeGarbage')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.disposeGarbage" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Dust Window -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'cleanDustWindow')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.cleanDustWindow" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'cleanDustWindow')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.cleanDustWindow" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Mirror -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'cleanMirror')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.cleanMirror" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'cleanMirror')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.cleanMirror" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Floor Drain -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'checkFloorDrain')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.checkFloorDrain" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'checkFloorDrain')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.checkFloorDrain" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Faucet -->
              <td><div class="cell-wrap" @click="toggle(idx, 'am', 'checkFaucet')" :class="{editable: canEdit(day.day)}"><span v-if="day.am.checkFaucet" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <td><div class="cell-wrap" @click="toggle(idx, 'pm', 'checkFaucet')" :class="{editable: canEdit(day.day)}"><span v-if="day.pm.checkFaucet" class="check-mark">✓</span><span v-else-if="shouldShowX(day.day)" class="x-mark">✗</span></div></td>
              <!-- Remarks -->
              <td class="td-remarks">
                <input v-if="canEdit(day.day)" v-model="day.remarks" @change="saveRemarks(idx, day.remarks)" type="text" class="remarks-input" placeholder="..." />
                <span v-else>{{ day.remarks }}</span>
              </td>
              <!-- Inspected By -->
              <td class="td-inspected">
                <input v-if="canEdit(day.day)" v-model="day.inspectedBy" @change="saveInspectedBy(idx, day.inspectedBy)" type="text" class="remarks-input" placeholder="..." />
                <span v-else>{{ day.inspectedBy }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend no-print">
      <div class="legend-item">
        <div class="leg-check">✓</div> Completed
      </div>
      <div class="legend-item">
        <div class="leg-x">✗</div> Not done (past/today)
      </div>
      <div class="legend-item">
        <div class="leg-empty"></div> Future / N/A
      </div>
      <div class="legend-item today-leg">
        <div class="leg-today"></div> Today (editable)
      </div>
      <div class="legend-item">
        <div class="leg-locked"></div> Locked (past/future)
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePmcStore } from '@/store/pmc'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()
const pmc = usePmcStore()
const auth = useAuthStore()

// Refresh store from localStorage so record is always found on direct navigation
onMounted(() => {
  pmc.refresh()
})

const isAdmin = computed(() => auth.isAdmin)

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const now = new Date()
const todayDate = now.getDate()
const todayMonth = now.getMonth() + 1
const todayYear = now.getFullYear()

const record = computed(() => pmc.getRecord(route.params.id))

// Track unsaved edits & save feedback
const hasEdits = ref(false)
const savedMsg = ref(false)
let savedTimer = null

// Back: always go to the correct dashboard
function goBack() {
  router.push(auth.isAdmin ? '/admin' : '/inspector')
}

// Show "Saved" flash then hide after 2.5s
function flashSaved() {
  savedMsg.value = true
  hasEdits.value = false
  clearTimeout(savedTimer)
  savedTimer = setTimeout(() => { savedMsg.value = false }, 2500)
}

// Explicit Save button — persists current state to localStorage
function saveAll() {
  pmc.save()
  flashSaved()
}

function shouldShowX(day) {
  // Show ✗ on every unchecked cell for any day that has already occurred
  // (past months, past days, AND today — regardless of save state).
  // Only future days stay blank.
  if (!record.value) return false
  const recYear = record.value.year
  const recMonth = record.value.month
  // Entire record is in a past year
  if (recYear < todayYear) return true
  // Record is in a past month of the current year
  if (recYear === todayYear && recMonth < todayMonth) return true
  // Record is in the current month — show ✗ for today AND all past days
  if (recYear === todayYear && recMonth === todayMonth) return day <= todayDate
  // Future month — no ✗
  return false
}

function isToday(day) {
  return day === todayDate && record.value?.month === todayMonth && record.value?.year === todayYear
}

function canEdit(day) {
  // Admin is read-only; only inspector can edit, and only today's row
  if (!record.value) return false
  if (auth.isAdmin) return false
  if (record.value.year !== todayYear || record.value.month !== todayMonth) return false
  return day === todayDate
}

function toggle(dayIdx, amPm, field) {
  const day = record.value?.days[dayIdx]
  if (!day || !canEdit(day.day)) return
  pmc.updateDay(route.params.id, dayIdx, amPm, field, !day[amPm][field])
  hasEdits.value = true
}

function saveRemarks(dayIdx, val) {
  pmc.updateDayRemarks(route.params.id, dayIdx, val)
  hasEdits.value = true
}

function saveInspectedBy(dayIdx, val) {
  pmc.updateDayInspectedBy(route.params.id, dayIdx, val)
  hasEdits.value = true
}

function printRecord() {
  window.print()
}
</script>

<style scoped>
.record-page { min-height: 100vh; background: var(--green-mist); }

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
  overflow-x: auto;
}

/* =====================
   PRINT STYLES
   ===================== */
@media print {
  @page {
    size: A4 landscape;
    margin: 4mm 4mm 4mm 4mm;
  }

  .no-print, .legend, .top-bar { display: none !important; }
  .record-page { background: white !important; }

  .print-area {
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    overflow: visible !important;
    width: 100% !important;
  }

  /* Header: images at both edges */
  .print-header {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    margin: 0 0 2px 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }
  .header-left, .header-right { flex: 0 0 auto !important; }
  .header-img { max-height: 50px !important; height: auto !important; display: block !important; object-fit: contain !important; }

  /* Record info rows */
  .rec-info { display: flex !important; gap: 12px !important; margin-bottom: 1px !important; margin-top: 1px !important; flex-wrap: nowrap !important; }
  .ri-label { font-size: 6.5px !important; font-weight: 700 !important; white-space: nowrap !important; }
  .ri-value { font-size: 6.5px !important; min-width: 60px !important; }

  .table-wrap { overflow: visible !important; width: 100% !important; }

  /*
   * A4 landscape usable width = 297 - 8mm = 289mm
   * 25 total columns: 1 DATE + 22 AM/PM + 1 REMARKS + 1 INSPECTED(signature only)
   *
   * DATE       =  2.2%  ( 6.4mm — fits "31")
   * each AM/PM =  3.67% (10.6mm — fits ✓/✗ + AM/PM label) × 22 = 80.74%
   * REMARKS    =  9.0%  (26mm — fits short text)
   * INSPECTED  =  8.0%  (23mm — signature line only, not full name)
   * TOTAL      = 99.94% ≈ 100%
   */
  .pmc-table {
    width: 100% !important;
    min-width: 0 !important;
    table-layout: fixed !important;
    border-collapse: collapse !important;
  }

  .pmc-table th {
    font-size: 5px !important;
    padding: 1px 0 !important;
    line-height: 1.15 !important;
    background: #1a5c1a !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    vertical-align: middle !important;
  }

  .pmc-table td {
    height: 5.2mm !important;
    max-height: 5.2mm !important;
    padding: 0 !important;
    font-size: 5.5px !important;
    overflow: hidden !important;
    vertical-align: middle !important;
  }

  /* Column widths — adds to exactly 100% */
  .th-date      { width: 2.2% !important; font-size: 5px !important; }
  .th-task      { font-size: 4.5px !important; }
  .th-ampm      { width: 3.67% !important; font-size: 4px !important; }
  .th-remarks   { width: 9% !important; font-size: 4.5px !important; }
  .th-inspected { width: 8% !important; font-size: 4.5px !important; }

  .td-date { font-size: 5.5px !important; font-weight: 700 !important; }
  .td-remarks, .td-inspected {
    font-size: 5px !important;
    padding: 0 1px !important;
    text-align: left !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .check-mark {
    font-size: 6.5px !important;
    color: #1a5c1a !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .x-mark {
    font-size: 6.5px !important;
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

.rec-info {
  display: flex;
  gap: 32px;
  margin-bottom: 4px;
}
.ri-field { display: flex; gap: 6px; align-items: baseline; }
.ri-label { font-size: 12px; font-weight: 600; color: var(--gray-700); white-space: nowrap; }
.ri-value {
  font-size: 12px; min-width: 200px;
  border-bottom: 1px solid var(--gray-400);
  padding-bottom: 2px;
}

.pmc-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1400px;
  font-size: 11px;
  margin-top: 12px;
}
.pmc-table th {
  background: #1a5c1a;
  color: white;
  padding: 5px 3px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  border: 1px solid #333;
  vertical-align: middle;
  line-height: 1.2;
}
.pmc-table td {
  padding: 2px;
  border: 1px solid #bbb;
  text-align: center;
  vertical-align: middle;
  height: 22px;
  min-width: 22px;
}
.th-date { width: 28px; font-size: 10px; }
.th-task { min-width: 60px; font-size: 9px; line-height: 1.1; }
.th-ampm { width: 22px; font-size: 9px; background: #2d7a2d; }
.th-remarks { min-width: 120px; }
.th-inspected { min-width: 100px; }
.td-date { font-weight: 700; background: #f5f5f5; font-size: 12px; }
.td-remarks, .td-inspected { text-align: left; padding: 2px 4px; }

tr.today > td { background: #fffde7 !important; }
tr.locked > td { background: #fafafa; }

.cell-wrap {
  width: 100%; height: 100%;
  min-height: 20px;
  display: flex; align-items: center; justify-content: center;
  cursor: default;
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
  display: flex; align-items: center; gap: 24px;
  padding: 12px 20px;
  margin: 0 20px 20px;
  background: white;
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--gray-700);
}
.legend-item { display: flex; align-items: center; gap: 8px; }
.leg-check { width: 20px; height: 20px; background: #e8f5e9; border: 1px solid #bbb; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--green-forest); font-weight: 700; }
.leg-empty { width: 20px; height: 20px; border: 1px solid #bbb; }
.leg-today { width: 20px; height: 20px; background: #fffde7; border: 1px solid #bbb; }
.leg-locked { width: 20px; height: 20px; background: #fafafa; border: 1px solid #bbb; }

.save-btn { animation: pulse 0.3s ease; }

.saved-msg {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--green-forest);
  font-size: 13px;
  font-weight: 600;
  background: var(--green-pale);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
}

.fade-saved-enter-active,
.fade-saved-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-saved-enter-from,
.fade-saved-leave-to { opacity: 0; transform: translateX(8px); }
.x-mark { color: #dc2626; font-weight: 700; font-size: 12px; }
.leg-x { width: 20px; height: 20px; background: #fff0f0; border: 1px solid #fca5a5; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #dc2626; font-weight: 700; }

/* ══════════════════════════════════════
   RESPONSIVE — RecordView
   ══════════════════════════════════════ */
@media (max-width: 768px) {
  .top-bar { padding: 10px 14px; gap: 10px; }
  .top-title { font-size: 13px; }
  .top-month { display: none; }
  .btn { font-size: 13px; padding: 9px 14px; }

  .print-area { margin: 10px; padding: 14px; }

  /* Table scrolls horizontally — this is correct for 25 columns */
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  .legend { flex-wrap: wrap; gap: 8px; padding: 10px 14px; margin: 0 10px 14px; font-size: 12px; }

  .rec-info { gap: 12px; flex-wrap: wrap; }
  .ri-value { min-width: 100px; }
}

@media (max-width: 420px) {
  .top-bar { padding: 8px 10px; }
  .print-area { margin: 8px; padding: 10px; }
  .top-title { font-size: 12px; }
}
</style>