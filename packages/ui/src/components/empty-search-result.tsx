import { BlockStack } from './block-stack';
import { Text } from './text';

/** Polaris's own empty-search illustration, inlined so there is no asset to host. */
const EMPTY_SEARCH_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="26" cy="26" r="20" stroke="#8A8A8A" stroke-width="4"/>
      <path d="M41 41l14 14" stroke="#8A8A8A" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  );

export interface EmptySearchResultProps {
  /** States what matched nothing. Not "no results" on its own. */
  title: string;
  /** What to try next. This is the part that makes the state recoverable. */
  description?: string;
  withIllustration?: boolean;
}

/**
 * EmptySearchResult — the filtered-empty state.
 *
 * Deliberately a different component from EmptyState, and the distinction is
 * the point: showing "create your first product" to someone whose search
 * returned nothing reads as though their data has been lost. This one says
 * what was searched and what to try instead.
 *
 * Structure mirrors Polaris: a centred vertical stack, a headingLg title as a
 * `p`, and a subdued description.
 */
export function EmptySearchResult({
  title,
  description,
  withIllustration = false,
}: EmptySearchResultProps) {
  return (
    <BlockStack gap="400" inlineAlign="center">
      {withIllustration ? (
        <img
          // Decorative: the title carries the meaning.
          alt=""
          role="presentation"
          src={EMPTY_SEARCH_SVG}
          draggable={false}
          width={60}
          height={60}
        />
      ) : null}
      <Text variant="headingLg" as="p">
        {title}
      </Text>
      <Text tone="subdued" as="span">
        {description ? <p>{description}</p> : null}
      </Text>
    </BlockStack>
  );
}
