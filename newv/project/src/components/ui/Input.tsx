import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
    const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    const widthStyles = fullWidth ? 'w-full' : '';
    const disabledStyles = props.disabled ? 'bg-slate-100 cursor-not-allowed' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${widthStyles} ${disabledStyles} ${className}`}
          {...props}
        />
        
        {helperText && !error && (
          <p className="text-xs text-slate-500">{helperText}</p>
        )}
        
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;