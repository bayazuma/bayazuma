import { useState, useEffect } from 'react'

export const useWindowDimensions = () => {
  const getWindowDimensions = () => {   
    if (!process.browser) {
      return {
        width: 0,
        height: 0
      }     
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
 
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return windowDimensions;
}