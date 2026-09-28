import type { ImgHTMLAttributes } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  source: string;
  /** Required. Empty string marks it decorative rather than unlabelled. */
  alt: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  sourceSet?: { source: string; descriptor?: string }[];
}

/**
 * Image — a plain img with a srcset helper.
 *
 * Polaris ships no CSS for this; it exists so `sourceSet` can be written as
 * data rather than as a hand-built string, and so `alt` is required by the
 * type rather than forgotten.
 */
export function Image({ source, alt, sourceSet, crossOrigin, ...rest }: ImageProps) {
  const srcSet = sourceSet
    ? sourceSet.map(({ source: src, descriptor }) => `${src} ${descriptor ?? ''}`.trim()).join(', ')
    : undefined;

  return <img src={source} alt={alt} srcSet={srcSet} crossOrigin={crossOrigin} {...rest} />;
}
