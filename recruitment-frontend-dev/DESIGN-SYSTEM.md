# Design System Guide

This guide explains how to use the typography and color system implemented in this project.

## Table of Contents
- [Typography](#typography)
  - [Available Typography Components](#available-typography-components)
  - [How to Use Typography Components](#how-to-use-typography-components)
  - [Typography Specifications](#typography-specifications)
- [Colors](#colors)
  - [Color Palette](#color-palette)
  - [How to Use Colors](#how-to-use-colors)
- [Implementation Details](#implementation-details)
  - [File Structure](#file-structure)
  - [How It Works](#how-it-works)

## Typography

The typography system is based on the Inter font and provides consistent text styles across the application.

### Available Typography Components

The following typography components are available:

| Component | Use Case | Font Size | Line Height | Font Weight |
|-----------|----------|-----------|-------------|-------------|
| `<H1>` | Main headings | 32px (2rem) | 40px (2.5rem) | Bold (700) |
| `<H2>` | Section headings | 24px (1.5rem) | 32px (2rem) | Bold (700) |
| `<H3>` | Subsection headings | 20px (1.25rem) | 28px (1.75rem) | Bold (700) |
| `<Emphasis>` | Emphasized text | 16px (1rem) | 24px (1.5rem) | Bold (700) |
| `<ButtonText>` | Button labels | 14px (0.875rem) | 20px (1.25rem) | Medium (500) |
| `<Body>` | Regular body text | 16px (1rem) | 24px (1.5rem) | Regular (400) |
| `<Faint>` | Secondary/faint text | 14px (0.875rem) | 20px (1.25rem) | Regular (400) |

### How to Use Typography Components

Import the typography components from the typography module:

```jsx
import { H1, H2, H3, Emphasis, ButtonText, Body, Faint } from '@/components/ui/typography';

// Example usage
function MyComponent() {
  return (
    <div>
      <H1>Main Heading</H1>
      <H2>Section Heading</H2>
      <H3>Subsection Heading</H3>
      <Emphasis>This text is emphasized</Emphasis>
      <Body>This is regular body text for paragraphs and general content.</Body>
      <Faint>This is secondary or less important text.</Faint>
      <Button><ButtonText>Button Label</ButtonText></Button>
    </div>
  );
}
```

All typography components accept standard HTML attributes and an additional `className` prop for custom styling:

```jsx
<H1 className="mb-4 text-primary">Custom Styled Heading</H1>
```

### Typography Specifications

- **Font Family**: Inter (with system fallbacks)
- **Base Font**: 16px (1rem)
- **Scale**: Custom scale based on design specifications
- **Weights Used**: 400 (Regular), 500 (Medium), 700 (Bold)

## Colors

The color system provides a consistent color palette for the application.

### Color Palette

| Color Name | Hex Value | Use Case |
|------------|-----------|----------|
| Primary | #5B20B7 | Primary actions, key UI elements |
| Secondary | #8C32E0 | Secondary actions, supporting UI elements |
| Secondary-400 | #A46AE4 | Lighter secondary color |
| Secondary-300 | #D4B8E4 | Lightest secondary color |
| Error | #F52323 | Error states, destructive actions |
| Success | #2EB857 | Success states, confirmations |
| Text | #000000 | Default text color |
| Text-Secondary | #F5F5F5 | Secondary text color (on dark backgrounds) |

### How to Use Colors

Use the provided CSS classes to apply colors:

**Background Colors:**
```jsx
<div className="bg-primary">Primary background</div>
<div className="bg-secondary-400">Secondary-400 background</div>
<div className="bg-error">Error background</div>
```

**Text Colors:**
```jsx
<p className="text-white">White text (for dark backgrounds)</p>
<p className="text-black">Black text (for light backgrounds)</p>
```

**Combined Example:**
```jsx
<div className="bg-primary">
  <p className="text-white">White text on primary background</p>
</div>
```

## Implementation Details

### File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── typography.jsx    # Typography components
│   │   └── ...
│   ├── ColorDemo.jsx         # Color system demo
│   └── TypographyDemo.jsx    # Typography system demo
├── styles/
│   ├── colors.css            # Color definitions
│   └── typography.css        # Typography definitions
└── ...
```

### How It Works

1. **Typography System**:
   - Typography styles are defined in `src/styles/typography.css`
   - React components in `src/components/ui/typography.jsx` use these styles
   - The Inter font is loaded from Google Fonts in `index.html`

2. **Color System**:
   - Color styles are defined in `src/styles/colors.css`
   - These styles provide CSS classes for backgrounds and text colors
   - Colors are also defined in `tailwind.config.js` for Tailwind integration

3. **Integration**:
   - Both CSS files are imported in `main.jsx` to ensure global availability
   - Components use the defined classes for consistent styling

## Best Practices

1. **Always use the typography components** instead of raw HTML elements to ensure consistency.
2. **Use the color classes** for all color applications to maintain a consistent look.
3. **Refer to the demos** (TypographyDemo and ColorDemo) if you're unsure about which style to use.
4. **Extend, don't override** - If you need a new style, extend the existing system rather than creating one-off styles.

## Demo Pages

The application includes demo pages that showcase all available typography styles and colors:

- **Typography Demo**: Shows all typography components with their specifications
- **Color Demo**: Displays all colors in the system with their class names

These demos serve as a living style guide for the application.
