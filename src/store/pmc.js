import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection, addDoc, getDocs,
  updateDoc, deleteDoc, doc, onSnapshot
} from 'firebase/firestore'

export const usePmcStore = defineStore('pmc', {
  state: () => ({
    records: [],
    _unsubscribe: null,   // holds the onSnapshot listener so we can clean it up
  }),

  actions: {

    // ── LOAD (called loadRecords so AdminDashboard finds it) ──────────────────
    // Uses onSnapshot so records update live without manual refresh.
    async loadRecords() {
      // Don't open a second listener if one is already running
      if (this._unsubscribe) return

      this._unsubscribe = onSnapshot(collection(db, 'records'), (snap) => {
        this.records = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      })
    },

    // Alias so any old code calling refresh() still works
    async refresh() {
      return this.loadRecords()
    },

    // ── CREATE RECORD ─────────────────────────────────────────────────────────
    async createRecord({ inspectorId, inspectorName, janitorName, buildingName, assignedPersonnel, month, year }) {
      const days = []
      const daysInMonth = new Date(year, month, 0).getDate()
      const tasks = () => ({
        mopFloor: false, cleanLavatory: false, cleanWaterCloset: false,
        cleanWallTiles: false, cleanUrinals: false, sprayAir: false,
        disposeGarbage: false, cleanDustWindow: false, cleanMirror: false,
        checkFloorDrain: false, checkFaucet: false,
      })
      for (let d = 1; d <= daysInMonth; d++) {
        days.push({ day: d, am: tasks(), pm: tasks(), remarks: '', inspectedBy: '' })
      }
      const record = {
        inspectorId, inspectorName, janitorName,
        buildingName, assignedPersonnel, month, year, days,
        createdAt: new Date().toISOString(),
      }
      const docRef = await addDoc(collection(db, 'records'), record)
      // onSnapshot will automatically add it to this.records — no manual push needed
      return docRef.id
    },

    // ── UPDATE A DAY'S CHECKBOX ───────────────────────────────────────────────
    async updateDay(recordId, dayIndex, amPm, field, value) {
      const recordIndex = this.records.findIndex(r => r.id === recordId)
      if (recordIndex === -1) return
      const updatedDays = this.records[recordIndex].days.map((d, i) => {
        if (i !== dayIndex) return d
        return { ...d, [amPm]: { ...d[amPm], [field]: value } }
      })
      this.records[recordIndex] = { ...this.records[recordIndex], days: updatedDays }
      await updateDoc(doc(db, 'records', recordId), { days: updatedDays })
    },

    // ── UPDATE REMARKS ────────────────────────────────────────────────────────
    async updateDayRemarks(recordId, dayIndex, remarks) {
      const record = this.records.find(r => r.id === recordId)
      if (!record) return
      record.days[dayIndex].remarks = remarks
      await updateDoc(doc(db, 'records', recordId), { days: record.days })
    },

    // ── UPDATE INSPECTED BY ───────────────────────────────────────────────────
    async updateDayInspectedBy(recordId, dayIndex, inspectedBy) {
      const record = this.records.find(r => r.id === recordId)
      if (!record) return
      record.days[dayIndex].inspectedBy = inspectedBy
      await updateDoc(doc(db, 'records', recordId), { days: record.days })
    },

    // ── DELETE RECORD ─────────────────────────────────────────────────────────
    async deleteRecord(id) {
      await deleteDoc(doc(db, 'records', id))
      // onSnapshot will automatically remove it from this.records
    },

    // ── GETTERS (synchronous helpers) ─────────────────────────────────────────
    getRecord(id) {
      return this.records.find(r => r.id === id)
    },

    getByInspector(inspectorId) {
      return this.records.filter(r => r.inspectorId === inspectorId)
    },

    getAllRecords() {
      return this.records
    },
  },
})