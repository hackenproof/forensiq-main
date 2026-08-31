<template>
  <section :class="$style.section">
    <div :class="$style.intro">
      <UiKitTypography :type="MAP.H2" as="h2">Core capabilities</UiKitTypography>
      <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">{{ LEAD }}</UiKitTypography>
    </div>

    <CardGrid :columns="3">
      <li v-for="item in CAPABILITIES" :key="item.label">
        <Card :label="item.label" :title="item.title">
          <template #illustration>
            <img :src="item.illustration" alt="" width="104" height="104" />
          </template>
          {{ item.body }}
        </Card>
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
import CAPABILITIES from "./CoreCapabilities.data";

const LEAD =
  "When a case involves a ransom demand or crypto-enabled fraud, ForensIQ unifies logs, memory captures, and on-chain data in one workspace, using AI to cross-check it against prior case files.";
</script>

<style module lang="scss">
.section {
  @include shell;

  padding-block: var(--FQ-section-py);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--FQ-gap-title);

  @include below(tablet) {
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

  @include below(tablet) {
    padding-inline: var(--FQ-gutter);
  }
}

.lead {
  max-width: 604px;
  color: var(--FQ-text-muted);
}

.cta {
  display: none;

  @include below(laptop) {
    display: inline-flex;
  }

  @include below(tablet) {
    display: none;
  }
}
</style>
