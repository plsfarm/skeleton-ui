import React from "react";
import Hero from "./Hero";
import Stats from "./Stats";
import LandingHeader from "../../../layout/LandingHeader";
import Footer from "../../../layout/Footer";

const Farms = () => {
  return (
    <>
      <LandingHeader />
      <Hero />
      {/*  <div className="contain mx-auto relative  text-white mt-10">
        <div className="grid grid-cols-2 gap-7 w-full">
          <div className="text-center dark:bg-darklight bg-white border dark:border-darklight border-gray-300 px-20 py-5 rounded-xl dark:text-white text-black">
            <div className="text-5xl">500</div>
            <div className="text-gray-500">Circulating Market Cap</div>
          </div>
          <div className="text-center dark:bg-darklight bg-white border dark:border-darklight border-gray-300 px-20 py-5 rounded-xl dark:text-white text-black">
            <div className="text-5xl">500</div>
            <div className="text-gray-500">Total Value Locked</div>
          </div>
        </div>

      </div> */}

      <Stats />
      <div className="contain mx-auto flex justify-center">
        <Footer />
      </div>
    </>
  );
};

export default Farms;
