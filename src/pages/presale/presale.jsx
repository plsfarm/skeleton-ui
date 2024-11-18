
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
            <Link target="_blank" to="https://zealy.io/cw/skeletonexchange" className="bg-[#020417] text-white w-full flex justify-center py-1 cursor-pointer relative z-[200]">Complete tasks for chance to win free airdrop</Link>
            <div className="relative md:max-h-screen md:overflow-hidden">
                <div className="flex justify-end items-center px-10 py-3 md:absolute right-0 z-30">
                    {/* <button
                        onClick={() => themeContext.setTheme(themeContext.theme === 'dark' ? 'light' : 'dark')}
                        className=" text-white rounded p-2"
                    >
                        {
                            themeContext.theme === 'dark' ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                        }



                    </button> */}
                    <Link
                        to="https://skeleton-exchange.gitbook.io/skeleton.exchange/"
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
                {/*  <video autoPlay loop muted className="w-full h-screen object-cover hidden 2xl:block">
                    <source src="/ship-banner.mp4" type="video/mp4" />
                </video>
                <video autoPlay loop muted className="w-full h-screen object-cover hidden md:block 2xl:hidden">
                    <source src="/ship-banner.mp4" type="video/mp4" />
                </video> */}
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

                        {/*  <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                            <h3
                                className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-5"
                            >
                                1,600,000
                            </h3>
                            <span className="text-sm dark:text-white/70 text-black/70">
                                Whitelist allocation Blast
                            </span>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                            <h3
                                className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-5"
                            >
                                1,600,000
                            </h3>
                            <span className="text-sm dark:text-white/70 text-black/70">FCFS allocation Blast</span>
                        </div>
                    </div>
                    <input
                        id="amount"
                        className="focus:border-lightBlue h-11 w-full rounded-md border border-gray-500 border-opacity-30 bg-white bg-opacity-10 px-2 text-center dark:text-white text-black outline-none transition-colors duration-300 dark:placeholder:text-white placeholder:text-black placeholder:opacity-30"
                        type="text"
                        placeholder="Enter an amount..."
                    /> */}
                        <button
                            className={`mt-2 h-11 w-full rounded-xl bg-primary text-black p-2 font-[500] shadow-lg transition-all duration-300 ${false ? "cursor-not-allowed opacity-50" : ""
                                }`}
                        >
                            Registration is open
                        </button>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3
                                        className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold"
                                    >
                                        Not registered
                                    </h3>
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-5">
                                        0
                                    </h3>
                                    <span className="text-sm dark:text-white/70 text-black/70">
                                        Registered USERS
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row"></div>
                        </div>
                        <div className="mt-2 relative z-20">
                            <Link to="/" className="btn-base bg-green-600 text-white cursor-pointer">
                                Launch Test Dapp
                            </Link>
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-3">
                            <a href="https://twitter.com/S_Exchange" target="blank">
                                <img src="/x.png" className={`w-5 object-contain dark:block hidden`} alt="" />
                                <img src="/x-black.png" className={`w-5 object-contain dark:hidden block`} alt="" />
                            </a>
                            <a href="https://t.me/SkeletonExchange" target="blank">

                                <img src="/telegram.svg" className={`w-5 object-contain dark:block hidden `} alt="" />
                                <img src="/telegram-black.svg" className={`w-5 object-contain dark:hidden block `} alt="" />
                            </a>


                        </div>
                    </div>
                </div>
                {/*   <div className="absolute bottom-4 flex justify-center w-full">
                    <Footer />
                </div> */}
            </div>

        </>
    );
};

export default Presale;
