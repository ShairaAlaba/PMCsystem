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
          <button class="auth-tab" :class="{active: mode === 'login'}" @click="mode = 'login'">Sign In</button>
          <button class="auth-tab" :class="{active: mode === 'register'}" @click="mode = 'register'; step = 1">Create Account</button>
        </div>

        <!-- LOGIN -->
        <div v-if="mode === 'login'" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Welcome back</h2>
          <p class="form-subheading">Sign in to your account to continue</p>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input v-model="loginData.email" type="email" class="form-control" placeholder="your@email.com" />
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
          <p class="switch-text">Don't have an account? <a href="#" @click.prevent="mode = 'register'; step = 1">Create one</a></p>
        </div>

        <!-- REGISTER STEP 1 -->
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
            <input v-model="regData.email" type="email" class="form-control" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-wrap">
              <input v-model="regData.password" :type="showPw ? 'text' : 'password'" class="form-control" placeholder="Min 8 characters" />
              <button class="pw-toggle" @click="showPw = !showPw">👁</button>
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
            <span v-else>Continue — Get Verification Code</span>
          </button>
          <p class="switch-text">Already have an account? <a href="#" @click.prevent="mode = 'login'">Sign in</a></p>
        </div>

        <!-- REGISTER STEP 2 -->
        <div v-if="mode === 'register' && step === 2" class="auth-form animate-fadeUp">
          <h2 class="form-heading">Verify Email</h2>
          <p class="form-subheading">Step 2 of 2 — Enter your verification code</p>
          <div v-if="error" class="alert alert-error">{{ error }}</div>
          <div class="alert alert-info">
            📧 A 6-digit verification code has been sent to <strong>{{ regData.email }}</strong>. 
            <br><small style="opacity:0.8">(For demo: use code <strong>{{ demoCode }}</strong>)</small>
          </div>
          <div class="form-group">
            <label class="form-label">Verification Code</label>
            <input v-model="regData.code" type="text" class="form-control code-input" placeholder="000000" maxlength="6" />
          </div>
          <button class="btn btn-primary w-full" @click="doRegister" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Create Account</span>
          </button>
          <button class="btn btn-ghost w-full" style="margin-top:8px" @click="step = 1">← Go Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const loginData = ref({ email: '', password: '' })
const regData = ref({ name: '', email: '', password: '', role: 'inspector', code: '' })

const checkItems = ['Mopping of Floor', 'Cleaning Lavatory', 'Cleaning Water Closet', 'Spraying Air Refresher', 'Checking Floor Drain']

// Demo code - in real app this would come from backend
const demoCode = computed(() => {
  // Generate a deterministic demo code based on email
  const hash = regData.value.email.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return String(100000 + (hash % 900000)).padStart(6, '0')
})

async function doLogin() {
  error.value = ''
  if (!loginData.value.email || !loginData.value.password) {
    error.value = 'Please fill in all fields.'; return
  }
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  const res = auth.login(loginData.value.email, loginData.value.password)
  loading.value = false
  if (!res.success) { error.value = res.error; return }
  router.push(res.role === 'admin' ? '/admin' : '/inspector')
}

async function goStep2() {
  error.value = ''
  if (!regData.value.name.trim()) { error.value = 'Please enter your full name.'; return }
  if (!regData.value.email.includes('@')) { error.value = 'Please enter a valid email.'; return }
  if (regData.value.password.length < 8) { error.value = 'Password must be at least 8 characters.'; return }
  if (!regData.value.role) { error.value = 'Please select a role.'; return }

  loading.value = true
  await new Promise(r => setTimeout(r, 800)) // Simulate sending email
  loading.value = false
  step.value = 2
}

async function doRegister() {
  error.value = ''
  if (!regData.value.code) { error.value = 'Please enter the verification code.'; return }

  // Check if code matches demo code
  if (regData.value.code !== demoCode.value) {
    error.value = `Invalid verification code. For demo, use: ${demoCode.value}`; return
  }

  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  const res = auth.register({
    name: regData.value.name,
    email: regData.value.email,
    password: regData.value.password,
    role: regData.value.role,
    code: regData.value.code,
  })
  loading.value = false
  if (!res.success) { error.value = res.error; return }
  // Auto login after register
  auth.login(regData.value.email, regData.value.password)
  router.push(regData.value.role === 'admin' ? '/admin' : '/inspector')
}
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
.brand-logo {
  width: 52px; height: 52px;
  display: flex; align-items: center; justify-content: center;
}
.brand-logo-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.brand-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: white; }
.brand-sub { font-size: 12px; color: rgba(255,255,255,0.45); }

.auth-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  padding: 0 10px;
}
.auth-pmc-logo {
  width: 100%;
  max-width: 340px;
  height: auto;
  object-fit: contain;
  display: block;
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 16px 40px rgba(0, 192, 75, 0.3));
}

.auth-quote {
  color: rgba(255,255,255,0.55);
  font-style: italic;
  font-size: 16px;
  font-family: var(--font-display);
}
.auth-quote-sub { font-size: 12px; font-style: normal; margin-top: 4px; color: var(--green-primary); }

/* Right Panel */
.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 40px;
}
.auth-form-wrap { width: 100%; max-width: 420px; }
.auth-tabs {
  display: flex;
  background: var(--gray-100);
  border-radius: var(--radius-md);
  padding: 4px;
  margin-bottom: 32px;
}
.auth-tab {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: calc(var(--radius-md) - 4px);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: var(--gray-600);
  transition: all 0.2s;
}
.auth-tab.active {
  background: white;
  color: var(--green-forest);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}
.form-heading {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 700;
  color: var(--green-darkest);
  margin-bottom: 6px;
}
.form-subheading { font-size: 14px; color: var(--gray-500); margin-bottom: 28px; }

.input-wrap { position: relative; }
.input-wrap .form-control { padding-right: 44px; }
.pw-toggle {
  position: absolute;
  right: 12px; top: 50%;
  transform: translateY(-50%);
  background: none; border: none;
  cursor: pointer; color: var(--gray-400);
  padding: 4px;
  display: flex; align-items: center;
}
.pw-toggle:hover { color: var(--green-primary); }

.role-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.role-card {
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.role-card:hover { border-color: var(--green-light); }
.role-card.active {
  border-color: var(--green-primary);
  background: var(--green-pale);
}
.rc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-sm);
  background: var(--gray-100);
  color: var(--gray-500);
  margin: 0 auto 10px;
  transition: all 0.2s;
}
.role-card:hover .rc-icon {
  background: var(--green-pale);
  color: var(--green-forest);
}
.role-card.active .rc-icon {
  background: var(--green-primary);
  color: white;
}
.rc-title { font-weight: 700; font-size: 14px; color: var(--gray-800); }
.rc-desc { font-size: 12px; color: var(--gray-500); margin-top: 3px; }

.w-full { width: 100%; justify-content: center; }
.switch-text { text-align: center; margin-top: 20px; font-size: 14px; color: var(--gray-600); }
.switch-text a { color: var(--green-primary); font-weight: 600; text-decoration: none; }
.switch-text a:hover { text-decoration: underline; }

.code-input {
  font-size: 28px;
  text-align: center;
  letter-spacing: 12px;
  font-weight: 700;
}

/* ── RESPONSIVE ── */
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