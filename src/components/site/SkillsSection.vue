<template>
  <section id="skills" class="reveal" :ref="observe">
    <h2 class="sec-title">Навыки. <span>Честные цифры.</span></h2>
    <div class="bento">
      <BentoCard :span="4">
        <div class="skills-list">
          <SkillBar
            v-for="s in skills"
            :key="s.name"
            :name="s.name"
            :percent="s.percent"
            :learning="s.learning"
          />
        </div>
      </BentoCard>

      <TermCard @open-terminal="emit('open-terminal')" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from "../../composables/useReveal";
import { skills } from "../../data/skills";
import BentoCard from "./BentoCard.vue";
import SkillBar from "./SkillBar.vue";
import TermCard from "./TermCard.vue";

const emit = defineEmits<{ (e: "open-terminal"): void }>();
const { observe } = useReveal();
</script>

<style scoped>
.skills-list {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}
</style>
