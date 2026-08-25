<template>
  <section :class="$style.section">
    <UiKitTabs v-model="audienceId" :items="AUDIENCES" />

    <header :class="$style.head">
      <UiKitTypography :type="MAP.H2" as="h2">
        {{ content.title }}
      </UiKitTypography>
      <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">
        {{ content.lead }}
      </UiKitTypography>
    </header>

    <ul :class="$style.grid">
      <li v-for="(item, index) in content.items" :key="item" :class="$style.cell">
        <UiKitTypography :type="MAP.LABEL" as="p" :class="$style.numeral">
          {{ String(index + 1).padStart(2, "0") }}.
        </UiKitTypography>
        <UiKitTypography :type="MAP.P2" as="p" :class="$style.body">{{ item }}</UiKitTypography>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { MAP } from "@/constants/typography";
import AUDIENCES from "./Correlations.data";

const audienceId = ref(AUDIENCES[0].id);

const content = computed(() => {
  const audience = AUDIENCES.find((item) => item.id === audienceId.value);
  return (audience ?? AUDIENCES[0]).correlations;
});
</script>

<style module lang="scss">
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head {
  width: 605px;
  max-width: 100%;
  margin-top: 48px;
  text-align: center;
}

.lead {
  margin-top: 28px;
  color: var(--FQ-text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  min-height: 204px;
  margin-top: 68px;
  background-color: var(--FQ-surface);
  border: 1px solid var(--FQ-border-strong);
}

.cell {
  padding: 34px 0 43px 32px;

  &:not(:last-child) {
    border-right: 1px solid var(--FQ-border-strong);
  }
}

.numeral {
  margin-bottom: 24px;
  color: var(--FQ-accent);
}

.body {
  max-width: 289px;
}
</style>
