<template>
  <section class="hero">
    <h1>
      <span>{{ typed }}</span
      ><span class="cursor" aria-hidden="true"></span>
    </h1>
    <p class="sub">
      5+ лет опыта во фронтенде. Vue, TypeScript, Angular, React — и путь в
      фулстэк.
    </p>
    <div class="cta-row">
      <a class="btn btn-primary" href="#projects">Смотреть проекты</a>
      <a class="btn btn-ghost" :href="profile.resumeHref" download>
        Скачать резюме
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTypewriter } from "../../composables/useTypewriter";
import { profile } from "../../data/profile";

const typed = useTypewriter(profile.typewriterPhrases);
</script>

<style scoped>
.hero {
  padding: 120px 0 88px;
  text-align: center;
}
.hero h1 {
  font-weight: 700;
  letter-spacing: -0.035em;
  font-size: clamp(44px, 8.5vw, 84px);
  line-height: 1.06;
  min-height: 2.2em;
}
.hero h1 .cursor {
  display: inline-block;
  width: 4px;
  height: 0.85em;
  background: var(--green);
  margin-left: 6px;
  vertical-align: -0.06em;
  border-radius: 2px;
  animation: blink 1s step-end infinite;
}
.hero p.sub {
  margin: 24px auto 0;
  font-size: 21px;
  color: #6e6e73;
  max-width: 560px;
  letter-spacing: -0.01em;
}
.hero .cta-row {
  margin-top: 36px;
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn {
  font-size: 16px;
  text-decoration: none;
  border-radius: 999px;
  padding: 13px 28px;
  transition:
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.2s;
  display: inline-block;
  letter-spacing: -0.01em;
}
.btn:hover {
  transform: scale(1.04);
}
.btn-primary {
  background: var(--green);
  color: #fff;
}
.btn-primary:hover {
  box-shadow: 0 8px 24px rgba(15, 118, 110, 0.3);
}
.btn-ghost {
  background: #fff;
  color: #1d1d1f;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
@media (max-width: 760px) {
  .hero {
    padding: 80px 0 56px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero h1 .cursor {
    animation: none;
  }
}
</style>
