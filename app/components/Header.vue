<template>
  <header :class="$style.header">
    <div :class="$style.inner">
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
        <UiKitButton :to="ROUTES.REQUEST_DEMO" :class="$style.cta">Request demo</UiKitButton>
      </nav>
    </div>
  </header>
</template>

<script setup>
import ROUTES from "@/constants/routes";

const BRAND = "FORENSIQ";
</script>

<style module lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--FQ-grey-91);
  border-bottom: 1px solid var(--FQ-grey-85);
}

.inner {
  @include shell;

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Figma says 17 (14 on mobile); the 4px grid gives 16 / 12 — header 73px, 61 on mobile. */
  padding-block: 16px;

  @include below(mobile) {
    padding-block: 12px;
  }
}

.brand {
  display: block;
}

.logo {
  display: block;

  @include below(mobile) {
    width: auto;
    height: 26px;
  }
}

.header .cta {
  @include below(mobile) {
    height: 36px;
  }
}
</style>
