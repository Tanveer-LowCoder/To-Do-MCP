import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseClasses = `
    border border-border bg-background text-foreground text-body font-medium
    p-item-margin px-component-gap
    interactive-hover interactive-focus interactive-active
    cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
  `;
  
  const variantClasses = {
    primary: 'bg-foreground text-background hover:bg-gray-800',
    secondary: 'bg-background text-foreground hover:bg-gray-50',
    danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
