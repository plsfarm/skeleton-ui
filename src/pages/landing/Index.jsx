import Lottie from "lottie-react";
import React, { useContext, useEffect } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { useTheme } from "../../components/ThemeProvider";
import Footer from "../../layout/Footer";
import { Context } from "../../utils/Context";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import darkPower from './Dark-Power.json';
import lightPower from './Light-Power.json';
import test from './test.json'
import testDark from './test-dark.json'
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
    <div className="w-full bg-white  dark:bg-[#1e1926] pb-10 md:pb-0 md:max-h-screen md:overflow-hidden">
      {
        width > 900 ?
          <div className="absolute md:max-h-screen md:overflow-hidden">
            {
              theme.theme === 'light' ? <Lottie animationData={lightPower} loop={true} /> : <Lottie animationData={darkPower} loop={true} />
            }
          </div> :
          <div className="absolute md:max-h-screen md:overflow-hidden">
            {
              theme.theme === 'light' ? <Lottie animationData={test} loop={true} /> : <Lottie animationData={testDark} loop={true} />
            }
          </div>
      }
      {/*  <video autoPlay muted loop className="absolute z-0 w-full h-full object-cover hidden md:block">
        <source src="/landing.mp4" type="video/mp4" />
      </video>
      <video autoPlay muted loop className="absolute z-0 w-full h-full object-cover md:hidden">
        <source src="/landing-mobile.mp4" type="video/mp4" />
      </video> */}
      <div className="">
        {/* <div className="absolute w-full h-full bg-black bg-opacity-20"></div> */}
        <div className="contain mx-auto relative isolate flex-col items-start justify-start gap-8  pt-20  ">

          <div className="relative flex w-full flex-col-reverse justify-center items-center gap-4 pt-5 2xl:pt-20 pb-12">
            {/* <div className="left-0 top-0 flex flex-col justify-center gap-5 rounded-lg h-full to-transparent p-5  md:gap-3 md:bg-transparent md:bg-gradient-to-r md:px-10 md:max-w-3xl">
              <div>
                <h3 className="w-fit text-4xl md:text-6xl font-semibold text-white pb-5">
                  Soylana Farm presale coming soon!
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-11">
                <Link to="/farming" className="btn-base bg-primary  text-white">Farm Soy</Link>
                <Link to="/" target="_blank" className="btn-base border border-white  text-white hover:bg-gray-400">Read Docs</Link>
              </div>
            </div> */}
            <Swap />
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