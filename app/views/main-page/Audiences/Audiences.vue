<template>
  <FqSection v-for="audience in AUDIENCES.items" :key="audience.tagline" :class="$style.section">
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

    <CardGrid :columns="audience.cards.length" :columns-below-1200="2">
      <li v-for="card in audience.cards" :key="card.label">
        <Card :label="card.label">{{ card.body }}</Card>
      </li>
    </CardGrid>

    <UiKitButton large :to="ROUTES.REQUEST_DEMO" :class="$style.cta">
      {{ audience.cta }}
    </UiKitButton>
  </FqSection>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";
import AUDIENCES from "./Audiences.data";
</script>

<style module lang="scss">
.section {
  --section-background: var(--FQ-grey-95);
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
  gap: 24px;

  @include below760 {
    gap: 16px;
  }
}

.tagline {
  color: var(--FQ-accent-1);

  @include below760 {
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

  @include below760 {
    max-width: 14em;
  }
}

.lead {
  max-width: 35em;
  color: var(--FQ-text-muted);
}

.cta {
  justify-self: center;
  min-width: 314px;

  @include below760 {
    justify-self: stretch;
    min-width: 0;
  }
}
</style>
