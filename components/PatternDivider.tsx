import React from 'react';

export const PatternDivider: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-12 opacity-40">
      <div className="h-px bg-wood w-1/3"></div>
      <div className="mx-4 text-wood">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" />
        </svg>
      </div>
      <div className="h-px bg-wood w-1/3"></div>
    </div>
  );
};