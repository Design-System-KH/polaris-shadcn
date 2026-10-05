import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Box } from './box';
import { BlockStack } from './block-stack';
import { InlineStack } from './inline-stack';
import { Text } from './text';
import { Button } from './button';
import '../styles/polaris/empty-state.css';

export interface EmptyStateAction {
  content: string;
  onAction?: () => void;
  url?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface EmptyStateProps {
  /** Supporting copy. Centred, small, under the heading. */
  children?: ReactNode;
  heading?: string;
  /** Required: the illustration is the component's whole visual identity. */
  image: string;
  /** Served above 568px via srcset, with `image` as the smaller source. */
  largeImage?: string;
  /** Lets the image fill the container width above the medium breakpoint. */
  imageContained?: boolean;
  fullWidth?: boolean;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  footerContent?: ReactNode;
}

const buttonFrom = (action: EmptyStateAction, variant?: 'primary') =>
  action.url ? (
    <Button asChild variant={variant} disabled={action.disabled} loading={action.loading}>
      <a href={action.url}>{action.content}</a>
    </Button>
  ) : (
    <Button
      variant={variant}
      disabled={action.disabled}
      loading={action.loading}
      onClick={action.onAction}
    >
      {action.content}
    </Button>
  );

/**
 * EmptyState — a first-run empty state with one clear action.
 *
 * Structure and spacing mirror Polaris exactly: outer Box padded 500 block-start
 * and 1600 block-end, details capped at 400px unless `fullWidth`, heading
 * padded 150 block-end, text block 400 block-end, actions gapped 200.
 *
 * The image cross-fade is the detail worth keeping. A grey circle is shown at
 * full opacity and fades out as the illustration fades in, so the layout never
 * jumps and the space is reserved before the image arrives.
 */
export function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained = false,
  fullWidth = false,
  action,
  secondaryAction,
  footerContent,
}: EmptyStateProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // A cached image can finish loading before React attaches onLoad, which
  // would leave the skeleton visible forever.
  useEffect(() => {
    if (imageRef.current?.complete) setImageLoaded(true);
  }, []);

  const imageClassName = cn(
    'Polaris-EmptyState__Image',
    imageLoaded && 'Polaris-EmptyState--loaded',
    imageContained && 'Polaris-EmptyState--imageContained',
  );

  const imageMarkup = (
    <div
      className={cn(
        'Polaris-EmptyState__ImageContainer',
        !imageLoaded && 'Polaris-EmptyState__SkeletonImageContainer',
      )}
    >
      <img
        ref={imageRef}
        // Decorative: the heading carries the meaning, so announcing the
        // illustration would only repeat it.
        alt=""
        role="presentation"
        src={largeImage ?? image}
        srcSet={largeImage ? `${image} 568w, ${largeImage} 1136w` : undefined}
        sizes={largeImage ? '(max-width: 568px) 60vw' : undefined}
        className={imageClassName}
        onLoad={() => setImageLoaded(true)}
      />
      <div
        className={cn(
          'Polaris-EmptyState__SkeletonImage',
          imageLoaded && 'Polaris-EmptyState--loaded',
        )}
      />
    </div>
  );

  const headingMarkup = heading ? (
    <Box paddingBlockEnd="150">
      <Text variant="headingMd" as="p" alignment="center">
        {heading}
      </Text>
    </Box>
  ) : null;

  const childrenMarkup = children ? (
    <Text as="span" alignment="center" variant="bodySm">
      {children}
    </Text>
  ) : null;

  const textContentMarkup =
    headingMarkup || children ? (
      <Box paddingBlockEnd="400">
        {headingMarkup}
        {childrenMarkup}
      </Box>
    ) : null;

  const primaryActionMarkup = action ? buttonFrom(action, 'primary') : null;
  const secondaryActionMarkup = secondaryAction ? buttonFrom(secondaryAction) : null;

  const actionsMarkup =
    primaryActionMarkup || secondaryActionMarkup ? (
      <InlineStack align="center" gap="200">
        {secondaryActionMarkup}
        {primaryActionMarkup}
      </InlineStack>
    ) : null;

  const footerContentMarkup = footerContent ? (
    <Box paddingBlockStart="400">
      <Text as="span" alignment="center" variant="bodySm">
        {footerContent}
      </Text>
    </Box>
  ) : null;

  const detailsMarkup =
    textContentMarkup || actionsMarkup || footerContentMarkup ? (
      <Box maxWidth={fullWidth ? '100%' : '400px'}>
        <BlockStack inlineAlign="center">
          {textContentMarkup}
          {actionsMarkup}
          {footerContentMarkup}
        </BlockStack>
      </Box>
    ) : null;

  return (
    <Box paddingInlineStart="0" paddingInlineEnd="0" paddingBlockStart="500" paddingBlockEnd="1600">
      <BlockStack inlineAlign="center">
        {imageMarkup}
        {detailsMarkup}
      </BlockStack>
    </Box>
  );
}
