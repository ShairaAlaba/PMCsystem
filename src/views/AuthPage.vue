<template>
  <div class="auth-page">
    <div class="auth-left" :style="`--bg-img: url('${libSketch}')`">
      <div class="auth-left-inner">
        <router-link to="/" class="back-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
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
          <button class="auth-tab" :class="{ active: mode === 'login' }" @click="switchToLogin">Sign In</button>
          <button class="auth-tab" :class="{ active: mode === 'register' }" @click="switchToRegister">Create Account</button>
        </div>

        <!-- LOGIN -->
        <div v-if="mode === 'login'" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Welcome back</h2>
          <p class="form-subheading">Sign in to your account to continue</p>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input
              v-model="loginData.email"
              type="email"
              class="form-control"
              placeholder="your@email.com"
              @keyup.enter="doLogin"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-wrap">
              <input
                v-model="loginData.password"
                :type="showPw ? 'text' : 'password'"
                class="form-control"
                placeholder="••••••••"
                @keyup.enter="doLogin"
              />
              <button class="pw-toggle" @click="showPw = !showPw" type="button">
                <svg v-if="!showPw" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Email-not-verified warning -->
          <div v-if="needsVerification" class="alert alert-warning">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            <span>
              Please verify your email first.
              <button class="btn-inline-link" @click="resendVerificationFromLogin" :disabled="resendCooldown > 0">
                {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend email' }}
              </button>
            </span>
          </div>

          <button class="btn btn-primary w-full" @click="doLogin" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Sign In</span>
          </button>
          <p class="switch-text">Don't have an account? <a href="#" @click.prevent="switchToRegister">Create one</a></p>
        </div>

        <!-- REGISTER — Step 1 -->
        <div v-if="mode === 'register' && step === 1" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Create Account</h2>
          <p class="form-subheading">Step 1 of 2 — Your Information</p>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input v-model="regData.name" type="text" class="form-control" placeholder="Enter your full name" />
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input
              v-model="regData.email"
              type="email"
              class="form-control"
              placeholder="your@email.com"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-wrap">
              <input
                v-model="regData.password"
                :type="showPw ? 'text' : 'password'"
                class="form-control"
                placeholder="Min 6 characters"
              />
              <button class="pw-toggle" @click="showPw = !showPw" type="button">
                <svg v-if="!showPw" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <span class="field-hint">At least 6 characters</span>
          </div>

          <div class="form-group">
            <label class="form-label">I am a...</label>
            <div class="role-cards">
              <div class="role-card" :class="{ active: regData.role === 'inspector' }" @click="regData.role = 'inspector'">
                <div class="rc-icon">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" stroke-width="2" stroke-linecap="round"/>
                    <path d="M16.5 16.5L21 21" stroke-width="2" stroke-linecap="round"/>
                    <path d="M11 8v3m0 0v3m0-3h3m-3 0H8" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="rc-title">Inspector</div>
                <div class="rc-desc">Record &amp; manage checklists</div>
              </div>
              <div class="role-card" :class="{ active: regData.role === 'admin' }" @click="regData.role = 'admin'">
                <div class="rc-icon">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div class="rc-title">Admin</div>
                <div class="rc-desc">View reports &amp; manage users</div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary w-full" @click="doRegister" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Create Account &amp; Send Verification</span>
          </button>
          <p class="switch-text">Already have an account? <a href="#" @click.prevent="switchToLogin">Sign in</a></p>
        </div>

        <!-- REGISTER — Step 2 -->
        <div v-if="mode === 'register' && step === 2" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Check Your Email</h2>
          <p class="form-subheading">Step 2 of 2 — Verify your email address</p>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="verify-waiting">
            <div class="verify-icon-wrap">
              <div class="verify-icon-ring">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="verify-pulse"></div>
            </div>

            <p class="verify-desc">
              A verification link has been sent to<br />
              <strong class="verify-email">{{ regData.email }}</strong>
            </p>
            <p class="verify-subdesc">
              Open your inbox and click the verification link. Once verified,
              come back here and click <strong>I've verified my email</strong> below.
            </p>

            <div class="instructions-box">
              <div class="instructions-label">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                What to do
              </div>
              <ol class="instructions-list">
                <li>Open your email inbox and find the email from <strong>noreply@pmcsystem.firebaseapp.com</strong></li>
                <li>Click the <strong>"Verify email address"</strong> link inside it</li>
                <li>Return here and press the button below</li>
              </ol>
            </div>

            <button class="btn btn-primary w-full" @click="checkVerifiedAndLogin" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              <span v-else>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="vertical-align:-3px;margin-right:6px">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                I've verified my email — Sign me in
              </span>
            </button>

            <div class="verify-actions">
              <button class="btn-link" @click="resendVerificationFromRegister" :disabled="resendCooldown > 0">
                {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend verification link' }}
              </button>
              <span class="sep">·</span>
              <button class="btn-link" @click="backToStep1">Change email</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import pmcLogo from '@/assets/pmclogo.png'
import libSketch from '@/assets/libsketch.png'

const router    = useRouter()
const authStore = useAuthStore()

const mode              = ref('login')
const step              = ref(1)
const loading           = ref(false)
const error             = ref('')
const showPw            = ref(false)
const needsVerification = ref(false)
const resendCooldown    = ref(0)

const loginData = ref({ email: '', password: '' })
const regData   = ref({ name: '', email: '', password: '', role: 'inspector' })

let cooldownTimer = null

function startResendCooldown(seconds = 60) {
  resendCooldown.value = seconds
  clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(cooldownTimer)
  }, 1000)
}

