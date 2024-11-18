import React, { createContext, useState, useRef } from "react";
import { getData } from "./Helper";
import { usePublicClient, useWalletClient } from "wagmi";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [data, setData] = useState({
    pulseRatePriceInPLS: 0,
    pulseRatePriceInUSD: 0,
    pulseRateSupply: 0,
    cowtipSharePriceInPLS: 0,
    cowTipPriceInUSD: 0,
    cowTipSupply: 0,
    plsPriceUSD: 0,
    prate_pls_lp_PriceUSD: 0,
    pshare_pls_lp_PriceUSD: 0,
    prate_pshare_lp_PriceUSD: 0,
    bondPriceInPLS: 0,
    bondPriceInUSD: 0,
    bondSupply: 0,
    nextEpochPoint: 0,
    pulseRateCirculatingSupply: 0,
    cowTipCirculatingSupply: 0,
    bondCirculatingSupply: 0,
    pulseRateTwapPrice: 0,
    burnablePulseRateLeft: 0,
    pulseRateTreasuryReserve: 0,
    epoch: 0,
    printRate: 0,
    boardroomPshareBalance: 0,
    boardroomStakedPercentage: 0,
    boardroomTVLUSD: 0,
    boardroomRewards: 0,
    boardroomStakedPShare: 0,
    boardroomRewardsPerDayUSD: 0,
    boardRoomAPR: 0,
    boardroomPSHAREAllowance: 0,
    boardroomCanWithdraw: false,
    boardroomCanClaim: false,
    bondPRATEPrice: 0,
    bondPRATEAllowance: 0,
    bondPBONDAllowance: 0,
    lpList: {},
    tokenSymbols: {},
    poolsViews: [],
    userViews: [],
    totalTVL: 0,
    refEarned: 0,
    tokensBalancesAndAllowances: {},
  });
  const updateData = () => {
    getData(walletClient).then((result) => {
      setData(result);
      //  console.log({ result });
    });
  };
  return (
    <Context.Provider value={{ data, updateData }}>{children}</Context.Provider>
  );
}
//
