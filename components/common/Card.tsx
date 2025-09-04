
import React from 'react';

interface CardProps {
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ onClick, isSelected, children }) => {
  const baseClasses = "p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 transform hover:-translate-y-1";
  const selectedClasses = "bg-indigo-600/20 border-indigo-500 shadow-2xl shadow-indigo-500/30";
  const unselectedClasses = "bg-slate-800 border-slate-700 hover:border-indigo-500 hover:bg-slate-700/50";

  return (
    <div onClick={onClick} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      {children}
    </div>
  );
};

export default Card;