function switchToLogin() {
  mode.value  = 'login'
  step.value  = 1
  error.value = ''
  needsVerification.value = false
}

function switchToRegister() {
  mode.value  = 'register'
  step.value  = 1
  error.value = ''
  needsVerification.value = false
}

function backToStep1() {
  step.value  = 1
  error.value = ''
}

// ── Accept any valid email format (gmail, carsu, or any other) ───────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// ── LOGIN ────────────────────────────────────────────────────────────────────
async function doLogin() {
  error.value             = ''
  needsVerification.value = false

  if (!loginData.value.email || !loginData.value.password) {
    error.value = 'Please fill in all fields.'
    return
  }
  if (!isValidEmail(loginData.value.email)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  loading.value = true
  const res = await authStore.login(loginData.value.email, loginData.value.password)
  loading.value = false

  if (!res.success) {
    if (res.needsVerification) {
      needsVerification.value = true
      regData.value.email    = loginData.value.email
      regData.value.password = loginData.value.password
    } else {
      error.value = res.error
    }
    return
  }

  router.push(res.role === 'admin' ? '/admin' : '/inspector')
}

// ── REGISTER — Step 1 ────────────────────────────────────────────────────────
async function doRegister() {
  error.value = ''

  if (!regData.value.name.trim())        { error.value = 'Please enter your full name.'; return }
  if (!regData.value.email)              { error.value = 'Please enter your email address.'; return }
  if (!isValidEmail(regData.value.email)){ error.value = 'Please enter a valid email address.'; return }
  if (regData.value.password.length < 6) { error.value = 'Password must be at least 6 characters.'; return }
  if (!regData.value.role)               { error.value = 'Please select a role.'; return }

  loading.value = true
  const res = await authStore.register({
    name:     regData.value.name,
    email:    regData.value.email,
    password: regData.value.password,
    role:     regData.value.role,
  })
  loading.value = false

  if (!res.success) { error.value = res.error; return }

  step.value = 2
  startResendCooldown()
}

// ── REGISTER — Step 2 ────────────────────────────────────────────────────────
async function checkVerifiedAndLogin() {
  error.value   = ''
  loading.value = true
  const res = await authStore.loginAfterVerification(
    regData.value.email,
    regData.value.password
  )
  loading.value = false
  if (!res.success) { error.value = res.error; return }
  router.push(res.role === 'admin' ? '/admin' : '/inspector')
}

// ── RESEND (from Step 2) ─────────────────────────────────────────────────────
async function resendVerificationFromRegister() {
  if (resendCooldown.value > 0) return
  error.value   = ''
  loading.value = true
  const res = await authStore.resendVerificationEmail(regData.value.email, regData.value.password)
  loading.value = false
  if (!res.success) { error.value = res.error; return }
  startResendCooldown()
}

// ── RESEND (from Login warning) ──────────────────────────────────────────────
async function resendVerificationFromLogin() {
  if (resendCooldown.value > 0) return
  error.value   = ''
  loading.value = true
  const res = await authStore.resendVerificationEmail(regData.value.email, regData.value.password)
  loading.value = false
  if (!res.success) { error.value = res.error; return }
  startResendCooldown()
}

onUnmounted(() => clearInterval(cooldownTimer))
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
.auth-left-inner { padding: 40px; position: relative; z-index: 1; width: 100%; }
.back-link { display: inline-flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.5); font-size: 13px; text-decoration: none; margin-bottom: 40px; transition: color 0.2s; }
.back-link:hover { color: var(--green-primary); }
.brand { display: flex; align-items: center; gap: 14px; margin-bottom: 40px; }
.brand-logo { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; }
.brand-logo-img { width: 48px; height: 48px; object-fit: contain; }
.brand-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: white; }
.brand-sub { font-size: 12px; color: rgba(255,255,255,0.45); }
.auth-illustration { display: flex; align-items: center; justify-content: center; margin: 32px 0; padding: 0 10px; }
.auth-pmc-logo { width: 100%; max-width: 340px; height: auto; object-fit: contain; display: block; animation: float 6s ease-in-out infinite; filter: drop-shadow(0 16px 40px rgba(0,192,75,0.3)); }
.auth-quote { color: rgba(255,255,255,0.55); font-style: italic; font-size: 16px; font-family: var(--font-display); }
.auth-quote-sub { font-size: 12px; font-style: normal; margin-top: 4px; color: var(--green-primary); }

