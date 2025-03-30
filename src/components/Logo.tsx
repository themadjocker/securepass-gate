
import React from 'react';

const Logo = () => {
  return (
    <div className="h-10 w-10 flex items-center justify-center bg-black text-white rounded-full mb-2">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M17 21a2 2 0 0 0 2-2V7l-6-6H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2"></path>
        <path d="M13 21h8"></path>
        <path d="M13 7V1"></path>
      </svg>
    </div>
  );
};

export default Logo;
