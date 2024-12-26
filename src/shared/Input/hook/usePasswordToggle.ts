'use client';

import { useState } from 'react';

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    handleTogglePassword,
  };
};

export default usePasswordToggle;
