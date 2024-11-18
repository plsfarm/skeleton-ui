import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import RoiCalcModal from "../../../components/RoiCalcModal";
import StakeModal from "../../../components/StakeModal.jsx";
import ClaimModal from "../../../components/ClaimModal.jsx";


const ListViewItem = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDetailOpen, setIsDetailOpen] = React.useState(false);
    const [isStakeModal, setIsStakeModal] = React.useState(false);
    const [isClaimModal, setIsClaimModal] = React.useState(false);


    return (
        <div>
            <div className={`${isDetailOpen ? '' : 'pb-4'} pt-4 hover:!bg-gray-200 dark:hover:!bg-gray-900 dark:bg-darklight bg-white rounded-3xl border dark:border-darklight border-gray-300 cursor-pointer`} onClick={() => setIsDetailOpen(!isDetailOpen)}>
                <div className="grid grid-cols-12 gap-3 w-full  relative px-7">
                    <div className="flex justify-between col-span-12 lg:col-span-3">
                        <div className="flex items-center gap-2 text-sm font-bold relative">
                            <div className="relative mt-3 mr-2">
                                <div className="h-[45px] w-[45px]">
                                    <img src={'/sonic.png'} className="w-full object-contain" alt="" />
                                </div>
                            </div>
                            <div>
                                SONIC
                            </div>
                        </div>

                    </div>
                    <div className="col-span-6 lg:col-span-2">
                        <div className="text-lg text-gray-500">Pending Rewards </div>
                        <div className="">0 SONIC</div>
                    </div>
                    <div className="col-span-6 lg:col-span-2">
                        <div className="text-lg text-gray-500">Staked </div>
                        <div className="">0 SONIC</div>
                    </div>
                    <div className="col-span-6 lg:col-span-2">
                        <div className="text-lg text-gray-500">APR </div>
                        <div className="">5.26%</div>
                    </div>
                    <div className="col-span-6 lg:col-span-2">
                        <div className="text-lg text-gray-500">Total Staked</div>
                        <div className="">~$71,661,438</div>
                    </div>
                    <div className="col-span-12 lg:col-span-1">
                        <div className="flex justify-center items-center h-full">
                            <div className="size-6 p-1 rounded-full flex justify-center items-center bg-gray-500 text-white" >
                                {
                                    isDetailOpen ? <ChevronUp /> : <ChevronDown />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isDetailOpen &&
                    <div className="transition-all duration-300 grid-cols-1 grid lg:grid-cols-2 text-sm mt-5 gap-5 dark:bg-darklight bg-gray-200 p-5 rounded-3xl rounded-t-none">
                        <div className="border border-gray-500 rounded-xl p-5 grid-cols-1 grid md:grid-cols-2">
                            <div>
                                <div className="text-lg text-gray-500">Deposited</div>
                                <div className="">Bones</div>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-primary text-white rounded-xl px-5 py-3" onClick={(e) => {
                                    e.stopPropagation()
                                    setIsStakeModal(true)
                                }}>Add Liquidity</button>
                            </div>
                        </div>
                        <div className="border border-gray-500 rounded-xl p-5 grid-cols-1 grid md:grid-cols-2">
                            <div>

                            </div>
                            <div className="flex justify-end">
                                <button className="bg-primary text-white rounded-xl px-5 py-3" onClick={(e) => {
                                    e.stopPropagation()
                                    setIsClaimModal(true)
                                }}>Claim</button>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <StakeModal
                isModalOpen={isStakeModal}
                setIsModalOpen={setIsStakeModal}
            />

            <ClaimModal
                isModalOpen={isClaimModal}
                setIsModalOpen={setIsClaimModal}
            />



            <RoiCalcModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};

export default ListViewItem;
