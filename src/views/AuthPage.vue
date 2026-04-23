<template>
  <div class="auth-page">
    <div class="auth-left" :style="`--bg-img: url('${libSketch}')`">
      <div class="auth-left-inner">
        <router-link to="/" class="back-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Home
        </router-link>
        <div class="brand">
          <div class="brand-logo">
            <img :src="pmcLogo" alt="PMC Logo" class="brand-logo-img" />
          </div>
          <div>
            <div class="brand-name">CSU PMC System</div>
            <div class="brand-sub">Caraga State University</div>
          </div>
        </div>
        <div class="auth-illustration">
          <img :src="pmcLogo" alt="PMC Logo" class="auth-pmc-logo" />
        </div>
        <div class="auth-quote">
          "Competence · Service · Uprightness"
          <div class="auth-quote-sub">General Services Office</div>
        </div>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-form-wrap">
        <!-- Tabs -->
        <div class="auth-tabs">
          <button class="auth-tab" :class="{active: mode === 'login'}" @click="switchToLogin">Sign In</button>
          <button class="auth-tab" :class="{active: mode === 'register'}" @click="switchToRegister">Create Account</button>
        </div>

        <!-- LOGIN -->
        <div v-if="mode === 'login'" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Welcome back</h2>
          <p class="form-subheading">Sign in to your account to continue</p>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="form-group">
            <label class="form-label">Gmail Address</label>
            <div class="gmail-input-wrap">
              <span class="gmail-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                </svg>
                @gmail.com
              </span>
              <input v-model="loginData.email" type="email" class="form-control gmail-input" placeholder="yourname@gmail.com" />
            </div>
            <span class="field-hint">Only Gmail accounts are accepted</span>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-wrap">
              <input v-model="loginData.password" :type="showPw ? 'text' : 'password'" class="form-control" placeholder="••••••••" />
              <button class="pw-toggle" @click="showPw = !showPw">
                <svg v-if="!showPw" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <svg v-else width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
              </button>
            </div>
          </div>

          <button class="btn btn-primary w-full" @click="doLogin" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Sign In</span>
          </button>
          <p class="switch-text">Don't have an account? <a href="#" @click.prevent="switchToRegister">Create one</a></p>
        </div>

        <!-- REGISTER STEP 1 — Info -->
        <div v-if="mode === 'register' && step === 1" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Create Account</h2>
          <p class="form-subheading">Step 1 of 2 — Your Information</p>
          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input v-model="regData.name" type="text" class="form-control" placeholder="Enter your full name" />
          </div>

          <div class="form-group">
            <label class="form-label">Gmail Address</label>
            <div class="gmail-input-wrap">
              <span class="gmail-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                </svg>
                @gmail.com
              </span>
              <input v-model="regData.email" type="email" class="form-control gmail-input" placeholder="yourname@gmail.com" />
            </div>
            <span class="field-hint">Must be a valid Gmail address (@gmail.com)</span>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-wrap">
              <input v-model="regData.password" :type="showPw ? 'text' : 'password'" class="form-control" placeholder="Min 8 characters" />
              <button class="pw-toggle" @click="showPw = !showPw">
                <svg v-if="!showPw" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <svg v-else width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">I am a...</label>
            <div class="role-cards">
              <div class="role-card" :class="{active: regData.role === 'inspector'}" @click="regData.role = 'inspector'">
                <div class="rc-icon">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" stroke-width="2" stroke-linecap="round"/>
                    <path d="M16.5 16.5L21 21" stroke-width="2" stroke-linecap="round"/>
                    <path d="M11 8v3m0 0v3m0-3h3m-3 0H8" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="rc-title">Inspector</div>
                <div class="rc-desc">Record & manage checklists</div>
              </div>
              <div class="role-card" :class="{active: regData.role === 'admin'}" @click="regData.role = 'admin'">
                <div class="rc-icon">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div class="rc-title">Admin</div>
                <div class="rc-desc">View reports & manage users</div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary w-full" @click="goStep2" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Continue — Send Verification Link</span>
          </button>
          <p class="switch-text">Already have an account? <a href="#" @click.prevent="switchToLogin">Sign in</a></p>
        </div>

        <!-- REGISTER STEP 2 — Waiting for email verification -->
        <div v-if="mode === 'register' && step === 2" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Check Your Gmail</h2>
          <p class="form-subheading">Step 2 of 2 — Verify your email address</p>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <!-- Email sent state -->
          <div v-if="!verified" class="verify-waiting">
            <div class="verify-icon-wrap">
              <div class="verify-icon-ring">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="verify-pulse"></div>
            </div>

            <p class="verify-desc">
              A verification link has been sent to<br>
              <strong class="verify-email">{{ regData.email }}</strong>
            </p>
            <p class="verify-subdesc">Click the link in your Gmail inbox to confirm your account. This page will update automatically once verified.</p>

            <!-- Simulated link for demo (no real backend) -->
            <div class="demo-link-box">
              <div class="demo-link-label">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Demo mode — click this simulated link from your inbox:
              </div>
              <button class="demo-verify-btn" @click="simulateEmailClick">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                ✉ Verify my Gmail — {{ regData.email }}
              </button>
            </div>

            <div class="verify-status">
              <span class="pulse-dot"></span>
              Waiting for verification…
            </div>

            <div class="verify-actions">
              <button class="btn-link" @click="resendLink" :disabled="resendCooldown > 0">
                {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend verification link' }}
              </button>
              <span class="sep">·</span>
              <button class="btn-link" @click="step = 1">Change email</button>
            </div>
          </div>

          <!-- Verified success state -->
          <div v-else class="verify-success">
            <div class="success-icon">
              <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="success-title">Gmail Verified!</h3>
            <p class="success-desc">Your account has been created successfully. Signing you in…</p>
            <div class="spinner-center"><span class="spinner"></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import pmcLogo from '@/assets/pmclogo.png'
import libSketch from '@/assets/libsketch.png'

const router = useRouter()
const auth = useAuthStore()

const mode = ref('login')
const step = ref(1)
const loading = ref(false)
const error = ref('')
const showPw = ref(false)
const verified = ref(false)
const resendCooldown = ref(0)
const pendingToken = ref('')

const loginData = ref({ email: '', password: '' })
const regData = ref({ name: '', email: '', password: '', role: 'inspector' })

let pollInterval = null
let cooldownTimer = null

function switchToLogin() {
  stopPolling()
  mode.value = 'login'
  step.value = 1
  error.value = ''
}

function switchToRegister() {
  stopPolling()
  mode.value = 'register'
  step.value = 1
  error.value = ''
}

// ─── Gmail validation ───────────────────────────────────────────────────────
function isGmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@gmail\.com$/.test(email.trim().toLowerCase())
}

