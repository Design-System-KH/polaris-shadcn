import type { ReactNode } from 'react';
import '../styles/polaris/footer-help.css';

export interface FooterHelpProps {
  children?: ReactNode;
}

/** FooterHelp — centred help text at the foot of a page. */
export function FooterHelp({ children }: FooterHelpProps) {
  return <div className="Polaris-FooterHelp">{children}</div>;
}
