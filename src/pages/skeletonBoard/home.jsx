import React, { useContext, useEffect } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { useTheme } from "../../components/ThemeProvider";
import Footer from "../../layout/Footer";
import { Context } from "../../utils/Context";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import Swap from "../dapp/swap/Swap";
import Stats from "./Stats";
import Icon from "./Icon";


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
    <div className="w-full bg-gray-200  dark:bg-[#161625] pb-10 md:pb-0">
      <div className="contain mx-auto relative  text-white mt-10">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 ">
            <div className="text-center dark:bg-darklight bg-white border dark:border-darklight border-gray-300 px-5 py-5 rounded-xl dark:text-white text-black shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7),0_0_40px_rgba(255,255,255,0.5)]">
              <div className="text-4xl">500</div>
              <div className="text-gray-500">Total tvl stats</div>
            </div>
            <div className="text-center dark:bg-darklight bg-white border dark:border-darklight border-gray-300 px-5 py-5 rounded-xl dark:text-white text-black shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7),0_0_40px_rgba(255,255,255,0.5)]">
              <div className="text-4xl">30</div>
              <div className="text-gray-500">Value in yCRV</div>
            </div>
            <div className="text-center dark:bg-darklight bg-white border dark:border-darklight flex flex-col justify-center border-gray-300 px-5 py-5 rounded-xl dark:text-white text-black shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7),0_0_40px_rgba(255,255,255,0.5)]">
              <div className="text-4xl">786</div>
              <div className="text-gray-500">Historical APY</div>
            </div>
          </div>
        </div>

      </div>
      <Stats />
      <img src="/skeleton-anime.gif" className="w-52 m-auto hidden dark:block" alt="" />
      <img src="/skeleton-anime-white.gif" className="w-52 m-auto dark:hidden block" alt="" />
      <div className="w-full md:w-[30%] flex flex-col items-center gap-2 mx-auto py-5 ">
        <Footer />
      </div>
    </div>
  );
};

export default Home;