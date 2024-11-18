import React, { useState, useEffect } from "react";

const useGradientBackground = () => {
  const [background, setBackground] = useState(generateGradient());

  useEffect(() => {
    const interval = setInterval(() => {
      setBackground(generateGradient());
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Function to generate a random gradient CSS value
  function generateGradient() {
    const colors = getRandomColor();

    const direction = Math.floor(Math.random() * 360);

    return `linear-gradient(${direction}deg, ${colors[0]}, ${colors[1]})`;
  }

  // Function to generate a random CSS color
  function getRandomColor() {
    const random = [
      /*  ["#2C3E50", "#3498DB"], */
      /* // Light and dark blue
       */
      /* ["#913D88", "#C71585"], */
      ["#2C3E50", "#8E44AD"],
      /*  ["#7E8F7C", "#C0392B"],
      ["#5B2C6F", "#D35400"],  */
    ];

    const randomColor = random[Math.floor(Math.random() * random.length)];

    return randomColor;
  }

  return background;
};

export default useGradientBackground;
