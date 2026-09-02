<template>
  <component :is="as" :class="type">
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

.FQ-Label,
.FQ-P12M,
.FQ-Button16 {
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
}

$fq-styles: (
  "Label": (
    desktop: 12px 12px,
    weight: 400,
    spacing: 1.1px,
    transform: uppercase,
  ),
  "P12M": (
    desktop: 12px 12px,
    weight: 500,
    spacing: 1.1px,
    transform: uppercase,
  ),
  "Button16": (
    desktop: 16px 16px,
    w760: 12px 12px,
    weight: 500,
    spacing: 1.1px,
    transform: uppercase,
  ),
  "H1": (
    desktop: 74px normal,
    w1440: 64px normal,
    w960: 40px normal,
    weight: 500,
  ),
  "H2": (
    desktop: 40px 48px,
    w760: 24px normal,
    weight: 500,
  ),
  "H4": (
    desktop: 18px 25px,
    weight: 500,
  ),
  "P1": (
    desktop: 18px 30px,
    w760: 16px 28px,
    weight: 400,
  ),
  "P2": (
    desktop: 16px 28px,
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

    @if map.has-key($style, w1920) {
      @include below1920 {
        @include size(map.get($style, w1920));
      }
    }

    @if map.has-key($style, w1440) {
      @include below1440 {
        @include size(map.get($style, w1440));
      }
    }

    @if map.has-key($style, w1200) {
      @include below1200 {
        @include size(map.get($style, w1200));
      }
    }

    @if map.has-key($style, w960) {
      @include below960 {
        @include size(map.get($style, w960));
      }
    }

    @if map.has-key($style, w760) {
      @include below760 {
        @include size(map.get($style, w760));
      }
    }
  }
}
</style>