// ─── Login ──────────────────────────────────────────────────────────────────
async function doLogin() {
  error.value = ''
  if (!loginData.value.email || !loginData.value.password) {
    error.value = 'Please fill in all fields.'; return
  }
  if (!isGmail(loginData.value.email)) {
    error.value = 'Only Gmail accounts (@gmail.com) are allowed.'; return
  }
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  const res = auth.login(loginData.value.email, loginData.value.password)
  loading.value = false
  if (!res.success) { error.value = res.error; return }
  router.push(res.role === 'admin' ? '/admin' : '/inspector')
}

// ─── Register Step 1 → Step 2 ───────────────────────────────────────────────
async function goStep2() {
  error.value = ''
  if (!regData.value.name.trim()) { error.value = 'Please enter your full name.'; return }
  if (!regData.value.email) { error.value = 'Please enter your Gmail address.'; return }
  if (!isGmail(regData.value.email)) {
    error.value = 'Only Gmail accounts (@gmail.com) are allowed to register.'; return
  }
  if (regData.value.password.length < 8) { error.value = 'Password must be at least 8 characters.'; return }
  if (!regData.value.role) { error.value = 'Please select a role.'; return }

  loading.value = true
  await new Promise(r => setTimeout(r, 800))

  const res = auth.sendVerificationLink({
    name: regData.value.name,
    email: regData.value.email,
    password: regData.value.password,
    role: regData.value.role,
  })

  loading.value = false

  if (!res.success) { error.value = res.error; return }

  pendingToken.value = res.token
  step.value = 2
  startPolling()
  startResendCooldown()
}

// ─── Simulate clicking the email link (demo only) ────────────────────────────
function simulateEmailClick() {
  const res = auth.verifyAndRegister(pendingToken.value)
  if (!res.success) { error.value = res.error; return }
  // polling will pick this up automatically
}

