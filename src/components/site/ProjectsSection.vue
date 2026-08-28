<template>
  <section id="projects" class="reveal" :ref="observe">
    <h2 class="sec-title">Проекты. <span>Сделаны руками.</span></h2>
    <div class="bento">
      <BentoCard :span="2" class="b-status">
        <div>
          <p class="kicker">Статус</p>
          <p class="big">
            <span class="pulse-dot"></span>{{ profile.statusHeadline }}
          </p>
        </div>
        <p>{{ profile.statusNote }}</p>
      </BentoCard>
      <BentoCard v-for="p in projects" :key="p.slug" :span="4">
        <p class="kicker">{{ p.kicker }}</p>
        <h3>{{ p.title }}</h3>
        <p>{{ p.siteDescription }}</p>
        <div class="tags">
          <span v-for="tag in p.stack" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </BentoCard>

      <BentoCard :span="2" class="b-learn">
        <p class="kicker">Сейчас изучаю</p>
        <h3>{{ learningSkill.name }}</h3>
        <LearnRing
          :percent="learningSkill.percent"
          :label="profile.ringLabel"
        />
      </BentoCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from "../../composables/useReveal";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { learningSkill } from "../../data/skills";
import BentoCard from "./BentoCard.vue";
import LearnRing from "./LearnRing.vue";

const { observe } = useReveal();
</script>

<style scoped>
.b-status {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.b-status :deep(.big) {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.15;
}
.b-status :deep(.pulse-dot) {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #30d158;
  margin-right: 10px;
  animation: pulse 2s infinite;
}
</style>
