# The Old UI

Props-driven React components and theme tokens in the spirit of PostHog’s dashboard chrome — optimized for Next.js demos and small internal tools.

## Install

```bash
npm install the-old-ui
# or
bun add the-old-ui
```

For full setup instructions, see [`INSTALL.md`](./INSTALL.md).

For AI-readable usage docs, see [`docs/`](./docs/README.md).

## Setup In Your App

Import the library CSS once at your app root. This gives you the theme variables, typography, and component classes.

```tsx
// app/layout.tsx or pages/_app.tsx
import "the-old-ui/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="hedgehog-light">
      <body>{children}</body>
    </html>
  );
}
```

Add the Tailwind preset so `bg-ph-*`, `text-ph-*`, Lemon radii, and shadows resolve correctly.

```ts
// tailwind.config.ts
import theOldUiPreset from "the-old-ui/tailwind-preset";

export default {
  presets: [theOldUiPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./node_modules/the-old-ui/dist/**/*.{js,mjs}",
  ],
};
```

Use components from the package root.

```tsx
import { Button, Card, H1, P } from "the-old-ui";

export function Example() {
  return (
    <Card
      title={<H1>Dashboard</H1>}
      description={<P tone="subtle">Your workspace overview.</P>}
      actions={<Button variant="primary">Create insight</Button>}
    />
  );
}
```

## Component API

Use components through props first. `className` is only an escape hatch for layout or one-off overrides.

```tsx
import { Alert, Badge, Button, Card, Input, H1, H2, P } from "the-old-ui";

<H1>Dashboard</H1>
<H2 tone="subtle">Overview</H2>
<Button variant="primary" size="sm">Save</Button>
<Badge variant="success">Live</Badge>
<Alert status="warning" title="Approaching quota" />
<Input label="Email" error="Required" />
<Card title="Insight saved" description="Dashboard tile copy." />
```

### Exported React Components

| Area | Components |
|------|------------|
| Actions | `Button`, `DropdownButton`, `DropdownMenu`, `DropdownItem` |
| Feedback | `Alert`, `Badge`, `Toast`, `ToastStack`, `EmptyState`, `Progress` demos |
| Inputs | `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Toggle`, `Range`, `Rating`, `FileUpload`, `SearchInput`, `SearchGroup` |
| Layout | `Card`, `Modal`, `Drawer`, `Panel`, `Accordion`, `HoverCard` |
| Navigation | `Tabs`, `Breadcrumbs`, `Pagination`, `SegmentedControl`, `Stepper`, `CommandPalette`, `FilterChips` |
| Data | `Table`, `Stat`, chart components, dashboard shell components |
| Typography | `H1`, `H2`, `H3`, `H4`, `H5`, `P`, `Small`, `Caption`, `Lead`, `Mono`, `Overline`, `Display` |
| Foundation | icons, theme switcher, code block, color tokens |

Some showcase sections are foundation or pattern demos rather than standalone components, such as color tokens, icon inventory, terminal capture, diff slider, and chart/dashboard compositions.

## Layers (take what you need)

| Tier | What you get | Dependencies |
|------|----------------|----------------|
| **CSS tokens** | `src/styles/themes.css` — `[data-theme]` variables (`--ph-*`) | None |
| **Tailwind preset** | `tailwind-preset.ts` — `ph.*` colours, Lemon radii, shadows | `tailwindcss` |
| **App shell** | `src/app/globals.css` — typography, primitives, layouts | Tokens + Tailwind |
| **Charts (optional)** | Token-driven Chart.js demos (`register-chartjs` only registers controllers you use); hog-charts-**lite** canvas trend reads the same `--ph-data-*` palette | `chart.js`, `react-chartjs-2`; trend line also `d3-scale` |

Chart.js supports doughnut, polar area, pie, radar, bubble, etc. — this repo registers **Bar · Doughnut · Polar area** only to keep bundles small; add controllers in `src/lib/chart/register-chartjs.ts` when you need more types.

## Themes

Themes are CSS-variable based. Set `html[data-theme]` to switch palettes — no JS re-render needed.

All theme colors live in `src/styles/themes.css`. The master registry of IDs, display names, and groups lives in `src/themes/registry.ts`.

### Built-in themes

