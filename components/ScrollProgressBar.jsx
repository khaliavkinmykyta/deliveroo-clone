import React from 'react';
import { View } from 'react-native';

const ScrollProgressBar = ({ progress }) => {
    const progressBarStyles = {
        width: `${progress / 1.5 * 100}%`, // Изменяем ширину в зависимости от progress
        height: 25, // Высота полоски в 5 пикселей
        position: 'relative', // Позиционируем полоску
        background: 'linear-gradient(0deg, rgba(128,128,128,0) 0%, rgba(128,128,128,0) 49%, grey 50%, grey 100%)', // Градиент с размытием
      };
      

  return <View style={progressBarStyles} />;
};

export default ScrollProgressBar;
