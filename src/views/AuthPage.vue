<template>
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-left-inner">
        <router-link to="/" class="back-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Home
        </router-link>
        <div class="brand">
          <div class="brand-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 8v8c0 7.73 5.15 14.97 12 17 6.85-2.03 12-9.27 12-17V8L16 2z" fill="rgba(0,192,75,0.2)"/>
              <path d="M16 2L4 8v8c0 7.73 5.15 14.97 12 17 6.85-2.03 12-9.27 12-17V8L16 2z" stroke="#00c04b" stroke-width="2" fill="none"/>
              <path d="M11 16l3 3 7-7" stroke="#00c04b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div class="brand-name">CSU PMC System</div>
            <div class="brand-sub">Caraga State University</div>
          </div>
        </div>
        <div class="auth-illustration">
          <div class="ill-orb orb-a"></div>
          <div class="ill-orb orb-b"></div>
          <div class="ill-card">
            <div class="ic-title">Daily Maintenance</div>
            <div class="ic-items">
              <div class="ic-row" v-for="(item, i) in checkItems" :key="i">
                <div class="ic-check" :class="{done: i < 3}">{{ i < 3 ? '✓' : '' }}</div>
                <span :class="{done: i < 3}">{{ item }}</span>
              </div>
            </div>
          </div>
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
                <div class="rc-icon">🔍</div>
                <div class="rc-title">Inspector</div>
                <div class="rc-desc">Record & manage checklists</div>
              </div>
              <div class="role-card" :class="{active: regData.role === 'admin'}" @click="regData.role = 'admin'">
                <div class="rc-icon">👑</div>
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
  background: rgba(0,192,75,0.15);
  border: 1px solid rgba(0,192,75,0.25);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.brand-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: white; }
.brand-sub { font-size: 12px; color: rgba(255,255,255,0.45); }

.auth-illustration { position: relative; height: 260px; margin: 32px 0; }
.ill-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
}
.orb-a { width: 200px; height: 200px; background: rgba(0,192,75,0.2); top: 0; right: 0; }
.orb-b { width: 150px; height: 150px; background: rgba(112,194,71,0.15); bottom: 0; left: 0; }

.ill-card {
  position: absolute;
  top: 20px; left: 20px; right: 20px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-lg);
  padding: 20px;
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}
.ic-title { color: white; font-weight: 600; margin-bottom: 14px; font-size: 14px; }
.ic-items { display: flex; flex-direction: column; gap: 8px; }
.ic-row { display: flex; align-items: center; gap: 10px; }
.ic-check {
  width: 20px; height: 20px;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; color: white; flex-shrink: 0;
}
.ic-check.done { background: var(--green-primary); border-color: var(--green-primary); }
.ic-row span { font-size: 13px; color: rgba(255,255,255,0.5); }
.ic-row span.done { color: rgba(255,255,255,0.9); text-decoration: line-through; }

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
.rc-icon { font-size: 24px; margin-bottom: 8px; }
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