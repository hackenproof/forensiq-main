<template>
  <component
    :is="component"
    v-bind="attrs"
    :class="[$style.button, { [$style.fullwidth]: fullwidth }]"
  >
    <UiKitTypography :type="MAP.LABEL">
      <slot />
    </UiKitTypography>
  </component>
</template>

<script setup>
import { MAP } from "@/constants/typography";

const props = defineProps({
  to: { type: String, default: undefined },
  fullwidth: { type: Boolean, default: false },
  type: { type: String, default: "button" },
});

const component = computed(() => (props.to ? "a" : "button"));

const attrs = computed(() => (props.to ? { href: props.to } : { type: props.type }));
</script>

<style module lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding-inline: 20px;
  background-color: var(--FQ-ink);
  border: 1px solid transparent;
  white-space: nowrap;
  transition:
    background-color 160ms ease,
    border-color 160ms ease;

  span {
    color: var(--FQ-on-dark);
    transition: color 160ms ease;
  }

  &:hover,
  &:focus-visible {
    background-color: var(--FQ-surface-active);
    border-color: var(--FQ-ink);

    span {
      color: var(--FQ-ink);
    }
  }
}

.fullwidth {
  width: 100%;
}
</style>
