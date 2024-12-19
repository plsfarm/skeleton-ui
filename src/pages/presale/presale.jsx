
import { useWeb3Modal, Web3Button } from "@web3modal/react";
import { ArrowRight, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";
import LandingHeader from "../../layout/LandingHeader";
import React, { useRef, useEffect, useState } from "react";
import { getData, callBuy } from "./interfacePresale.js";
import { usePublicClient, useWalletClient } from "wagmi";
import { parseUnits } from "viem";
import { formatSmall } from "../../utils/Helper.js";

const Presale = () => {
    const connectWallet = useWeb3Modal();
    const themeContext = useTheme();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [selected, setSelected] = useState("SONIC");
    const [data, setData] = useState({
        FtmContributed: 0,
        FcfsStartTime: 0,
        PublicStartTime: 0,
        bonesBought: 0,
        preRegistered: false,
        presaleStartTime: 0,
        totalContribution: 0,
        walletMax: 0,
        walletMin: 0,
    });

    const paymentMethods = [
        { id: 'FTM', label: 'FTM', icon: <img src='/ftm.png' className="size-7" /> },
        { id: "SONIC", label: "SONIC", icon: <img src='/sonic.png' className="size-7" /> },
    ];

    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();
    const startTime = 1734634800;
    const intervalTime = useRef();
    const [amount, setAmount] = useState(0);
    const [userInput, setUserInput] = useState("");


    const handleChange = (event) => {
        setUserInput(event.target.value);
        setAmount(parseUnits(event.target.value, 18));
        amountRef.current = parseUnits(event.target.value, 18);
    };

    const formatAddress = (address) => {
        if (!address) return "";
        return `${address.substring(0, 5)}....${address.substring(
            address.length - 3
        )}`;
    };

    const handleBuyClick = async () => {
        callBuy(walletClient, amount)
            .then((response) => {
                if (response && response.error) {
                    // console.log("Error Response:", response.error); // Log the error response for debugging
                    const errorMessage =
                        response.error.message ||
                        response.error.errorMessage ||
                        response.error;
                    const match = errorMessage.match(
                        /reverted with reason string '(.*?)'/
                    );
                    if (match && match[1]) {
                        alert(match[1]);
                    } else {
                        alert(errorMessage);
                    }
                    return;
                }
                setTimeout(() => {
                    setAmount(0);
                    setUserInput("");
                }, 3000);
            })
            .catch((error) => {
                console.error("Transaction failed:", error);
                alert("Transaction failed. Error: " + error.message);
            });
    };

    function secondsToTime(secs) {
        const days = Math.floor(secs / (24 * 60 * 60));
        const divisor_for_hours = secs % (24 * 60 * 60);
        const hours = Math.floor(divisor_for_hours / (60 * 60));
        const divisor_for_minutes = divisor_for_hours % (60 * 60);
        const minutes = Math.floor(divisor_for_minutes / 60);
        const seconds = Math.ceil(divisor_for_minutes % 60);
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    const updateEndTime = (endTime) => {
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("endTime", endTime)
        const timeLeftInSeconds = startTime - currentTime;
        console.log("timeLeftInSeconds", timeLeftInSeconds);
        if (timeLeftInSeconds > 0) {
            const formattedTime = secondsToTime(timeLeftInSeconds);
            setTimeLeft(formattedTime);
        } else {
            setTimeLeft({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
        }
    };

    const isPresaleExpired = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const presaleStart = data.presaleStartTime;
        return currentTime > presaleStart;
    };

    useEffect(() => {
        const fetchDataAndUpdateTime = async () => {
            try {
                const result = await getData(walletClient, publicClient);
                console.log(result);
                setData(result);
                startTimer(result.presaleStartTime); // Use fetched presaleStartTime here
                console.log("startTime", result.presaleStartTime); // Log the fetched startTime
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataAndUpdateTime();
        const intervalData = setInterval(fetchDataAndUpdateTime, 10000);

        return () => {
            clearInterval(intervalData);
        };
    }, [walletClient, publicClient]);

    const startTimer = (startTime) => {
        if (intervalTime.current) {
            clearInterval(intervalTime.current);
        }
        updateEndTime(startTime);

        intervalTime.current = setInterval(() => updateEndTime(startTime), 1000);
    };

    const Totalcontributed = formatSmall(data.totalContribution, "0,0.[00]");
    const contributed = formatSmall(data.FtmContributed, "0,0.[00]");
    const estimatedBones = formatSmall(data.bonesBought, "0,0.[00]");
    const WalletMax = formatSmall(data.walletMax, "0,0.[00]");
    const WalletMin = formatSmall(data.walletMin, "0,0.[00]");
    const presaleExpired = isPresaleExpired();
    const isButtonDisabled = !presaleExpired;
    // const isButtonDisabled = false;

    return (
        <>
            <div className="relative z-[200]">
                <LandingHeader />
            </div>
            <div className="relative bg-black">
                <div className="relative z-50 flex flex-1 flex-col items-center w-full top-14 md:top-0 min-h-screen justify-center pb-20">
                    <div className="mx-auto box m-auto w-[99%] lg:w-[50%] max-w-[700px] px-3 gap-3 space-y-5 rounded-lg my-14 dark:!bg-[#161625] backdrop-blur-sm dark:!text-white !text-black !bg-gray-200 !shadow-[0_0_15px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7),0_0_40px_rgba(255,255,255,0.5)] lg:mt-28 lg:mb-20">

                        {/* Logo Section */}
                        <div className="col-span-1 text-center mb-4">
                            <Link to="/" className="">
                                <img src="/skeleton-anime.gif" alt="logo" className="mt-1 w-16 hidden dark:block" />
                                <img src="/skeleton-anime-white.gif" alt="logo" className="mt-1 w-16 dark:hidden" />

                                <div className="text-lg leading-6 -mt-5">
                                    <span className="font-bold">Skeleton Money</span> Sonic Presale
                                </div>
                            </Link>
                        </div>

                        {/* Timer Section */}
                        <div className="grid grid-cols-4 gap-3 justify-center mb-6">
                            {["Days", "Hours", "Minutes", "Seconds"].map((unit, idx) => (
                                <div key={unit} className="flex aspect-square flex-col items-center justify-center rounded-md dark:bg-darklight bg-gray-500 dark:bg-opacity-100 bg-opacity-10 dark:text-white text-black">
                                    <h2 className="text-3xl font-bold leading-7">
                                        {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][idx]}
                                    </h2>
                                    <span className="text-sm leading-4 opacity-75">{unit}</span>
                                </div>
                            ))}
                        </div>

                        {/* Presale Info */}
                        <div className="mb-2">
                        <div className="text-2xl">Hardcap - 150,000 S</div>
                            <div className="flex gap-2 items-center">
                            
                                <div className="text-2xl">Min 100 S - Max 5,000 S</div>
                                <div className="w-12 h-12 p-2 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg hidden dark:block">
                                    <img src="/skull-tomb.png" className="w-14 object-cover hidden dark:block" alt="" />
                                </div>
                                <div className="w-12 h-12 p-2 rounded-full overflow-hidden border-4 border-gray-400 shadow-lg dark:hidden">
                                    <img src="/skull-tomb-black.png" className="w-14 object-cover dark:hidden" alt="" />
                                </div>
                            </div>

                            <div className="flex gap-1 items-center">
                            </div>

                            <div className="flex flex-col items-center space-y-4">
                                {/* <h2 className="text-lg">Select a payment method</h2> */}
                                {/* <div className="grid grid-cols-5 flex-wrap gap-4">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        className={`flex items-center justify-center px-4 py-3 rounded-lg border ${selected === method.id
                                            ? "border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-900"
                                            : "border-gray-400 dark:border-gray-600 bg-gray-300 dark:bg-gray-800"
                                            }`}
                                        onClick={() => setSelected(method.id)}
                                    >
                                        <div>{method.icon}</div>
                                        <span className="ml-2">{method.label}</span>
                                    </button>
                                ))}
                            </div> */}
                            </div>

                            <div className="flex items-center justify-between bg-gray-300 dark:bg-slate-800 rounded-lg p-4 w-full shadow-md mt-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500">{selected}</span>
                                    <span className="text-lg font-medium">
                                        <input
                                            className="w-[50px] bg-transparent border-none focus:outline-none"
                                            type="text"
                                            placeholder="0.0"
                                            value={userInput}
                                            onChange={handleChange}
                                        />
                                    </span>
                                </div>
                                <div className="text-xl text-gray-400">
                                    <ArrowRight className="text-gray-400" />
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-500">Bones</span>
                                    <span className="text-lg font-medium">{userInput}</span>

                                </div>
                            </div>
                        </div>

                        <button
                            className={`mt-2 h-11 w-full rhSlider-btn rounded-xl bg-primary text-white p-2 font-[500] shadow-lg transition-all duration-300 ${false ? "cursor-not-allowed opacity-50" : ""}`}
                            onClick={handleBuyClick}
                            disabled={true}
                        >
                            Buy
                        </button>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
                                        {data.preRegistered ? "Registered" : "Not registered"}
                                    </h3>
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-5">
                                        {Totalcontributed}
                                    </h3>
                                    <span className="text-sm dark:text-white/70 text-black/70">Total Raised</span>
                                </div>

                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-5">
                                        {estimatedBones}
                                    </h3>
                                    <span className="text-sm dark:text-white/70 text-black/70">Your Contribution</span>
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-5">
                                       {estimatedBones}
                                    </h3>
                                    <span className="text-sm dark:text-white/70 text-black/70">Expected Bones</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Presale;
