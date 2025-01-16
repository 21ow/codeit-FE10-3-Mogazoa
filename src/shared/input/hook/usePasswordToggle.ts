'use client';

import { useState, useRef } from 'react';

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleRef = useRef<HTMLInputElement | null>(null);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
    if (toggleRef.current) {
      toggleRef.current.focus();
    }
  };

  return {
    toggleRef,
    showPassword,
    handleTogglePassword,
  };
};

export default usePasswordToggle;
