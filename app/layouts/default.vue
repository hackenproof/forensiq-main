<template>
  <div :class="$style.bodyContainer" id="body-container">
    <div :class="$style.shell">
      <Header :class="$style.header" />
      <main :class="$style.main"><slot /></main>
    </div>
    <Footer :class="$style.footer" />
  </div>
</template>

<style module lang="scss">
.bodyContainer {
  overflow-x: clip;
}

.shell {
  --page-gutter: 108px;
  --page-content: 1070px;
  --page-content-wide: var(--page-content);
  --page-content-narrow: var(--page-content);

  @include page-shell;

  @include below1920 {
    --page-content: calc(100% - var(--page-gutter) * 2);
  }

  @include below1440 {
    --page-gutter: 40px;
  }

  @include below960 {
    --page-gutter: 16px;
  }
}

.header,
.main {
  grid-column: viewport;
}

.main {
  display: grid;
  grid-template-columns: subgrid;
}
</style>
