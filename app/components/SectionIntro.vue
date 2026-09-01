<template>
  <div :class="$style.intro">
    <UiKitTypography :type="MAP.H2" as="h2" :class="[$style.title, narrow && $style.narrow]">
      {{ title }}
    </UiKitTypography>
    <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">{{ lead }}</UiKitTypography>
  </div>
</template>

<script setup>
import { MAP } from "@/constants/typography";

defineProps({
  title: { type: String, required: true },
  lead: { type: String, required: true },
  narrow: { type: Boolean, default: false },
});
</script>

<style module lang="scss">
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--FQ-gap-intro);
  text-align: center;
}

.title {
  color: var(--FQ-grey-22);
}

.narrow {
  max-width: var(--FQ-measure-title);
  text-wrap: balance;
}

.lead {
  max-width: var(--FQ-measure-lead);
  color: var(--FQ-text-muted);
}
</style>
