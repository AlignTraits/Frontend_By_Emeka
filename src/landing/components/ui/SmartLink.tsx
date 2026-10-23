import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** "/path" uses react-router; "#", "mailto:" and absolute URLs use a plain anchor. */
  href: string;
}

export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
