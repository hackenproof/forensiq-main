<template>
  <footer :class="$style.footer">
    <UiKitTypography :class="$style.copyright" :type="MAP.LABEL" as="p">{{
      COPYRIGHT
    }}</UiKitTypography>

    <ul :class="$style.links">
      <li v-for="link in LINKS" :key="link.label">
        <a v-if="link.href" :class="$style.link" :href="link.href" rel="noopener" target="_blank">
          <UiKitTypography :type="MAP.LABEL">{{ link.label }}</UiKitTypography>
        </a>
        <UiKitTypography v-else :type="MAP.LABEL">{{ link.label }}</UiKitTypography>
      </li>
    </ul>
  </footer>
</template>

<script setup>
import ROUTES from "@/constants/routes";
import { MAP } from "@/constants/typography";

const COPYRIGHT = "© 2026 ForensIQ. All rights reserved.";

const LINKS = [{ label: "LinkedIn", href: ROUTES.LINKEDIN }, { label: "Privacy and legal" }];
</script>

<style module lang="scss">
.footer {
  padding: 32px 108px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--FQ-primary);

  span,
  p {
    color: var(--FQ-on-dark);
  }

  @include below1440 {
    padding-inline: 40px;
  }

  @include below760 {
    padding: 24px 16px;
    flex-direction: column-reverse;
    gap: 24px;
    text-align: center;
  }
}

.links {
  display: flex;
  gap: 32px;
}

.links li {
  @include below760 {
    padding-block: 6px;
  }
}

.copyright {
  @include below760 {
    text-wrap: balance;
  }
}

.link span {
  transition: color 160ms ease;
}

.link:hover span {
  color: var(--FQ-white);
}
</style>
