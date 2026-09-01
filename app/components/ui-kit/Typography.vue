<template>
  <component :is="as" :class="['typography', type]">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  type: { type: String, default: undefined },
  as: { type: String, default: "span" },
});
</script>

<style lang="scss">
@use "sass:map";
@use "sass:list";

.typography {
  color: var(--FQ-primary);
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  letter-spacing: 0;
}

.FQ-Label {
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
}

$fq-styles: (
  "Label": (
    desktop: 12px 16px,
    weight: 400,
    spacing: 1.1px,
    transform: uppercase,
  ),
  "H1": (
    desktop: 64px 68px,
    wide: 72px 76px,
    tablet: 40px 48px,
    phone-wide: 30px 40px,
    weight: 500,
  ),
  "H2": (
    desktop: 40px 48px,
    wide: 44px 52px,
    tablet: 30px 38px,
    phone-wide: 24px 32px,
    weight: 500,
  ),
  "H3": (
    desktop: 18px 25px,
    weight: 500,
  ),
  "P1": (
    desktop: 18px 30px,
    weight: 400,
  ),
  "P2": (
    desktop: 16px 28px,
    weight: 400,
  ),
  "P3": (
    desktop: 18px 30px,
    tablet: 16px 28px,
    phone-wide: 14px 26px,
    weight: 400,
  ),
);

@mixin size($pair) {
  font-size: list.nth($pair, 1);
  line-height: list.nth($pair, 2);
}

@each $name, $style in $fq-styles {
  .FQ-#{$name} {
    @include size(map.get($style, desktop));

    font-weight: map.get($style, weight);

    @if map.has-key($style, spacing) {
      letter-spacing: map.get($style, spacing);
    }

    @if map.has-key($style, transform) {
      text-transform: map.get($style, transform);
    }

    @if map.has-key($style, wide) {
      @include wide {
        @include size(map.get($style, wide));
      }
    }

    @each $bp, $width in $breakpoints {
      @if map.has-key($style, $bp) {
        @include below($bp) {
          @include size(map.get($style, $bp));
        }
      }
    }
  }
}
</style>
