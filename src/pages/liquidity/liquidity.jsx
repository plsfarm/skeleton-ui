import React, { useState } from "react";
import LandingHeader from "../../layout/LandingHeader";
import { DownOutlined, InfoCircleFilled } from "@ant-design/icons";
import CurrencyModal from "../../components/CurrencyModal";
import { BITCOIN, SOL } from "../../utils/ContractAddresses";
import { tokens } from "../../utils/Tokens";
import { Link } from "react-router-dom";
import Footer from '../../layout/Footer'

const Liquidity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState();
  const [selectedTokens, setSelectedTokens] = useState({
    first: SOL,
    second: null,
  });

  const onSelectClick = (type) => {
    setType(type);
    setIsModalOpen(true);
  };

  const onSelected = (token) => {
    setSelectedTokens((e) => {
      return {
        ...e,
        [type]: token,
      };
    });
  };

  return (
    <div className="">
      <LandingHeader />
      <div className="my-36 !px-5 md:!px-32 contain mx-auto relative">
        <div className="w-full">
          <div className="text-xl">Deposit Liquidity</div>
          <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="bg-white dark:bg-darklight p-5 rounded-xl">
              <div className="text-base mb-2">First Token</div>
              <div className="rounded-lg p-3 flex justify-between border border-gray-500 items-center cursor-pointer" onClick={() => onSelectClick("first")}>
                <div className="text-base flex gap-2 items-center">
                  <img src={tokens[selectedTokens.first]?.logo}
                    alt={tokens[selectedTokens.first]?.symbol} className="w-5 h-5" />
                  <div>Bitcoin</div>
                </div>
                <div>
                  <DownOutlined />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-darklight p-5 rounded-xl">
              <div className="text-base mb-2">Second Token</div>
              <div className="rounded-lg p-3 flex justify-between border border-gray-500 items-center cursor-pointer" onClick={() => onSelectClick("second")}>
                {
                  !selectedTokens.second ? <div className="text-sm text-gray-500">Select a token</div> :
                    <div className="text-base flex gap-2 items-center">
                      <img src={tokens[selectedTokens.second]?.logo}
                        alt={tokens[selectedTokens.second]?.symbol} className="w-5 h-5" />
                      <div>
                        {tokens[selectedTokens.second]?.symbol}
                      </div>
                    </div>
                }
                <div>
                  <DownOutlined />
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-darklight p-5 rounded-xl opacity-60 font-light text-sm">
                <InfoCircleFilled className="mr-2" />
                Start by selecting the tokens. The liquidity pools available for deposit will show up next.
              </div>
            </div>
          </div>
          <div className="mt-5">
            {
              (selectedTokens.second && selectedTokens.first) &&
              <>
                <div className="text-lg mb-3">Available Pools</div>
                <div className="px-7 py-5 hover:!bg-gray-200 dark:hover:!bg-gray-900 dark:bg-darklight bg-white rounded-3xl border dark:border-darklight border-gray-300">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3   relative">

                    <div className="flex justify-between col-span-2">
                      <div className="flex items-center gap-2 text-sm font-bold relative">

                        <div className="h-14 w-14">
                          <div className="relative h-full w-full mt-3">
                            <div className="absolute left-0 top-0 z-10 grid h-[35px] w-[35px] place-items-center rounded-full border border-white/20 bg-dark">
                              <div className="h-[25px] w-[25px]">
                                <img src={
                                  tokens[selectedTokens.first]?.logo
                                } className="w-full object-contain" alt="" />
                              </div>
                            </div>
                            <div className="absolute left-5 top-0 right-0 z-10 grid h-[35px] w-[35px] place-items-center rounded-full border border-white/20 bg-dark">
                              <div className="h-[25px] w-[25px]">
                                <img src={
                                  tokens[selectedTokens.second]?.logo
                                } className="w-full object-contain" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div
                          >
                            {tokens[selectedTokens.first]?.symbol}/ {tokens[selectedTokens.second]?.symbol}


                          </div>
                          <p className="text-sm font-medium text-primary">Basic Volatile
                            ·
                            0.3%
                          </p>

                        </div>


                      </div>

                    </div>
                    <div className="text-black flex flex-col items-start justify-center">
                      <div className="text-sm dark:text-white/80 text-black/80">TVL</div>
                      <div
                        className="flex cursor-pointer gap-2 dark:text-white/80 text-black/80 transition-all duration-150"
                      >
                        <p className="text-sm font-semibold dark:text-white/80 text-black/80">
                          79.73 $
                        </p>
                      </div>
                    </div>
                    <div className="text-black flex flex-col items-start justify-center">
                      <div className="text-sm dark:text-white/80 text-black/80">APR</div>
                      <div
                        className="flex cursor-pointer gap-2 dark:text-white/80 text-black/80 transition-all duration-150"
                      >
                        <p className="text-sm font-semibold dark:text-white/80 text-black/80">
                          0.00%
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 w-full h-full col-span-2 lg:col-span-1">
                      <Link to={`/liquidity`} className="btn-base !rounded-lg border dark:border-white/50 border-black/50 px-3 !text-sm !py-2">
                        New Deposit
                      </Link>
                    </div>
                  </div>

                </div>
              </>
            }
          </div>
        </div>
      </div>
      <div className="contain mx-auto flex justify-center">
        <Footer />
      </div>
      <CurrencyModal
        setSelected={onSelected}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        alreadySelected={
          type === "from" ? [selectedTokens.to] : [selectedTokens.from]
        }
      />
    </div>
  );
};

export default Liquidity;
