import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('pmc_user') || 'null'),
    accounts: JSON.parse(localStorage.getItem('pmc_accounts') || '[]'),
    onlineLogs: JSON.parse(localStorage.getItem('pmc_online_logs') || '[]'),
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isInspector: (state) => state.user?.role === 'inspector',
    currentUser: (state) => state.user,
  },

  actions: {
    saveAccounts() {
      localStorage.setItem('pmc_accounts', JSON.stringify(this.accounts))
    },
    saveUser() {
      localStorage.setItem('pmc_user', JSON.stringify(this.user))
    },
    saveLogs() {
      localStorage.setItem('pmc_online_logs', JSON.stringify(this.onlineLogs))
    },

    register({ name, email, password, role, code }) {
      // Validate email verification code (simulated - code is first 6 chars of email uppercased)
      const expectedCode = email.slice(0, 6).toUpperCase().replace(/[^A-Z0-9]/g, 'X').padEnd(6, '0')
      // For demo: any 6-digit code is accepted (in real system this would be backend verified)
      if (!/^\d{6}$/.test(code)) {
        return { success: false, error: 'Invalid verification code. Please enter the 6-digit code sent to your email.' }
      }

      const exists = this.accounts.find(a => a.email === email)
      if (exists) return { success: false, error: 'Email already registered.' }

      const account = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app: hash this
        role,
        createdAt: new Date().toISOString(),
        isOnline: false,
        lastLogin: null,
      }
      this.accounts.push(account)
      this.saveAccounts()
      return { success: true }
    },

    login(email, password) {
      const account = this.accounts.find(a => a.email === email && a.password === password)
      if (!account) return { success: false, error: 'Invalid email or password.' }

      account.isOnline = true
      account.lastLogin = new Date().toISOString()
      this.user = { ...account }
      this.saveAccounts()
      this.saveUser()

      // Log session
      this.onlineLogs.push({
        userId: account.id,
        userName: account.name,
        email: account.email,
        role: account.role,
        loginTime: new Date().toISOString(),
        logoutTime: null,
      })
      this.saveLogs()

      return { success: true, role: account.role }
    },

    logout() {
      if (this.user) {
        const account = this.accounts.find(a => a.id === this.user.id)
        if (account) {
          account.isOnline = false
          this.saveAccounts()
        }
        // Update log
        const log = [...this.onlineLogs].reverse().find(l => l.userId === this.user.id && !l.logoutTime)
        if (log) {
          log.logoutTime = new Date().toISOString()
          this.saveLogs()
        }
      }
      this.user = null
      localStorage.removeItem('pmc_user')
    },

    getInspectors() {
      return this.accounts.filter(a => a.role === 'inspector')
    },
  }
})
