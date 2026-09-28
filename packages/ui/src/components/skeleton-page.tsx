import type { ReactNode } from 'react';
import { Box } from './box.js';
import { BlockStack } from './block-stack.js';
import { InlineStack } from './inline-stack.js';
import { SkeletonDisplayText } from './skeleton-display-text.js';
import '../styles/polaris/skeleton-page.css';

export interface SkeletonPageProps {
  children?: ReactNode;
  /** A real title shown while the body loads; omit for a placeholder bar. */
  title?: string;
  narrowWidth?: boolean;
  primaryAction?: boolean;
  backAction?: boolean;
}

/**
 * SkeletonPage — a whole-page placeholder.
 *
 * It must match the layout that replaces it. A skeleton whose shape differs
 * from the loaded page makes everything jump on arrival, which is worse than
 * showing nothing.
 */
export function SkeletonPage({
  children,
  title = '',
  narrowWidth = false,
  primaryAction = false,
  backAction = false,
}: SkeletonPageProps) {
  return (
    <Box
      // role="status" plus a label, because a page-sized wait with no
      // announcement leaves a screen-reader user with silence.
      padding="0"
      maxWidth={narrowWidth ? '662px' : '998px'}
      width="100%"
    >
      <div role="status" aria-label="Page loading">
        <Box paddingBlockStart="500" paddingBlockEnd="500" paddingInlineStart="400" paddingInlineEnd="400">
          <BlockStack gap="400">
            <InlineStack gap="400" blockAlign="center">
              {backAction ? <SkeletonThumbnailBar /> : null}
              {title ? (
                <h1 className="Polaris-SkeletonPage__SkeletonTitle">{title}</h1>
              ) : (
                <div className="Polaris-SkeletonPage__SkeletonTitle" aria-hidden>
                  <SkeletonDisplayText size="large" />
                </div>
              )}
              {primaryAction ? <SkeletonDisplayText size="large" /> : null}
            </InlineStack>
            {children}
          </BlockStack>
        </Box>
      </div>
    </Box>
  );
}

/** The small square standing in for a back button. */
function SkeletonThumbnailBar() {
  return <SkeletonDisplayText size="small" maxWidth="10%" />;
}
