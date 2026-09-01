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

Prettier is the only tooling — there is no linter and no test runner.

## Structure

`srcDir` is `app/`, so every Nuxt directory convention lives under it.

```
app/
  assets/css/        main.scss (--FQ-* tokens), grid.scss (tiers + mixins),
                     reset.css, global.css
  assets/images/
  constants/         routes.js, typography.js
  components/        Header, Footer, Card, CardGrid, SectionIntro (composites)
  components/ui-kit/ Button, Input, Toast, Typography      (primitives)
  pages/             index.vue
  error.vue          404 / error page (Nuxt error boundary)
  views/main-page/   Hero.vue, RequestDemo.vue, plus a folder per section
                     with copy: Audiences/, HowItWorks/, CoreCapabilities/
server/api/          demo-request.post.js — the only server route
server/plugins/      check-env.js — warns at boot about missing env
server/utils/        mailer.js — which env vars the route needs
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

| Tier | min-width | SCSS                            |
| ---- | --------- | ------------------------------- |
| 1920 | 1920      | `@include wide` — content locks |
| 1440 | 1440      | base (`:root` in `main.scss`)   |
| 1200 | 1200      | `@include below(w1440)`         |
| 960  | 960       | `@include below(w1200)`         |
| 760  | 760       | `@include below(w960)`          |
| 320  | 320       | `@include below(w760)`          |

`below(x)` means _narrower than frame x_, so each cap is that frame's width minus
one. Tiers are named after their frame so the two cannot drift apart.

Layout tokens (gutter, section padding, card padding) switch per tier in
`main.scss`; text sizes switch per tier inside `Typography.vue`. Sections never
resize type themselves.

`<main>` is one grid — `@include shell` — whose named columns carry the layout:
`bleed` reaches both viewport edges and `content` is the column, `--FQ-content`
wide (viewport minus gutters until 1920, 1070px above it). Sections are full-bleed
rows stacked edge to edge, with no gap between siblings and no page-level rhythm:
`@include band` puts a section on `bleed`, gives it `--FQ-section-py`, and repeats
the shell's columns as a subgrid, so the section's own children place themselves
with `grid-column: content` instead of sitting in a wrapper div.

`CardGrid` takes a column count per tier: `columns` (≥1200), `w960` (960–1199,
falls back to `columns`), `w760` (760–959, falls back to `w960`), one below 760.

## Conventions

- CSS Modules everywhere: `<style module lang="scss">` + `$style.foo`. The only
  global stylesheets are `global.css` and `Typography.vue`, which owns `.FQ-*`.
- Colours and layout constants are `--FQ-*` custom properties in `main.scss`, named
  after the design variables. Never paste a hex value into a component.
- Never set `font-size`, `font-weight` or `line-height` directly. Wrap text in
  `<UiKitTypography>` with a style from `constants/typography.js` (`H1 H2 H4 P1 P2
LABEL P12M BUTTON_M BUTTON_L`). `Input.vue` is the one exception — a native `<input>`
  cannot be wrapped.
- Border radius is `0` everywhere, by design.
- Never use a negative margin. Restructure instead.
- All link targets live in `constants/routes.js`.
- Prettier owns formatting (`.prettierrc.json`), so
  no formatting decisions belong in review.

## Copy

Copy lives with whatever renders it — there is no shared copy directory. Short
strings are `const`s in the component. A section with bulk copy gets a folder and a
`<Name>.data.js` it imports itself; `pages/index.vue` passes nothing down as props.

## Known gaps

- The demo form posts to a mailing list. Copy `.env.example` to `.env` and fill
  it in; the server warns at boot about anything missing and the route answers 503 until it
  is complete. `yarn generate` drops the route entirely — the static export has no server.
- Two audience cards share body text: the design has no final content there yet.
- `public/og-default.png` (1200×630) is missing.
