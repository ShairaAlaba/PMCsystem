<template>
  <div class="landing">
    <!-- Animated Background -->
    <div class="bg-layers">
      <div class="bg-orb orb1"></div>
      <div class="bg-orb orb2"></div>
      <div class="bg-orb orb3"></div>
      <div class="bg-grid"></div>
    </div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-brand">
        <div class="nav-logo">
          <img :src="pmcLogo" alt="PMC Logo" class="nav-logo-img" />
        </div>
        <div>
          <div class="nav-title">Caraga State University - PMC System</div>
          <div class="nav-sub">General Services Office</div>
        </div>
      </div>
      <router-link to="/auth" class="btn btn-primary nav-cta">
        Sign In
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
      </router-link>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge animate-fadeUp" style="animation-delay:0.1s">
          <span class="badge-dot"></span>
          Caraga State University · General Services Office
        </div>
        <h1 class="hero-title animate-fadeUp" style="animation-delay:0.2s">
          Preventive<br>
          <span class="title-accent">Maintenance</span><br>
          Checklist
        </h1>
        <p class="hero-desc animate-fadeUp" style="animation-delay:0.3s">
          A smart digital system for tracking and managing daily sanitation and maintenance activities across CSU facilities — accurately, reliably, and efficiently.
        </p>
        <div class="hero-actions animate-fadeUp" style="animation-delay:0.4s">
          <router-link to="/auth" class="btn btn-primary btn-lg">
            Get Started
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </router-link>
          <a href="#features" class="btn btn-outline btn-lg">Learn More</a>
        </div>
        <div class="hero-stats animate-fadeUp" style="animation-delay:0.5s">
          <div class="stat">
     
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
         
          </div>
        </div>
      </div>
      <div class="hero-visual animate-fadeIn" style="animation-delay:0.3s">
        <div class="hero-image-wrap">
          <img :src="notFoundImg" alt="CSU PMC System Illustration" class="hero-img" />
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features" id="features">
      <div class="features-container">
        <div class="section-label">System Features</div>
        <h2 class="section-title">Everything you need to manage maintenance</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="(f, i) in features" :key="i">
            <div class="feature-icon" :style="`background: ${f.bg}`">
              <span v-html="f.icon"></span>
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Ready to get started?</h2>
        <p>Create your account and begin tracking maintenance activities today.</p>
        <router-link to="/auth" class="btn btn-primary btn-lg">
          Get Started Now
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <img :src="pmcLogo" alt="PMC Logo" class="footer-logo-img" />
          <strong>Caraga State University</strong> — General Services Office
        </div>
        <div class="footer-links">
          <span>Ampayon, Butuan City 8600, Philippines</span>
          <span>Competence · Service · Uprightness</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import notFoundImg from '@/assets/404.png'
import pmcLogo from '@/assets/pmclogo.png'

const features = [
  {
    icon: `<svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
    bg: 'linear-gradient(135deg,#00c04b,#228b22)',
    title: 'Daily Checklist Tracking',
    desc: 'Record AM and PM maintenance activities for each day of the month with precision and ease.',
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
    bg: 'linear-gradient(135deg,#228b22,#003300)',
    title: 'Role-Based Access',
    desc: 'Separate Inspector and Admin accounts with distinct permissions for secure, organized access.',
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    bg: 'linear-gradient(135deg,#70c247,#00c04b)',
    title: 'Historical Records',
    desc: 'Access complete monthly records for every janitor. Track progress over time with full history.',
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>`,
    bg: 'linear-gradient(135deg,#003300,#1a5c1a)',
    title: 'Print-Ready Reports',
    desc: 'Generate government-compliant printed checklists matching the official CSU format.',
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-width="2" d="M12 6v6l4 2"/></svg>`,
    bg: 'linear-gradient(135deg,#8dd06c,#70c247)',
    title: 'Real-Time Monitoring',
    desc: 'Admins can monitor inspector online status and login timestamps in real time.',
  },
  {
    icon: `<svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
    bg: 'linear-gradient(135deg,#00c04b,#8dd06c)',
    title: 'Current Day Lock',
    desc: 'Inspectors can only edit today\'s records — past and future dates are locked for data integrity.',
  },
]
</script>

