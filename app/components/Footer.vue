<template>
  <footer :class="$style.footer">
    <div :class="$style.inner">
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
    </div>
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
  border-top: 1px solid var(--FQ-grey-85);

  span,
  p {
    color: var(--FQ-grey-22);
  }
}

.inner {
  @include shell;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--FQ-footer-py);

  /* links above the copyright, without reordering the DOM */
  @include below(tablet-wide) {
    flex-direction: column-reverse;
    gap: 12px;
    text-align: center;
  }
}

.links {
  display: flex;
  gap: 32px;

  @include below(tablet-wide) {
    gap: 24px;
  }
}

.links li {
  @include below(tablet-wide) {
    padding-block: 6px;
  }
}

.copyright {
  @include below(tablet-wide) {
    text-wrap: balance;
  }
}

.link span {
  transition: color 160ms ease;
}

.link:hover span {
  color: var(--FQ-primary);
}
</style>