// ─── Poll localStorage for verification ─────────────────────────────────────
function startPolling() {
  stopPolling()
  pollInterval = setInterval(() => {
    if (auth.checkVerified(pendingToken.value)) {
      verified.value = true
      stopPolling()
      auth.clearVerifiedFlag()
      // Auto-login and redirect after brief success display
      setTimeout(() => {
        const res = auth.login(regData.value.email, regData.value.password)
        if (res.success) {
          router.push(res.role === 'admin' ? '/admin' : '/inspector')
        }
      }, 1800)
    }
  }, 800)
}

function stopPolling() {
  if (pollInterval) { clearInterval(pollInterval); pollInterval = null }
}

// ─── Resend cooldown ─────────────────────────────────────────────────────────
function startResendCooldown(seconds = 60) {
  resendCooldown.value = seconds
  clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(cooldownTimer)
  }, 1000)
}

async function resendLink() {
  if (resendCooldown.value > 0) return
  error.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 700))
  const res = auth.sendVerificationLink({
    name: regData.value.name,
    email: regData.value.email,
    password: regData.value.password,
    role: regData.value.role,
  })
  loading.value = false
  if (!res.success) { error.value = res.error; return }
  pendingToken.value = res.token
  startResendCooldown()
}

onUnmounted(() => {
  stopPolling()
  clearInterval(cooldownTimer)
})
</script>

<style scoped>
.auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}
.auth-left {
  background: var(--green-darkest);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.auth-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--bg-img);
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  z-index: 0;
}
.auth-left-inner {
  padding: 40px;
  position: relative;
  z-index: 1;
  width: 100%;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.5);
  font-size: 13px;
  text-decoration: none;
  margin-bottom: 40px;
  transition: color 0.2s;
}
.back-link:hover { color: var(--green-primary); }
.brand { display: flex; align-items: center; gap: 14px; margin-bottom: 40px; }
.brand-logo { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; }
.brand-logo-img { width: 48px; height: 48px; object-fit: contain; }
.brand-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: white; }
.brand-sub { font-size: 12px; color: rgba(255,255,255,0.45); }

.auth-illustration {
  display: flex; align-items: center; justify-content: center;
  margin: 32px 0; padding: 0 10px;
}
.auth-pmc-logo {
  width: 100%; max-width: 340px; height: auto; object-fit: contain; display: block;
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 16px 40px rgba(0, 192, 75, 0.3));
}
.auth-quote { color: rgba(255,255,255,0.55); font-style: italic; font-size: 16px; font-family: var(--font-display); }
.auth-quote-sub { font-size: 12px; font-style: normal; margin-top: 4px; color: var(--green-primary); }

/* Right Panel */
.auth-right { display: flex; align-items: center; justify-content: center; background: white; padding: 40px; }
.auth-form-wrap { width: 100%; max-width: 420px; }
.auth-tabs {
  display: flex; background: var(--gray-100);
  border-radius: var(--radius-md); padding: 4px; margin-bottom: 32px;
}
.auth-tab {
  flex: 1; padding: 10px; border: none;
  border-radius: calc(var(--radius-md) - 4px);
  font-family: var(--font-body); font-size: 14px; font-weight: 500;
  cursor: pointer; background: transparent; color: var(--gray-600); transition: all 0.2s;
}
.auth-tab.active {
  background: white; color: var(--green-forest); font-weight: 700;
  box-shadow: var(--shadow-sm);
}
.form-heading {
  font-family: var(--font-display); font-size: 30px; font-weight: 700;
  color: var(--green-darkest); margin-bottom: 6px;
}
.form-subheading { font-size: 14px; color: var(--gray-500); margin-bottom: 28px; }

/* Gmail input styling */
.gmail-input-wrap { position: relative; }
.gmail-badge {
  position: absolute;
  right: 12px; top: 50%;
  transform: translateY(-50%);
  display: inline-flex; align-items: center; gap: 5px;
  background: #f1f3f4;
  color: #5f6368; font-size: 11px; font-weight: 600;
  padding: 3px 8px; border-radius: 4px;
  pointer-events: none; z-index: 1;
  white-space: nowrap;
}
.gmail-input { padding-right: 108px !important; }
.field-hint { font-size: 11px; color: var(--gray-400); margin-top: 5px; display: block; }

.input-wrap { position: relative; }
.input-wrap .form-control { padding-right: 44px; }
.pw-toggle {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: var(--gray-400); padding: 4px;
  display: flex; align-items: center;
}
.pw-toggle:hover { color: var(--green-primary); }

