<template>
  <section v-for="audience in AUDIENCES" :key="audience.eyebrow" :class="$style.band">
    <div :class="$style.inner">
      <div :class="$style.intro">
        <div :class="$style.heading">
          <UiKitTypography :type="MAP.P3" as="p" :class="$style.eyebrow">
            {{ audience.eyebrow }}
          </UiKitTypography>
          <UiKitTypography :type="MAP.H2" as="h2" :class="$style.title">
            {{ audience.title }}
          </UiKitTypography>
        </div>
        <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">
          {{ audience.lead }}
        </UiKitTypography>
      </div>

      <CardGrid :columns="audience.cards.length" :tablet="1">
        <li v-for="card in audience.cards" :key="card.label">
          <Card :label="card.label">{{ card.body }}</Card>
        </li>
      </CardGrid>

      <UiKitButton :to="ROUTES.REQUEST_DEMO" :class="$style.cta">{{ audience.cta }}</UiKitButton>
    </div>
  </section>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";
import AUDIENCES from "./Audiences.data";
</script>

<style module lang="scss">
.band {
  padding-block: var(--FQ-band-py);
  background-color: var(--FQ-grey-95);
}

/* the two bands read as one Grey/95 surface: no doubled padding at the join */
.band + .band {
  @include below(mobile) {
    padding-top: 0;
  }
}

.inner {
  @include shell;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  @include below(mobile) {
    gap: 36px;
  }
}

.eyebrow {
  color: var(--FQ-accent-1);
}

.intro,
.heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.intro {
  gap: var(--FQ-gap-intro);
}

.heading {
  gap: 8px;
}

.title {
  @include below(mobile) {
    max-width: 244px;
  }
}

.lead {
  max-width: 604px;
  color: var(--FQ-text-muted);
}

.cta {
  @include below(mobile) {
    width: 100%;
  }
}
</style>
