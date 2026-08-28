<template>
  <article
    class="b-card reveal"
    :ref="observe"
    :class="[`b-${span}`, { dark }]"
  >
    <slot />
  </article>
</template>

<script setup lang="ts">
import { useReveal } from "../../composables/useReveal";

withDefaults(defineProps<{ span?: 2 | 3 | 4 | 6; dark?: boolean }>(), {
  span: 4,
  dark: false,
});

const { observe } = useReveal();
</script>

<style scoped>
.b-card {
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.b-card:hover {
  transform: scale(1.015);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
}
.b-card.dark {
  background: #1d1d1f;
  color: #f5f5f7;
}
.b-6 {
  grid-column: span 6;
}
.b-4 {
  grid-column: span 4;
}
.b-3 {
  grid-column: span 3;
}
.b-2 {
  grid-column: span 2;
}
@media (max-width: 760px) {
  .b-4,
  .b-3,
  .b-2 {
    grid-column: span 6;
  }
}
.b-card :deep(.kicker) {
  font-size: 13px;
  font-weight: 500;
  color: var(--green);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}
.b-card :deep(h3) {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.b-card.dark :deep(h3) {
  color: #fff;
}
.b-card :deep(p:not(.mono)) {
  font-size: 15px;
  color: #6e6e73;
  margin-top: 10px;
  line-height: 1.55;
}
.b-card.dark :deep(p:not(.mono)) {
  color: rgba(255, 255, 255, 0.55);
}
.b-card :deep(.tags) {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.b-card :deep(.tag) {
  font-size: 13px;
  background: #f5f5f7;
  color: #1d1d1f;
  border-radius: 999px;
  padding: 6px 14px;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}
.b-card.on :deep(.tag) {
  opacity: 1;
  transform: none;
}
.b-card.on :deep(.tag:nth-child(1)) {
  transition-delay: 0.05s;
}
.b-card.on :deep(.tag:nth-child(2)) {
  transition-delay: 0.1s;
}
.b-card.on :deep(.tag:nth-child(3)) {
  transition-delay: 0.15s;
}
.b-card.on :deep(.tag:nth-child(4)) {
  transition-delay: 0.2s;
}
</style>
