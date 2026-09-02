<template>
  <section :class="$style.hero">
    <img
      :class="$style.lines"
      src="~/assets/images/main-page/hero-lines.svg"
      alt=""
      width="1254"
      height="864"
    />
    <NuxtImg
      :class="$style.graph"
      src="/images/main-page/hero-graph.png"
      alt=""
      width="1043"
      height="673"
      format="webp"
      quality="80"
    />
    <div :class="$style.copy">
      <div :class="$style.text">
        <span :class="$style.wordmark" role="img" :aria-label="CONTENT.brand" />

        <UiKitTypography :type="MAP.H1" as="h1" :class="$style.title">
          {{ CONTENT.title }}
        </UiKitTypography>

        <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">
          {{ CONTENT.lead }}
        </UiKitTypography>
      </div>

      <div :class="$style.actions">
        <UiKitButton large :to="ROUTES.REQUEST_DEMO">{{ CONTENT.primaryCta }}</UiKitButton>
        <UiKitButton large :to="ROUTES.HOW_IT_WORKS" variant="secondary">{{
          CONTENT.secondaryCta
        }}</UiKitButton>
      </div>
    </div>

    <NuxtImg
      :class="$style.graphMobile"
      src="/images/main-page/hero-graph-mobile.png"
      alt=""
      width="352"
      height="312"
      format="webp"
      quality="80"
    />
  </section>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";
import CONTENT from "./Hero.data";
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

  @include below960 {
    min-height: 599px;
  }

  @include below760 {
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
}

.graphMobile {
  display: none;

  @include below760 {
    display: block;
    width: 352px;
    max-width: none;
  }
}

.lines {
  width: 1254px;
  top: calc(50% + 34px);
  transform: translateY(-50%);
  left: -762px;

  @include below1920 {
    left: -902px;
  }

  @include below1200 {
    left: -942px;
  }

  @include below960 {
    left: -962px;
  }
}

.graph {
  width: 1043px;
  bottom: 30.5px;
  right: -306px;

  @include below760 {
    display: none;
  }

  @include below1920 {
    right: -406px;
  }

  @include below1440 {
    right: -436px;
  }

  @include below1200 {
    right: -536px;
  }

  @include below960 {
    top: -34px;
    right: -556px;
    bottom: auto;
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

  @include below1440 {
    width: 678px;
  }

  @include below960 {
    width: 472px;
    gap: 40px;
  }

  @include below760 {
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

  @include below1440 {
    width: 154px;
    height: 24px;
  }
}

.title {
  text-wrap: balance;

  @include below760 {
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

@include below760 {
  .lines {
    display: none;
  }
}
</style>
