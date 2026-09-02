# ForensIQ

Single-page Nuxt 4 marketing site. Plain JavaScript, no TypeScript.

## Getting started

Node 20+ and Yarn.

```bash
yarn install
yarn dev       # http://localhost:3000
yarn build     # production build (.output)
yarn preview   # serve the production build
yarn generate  # static export

yarn format        # Prettier over the whole repo
yarn format:check  # verify formatting without writing
```

Prettier is the only project check — there is no linter or test command.

## Structure

`srcDir` is `app/`, so every Nuxt directory convention lives under it.

```
app/
  assets/css/        main.scss (palette), grid.scss (tiers + mixins),
                     reset.css, global.scss
  assets/images/
  constants/         routes.js, typography.js
  components/        FqSection, Header, Footer, Card, CardGrid, SectionIntro (composites)
  components/ui-kit/ Button, Input, Toast, Typography      (primitives)
  layouts/default.vue one Header/Footer and the named page grid
  pages/             index.vue
  error.vue          404 / error page (Nuxt error boundary)
  views/main-page/   each section and its local .data.js copy module
server/api/          demo-request.post.js — the only server route
server/plugins/      check-env.js — warns at boot about missing env
server/utils/        mailer.js — which env vars the route needs
shared/              demo-request-validation.js for client and server
```

Auto-imports are on and keep Nuxt's path prefix: `ui-kit/Button.vue` is
`<UiKitButton>`, `Card.vue` is `<Card>`. `app/views/` and `@/constants/*` are the
exceptions — `pages/index.vue` imports those by path.

**ui-kit vs components.** A repeated _primitive_ (button, input, typography) goes in
`components/ui-kit/`. A repeated _composite_ built from primitives (card, card grid)
is a plain component in `components/`. Sections never repeat that markup inline.

## Layout tiers

Six tiers, one per design frame, desktop-first. Never write a raw media query —
`grid.scss` is auto-injected into every SCSS block and provides the mixins.

| Tier | min-width | SCSS                 |
| ---- | --------- | -------------------- |
| 1920 | 1920      | base                 |
| 1440 | 1440      | `@include below1920` |
| 1200 | 1200      | `@include below1440` |
| 960  | 960       | `@include below1200` |
| 760  | 760       | `@include below960`  |
| 320  | 320       | `@include below760`  |

Each `below<frame>` mixin means _narrower than that frame_, so its cap is the
frame's width minus one. Tiers are named after their frame so the two cannot drift
apart.

`main.scss` owns only the reusable palette. Text sizes switch per tier inside
`Typography.vue`; sections never resize type themselves.

`layouts/default.vue` owns the one `@include page-shell` grid for normal pages:
Header, `main`, and each section use its subgrid. The four named spans are
`viewport`, `content-wide`, `content`, and `content-narrow`. Above 1920, content
locks to 1070px; below it, content is the viewport minus the responsive gutters.
`FqSection` spans `viewport` and puts ordinary slot content on `content` by
default. Sections stack edge to edge with no page-level vertical rhythm; a section
owns its surface, padding, and content gap. A local CSS custom property exists only
where a current section actually needs to pass an override through `FqSection`.

`CardGrid` takes a column count per threshold: `columns` (≥1200),
`columnsBelow1200` (960–1199, falling back to `columns`), and `columnsBelow960`
(760–959, falling back to `columnsBelow1200`), then one column below 760.

## Conventions

- CSS Modules everywhere: `<style module lang="scss">` + `$style.foo`. The only
  global stylesheets are `global.scss` and `Typography.vue`, which owns `.FQ-*`.
- Only the reusable palette is global (`--FQ-*` in `main.scss`). Layout, spacing,
  and single-component colours live with their owning layout or component. Do not
  add a custom property for a hypothetical override.
- Never set `font-size`, `font-weight` or `line-height` directly. Wrap text in
  `<UiKitTypography>` with a style from `constants/typography.js` (`H1 H2 H4 P1 P2 LABEL P12M BUTTON_M BUTTON_L`). `Input.vue` is the one exception — a native `<input>`
  cannot be wrapped.
- Border radius is `0` everywhere, by design.
- Never use a negative margin. Restructure instead.
- All link targets live in `constants/routes.js`.
- Prettier owns formatting (`.prettierrc.json`), so
  no formatting decisions belong in review.

## Copy and validation

Immutable public copy lives in each section's local `<Name>.data.js`; page composition
passes no copy down as props. `shared/demo-request-validation.js` owns the demo form
rules and is imported with Nuxt's built-in `#shared` alias by both the client and server.

## Known gaps

- The demo form posts to a mailing list. Copy `.env.example` to `.env` and fill  
  it in; the server warns at boot about anything missing and the route answers 503 until it  
  is complete. `yarn generate` drops the route entirely — the static export has no server
