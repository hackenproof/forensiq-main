<template>
  <section id="how-it-works" :class="$style.section">
    <div :class="$style.intro">
      <UiKitTypography :type="MAP.H2" as="h2">How ForensIQ works</UiKitTypography>
      <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">{{ LEAD }}</UiKitTypography>
    </div>

    <CardGrid :columns="STEPS.length">
      <li v-for="step in STEPS" :key="step.label">
        <Card :label="step.label" :title="step.title" :icon="step.icon">{{ step.body }}</Card>
      </li>
    </CardGrid>

    <UiKitButton :to="ROUTES.REQUEST_DEMO" :class="$style.cta"
      >Join the Enterprise Beta</UiKitButton
    >
  </section>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";
import STEPS from "./HowItWorks.data";

const LEAD =
  "When a case involves a ransom demand or crypto-enabled fraud, ForensIQ unifies logs, memory captures, and on-chain data in one workspace, using AI to cross-check it against prior case files.";
</script>

<style module lang="scss">
.section {
  @include shell;

  padding-block: var(--FQ-section-py);
  padding-top: var(--FQ-section-py-edge); /* Grey/95 band above */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--FQ-gap-title);

  @include below(mobile) {
    padding-inline: 0;
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  gap: var(--FQ-gap-intro);
  text-align: center;

  @include below(mobile) {
    padding-inline: var(--FQ-gutter);
  }
}

.lead {
  max-width: 604px;
  color: var(--FQ-text-muted);
}

.cta {
  display: none;

  @include below(tablet) {
    display: inline-flex;
  }

  @include below(mobile) {
    align-self: stretch;
    margin-inline: var(--FQ-gutter);
  }
}
</style>