.auth-right { display: flex; align-items: center; justify-content: center; background: white; padding: 40px; }
.auth-form-wrap { width: 100%; max-width: 420px; }

.auth-tabs { display: flex; background: var(--gray-100); border-radius: var(--radius-md); padding: 4px; margin-bottom: 32px; }
.auth-tab { flex: 1; padding: 10px; border: none; border-radius: calc(var(--radius-md) - 4px); font-family: var(--font-body); font-size: 14px; font-weight: 500; cursor: pointer; background: transparent; color: var(--gray-600); transition: all 0.2s; }
.auth-tab.active { background: white; color: var(--green-forest); font-weight: 700; box-shadow: var(--shadow-sm); }

.form-heading { font-family: var(--font-display); font-size: 30px; font-weight: 700; color: var(--green-darkest); margin-bottom: 6px; }
.form-subheading { font-size: 14px; color: var(--gray-500); margin-bottom: 28px; }
.form-group { margin-bottom: 18px; }
.form-label { font-size: 11px; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 0.6px; display: block; margin-bottom: 6px; }
.form-control { width: 100%; border: 1.5px solid #e0e0e0; border-radius: 8px; font-size: 13px; padding: 10px 13px; transition: border-color 0.2s, box-shadow 0.2s; color: #1a1a1a; background: #fafafa; font-family: var(--font-body); }
.form-control:focus { border-color: var(--green-primary); outline: none; box-shadow: 0 0 0 3px rgba(0,153,0,0.1); background: #fff; }
.field-hint { font-size: 11px; color: var(--gray-400); margin-top: 5px; display: block; }

.alert { padding: 12px 14px; border-radius: var(--radius-sm); font-size: 13px; margin-bottom: 18px; }
.alert-error   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.alert-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; display: flex; align-items: flex-start; gap: 8px; line-height: 1.5; }
.btn-inline-link { background: none; border: none; cursor: pointer; color: var(--green-forest); font-size: 13px; font-weight: 600; padding: 0; text-decoration: underline; text-underline-offset: 2px; margin-left: 4px; }
.btn-inline-link:disabled { opacity: 0.4; cursor: not-allowed; text-decoration: none; }

.input-wrap { position: relative; }
.input-wrap .form-control { padding-right: 44px; }
.pw-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--gray-400); padding: 4px; display: flex; align-items: center; }
.pw-toggle:hover { color: var(--green-primary); }

