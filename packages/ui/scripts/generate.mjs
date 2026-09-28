#!/usr/bin/env node
/**
 * Generate first-pass components and stories from the manifest.
 *
 * Why generate rather than hand-write: 110 components written by hand over a
 * long session drift — different prop naming, different token usage, different
 * story shape. One emitter per archetype produces a surface that is at least
 * consistent, which is what makes the long tail worth having at all.
 *
 * It never overwrites. A hand-written component always wins, and promoting a
 * generated one to full depth means editing it and flipping `depth` in the
 * manifest.
 */
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPONENTS } from './manifest.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'src', 'components');
mkdirSync(OUT, { recursive: true });

const kebab = (name) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const header = (c) => `/**
 * ${c.name} — ${c.summary}
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */`;

/** Shared prop lines by archetype. */
const EMITTERS = {
  container: (c) => `import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { SpaceScale } from '../lib/tokens.js';

export interface ${c.name}Props {
  children?: ReactNode;
  className?: string;
  gap?: SpaceScale;
  padding?: SpaceScale;
}

${header(c)}
export function ${c.name}({ children, className, gap, padding }: ${c.name}Props) {
  return (
    <div
      className={cn('flex flex-col', className)}
      style={{
        gap: gap ? \`var(--p-space-\${gap})\` : undefined,
        padding: padding ? \`var(--p-space-\${padding})\` : undefined,
      }}
    >
      {children}
    </div>
  );
}
`,

  surface: (c) => `import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Props {
  children?: ReactNode;
  className?: string;
  title?: string;
  /** Rendered after the body. Keep to one primary action. */
  actions?: ReactNode;
}

${header(c)}
export function ${c.name}({ children, className, title, actions }: ${c.name}Props) {
  return (
    <section
      className={cn('flex flex-col gap-[var(--p-space-400)] overflow-hidden', className)}
      style={{
        background: 'var(--p-color-bg-surface)',
        padding: 'var(--p-space-400)',
        borderRadius: 'var(--p-border-radius-300)',
        boxShadow: 'var(--p-shadow-100)',
        outline: 'var(--p-border-width-025) solid var(--p-color-border)',
        outlineOffset: 'calc(var(--p-border-width-025) * -1)',
      }}
    >
      {title ? (
        <h2
          style={{
            fontSize: 'var(--p-font-size-350)',
            fontWeight: 'var(--p-font-weight-semibold)',
            lineHeight: 'var(--p-font-line-height-500)',
          }}
        >
          {title}
        </h2>
      ) : null}
      {children}
      {actions ? <div className="flex gap-[var(--p-space-200)]">{actions}</div> : null}
    </section>
  );
}
`,

  text: (c) => `import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Props {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}

${header(c)}
export function ${c.name}({ children, className, as: Component = 'span' }: ${c.name}Props) {
  return (
    <Component
      className={cn(className)}
      style={{
        fontSize: 'var(--p-font-size-325)',
        lineHeight: 'var(--p-font-line-height-500)',
        color: 'var(--p-color-text)',
      }}
    >
      {children}
    </Component>
  );
}
`,

  action: (c) => `import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

${header(c)}
export const ${c.name} = forwardRef<HTMLButtonElement, ${c.name}Props>(function ${c.name}(
  { children, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center gap-[var(--p-space-100)] rounded-[var(--p-border-radius-200)]',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-1',
        'focus-visible:outline-[var(--p-color-border-focus)]',
        'disabled:pointer-events-none disabled:text-[var(--p-color-text-disabled)]',
        className,
      )}
      style={{ color: 'var(--p-color-text-emphasis)' }}
      {...rest}
    >
      {children}
    </button>
  );
});
`,

  control: (c) => `import { useId, type ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Props {
  /** Always visible. A placeholder is not a label. */
  label: string;
  /** Persistent guidance, shown below the control. */
  helpText?: ReactNode;
  /** Associated with the control, so it is announced on focus. */
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  children?: ReactNode;
}

${header(c)}
export function ${c.name}({
  label,
  helpText,
  error,
  disabled = false,
  className,
  id,
  children,
}: ${c.name}Props) {
  const generated = useId();
  const controlId = id ?? generated;
  const helpId = helpText ? \`\${controlId}-help\` : undefined;
  const errorId = error ? \`\${controlId}-error\` : undefined;

  return (
    <div className={cn('flex flex-col gap-[var(--p-space-100)]', className)}>
      <label
        htmlFor={controlId}
        style={{
          fontSize: 'var(--p-font-size-325)',
          color: disabled ? 'var(--p-color-text-disabled)' : 'var(--p-color-text)',
        }}
      >
        {label}
      </label>
      <div
        id={controlId}
        aria-describedby={[helpId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? true : undefined}
        aria-disabled={disabled || undefined}
      >
        {children}
      </div>
      {helpText ? (
        <p id={helpId} style={{ fontSize: 'var(--p-font-size-300)', color: 'var(--p-color-text-secondary)' }}>
          {helpText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} style={{ fontSize: 'var(--p-font-size-300)', color: 'var(--p-color-text-critical)' }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
`,

  status: (c) => `import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export type ${c.name}Tone = 'info' | 'success' | 'warning' | 'critical';

export interface ${c.name}Props {
  children?: ReactNode;
  className?: string;
  tone?: ${c.name}Tone;
  title?: string;
}

const TONES: Record<${c.name}Tone, { bg: string; text: string }> = {
  info: { bg: 'bg-surface-info', text: 'text-info' },
  success: { bg: 'bg-surface-success', text: 'text-success' },
  warning: { bg: 'bg-surface-warning', text: 'text-caution' },
  critical: { bg: 'bg-surface-critical', text: 'text-critical' },
};

${header(c)}
export function ${c.name}({ children, className, tone = 'info', title }: ${c.name}Props) {
  const t = TONES[tone];
  return (
    <div
      // Announced politely rather than assertively: this reports state, it does
      // not interrupt. Errors that must interrupt use role="alert".
      role={tone === 'critical' ? 'alert' : 'status'}
      className={cn('flex flex-col gap-[var(--p-space-100)]', className)}
      style={{
        background: \`var(--p-color-\${t.bg})\`,
        color: \`var(--p-color-\${t.text})\`,
        padding: 'var(--p-space-300)',
        borderRadius: 'var(--p-border-radius-200)',
      }}
    >
      {title ? <strong style={{ fontWeight: 'var(--p-font-weight-semibold)' }}>{title}</strong> : null}
      {children}
    </div>
  );
}
`,

  overlay: (c) => `import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Props {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

${header(c)}
export function ${c.name}({ open = false, onClose, title, children, className }: ${c.name}Props) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn('flex flex-col gap-[var(--p-space-300)]', className)}
      style={{
        background: 'var(--p-color-bg-surface)',
        padding: 'var(--p-space-400)',
        borderRadius: 'var(--p-border-radius-300)',
        boxShadow: 'var(--p-shadow-400)',
      }}
    >
      {title ? (
        <h2 style={{ fontSize: 'var(--p-font-size-400)', fontWeight: 'var(--p-font-weight-semibold)' }}>
          {title}
        </h2>
      ) : null}
      {children}
      {onClose ? (
        <button type="button" onClick={onClose} style={{ color: 'var(--p-color-text-emphasis)' }}>
          Close
        </button>
      ) : null}
    </div>
  );
}
`,

  list: (c) => `import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Item {
  id: string;
  content: ReactNode;
}

export interface ${c.name}Props {
  items?: ${c.name}Item[];
  className?: string;
  /** Distinguishes "nothing yet" from "the filter matched nothing". */
  isFiltered?: boolean;
  loading?: boolean;
  emptyState?: ReactNode;
}

${header(c)}
export function ${c.name}({ items = [], className, isFiltered = false, loading = false, emptyState }: ${c.name}Props) {
  if (loading) {
    return (
      <div aria-busy="true" className={cn('flex flex-col gap-[var(--p-space-200)]', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-10 animate-pulse"
            style={{ background: 'var(--p-color-bg-fill-disabled)', borderRadius: 'var(--p-border-radius-200)' }}
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={cn('py-[var(--p-space-800)] text-center', className)} style={{ color: 'var(--p-color-text-secondary)' }}>
        {emptyState ?? (isFiltered ? 'No results match these filters.' : 'Nothing here yet.')}
      </div>
    );
  }

  return (
    <ul className={cn('flex flex-col', className)}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            padding: 'var(--p-space-300)',
            borderBlockEnd: 'var(--p-border-width-025) solid var(--p-color-border-secondary)',
          }}
        >
          {item.content}
        </li>
      ))}
    </ul>
  );
}
`,

  media: (c) => `import { cn } from '../lib/cn.js';

export interface ${c.name}Props {
  source?: string;
  /** Empty string marks it decorative; omit it and the image is unlabelled. */
  alt: string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  className?: string;
}

const SIZES: Record<NonNullable<${c.name}Props['size']>, string> = {
  extraSmall: '1.5rem',
  small: '2rem',
  medium: '2.5rem',
  large: '5rem',
};

${header(c)}
export function ${c.name}({ source, alt, size = 'medium', className }: ${c.name}Props) {
  const dimension = SIZES[size];
  return source ? (
    // width and height are set so the box is reserved before the image loads.
    <img
      src={source}
      alt={alt}
      width={dimension}
      height={dimension}
      className={cn('object-cover', className)}
      style={{ width: dimension, height: dimension, borderRadius: 'var(--p-border-radius-200)' }}
    />
  ) : (
    <span
      role="img"
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn('inline-flex items-center justify-center', className)}
      style={{
        width: dimension,
        height: dimension,
        background: 'var(--p-color-bg-fill-secondary)',
        borderRadius: 'var(--p-border-radius-200)',
        color: 'var(--p-color-text-secondary)',
        fontSize: 'var(--p-font-size-300)',
      }}
    >
      {alt ? alt.slice(0, 2).toUpperCase() : null}
    </span>
  );
}
`,

  skeleton: (c) => `import { cn } from '../lib/cn.js';

export interface ${c.name}Props {
  lines?: number;
  className?: string;
}

${header(c)}
export function ${c.name}({ lines = 3, className }: ${c.name}Props) {
  return (
    // aria-hidden: a placeholder has nothing to announce, and announcing it
    // interrupts a screen-reader user with noise while they wait.
    <div aria-hidden className={cn('flex flex-col gap-[var(--p-space-200)]', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse"
          style={{
            background: 'var(--p-color-bg-fill-disabled)',
            borderRadius: 'var(--p-border-radius-100)',
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  );
}
`,

  layout: (c) => `import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Props {
  children?: ReactNode;
  className?: string;
  title?: string;
  /** One primary action per page. */
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
}

${header(c)}
export function ${c.name}({ children, className, title, primaryAction, secondaryActions }: ${c.name}Props) {
  return (
    <div
      className={cn('mx-auto flex w-full max-w-[62.375rem] flex-col gap-[var(--p-space-400)]', className)}
      style={{ padding: 'var(--p-space-400)' }}
    >
      {(title || primaryAction || secondaryActions) && (
        <header className="flex flex-wrap items-center justify-between gap-[var(--p-space-300)]">
          {title ? (
            <h1 style={{ fontSize: 'var(--p-font-size-480)', fontWeight: 'var(--p-font-weight-bold)' }}>
              {title}
            </h1>
          ) : null}
          <div className="flex items-center gap-[var(--p-space-200)]">
            {secondaryActions}
            {primaryAction}
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
`,

  nav: (c) => `import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ${c.name}Item {
  id: string;
  label: string;
  href?: string;
  selected?: boolean;
}

export interface ${c.name}Props {
  items?: ${c.name}Item[];
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

${header(c)}
export function ${c.name}({ items = [], className, ariaLabel = '${c.name}', children }: ${c.name}Props) {
  return (
    <nav aria-label={ariaLabel} className={cn('flex items-center gap-[var(--p-space-100)]', className)}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href ?? '#'}
          // aria-current, not colour alone: the selected state must survive
          // greyscale and reach assistive technology.
          aria-current={item.selected ? 'page' : undefined}
          style={{
            padding: 'var(--p-space-200) var(--p-space-300)',
            borderRadius: 'var(--p-border-radius-200)',
            background: item.selected ? 'var(--p-color-bg-surface-selected)' : undefined,
            color: item.selected ? 'var(--p-color-text-emphasis)' : 'var(--p-color-text)',
            fontWeight: item.selected ? 'var(--p-font-weight-medium)' : undefined,
          }}
        >
          {item.label}
        </a>
      ))}
      {children}
    </nav>
  );
}
`,

  util: (c) => `import type { ReactNode } from 'react';

export interface ${c.name}Props {
  children?: ReactNode;
}

${header(c)}
export function ${c.name}({ children }: ${c.name}Props) {
  return <>{children}</>;
}
`,
};

