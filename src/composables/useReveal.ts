import { onUnmounted, type ComponentPublicInstance } from "vue";

export function useReveal() {
  let observer: IntersectionObserver | undefined;

  function ensureObserver(): IntersectionObserver {
    if (observer) return observer;
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("on");
          el.querySelectorAll<HTMLElement>(".bar i[data-w]").forEach((bar) => {
            bar.style.width = `${bar.dataset.w}%`;
          });
          observer?.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    return observer;
  }

  function observe(el: Element | ComponentPublicInstance | null) {
    if (!el || !(el instanceof Element)) return;
    ensureObserver().observe(el);
  }

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { observe };
}
