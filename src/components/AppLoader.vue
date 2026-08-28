<template>
  <div
    v-if="visible"
    id="loader"
    :class="{ 'crt-off': crtOff }"
    aria-hidden="true"
  >
    <div class="box">
      <pre>{{ logoText }}</pre>
      <div class="info">
        <div class="domain">
          <span>{{ domainText }}</span
          ><span class="cursor"></span>
        </div>
        <div class="row" :class="{ show: rowsShown[0] }">
          <span class="key">Role:</span> {{ profile.role }}
        </div>
        <div class="row" :class="{ show: rowsShown[1] }">
          <span class="key">Stack:</span> {{ profile.stackShort.join(" · ") }}
        </div>
        <div class="row" :class="{ show: rowsShown[2] }">
          <span class="key">Learning:</span>
          {{ profile.learningStack.join(" · ") }}
        </div>
        <div class="row" :class="{ show: rowsShown[3] }">
          <span class="key">Status:</span> {{ profile.statusShort }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { profile } from "../data/profile";
import { mtLogoLines } from "../terminal/ascii";
import { useReducedMotion } from "../composables/useReducedMotion";

const emit = defineEmits<{ (e: "done"): void }>();

const reducedMotion = useReducedMotion();
const visible = ref(true);
const crtOff = ref(false);
const domainText = ref("");
const rowsShown = ref([false, false, false, false]);
const logoText = mtLogoLines.join("\n");

onMounted(() => {
  if (reducedMotion) {
    visible.value = false;
    emit("done");
    return;
  }

  const domain = profile.domain;
  let i = 0;
  const typeDomain = () => {
    domainText.value = domain.slice(0, ++i);
    if (i < domain.length) {
      setTimeout(typeDomain, 70);
      return;
    }
    rowsShown.value.forEach((_, idx) => {
      setTimeout(
        () => {
          rowsShown.value[idx] = true;
        },
        180 + idx * 160,
      );
    });
    setTimeout(
      () => {
        crtOff.value = true;
        setTimeout(() => {
          visible.value = false;
          emit("done");
        }, 460);
      },
      180 + rowsShown.value.length * 160 + 650,
    );
  };
  typeDomain();
});
</script>

<style scoped>
#loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--term-bg);
  color: var(--term-text);
  font-family: "JetBrains Mono", monospace;
  display: flex;
  align-items: center;
  justify-content: center;
}
#loader::after {
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
.box {
  display: flex;
  gap: 28px;
  align-items: center;
  padding: 24px;
}
pre {
  font-size: 13px;
  line-height: 1.35;
  color: var(--term-green);
  text-shadow: 0 0 8px rgba(74, 222, 128, 0.25);
  margin: 0;
}
.info {
  font-size: 14px;
  line-height: 1.9;
}
.info .row {
  opacity: 0;
}
.info .row.show {
  opacity: 1;
}
.info .key {
  color: var(--term-dim);
}
.domain {
  font-size: 18px;
  color: var(--term-green);
  margin-bottom: 6px;
  border-bottom: 1px solid #2a332f;
  padding-bottom: 6px;
}
.domain .cursor {
  display: inline-block;
  width: 8px;
  height: 1em;
  background: var(--term-green);
  vertical-align: -0.15em;
  animation: blink 1s step-end infinite;
}
@media (max-width: 560px) {
  .box {
    flex-direction: column;
    gap: 16px;
  }
  pre {
    font-size: 10px;
  }
}
</style>