.role-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.role-card {
  border: 2px solid var(--gray-200); border-radius: var(--radius-md);
  padding: 16px; cursor: pointer; transition: all 0.2s; text-align: center;
}
.role-card:hover { border-color: var(--green-light); }
.role-card.active { border-color: var(--green-primary); background: var(--green-pale); }
.rc-icon {
  display: flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: var(--radius-sm);
  background: var(--gray-100); color: var(--gray-500);
  margin: 0 auto 10px; transition: all 0.2s;
}
.role-card:hover .rc-icon { background: var(--green-pale); color: var(--green-forest); }
.role-card.active .rc-icon { background: var(--green-primary); color: white; }
.rc-title { font-weight: 700; font-size: 14px; color: var(--gray-800); }
.rc-desc { font-size: 12px; color: var(--gray-500); margin-top: 3px; }

.w-full { width: 100%; justify-content: center; }
.switch-text { text-align: center; margin-top: 20px; font-size: 14px; color: var(--gray-600); }
.switch-text a { color: var(--green-primary); font-weight: 600; text-decoration: none; }
.switch-text a:hover { text-decoration: underline; }

/* ── Verification Waiting Screen ──────────────────────────────────────────── */
.verify-waiting { display: flex; flex-direction: column; align-items: center; text-align: center; }

.verify-icon-wrap {
  position: relative; width: 80px; height: 80px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.verify-icon-ring {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, #ea4335 0%, #fbbc05 100%);
  display: flex; align-items: center; justify-content: center;
  color: white; position: relative; z-index: 1;
  box-shadow: 0 8px 24px rgba(234,67,53,0.35);
}
.verify-pulse {
  position: absolute; inset: -6px; border-radius: 50%;
  border: 2px solid rgba(234, 67, 53, 0.3);
  animation: verifyPulse 2s ease-out infinite;
}
@keyframes verifyPulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

.verify-desc { font-size: 15px; color: var(--gray-700); margin-bottom: 8px; line-height: 1.6; }
.verify-email { color: var(--green-forest); word-break: break-all; }
.verify-subdesc { font-size: 13px; color: var(--gray-500); margin-bottom: 24px; line-height: 1.6; }

/* Demo link box */
.demo-link-box {
  width: 100%;
  background: #fffbf0;
  border: 1.5px dashed #f5a623;
  border-radius: var(--radius-md);
  padding: 14px 16px;
  margin-bottom: 20px;
}
.demo-link-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; color: #9a7200; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 10px;
}
.demo-verify-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: white;
  border: 1.5px solid #ea4335;
  color: #ea4335;
  border-radius: 6px;
  padding: 9px 14px;
  font-size: 13px; font-weight: 600;
  cursor: pointer; width: 100%;
  transition: all 0.2s;
}
.demo-verify-btn:hover { background: #fef2f2; border-color: #c0392b; }

/* Waiting status */
.verify-status {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--gray-500);
  margin-bottom: 20px;
}
.pulse-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--green-primary);
  animation: pulseDot 1.4s ease-in-out infinite;
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.verify-actions { display: flex; align-items: center; gap: 10px; font-size: 13px; }
.btn-link {
  background: none; border: none; cursor: pointer;
  color: var(--green-primary); font-size: 13px; font-weight: 600;
  padding: 0; text-decoration: underline; text-underline-offset: 2px;
  transition: opacity 0.2s;
}
.btn-link:disabled { opacity: 0.4; cursor: not-allowed; text-decoration: none; }
.sep { color: var(--gray-400); }

/* ── Verified Success State ───────────────────────────────────────────────── */
.verify-success {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 24px 0;
}
.success-icon {
  width: 80px; height: 80px; border-radius: 50%;
  background: var(--green-pale);
  display: flex; align-items: center; justify-content: center;
  color: var(--green-primary);
  margin-bottom: 20px;
  animation: successPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes successPop {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.success-title { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--green-darkest); margin-bottom: 8px; }
.success-desc { font-size: 14px; color: var(--gray-500); margin-bottom: 24px; }
.spinner-center { display: flex; justify-content: center; }

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .auth-page { grid-template-columns: 1fr; min-height: 100svh; }
  .auth-left { display: none; }
  .auth-right { padding: 24px 20px; align-items: flex-start; padding-top: 40px; }
  .auth-form-wrap { max-width: 100%; }
  .form-heading { font-size: 24px; }
  .role-cards { grid-template-columns: 1fr 1fr; gap: 8px; }
}
@media (max-width: 400px) {
  .role-cards { grid-template-columns: 1fr; }

}
</style>