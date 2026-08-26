<template>
  <section :class="$style.scroller" :style="{ '--steps': CAPABILITIES.length }">
    <div :class="$style.pin">
      <UiKitTypography :type="MAP.H2" as="h2" :class="$style.title">
        Core capabilities
      </UiKitTypography>

      <div :class="$style.card">
        <ul :class="$style.rail">
          <li
            v-for="(item, index) in CAPABILITIES"
            :key="item.title"
            :class="[$style.railItem, { [$style.active]: index === activeIndex }]"
          >
            <button
              type="button"
              :class="$style.railButton"
              :aria-current="index === activeIndex ? 'true' : undefined"
              @click="goTo(index)"
            >
              <span :class="$style.marker" aria-hidden="true" />
              <UiKitTypography
                :type="index === activeIndex ? MAP.H3 : MAP.H4"
                :class="$style.railLabel"
              >
                {{ item.title }}
              </UiKitTypography>
            </button>
          </li>
        </ul>

        <div :class="$style.panel">
          <div :class="$style.top">
            <div :class="$style.iconSlot">
              <img
                :src="activeItem.illustration.src"
                :width="activeItem.illustration.width"
                :height="activeItem.illustration.height"
                alt=""
              />
            </div>

            <UiKitTypography :type="MAP.P2" as="p" :class="$style.description">
              {{ activeItem.description }}
            </UiKitTypography>
          </div>

          <div :class="$style.bottom">
            <hr :class="$style.rule" />

            <ul :class="$style.list">
              <li v-for="bullet in activeItem.bullets" :key="bullet" :class="$style.bullet">
                <span :class="$style.bulletMarker" aria-hidden="true" />
                <UiKitTypography :type="MAP.P2">{{ bullet }}</UiKitTypography>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div :class="$style.spacer" />

    <span
      v-for="(item, index) in CAPABILITIES"
      :id="stepId(index)"
      :key="item.title"
      :class="$style.step"
      :style="{ '--index': index }"
      aria-hidden="true"
    />
  </section>
</template>

<script setup>
import { MAP } from "@/constants/typography";
import CAPABILITIES from "./CoreCapabilities.data";

const PIN_TOP = 99;

const stepId = (index) => `capability-${index}`;
const stepIds = computed(() => CAPABILITIES.map((_, index) => stepId(index)));

const { activeId } = useScrollSpy(stepIds, { offset: PIN_TOP });

const activeIndex = computed(() => {
  const index = stepIds.value.indexOf(activeId.value);
  return index === -1 ? 0 : index;
});

const activeItem = computed(() => CAPABILITIES[activeIndex.value]);

// The step markers already sit at the exact scroll offsets the spy reads, so
// jumping to one is just aligning it with the pin line.
const goTo = (index) => {
  const el = document.getElementById(stepId(index));
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - PIN_TOP + 1;

  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
};
</script>

<style module lang="scss">
.scroller {
  // Scroll distance between two capabilities. The spacer only covers the gaps
  // *between* steps, so the pin releases the moment the last one turns active —
  // no trailing scroll where nothing moves and the next section stays hidden.
  --step: 50vh;
  --pin-top: 99px;

  position: relative;
  margin-top: var(--FQ-gap-section);
}

.pin {
  position: sticky;
  top: var(--pin-top);
}

.spacer {
  height: calc((var(--steps) - 1) * var(--step));
}

.step {
  position: absolute;
  top: calc(var(--index) * var(--step));
  left: 0;
  width: 1px;
  height: 1px;
}

.title {
  margin-bottom: 40px;
}

.card {
  --measure: 663px;
  --card-h: 491px;

  display: grid;
  grid-template-columns: 358px 1fr;
  align-items: stretch;
  width: 100%;
  height: var(--card-h);
  background-color: var(--FQ-surface);
  border: 1px solid var(--FQ-border-strong);
}

.rail {
  width: 100%;
}

.railItem {
  width: 100%;
  transition: background-color 160ms ease;

  &:not(:last-child) {
    border-bottom: 1px solid var(--FQ-border-strong);
  }
}

.railButton {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 28px 32px;
  text-align: left;
  cursor: pointer;
  background: none;
  border: 0;
}

.marker {
  flex: none;
  width: 9px;
  height: 9px;
  background-color: var(--FQ-ink);
  transition: background-color 160ms ease;
}

.railLabel {
  color: var(--FQ-ink-soft);
  transition: color 160ms ease;
}

.active {
  background-color: var(--FQ-surface-active);

  .marker {
    background-color: var(--FQ-accent);
  }

  .railLabel {
    color: var(--FQ-ink);
  }
}

.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  min-width: 0;
  min-height: 0;
  padding: 32px 0 32px 48px;
  border-left: 1px solid var(--FQ-border-strong);
}

.top {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.iconSlot {
  display: flex;
  align-items: flex-end;
  height: 103px;
}

.description {
  max-width: var(--measure);
}

.bottom {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.rule {
  width: var(--measure);
  max-width: 100%;
  height: 0;
  margin: 0;
  border: 0;
  border-top: 1px solid var(--FQ-border-strong);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.bullet {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.bulletMarker {
  flex: none;
  width: 6px;
  height: 6px;
  margin-top: 11px;
  background-color: var(--FQ-marker);
}
</style>
