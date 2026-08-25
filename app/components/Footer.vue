<template>
  <footer :class="$style.footer">
    <div :class="$style.inner">
      <UiKitTypography :type="MAP.LABEL" as="p" :class="$style.text">
        {{ COPYRIGHT }}
      </UiKitTypography>

      <ul :class="$style.links">
        <li v-for="link in LINKS" :key="link.label">
          <a v-if="link.href" :class="$style.link" :href="link.href" rel="noopener" target="_blank">
            <UiKitTypography :type="MAP.LABEL">{{ link.label }}</UiKitTypography>
          </a>
          <UiKitTypography v-else :type="MAP.LABEL" :class="$style.stub">
            {{ link.label }}
          </UiKitTypography>
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
  border-top: 1px solid var(--FQ-border-strong);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--FQ-header-w);
  height: 80px;
  margin-inline: auto;
  padding-inline: var(--FQ-gutter);
}

.text {
  color: var(--FQ-ink-soft);
}

.links {
  display: flex;
  gap: 32px;
}

.stub {
  color: var(--FQ-ink-soft);
}

.link span {
  color: var(--FQ-ink-soft);
  transition: color 160ms ease;
}

.link:hover span {
  color: var(--FQ-ink);
}
</style>
