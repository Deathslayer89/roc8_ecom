import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-12 h-12 border-4 border-black border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingComponent;