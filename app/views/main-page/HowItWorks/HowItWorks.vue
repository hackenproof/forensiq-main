<template>
  <section id="how-it-works" :class="$style.section">
    <SectionIntro title="How ForensIQ works" :lead="LEAD" />

    <CardGrid :columns="STEPS.length" :w960="2">
      <li v-for="step in STEPS" :key="step.label">
        <Card :label="step.label" :title="step.title" :icon="step.icon">{{ step.body }}</Card>
      </li>
    </CardGrid>
  </section>
</template>

<script setup>
import STEPS from "./HowItWorks.data";

const LEAD =
  "Transform fragmented evidence into a unified investigation. Our four-step process guides you from raw data to actionable insight.";
</script>

<style module lang="scss">
.section {
  @include band;

  row-gap: var(--FQ-gap-block);

  > * {
    grid-column: content;
  }
}
</style>
