<template>
  <section :class="$style.hero">
    <div :class="$style.copy">
      <div :class="$style.text">
        <UiKitTypography :type="MAP.H1" as="h1">AI-native investigation platform</UiKitTypography>

        <UiKitTypography :type="MAP.P3" as="p" :class="$style.lead">
          ForensIQ connects files, devices, logs, and blockchain activity so your team investigates
          faster.
        </UiKitTypography>
      </div>

      <div :class="$style.actions">
        <UiKitButton :to="ROUTES.REQUEST_DEMO">Contact us</UiKitButton>
        <UiKitButton :to="ROUTES.HOW_IT_WORKS" variant="secondary">how it works</UiKitButton>
      </div>
    </div>

    <div :class="$style.diagram">
      <img
        :class="$style.image"
        src="~/assets/images/main-page/hero.svg"
        alt=""
        width="506"
        height="357"
      />
    </div>
  </section>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";
</script>

<style module lang="scss">
.hero {
  @include shell;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
  padding-block: 100px;

  @include below(tablet) {
    flex-direction: column;
    align-items: center;
    gap: 64px;
    padding-block: 32px 100px;
  }

  @include below(mobile) {
    gap: 28px;
    padding-block: 24px;
  }
}

.copy,
.text {
  display: flex;
  flex-direction: column;
  gap: var(--FQ-gap-intro);
}

.copy {
  flex: none;
  width: 480px;
  max-width: 100%;

  @include below(tablet) {
    align-items: center;
    gap: 64px;
    text-align: center;
  }

  @include below(mobile) {
    gap: 24px;
  }
}

.lead {
  color: var(--FQ-text-muted);
}

.actions {
  display: flex;
  gap: 16px;

  @include below(mobile) {
    flex-direction: column;
    width: 100%;
  }
}

.diagram {
  flex: none;
  width: 506px;
  max-width: 100%;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
