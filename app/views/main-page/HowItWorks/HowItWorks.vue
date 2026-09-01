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
  "When a case involves a ransom demand or crypto-enabled fraud, ForensIQ unifies logs, memory captures, and on-chain data in one workspace, using AI to cross-check it against prior case files.";
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
