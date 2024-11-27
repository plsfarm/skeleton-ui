import React, { useContext, useEffect } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { useTheme } from "../../components/ThemeProvider";
import Footer from "../../layout/Footer";
import { Context } from "../../utils/Context";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { Link } from "react-router-dom";

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

  return (<>
    <div className="w-full bg-white  dark:bg-[#1e1926] md:max-h-screen">

      <div className="md:max-h-screen md:overflow-hidden">
        <img src="/tomb-landing.png" className="w-full h-full object-cover hidden sm:block" />
        <img src="/tomb-landing-mbl.png" className="w-full h-full object-cover sm:hidden" />
      </div>
      <div className="absolute top-14 flex flex-col items-center w-full">
        <div className="contain mx-auto relative isolate flex-col items-start justify-start gap-8  pt-10  ">
          <div className="relative flex flex-col w-full justify-center items-center gap-4 pt-5 2xl:pt-12 pb-5">
            {/* <div className="text-2xl text-orange-600 font-bold mt-10 md:mt-0">NOT LIVE IN TEST</div> */}
            <div className="flex flex-col items-center justify-between rounded-lg text-white lg:pt-10 pb-16 px-4 min-h-[200px] sm:min-h-[250px] md:min-h-[68vh]">
              {/* Cryptic Text */}
              <div className="text-center">
                <h2 className="text-3xl md:text-6xl font-extrabold tracking-wide font-[Orbitron] mt-10 mb-10 sm:mt-0 uppercase glow-effect">
                  launching on sonic soon
                </h2>
              </div>
              <div>




                {/* Launch Button */}
                <div className="text-center">
                  <Link to="/">
                    <button className="bg-[#00ffed] text-gray-800 font-semibold py-3 px-8 rounded-full text-xl transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7),0_0_40px_rgba(255,255,255,0.5)] font-[Orbitron]">
                      Launch dapp if you dare
                    </button>
                  </Link>


                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="contain mx-auto flex flex-col items-center gap-8 py-10">
      <div className="text-4xl font-bold text-center mt-10 mb-7">
        Limited edition founders NFTs with rares only available by participating in presale you can stake or sell!
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-10">
        {["nft1.jpg", "nft2.jpg", "nft3.jpg", "nft4.jpg"].map((nft, index) => (
          <div
            key={index}
            className="col-span-1 glow-bg-effect relative overflow-hidden rounded-lg"
          >
            <img
              src={`/${nft}`}
              className="w-full transition-transform duration-300 ease-in-out hover:scale-110"
              alt={`NFT ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>


    <div className="w-full md:w-[30%] flex flex-col items-center gap-2 mx-auto py-5  mb-20 md:mb-0">
      <Footer />
    </div>
  </>
  );
};

export default Home;