/** A story per component. Same shape everywhere, so the catalogue reads evenly. */
function story(c) {
  const args = {
    container: `{ children: 'Content' }`,
    surface: `{ title: '${c.name}', children: 'Content' }`,
    text: `{ children: '${c.name}' }`,
    action: `{ children: '${c.name}' }`,
    control: `{ label: '${c.name}', helpText: 'Persistent guidance for this field.' }`,
    status: `{ title: '${c.name}', children: 'Something happened worth reporting.' }`,
    overlay: `{ open: true, title: '${c.name}', children: 'Overlay content.' }`,
    list: `{ items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] }`,
    media: `{ alt: 'Example' }`,
    skeleton: `{ lines: 3 }`,
    layout: `{ title: '${c.name}', children: 'Page content.' }`,
    nav: `{ items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] }`,
    util: `{ children: 'Wrapped content.' }`,
  }[c.archetype];

  // A hand-written component has its own prop shape; the archetype default
  // will not typecheck against it.
  const finalArgs = c.storyArgs ?? args;

  const extra = {
    control: `\nexport const WithError: Story = { args: { error: 'Enter a value to continue.' } };\nexport const Disabled: Story = { args: { disabled: true } };`,
    status: `\nexport const Critical: Story = { args: { tone: 'critical' } };\nexport const Success: Story = { args: { tone: 'success' } };\nexport const Warning: Story = { args: { tone: 'warning' } };`,
    list: `\nexport const Loading: Story = { args: { loading: true, items: [] } };\nexport const EmptyFirstRun: Story = { args: { items: [] } };\nexport const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };`,
    media: `\nexport const WithImage: Story = { args: { source: 'https://placehold.co/80', alt: 'Example product' } };\nexport const Large: Story = { args: { size: 'large' } };`,
  }[c.archetype] ?? '';
  const finalExtra = c.storyExtra === 'none' ? '' : extra;

  return `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${c.name} } from './${kebab(c.name)}.js';

const meta = {
  title: '${c.group}/${c.name}',
  component: ${c.name},
  parameters: {
    docs: {
      description: {
        component: '${c.summary.replace(/'/g, "\\'")} FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: ${finalArgs},
} satisfies Meta<typeof ${c.name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};${finalExtra}
`;
}

