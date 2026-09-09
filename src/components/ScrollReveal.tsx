import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  variant?: 'fade-up' | 'card';
  threshold?: number;
  once?: boolean;
  onClick?: React.MouseEventHandler;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
  variant = 'fade-up',
  threshold = 0.16,
  once = true,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Component
      ref={elementRef as React.Ref<HTMLElement>}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      data-variant={variant}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
