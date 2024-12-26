'use client';

import { useState, useRef } from 'react';

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return {
    inputRef,
    showPassword,
    handleTogglePassword,
  };
};

export default usePasswordToggle;
