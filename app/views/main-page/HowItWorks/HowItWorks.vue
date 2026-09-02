<template>
  <FqSection id="how-it-works">
    <SectionIntro :title="STEPS.title" :lead="STEPS.lead" />

    <CardGrid :columns="STEPS.items.length" :columns-below-1200="2">
      <li v-for="step in STEPS.items" :key="step.label">
        <Card :label="step.label" :title="step.title" :icon="step.icon">{{ step.body }}</Card>
      </li>
    </CardGrid>
  </FqSection>
</template>

<script setup>
import STEPS from "./HowItWorks.data";
</script>
