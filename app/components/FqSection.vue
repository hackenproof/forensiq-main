<template>
  <section :class="$style.section">
    <div v-if="$slots.background" :class="$style.background"><slot name="background" /></div>
    <div :class="[$style.content, $style[width]]"><slot /></div>
  </section>
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: "content",
    validator: (value) => ["content-wide", "content", "content-narrow"].includes(value),
  },
});
</script>

<style module lang="scss">
.section {
  grid-column: viewport;
  display: grid;
  grid-template-columns: subgrid;
  padding-block: 80px;
  background-color: var(--section-background, transparent);
}

.background,
.content {
  grid-row: 1;
}

.background {
  grid-column: viewport;
}

.content {
  z-index: 1;
  display: flex;
  flex-direction: column;
  grid-column: content;
  gap: var(--section-content-gap, 48px);
}

.content-wide {
  grid-column: content-wide;
}

.content-narrow {
  grid-column: content-narrow;
}

@include below1440 {
  .section {
    padding-block: 64px;
  }

  .content {
    gap: var(--section-content-gap, 40px);
  }
}

@include below960 {
  .section {
    padding-block: 32px;
  }
}

@include below760 {
  .content {
    gap: var(--section-content-gap, 24px);
  }
}
</style>