<style scoped>
.landing {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Background */
.bg-layers {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(160deg, #f0faf0 0%, #ffffff 50%, #e8f5e9 100%);
}
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
}
.orb1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #00c04b, transparent);
  top: -200px; right: -100px;
  animation: float 8s ease-in-out infinite;
}
.orb2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #70c247, transparent);
  bottom: 20%; left: -100px;
  animation: float 10s ease-in-out infinite reverse;
}
.orb3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, #228b22, transparent);
  top: 50%; right: 20%;
  animation: float 12s ease-in-out infinite;
}
.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,192,75,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,192,75,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 60px;
  background: rgb(2, 59, 7);
  backdrop-filter: blur(20px);
}
.nav-brand { display: flex; align-items: center; gap: 12px; }
.nav-logo {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
}
.nav-logo-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  display: block;
}
.nav-title {
  color: #ffffff;
  font-weight: 600; /* optional for better visibility */
}
.nav-sub { font-size: 11px; color: #ffffffbb; }
.nav-cta { padding: 10px 22px; font-size: 14px; }

/* Hero */
.hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  min-height: 100vh;
  padding: 120px 60px 60px;
  max-width: 1300px;
  margin: 0 auto;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--green-pale);
  border: 1px solid rgba(0,192,75,0.25);
  color: var(--green-forest);
  padding: 8px 16px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
  opacity: 0;
}
.badge-dot {
  width: 8px; height: 8px;
  background: var(--green-primary);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 900;
  line-height: 1.05;
  color: var(--green-darkest);
  margin-bottom: 24px;
  opacity: 0;
}
.title-accent {
  background: linear-gradient(135deg, var(--green-primary), var(--green-forest));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: 17px;
  color: var(--gray-600);
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 36px;
  opacity: 0;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-bottom: 48px;
  opacity: 0;
}
.btn-lg { padding: 16px 36px; font-size: 16px; }
.hero-stats {
  display: flex;
  align-items: center;
  gap: 28px;
  opacity: 0;
}
.stat { text-align: center; }
.stat-value { font-family: var(--font-display); font-size: 26px; font-weight: 700; color: var(--green-forest); }
.stat-label { font-size: 12px; color: var(--gray-500); }
.stat-divider { width: 1px; height: 40px; background: var(--gray-300); }

/* Hero Visual */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}
.hero-image-wrap {
  width: 100%;
  max-width: 560px;
  animation: float 6s ease-in-out infinite;
}
.hero-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  filter: drop-shadow(0 24px 48px rgba(0, 51, 0, 0.18));
}

/* Features */
.features {
  position: relative;
  z-index: 1;
  background: var(--green-darkest);
  padding: 100px 60px;
}
.features-container { max-width: 1200px; margin: 0 auto; }
.section-label {
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 3px;
  color: var(--green-primary);
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  color: white;
  margin-bottom: 60px;
  max-width: 600px;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}
.feature-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-lg);
  padding: 28px;
  transition: all 0.3s;
}
.feature-card:hover {
  background: rgba(255,255,255,0.08);
  transform: translateY(-4px);
  border-color: rgba(0,192,75,0.3);
}
.feature-icon {
  width: 48px; height: 48px;
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.feature-card h3 { color: white; font-size: 17px; font-weight: 600; margin-bottom: 8px; }
.feature-card p { color: rgba(255,255,255,0.55); font-size: 14px; line-height: 1.6; }

/* CTA */
.cta-section {
  position: relative;
  z-index: 1;
  padding: 100px 60px;
  background: linear-gradient(135deg, var(--green-pale), white);
  text-align: center;
}
.cta-content { max-width: 600px; margin: 0 auto; }
.cta-content h2 {
  font-family: var(--font-display);
  font-size: 48px; font-weight: 900;
  color: var(--green-darkest);
  margin-bottom: 16px;
}
.cta-content p { font-size: 17px; color: var(--gray-600); margin-bottom: 36px; }

/* Footer */
.footer {
  position: relative;
  z-index: 1;
  background: var(--green-darkest);
  padding: 8px 10px;
}
.footer-inner {
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255,255,255,0.5);
  font-size: 13px;
}
.footer-brand {
  color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer-logo-img {
  width: 82px;
  height: 82px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}
.footer-links { display: flex; gap: 24px; }

/* ── Tablet (≤1024px) ── */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 90px 32px 60px;
    gap: 40px;
    min-height: auto;
  }
  .hero-visual { justify-content: center; order: -1; } /* image above text on tablet */
  .hero-image-wrap { max-width: 400px; }
  .hero-desc { max-width: 100%; }
}

