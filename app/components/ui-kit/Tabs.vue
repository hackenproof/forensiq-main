<template>
  <div :class="$style.wrapper" role="tablist">
    <div :class="$style.tabs">
      <template v-for="(item, index) in items" :key="item.id">
        <span v-if="index > 0" :class="$style.divider" aria-hidden="true" />

        <button
          :class="[$style.tab, { [$style.active]: item.id === modelValue }]"
          type="button"
          role="tab"
          :aria-selected="item.id === modelValue"
          @click="$emit('update:modelValue', item.id)"
        >
          <UiKitTypography :type="MAP.P1">{{ item.label }}</UiKitTypography>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { MAP } from "@/constants/typography";

defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => items.every((item) => "id" in item && "label" in item),
  },
  modelValue: { type: String, required: true },
});

defineEmits(["update:modelValue"]);
</script>

<style module lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid var(--FQ-border-strong);
}

.tabs {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 73px;
}

.divider {
  align-self: stretch;
  width: 1px;
  background-color: var(--FQ-border-strong);
}

.tab {
  width: 256px;
  padding: 20px 24px;
  text-align: center;
  white-space: nowrap;

  span {
    transition: color 160ms ease;
  }

  &:hover span {
    color: var(--FQ-accent);
  }
}

.active span {
  color: var(--FQ-accent);
}
</style>
