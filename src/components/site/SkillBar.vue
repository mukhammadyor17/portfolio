<template>
  <div class="skill">
    <div class="skill-name">
      <span>{{ name }}</span>
      <span class="pct">{{ percent }}%</span>
    </div>
    <div class="bar">
      <i :class="{ learning }" :data-w="percent"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string; percent: number; learning?: boolean }>()
</script>

<style scoped>
.skill-name {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 7px;
  letter-spacing: -0.01em;
}
.skill-name .pct {
  color: #6e6e73;
  font-size: 14px;
}
.bar {
  height: 6px;
  background: #f5f5f7;
  border-radius: 3px;
  overflow: hidden;
}
.bar i {
  display: block;
  height: 100%;
  width: 0;
  background: var(--green);
  border-radius: 3px;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.bar i.learning {
  background: #ff9f0a;
}
</style>
