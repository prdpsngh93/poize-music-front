import React from 'react';

const Button = ({ label, variant = 'solid', icon, onClick, type = 'button' }) => {
  const baseClasses = 'w-full flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition';
  const solidClasses = 'bg-teal-500 text-white hover:bg-teal-600';
  const outlineClasses = 'border border-gray-400 text-black hover:bg-gray-100';

  const classes = `${baseClasses} ${variant === 'solid' ? solidClasses : outlineClasses}`;

  return (
    <button className={classes} onClick={onClick} type={type}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
