import { CalculatorOutlined } from "@ant-design/icons";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import RoiCalcModal from "../../../components/RoiCalcModal";


const ListViewItem = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDetailOpen, setIsDetailOpen] = React.useState(false);

    return (
        <div>
            <div className="px-7 pt-5 pb-10 hover:!bg-gray-200 dark:hover:!bg-gray-900 dark:bg-darklight bg-white rounded-3xl border dark:border-darklight border-gray-300">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3   relative">

                    <div className="absolute -bottom-8 w-full pb-1">
                        <div className="flex justify-center">
                            <div className="size-6 p-1 rounded-full flex justify-center items-center bg-gray-500 cursor-pointer text-white" onClick={() => setIsDetailOpen(!isDetailOpen)}>
                                {
                                    isDetailOpen ? <ChevronUp /> : <ChevronDown />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold relative">

                            <div className="h-20 w-20">
                                <div className="relative h-full w-full items-center flex">
                                    <img src={'/sonic.png'} className="w-12 object-contain" alt="" />

                                </div>
                            </div>

                            <div>
                                <div
                                >
                                    SONIC


                                </div>
                                <p className="text-sm font-medium text-primary">Bones</p>

                            </div>


                        </div>

                    </div>
                    <div className="text-black flex flex-col items-start justify-center">
                        <div className="text-sm dark:text-white/80 text-black/80">APR</div>
                        <div
                            className="flex cursor-pointer gap-2 dark:text-white/80 text-black/80 transition-all duration-150 hover:brightness-50"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <p className="text-sm font-semibold dark:text-white/80 text-black/80">
                                0.00%
                            </p>
                            <CalculatorOutlined className="text-lg text-primary " />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 w-full h-full col-span-2 lg:col-span-1">
                        <Link to={`/farming`} className="btn-base !rounded-lg border dark:border-white/50 border-black/50 px-3 !text-sm !py-2">
                            Claim Rewards
                        </Link>
                        <Link to={`/liquidity`} className="btn-base !rounded-lg border dark:border-white/50 border-black/50 px-3 !text-sm !py-2">
                            Add Liqidity
                        </Link>
                    </div>
                </div>
                {
                    isDetailOpen &&
                    <div className="transition-all duration-300 grid grid-cols-3 text-sm pt-7 gap-5">
                        {/*  <div>
                            <div className="text-lg">30,000,000 <span className="text-gray-500">BMS</span></div>
                            <div className="text-gray-500">Total Raise</div>
                        </div> */}
                        <div>
                            <div className="text-lg">0.012
                                <span className="text-gray-500 ml-1">USDC</span></div>
                            <div className="text-gray-500">Per Bones</div>
                        </div>
                        {/* <div>
                            <div className="text-lg">369,553 </div>
                            <div className="text-gray-500">Total tickets deposited</div>
                        </div> */}
                        {/* <div>
                            <div className="text-lg">60
                                <span className="text-gray-500">USDC</span></div>
                            <div className="text-gray-500">Allocation / Winning Ticket</div>
                        </div> */}
                        <div>
                            <div className="text-lg">04/20/22 10:00
                                <span className="text-gray-500 ml-1">UTC</span></div>
                            <div className="text-gray-500">Pool open</div>
                        </div>
                        <div>
                            <div className="text-lg">04/20/22 22:00
                                <span className="text-gray-500 ml-1">UTC</span></div>
                            <div className="text-gray-500">Pool close</div>
                        </div>
                    </div>
                }
            </div>

            <RoiCalcModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};

export default ListViewItem;
