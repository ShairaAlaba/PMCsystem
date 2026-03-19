import { defineStore } from 'pinia'

export const usePmcStore = defineStore('pmc', {
  state: () => ({
    records: JSON.parse(localStorage.getItem('pmc_records') || '[]'),
  }),

  actions: {
    save() {
      localStorage.setItem('pmc_records', JSON.stringify(this.records))
    },

    createRecord({ inspectorId, inspectorName, janitorName, buildingName, assignedPersonnel, month, year }) {
      const id = Date.now().toString()
      const days = []
      const daysInMonth = new Date(year, month, 0).getDate()
      for (let d = 1; d <= daysInMonth; d++) {
        days.push({
          day: d,
          am: { mopFloor: false, cleanLavatory: false, cleanWaterCloset: false, cleanWallTiles: false, cleanUrinals: false, sprayAir: false, disposeGarbage: false, cleanDustWindow: false, cleanMirror: false, checkFloorDrain: false, checkFaucet: false },
          pm: { mopFloor: false, cleanLavatory: false, cleanWaterCloset: false, cleanWallTiles: false, cleanUrinals: false, sprayAir: false, disposeGarbage: false, cleanDustWindow: false, cleanMirror: false, checkFloorDrain: false, checkFaucet: false },
          remarks: '',
          inspectedBy: '',
        })
      }
      const record = {
        id,
        inspectorId,
        inspectorName,
        janitorName,
        buildingName,
        assignedPersonnel,
        month, // 1-12
        year,
        days,
        createdAt: new Date().toISOString(),
      }
      this.records.push(record)
      this.save()
      return id
    },

    updateDay(recordId, dayIndex, amPm, field, value) {
      const recordIndex = this.records.findIndex(r => r.id === recordId)
      if (recordIndex === -1) return
      // Force Vue reactivity by replacing the nested object references
      const updatedDay = { ...this.records[recordIndex].days[dayIndex] }
      updatedDay[amPm] = { ...updatedDay[amPm], [field]: value }
      const updatedDays = [...this.records[recordIndex].days]
      updatedDays[dayIndex] = updatedDay
      this.records[recordIndex] = { ...this.records[recordIndex], days: updatedDays }
      this.save()
    },

    updateDayRemarks(recordId, dayIndex, remarks) {
      const record = this.records.find(r => r.id === recordId)
      if (!record) return
      record.days[dayIndex].remarks = remarks
      this.save()
    },

    updateDayInspectedBy(recordId, dayIndex, inspectedBy) {
      const record = this.records.find(r => r.id === recordId)
      if (!record) return
      record.days[dayIndex].inspectedBy = inspectedBy
      this.save()
    },

    getRecord(id) {
      return this.records.find(r => r.id === id)
    },

    getByInspector(inspectorId) {
      return this.records.filter(r => r.inspectorId === inspectorId)
    },

    getAllRecords() {
      return this.records
    },

    deleteRecord(id) {
      this.records = this.records.filter(r => r.id !== id)
      this.save()
    },

    refresh() {
      this.records = JSON.parse(localStorage.getItem('pmc_records') || '[]')
    },
  }
})