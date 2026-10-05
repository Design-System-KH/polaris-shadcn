import { useState } from 'react';
import { cn } from '../lib/cn';
import '../styles/polaris/avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /**
   * Announced label. Pass an empty string when the name is already visible
   * beside the avatar — repeating it is noise for a screen-reader user.
   */
  accessibilityLabel?: string;
  name?: string;
  initials?: string;
  source?: string;
  size?: AvatarSize;
  className?: string;
  onError?: () => void;
}

const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/** Polaris's seven background styles, chosen deterministically from the name. */
const STYLE_CLASSES = [
  'styleOne',
  'styleTwo',
  'styleThree',
  'styleFour',
  'styleFive',
  'styleSix',
  'styleSeven',
] as const;

/**
 * The same name always gets the same colour, across sessions and machines.
 * A random pick would reshuffle every render and destroy the recognisability
 * that makes a coloured avatar useful at all.
 */
function styleClassFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash + seed.charCodeAt(i)) % STYLE_CLASSES.length;
  return STYLE_CLASSES[hash];
}

/**
 * Avatar — a person or entity, with an initials fallback.
 *
 * Classes are Polaris's own, so the size ramp, the circular clip and the seven
 * background styles are exact. The fallback is behaviour, not decoration: an
 * image that 404s would otherwise leave a broken icon and a collapsed row.
 */
export function Avatar({
  accessibilityLabel,
  name,
  initials,
  source,
  size = 'md',
  className,
  onError,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const derived =
    initials ??
    (name
      ? name
          .split(/\s+/)
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
      : undefined);

  const label = accessibilityLabel ?? name;
  const showImage = Boolean(source) && !failed;
  const text = (derived ?? '').toUpperCase();

  return (
    <span
      // An empty accessibilityLabel means "decorative here", so the element is
      // hidden rather than announced as an unlabelled image.
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn(
        'Polaris-Avatar',
        `Polaris-Avatar--size${cap(size)}`,
        `Polaris-Avatar--${styleClassFor(name ?? text ?? '')}`,
        loaded && 'Polaris-Avatar--imageHasLoaded',
        text.length > 2 && 'Polaris-Avatar--long',
        className,
      )}
    >
      {showImage ? (
        <img
          src={source}
          alt=""
          className="Polaris-Avatar__Image"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            onError?.();
          }}
        />
      ) : (
        <span className="Polaris-Avatar__Initials">{text}</span>
      )}
    </span>
  );
}
