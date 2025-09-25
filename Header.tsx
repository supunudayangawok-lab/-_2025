import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-2">
        තාරකා අනාවැකි
      </h1>
      <p className="text-lg text-indigo-200">ඔබේ දෛනික ලග්න පලාපල</p>
    </header>
  );
};

export default Header;