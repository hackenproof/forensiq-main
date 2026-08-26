import { useEventListener } from "@vueuse/core";

export const useScrollSpy = (ids, { offset = 80 } = {}) => {
  const activeId = ref("");

  let ticking = false;

  const update = () => {
    ticking = false;

    const line = toValue(offset);

    let current = "";
    for (const id of toValue(ids)) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= line) current = id;
      else break;
    }

    activeId.value = current;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  useEventListener("scroll", onScroll, { passive: true });
  useEventListener("resize", onScroll, { passive: true });

  onMounted(() => {
    update();
    requestAnimationFrame(update);
  });

  return { activeId };
};
