<template>
  <div
    id="terminal"
    ref="terminalEl"
    role="region"
    aria-label="Режим терминала"
    :class="{ shake: shakeActive }"
    @click="onTerminalClick"
  >
    <div class="term-head">
      <span class="tl" style="background: #e24b4a"></span>
      <span class="tl" style="background: #fbbf24"></span>
      <span class="tl" style="background: #4ade80"></span>
      <span class="exit-hint">
        <b id="exit-click" @click="emit('exit')">exit</b> → обычный режим
      </span>
    </div>
    <div id="term-body" ref="bodyEl">
      <TermOutput :lines="output" />
    </div>
    <div class="term-chips">
      <button
        v-for="c in chipCommands"
        :key="c"
        type="button"
        @click="runChipCommand(c)"
      >
        {{ c }}
      </button>
    </div>
    <div class="prompt-row">
      <span class="ps1">turskhanov@portfolio<span class="path">:~$</span></span>
      <input
        id="term-input"
        ref="inputEl"
        v-model="inputValue"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        aria-label="Ввод команды"
        @keydown="handleKeydown"
      />
    </div>
    <MatrixCanvas
      v-if="matrixActive"
      @finish="finishMatrix"
      @done="matrixActive = false"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useTerminal } from "../../composables/useTerminal";
import TermOutput from "./TermOutput.vue";
import MatrixCanvas from "./MatrixCanvas.vue";

const props = defineProps<{ active: boolean }>();
const emit = defineEmits<{ (e: "exit"): void }>();

const terminalEl = ref<HTMLElement | null>(null);
const bodyEl = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);

const chipCommands = ["help", "about", "projects", "skills", "contact", "exit"];

const {
  boot,
  output,
  runChip,
  inputValue,
  matrixActive,
  shakeActive,
  handleKeydown,
  finishMatrix,
} = useTerminal({ onExit: () => emit("exit") });

watch(
  () => props.active,
  (active) => {
    if (!active) return;
    boot();
    nextTick(() => inputEl.value?.focus());
  },
  { immediate: true },
);

watch(
  () => output.value.length,
  () => {
    nextTick(() => {
      if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight;
    });
  },
);

function onTerminalClick(e: MouseEvent) {
  if (e.target === terminalEl.value || e.target === bodyEl.value) {
    inputEl.value?.focus();
  }
}

function runChipCommand(c: string) {
  runChip(c);
  inputEl.value?.focus();
}
</script>

<style scoped>
#terminal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background: var(--term-bg);
  font-family: "JetBrains Mono", monospace;
  font-size: 14px;
  color: var(--term-text);
}
#terminal::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.025) 0 1px,
    transparent 1px 3px
  );
}
.term-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #232a27;
  flex-shrink: 0;
}
.term-head .tl {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.term-head .exit-hint {
  margin-left: auto;
  color: var(--term-dim);
  font-size: 12px;
}
.term-head .exit-hint b {
  color: var(--term-text);
  font-weight: 500;
  cursor: pointer;
}
#term-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 20px 8px;
  line-height: 1.7;
  text-shadow: 0 0 6px rgba(74, 222, 128, 0.12);
}
#term-body :deep(.out) {
  white-space: pre-wrap;
  word-break: break-word;
}
#term-body :deep(.green) {
  color: var(--term-green);
}
#term-body :deep(.amber) {
  color: var(--term-amber);
}
#term-body :deep(.dim) {
  color: var(--term-dim);
}
#term-body :deep(a) {
  color: var(--term-green);
}
.prompt-row {
  display: flex;
  gap: 0;
  padding: 0 20px 16px;
  flex-shrink: 0;
  align-items: baseline;
}
.prompt-row .ps1 {
  color: var(--term-green);
  white-space: nowrap;
}
.prompt-row .ps1 .path {
  color: var(--term-dim);
}
#term-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font: inherit;
  color: var(--term-text);
  caret-color: var(--term-green);
  margin-left: 8px;
}
.term-chips {
  display: none;
  gap: 8px;
  padding: 0 16px 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
}
.term-chips button {
  font: inherit;
  font-size: 12px;
  background: #1b211f;
  color: var(--term-green);
  border: 1px solid #2a332f;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
}
@media (max-width: 640px) {
  .term-chips {
    display: flex;
  }
}
</style>
