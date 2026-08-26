<template>
  <component :is="tag" :class="classObject">
    <slot />
  </component>
</template>

<script setup>
import { FAMILIES } from "@/constants/typography";

const props = defineProps({
  type: { type: String, default: undefined },
  as: { type: String, default: "span" },
});

const tag = computed(() => props.as);

const classObject = computed(() => ({
  typography: true,
  ...(props.type ? { [props.type]: true } : {}),
  mono: FAMILIES.MONO.includes(props.type),
}));
</script>

<style lang="scss">
.typography {
  color: var(--FQ-ink);
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  letter-spacing: 0;
}

.mono {
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
}

$fq-styles: (
  "Label" 12px 16px 400 1.1px uppercase,
  "H1" 64px 68px 500 null null,
  "H2" 40px 48px 500 null null,
  "H3" 18px 25px 500 null null,
  "H4" 18px 25px 400 null null,
  "P1" 18px 30px 400 null null,
  "P2" 16px 28px 400 null null
);

@each $name, $size, $line-height, $weight, $letter-spacing, $transform in $fq-styles {
  .FQ-#{$name} {
    font-size: $size;
    line-height: $line-height;
    font-weight: $weight;

    @if $letter-spacing {
      letter-spacing: $letter-spacing;
    }

    @if $transform {
      text-transform: $transform;
    }
  }
}
</style>
