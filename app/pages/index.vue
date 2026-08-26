<template>
  <div :class="$style.page">
    <div :class="$style.shell">
      <Hero />
    </div>

    <div :class="[$style.shell, $style.body]">
      <Correlations />
      <CoreCapabilities />
    </div>

    <div :class="$style.shell">
      <RequestDemo />
    </div>
  </div>
</template>

<script setup>
import Hero from "@/views/main-page/Hero.vue";
import Correlations from "@/views/main-page/Correlations/Correlations.vue";
import CoreCapabilities from "@/views/main-page/CoreCapabilities/CoreCapabilities.vue";
import RequestDemo from "@/views/main-page/RequestDemo.vue";

const TITLE = "ForensIQ — one platform to analyse all evidence";
const DESCRIPTION =
  "Consolidate digital evidence and blockchain intelligence in a single platform. From raw data to connected insight.";

const { siteUrl } = useRuntimeConfig().public;
const canonical = siteUrl || undefined;

useSeoMeta({
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: TITLE,
  ogDescription: DESCRIPTION,
  ogType: "website",
  ogUrl: canonical,
  twitterCard: "summary_large_image",
  twitterTitle: TITLE,
  twitterDescription: DESCRIPTION,
});

useHead({
  link: canonical ? [{ rel: "canonical", href: canonical }] : [],
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  padding-bottom: var(--FQ-gap-footer);
}

.shell {
  @include shell;
}

.body {
  margin-top: var(--FQ-gap-hero);
}
</style>
