<template>
  <article :class="[$style.card, icon && $style.iconCard]">
    <div v-if="$slots.illustration" :class="$style.illustration">
      <slot name="illustration" />
    </div>

    <div :class="$style.text">
      <div :class="$style.header">
        <img v-if="icon" :src="icon" alt="" width="20" height="20" />
        <span v-else :class="$style.marker" aria-hidden="true" />
        <UiKitTypography :type="MAP.P12M" as="p" :class="$style.label">{{ label }}</UiKitTypography>
      </div>

      <div :class="$style.body">
        <UiKitTypography v-if="title" :type="MAP.H4" as="h3">{{ title }}</UiKitTypography>
        <UiKitTypography :type="MAP.P2" as="p"><slot /></UiKitTypography>
      </div>
    </div>
  </article>
</template>

<script setup>
import { MAP } from "@/constants/typography";

defineProps({
  label: { type: String, required: true },
  title: { type: String, default: "" },
  icon: { type: String, default: "" },
});
</script>

<style module lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: var(--FQ-card-gap);
  height: 100%;
  padding: var(--FQ-card-p);
  background-color: var(--FQ-grey-95);
}

.illustration {
  width: 104px;
  height: 104px;
  overflow: clip;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.iconCard .text {
  gap: var(--FQ-card-gap);
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.marker {
  flex: none;
  width: 5px;
  height: 5px;
  background-color: var(--FQ-accent-1);
}

.label {
  color: var(--FQ-accent-1);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
