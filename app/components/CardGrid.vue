<template>
  <ul
    :class="$style.grid"
    :style="{
      '--c-default': columns,
      '--c-w960': w960 ?? columns,
      '--c-w760': w760 ?? w960 ?? columns,
    }"
  >
    <slot />
  </ul>
</template>

<script setup>
defineProps({
  columns: { type: Number, required: true },
  w960: { type: Number, default: null },
  w760: { type: Number, default: null },
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

  @include below(w1200) {
    --columns: var(--c-w960);
  }

  @include below(w960) {
    --columns: var(--c-w760);
  }

  @include below(w760) {
    --columns: 1;
  }
}
</style>
