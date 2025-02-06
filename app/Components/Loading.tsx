import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../json/Loading.json'; // Path to your JSON file

export const LoadingTest = () => {
  return (
    <Lottie 
      animationData={animationData} 
      width={20}
      height={30}
      loop 
      autoplay 
      
    />
  );
};