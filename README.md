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
  assets/css/             main.scss (--FQ-* tokens per breakpoint), reset.css, global.css,
                          grid.scss (breakpoints + mixins, auto-injected into every SCSS block)
  assets/images/
  constants/              routes.js, typography.js
  components/             Header.vue, Footer.vue, Card.vue, CardGrid.vue   (composites)
  components/ui-kit/      Button.vue, Input.vue, Typography.vue            (primitives)
  layouts/default.vue
  pages/                  index.vue
  views/main-page/        Hero.vue, RequestDemo.vue, and a folder per section
                          that owns copy: Audiences/, HowItWorks/, CoreCapabilities/ —
                          <Name>.vue next to its <Name>.data.js
```

Auto-imports are on. Components keep Nuxt's path prefix, so `ui-kit/Button.vue`
is `<UiKitButton>` and `Card.vue` is `<Card>`. Files in `app/views/` are **not**
auto-imported — `pages/index.vue` imports them by path — and neither are
`@/constants/*`.

**UI kit vs components.** A repeated _primitive_ (button, input, typography, table
row/cell…) belongs in `components/ui-kit/`. A repeated _composite_ built from
primitives (a card, a card grid) is a plain component in `components/`. Sections
never repeat that markup inline.

## Conventions

- **CSS Modules everywhere**: `<style module lang="scss">` + `$style.foo`. The
  only global stylesheets are `assets/css/global.css` and `Typography.vue`,
  which owns the `.FQ-*` classes.
- `grid.scss` **is auto-injected** into every `<style lang="scss">` block via
  `vite.css.preprocessorOptions`. Use `@include shell;` for the content column
  (1124px plus the gutter); never `@use` or `@import` it in a component.
- **Seven layout tiers, no raw media queries.** Tiers by min-width: phone 322,
  phone-wide 480, tablet 744, tablet-wide 960, laptop 1140, desktop 1340, wide 1920.
  `grid.scss` holds them as max-width caps (`below(x)` = narrower than tier x, so each
  value is that tier's min minus 1) plus `@include wide` for the one min-width tier.
  Layout tokens (gutter, gaps, card padding) switch per tier in `main.scss`; text sizes
  switch per tier inside `Typography.vue`, so sections never resize type themselves.
  `CardGrid` has a column count per tier: `columns` (≥1140), `tabletWide` (960–1139,
  falls back to `tablet`), `tablet` (744–959), one column below 744.
- **Colours and layout constants are** `--FQ-`* **custom properties** in `main.scss`,
  named after the design variables (`--FQ-grey-95`, `--FQ-primary`, `--FQ-accent-1`).
  Use the tokens, do not paste hex values into components.
- **Never set** `font-size`**,** `font-weight` **or** `line-height` **directly.** Wrap text
  in `<UiKitTypography>` and pass a style from `constants/typography.js`
  (`H1 H2 H3 P1 P2 P3 Label`; `P3` is a `P1` that shrinks on the small tiers). `Input.vue`
  is the one exception: a native `<input>` cannot be wrapped.
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
component, which imports it itself: `Audiences/Audiences.data.js` (one entry per
audience band), `HowItWorks/HowItWorks.data.js` and
`CoreCapabilities/CoreCapabilities.data.js`. Sections without one stay flat files.
To change copy, edit the component or its data file — nothing is passed down as
props from `pages/index.vue`.

## Known gaps

- The demo form validates client-side only and is not connected to a backend.
- Core capabilities cards 5–6 reuse the "AI Investigator" illustration and two
  audience cards share body text: the design has no final content there yet.
- `public/og-default.png` (1200×630) is missing.
