<template>
  <section :class="$style.section">
    <SectionIntro title="Core capabilities" :lead="LEAD" />

    <CardGrid :columns="3" :w760="2">
      <li v-for="item in CAPABILITIES" :key="item.label">
        <Card :label="item.label" :title="item.title">
          <template #illustration>
            <img :src="item.illustration" alt="" width="104" height="104" />
          </template>
          {{ item.body }}
        </Card>
      </li>
    </CardGrid>
  </section>
</template>

<script setup>
import CAPABILITIES from "./CoreCapabilities.data";

const LEAD =
  "Connect evidence and intelligence to investigate your case. Unlock the full potential of your data with AI-driven capabilities designed for modern forensic challenges.";
</script>

<style module lang="scss">
.section {
  @include band;

  row-gap: var(--FQ-gap-block);

  > * {
    grid-column: content;
  }
}
</style>
