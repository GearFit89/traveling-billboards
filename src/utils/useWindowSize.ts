"use client"
import { useEffect, useState } from "react";
export default  function useWindowSize(){
const[isDesktop, setIsDesktop] = useState(false); // State to track simulated responsive layout
const [heigth, setHeigth] = useState(window.innerHeight);
    const[width, setWidth] = useState(window.innerWidth);

  useEffect(() => { // Hook to run side effects after mount
      const handleResize = () => { // Function to check window width
        setIsDesktop(window.innerWidth > 768);
        setHeigth(window.innerHeight);
        setWidth(window.innerWidth);
         // Update state if window is wider than 768px
      }; // End resize handler

      handleResize(); // Check initial size on mount
       window.addEventListener('resize', handleResize); // Listen for window resize events
      return () => window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
   }, []);

   return {heigth, width, isDesktop}
}