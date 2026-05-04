<template>
  <router-view v-if="authReady" />
  <div v-else class="app-loading">
    <div class="app-spinner"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'

const authReady = ref(false)
const auth = useAuthStore()

onMounted(async () => {
  await auth.init()
  authReady.value = true
})
</script>

<style>
.app-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f0;
}
.app-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #009900;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>