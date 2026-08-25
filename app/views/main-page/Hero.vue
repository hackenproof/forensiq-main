<template>
  <section :class="$style.hero">
    <div :class="$style.copy">
      <div :class="$style.titleBox">
        <UiKitTypography :type="MAP.H1" as="h1">
          One platform to analyse all evidence
        </UiKitTypography>
      </div>

      <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">
        Consolidate digital evidence and blockchain intelligence in a single platform. From raw data
        to connected insight.
      </UiKitTypography>
    </div>

    <img
      :class="$style.diagram"
      src="~/assets/images/main-page/hero.svg"
      alt=""
      width="506"
      height="357"
    />
  </section>
</template>

<script setup>
import { MAP } from "@/constants/typography";
</script>

<style module lang="scss">
.hero {
  display: flex;
  align-items: flex-start;
  gap: 135px;
  padding-block: 102px;
}

.copy {
  flex: 1;
  min-width: 0;
}

.titleBox {
  width: 440px;
  max-width: 100%;
}

.lead {
  margin-top: 28px;
  color: var(--FQ-text-muted);
}

.diagram {
  flex: none;
  width: 506px;
  height: 357px;
}
</style>
