import React from "react";
import LandingHeaderTomb from "../../layout/LandingHeaderTomb";
import Home from "./home";
import Hero from "./Hero";

const SkeletonFarm = () => {

  return (
    <div >
      <LandingHeaderTomb />
      <Hero />
      <Home />
    </div>
  );
};

export default SkeletonFarm;
