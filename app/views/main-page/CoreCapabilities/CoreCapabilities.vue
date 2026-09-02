<template>
  <FqSection>
    <SectionIntro :title="CAPABILITIES.title" :lead="CAPABILITIES.lead" />

    <CardGrid :columns="3" :columns-below-960="2">
      <li v-for="item in CAPABILITIES.items" :key="item.label">
        <Card :label="item.label" :title="item.title">
          <template #illustration>
            <img :src="item.illustration" alt="" width="104" height="104" />
          </template>
          {{ item.body }}
        </Card>
      </li>
    </CardGrid>
  </FqSection>
</template>

<script setup>
import CAPABILITIES from "./CoreCapabilities.data";
</script>
