
import { useWeb3Modal, Web3Button } from "@web3modal/react";
import { ArrowRight, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";
import LandingHeader from "../../layout/LandingHeader";

const Presale = () => {
    const connectWallet = useWeb3Modal();
    const themeContext = useTheme();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [selected, setSelected] = useState("FTM");

    const paymentMethods = [
        { id: 'FTM', label: 'FTM', icon: <img src='/ftm.png' className="size-7" /> },
        { id: "SONIC", label: "SONIC", icon: <img src='/sonic.png' className="size-7" /> },
    ];

    return (
        <>
            <div className="relative z-[200]">
                <LandingHeader />
            </div>
            <div className="relative bg-black">
                {/* <img src="/presale_bg.jpg" className="w-full hidden sm:block sm:h-screen object-cover absolute" /> */}

                <div className="relative z-50 flex flex-1 flex-col items-center w-full top-14 md:top-0 min-h-screen justify-center pb-20">
                    <div className="mx-auto box m-auto w-[99%] lg:w-[50%] max-w-[700px] px-3  gap-3 space-y-5  rounded-lg my-14 dark:!bg-[#161625] backdrop-blur-sm dark:!text-white !text-black !bg-gray-200 !shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7),0_0_40px_rgba(255,255,255,0.5)] lg:mt-28 lg:mb-20">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <Link
                                    to="/"
                                    className=""
                                >
                                    <img src="/skeleton-anime.gif" alt="logo" className="mt-2 w-28 hidden dark:block " />
                                    <img src="/skeleton-anime-white.gif" alt="logo" className="mt-2 w-28 dark:hidden " />
                                    <div className="text-lg leading-6 -mt-5"><span className="font-bold">Skeleton Money</span> Sonic Presale</div>
                                </Link>
                            </div>
                            <div className="col-span-2">
                                <div className="flex gap-3">
                                    <div className="flex aspect-square basis-[calc(25%-0.5625rem)] flex-col items-center justify-center rounded-md dark:bg-darklight  bg-gray-500 dark:bg-opacity-100 bg-opacity-10 dark:text-white text-black">
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
                        </div>


                        <div className="mb-2">

                            <div className="flex gap-2 items-center">
                                <div className="text-2xl">Buy Bones Coin</div>
                                <div className="w-12 h-12 p-2 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg hidden dark:block">
                                    <img src="/skull-tomb.png" className="w-14 object-cover hidden dark:block" alt="" />
                                </div>
                                <div className="w-12 h-12 p-2 rounded-full overflow-hidden border-4 border-gray-400 shadow-lg dark:hidden">
                                    <img src="/skull-tomb-black.png" className="w-14 object-cover dark:hidden" alt="" />
                                </div>

                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="text-3xl my-2">Skeleton money total raised</div>
                                <div className="text-green-500 -mt-3 font-bold"><ChevronUp /></div>
                                <div className="text-3xl text-green-500 font-bold">22.4%</div>
                            </div>

                            <div className="flex flex-col items-center space-y-4">
                                <h2 className=" text-lg">Select a payment method</h2>
                                <div className="grid grid-cols-5 flex-wrap gap-4">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            className={`flex items-center justify-center px-4 py-3 rounded-lg border ${selected === method.id
                                                ? " border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-900"
                                                : " border-gray-400 dark:border-gray-600 bg-gray-300 dark:bg-gray-800"
                                                }`}
                                            onClick={() => setSelected(method.id)}
                                        >
                                            <div>{method.icon}</div>
                                            <span className="ml-2">{method.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-gray-300 dark:bg-slate-800  rounded-lg p-4 w-full shadow-md mt-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500">{selected}</span>
                                    <span className="text-lg font-medium">
                                        <input className="w-[50px] bg-transparent border-none  focus:outline-none" type="text" placeholder="0.0" />
                                    </span>
                                </div>
                                <div className="text-xl text-gray-400">
                                    <ArrowRight className="text-gray-400" />
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-lg font-medium">0</span>
                                    <span className="text-xs text-gray-500">Bones</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className={`mt-2 h-11 w-full rhSlider-btn rounded-xl bg-primary text-white p-2 font-[500] shadow-lg transition-all duration-300 ${false ? "cursor-not-allowed opacity-50" : ""
                                }`}
                            onClick={connectWallet.open}
                        >
                            Connect Wallet
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

                    </div>
                </div>
            </div>

        </>
    );
};

export default Presale;
