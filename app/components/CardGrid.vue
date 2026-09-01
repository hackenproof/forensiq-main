<template>
  <ul
    :class="$style.grid"
    :style="{ '--desktop': columns, '--tablet-wide': tabletWide ?? tablet, '--tablet': tablet }"
  >
    <slot />
  </ul>
</template>

<script setup>
defineProps({
  columns: { type: Number, required: true },
  /* 960-1139 */
  tabletWide: { type: Number, default: null },
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

  @include below(laptop) {
    --columns: var(--tablet-wide);
  }

  @include below(tablet-wide) {
    --columns: var(--tablet);
  }

  @include below(tablet) {
    --columns: 1;
  }
}
</style>
