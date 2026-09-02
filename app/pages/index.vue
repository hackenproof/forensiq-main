<template>
  <div>
    <Header />
    <main :class="$style.shell">
      <Hero />
      <Audiences />
      <HowItWorks />
      <CoreCapabilities />
      <RequestDemo />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Hero from "@/views/main-page/Hero.vue";
import Audiences from "@/views/main-page/Audiences/Audiences.vue";
import HowItWorks from "@/views/main-page/HowItWorks/HowItWorks.vue";
import CoreCapabilities from "@/views/main-page/CoreCapabilities/CoreCapabilities.vue";
import RequestDemo from "@/views/main-page/RequestDemo.vue";

const TITLE = "ForensIQ — AI-native investigation platform";
const DESCRIPTION =
  "ForensIQ connects files, devices, logs, and blockchain activity so your team investigates faster.";

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
.shell {
  @include shell;
}
</style>
