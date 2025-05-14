// components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
