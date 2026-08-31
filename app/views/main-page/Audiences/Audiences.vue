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

      <CardGrid :columns="audience.cards.length" :tablet-wide="2" :tablet="1">
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
  @include below(tablet) {
    padding-top: 0;
  }
}

.inner {
  @include shell;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  @include below(tablet) {
    gap: 36px;
  }
}

.eyebrow {
  /* greedy wrapping orphans "CSIRT Teams" onto its own line at 322 */
  text-wrap: balance;

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
  max-width: 604px;
}

.heading {
  gap: 8px;
}

.title {
  /* Figma breaks after "intelligence"; greedy wrapping leaves an orphan "cases" */
  text-wrap: balance;

  /* measured H2 width in the 322 frame (243), see design-spec/mobile.md.
     It sets the Figma line breaks on its own; balance would move them. */
  @include below(phone-wide) {
    max-width: 244px;
    text-wrap: wrap;
  }
}

.lead {
  color: var(--FQ-text-muted);
}

.cta {
  @include below(phone-wide) {
    width: 100%;
  }
}
</style>
