import React from 'react';

const VARIANTS = {
  primary: 'bg-indigo-500 hover:bg-indigo-600',
  danger: 'bg-red-500 hover:bg-red-600',
  success: 'bg-green-500 hover:bg-green-600',
};

const Button = ({ type, children, onClick, variant, className, disabled }) => {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
			type={type}
      className={`py-2 px-4 text-white font-semibold rounded-lg shadow-md ${variantClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;