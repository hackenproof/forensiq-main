<template>
  <ul
    :class="$style.grid"
    :style="{
      '--c-default': columns,
      '--c-below-1200': columnsBelow1200 ?? columns,
      '--c-below-960': columnsBelow960 ?? columnsBelow1200 ?? columns,
    }"
  >
    <slot />
  </ul>
</template>

<script setup>
defineProps({
  columns: { type: Number, required: true },
  columnsBelow1200: { type: Number, default: null },
  columnsBelow960: { type: Number, default: null },
});
</script>

<style module lang="scss">
.grid {
  --columns: var(--c-default);

  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: 1px;
  padding: 1px;
  background-color: var(--FQ-grey-85);

  @include below1200 {
    --columns: var(--c-below-1200);
  }

  @include below960 {
    --columns: var(--c-below-960);
  }

  @include below760 {
    --columns: 1;
  }
}
</style>
