"use client"
import { useEffect, useState } from "react";
export default  function useWindowSize(){
const[isDesktop, setIsDesktop] = useState(false); 
const [heigth, setHeigth] = useState(window.innerHeight);
    const[width, setWidth] = useState(window.innerWidth);

  useEffect(() => { 
      const handleResize = () => { 
        setIsDesktop(window.innerWidth > 768);
        setHeigth(window.innerHeight);
        setWidth(window.innerWidth);
         
      };

      handleResize(); 
       window.addEventListener('resize', handleResize); 
      return () => window.removeEventListener('resize', handleResize); 
   }, []);

   return {heigth, width, isDesktop}
}