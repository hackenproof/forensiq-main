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
  height: 40px;
  padding-inline: 20px;
  border: 1px solid transparent;
  white-space: nowrap;
  transition:
    background-color 160ms ease,
    border-color 160ms ease;

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
    border-color: var(--FQ-primary);

    span {
      color: var(--FQ-primary);
    }
  }
}

.secondary {
  background-color: var(--FQ-grey-95);
  border-color: var(--FQ-grey-91);

  span {
    color: var(--FQ-primary);
  }

  &:hover,
  &:focus-visible {
    border-color: var(--FQ-primary);
  }
}

.large {
  height: 52px;
  padding-inline: 28px;
}

.fullwidth {
  width: 100%;
}
</style>
