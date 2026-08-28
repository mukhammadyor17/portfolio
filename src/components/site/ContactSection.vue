<template>
  <section id="contact" class="reveal" :ref="observe">
    <div class="bento">
      <BentoCard
        :span="6"
        class="b-contact"
        :style="{ textAlign: 'center', padding: '48px 32px' }"
      >
        <h2 class="sec-title contact-title">Давайте работать вместе.</h2>
        <a class="mail" :href="`mailto:${profile.email}`">{{
          profile.email
        }}</a>
        <div class="links">
          <a :href="profile.githubUrl" target="_blank" rel="noopener">
            GitHub
          </a>
          <a :href="profile.telegramUrl" target="_blank" rel="noopener">
            Telegram
          </a>
          <a :href="profile.resumeHref" download>Резюме</a>
        </div>
      </BentoCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from "../../composables/useReveal";
import { profile } from "../../data/profile";
import BentoCard from "./BentoCard.vue";

const { observe } = useReveal();
</script>

<style scoped>
.b-contact :deep(.contact-title) {
  margin-bottom: 4px;
}
.b-contact :deep(.mail) {
  display: inline-block;
  margin-top: 14px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--green);
  text-decoration: none;
}
.b-contact :deep(.mail:hover) {
  text-decoration: underline;
}
.b-contact :deep(.links) {
  margin-top: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.b-contact :deep(.links a) {
  font-size: 14px;
  color: #1d1d1f;
  text-decoration: none;
  background: #f5f5f7;
  border-radius: 999px;
  padding: 8px 16px;
  transition: background 0.2s;
}
.b-contact :deep(.links a:hover) {
  background: #e8e8ed;
}
</style>
