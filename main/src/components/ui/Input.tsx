import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  maxLength?: number;
}

export function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  onKeyPress,
  className = '',
  maxLength,
  ...props 
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      maxLength={maxLength}
      className={`
        border border-border bg-background text-foreground text-body
        p-item-margin focus:outline-none interactive-focus
        w-full
        ${className}
      `}
      {...props}
    />
  );
}
