<template>
  <component
    :is="to ? 'a' : 'button'"
    :href="to"
    :type="to ? undefined : type"
    :class="[$style.button, $style[variant], { [$style.large]: large }]"
  >
    <UiKitTypography :type="large ? MAP.BUTTON_L : MAP.BUTTON_M">
      <slot />
    </UiKitTypography>
  </component>
</template>

<script setup>
import { MAP } from "@/constants/typography";

defineProps({
  to: { type: String, default: undefined },
  variant: { type: String, default: "primary" },
  large: { type: Boolean, default: false },
  type: { type: String, default: "button" },
});
</script>

<style module lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  min-height: 40px;
  white-space: nowrap;
  transition:
    background-color 160ms ease,
    box-shadow 160ms ease;

  span {
    transition: color 160ms ease;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

.primary {
  background-color: var(--FQ-primary);

  span {
    color: var(--FQ-on-dark);
  }

  &:hover,
  &:focus-visible {
    background-color: var(--FQ-grey-95);

    span {
      color: var(--FQ-primary);
    }
  }
}

.secondary {
  background-color: var(--FQ-grey-95);

  span {
    color: var(--FQ-primary);
  }

  &:hover,
  &:focus-visible {
    background-color: var(--FQ-accent-1);

    span {
      color: var(--FQ-white);
    }
  }
}

.large {
  padding-inline: 24px;
  min-height: 52px;

  @include below760 {
    padding-inline: 20px;
    min-height: 40px;
  }

  &:hover,
  &:focus-visible {
    background-color: var(--FQ-grey-95);
    box-shadow: inset 0 0 0 1px var(--FQ-primary);

    span {
      color: var(--FQ-primary);
    }
  }
}
</style>
