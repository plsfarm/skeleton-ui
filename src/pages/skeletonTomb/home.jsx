import React, { useContext, useEffect } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { useTheme } from "../../components/ThemeProvider";
import Footer from "../../layout/Footer";
import { Context } from "../../utils/Context";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import Swap from "../dapp/swap/Swap";


const Home = () => {
  const context = useContext(Context);
  const { data, updateData } = context;
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { width } = useWindowSize();
  const theme = useTheme()

  console.log('wwww', width)

  useEffect(() => {
    updateData();
    const interval = setInterval(() => {
      updateData();
    }, 30000);
    return () => clearInterval(interval);
  }, [walletClient, publicClient]);

  return (
    <div className="w-full bg-white  dark:bg-[#1e1926] pb-20 md:max-h-screen md:overflow-hidden">

      <div className="absolute md:max-h-screen md:overflow-hidden">
        <img src="/tomb-landing.png" className="w-full h-full object-cover" />
      </div>
      {/*  <video autoPlay muted loop className="absolute z-0 w-full h-full object-cover hidden md:block">
        <source src="/landing.mp4" type="video/mp4" />
      </video>
      <video autoPlay muted loop className="absolute z-0 w-full h-full object-cover md:hidden">
        <source src="/landing-mobile.mp4" type="video/mp4" />
      </video> */}
      <div className="">
        {/* <div className="absolute w-full h-full bg-black bg-opacity-20"></div> */}
        <div className="contain mx-auto relative isolate flex-col items-start justify-start gap-8  pt-10  ">
          <div className="relative flex flex-col w-full justify-center items-center gap-4 pt-5 2xl:pt-12 pb-5">
            <div className="text-2xl text-orange-600 font-bold mt-10 md:mt-0">NOT LIVE IN TEST</div>
            <div className="flex flex-col items-center justify-between rounded-lg text-white lg:pt-10 pb-16 px-4 md:min-h-[68vh]">
              {/* Total Trading Volume */}
              {/* <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold">Total Trading Volume</p>
                <p className="text-5xl md:text-7xl font-extrabold tracking-wider">123,456,789</p> 
              </div> */}

              {/* Cryptic Text */}
              <div className="text-center">
                <h2 className="text-3xl md:text-6xl font-extrabold tracking-wide font-[Orbitron] uppercase glow-effect">
                  1st Sustainable Tomb on Sonic with ZERO peg!
                </h2>
              </div>
              <div>

                {/* Stats Section */}
                <div className="flex flex-wrap justify-center gap-10 pt-10 pb-5 mt-5">
                  {/* Stat Boxes */}
                  {['Bones', 'BSHARE'].map((stat) => (
                    <div
                      key={stat}
                      className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-6 text-center text-lg font-semibold uppercase shadow-lg"
                    >
                      {stat}
                    </div>
                  ))}
                </div>

                {/* Launch Button */}
                <div className="text-center">
                  <button className="bg-[#00ffed] text-gray-800 font-semibold py-3 px-8 rounded-full text-xl transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7),0_0_40px_rgba(255,255,255,0.5)] font-[Orbitron]">
                    Launch dapp if you dare
                  </button>


                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <div className="contain mx-auto flex justify-center relative mb-32 -mt-14 bg-black border border-gray-700 border-b-0 rounded-3xl text-white">
        <div className="py-10 w-full flex h-full items-center justify-center z-30">
          <div className="grid grid-cols-2 gap-32">
            <div className="text-center">
              <div className="text-5xl">500</div>
              <div className="text-gray-500">Circulating Market Cap</div>
            </div>
            <div className="text-center">
              <div className="text-5xl">500</div>
              <div className="text-gray-500">Total Value Locked</div>
            </div>
          </div>

        </div>
      </div> */}

      <div className="w-full md:w-[30%] flex flex-col items-center gap-2 mx-auto py-5 ">
        <Footer />
      </div>
    </div>
  );
};

export default Home;