<template>
  <div>
    <Header />
    <main :class="$style.shell">
      <section :class="$style.band">
        <div :class="$style.copy">
          <UiKitTypography :type="MAP.H1" as="h1" :class="$style.code">{{ code }}</UiKitTypography>
          <SectionIntro :title="title" :lead="lead" narrow />
          <UiKitButton large :to="ROUTES.ROOT" @click.prevent="clearError({ redirect: ROUTES.ROOT })">
            Back to home
          </UiKitButton>
        </div>
      </section>
    </main>
    <Footer />
  </div>
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
.shell {
  @include shell;
}

.band {
  @include band;
  align-content: center;
  justify-items: center;
  min-height: calc(100vh - var(--FQ-header-h));
  background-color: var(--FQ-grey-91);

  > * {
    grid-column: content;
  }
}

.copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--FQ-gap-block);
}

.code {
  @supports (background-clip: text) or (-webkit-background-clip: text) {
    background-image: linear-gradient(90deg, var(--FQ-accent-1) 0%, #000000 53%, #75862a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
</style>