let created = 0;
let skipped = 0;
const emitted = [];

for (const c of COMPONENTS) {
  const file = join(OUT, `${kebab(c.name)}.tsx`);
  const storyFile = join(OUT, `${kebab(c.name)}.stories.tsx`);

  if (existsSync(file)) {
    skipped++;
  } else {
    const emit = EMITTERS[c.archetype];
    if (!emit) throw new Error(`no emitter for archetype "${c.archetype}" (${c.name})`);
    writeFileSync(file, emit(c));
    created++;
    emitted.push(c);
  }
  if (!existsSync(storyFile)) writeFileSync(storyFile, story(c));
}

// The barrel is regenerated wholesale so it can never drift from the directory.
const exports = COMPONENTS.map(
  (c) => `export { ${c.name}, type ${c.name}Props } from './components/${kebab(c.name)}.js';`,
).join('\n');

writeFileSync(
  join(HERE, '..', 'src', 'index.ts'),
  `// GENERATED in part by scripts/generate.mjs — component exports are rebuilt
// from the manifest, so this file cannot drift from the directory.
export { cn } from './lib/cn.js';
export * from './lib/tokens.js';

${exports}
`,
);

console.log(`generated ${created} components, kept ${skipped} hand-written`);
console.log(`total in manifest: ${COMPONENTS.length}`);
