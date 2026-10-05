import { cn } from '../lib/cn';

export interface DividerProps {
  /** Token suffix from --p-color-border-*. */
  borderColor?: string;
  borderWidth?: '025' | '050' | '100';
  className?: string;
}

/**
 * A horizontal rule. `role="presentation"` because it is decoration: a screen
 * reader announcing "separator" between every card is noise, and grouping is
 * already carried by headings and landmarks.
 */
export function Divider({
  borderColor = 'secondary',
  borderWidth = '025',
  className,
}: DividerProps) {
  return (
    <hr
      role="presentation"
      className={cn('m-0 w-full border-0', className)}
      style={{
        borderBlockStartWidth: `var(--p-border-width-${borderWidth})`,
        borderBlockStartStyle: 'solid',
        borderBlockStartColor: `var(--p-color-border-${borderColor})`,
      }}
    />
  );
}
