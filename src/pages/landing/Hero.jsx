import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-black">
      <div className="absolute w-full h-full rotate-180" ></div>
      <div className={`wrapper relative isolate pt-[0px] pb-20 md:pb-0 md:h-[950px]`} >
        <div className="relative z-10 contain flex items-center h-full">
          <div className="lg:max-w-[70%]">
            <p className="font-semibold text-4xl md:text-[70px] md:leading-[87px] white mt-40 md:mt-0">
              Welcome to Skeleton Money
            </p>
            <div className="text-2xl my-3">It's time to get busy having fun on the farm while earning the highest yields on the most safu project on sonic chain</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[300px] md:mt-56 lg:mt-11">
              <Link to="/" className="btn-base border-2 border-white bg-white text-black">SWAP</Link>
              <Link to="/" className="btn-base border-2 border-textclr bg-black text-white farming-btn">Start Farming</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
