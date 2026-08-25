<script setup>
const SITE_NAME = "ForensIQ";

useHead({
  titleTemplate: (title) => title || SITE_NAME,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
