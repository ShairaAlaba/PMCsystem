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

    /**
     * Validates that the email is a real Gmail address.
     */
    isGmailAddress(email) {
      return /^[a-zA-Z0-9._%+\-]+@gmail\.com$/.test(email.trim().toLowerCase())
    },

    /**
     * Sends a verification link (simulated).
     * Stores a pending verification token in localStorage.
     * Returns the token so AuthPage can construct the simulated link.
     */
    sendVerificationLink({ name, email, password, role }) {
      if (!this.isGmailAddress(email)) {
        return { success: false, error: 'Only Gmail accounts (@gmail.com) are allowed.' }
      }

      const exists = this.accounts.find(a => a.email === email)
      if (exists) return { success: false, error: 'This Gmail address is already registered.' }

      // Generate a unique token
      const token = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

      // Store pending registration data
      const pending = { name, email, password, role, token, createdAt: Date.now() }
      localStorage.setItem('pmc_pending_verification', JSON.stringify(pending))

      return { success: true, token }
    },

    /**
     * Called when the user clicks the verification link.
     * Reads the pending token from localStorage and completes registration.
     */
    verifyAndRegister(token) {
      const raw = localStorage.getItem('pmc_pending_verification')
      if (!raw) return { success: false, error: 'No pending verification found. Please register again.' }

      let pending
      try { pending = JSON.parse(raw) } catch {
        return { success: false, error: 'Verification data is corrupted. Please register again.' }
      }

      if (pending.token !== token) {
        return { success: false, error: 'Invalid or expired verification link.' }
      }

      // Token expires after 15 minutes
      if (Date.now() - pending.createdAt > 15 * 60 * 1000) {
        localStorage.removeItem('pmc_pending_verification')
        return { success: false, error: 'Verification link has expired. Please register again.' }
      }

      const exists = this.accounts.find(a => a.email === pending.email)
      if (exists) {
        localStorage.removeItem('pmc_pending_verification')
        return { success: false, error: 'This email is already registered.' }
      }

      const account = {
        id: Date.now().toString(),
        name: pending.name,
        email: pending.email,
        password: pending.password,
        role: pending.role,
        createdAt: new Date().toISOString(),
        isOnline: false,
        lastLogin: null,
        emailVerified: true,
      }
      this.accounts.push(account)
      this.saveAccounts()

      // Mark as verified so the polling page can proceed
      localStorage.setItem('pmc_email_verified', token)
      localStorage.removeItem('pmc_pending_verification')

      return { success: true, role: account.role, email: account.email, password: pending.password }
    },

    /**
     * Check if the pending verification has been completed.
     * Used by the waiting screen to poll for completion.
     */
    checkVerified(token) {
      const verified = localStorage.getItem('pmc_email_verified')
      return verified === token
    },

    /**
     * Clear the verified flag after it's been consumed.
     */
    clearVerifiedFlag() {
      localStorage.removeItem('pmc_email_verified')
    },

    login(email, password) {
      const account = this.accounts.find(a => a.email === email && a.password === password)
      if (!account) return { success: false, error: 'Invalid email or password.' }

      account.isOnline = true
      account.lastLogin = new Date().toISOString()
      this.user = { ...account }
      this.saveAccounts()
      this.saveUser()

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
        const log = [...this.onlineLogs].reverse().find(l => l.userId === this.user.id && !l.logoutTime)
        if (log) {
          log.logoutTime = new Date().toISOString()
          this.saveLogs()
        }
      }
      this.user = null
      localStorage.removeItem('pmc_user')
    },

    logoutOnClose() {
      // Called on tab close/refresh — marks user offline and logs logout time
      // Uses synchronous localStorage writes (no async, safe for beforeunload)
      if (!this.user) return
      const accounts = JSON.parse(localStorage.getItem('pmc_accounts') || '[]')
      const account = accounts.find(a => a.id === this.user.id)
      if (account) {
        account.isOnline = false
        localStorage.setItem('pmc_accounts', JSON.stringify(accounts))
      }
      const logs = JSON.parse(localStorage.getItem('pmc_online_logs') || '[]')
      const log = [...logs].reverse().find(l => l.userId === this.user.id && !l.logoutTime)
      if (log) {
        log.logoutTime = new Date().toISOString()
        localStorage.setItem('pmc_online_logs', JSON.stringify(logs))
      }
      localStorage.removeItem('pmc_user')
    },

    getInspectors() {
      return this.accounts.filter(a => a.role === 'inspector')
    },
  }
})