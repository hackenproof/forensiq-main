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
  components/        Header, Footer, Card, CardGrid        (composites)
  components/ui-kit/ Button, Input, Typography             (primitives)
  layouts/           default.vue
  pages/             index.vue
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

Seven tiers, desktop-first. Never write a raw media query — `grid.scss` is
auto-injected into every SCSS block and provides the mixins.

| Tier        | min-width | SCSS                                            |
| ----------- | --------- | ----------------------------------------------- |
| wide        | 1920      | `@include wide`                                 |
| desktop     | 1340      | base (`:root` in `main.scss`)                   |
| laptop      | 1140      | `@include below(desktop)`                       |
| tablet-wide | 960       | `@include below(laptop)` — tablet layout starts |
| tablet      | 744       | `@include below(tablet-wide)`                   |
| phone-wide  | 480       | `@include below(tablet)` — mobile layout starts |
| phone       | 322       | `@include below(phone-wide)`                    |

`below(x)` means _narrower than tier x_, so each cap is that tier's min minus one.
Layout tokens (gutter, gaps, card padding) switch per tier in `main.scss`; text
sizes switch per tier inside `Typography.vue`. Sections never resize type
themselves. `CardGrid` takes a column count per tier: `columns` (≥1140),
`tabletWide` (960–1139, falls back to `tablet`), `tablet` (744–959), one below 744.

Use `@include shell;` for the content column (1124px plus the gutter).

## Conventions

- CSS Modules everywhere: `<style module lang="scss">` + `$style.foo`. The only
  global stylesheets are `global.css` and `Typography.vue`, which owns `.FQ-*`.
- Colours and layout constants are `--FQ-*` custom properties in `main.scss`, named
  after the design variables. Never paste a hex value into a component.
- Never set `font-size`, `font-weight` or `line-height` directly. Wrap text in
  `<UiKitTypography>` with a style from `constants/typography.js` (`H1 H2 H3 P1 P2
P3 Label`). `Input.vue` is the one exception — a native `<input>` cannot be wrapped.
- Border radius is `0` everywhere, by design.
- Never use a negative margin. Restructure instead.
- All link targets live in `constants/routes.js`.
- Prettier owns formatting (`.prettierrc.json`, format-on-save via `.vscode/`), so
  no formatting decisions belong in review.

## Copy

Copy lives with whatever renders it — there is no shared copy directory. Short
strings are `const`s in the component. A section with bulk copy gets a folder and a
`<Name>.data.js` it imports itself; `pages/index.vue` passes nothing down as props.

## Known gaps

- The demo form posts to a mailing list. Copy `.env.example` to `.env` and fill
  it in; the server warns at boot about anything missing and the route answers 503 until it
  is complete. `yarn generate` drops the route entirely — the static export has no server.
- Core capabilities cards 5–6 reuse the "AI Investigator" illustration, and two
  audience cards share body text: the design has no final content there yet.
- `public/og-default.png` (1200×630) is missing.
