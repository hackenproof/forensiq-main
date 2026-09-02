<template>
  <div :class="$style.intro">
    <UiKitTypography :type="MAP.H2" as="h2" :class="$style.title">
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
});
</script>

<style module lang="scss">
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.title {
  color: var(--FQ-grey-22);
}

.lead {
  max-width: 35em;
  color: var(--FQ-text-muted);
}

@include below760 {
  .intro {
    gap: 16px;
  }
}
</style>
