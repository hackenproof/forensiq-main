<template>
  <ul :class="$style.grid" :style="{ '--desktop': columns, '--tablet': tablet }">
    <slot />
  </ul>
</template>

<script setup>
defineProps({
  columns: { type: Number, required: true },
  tablet: { type: Number, default: 2 },
});
</script>

<style module lang="scss">
.grid {
  --columns: var(--desktop);

  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: 1px;
  width: 100%;
  padding: 1px;
  background-color: var(--FQ-grey-85);

  @include below(tablet) {
    --columns: var(--tablet);
  }

  @include below(mobile) {
    --columns: 1;
  }
}
</style>
