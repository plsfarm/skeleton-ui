import React from "react";
import { useTheme } from "../../components/ThemeProvider";

const Hero = () => {
  const theme = useTheme()
  return (
    <div className="contain mx-auto relative isolate flex-col items-start justify-start gap-8 pt-8 mt-20">
      <div className="relative flex w-full items-center flex-col-reverse gap-4 overflow-hidden rounded-lg">
        <div className="inset-0 m-auto flex flex-col  justify-center gap-5 rounded-lg  from-black/60 to-transparent p-5 absolute h-[300px] w-full  md:gap-3 bg-transparent bg-gradient-to-r md:px-14">
          <div className="md:max-w-2xl">
            <h3 className="w-fit text-3xl lg:text-5xl font-semibold text-white">
              Stake your bones token to earn high sonic yields daily
            </h3>
          </div>
        </div>
        {
          theme.theme === 'dark' ? <>
            <img src="/skeleton-board.png" className="h-[300px] w-full hidden lg:block  rounded-xl object-cover object-right" />
            <img src="/skeleton-board-mbl.png" className="h-[300px] w-full lg:hidden  rounded-xl object-cover object-bottom" />
          </> : <>
            <img src="/skeleton-board.png" className="h-[300px] w-full hidden lg:block  rounded-xl object-cover object-right" />
            <img src="/skeleton-board-mbl.png" className="h-[300px] w-full lg:hidden  rounded-xl object-cover object-bottom" />
          </>
        }
      </div>
    </div>
  );
};

export default Hero;
