<template>
  <div class="dashboard">
    <!-- Mobile overlay -->
    <div class="mobile-overlay" v-if="mobileNavOpen" @click="mobileNavOpen = false"></div>

    <!-- Mobile Top Bar (hamburger) -->
    <header class="mobile-topbar">
      <div class="mobile-topbar-left">
        <img src="@/assets/pmclogo.png" alt="GSO PMC Logo" class="mobile-logo" />
        <div class="mobile-brand">
          <div class="mb-title">PMC SYSTEM</div>
          <div class="mb-sub">Admin Panel</div>
        </div>
      </div>
      <button class="hamburger-btn" @click="mobileNavOpen = !mobileNavOpen" :aria-expanded="mobileNavOpen">
        <span class="ham-line" :class="{open: mobileNavOpen}"></span>
        <span class="ham-line" :class="{open: mobileNavOpen}"></span>
        <span class="ham-line" :class="{open: mobileNavOpen}"></span>
      </button>
    </header>

    <!-- Mobile Nav Drawer -->
    <div class="mobile-drawer" :class="{open: mobileNavOpen}">
      <div class="drawer-user">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-info">
          <div class="user-name">{{ auth.currentUser?.name }}</div>
          <div class="user-role">Admin</div>
        </div>
      </div>
      <nav class="drawer-nav">
        <button class="drawer-item" :class="{active: activeTab === 'analytics'}" @click="navTo('analytics')">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          All Records
        </button>
        <button class="drawer-item" :class="{active: activeTab === 'inspectors'}" @click="navTo('inspectors')">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Inspectors
          <span class="drawer-badge">{{ inspectors.length }}</span>
        </button>
        <button class="drawer-item" :class="{active: activeTab === 'logs'}" @click="navTo('logs')">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Activity Logs
        </button>
        <button class="drawer-item" :class="{active: activeTab === 'buildings'}" @click="navTo('buildings')">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          Buildings List
          <span class="drawer-badge">{{ buildings.length }}</span>
        </button>
      </nav>
      <div class="drawer-footer">
        <button class="logout-btn" @click="doLogout">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Sign Out
        </button>
      </div>
    </div>

    <!-- Desktop Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="@/assets/pmclogo.png" alt="GSO PMC Logo" class="sidebar-logo-img" />
        <div class="sidebar-brand">
          <div class="sb-title">PMC SYSTEM</div>
          <div class="sb-sub">Admin Panel</div>
        </div>
      </div>
      <div class="sidebar-user">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-info">
          <div class="user-name">{{ auth.currentUser?.name }}</div>
          <div class="user-role">Admin</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-title">Menu</div>
        <button class="nav-item" :class="{active: activeTab === 'analytics'}" @click="activeTab = 'analytics'">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          All Records
        </button>
        <button class="nav-item" :class="{active: activeTab === 'inspectors'}" @click="activeTab = 'inspectors'">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Inspectors
          <span class="nav-badge">{{ inspectors.length }}</span>
        </button>
        <button class="nav-item" :class="{active: activeTab === 'logs'}" @click="activeTab = 'logs'">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Activity Logs
        </button>
        <button class="nav-item" :class="{active: activeTab === 'buildings'}" @click="activeTab = 'buildings'">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          Buildings List
          <span class="nav-badge">{{ buildings.length }}</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" @click="doLogout">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main -->
    <main class="main-content">
      <!-- PMC Banner Hero -->
      <div class="pmc-hero">
        <div class="pmc-hero-overlay">
          <h1 class="pmc-hero-title">PREVENTIVE MAINTENANCE CHECKLIST</h1>
          <p class="pmc-hero-sub">Caraga State University — Facilities Management</p>
        </div>
      </div>

      <div class="content-header">
        <div>
          <h1 class="content-title">{{ tabTitle }}</h1>
          <p class="content-sub">{{ today }}</p>
        </div>
      </div>

      <!-- ===== ANALYTICS TAB ===== -->
      <div v-if="activeTab === 'analytics'" class="tab-content">

        <!-- Summary KPI Cards -->
        <div class="kpi-grid">
          <div class="kpi-card" style="--kpi-accent:#00c04b">
            <div class="kpi-icon" style="background:linear-gradient(135deg,#00c04b,#228b22)">
              <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ analyticsRecords.length }}</div>
              <div class="kpi-label">Total Records</div>
            </div>
            <div class="kpi-trend">{{ filterYear || 'All Years' }}</div>
          </div>
          <div class="kpi-card" style="--kpi-accent:#3b82f6">
            <div class="kpi-icon" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8)">
              <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ inspectors.length }}</div>
              <div class="kpi-label">Inspectors</div>
            </div>
            <div class="kpi-trend">{{ onlineInspectors.length }} online</div>
          </div>
          <div class="kpi-card" style="--kpi-accent:#f59e0b">
            <div class="kpi-icon" style="background:linear-gradient(135deg,#f59e0b,#d97706)">
              <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ avgCompletion }}%</div>
              <div class="kpi-label">Avg Completion</div>
            </div>
            <div class="kpi-trend">across all records</div>
          </div>
          <div class="kpi-card" style="--kpi-accent:#8b5cf6">
            <div class="kpi-icon" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9)">
              <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ uniqueBuildings }}</div>
              <div class="kpi-label">Buildings Covered</div>
            </div>
            <div class="kpi-trend">unique locations</div>
          </div>
        </div>

        <!-- Filters row -->
        <div class="analytics-filters card">
          <div class="af-row">
            <div class="af-group">
              <label class="af-label">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
                Search
              </label>
              <input v-model="searchQ" type="text" class="form-control af-input" placeholder="Search building, janitor, inspector..." />
            </div>
            <div class="af-group">
              <label class="af-label">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Month
              </label>
              <select v-model="filterMonth" class="form-control af-input">
                <option value="">All Months</option>
                <option v-for="(m, i) in months" :key="i" :value="i+1">{{ m }}</option>
              </select>
            </div>
            <div class="af-group">
              <label class="af-label">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Year
              </label>
              <select v-model="filterYear" class="form-control af-input">
                <option value="">All Years</option>
                <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
            <div class="af-group" v-if="searchQ || filterMonth || filterYear">
              <label class="af-label">&nbsp;</label>
              <button class="btn btn-ghost af-clear" @click="searchQ='';filterMonth='';filterYear=''">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Clear
              </button>
            </div>
          </div>
          <div class="af-results-info" v-if="filteredRecords.length !== allRecords.length">
            Showing <strong>{{ filteredRecords.length }}</strong> of <strong>{{ allRecords.length }}</strong> records
          </div>
        </div>

        <!-- Monthly completion bar chart -->
        <div class="card chart-card">
          <div class="chart-header">
            <div>
              <div class="chart-title">Monthly Completion Rate</div>
              <div class="chart-sub">Average task completion % per month {{ filterYear ? 'in ' + filterYear : '' }}</div>
            </div>
          </div>
          <div class="bar-chart">
            <div class="bar-group" v-for="(item, i) in monthlyChart" :key="i">
              <div class="bar-wrap">
                <div class="bar-tooltip">{{ item.pct }}%</div>
                <div class="bar-fill" :style="`height:${item.pct}%;background:${barColor(item.pct)}`"></div>
              </div>
              <div class="bar-label">{{ item.label }}</div>
            </div>
          </div>
          <div class="chart-legend">
            <span class="cl-dot" style="background:#ef4444"></span><span>0–40%</span>
            <span class="cl-dot" style="background:#f59e0b"></span><span>40–70%</span>
            <span class="cl-dot" style="background:#00c04b"></span><span>70–100%</span>
          </div>
        </div>

        <!-- Records Table + per-inspector breakdown -->
        <div class="analytics-bottom">

          <!-- Inspector performance -->
          <div class="card perf-card">
            <div class="chart-title" style="margin-bottom:16px">Inspector Performance</div>
            <div class="perf-list">
              <div class="perf-row" v-for="insp in inspectorPerf" :key="insp.id">
                <div class="perf-av">{{ insp.name.slice(0,2).toUpperCase() }}</div>
                <div class="perf-info">
                  <div class="perf-name">{{ insp.name }}</div>
                  <div class="perf-bar-wrap">
                    <div class="perf-bar">
                      <div class="perf-fill" :style="`width:${insp.avg}%;background:${barColor(insp.avg)}`"></div>
                    </div>
                    <span class="perf-pct">{{ insp.avg }}%</span>
                  </div>
                </div>
                <div class="perf-count">{{ insp.count }} rec{{ insp.count !== 1 ? 's' : '' }}</div>
              </div>
              <div v-if="!inspectorPerf.length" class="perf-empty">No data for selected filters.</div>
            </div>
          </div>

          <!-- Filtered Records List -->
          <div class="card records-card">
            <div class="chart-title" style="margin-bottom:16px">
              Records
              <span class="rc-count">{{ filteredRecords.length }}</span>
            </div>
            <div v-if="!filteredRecords.length" class="empty-state" style="padding:32px">
              <div class="empty-icon">📋</div>
              <div class="empty-title">No records found</div>
            </div>
            <div class="rec-list" v-else>
              <div class="rec-row" v-for="rec in filteredRecords" :key="rec.id">
                <div class="rr-left">
                  <div class="rr-month">{{ months[rec.month-1] }} {{ rec.year }}</div>
                  <div class="rr-janitor">{{ rec.buildingName }}</div>
                  <div class="rr-detail">{{ rec.janitorName }} · {{ rec.inspectorName }}</div>
                </div>
                <div class="rr-right">
                  <div class="rr-prog">
                    <div class="rr-bar">
                      <div class="rr-fill" :style="`width:${recordProgress(rec)}%;background:${barColor(recordProgress(rec))}`"></div>
                    </div>
                    <span class="rr-pct">{{ recordProgress(rec) }}%</span>
                  </div>
                  <div class="rr-actions">
                    <button class="btn btn-primary" style="padding:6px 14px;font-size:12px" @click="openRecord(rec.id)">
                      <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                      View
                    </button>
                    <button class="btn btn-print-rec" @click="printRecord(rec.id)" title="Print this record">
                      <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-6 0h-4v4h4v-4z"/></svg>
                      Print
                    </button>
                    <button class="btn btn-ghost delete-btn" @click="deleteRec(rec.id)" title="Delete">
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- INSPECTORS -->
      <div v-if="activeTab === 'inspectors'" class="tab-content">
        <div class="card">
          <h3 class="card-title">Registered Inspectors</h3>
          <div v-if="!inspectors.length" class="empty-state">
            <div class="empty-icon">👤</div>
            <div class="empty-title">No inspectors yet</div>
          </div>
          <div class="insp-list" v-else>
            <div class="insp-card" v-for="insp in inspectors" :key="insp.id">
              <div class="ic-top">
                <div class="ic-av">{{ insp.name.slice(0,2).toUpperCase() }}</div>
                <div>
                  <div class="ic-name">{{ insp.name }}</div>
                  <div class="ic-email">{{ insp.email }}</div>
                </div>
                <span class="badge" :class="insp.isOnline ? 'badge-online' : 'badge-offline'" style="margin-left:auto">
                  {{ insp.isOnline ? '● Online' : '○ Offline' }}
                </span>
              </div>
              <div class="ic-meta">
                <span>Joined: {{ formatDate(insp.createdAt) }}</span>
                <span>Last Login: {{ insp.lastLogin ? formatTime(insp.lastLogin) : 'Never' }}</span>
                <span>Records: {{ recordsByInspector(insp.id) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOGS -->
      <div v-if="activeTab === 'logs'" class="tab-content">
        <div class="card">
          <h3 class="card-title">Activity Logs</h3>
          <div class="table-wrap">
            <table style="width:100%;border-collapse:collapse">
              <thead>
                <tr>
                  <th>Inspector</th>
                  <th>Email</th>
                  <th>Login Time</th>
                  <th>Logout Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(log, i) in sortedLogs" :key="i">
                  <td style="font-weight:600">{{ log.userName }}</td>
                  <td>{{ log.email }}</td>
                  <td>{{ formatTime(log.loginTime) }}</td>
                  <td>{{ log.logoutTime ? formatTime(log.logoutTime) : '—' }}</td>
                  <td>{{ log.logoutTime ? duration(log.loginTime, log.logoutTime) : 'Active' }}</td>
                </tr>
                <tr v-if="!sortedLogs.length">
                  <td colspan="5" style="text-align:center;color:#888;padding:32px">No activity logs yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ===== BUILDINGS TAB ===== -->
      <div v-if="activeTab === 'buildings'" class="tab-content">
        <div class="card" style="width:100%;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:12px;flex-wrap:wrap;">
            <div>
              <h3 class="card-title" style="margin-bottom:4px;">Buildings List</h3>
              <p class="card-sub">Manage buildings available in the inspector's dropdown. Changes apply immediately.</p>
            </div>
            <span class="badge badge-green" style="font-size:13px;padding:6px 14px;">{{ buildings.length }} buildings</span>
          </div>

          <!-- Add building form -->
          <div style="display:flex;gap:10px;margin-bottom:20px;">
            <input
              v-model="newBuildingName"
              type="text"
              class="form-control"
              placeholder="Enter building name..."
              @keyup.enter="addBuilding"
              style="flex:1;"
            />
            <button class="btn btn-primary" @click="addBuilding" :disabled="buildingLoading" style="white-space:nowrap;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              Add Building
            </button>
          </div>

          <!-- Search -->
          <input
            v-model="buildingSearch"
            type="text"
            class="form-control"
            placeholder="Search buildings..."
            style="margin-bottom:14px;"
          />

          <!-- Alert -->
          <div v-if="buildingMsg" class="alert" :class="buildingMsg.type === 'success' ? 'alert-success' : 'alert-error'" style="margin-bottom:14px;">
            {{ buildingMsg.text }}
          </div>

          <!-- List -->
          <div v-if="buildingLoading && buildings.length === 0" style="text-align:center;padding:40px;color:var(--gray-500);">
            Loading buildings...
          </div>
          <div v-else-if="filteredBuildings.length === 0" style="text-align:center;padding:40px;color:var(--gray-500);">
            No buildings found.
          </div>
          <div v-else class="buildings-list">
            <div
              v-for="b in filteredBuildings"
              :key="b.id"
              class="building-row"
            >
              <div class="building-code">{{ b.code }}</div>
              <div class="building-name">{{ b.name }}</div>
              <button class="bl-delete-btn" @click="deleteBuilding(b.id, b.name)" title="Delete building">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { usePmcStore } from '@/store/pmc'
import { db } from '@/firebase'
import {
  collection, query, where, onSnapshot
} from 'firebase/firestore'

const router = useRouter()
const auth   = useAuthStore()
const pmc    = usePmcStore()

const activeTab     = ref('analytics')
const searchQ       = ref('')
const filterMonth   = ref('')
const filterYear    = ref('')
const mobileNavOpen = ref(false)

// ── Data loaded from Firestore ─────────────────────────────────────────────
const inspectorsList = ref([])
const activityLogs   = ref([])

function navTo(tab) {
  activeTab.value     = tab
  mobileNavOpen.value = false
}

// ── Load inspectors from Firestore in real-time ────────────────────────────
function loadInspectors() {
  const q = query(collection(db, 'users'), where('role', '==', 'inspector'))
  onSnapshot(q, (snap) => {
    inspectorsList.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
}

// ── Load activity logs from Firestore (built from lastLogin field) ─────────
function loadLogs() {
  const q = query(collection(db, 'users'))
  onSnapshot(q, (snap) => {
    activityLogs.value = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(u => u.lastLogin)
      .map(u => ({
        userName:   u.name,
        email:      u.email,
        loginTime:  u.lastLogin,
        logoutTime: u.logoutTime ?? null,
      }))
  })
}

// ── Load PMC records ───────────────────────────────────────────────────────
async function loadRecords() {
  if (typeof pmc.loadRecords === 'function') {
    await pmc.loadRecords()
  }
}

onMounted(() => {
  loadInspectors()
  loadLogs()
  loadRecords()
  pmc.loadBuildings()
})
// ── Buildings List — stored in pmc store (localStorage) ───────────────────
const newBuildingName = ref('')
const buildingSearch  = ref('')
const buildingMsg     = ref(null)
const buildingLoading = ref(false)   // ← was missing — caused Add Building button to crash
let buildingMsgTimer  = null

const buildings = computed(() => pmc.buildings)

const filteredBuildings = computed(() => {
  const q = buildingSearch.value.toLowerCase()
  if (!q) return pmc.buildings
  return pmc.buildings.filter(b =>
    b.name.toLowerCase().includes(q) || b.code?.toLowerCase().includes(q)
  )
})

function showBuildingMsg(type, text) {
  buildingMsg.value = { type, text }
  clearTimeout(buildingMsgTimer)
  buildingMsgTimer = setTimeout(() => { buildingMsg.value = null }, 3000)
}

async function addBuilding() {
  const name = newBuildingName.value.trim().toUpperCase()
  if (!name) return
  buildingLoading.value = true
  const added = await pmc.addBuilding(name)
  buildingLoading.value = false
  if (!added) {
    showBuildingMsg('error', 'Building already exists.')
    return
  }
  newBuildingName.value = ''
  showBuildingMsg('success', '"' + name + '" added successfully.')
}

async function deleteBuilding(id, name) {
  if (!confirm('Delete "' + name + '" from the buildings list?\nThis will remove it from the inspector dropdown.')) return
  buildingLoading.value = true
  await pmc.deleteBuilding(name)
  buildingLoading.value = false
  showBuildingMsg('success', '"' + name + '" deleted.')
}


// ── Constants ──────────────────────────────────────────────────────────────
const months      = ['January','February','March','April','May','June','July','August','September','October','November','December']
const monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const now         = new Date()

// ── Computed helpers ───────────────────────────────────────────────────────
const today = computed(() =>
  now.toLocaleDateString('en-PH', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
)

const userInitials = computed(() => {
  const name = auth.currentUser?.name || ''
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
})

const tabTitle = computed(() =>
  ({ analytics: 'Analytics', inspectors: 'Inspectors', logs: 'Activity Logs', buildings: 'Buildings List' }[activeTab.value])
)

// ── Inspectors from Firestore ──────────────────────────────────────────────
const inspectors       = computed(() => inspectorsList.value)
const onlineInspectors = computed(() => inspectorsList.value.filter(i => i.isOnline))

// ── Logs from Firestore ────────────────────────────────────────────────────
const sortedLogs = computed(() =>
  [...activityLogs.value].sort((a, b) => new Date(b.loginTime) - new Date(a.loginTime))
)

// ── Records from pmc store ─────────────────────────────────────────────────
const allRecords = computed(() => pmc.records ?? [])

// ── Available years ────────────────────────────────────────────────────────
const availableYears = computed(() => {
  const years = [...new Set(allRecords.value.map(r => r.year))].sort((a, b) => b - a)
  return years
})

// ── Analytics records (year filter only) ──────────────────────────────────
const analyticsRecords = computed(() => {
  let r = allRecords.value
  if (filterYear.value) r = r.filter(x => x.year === Number(filterYear.value))
  return r
})

// ── Filtered records (search + month + year) ───────────────────────────────
const filteredRecords = computed(() => {
  let r = allRecords.value
  if (searchQ.value) {
    const q = searchQ.value.toLowerCase()
    r = r.filter(x =>
      x.janitorName?.toLowerCase().includes(q) ||
      x.inspectorName?.toLowerCase().includes(q) ||
      x.buildingName?.toLowerCase().includes(q)
    )
  }
  if (filterMonth.value) r = r.filter(x => x.month === Number(filterMonth.value))
  if (filterYear.value)  r = r.filter(x => x.year  === Number(filterYear.value))
  return [...r].reverse()
})

// ── Unique buildings ───────────────────────────────────────────────────────
const uniqueBuildings = computed(() =>
  new Set(analyticsRecords.value.map(r => r.buildingName).filter(Boolean)).size
)

// ── Average completion ─────────────────────────────────────────────────────
const avgCompletion = computed(() => {
  const recs = analyticsRecords.value
  if (!recs.length) return 0
  const total = recs.reduce((sum, r) => sum + recordProgress(r), 0)
  return Math.round(total / recs.length)
})

// ── Monthly chart ──────────────────────────────────────────────────────────
const monthlyChart = computed(() => {
  const yr = filterYear.value ? Number(filterYear.value) : now.getFullYear()
  return monthsShort.map((label, i) => {
    const month = i + 1
    const recs  = allRecords.value.filter(r => r.year === yr && r.month === month)
    if (!recs.length) return { label, pct: 0 }
    const avg = Math.round(recs.reduce((s, r) => s + recordProgress(r), 0) / recs.length)
    return { label, pct: avg }
  })
})

// ── Inspector performance ──────────────────────────────────────────────────
const inspectorPerf = computed(() =>
  inspectors.value
    .map(insp => {
      const recs = filteredRecords.value.filter(r => r.inspectorId === insp.id)
      const avg  = recs.length
        ? Math.round(recs.reduce((s, r) => s + recordProgress(r), 0) / recs.length)
        : 0
      return { id: insp.id, name: insp.name, count: recs.length, avg }
    })
    .filter(i => i.count > 0)
    .sort((a, b) => b.avg - a.avg)
)

// ── Helpers ────────────────────────────────────────────────────────────────
function barColor(pct) {
  if (pct >= 70) return 'var(--green-primary, #00c04b)'
  if (pct >= 40) return '#f59e0b'
  return '#ef4444'
}

function recordProgress(rec) {
  if (!rec.days?.length) return 0
  const pastDays = rec.days.filter(d => {
    const date = new Date(rec.year, rec.month - 1, d.day)
    return date <= now
  })
  if (!pastDays.length) return 0
  let filled = 0, total = 0
  pastDays.forEach(d => {
    Object.values(d.am ?? {}).forEach(v => { total++; if (v) filled++ })
    Object.values(d.pm ?? {}).forEach(v => { total++; if (v) filled++ })
  })
  return total ? Math.round((filled / total) * 100) : 0
}

function recordsByInspector(id) {
  return (pmc.records ?? []).filter(r => r.inspectorId === id).length
}

function formatTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

function duration(start, end) {
  const ms = new Date(end) - new Date(start)
  const m  = Math.floor(ms / 60000)
  const h  = Math.floor(m / 60)
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`
}

function openRecord(id) {
  router.push(`/admin/record/${id}`)
}

function deleteRec(id) {
  if (confirm('Delete this record? This cannot be undone.')) {
    pmc.deleteRecord(id)
  }
}

async function doLogout() {
  await auth.logout()
  router.push('/')
}

function printRecord(id) {
  const url = window.location.href.split('#')[0] + '#/admin/record/' + id
  const win = window.open(url, '_blank')
  if (win) {
    win.addEventListener('load', () => setTimeout(() => win.print(), 800))
  }
}
</script>

<style scoped>
/* ============================================================
   SHARED DESIGN SYSTEM — Poppins + #003300 / #f9dc07 / #ff9900
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* { font-family: 'Poppins', sans-serif !important; }

/* Dashboard layout */
.dashboard { display: flex; height: 100dvh; background: #f5f5f0; overflow: hidden; }

/* Prevent body-level horizontal scroll */
:global(html), :global(body) { overflow-x: hidden; max-width: 100%; }

/* ── SIDEBAR ── */
.sidebar {
  width: 240px;
  background: #003300;
  display: flex; flex-direction: column;
  flex-shrink: 0;
  position: relative; height: 100vh;
  overflow: hidden;
  box-shadow: 4px 0 24px rgba(0,0,0,0.18);
}

.sidebar::before {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, #f9dc07, #ff9900, #f9dc07);
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 14px 14px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.sidebar-logo-img {
  width: 94px; height: 94px;
  object-fit: contain; object-position: center;
  display: block; flex-shrink: 0; margin-bottom: 2px;
}
.sidebar-brand { text-align: center; flex: 1; min-width: 0; }
.sb-title {
  color: #ffffff; font-weight: 800; font-size: 15px;
  letter-spacing: 1px; text-transform: uppercase; line-height: 1.1;
}
.sb-sub {
  color: #f9dc07; font-size: 11px; font-weight: 500;
  letter-spacing: 0.5px; text-transform: uppercase; margin-top: 1px;
}

.sidebar-user {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  background: rgba(0,0,0,0.15);
}
.user-avatar {
  width: 38px; height: 38px; flex-shrink: 0;
  background: linear-gradient(135deg, #f9dc07, #ff9900);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: #003300;
}
.user-name { color: #ffffff; font-size: 13px; font-weight: 600; }
.user-role { font-size: 10px; font-weight: 500; color: #f9dc07; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 1px; }

.sidebar-nav { flex: 1; padding: 14px 10px; overflow-y: auto; }
.nav-section-title {
  color: rgba(255,255,255,0.25); font-size: 9px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.5px;
  padding: 0 8px; margin-bottom: 8px; margin-top: 4px;
}
.nav-item {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border: none; border-radius: 8px;
  background: transparent; color: rgba(255,255,255,0.5);
  font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.22s ease; margin-bottom: 3px;
  text-align: left; font-family: 'Poppins', sans-serif !important;
}
.nav-item:hover { background: rgba(255,255,255,0.08); color: #ffffff; transform: translateX(3px); }
.nav-item.active {
  background: linear-gradient(135deg, #f9dc07, #e8cc00);
  color: #003300; font-weight: 700;
  box-shadow: 0 4px 12px rgba(249,220,7,0.3);
}
.nav-item.active svg { stroke: #003300; }
.nav-badge {
  margin-left: auto; background: rgba(249,220,7,0.2); color: #f9dc07;
  font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 99px;
  border: 1px solid rgba(249,220,7,0.3);
}
.nav-item.active .nav-badge { background: rgba(0,51,0,0.2); color: #003300; border-color: rgba(0,51,0,0.3); }

.sidebar-footer { padding: 14px; border-top: 1px solid rgba(255,255,255,0.07); }
.logout-btn {
  width: 100%; display: flex; align-items: center; gap: 8px;
  padding: 10px 12px; border: none; border-radius: 8px;
  background: rgba(255,80,80,0.08); color: rgba(255,120,120,0.8);
  font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
  font-family: 'Poppins', sans-serif !important;
}
.logout-btn:hover { background: rgba(255,80,80,0.18); color: #ff6b6b; }

/* ── MAIN CONTENT ── */
.main-content {
  flex: 1; overflow-y: auto; overflow-x: hidden;
  background: #f5f5f0;
  scrollbar-width: thin; scrollbar-color: #1a5c1a #e8f5e9;
}
.main-content::-webkit-scrollbar { width: 8px; }
.main-content::-webkit-scrollbar-track { background: #e8f5e9; }
.main-content::-webkit-scrollbar-thumb { background: #1a5c1a; border-radius: 4px; }
.main-content::-webkit-scrollbar-thumb:hover { background: #003300; }

/* ── CONTENT HEADER ── */
.content-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 28px 0; margin-bottom: 20px;
}
.content-title { font-size: 22px; font-weight: 700; color: #003300; letter-spacing: -0.3px; }
.content-sub { font-size: 12px; color: #888; margin-top: 2px; }

.tab-content { padding: 0 28px 28px; animation: fadeUp 0.35s ease both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── CARDS ── */
.card {
  background: #ffffff; border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 24px; border: 1px solid rgba(0,0,0,0.05);
}
.card-title { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
.card-sub { font-size: 13px; color: #888; margin-bottom: 22px; }

/* ── PMC HERO BANNER ── */
.pmc-hero {
  width: 100%; padding-top: 21.05%; position: relative;
  overflow: hidden; flex-shrink: 0;
  background: url('@/assets/pmc.png') center center / 100% 100% no-repeat;
}
.pmc-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(105deg, rgba(0,30,0,0.78) 0%, rgba(0,51,0,0.5) 45%);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 0 32px;
}
.pmc-hero-title {
  font-size: clamp(15px, 2vw, 26px); font-weight: 800; color: #ffffff;
  letter-spacing: 3px; text-shadow: 0 2px 16px rgb(0,0,0);
  margin: 0; line-height: 1.2; text-transform: uppercase;
}
.pmc-hero-sub {
  font-size: clamp(9px, 1vw, 13px); color: #f9dc07;
  margin-top: 6px; letter-spacing: 1px; font-weight: 500;
}

/* ── FORMS ── */
.form-control {
  border: 1.5px solid #e0e0e0; border-radius: 8px;
  font-size: 13px; padding: 10px 13px;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: #1a1a1a; background: #fafafa;
  font-family: 'Poppins', sans-serif !important;
}
.form-control:focus {
  border-color: #009900; outline: none;
  box-shadow: 0 0 0 3px rgba(0,153,0,0.1); background: #fff;
}

/* ── BUTTONS ── */
.btn { font-family: 'Poppins', sans-serif !important; font-weight: 600; border-radius: 8px; transition: all 0.2s; }
.btn-primary {
  background: linear-gradient(135deg, #009900, #006600);
  color: #fff; box-shadow: 0 3px 10px rgba(0,153,0,0.3);
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,153,0,0.38); }
.btn-ghost { background: transparent; color: #555; }
.btn-ghost:hover { background: #f0f0ea; color: #003300; }

/* ── BADGES ── */
.badge-online { background: #e6f7e6; color: #009900; }
.badge-offline { background: #ffeaea; color: #cc0000; }

/* ── EMPTY STATE ── */
.empty-state { text-align: center; padding: 60px 20px; }
.empty-icon { font-size: 44px; margin-bottom: 12px; }
.empty-title { font-size: 17px; font-weight: 600; color: #666; }

/* ── TABLE ── */
th {
  background: #003300 !important; color: #ffffff !important;
  font-family: 'Poppins', sans-serif !important;
  font-size: 11px !important; font-weight: 600 !important;
  letter-spacing: 0.5px; padding: 10px 14px !important;
}
td { font-family: 'Poppins', sans-serif !important; font-size: 13px !important; color: #333; }
tr:nth-child(even) td { background: #f9f9f5 !important; }
tr:hover td { background: #f0f5f0 !important; }

.delete-btn { color: #cc2200 !important; padding: 6px !important; }
.delete-btn:hover { background: #fff0ee !important; }

/* ── KPI CARDS ── */
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px; margin-bottom: 20px; }
.kpi-card {
  background: #fff; border-radius: 14px; padding: 18px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  display: flex; align-items: center; gap: 14px;
  border: 1px solid rgba(0,0,0,0.05);
  border-left: 4px solid var(--kpi-accent, #009900);
  transition: all 0.25s ease;
}
.kpi-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.kpi-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-body { flex: 1; }
.kpi-value { font-size: 26px; font-weight: 800; color: #1a1a1a; line-height: 1; }
.kpi-label { font-size: 11px; color: #888; margin-top: 4px; font-weight: 500; }
.kpi-trend { font-size: 10px; color: #aaa; white-space: nowrap; font-weight: 500; }

/* ── FILTERS ── */
.analytics-filters { margin-bottom: 18px; padding: 16px 20px; }
.af-row { display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; }
.af-group { display: flex; flex-direction: column; gap: 5px; }
.af-label { font-size: 10px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.6px; display: flex; align-items: center; gap: 4px; }
.af-input { max-width: 210px; }
.af-clear { padding: 9px 14px; font-size: 12px; }
.af-results-info { margin-top: 10px; font-size: 12px; color: #888; }

/* ── BAR CHART ── */
.chart-card { margin-bottom: 18px; }
.chart-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
.chart-title { font-size: 15px; font-weight: 700; color: #1a1a1a; }
.chart-sub { font-size: 11px; color: #aaa; margin-top: 2px; }
.bar-chart { display: flex; align-items: flex-end; gap: 5px; height: 150px; padding: 0 2px; }
.bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; height: 100%; }
.bar-wrap { flex: 1; width: 100%; display: flex; flex-direction: column; justify-content: flex-end; position: relative; }
.bar-wrap:hover .bar-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }
.bar-tooltip {
  position: absolute; top: -26px; left: 50%; transform: translateX(-50%) translateY(4px);
  background: #1a1a1a; color: white; font-size: 9px; font-weight: 700;
  padding: 3px 6px; border-radius: 4px; white-space: nowrap; pointer-events: none;
  opacity: 0; transition: all 0.15s; z-index: 10;
}
.bar-fill { width: 100%; border-radius: 4px 4px 0 0; min-height: 3px; transition: height 0.5s cubic-bezier(.4,0,.2,1); }
.bar-label { font-size: 9px; color: #aaa; font-weight: 600; }
.chart-legend { display: flex; align-items: center; gap: 14px; margin-top: 10px; font-size: 10px; color: #888; }
.cl-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; margin-right: 3px; }

/* ── ANALYTICS BOTTOM ── */
.analytics-bottom { display: grid; grid-template-columns: 320px 1fr; gap: 18px; }
.perf-card { height: fit-content; }
.perf-list { display: flex; flex-direction: column; gap: 14px; }
.perf-row { display: flex; align-items: center; gap: 10px; }
.perf-av {
  width: 34px; height: 34px; background: linear-gradient(135deg, #f9dc07, #ff9900);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; color: #003300; flex-shrink: 0;
}
.perf-info { flex: 1; }
.perf-name { font-size: 12px; font-weight: 600; color: #1a1a1a; margin-bottom: 5px; }
.perf-bar-wrap { display: flex; align-items: center; gap: 8px; }
.perf-bar { flex: 1; height: 6px; background: #eee; border-radius: 99px; overflow: hidden; }
.perf-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }
.perf-pct { font-size: 11px; font-weight: 700; color: #555; min-width: 30px; }
.perf-count { font-size: 10px; color: #aaa; white-space: nowrap; }
.perf-empty { text-align: center; color: #aaa; font-size: 12px; padding: 20px 0; }

/* ── RECORDS LIST ── */
.records-card { overflow: hidden; }
.rc-count {
  display: inline-block; background: linear-gradient(135deg,#f9dc07,#ff9900);
  color: #003300; font-size: 11px; font-weight: 800;
  padding: 2px 9px; border-radius: 99px; margin-left: 8px; vertical-align: middle;
}
.rec-list { display: flex; flex-direction: column; max-height: 500px; overflow-y: auto; }
.rec-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 0; border-bottom: 1px solid #f0f0ea; transition: background 0.15s;
}
.rec-row:last-child { border-bottom: none; }
.rec-row:hover { background: #fafaf5; }
.rr-month { font-size: 10px; color: #009900; font-weight: 700; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
.rr-janitor { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 2px; }
.rr-detail { font-size: 11px; color: #aaa; }
.rr-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.rr-prog { display: flex; align-items: center; gap: 6px; }
.rr-bar { width: 80px; height: 6px; background: #eee; border-radius: 99px; overflow: hidden; }
.rr-fill { height: 100%; border-radius: 99px; }
.rr-pct { font-size: 11px; color: #888; min-width: 28px; }
.rr-actions { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }
.btn-print-rec {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 12px; font-size: 12px; font-weight: 600;
  background: #fffbeb; color: #92400e;
  border: 1.5px solid #fcd34d; border-radius: 8px;
  cursor: pointer; transition: all 0.2s; white-space: nowrap;
  font-family: 'Poppins', sans-serif !important;
}
.btn-print-rec:hover { background: #fef3c7; border-color: #f59e0b; color: #78350f; }

/* ── INSPECTORS ── */
.insp-list { display: flex; flex-direction: column; gap: 10px; }
.insp-card {
  border: 1.5px solid #eee; border-radius: 12px; padding: 16px;
  transition: all 0.2s; background: #fafafa;
}
.insp-card:hover { border-color: #009900; background: #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.07); }
.ic-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.ic-av {
  width: 42px; height: 42px; background: linear-gradient(135deg, #f9dc07, #ff9900);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800; color: #003300;
}
.ic-name { font-weight: 700; font-size: 15px; color: #1a1a1a; }
.ic-email { font-size: 12px; color: #888; }
.ic-meta { display: flex; gap: 20px; font-size: 12px; color: #888; padding-top: 12px; border-top: 1px solid #f0f0ea; }

/* ── TABLE WRAP ── */
.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

/* ══════════════════════════════════════
   MOBILE TOP BAR & HAMBURGER
   ══════════════════════════════════════ */
.mobile-topbar { display: none; }
.mobile-overlay { display: none; }
.mobile-drawer { display: none; }

/* ══════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════ */
html, body { overflow-x: hidden; max-width: 100%; }
.dashboard { overflow-x: hidden; }
.main-content { overflow-x: hidden; min-width: 0; }

@media (max-width: 1024px) {
  .sidebar { width: 220px; }
  .analytics-bottom { grid-template-columns: 1fr; }
  .tab-content { padding: 0 16px 24px; }
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .sidebar { display: none !important; }
  .dashboard { flex-direction: column; height: 100svh; overflow: auto; }

  .mobile-topbar {
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 200;
    background: #003300; padding: 0 16px; height: 58px;
    flex-shrink: 0; box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  }
  .mobile-topbar::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 3px; background: linear-gradient(90deg, #f9dc07, #ff9900, #f9dc07);
  }
  .mobile-topbar-left { display: flex; align-items: center; gap: 10px; }
  .mobile-logo { width: 36px; height: 36px; object-fit: contain; }
  .mobile-brand .mb-title { font-size: 13px; font-weight: 800; color: #f9dc07; letter-spacing: 0.5px; line-height: 1.1; }
  .mobile-brand .mb-sub { font-size: 10px; color: rgba(255,255,255,0.55); letter-spacing: 0.3px; }

  .hamburger-btn {
    background: transparent; border: none; cursor: pointer;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    gap: 5px; width: 42px; height: 42px; border-radius: 8px;
    transition: background 0.2s; padding: 0; flex-shrink: 0;
  }
  .hamburger-btn:hover { background: rgba(255,255,255,0.08); }
  .ham-line {
    display: block; width: 22px; height: 2.5px;
    background: #f9dc07; border-radius: 2px;
    transition: all 0.3s ease; transform-origin: center;
  }
  .ham-line.open:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
  .ham-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ham-line.open:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

  .mobile-overlay {
    display: block; position: fixed; inset: 0;
    background: rgba(0,0,0,0.45); z-index: 150;
  }
  .mobile-drawer {
    display: flex; flex-direction: column;
    position: fixed; top: 58px; left: 0; right: 0; z-index: 160;
    background: #003300; transform: translateY(-110%);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    border-bottom: 3px solid #f9dc07;
    max-height: calc(100svh - 58px); overflow-y: auto;
  }
  .mobile-drawer.open { transform: translateY(0); }
  .drawer-user { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .drawer-nav { display: flex; flex-direction: column; padding: 10px 12px; gap: 4px; }
  .drawer-item {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 16px; border: none; background: transparent;
    color: rgba(255,255,255,0.75); border-radius: 10px;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; text-align: left; width: 100%;
  }
  .drawer-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .drawer-item.active { background: linear-gradient(135deg, #f9dc07, #ff9900); color: #003300; font-weight: 700; }
  .drawer-badge { margin-left: auto; background: rgba(255,255,255,0.15); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 99px; }
  .drawer-item.active .drawer-badge { background: rgba(0,51,0,0.2); color: #003300; }
  .drawer-footer { padding: 12px 20px 20px; border-top: 1px solid rgba(255,255,255,0.08); }

  .main-content { width: 100%; max-width: 100vw; overflow-x: hidden; overflow-y: auto; flex: 1; }
  .pmc-hero { padding-top: 38%; background-size: cover !important; }
  .pmc-hero-title { font-size: clamp(9px, 3.5vw, 15px); letter-spacing: 1px; }
  .pmc-hero-sub { font-size: clamp(7px, 2.2vw, 10px); margin-top: 3px; }
  .content-header { padding: 14px 12px 0; margin-bottom: 10px; flex-wrap: wrap; gap: 4px; }
  .content-title { font-size: 17px; }
  .content-sub { font-size: 11px; }
  .tab-content { padding: 0 12px 24px; }
  .card { padding: 14px; border-radius: 12px; overflow-wrap: break-word; word-break: break-word; }
  .kpi-grid { grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
  .kpi-card { padding: 12px 10px; gap: 8px; align-items: flex-start; flex-direction: column; }
  .kpi-icon { width: 34px; height: 34px; border-radius: 8px; }
  .kpi-value { font-size: 22px; }
  .kpi-label { font-size: 10px; }
  .kpi-trend { display: none; }
  .analytics-filters { padding: 12px; margin-bottom: 12px; }
  .af-row { flex-direction: column; gap: 10px; }
  .af-group { width: 100%; }
  .af-input { max-width: 100% !important; width: 100%; }
  .chart-card { margin-bottom: 12px; }
  .bar-chart { height: 90px; gap: 2px; }
  .bar-label { font-size: 7px; }
  .chart-title { font-size: 13px; }
  .chart-sub { font-size: 10px; }
  .chart-legend { font-size: 9px; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
  .analytics-bottom { grid-template-columns: 1fr; gap: 12px; }
  .rec-list { max-height: none; }
  .rec-row { flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 0; }
  .rr-right { width: 100%; justify-content: space-between; align-items: center; }
  .rr-prog { flex: 1; }
  .rr-bar { flex: 1; width: auto; min-width: 60px; }
  .rr-month { font-size: 9px; }
  .rr-janitor { font-size: 12px; }
  .rr-detail { font-size: 10px; }
  .insp-card { padding: 12px; }
  .ic-meta { flex-direction: column; gap: 4px; font-size: 11px; }
  .ic-name { font-size: 13px; }
  .ic-email { font-size: 11px; }
  .table-wrap table { min-width: 400px; }
  th { font-size: 9px !important; padding: 7px 10px !important; white-space: nowrap; }
  td { font-size: 11px !important; padding: 7px 10px !important; white-space: nowrap; }
  .btn { font-size: 12px; padding: 8px 14px; }
}

@media (max-width: 420px) {
  .tab-content { padding: 0 10px 20px; }
  .content-header { padding: 12px 10px 0; }
  .kpi-grid { gap: 7px; }
  .kpi-card { padding: 10px 8px; }
  .kpi-value { font-size: 19px; }
  .content-title { font-size: 15px; }
  .card { padding: 12px; }
}

/* ── Buildings List ─────────────────────────────────────────── */
.buildings-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 65vh;
  overflow-y: auto;
}
.building-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--gray-100);
  border-radius: var(--radius-sm);
  border: 1px solid var(--gray-200);
  transition: background 0.15s;
}
.building-row:hover { background: var(--green-pale); border-color: var(--green-primary); }
.building-code {
  font-size: 11px;
  font-weight: 700;
  color: var(--green-forest);
  background: var(--green-pale);
  padding: 2px 8px;
  border-radius: 99px;
  white-space: nowrap;
  min-width: 60px;
  text-align: center;
}
.building-name {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-800);
}
.bl-delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-400);
  padding: 4px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  transition: color 0.15s, background 0.15s;
  flex-shrink: 0;
}
.bl-delete-btn:hover { color: #dc2626; background: #fee2e2; }

</style>