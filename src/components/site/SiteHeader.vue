<template>
  <header>
    <nav class="nav">
      <div class="logo">turskhanov<span>.dev</span></div>
      <div class="nav-links">
        <a href="#projects" class="nav-sec">Проекты</a>
        <a href="#skills" class="nav-sec">Навыки</a>
        <a href="#contact" class="nav-sec">Контакты</a>
        <button
          class="term-btn"
          aria-label="Открыть режим терминала"
          @click="emit('open-terminal')"
        >
          <span class="dot"></span>terminal
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: "open-terminal"): void }>();
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(245, 245, 247, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  max-width: 1020px;
  margin: 0 auto;
}
.logo {
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.02em;
}
.logo span {
  color: #6e6e73;
  font-weight: 400;
}
.nav-links {
  display: flex;
  gap: 28px;
  align-items: center;
}
.nav-links a {
  color: #1d1d1f;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.75;
  transition: opacity 0.2s;
}
.nav-links a:hover,
.nav-links a:focus-visible {
  opacity: 1;
}
.term-btn {
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  background: #1d1d1f;
  color: var(--term-green);
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition:
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.2s;
}
.term-btn:hover {
  transform: scale(1.04);
  background: #000;
}
.term-btn .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--term-green);
  animation: pulse 2s infinite;
}
@media (max-width: 640px) {
  .nav-links a.nav-sec {
    display: none;
  }
}
</style>
