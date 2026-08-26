<template>
  <header :class="$style.header">
    <div :class="$style.inner">
      <NuxtLink :to="ROUTES.ROOT" :class="$style.brand" :aria-label="BRAND">
        <img src="~/assets/images/shared/logo-forensiq.svg" :alt="BRAND" width="135" height="21" />
      </NuxtLink>

      <nav :aria-label="`${BRAND} primary`">
        <UiKitButton :to="CTA.to">
          {{ CTA.label }}
        </UiKitButton>
      </nav>
    </div>
  </header>
</template>

<script setup>
import ROUTES from "@/constants/routes";

const BRAND = "FORENSIQ";
const CTA = { label: "Request demo", to: ROUTES.REQUEST_DEMO };
</script>

<style module lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--FQ-paper);
  border-bottom: 1px solid var(--FQ-border-strong);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--FQ-header-w);
  height: calc(var(--FQ-header-h) - 1px);
  margin-inline: auto;
  padding-inline: var(--FQ-gutter);
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 153px;
  height: 32px;
}

.brand img {
  width: 135px;
  height: 21px;
}
</style>
