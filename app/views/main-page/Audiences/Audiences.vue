<template>
  <section v-for="audience in AUDIENCES" :key="audience.tagline" :class="$style.band">
    <div :class="$style.top">
      <UiKitTypography :type="MAP.P1" as="p" :class="$style.tagline">
        {{ audience.tagline }}
      </UiKitTypography>

      <div :class="$style.description">
        <UiKitTypography :type="MAP.H2" as="h2" :class="$style.title">
          {{ audience.title }}
        </UiKitTypography>
        <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">
          {{ audience.lead }}
        </UiKitTypography>
      </div>
    </div>

    <CardGrid :columns="audience.cards.length" :w960="2">
      <li v-for="card in audience.cards" :key="card.label">
        <Card :label="card.label">{{ card.body }}</Card>
      </li>
    </CardGrid>

    <UiKitButton large :to="ROUTES.REQUEST_DEMO" :class="$style.cta">
      {{ audience.cta }}
    </UiKitButton>
  </section>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";
import AUDIENCES from "./Audiences.data";
</script>

<style module lang="scss">
.band {
  @include band;

  row-gap: var(--FQ-gap-block);
  background-color: var(--FQ-grey-95);

  > * {
    grid-column: content;
  }
}

.top,
.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.top {
  gap: 16px;
}

.description {
  gap: var(--FQ-gap-intro);
}

.tagline {
  color: var(--FQ-accent-1);

  @include below(w760) {
    display: grid;
    align-content: center;
    min-height: 30px;
    font-size: 14px;
    line-height: normal;
  }
}

.title {
  text-wrap: balance;

  color: var(--FQ-grey-22);

  @include below(w760) {
    max-width: var(--FQ-measure-title);
  }
}

.lead {
  max-width: var(--FQ-measure-lead);
  color: var(--FQ-text-muted);
}

.cta {
  justify-self: center;
  min-width: 314px;

  @include below(w760) {
    justify-self: stretch;
    min-width: 0;
  }
}
</style>
