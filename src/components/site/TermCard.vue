<template>
  <BentoCard
    :span="2"
    dark
    class="b-term"
    role="button"
    tabindex="0"
    aria-label="Открыть режим терминала"
    @click="emit('open-terminal')"
    @keydown="onKeydown"
  >
    <p class="kicker" style="color: var(--term-green)">Для своих</p>
    <h3>Terminal mode</h3>
    <p>Этот сайт умеет больше, чем кажется. Внутри — команды, темы и пасхалки.</p>
    <p class="mono">$ press here<span class="blink"></span></p>
  </BentoCard>
</template>

<script setup lang="ts">
import BentoCard from './BentoCard.vue'

const emit = defineEmits<{ (e: 'open-terminal'): void }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('open-terminal')
  }
}
</script>

<style scoped>
.b-term {
  cursor: pointer;
}
.mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--term-green);
  margin-top: 20px;
}
.mono .blink {
  display: inline-block;
  width: 7px;
  height: 1em;
  background: var(--term-green);
  vertical-align: -0.15em;
  animation: blink 1s step-end infinite;
}
</style>
