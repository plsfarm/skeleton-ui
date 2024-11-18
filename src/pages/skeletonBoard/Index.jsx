import React from "react";
import LandingHeaderTomb from "../../layout/LandingHeaderTomb";
import Home from "./home";
import Hero from "./Hero";

const SkeletonBoard = () => {

  return (
    <div >
      <LandingHeaderTomb />
      <Hero />
      <Home />
    </div>
  );
};

export default SkeletonBoard;
