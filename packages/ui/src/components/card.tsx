import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import { Box } from './box.js';
import type { BorderRadiusScale, ShadowScale, SpaceScale } from '../lib/tokens.js';
import '../styles/polaris/shadow-bevel.css';

export interface CardProps {
  children?: ReactNode;
  className?: string;
  /** Token suffix from --p-color-*. Polaris naming, e.g. "bg-surface". */
  background?: string;
  padding?: SpaceScale;
  /** Below this breakpoint the card loses its corner radius and goes edge to edge. */
  roundedAbove?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface ShadowBevelProps {
  children?: ReactNode;
  boxShadow: ShadowScale;
  borderRadius: BorderRadiusScale;
  zIndex?: string;
}

/**
 * Polaris draws a card's edge with a bevel pseudo-element rather than a border.
 *
 * That is why a re-derived `border` never quite matches: the bevel sits inside
 * the clip and renders an inset highlight above the shadow, which a plain
 * border cannot reproduce at this radius.
 */
function ShadowBevel({ children, boxShadow, borderRadius, zIndex = '0' }: ShadowBevelProps) {
  return (
    <div
      className="Polaris-ShadowBevel"
      style={
        {
          '--pc-shadow-bevel-z-index': zIndex,
          '--pc-shadow-bevel-content-xs': '""',
          '--pc-shadow-bevel-box-shadow-xs': `var(--p-shadow-${boxShadow})`,
          '--pc-shadow-bevel-border-radius-xs': `var(--p-border-radius-${borderRadius})`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Card — the default grouping surface.
 *
 * Composed exactly as Polaris composes it: a ShadowBevel wrapping a Box, not a
 * div with a border and a shadow. `overflowX`/`overflowY` are clipped so the
 * bevel keeps its rounded corner over any content that would otherwise bleed.
 */
export function Card({
  children,
  className,
  background = 'bg-surface',
  padding = '400',
  roundedAbove = 'sm',
}: CardProps) {
  // Polaris drops the radius below `roundedAbove` so the card meets the
  // viewport edge on small screens. Resolving that needs a breakpoint
  // observer; until this component has one, the radius is always applied.
  void roundedAbove;

  return (
    <div className={cn(className)}>
      <ShadowBevel boxShadow="100" borderRadius="300" zIndex="32">
        <Box
          background={background}
          padding={padding}
          overflowX="clip"
          overflowY="clip"
          minHeight="100%"
        >
          {children}
        </Box>
      </ShadowBevel>
    </div>
  );
}