/* ── Mobile (≤768px) ── */
@media (max-width: 768px) {
  /* Navbar */
  .navbar {
    padding: 10px 16px;
    gap: 10px;
  }
  .nav-brand { gap: 8px; flex: 1; min-width: 0; }
  .nav-logo { width: 36px; height: 36px; }
  .nav-logo-img { width: 42px; height: 42px; }
  .nav-title {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .nav-sub { display: none; }
  .nav-cta { padding: 8px 16px; font-size: 13px; flex-shrink: 0; }

  /* Hero */
  .hero {
    grid-template-columns: 1fr;
    padding: 76px 18px 40px;
    gap: 28px;
  }
  .hero-visual { order: -1; }
  .hero-image-wrap { max-width: 280px; margin: 0 auto; }
  .hero-badge { font-size: 11px; padding: 6px 12px; }
  .hero-title { font-size: clamp(32px, 9vw, 52px); margin-bottom: 16px; }
  .hero-desc { font-size: 14px; line-height: 1.65; margin-bottom: 24px; max-width: 100%; }
  .hero-actions { flex-direction: column; gap: 10px; margin-bottom: 28px; }
  .btn-lg { padding: 14px 24px; font-size: 15px; width: 100%; justify-content: center; }
  .hero-stats { gap: 16px; justify-content: flex-start; }
  .stat-value { font-size: 20px; }
  .stat-label { font-size: 11px; }
  .stat-divider { height: 30px; }

  /* Features */
  .features { padding: 52px 18px; }
  /* Force 1 column — override the 320px min */
  .features-grid { grid-template-columns: 1fr; gap: 14px; }
  .section-label { font-size: 11px; letter-spacing: 2px; }
  .section-title { font-size: clamp(22px, 7vw, 36px); margin-bottom: 28px; }
  .feature-card { padding: 20px; }
  .feature-icon { width: 42px; height: 42px; margin-bottom: 12px; }
  .feature-card h3 { font-size: 15px; }
  .feature-card p { font-size: 13px; }

  /* CTA */
  .cta-section { padding: 52px 18px; }
  .cta-content h2 { font-size: clamp(26px, 8vw, 40px); margin-bottom: 12px; }
  .cta-content p { font-size: 15px; margin-bottom: 24px; }

  /* Footer */
  .footer { padding: 14px 16px; }
  .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
  .footer-brand { justify-content: center; font-size: 12px; }
  .footer-logo-img { width: 40px; height: 40px; } /* was 82px — way too big on mobile */
  .footer-links { flex-direction: column; gap: 3px; font-size: 11px; }
}

/* ── Small mobile (≤480px) ── */
@media (max-width: 480px) {
  .navbar { padding: 8px 12px; }
  .nav-logo-img { width: 34px; height: 34px; }
  .nav-title { font-size: 11px; }
  .nav-cta { padding: 7px 13px; font-size: 12px; }

  .hero { padding: 68px 14px 32px; gap: 20px; }
  .hero-image-wrap { max-width: 220px; }
  .hero-title { font-size: clamp(28px, 9vw, 44px); }
  .hero-badge { font-size: 10px; padding: 5px 10px; }
  .hero-desc { font-size: 13px; }
  .btn-lg { padding: 13px 20px; font-size: 14px; }

  .features { padding: 40px 14px; }
  .feature-card { padding: 16px; }
  .cta-section { padding: 40px 14px; }
  .cta-content h2 { font-size: clamp(22px, 8vw, 34px); }
  .cta-content p { font-size: 14px; }
}
</style>