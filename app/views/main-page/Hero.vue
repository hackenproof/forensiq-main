<template>
  <section :class="$style.hero">
    <img
      :class="$style.lines"
      src="~/assets/images/main-page/hero-lines.svg"
      alt=""
      width="1254"
      height="864"
    />
    <img
      :class="$style.graph"
      src="~/assets/images/main-page/hero-graph.png"
      alt=""
      width="1043"
      height="673"
    />

    <div :class="$style.copy">
      <div :class="$style.text">
        <span :class="$style.wordmark" role="img" :aria-label="BRAND" />

        <UiKitTypography :type="MAP.H1" as="h1" :class="$style.title">
          AI-native investigation platform
        </UiKitTypography>

        <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">
          ForensIQ connects files, devices, logs, and blockchain activity so your team investigates
          faster.
        </UiKitTypography>
      </div>

      <div :class="$style.actions">
        <UiKitButton large :to="ROUTES.REQUEST_DEMO">Contact us</UiKitButton>
        <UiKitButton large :to="ROUTES.HOW_IT_WORKS" variant="secondary">how it works</UiKitButton>
      </div>
    </div>

    <img
      :class="$style.graphMobile"
      src="~/assets/images/main-page/hero-graph-mobile.png"
      alt=""
      width="352"
      height="312"
    />
  </section>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";

const BRAND = "FORENSIQ";
</script>

<style module lang="scss">
.hero {
  @include band;
  padding-block: 102px;

  position: relative;
  overflow: hidden;
  align-content: center;
  justify-items: center;
  min-height: 700px;
  background-color: var(--FQ-grey-91);

  @include below(w960) {
    min-height: 599px;
  }

  @include below(w760) {
    padding-block: 32px;
    min-height: 0;
    row-gap: 40px;
  }
}

.copy,
.graphMobile {
  grid-column: content;
}

.lines,
.graph {
  position: absolute;
  max-width: none;

  @include below(w760) {
    display: none;
  }
}

.lines {
  width: 1254px;
  top: calc(50% + 34px);
  transform: translateY(-50%);
  left: -902px;

  @include wide {
    left: -762px;
  }

  @include below(w1200) {
    left: -942px;
  }

  @include below(w960) {
    left: -962px;
  }
}

.graph {
  width: 1043px;
  bottom: 30.5px;
  right: -406px;

  @include wide {
    right: -306px;
  }

  @include below(w1440) {
    right: -436px;
  }

  @include below(w1200) {
    right: -536px;
  }

  @include below(w960) {
    top: -34px;
    right: -556px;
    bottom: auto;
  }
}

.graphMobile {
  display: none;

  @include below(w760) {
    display: block;
    width: 352px;
    max-width: none;
  }
}

.copy,
.text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.copy {
  position: relative;
  width: 774px;
  max-width: 100%;
  gap: 48px;

  @include below(w1440) {
    width: 678px;
  }

  @include below(w960) {
    width: 472px;
    gap: 40px;
  }

  @include below(w760) {
    width: 100%;
    gap: 32px;
  }
}

.text {
  gap: 24px;
}

.wordmark {
  width: 206px;
  height: 32px;
  background-color: var(--FQ-primary);
  mask: url("~/assets/images/main-page/hero-wordmark.svg") no-repeat center / contain;

  @include below(w1440) {
    width: 154px;
    height: 24px;
  }
}

.title {
  text-wrap: balance;

  @include below(w760) {
    max-width: 10em;
  }

  @supports (background-clip: text) or (-webkit-background-clip: text) {
    background-image: linear-gradient(90deg, var(--FQ-accent-1) 0%, #000000 53%, #75862a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.lead {
  max-width: 26em;
}

.actions {
  display: flex;
  gap: 16px;
}
</style>
