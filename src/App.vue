<template>
  <AppLoader />
  <div id="site" v-show="mode === 'site'" :class="siteCrtClass">
    <SiteHeader @open-terminal="openTerminal" />
    <main class="wrap">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection @open-terminal="openTerminal" />
      <ContactSection />
    </main>
    <footer>
      © 2026 Mukhammadyor Turskhanov · Vue 3 · TypeScript · один вечер и немного
      любви
    </footer>
  </div>
  <TheTerminal
    v-if="terminalEverOpened"
    v-show="mode === 'terminal'"
    :active="mode === 'terminal'"
    :class="termCrtClass"
    @exit="closeTerminal"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppLoader from "./components/AppLoader.vue";
import SiteHeader from "./components/site/SiteHeader.vue";
import HeroSection from "./components/site/HeroSection.vue";
import ProjectsSection from "./components/site/ProjectsSection.vue";
import SkillsSection from "./components/site/SkillsSection.vue";
import ContactSection from "./components/site/ContactSection.vue";
import TheTerminal from "./components/terminal/TheTerminal.vue";
import { useReducedMotion } from "./composables/useReducedMotion";

const reducedMotion = useReducedMotion();

type Mode = "site" | "terminal";
const mode = ref<Mode>("site");
const terminalEverOpened = ref(false);
const siteCrtClass = ref("");
const termCrtClass = ref("");

const CRT_OUT_MS = 430;
const CRT_IN_MS = 500;

function openTerminal() {
  terminalEverOpened.value = true;
  const activate = () => {
    mode.value = "terminal";
    siteCrtClass.value = "";
    if (!reducedMotion) {
      termCrtClass.value = "crt-on";
      setTimeout(() => {
        termCrtClass.value = "";
      }, CRT_IN_MS);
    }
  };
  if (reducedMotion) {
    activate();
    return;
  }
  siteCrtClass.value = "crt-off";
  setTimeout(activate, CRT_OUT_MS);
}

function closeTerminal() {
  const activate = () => {
    mode.value = "site";
    termCrtClass.value = "";
    if (!reducedMotion) {
      siteCrtClass.value = "crt-on";
      setTimeout(() => {
        siteCrtClass.value = "";
      }, CRT_IN_MS);
    }
  };
  if (reducedMotion) {
    activate();
    return;
  }
  termCrtClass.value = "crt-off";
  setTimeout(activate, CRT_OUT_MS);
}
</script>

<style scoped>
footer {
  padding: 48px 0 40px;
  color: #86868b;
  font-size: 13px;
  text-align: center;
}
</style>
