import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  fullWidth = false 
}) => {
  const baseClasses = 'rounded-lg py-2 px-4 font-medium transition-all duration-200 shadow-md hover:shadow-lg';
  
  const variantClasses = {
    primary: 'bg-[#19183B] hover:bg-[#252447] text-white',
    secondary: 'bg-[#708993] hover:bg-[#7d99a3] text-white',
    accent: 'bg-[#A1C2BD] hover:bg-[#b6d2ce] text-[#19183B]',
    outline: 'bg-transparent border-2 border-[#19183B] text-[#19183B] hover:bg-[#19183B] hover:text-white'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;