| Group | Light | Dark |
|-------|-------|------|
| **HedgeHog** | `hedgehog-light` | `hedgehog-dark` |
| **Productivity** | `sheets` | `sheets-dark` |
| **Productivity** | `note` | `note-dark` |
| **Productivity** | `presentation` | `presentation-dark` |
| **Social** | `socials` | `socials-dark` |
| **Chats** | `chats-light` | `chats-dark` |
| **Catppuccin** | `catppuccin-light` | `catppuccin-dark` |
| **Xenide** | `xenide-light` | `xenide-dark` |
| **GitHub** | `github-light` | `github-dark` |
| **Rosé Pine** | `rosepine-light` | `rosepine-dark` |
| **Fun** | `turtletime` | `turtletime-dark` |
| **Fun** | `bikini-bottom` | `bikini-bottom-dark` |

### Programmatic usage

```tsx
import { persistTheme, readStoredTheme } from "the-old-ui";

// Switch theme — persists to localStorage and updates html[data-theme]
persistTheme("sheets");

// Read current theme
const themeId = readStoredTheme(); // "hedgehog-light" | "sheets" | ...
```

### Theme switcher setup

Use the built-in theme switcher when you want users to change themes. `ThemeDomSync` reapplies the stored theme after hydration.

```tsx
import { ThemeDomSync, ThemeSwitcher } from "the-old-ui";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeDomSync />
      <header>
        <ThemeSwitcher />
      </header>
      {children}
    </>
  );
}
```

### Manual theme switching

If you do not want the built-in switcher, you can set the attribute directly.

```tsx
document.documentElement.setAttribute("data-theme", "chats-dark");
```

For persisted switching, use the helper.

```tsx
import { persistTheme } from "the-old-ui";

persistTheme("presentation");
```

### Custom themes

Custom themes work like DaisyUI: create a new `data-theme` block and override the semantic `--ph-*` tokens. Components should not need changes.

```css
/* app/globals.css */
@import "the-old-ui/styles.css";

[data-theme="my-theme"] {
  color-scheme: light;

  --ph-canvas: #f8f5ef;
  --ph-surface: #ffffff;
  --ph-muted: #eee8dd;
  --ph-toolbar: #e5dccd;
  --ph-border: #d7cbb8;
  --ph-border-strong: #a99b87;

  --ph-text-primary: #15110c;
  --ph-text-secondary: #4d4337;
  --ph-text-tertiary: #796f63;

  --ph-accent: #f97316;
  --ph-accent-hover: #ea580c;
  --ph-blue: #2563eb;
  --ph-purple: #7c3aed;

  --ph-success: #15803d;
  --ph-warning: #b45309;
  --ph-danger: #dc2626;
  --ph-info: #2563eb;
}
```

Then activate it with:

```tsx
document.documentElement.setAttribute("data-theme", "my-theme");
```

If you want it to appear inside `ThemeSwitcher`, add it to `src/themes/registry.ts` in this repo before building the package.

```ts
{
  id: "my-theme",
  name: "My Theme",
  description: "Custom warm workspace palette.",
  colorScheme: "light",
  group: "Custom",
}
```

### In another Next.js app

1. Install `the-old-ui`.
2. Import `the-old-ui/styles.css` once in your app root.
3. Set `<html data-theme="hedgehog-light">` or use `persistTheme()` / `ThemeSwitcher`.
4. Add `the-old-ui/tailwind-preset` to `tailwind.config.ts`.
5. If you consume this repo through `file:`, add `the-old-ui` to `transpilePackages` in `next.config.mjs`.

Optional chart usage: peer‑install `chart.js` and `react-chartjs-2`, import `@/lib/chart/register-chartjs` once near your chart trees, and pass options built from `usePhChartTokens` / `build*Demo` helpers (or copy the pattern).

## Develop

```bash
bun install   # creates node_modules/ from package.json — do not commit this folder
bun run dev
```

```bash
bunx tsc --noEmit
bun run build
bun run clean   # drops .next/ and TS cache; run before a fresh build if needed
```

### What lives on disk vs what you ship

| Path | Purpose | In git? |
|------|---------|--------|
| `src/` | Your theme + demo app (~76 files) | Yes |
| `package.json` | **8 runtime deps** (Next, React, Chart.js, d3-scale, …) | Yes |
| `node_modules/` | Bun install output (~270MB) — thousands of transitive packages | **No** (`.gitignore`) |
| `.next/` | Next.js build cache (~130MB) | **No** |

You only declare a handful of packages; Bun pulls in the rest (Next alone brings most of `node_modules`). That is normal — delete and recreate anytime with `rm -rf node_modules && bun install`.
# the-old-one-theme