.role-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.role-card { border: 2px solid var(--gray-200); border-radius: var(--radius-md); padding: 16px; cursor: pointer; transition: all 0.2s; text-align: center; }
.role-card:hover { border-color: var(--green-light); }
.role-card.active { border-color: var(--green-primary); background: var(--green-pale); }
.rc-icon { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: var(--radius-sm); background: var(--gray-100); color: var(--gray-500); margin: 0 auto 10px; transition: all 0.2s; }
.role-card:hover .rc-icon { background: var(--green-pale); color: var(--green-forest); }
.role-card.active .rc-icon { background: var(--green-primary); color: white; }
.rc-title { font-weight: 700; font-size: 14px; color: var(--gray-800); }
.rc-desc  { font-size: 12px; color: var(--gray-500); margin-top: 3px; }

.w-full { width: 100%; justify-content: center; }
.btn { font-family: var(--font-body); font-weight: 600; border-radius: 8px; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; padding: 11px 18px; border: none; cursor: pointer; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-primary { background: linear-gradient(135deg, #009900, #006600); color: #fff; box-shadow: 0 3px 10px rgba(0,153,0,0.3); }
.btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,153,0,0.38); }

.switch-text { text-align: center; margin-top: 20px; font-size: 14px; color: var(--gray-600); }
.switch-text a { color: var(--green-primary); font-weight: 600; text-decoration: none; }
.switch-text a:hover { text-decoration: underline; }

.verify-waiting { display: flex; flex-direction: column; align-items: center; text-align: center; }
.verify-icon-wrap { position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.verify-icon-ring { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #ea4335 0%, #fbbc05 100%); display: flex; align-items: center; justify-content: center; color: white; position: relative; z-index: 1; box-shadow: 0 8px 24px rgba(234,67,53,0.35); }
.verify-pulse { position: absolute; inset: -6px; border-radius: 50%; border: 2px solid rgba(234,67,53,0.3); animation: verifyPulse 2s ease-out infinite; }
@keyframes verifyPulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
.verify-desc { font-size: 15px; color: var(--gray-700); margin-bottom: 8px; line-height: 1.6; }
.verify-email { color: var(--green-forest); word-break: break-all; }
.verify-subdesc { font-size: 13px; color: var(--gray-500); margin-bottom: 20px; line-height: 1.6; }

.instructions-box { width: 100%; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: var(--radius-md); padding: 14px 16px; margin-bottom: 20px; text-align: left; }
.instructions-label { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #166534; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.instructions-list { margin: 0; padding-left: 18px; font-size: 13px; color: var(--gray-700); line-height: 1.8; }
.instructions-list strong { color: var(--green-forest); }

.verify-actions { display: flex; align-items: center; gap: 10px; font-size: 13px; margin-top: 16px; }
.btn-link { background: none; border: none; cursor: pointer; color: var(--green-primary); font-size: 13px; font-weight: 600; padding: 0; text-decoration: underline; text-underline-offset: 2px; transition: opacity 0.2s; }
.btn-link:disabled { opacity: 0.4; cursor: not-allowed; text-decoration: none; }
.sep { color: var(--gray-400); }

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