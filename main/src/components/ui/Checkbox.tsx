import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  id?: string;
}

export function Checkbox({ 
  checked, 
  onChange, 
  className = '',
  id
}: CheckboxProps) {
  return (
    <div className="inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`
          w-5 h-5 border border-border bg-background cursor-pointer
          flex items-center justify-center
          interactive-hover interactive-focus
          ${className}
        `}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-foreground"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </label>
    </div>
  );
}
