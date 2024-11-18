import { CalculatorOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from 'react-router-dom';
import ListViewItem from './ListViewItem';
import RoiCalcModal from "../../components/RoiCalcModal";
import { formatSmall } from "../../utils/Helper";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react";
import StakeModal from "../../components/StakeModal";



const Stats = () => {
    const [isStakeModal, setIsStakeModal] = React.useState(false);
    const listViewItems = Array.from({ length: 20 }, (_, index) => {
        const isSpecialStyle = index === 0;
        return (
            <div key={index} className={isSpecialStyle ? 'rounded-3xl' : ''}>
                <ListViewItem item={{ pid: index }} />
            </div>
        );
    });


    return (
        <div className='relative pb-10 w-full'>
            <div className='contain mx-auto'>
                <div className='w-full'>
                    <div className='mt-10'>
                        <div className="flex flex-col gap-4 bg-white dark:bg-darklight min-h-[200px] p-7 rounded-lg">
                            <Tabs defaultValue="deposit" className="w-full">
                                <TabsList className='w-full'>
                                    <TabsTrigger value="deposit" className='px-20'>Deposit</TabsTrigger>
                                    <TabsTrigger value="withdraw" className='px-20'>Withdraw</TabsTrigger>
                                </TabsList>
                                <TabsContent value="deposit">
                                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-7">
                                        <div>
                                            <div className="text-base mb-2">From vault</div>
                                            <div className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full flex items-center gap-2" >
                                                <img src='/skicon.png' className="w-6 h-6" alt="" />
                                                st-yCRV
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base mb-2">Amount</div>
                                            <input type="text" placeholder="0" className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full" />
                                        </div>
                                        <div className="flex items-center justify-center pt-7">
                                            <ArrowRight />
                                        </div>
                                        <div>
                                            <div className="text-base mb-2">To wallet</div>
                                            <div className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full flex items-center gap-2" >
                                                <img src='/phex.png' className="w-6 h-6" alt="" />
                                                st-yCRV
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base mb-2">You will receive</div>
                                            <input type="text" placeholder="0" className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full" />
                                        </div>
                                        <div className="flex items-center justify-center mt-7">
                                            <button className="btn-base bg-primary border border-textclr !text-sm" onClick={() => setIsStakeModal(true)} >Deposit</button>
                                        </div>

                                    </div>
                                </TabsContent>
                                <TabsContent value="withdraw">
                                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-7">
                                        <div>
                                            <div className="text-base mb-2">From vault</div>
                                            <div className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full flex items-center gap-2" >
                                                <img src='/phex.png' className="w-6 h-6" alt="" />
                                                st-yCRV
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base mb-2">Amount</div>
                                            <input type="text" placeholder="0" className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full" />
                                        </div>
                                        <div className="flex items-center justify-center pt-7">
                                            <ArrowRight />
                                        </div>
                                        <div>
                                            <div className="text-base mb-2">To wallet</div>
                                            <div className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full flex items-center gap-2" >
                                                <img src='/skicon.png' className="w-6 h-6" alt="" />
                                                st-yCRV
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base mb-2">You will receive</div>
                                            <input type="text" placeholder="0" className="border dark:border-gray-800 dark:bg-gray-800 border-gray-300 rounded-lg px-3 py-2 w-full" />
                                        </div>
                                        <div className="flex items-center justify-center mt-7">
                                            <button className="btn-base bg-primary border border-textclr !text-sm" onClick={() => setIsStakeModal(true)} >Withdraw</button>
                                        </div>

                                    </div>
                                </TabsContent>
                            </Tabs>

                        </div>
                        {/*  <div className='mt-10 grid grid-cols-1 gap-4'>
                            {listViewItems}
                        </div> */}
                    </div>
                </div>
            </div>
            <StakeModal
                isModalOpen={isStakeModal}
                setIsModalOpen={setIsStakeModal}
            />
        </div>
    );
};

export default Stats;


export const
    Box = ({ isPopular, hideAction }) => {
        const [isModalOpen, setIsModalOpen] = React.useState(false);

        const APR = 0
        const TVL = 0
        return (
            <div className="box !bg-darklight flex w-full flex-col items-center justify-start gap-3">
                <div className="flex flex-col w-full flex-1 items-start justify-start gap-1 relative">
                    {
                        isPopular &&
                        <div
                            className={`nectar-gradient-bg px-2 rounded-3xl absolute -top-6 left-16 text-sm font-normal`}
                        >
                            POPULAR FARM
                        </div>
                    }
                    <div>
                        <div

                        >
                            SINGLE STAKING
                        </div>
                        <p className="text-sm font-medium text-primary">EARN Cowtip</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold relative">
                        <div className="h-14 w-14">
                            <div className="relative h-full w-full mt-3">
                                <div className="absolute left-0 top-0 z-10 grid h-[35px] w-[35px] place-items-center rounded-full border border-white/20 bg-dark">
                                    <div className="h-[25px] w-[25px]">
                                        <img src={'/skicon.png'} className="w-full object-contain" alt="" />
                                    </div>
                                </div>
                                <div className="absolute left-5 top-0 right-0 z-10 grid h-[35px] w-[35px] place-items-center rounded-full border border-white/20 bg-dark">
                                    <div className="h-[25px] w-[25px]">
                                        <img src={'/skicon.png'} className="w-full object-contain" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-white">
                            <div className="text-xl">
                                {" "}
                                $0.00 <span className="text-gray-500">COWTIP</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-between gap-2 border-t-2 border-solid border-white/10 pt-4">
                    <p className="text-sm font-normal text-white">APR</p>
                    <div
                        className="flex cursor-pointer gap-2 text-white transition-all duration-150 hover:brightness-50"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <p className="text-sm font-semibold text-white">
                            {isFinite(APR) ? formatSmall(APR, "%0,0") : "∞"}
                        </p>
                        <CalculatorOutlined className="text-lg text-primary " />
                    </div>
                </div>
                {
                    !hideAction &&
                    <div className="flex flex-row justify-between items-center gap-2 w-full">
                        <Link to={`/farming/`} className="btn-base border border-white px-3 !text-sm !py-1">
                            Go to Pool
                        </Link>
                        <button className="btn-base border border-textclr !text-sm !py-1">Buy</button>
                    </div>
                }
                <RoiCalcModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    APR={APR}
                />
            </div>
        );
    };