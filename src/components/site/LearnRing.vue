<template>
  <div class="ring">
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="30" fill="none" stroke="#F5F5F7" stroke-width="8" />
      <circle
        cx="36"
        cy="36"
        r="30"
        fill="none"
        stroke="#FF9F0A"
        stroke-width="8"
        stroke-linecap="round"
        stroke-dasharray="188.5"
        :stroke-dashoffset="dashOffset"
        class="ring-arc"
      />
    </svg>
    <div>
      <div class="ring-pct">{{ percent }}%</div>
      <div class="ring-label">{{ label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ percent: number; label: string }>()
const circumference = 188.5
const dashOffset = computed(() => circumference * (1 - props.percent / 100))
</script>

<style scoped>
.ring {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.ring svg {
  transform: rotate(-90deg);
}
.ring-pct {
  font-size: 22px;
  font-weight: 700;
}
.ring-label {
  font-size: 13px;
  color: #6e6e73;
}
</style>
