// src/store/auth.js
import { defineStore } from 'pinia'
import { db, auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  collection, addDoc, getDocs,
  query, where, updateDoc, doc
} from 'firebase/firestore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('pmc_user') || 'null'),
  }),

  getters: {
    isLoggedIn:  (s) => !!s.user,
    isAdmin:     (s) => s.user?.role === 'admin',
    isInspector: (s) => s.user?.role === 'inspector',
    currentUser: (s) => s.user,
  },

  actions: {

    saveUser() {
      localStorage.setItem('pmc_user', JSON.stringify(this.user))
    },

    // ── INIT — call once in App.vue, awaits Firebase session restore ──────────
    // Returns a Promise so App.vue can wait before showing any route.
    init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser && firebaseUser.emailVerified) {
            // Re-fetch Firestore profile to get fresh role / name
            try {
              const q    = query(collection(db, 'users'), where('uid', '==', firebaseUser.uid))
              const snap = await getDocs(q)
              if (!snap.empty) {
                const profile = { id: snap.docs[0].id, ...snap.docs[0].data() }
                this.user = profile
                this.saveUser()
              } else {
                // Profile missing — clear stale local storage
                this.user = null
                localStorage.removeItem('pmc_user')
              }
            } catch {
              // Keep localStorage copy if Firestore fails (offline)
            }
          } else {
            this.user = null
            localStorage.removeItem('pmc_user')
          }
          resolve()   // ← router can now run
        })
      })
    },

    // ── REGISTER ──────────────────────────────────────────────────────────────
    async register({ name, email, password, role }) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(cred.user)
        await addDoc(collection(db, 'users'), {
          uid:           cred.user.uid,
          name,
          email,
          role,
          isOnline:      false,
          lastLogin:     null,
          emailVerified: false,
          createdAt:     new Date().toISOString(),
        })
        await signOut(auth)
        return { success: true }
      } catch (err) {
        let msg = 'Registration failed. Please try again.'
        if (err.code === 'auth/email-already-in-use') msg = 'This email is already registered. Please sign in.'
        if (err.code === 'auth/weak-password')        msg = 'Password must be at least 6 characters.'
        if (err.code === 'auth/invalid-email')        msg = 'Invalid email address.'
        return { success: false, error: msg }
      }
    },

    // ── LOGIN ─────────────────────────────────────────────────────────────────
    async login(email, password) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password)

        if (!cred.user.emailVerified) {
          await signOut(auth)
          return { success: false, needsVerification: true }
        }

        const q    = query(collection(db, 'users'), where('uid', '==', cred.user.uid))
        const snap = await getDocs(q)
        if (snap.empty) {
          await signOut(auth)
          return { success: false, error: 'User profile not found. Please contact an administrator.' }
        }

        const profile = { id: snap.docs[0].id, ...snap.docs[0].data() }
        await updateDoc(doc(db, 'users', profile.id), {
          isOnline:      true,
          emailVerified: true,
          lastLogin:     new Date().toISOString(),
        })

        this.user = { ...profile, isOnline: true, emailVerified: true }
        this.saveUser()
        return { success: true, role: profile.role }

      } catch (err) {
        let msg = 'Invalid email or password.'
        if (err.code === 'auth/too-many-requests')       msg = 'Too many attempts. Please wait and try again.'
        if (err.code === 'auth/network-request-failed')  msg = 'Network error. Check your connection.'
        return { success: false, error: msg }
      }
    },

    // ── LOGIN AFTER VERIFICATION ──────────────────────────────────────────────
    async loginAfterVerification(email, password) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        await cred.user.reload()

        if (!cred.user.emailVerified) {
          await signOut(auth)
          return {
            success: false,
            error: 'Your email is not verified yet. Click the link in your Gmail inbox first, then try again.',
          }
        }

        const q    = query(collection(db, 'users'), where('uid', '==', cred.user.uid))
        const snap = await getDocs(q)
        if (snap.empty) {
          await signOut(auth)
          return { success: false, error: 'User profile not found. Please contact an administrator.' }
        }

        const profile = { id: snap.docs[0].id, ...snap.docs[0].data() }
        await updateDoc(doc(db, 'users', profile.id), {
          isOnline:      true,
          emailVerified: true,
          lastLogin:     new Date().toISOString(),
        })

        this.user = { ...profile, isOnline: true, emailVerified: true }
        this.saveUser()
        return { success: true, role: profile.role }

      } catch (err) {
        let msg = 'Could not sign you in. Please check your email and password.'
        if (err.code === 'auth/too-many-requests') msg = 'Too many attempts. Please wait and try again.'
        return { success: false, error: msg }
      }
    },

    // ── RESEND VERIFICATION EMAIL ─────────────────────────────────────────────
    async resendVerificationEmail(email, password) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        if (cred.user.emailVerified) {
          await signOut(auth)
          return { success: false, error: 'Your email is already verified. Please sign in normally.' }
        }
        await sendEmailVerification(cred.user)
        await signOut(auth)
        return { success: true }
      } catch (err) {
        let msg = 'Could not resend verification email. Please try again.'
        if (err.code === 'auth/too-many-requests') msg = 'Too many attempts. Please wait a few minutes before resending.'
        return { success: false, error: msg }
      }
    },

    // ── LOGOUT ────────────────────────────────────────────────────────────────
    async logout() {
      try {
        if (this.user?.id) {
          await updateDoc(doc(db, 'users', this.user.id), { isOnline: false })
        }
      } catch (_) {}
      await signOut(auth)
      this.user = null
      localStorage.removeItem('pmc_user')
    },

    // ── HELPERS ───────────────────────────────────────────────────────────────
    async getInspectors() {
      const q    = query(collection(db, 'users'), where('role', '==', 'inspector'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    },
  },
})