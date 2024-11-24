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
      <div className="">
        <div className="contain mx-auto relative isolate flex-col items-start justify-start gap-8  pt-20  ">
          <div className="relative flex w-full flex-col-reverse justify-center items-center gap-4 pt-5 2xl:pt-20 pb-12">
            <Swap />
          </div>
        </div>
      </div>
      <div className="w-full md:w-[30%] flex flex-col items-center gap-2 mx-auto py-5 ">
        <Footer />
      </div>
    </div>
  );
};

export default Home;