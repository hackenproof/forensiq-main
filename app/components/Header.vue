<template>
  <header :class="$style.header">
    <NuxtLink :to="ROUTES.ROOT" :class="$style.brand" :aria-label="BRAND">
      <img
        :class="$style.logo"
        src="~/assets/images/shared/logo-forensiq.svg"
        alt=""
        width="140"
        height="32"
      />
    </NuxtLink>

    <nav :aria-label="`${BRAND} primary`">
      <UiKitButton :to="ROUTES.REQUEST_DEMO" variant="secondary" :class="$style.cta">
        Request demo
      </UiKitButton>
    </nav>
  </header>
</template>

<script setup>
import ROUTES from "@/constants/routes";

const BRAND = "FORENSIQ";
</script>

<style module lang="scss">
.header {
  padding: 16px 108px;

  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--FQ-primary);
  border-bottom: 1px solid var(--FQ-grey-85);

  @include below1440 {
    padding-inline: 40px;
  }

  @include below760 {
    padding-inline: 16px;
  }
}

.logo {
  @include below760 {
    width: auto;
    height: 24px;
  }
}

.header .cta {
  @include below760 {
    min-height: 32px;
    padding-block: 10px;
  }
}
</style>
