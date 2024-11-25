
import { Web3Button } from "@web3modal/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import { useTheme } from "../../components/ThemeProvider";

const Presale = () => {
    const themeContext = useTheme();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    return (
        <>
            <Link target="_blank" to="https://zealy.io/cw/skeletonlabs" className="bg-[#020417] text-white w-full flex justify-center py-1 cursor-pointer relative z-[200]">Complete tasks to secure a WL spot and earn exclusive rewards</Link>
            <div className="relative md:max-h-screen md:overflow-hidden">
                <div className="flex justify-end items-center px-10 py-3 md:absolute right-0 z-30">
                    <Link
                        to="https://skeleton-labs.gitbook.io/skeleton-money"
                        target="blank"
                        className="flex items-center justify-start transition-all duration-300 hover:bg-black hover:bg-opacity-[0.04] mr-5"
                    >

                        <p className={`ml-2 text-sm font-medium md:text-white  `}>Docs</p>
                    </Link>
                    <div className="wallet">

                        <Web3Button icon="hide" label="Connect" />
                    </div>
                </div>
                <img src="/presale.jpg" className="w-full hidden sm:block sm:h-screen object-cover" />
                <div className="absolute flex flex-1 flex-col items-center w-full top-14 md:top-0 h-screen justify-center">
                    <div className="  mx-auto  box m-auto min-w-[300px] max-w-[400px] px-3  gap-3 space-y-5  rounded-lg my-14 dark:!bg-gray-900 !bg-gray-200">
                        <Link
                            to="/"
                            className="flex flex-col justify-center items-center gap-3 text-center text-5xl font-bold text-black md:flex-row"
                        >
                            <img src="/presale-logo.png" alt="logo" className="mt-2 w-56 hidden dark:block " />
                            <img src="/presale-logo-black.png" alt="logo" className="mt-2 w-56 dark:hidden " />
                        </Link>

                        <div className="mb-2">
                            <h1 className="text-3xl font-bold dark:text-white text-black mb-1">
                                Registration
                            </h1>
                            <p className="mb-2 dark:text-white text-black">
                                Registration for skeleton exchange presale {" "}
                                <span className="text-primary font-bold">ends in</span>:
                            </p>
                            <div className="flex gap-3">
                                <div className="flex aspect-square basis-[calc(25%-0.5625rem)] flex-col items-center justify-center rounded-md dark:bg-darklight bg-gray-500 dark:bg-opacity-100 bg-opacity-10 dark:text-white text-black">
                                    <h2 className="text-3xl font-bold leading-7">{timeLeft.days}</h2>
                                    <span className="text-sm leading-4 opacity-75">
                                        {timeLeft.days == 1 ? "Day" : "Days"}
                                    </span>
                                </div>
                                <div className="flex aspect-square basis-[calc(25%-0.5625rem)] flex-col items-center justify-center rounded-md dark:bg-darklight bg-gray-500 dark:bg-opacity-100 bg-opacity-10 dark:text-white text-black">
                                    <h2 className="text-3xl font-bold leading-7">{timeLeft.hours}</h2>
                                    <span className="text-sm leading-4 opacity-75">
                                        {timeLeft.hours == 1 ? "Hour" : "Hours"}
                                    </span>
                                </div>

                                <div className="flex aspect-square basis-[calc(25%-0.5625rem)] flex-col items-center justify-center rounded-md dark:bg-darklight bg-gray-500 dark:bg-opacity-100 bg-opacity-10 dark:text-white text-black">
                                    <h2 className="text-3xl font-bold leading-7">
                                        {timeLeft.minutes}
                                    </h2>
                                    <span className="text-sm leading-4 opacity-75">
                                        {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
                                    </span>
                                </div>
                                <div className="flex aspect-square basis-[calc(25%-0.5625rem)] flex-col items-center justify-center rounded-md dark:bg-darklight bg-gray-500 dark:bg-opacity-100 bg-opacity-10 dark:text-white text-black">
                                    <h2 className="text-3xl font-bold leading-7">
                                        {timeLeft.seconds}
                                    </h2>
                                    <span className="text-sm leading-4 opacity-75">
                                        {timeLeft.seconds == 1 ? "Second" : "Seconds"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <input
  type="number"
  id="ticketCount"
  name="ticketCount"
  min="1"
  className="mt-1 w-full max-w-md rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 h-14 text-center"
  placeholder="Enter number of tickets"
/>

                        <button
                            className={`mt-2 h-11 w-full rounded-xl bg-primary text-black p-2 font-[500] shadow-lg transition-all duration-300 ${false ? "cursor-not-allowed opacity-50" : ""
                                }`}
                        >
                            Buy Tickets
                        </button>


                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3
                                        className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold"
                                    >
                                        0
                                    </h3>
                                    <span className="text-sm dark:text-white/70 text-black/70">
                                        Your Tickets
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-5">
                                        0
                                    </h3>
                                    <span className="text-sm dark:text-white/70 text-black/70">
                                        Total Tickets Bought
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row"></div>
                        </div>
                        {/* <div className="mt-2 relative z-20">
                            <Link to="/" className="btn-base bg-green-600 text-white cursor-pointer">
                                Launch Test Dapp
                            </Link>
                        </div> */}
                        <div className="flex items-center justify-center gap-6 mt-3">
                            <a href="https://twitter.com/skeleton_sonic" target="blank">
                                <img src="/x.png" className={`w-5 object-contain dark:block hidden`} alt="" />
                                <img src="/x-black.png" className={`w-5 object-contain dark:hidden block`} alt="" />
                            </a>
                            <a href="https://t.me/SkeletonLabs" target="blank">

                                <img src="/telegram.svg" className={`w-5 object-contain dark:block hidden `} alt="" />
                                <img src="/telegram-black.svg" className={`w-5 object-contain dark:hidden block `} alt="" />
                            </a>


                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Presale;
