import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`border border-border bg-background p-container-padding ${className}`}>
      {children}
    </div>
  );
}
