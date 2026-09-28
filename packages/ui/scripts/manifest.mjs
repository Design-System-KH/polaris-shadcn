/**
 * The Polaris component surface, as a manifest.
 *
 * Every component Polaris 13 exports, with the Storybook taxonomy slot it
 * belongs in and the archetype that decides how a first-pass implementation is
 * shaped. Hand-written components are listed too, marked `depth: 'full'`, so
 * this file is the single answer to "what exists and how finished is it".
 *
 * archetype:
 *   container  wraps children, token-driven spacing and surface props
 *   surface    a bordered/padded region with optional header and footer
 *   text       typographic output
 *   action     button-like, focusable, disableable
 *   control    form control: label, help text, error, disabled
 *   status     tone-carrying feedback, never colour alone
 *   overlay    Radix-backed, needs focus management
 *   list       a collection with empty and loading states
 *   media      image-ish, needs alt text and a fallback
 *   skeleton   loading placeholder, aria-hidden
 *   layout     page-level structure
 *   nav        wayfinding
 *   util       behavioural, renders nothing or almost nothing
 */

export const COMPONENTS = [
  // ---- already hand-written -------------------------------------------------
  { name: 'Box', group: 'primitives', archetype: 'container', depth: 'full', summary: 'The layout primitive every other component is built from.' },
  { name: 'BlockStack', group: 'primitives', archetype: 'container', depth: 'full', summary: 'Vertical stack with token-scale spacing.' },
  { name: 'InlineStack', group: 'primitives', archetype: 'container', depth: 'full', summary: 'Horizontal stack that wraps by default.' },
  { name: 'InlineGrid', group: 'primitives', archetype: 'container', depth: 'full', summary: 'Equal-width column grid.' },
  { name: 'Bleed', group: 'primitives', archetype: 'container', depth: 'full', summary: 'Escapes a parent padding for full-bleed content.' },
  { name: 'Divider', group: 'primitives', archetype: 'container', depth: 'full', storyArgs: '{}', summary: 'Decorative horizontal rule.' },
  { name: 'Text', group: 'primitives', archetype: 'text', depth: 'full', summary: 'All text output. Element and size are separate decisions.' },
  { name: 'Button', group: 'primitives', archetype: 'action', depth: 'full', summary: 'The primary interactive control.' },
  { name: 'Card', group: 'components', archetype: 'surface', depth: 'full', storyArgs: "{ children: 'Card content' }", summary: 'The default grouping surface.' },
  { name: 'Badge', group: 'components', archetype: 'status', depth: 'full', storyArgs: "{ children: 'Fulfilled', tone: 'success' }", storyExtra: 'none', summary: 'Status as a label; colour never carries meaning alone.' },

  // ---- layout and structure -------------------------------------------------
  { name: 'Grid', group: 'primitives', archetype: 'container', summary: 'Responsive 12-column grid with per-breakpoint spans.' },
  { name: 'Layout', group: 'layout', archetype: 'layout', summary: 'Page body regions: primary and secondary sections.' },
  { name: 'Page', group: 'layout', archetype: 'layout', summary: 'Page shell: title, breadcrumbs, primary action, secondary actions.' },
  { name: 'PageActions', group: 'layout', archetype: 'layout', summary: 'Primary and secondary actions at the foot of a page.' },
  { name: 'Frame', group: 'layout', archetype: 'layout', summary: 'Application shell hosting nav, top bar, toasts and loading.' },
  { name: 'FullscreenBar', group: 'layout', archetype: 'layout', summary: 'Bar shown while in a fullscreen editing context.' },
  { name: 'ContextualSaveBar', group: 'layout', archetype: 'layout', summary: 'Unsaved-changes bar with save and discard.' },
  { name: 'Sheet', group: 'overlays', archetype: 'overlay', summary: 'Panel sliding from the edge of the viewport.' },
  { name: 'Sticky', group: 'util', archetype: 'util', summary: 'Sticks its children while the container scrolls.' },
  { name: 'Scrollable', group: 'util', archetype: 'container', summary: 'Scroll container with shadow affordances at the edges.' },
  { name: 'ScrollLock', group: 'util', archetype: 'util', summary: 'Locks body scroll while mounted.' },

  // ---- typography and content ----------------------------------------------
  { name: 'TextContainer', group: 'primitives', archetype: 'container', summary: 'Vertical rhythm for prose.' },
  { name: 'List', group: 'components', archetype: 'list', depth: 'full', summary: 'Bulleted or numbered list.' },
  { name: 'DescriptionList', group: 'components', archetype: 'list', depth: 'full', summary: 'Term and description pairs.' },
  { name: 'InlineCode', group: 'primitives', archetype: 'text', summary: 'Monospace inline code.' },
  { name: 'KeyboardKey', group: 'primitives', archetype: 'text', summary: 'A keyboard key, rendered as a key cap.' },
  { name: 'Truncate', group: 'primitives', archetype: 'text', summary: 'Single-line truncation with a title fallback.' },
  { name: 'Link', group: 'primitives', archetype: 'action', summary: 'Navigation. A link goes somewhere; a button does something.' },
  { name: 'ExceptionList', group: 'components', archetype: 'list', depth: 'full', summary: 'Short list of warnings or exceptions on a resource.' },
  { name: 'FooterHelp', group: 'components', archetype: 'container', depth: 'full', summary: 'Help text at the foot of a page.' },

  // ---- actions --------------------------------------------------------------
  { name: 'ButtonGroup', group: 'primitives', archetype: 'container', summary: 'Related buttons, optionally segmented.' },
  { name: 'ActionList', group: 'components', archetype: 'list', depth: 'full', summary: 'List of actions, usually inside a Popover.' },
  { name: 'ActionMenu', group: 'components', archetype: 'nav', summary: 'Page-level action menu with rollup behaviour.' },
  { name: 'UnstyledButton', group: 'primitives', archetype: 'action', summary: 'A button with no visual styling but full button semantics.' },
  { name: 'UnstyledLink', group: 'primitives', archetype: 'action', summary: 'A link with no visual styling.' },
  { name: 'SettingToggle', group: 'components', archetype: 'surface', summary: 'A setting with an enable or disable action.' },
  { name: 'BulkActions', group: 'components', archetype: 'container', summary: 'Actions applying to the current selection.' },
  { name: 'SelectAllActions', group: 'components', archetype: 'container', summary: 'Select-all affordance above a resource list.' },

  // ---- forms ----------------------------------------------------------------
  { name: 'Form', group: 'forms', archetype: 'container', summary: 'Form element with submit handling.' },
  { name: 'FormLayout', group: 'forms', archetype: 'container', summary: 'Consistent spacing and grouping for form fields.' },
  { name: 'TextField', group: 'forms', archetype: 'control', summary: 'Single-line or multiline text input.' },
  { name: 'Select', group: 'forms', archetype: 'control', summary: 'Single-choice dropdown.' },
  { name: 'Checkbox', group: 'forms', archetype: 'control', summary: 'Binary choice, independent of its neighbours.' },
  { name: 'RadioButton', group: 'forms', archetype: 'control', summary: 'One choice from a set.' },
  { name: 'ChoiceList', group: 'forms', archetype: 'control', summary: 'A titled group of radios or checkboxes.' },
  { name: 'RangeSlider', group: 'forms', archetype: 'control', summary: 'Numeric input across a range.' },
  { name: 'ColorPicker', group: 'forms', archetype: 'control', summary: 'Saturation, hue and alpha picker.' },
  { name: 'DatePicker', group: 'forms', archetype: 'control', summary: 'Calendar for a date or a date range.' },
  { name: 'DropZone', group: 'forms', archetype: 'control', summary: 'File upload by drop or browse.' },
  { name: 'Autocomplete', group: 'forms', archetype: 'control', summary: 'Text input with a filtered option list.' },
  { name: 'Combobox', group: 'forms', archetype: 'control', summary: 'Input plus listbox; the primitive under Autocomplete.' },
  { name: 'Listbox', group: 'forms', archetype: 'list', summary: 'Keyboard-navigable option list.' },
  { name: 'OptionList', group: 'forms', archetype: 'list', summary: 'Selectable option list with sections.' },
  { name: 'Picker', group: 'forms', archetype: 'control', summary: 'Searchable picker for a large option set.' },
  { name: 'Label', group: 'forms', archetype: 'text', summary: 'A field label, associated by id.' },
  { name: 'Labelled', group: 'forms', archetype: 'container', summary: 'Label, help text and error wrapper for a control.' },
  { name: 'InlineError', group: 'forms', archetype: 'status', summary: 'Field-level error, associated with its input.' },
  { name: 'Connected', group: 'forms', archetype: 'container', summary: 'Joins a control to leading or trailing elements.' },
  { name: 'Filters', group: 'forms', archetype: 'container', summary: 'Filter bar with applied-filter chips.' },
  { name: 'IndexFilters', group: 'forms', archetype: 'container', summary: 'Filtering, sorting and saved views for an index.' },
  { name: 'LegacyFilters', group: 'forms', archetype: 'container', summary: 'Previous-generation filter bar.' },

  // ---- feedback and status ---------------------------------------------------
  { name: 'Banner', group: 'components', archetype: 'status', summary: 'Page-level message with a tone and optional actions.' },
  { name: 'Toast', group: 'components', archetype: 'status', summary: 'Brief confirmation. Never the only path to an action.' },
  { name: 'Spinner', group: 'components', archetype: 'status', depth: 'full', summary: 'Indeterminate progress.' },
  { name: 'ProgressBar', group: 'components', archetype: 'status', depth: 'full', summary: 'Determinate progress.' },
  { name: 'Loading', group: 'components', archetype: 'status', summary: 'Page-level loading indicator.' },
  { name: 'Indicator', group: 'components', archetype: 'status', depth: 'full', summary: 'Small unread or attention dot.' },
  { name: 'EmptyState', group: 'patterns', archetype: 'surface', depth: 'full', summary: 'First-run empty state with one clear action.' },
  { name: 'EmptySearchResult', group: 'patterns', archetype: 'surface', depth: 'full', summary: 'Filtered-empty state. Different words from first-run.' },
  { name: 'SkeletonBodyText', group: 'components', archetype: 'skeleton', depth: 'full', summary: 'Placeholder lines while body text loads.' },
  { name: 'SkeletonDisplayText', group: 'components', archetype: 'skeleton', depth: 'full', summary: 'Placeholder for a heading.' },
  { name: 'SkeletonThumbnail', group: 'components', archetype: 'skeleton', depth: 'full', summary: 'Placeholder for a thumbnail.' },
  { name: 'SkeletonPage', group: 'components', archetype: 'skeleton', depth: 'full', summary: 'Whole-page placeholder matching the loaded layout.' },
  { name: 'SkeletonTabs', group: 'components', archetype: 'skeleton', depth: 'full', summary: 'Placeholder for a tab bar.' },

  // ---- data display ----------------------------------------------------------
  { name: 'DataTable', group: 'components', archetype: 'list', summary: 'Tabular data with sorting and totals.' },
  { name: 'IndexTable', group: 'components', archetype: 'list', summary: 'Resource index with selection and bulk actions.' },
  { name: 'ResourceList', group: 'components', archetype: 'list', summary: 'Rich object list, as distinct from a column table.' },
  { name: 'ResourceItem', group: 'components', archetype: 'container', summary: 'A single row within a ResourceList.' },
  { name: 'Avatar', group: 'components', archetype: 'media', depth: 'full', summary: 'Person or entity, with initials fallback.' },
  { name: 'Thumbnail', group: 'components', archetype: 'media', depth: 'full', summary: 'Small product or file image.' },
  { name: 'VideoThumbnail', group: 'components', archetype: 'media', summary: 'Video poster with a play affordance and duration.' },
  { name: 'Image', group: 'components', archetype: 'media', summary: 'Image with dimensions reserved to prevent layout shift.' },
  { name: 'Icon', group: 'primitives', archetype: 'media', summary: 'An icon with a tone, decorative unless labelled.' },
  { name: 'Tag', group: 'components', archetype: 'status', depth: 'full', summary: 'A removable label, usually a filter or category.' },
  { name: 'MediaCard', group: 'components', archetype: 'surface', summary: 'Card pairing media with text and actions.' },
  { name: 'CalloutCard', group: 'components', archetype: 'surface', summary: 'Card promoting one action, with illustration.' },
  { name: 'AccountConnection', group: 'patterns', archetype: 'surface', depth: 'full', summary: 'Third-party account connect and disconnect.' },
  { name: 'LegacyCard', group: 'components', archetype: 'surface', summary: 'Previous-generation card with sections.' },
  { name: 'LegacyStack', group: 'primitives', archetype: 'container', summary: 'Previous-generation flex stack.' },

  // ---- overlays ---------------------------------------------------------------
  { name: 'Modal', group: 'overlays', archetype: 'overlay', summary: 'Interrupting dialog. Traps focus; returns it on close.' },
  { name: 'Popover', group: 'overlays', archetype: 'overlay', summary: 'Anchored overlay for actions or secondary content.' },
  { name: 'Tooltip', group: 'overlays', archetype: 'overlay', summary: 'Supplementary text on hover and focus. Never the only source.' },
  { name: 'Collapsible', group: 'overlays', archetype: 'container', summary: 'Animated show and hide of a region.' },
  { name: 'Backdrop', group: 'overlays', archetype: 'util', summary: 'Scrim behind an overlay.' },
  { name: 'Portal', group: 'util', archetype: 'util', summary: 'Renders children outside the DOM hierarchy.' },
  { name: 'PortalsManager', group: 'util', archetype: 'util', summary: 'Coordinates portal containers.' },
  { name: 'PositionedOverlay', group: 'util', archetype: 'util', summary: 'Positions an overlay against an activator.' },
  { name: 'TrapFocus', group: 'util', archetype: 'util', summary: 'Keeps focus within its children while active.' },
  { name: 'Focus', group: 'util', archetype: 'util', summary: 'Moves focus to its child when it becomes active.' },

  // ---- navigation ---------------------------------------------------------------
  { name: 'Navigation', group: 'navigation', archetype: 'nav', summary: 'Primary application navigation.' },
  { name: 'TopBar', group: 'navigation', archetype: 'nav', summary: 'Application top bar: search, user menu, nav toggle.' },
  { name: 'Tabs', group: 'navigation', archetype: 'nav', summary: 'Alternate views of one subject. Not steps.' },
  { name: 'LegacyTabs', group: 'navigation', archetype: 'nav', summary: 'Previous-generation tabs.' },
  { name: 'Breadcrumbs', group: 'navigation', archetype: 'nav', summary: 'Path to here. Earns its space at three levels or more.' },
  { name: 'Pagination', group: 'navigation', archetype: 'nav', summary: 'Previous and next across a result set.' },

  // ---- providers and behaviour -----------------------------------------------
  { name: 'AppProvider', group: 'util', archetype: 'util', summary: 'Root provider: theme, i18n, link component.' },
  { name: 'ThemeProvider', group: 'util', archetype: 'util', summary: 'Applies a theme to its subtree.' },
  { name: 'PolarisTestProvider', group: 'util', archetype: 'util', summary: 'Provider stub for tests.' },
  { name: 'EventListener', group: 'util', archetype: 'util', summary: 'Declarative window event listener.' },
  { name: 'KeypressListener', group: 'util', archetype: 'util', summary: 'Declarative key handler.' },
];

export const GROUPS = ['primitives', 'components', 'forms', 'layout', 'overlays', 'navigation', 'patterns', 'util'];
