'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.maButton} ${className}`}
        {...props}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = 'hihi';

export default Button;
