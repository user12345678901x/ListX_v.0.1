import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${isVisible ? 'visible' : 'hidden'}`}>
      <h1>ListX</h1>
    </div>
  );
};

export default SplashScreen;