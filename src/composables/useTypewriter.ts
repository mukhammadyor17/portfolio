import { onUnmounted, ref } from "vue";
import { useReducedMotion } from "./useReducedMotion";

export function useTypewriter(phrases: readonly string[]) {
  const text = ref("");
  const reducedMotion = useReducedMotion();
  let timer: ReturnType<typeof setTimeout> | undefined;

  function loop(phraseIndex: number, charIndex: number, deleting: boolean) {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      text.value = current.slice(0, charIndex);
      if (charIndex === current.length) {
        timer = setTimeout(() => loop(phraseIndex, charIndex, true), 1800);
        return;
      }
      timer = setTimeout(
        () => loop(phraseIndex, charIndex, false),
        55 + Math.random() * 60,
      );
      return;
    }

    charIndex--;
    text.value = current.slice(0, charIndex);
    if (charIndex === 0) {
      const next = (phraseIndex + 1) % phrases.length;
      timer = setTimeout(() => loop(next, 0, false), 350);
      return;
    }
    timer = setTimeout(() => loop(phraseIndex, charIndex, true), 28);
  }

  function start() {
    if (phrases.length === 0) return;
    if (reducedMotion) {
      text.value = phrases[0];
      return;
    }
    loop(0, 0, false);
  }

  onUnmounted(() => {
    if (timer) clearTimeout(timer);
  });

  start();

  return text;
}
