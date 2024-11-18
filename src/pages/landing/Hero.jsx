import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-black">
      <div className="absolute w-full h-full rotate-180" ></div>
      <div className={`wrapper relative isolate pt-[0px] pb-20 md:pb-0 md:h-[950px]`} >
        <div className="relative z-10 contain flex items-center h-full">

          {/* <img src="/logo.png" className="w-[400px] object-contain" alt="" /> */}
          {/* <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Pulse Rate launch is imminent!
          </h2> */}
          <div className="lg:max-w-[70%]">
            <p className="font-semibold text-4xl md:text-[70px] md:leading-[87px] white mt-40 md:mt-0">
              Welcome to Pls Farm
            </p>
            <div className="text-2xl my-3">It's time to get busy having fun on the farm while earning the highest yields on the most safu project on pulse chain</div>
            {/* <p className="mx-auto mb-2 text-xl font-medium text-white mt-14">
              <span className="m-auto mb-1 sm:border-none">
                A highly scalable, fast, secure blockchain built specifically for the unique needs of retail.
              </span>
            </p>
            <p className="mx-auto mb-2 text-xl font-medium text-white mt-4">
              <span className="m-auto mb-1 sm:border-none">
                Kingaru is the most robust platform needed to maximize your payment solutions and customer retention, while saving time and money.
              </span>
            </p> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[300px] md:mt-56 lg:mt-11">
              <Link to="/" className="btn-base border-2 border-white bg-white text-black">SWAP</Link>
              <Link to="/" className="btn-base border-2 border-textclr bg-black text-white farming-btn">Start Farming</Link>
            </div>
          </div>
        </div>
        {/* <img src="landing_mobile.gif" className="absolute left-0 top-40 -z-20 w-full block lg:hidden h-[50%]" alt="" /> */}
        {/*  <video
          src="/landing_home.mp4"
          playsInline
          muted
          loop
          autoPlay
          className="absolute left-0 top-0 -z-20 hidden h-full w-full object-cover lg:block"
        ></video>
        <video
          src="/landing_mobile_home.mp4"
          playsInline
          muted
          loop
          autoPlay
          className="absolute left-0 top-0 -z-20 block h-full w-full lg:hidden mt-16"
        ></video> */}


      </div>

    </div>
  );
};

export default Hero;
