# ForensIQ

Nuxt 4 marketing site in **JavaScript** (no TypeScript): a single landing page.

## Getting started

```bash
yarn install
yarn dev       # http://localhost:3000
yarn build     # production build (.output)
yarn preview   # serve the production build
yarn generate  # static export

yarn format        # Prettier over the whole repo
yarn format:check  # verify formatting without writing
```

Node 20+ and Yarn. Formatting is Prettier; there is no lint or test tooling in
this repo.

## Structure

`srcDir` is `app/`, so every Nuxt directory convention lives under it.

```
nuxt.config.js
jsconfig.json
.prettierrc.json          Prettier options (printWidth 100, defaults otherwise)
.prettierignore
.vscode/                  format-on-save + recommended extensions
app/
  assets/css/             main.css (--FQ-* tokens), reset.css, global.css,
                          grid.scss (auto-injected into every SCSS block)
  assets/images/
  constants/              routes.js, typography.js
  components/             Header.vue, Footer.vue
  components/ui-kit/      Button.vue, Input.vue, Tabs.vue, Typography.vue
  composables/            useScrollSpy.js
  layouts/default.vue
  pages/                  index.vue
  views/main-page/        Hero.vue, RequestDemo.vue, and a folder per section
                          that owns copy: Correlations/, CoreCapabilities/ —
                          <Name>.vue next to its <Name>.data.js
```

Auto-imports are on. Components keep Nuxt's path prefix, so `ui-kit/Button.vue`
is `<UiKitButton>`. Files in `app/views/` are **not** auto-imported —
`pages/index.vue` imports them by path — and neither are `@/constants/*`.

## Conventions

- **CSS Modules everywhere**: `<style module lang="scss">` + `$style.foo`. The
  only global stylesheets are `assets/css/global.css` and `Typography.vue`,
  which owns the `.FQ-*` classes.
- `grid.scss` **is auto-injected** into every `<style lang="scss">` block via
  `vite.css.preprocessorOptions`. Use `@include shell;` for the 1120px content
  column; never `@use` or `@import` it in a component.
- **Colours and layout constants are** `--FQ-`* **custom properties** in `main.css`.
  Use the tokens, do not paste hex values into components.
- **Never set** `font-size`**,** `font-weight` **or** `line-height` **directly.** Wrap text
  in `<UiKitTypography>` and pass a style from `constants/typography.js`, which
  holds the seven text styles (`H1 H2 H3 H4 P1 P2 Label`). `Input.vue` is the
  one exception: a native `<input>` cannot be wrapped.
- **Border radius is** `0` everywhere by design.
- **All link targets live in** `constants/routes.js`**.** No hardcoded paths in
  components.
- **Prettier owns formatting.** Options live in `.prettierrc.json`; the whole
  repo is expected to be clean (`yarn format:check`). `.vscode/settings.json`
  turns on format-on-save with the Prettier extension, so no formatting
  decisions belong in review.

## Copy

Copy lives with whatever renders it — there is no shared copy directory. Short
strings are `const`s in the component that shows them. When a section carries
enough copy to crowd the file, it gets a folder with a `<Name>.data.js` beside the
component, which imports it itself: `Correlations/Correlations.data.js` (one entry
per audience tab) and `CoreCapabilities/CoreCapabilities.data.js`. Sections without
one stay flat files. To change copy, edit the component or its data file — nothing
is passed down as props from `pages/index.vue`.

`Correlations.vue` owns the audience tabs and its own `audienceId` state, so the  
switch is scoped to that section and re-renders nothing else. The Core Capabilities  
list is deliberately audience-independent — do not fork it per tab.
