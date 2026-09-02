<template>
  <NuxtLayout name="default">
    <section :class="$style.band">
      <div :class="$style.copy">
        <UiKitTypography :type="MAP.H1" as="h1" :class="$style.code">{{ code }}</UiKitTypography>
        <div :class="$style.intro">
          <UiKitTypography :type="MAP.H2" as="h2" :class="$style.introTitle">
            {{ title }}
          </UiKitTypography>
          <UiKitTypography :type="MAP.P1" as="p" :class="$style.introLead">
            {{ lead }}
          </UiKitTypography>
        </div>
        <UiKitButton large :to="ROUTES.ROOT" @click.prevent="clearError({ redirect: ROUTES.ROOT })">
          Back to home
        </UiKitButton>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";

const props = defineProps({ error: { type: Object, required: true } });

const code = computed(() => props.error?.statusCode || 500);
const notFound = computed(() => code.value === 404);
const title = computed(() => (notFound.value ? "Page not found" : "Something went wrong"));
const lead = computed(() =>
  notFound.value
    ? "The page you are looking for does not exist or has been moved."
    : "An unexpected error occurred. Please try again later.",
);

useSeoMeta({ title: () => `${title.value} — ForensIQ`, robots: "noindex" });
</script>

<style module lang="scss">
.band {
  grid-column: viewport;
  display: grid;
  grid-template-columns: subgrid;
  padding-block: 80px;
  align-content: center;
  justify-items: center;
  min-height: calc(100vh - 73px);
  background-color: var(--FQ-grey-91);
}

.copy {
  grid-column: content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
}

.code {
  @supports (background-clip: text) or (-webkit-background-clip: text) {
    background-image: linear-gradient(90deg, var(--FQ-accent-1) 0%, #000000 53%, #75862a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.introTitle {
  max-width: 14em;
  color: var(--FQ-grey-22);
  text-wrap: balance;
}

.introLead {
  max-width: 35em;
  color: var(--FQ-text-muted);
}

@include below1440 {
  .band {
    padding-block: 64px;
  }

  .copy {
    gap: 40px;
  }
}

@include below960 {
  .band {
    padding-block: 32px;
  }
}

@include below760 {
  .band {
    min-height: calc(100vh - 65px);
  }

  .copy {
    gap: 24px;
  }

  .intro {
    gap: 16px;
  }
}
</style>
