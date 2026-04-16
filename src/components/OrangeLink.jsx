import { Link as RouterLink } from 'react-router-dom';

/**
 * OrangeLink Component
 * A reusable link component with brand-orange styling.
 * 
 * @param {string} href - The URL to navigate to
 * @param {string} to - React Router path (alternative to href)
 * @param {boolean} external - Whether this is an external link
 * @param {ReactNode} children - The content of the link
 * @param {string} className - Additional CSS classes
 */
export default function OrangeLink({ 
  href, 
  to, 
  external = false, 
  children, 
  className = '' 
}) {
  const baseStyles = `text-brand-orange hover:text-orange-700 hover:underline transition-colors duration-200 ${className}`;
  
  // External link or href provided
  if (href || external) {
    return (
      <a 
        href={href} 
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseStyles}
      >
        {children}
      </a>
    );
  }
  
  // Internal React Router link
  if (to) {
    return (
      <RouterLink to={to} className={baseStyles}>
        {children}
      </RouterLink>
    );
  }
  
  // Fallback to anchor tag
  return (
    <a className={baseStyles}>
      {children}
    </a>
  );
}
