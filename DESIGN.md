# Design System

## Framework

- The UI uses Bootstrap 5 with React Bootstrap for interactive components such as the navigation bar.
- Markdown content renders with `react-markdown`.

## Styling

- [`src/app/globals.scss`](src/app/globals.scss) imports the full Bootstrap Sass bundle with no overrides.
- Style elements with Bootstrap utility and component classes, such as `card`, `alert`, `btn-group`, and `d-flex`. There is no custom CSS.

## Tokens

- Colors, spacing, and radius use Bootstrap defaults.
- The body font is Inter, loaded with `next/font/google` in [`src/app/layout.tsx`](src/app/layout.tsx).

## Layout

- The root layout is a full-height flex column with the navigation bar above a padded Bootstrap `container`.
- [`src/components/navigation-bar.tsx`](src/components/navigation-bar.tsx) shows the icon and name as the brand, with an About link that collapses on small screens.
- Room pages use [`src/components/room-container.tsx`](src/components/room-container.tsx), which shows a tip alert above a card whose header holds the room title and score.

## Components

- Answer choices are Bootstrap buttons in a `btn-group`.
- Errors and blocked states use `alert alert-danger`, and [`src/components/load-error.tsx`](src/components/load-error.tsx) handles failed content loads.
- Award images are SVG files in `public/assets/`.
