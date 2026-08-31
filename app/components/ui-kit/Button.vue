<template>
  <component
    :is="component"
    v-bind="attrs"
    :class="[
      $style.button,
      $style[variant],
      { [$style.large]: large, [$style.fullwidth]: fullwidth },
    ]"
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
  variant: { type: String, default: "primary" },
  large: { type: Boolean, default: false },
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
  /* height is py * 2 + Label line-height (16px): 40 here, 52 when large, 36 in the header */
  padding: 12px 20px;
  white-space: nowrap;
  transition:
    background-color 160ms ease,
    box-shadow 160ms ease;

  span {
    transition: color 160ms ease;
  }
}

.primary {
  background-color: var(--FQ-primary);

  span {
    color: var(--FQ-on-dark);
  }

  &:hover,
  &:focus-visible {
    background-color: var(--FQ-white);
    box-shadow: inset 0 0 0 1px var(--FQ-primary);

    span {
      color: var(--FQ-primary);
    }
  }
}

.secondary {
  background-color: var(--FQ-grey-95);
  /* inset, like a Figma stroke — a real border would widen the button by 2px */
  box-shadow: inset 0 0 0 1px var(--FQ-grey-91);

  span {
    color: var(--FQ-primary);
  }

  &:hover,
  &:focus-visible {
    box-shadow: inset 0 0 0 1px var(--FQ-primary);
  }
}

.large {
  padding: 18px 28px;
}

.fullwidth {
  width: 100%;
}
</style>
