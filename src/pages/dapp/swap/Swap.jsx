import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DownOutlined,
    SettingOutlined
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWalletClient } from "wagmi";

import { useWeb3Modal } from "@web3modal/react";
import { Drawer } from "antd";
import CurrencyModal from "../../../components/CurrencyModal";
import SettingModal from "../../../components/SettingModal";
import { Context } from "../../../utils/Context";
import { BITCOIN, SONIC, TRX } from "../../../utils/ContractAddresses";
import { tokens } from "../../../utils/Tokens";
import MaxSlippage from "./MaxSlippage";
import GasPrice from "./GasPrice";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";

const Swap = () => {
    const context = useContext(Context);
    const { data, updateData } = context;
    const { tokenIn, tokenOut } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [isRecentOpen, setIsRecentOpen] = useState(false);
    const [type, setType] = useState();
    const { open } = useWeb3Modal()
    const [openSetting, setOpenSetting] = useState(false);
    const [selectedTokens, setSelectedTokens] = useState({
        from: SONIC,
        to: BITCOIN,
    });
    const [isLoader, setIsLoader] = useState(false);
    const [slippage, setSlippage] = useState(0.5);
    const [swapData, setSwapData] = useState({
        routes: [],
        bestRoute: [],
        amountIn: "",
        amountOut: "",
    });
    const { data: walletClient } = useWalletClient();


    useEffect(() => {
        console.log('swapdata', swapData)
        let timeout;
        if (swapData.amountIn) {
            setIsLoader(true)
            timeout = setTimeout(() => {
                setIsLoader(false)
            }, 2000)
        } else {
            setIsLoader(false)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [swapData])

    console.log('isLoading', isLoader)


    const onSelectClick = (type) => {
        setType(type);
        setIsModalOpen(true);
    };

    const onSwap = () => {
        setSelectedTokens((e) => {
            return {
                from: e.to,
                to: e.from,
            };
        });
        setSwapData((e) => {
            return { ...e, amountIn: e.amountOut, amountOut: e.amountIn };
        });
    };

    const onSelected = (token) => {
        setSelectedTokens((e) => {
            return {
                ...e,
                [type]: token,
            };
        });
    };

    const windowSize = useWindowSize()
    const isSmallScreen = windowSize.width < 768



    console.log('sleccc', selectedTokens)

    return (
        <div className="">
            <video autoPlay muted loop className="absolute z-0 w-full h-full object-cover block left-0 top-0">
                <source src="/swap.mp4" type="video/mp4" />
            </video>
            <div className="md:w-[520px] relative overflow-hidden md:mt-32">
                {/*  <img
        src="/Heat_beat.gif"
        className="absolute left-0 top-5 w-[99%]"
        alt="gif"
      /> */}

                {/*  <div className="absolute -bottom-28 right-3">
                <Popover content={<div className="max-w-[300px]">
                    <p className="text-lg">Here you can swap any assets easily and quickly</p>
                    <button className="btn-base border text-textclr !text-sm !py-1 mt-3">Learn more</button>
                </div>} title="Tips" trigger="click">
                    <img src="/Helpwhite.gif" alt="" className="w-[70px] cursor-pointer" />
                </Popover>

            </div> */}
                <div className="flex justify-between mx-5">
                    <div className="text-xl text-black dark:text-white">
                        <img src='/exchange-black.png' alt="" className="w-[95%] block dark:hidden" />
                        <img src='/exchange.png' alt="" className="w-[95%] hidden dark:block" />
                    </div>
                    <SettingOutlined className="cursor-pointer text-white " onClick={() => setOpenSetting(true)} />
                </div>
                <div>

                    <div className="box relative overflow-hidden !bg-white dark:!bg-darklight border dark:border-gray-900 border-gray-300 text-black dark:text-white mt-5">
                        <div>
                            <div className="flex justify-between">
                                <div className="text-base text-black dark:text-white">From</div>
                            </div>
                            {swapData.amountIn * 1 >
                                data.tokensBalancesAndAllowances[selectedTokens.from]
                                    ?.balance && (
                                    <div className="mt-1 text-sm text-textclr">
                                        The input value is too high.
                                    </div>
                                )}
                            <div className="mt-2 flex items-center justify-between gap-2">
                                <input
                                    className="w-full bg-transparent text-xl text-black dark:text-white outline-none"
                                    placeholder="0"
                                    type="number"
                                    value={swapData.amountIn}
                                    onChange={(e) => {
                                        if (e.target.value === "") {
                                            setSwapData((d) => {
                                                return { ...d, amountIn: "" };
                                            });
                                        } else {
                                            setSwapData((d) => {
                                                return { ...d, amountIn: e.target.value };
                                            });
                                        }
                                    }}
                                />

                                <div
                                    className="flex cursor-pointer items-center gap-2 rounded-full  bg-primary/20 px-3 py-1 text-sm text-black dark:text-white hover:bg-primarylight"
                                    onClick={() => onSelectClick("from")}
                                >
                                    {tokens[selectedTokens.from]?.logo && (
                                        <img
                                            src={tokens[selectedTokens.from]?.logo}
                                            alt={tokens[selectedTokens.from]?.symbol}
                                            className="h-7 w-7 object-contain"
                                        />
                                    )}
                                    <div className="font-medium ">
                                        {tokens[selectedTokens.from]?.symbol || "Select a currency"}
                                    </div>
                                    <DownOutlined style={{ fontSize: "10px", width: 50 }} />
                                </div>
                            </div>
                            <div className="flex gap-2 mt-7 text-sm">
                                <div className="px-5 border border-gray-400 dark:text-white text-black rounded-full hover:bg-blue-100/70    hover:text-black cursor-pointer">25%</div>
                                <div className="px-5 border border-gray-400  dark:text-white text-black rounded-full hover:bg-blue-100/70    hover:text-black cursor-pointer">50%</div>
                                <div className="px-5 border border-gray-400 dark:text-white text-black rounded-full hover:bg-blue-100/70    hover:text-black cursor-pointer">75%</div>
                                <div className="px-5 border border-gray-400 dark:text-white text-black rounded-full hover:bg-blue-100/70    hover:text-black cursor-pointer">100%</div>
                            </div>
                        </div>
                    </div>
                    <div className="my-0 -mt-3 absolute z-30 flex justify-center w-full">
                        {
                            isLoader &&
                            <div className="w-full absolute flex justify-center -top-1">
                                {/*   <Lottie animationData={Loader} loop={true} /> */}
                                <img src="/swaploader.gif" alt="" className="w-[60px] hidden dark:block" />
                                <img src="/swaploader-white.gif" alt="" className=" w-[60px] dark:hidden rounded-full" />
                            </div>
                        }
                        <div
                            className="m-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary/50 hover:bg-primary"
                            onClick={onSwap}
                        >
                            <ArrowUpOutlined className="text-sm" />
                            <ArrowDownOutlined className="text-sm" />
                        </div>

                    </div>

                    <div className="box relative overflow-hidden !bg-white dark:!bg-darklight border dark:border-gray-900 border-gray-300 text-black dark:text-white mt-2">
                        <div className="">
                            <div className="flex justify-between">
                                <div className="text-base text-black dark:text-white">To</div>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2">
                                <input
                                    className="w-full bg-transparent text-xl text-black dark:text-white  outline-none"
                                    placeholder="0"
                                    type="number"
                                    readOnly
                                    value={swapData.amountOut}
                                />

                                <div
                                    className="flex cursor-pointer items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm"
                                    onClick={() => onSelectClick("to")}
                                >
                                    {tokens[selectedTokens.to]?.logo && (
                                        <img
                                            src={tokens[selectedTokens.to]?.logo}
                                            alt={tokens[selectedTokens.to]?.symbol}
                                            className="h-7 w-7 object-contain"
                                        />
                                    )}
                                    <div className="font-medium text-black dark:text-white">
                                        {tokens[selectedTokens.to]?.symbol || "Select a currency"}
                                    </div>
                                    <DownOutlined className="text-black dark:text-white" style={{ fontSize: "10px", width: 50 }} />
                                </div>
                            </div>
                        </div>

                    </div>
                    {
                        !isSmallScreen &&
                        <Drawer
                            getContainer={false}
                            title="Settings"
                            placement={'bottom'}
                            width={500}
                            height={300}
                            onClose={() => setOpenSetting(false)}
                            open={openSetting}
                            className="dark:bg-slate-900"
                        >
                            <div className="space-y-5">
                                <MaxSlippage />
                                <GasPrice />
                            </div>
                        </Drawer>
                    }
                </div>
                <div className="mt-7">
                    <button className="btn-base bg-[#450570]" onClick={open}>Connect</button>
                </div>



                <CurrencyModal
                    setSelected={onSelected}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    alreadySelected={
                        type === "from" ? [selectedTokens.to] : [selectedTokens.from]
                    }
                />
                <SettingModal
                    setIsModalOpen={setIsSettingOpen}
                    isModalOpen={isSettingOpen}
                    slippage={slippage}
                    setSlippage={setSlippage}
                />
                {/* <RecentTransactions
        setIsModalOpen={setIsRecentOpen}
        isModalOpen={isRecentOpen}
      /> */}

            </div>
            {
                isSmallScreen &&
                <Drawer
                    getContainer={false}
                    title="Settings"
                    placement={'bottom'}
                    width={500}
                    height={300}
                    onClose={() => setOpenSetting(false)}
                    open={openSetting}
                    className="dark:bg-slate-900 "
                >
                    <div className="space-y-5">
                        <MaxSlippage />
                        <GasPrice />
                    </div>
                </Drawer>
            }
        </div>

    );
};

export default Swap;
