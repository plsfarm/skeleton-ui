import React from "react";
import Stats from "./Stats";
import LandingHeader from "../../../layout/LandingHeader";
import Hero from "./Hero";
import Footer from "../../../layout/Footer";

const Staking = () => {
  return (
    <>
      <LandingHeader />
      <Hero />
      <Stats />
      <div className="contain mx-auto flex justify-center">
        <Footer />
      </div>
    </>
  );
};

export default Staking;
