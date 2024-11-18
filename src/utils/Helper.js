import {
  multicall,
  fetchBalance,
  waitForTransaction,
  prepareWriteContract,
  readContract,
} from "@wagmi/core";
import { pulsechain, hardhat } from "@wagmi/core/chains";
import {
  formatUnits,
  parseUnits,
  isAddress,
  formatEther,
  parseEther,
  hexToBigInt,
} from "viem";
import ShareRewardPoolABI from "./ShareRewardPoolABI.json";
import CowTipFarmABI from "./CowTipFarm.json";
import PresaleDistributorABI from "./PresaleDistributorABI.json";
import SingleStakingABI from "./SingleStakingABI.json";
import StakingVaultABI from "./StakingVaultABI.json";
import LotteryABI from "./LotteryABI.json";
import CoinFlipABI from "./CoinFlipABI.json";
import DiceABI from "./DiceABI.json";
import RouletteABI from "./RouletteABI.json";
import RandomNumberGeneratorABI from "./RandomNumberGeneratorABI.json";
import LPABI from "./LPABI.json";
import { erc20ABI } from "wagmi";
import {
  PresaleDistributorAddress,
  PRATEAddress,
  COWTIPAddress,
  PulseRateRouterAddress,
  CommunityFundAddress,
  PLS_DAI_LP_Address,
  PRATE_PLS_LP_Address,
  COWTIP_PLS_LP_Address,
  PRATE_PSHARE_LP_Address,
  CowTipFarmAddress,
  SingleStakingAddress,
  StakingVaultAddress,
  LotteryAddress,
  CoinFlipAddress,
  DiceAddress,
  RouletteAddress,
  BankRollAddress,
  RandomNumberGeneratorAddress,
  WPLS,
  USDC,
  USDT,
  DAI
} from "./ContractAddresses";
import { findRoutes } from "./RouteFinder";
import { tokens, casinoTokens } from "./Tokens";
import numeral from "numeral";

const PRATEContract = {
  address: PRATEAddress,
  abi: erc20ABI,
};
const COWTIPContract = {
  address: COWTIPAddress,
  abi: erc20ABI,
};
const CowTipFarmContract = {
  address: CowTipFarmAddress,
  abi: CowTipFarmABI,
};
const singleStakingContract = {
  address: SingleStakingAddress,
  abi: SingleStakingABI,
};
const stakingVaultContract = {
  address: StakingVaultAddress,
  abi: StakingVaultABI,
};
const PLS_DAI_LP_Contract = {
  address: PLS_DAI_LP_Address,
  abi: LPABI,
};
const PRATE_PLS_LP_Contract = {
  address: PRATE_PLS_LP_Address,
  abi: LPABI,
};
const COWTIP_PLS_LP_Contract = {
  address: COWTIP_PLS_LP_Address,
  abi: LPABI,
};
const PRATE_PSHARE_LP_Contract = {
  address: PRATE_PSHARE_LP_Address,
  abi: LPABI,
};
const lotteryContract = {
  address: LotteryAddress,
  abi: LotteryABI,
};
const coinFlipContract = {
  address: CoinFlipAddress,
  abi: CoinFlipABI,
};
const diceContract = {
  address: DiceAddress,
  abi: DiceABI,
};
const rouletteContract = {
  address: RouletteAddress,
  abi: RouletteABI,
};
const RandomNumberGeneratorContract = {
  address: RandomNumberGeneratorAddress,
  abi: RandomNumberGeneratorABI,
};
const PresaleDistributorContract = {
  address: PresaleDistributorAddress,
  abi: PresaleDistributorABI,
};

 const chain = pulsechain;
// const chain = hardhat;

const AddressZero = "0x0000000000000000000000000000000000000000";
const AddressDead = "0x000000000000000000000000000000000000dEaD";
const MaxUint256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const setChain = async (walletClient) => {
  await walletClient.switchChain({ id: chain.id });
  await delay(1000);
};

export const getData = async (walletClient) => {
  const firstCalls = [
    {
      ...PRATE_PLS_LP_Contract,
      functionName: "getReserves",
    }, // PRATE_PLS_LP_Reserves 1
    {
      ...PRATE_PLS_LP_Contract,
      functionName: "totalSupply",
    }, // PRATE_PLS_LP_TotalSupply 2
    {
      ...COWTIP_PLS_LP_Contract,
      functionName: "getReserves",
    }, // COWTIP_PLS_LP_Reserves 3
    {
      ...COWTIP_PLS_LP_Contract,
      functionName: "totalSupply",
    }, // COWTIP_PLS_LP_TotalSupply 4
    {
      ...PLS_DAI_LP_Contract,
      functionName: "getReserves",
    }, // PLS_DAI_LP_Reserves 5
    {
      ...PLS_DAI_LP_Contract,
      functionName: "totalSupply",
    },// PLS_DAI_LP_TotalSupply 6
    {
      ...PRATE_PSHARE_LP_Contract,
      functionName: "getReserves",
    }, // PRATE_PSHARE_LP_Reserves 7
    {
      ...PRATE_PSHARE_LP_Contract,
      functionName: "totalSupply",
    }, // PRATE_PSHARE_LP_TotalSupply 8
    {
      ...COWTIPContract,
      functionName: "totalSupply",
    }, // COWTIPSupply 10
    {
      ...COWTIPContract,
      functionName: "balanceOf",
      args: [CowTipFarmAddress],
    }, // COWTIPBalanceRewardPool 11
    {
      ...COWTIPContract,
      functionName: "balanceOf",
      args: [AddressZero],
    }, // COWTIPBalanceDead 12
    {
      ...COWTIPContract,
      functionName: "balanceOf",
      args: [AddressDead],
    }, // COWTIPBalanceRewardPool 13
    {
      ...CowTipFarmContract,
      functionName: "getAllPoolViews",
    }, // REWARD_POOL_POOLS_VIEWS 19
    {
      ...CowTipFarmContract,
      functionName: "getUserViews",
      args: [walletClient?.account.address],
    }, // REWARD_POOL_USER_VIEWS 20
    {
      ...CowTipFarmContract,
      functionName: "referralEarned",
      args: [walletClient?.account.address],
    }, // REWARD_POOL_REF_EARNED 21
    {
      ...PRATEContract,
      functionName: "totalSupply",
    },
    { ...singleStakingContract, functionName: "totalCOWTIPStaked" },
    { ...singleStakingContract, functionName: "totalLPClaimed" },
    { ...singleStakingContract, functionName: "rewardsPerSecond" },
    { ...singleStakingContract, functionName: "endTime" },
    { ...singleStakingContract, functionName: "totalCrops" },
    { ...singleStakingContract, functionName: "totalStakesCount" },
    {
      ...singleStakingContract,
      functionName: "getUserStats",
      args: [walletClient?.account.address],
    },
    {
      ...singleStakingContract,
      functionName: "getUserActiveStakes",
      args: [walletClient?.account.address],
    },
    {
      ...COWTIPContract,
      functionName: "allowance",
      args: [walletClient?.account.address, SingleStakingAddress],
    },
    { ...stakingVaultContract, functionName: "lastStakingRound" },
    { ...stakingVaultContract, functionName: "currentRewards" },
    { ...stakingVaultContract, functionName: "totalRewards" },
    { ...stakingVaultContract, functionName: "stakingRoundDuration" },
    { ...stakingVaultContract, functionName: "distributionPercentage" },
    {
      ...singleStakingContract,
      functionName: "getUserPendingPLSAllStakes",
      args: [walletClient?.account.address],
    },
    {
      ...PRATEContract,
      functionName: "allowance",
      args: [walletClient?.account.address, LotteryAddress],
    },
    
  ];
  let calls = [...firstCalls];

  const tokensForBalance = Object.values(tokens).filter(
    (token) => token.address !== AddressZero
  );
  const tokensForAllowanceRouter = Object.values(tokens).filter(
    (token) => token.address !== AddressZero && (token.swap || token.liquidity)
  );
  const tokensForAllowanceFarm = Object.values(tokens).filter(
    (token) => token.liquidity
  );
  const tokensForAllowanceCoinFlip = Object.values(casinoTokens).filter(
    (token) => token.address !== AddressZero
  );
  const tokensForAllowanceDice = Object.values(casinoTokens).filter(
    (token) => token.address !== AddressZero
  );
  tokensForBalance.forEach((token) => {
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [walletClient?.account.address],
    });
  });
  tokensForAllowanceRouter.forEach((token) => {
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [walletClient?.account.address, PulseRateRouterAddress],
    });
  });
  tokensForAllowanceFarm.forEach((token) => {
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [walletClient?.account.address, CowTipFarmAddress],
    });
  });
  tokensForAllowanceCoinFlip.forEach((token) => {
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [walletClient?.account.address, CoinFlipAddress],
    });
  });

  const ethBalance = walletClient?.account.address
    ? (
        await fetchBalance({
          chainId: chain.id,
          address: walletClient?.account.address,
        })
      ).value
    : 0;
  const data = await multicall({
    chainId: chain.id,
    contracts: calls,
  });
  // console.log({ data });
  let [
    PRATE_PLS_LP_Reserves,
    PRATE_PLS_LP_TotalSupply,
    COWTIP_PLS_LP_Reserves,
    COWTIP_PLS_LP_TotalSupply,
    PLS_DAI_LP_Reserves,
    PLS_DAI_LP_TotalSupply,
    PRATE_PSHARE_LP_Reserves,
    PRATE_PSHARE_LP_TotalSupply,
    COWTIPSupply,
    COWTIPBalanceRewardPool,
    COWTIPBalanceZero,
    COWTIPBalanceDead,
    REWARD_POOL_POOLS_VIEWS,
    REWARD_POOL_USER_VIEWS,
    REWARD_POOL_REF_EARNED,
    PRATESupply,
    SINGLESTAKING_TOTALPRATESTAKED,
    SINGLESTAKING_TOTALPLSCLAIMED,
    SINGLESTAKING_REWARDSPERSECOND,
    SINGLESTAKING_ENDTIME,
    SINGLESTAKING_TOTALHEARTBEATS,
    SINGLESTAKING_TOTALSTAKESCOUNT,
    SINGLESTAKING_USERSTATS,
    SINGLESTAKING_USERACTIVESTAKES,
    SINGLESTAKING_COWTIPALLOWANCE,
    STAKINGVAULT_LASTSTAKINGROUND,
    STAKINGVAULT_CURRENTREWARDS,
    STAKINGVAULT_TOTALREWARDS,
    STAKINGVAULT_STAKINGROUNDDURATION,
    STAKINGVAULT_DISTRIBUTIONPERCENTAGE,
    SINGLESTAKING_USERREWARDS,
    LOTTERY_ALLOWANCE,
  ] = data.map((v) => v.result);

  let STAKINGVAULT_PLSBALANCE = (
    await fetchBalance({
      chainId: chain.id,
      address: StakingVaultAddress,
    })
  ).value;

  // console.log({ data });

  let tokensBalancesAndAllowances = {
    [AddressZero]: {
      balance: formatEther(ethBalance),
      unformatedBalance: ethBalance,
    },
  };
  let lastIndex = firstCalls.length;
  data.slice(lastIndex, lastIndex + tokensForBalance.length).map((d, i) => {
    if (d.result) {
      tokensBalancesAndAllowances[tokensForBalance[i].address] = {
        ...tokensBalancesAndAllowances[tokensForBalance[i].address],
        balance: formatUnits(
          d.result,
          tokens[tokensForBalance[i].address].decimals
        ),
        unformatedBalance: d.result,
      };
    } else {
      tokensBalancesAndAllowances[tokensForBalance[i].address] = {
        ...tokensBalancesAndAllowances[tokensForBalance[i].address],
        balance: 0,
        unformatedBalance: 0,
      };
    }
  });
  lastIndex += tokensForBalance.length;
  data
    .slice(lastIndex, lastIndex + tokensForAllowanceRouter.length)
    .map((d, i) => {
      if (d.result) {
        tokensBalancesAndAllowances[tokensForAllowanceRouter[i].address] = {
          ...tokensBalancesAndAllowances[tokensForAllowanceRouter[i].address],
          routerAllowance: formatUnits(
            d.result,
            tokens[tokensForAllowanceRouter[i].address].decimals
          ),
          unformatedRouterAllowance: d.result,
        };
      } else {
        tokensBalancesAndAllowances[tokensForAllowanceRouter[i].address] = {
          ...tokensBalancesAndAllowances[tokensForAllowanceRouter[i].address],
          routerAllowance: 0,
          unformatedRouterAllowance: 0,
        };
      }
    });
  lastIndex += tokensForAllowanceRouter.length;
  data
    .slice(lastIndex, lastIndex + tokensForAllowanceFarm.length)
    .map((d, i) => {
      if (d.result) {
        tokensBalancesAndAllowances[tokensForAllowanceFarm[i].address] = {
          ...tokensBalancesAndAllowances[tokensForAllowanceFarm[i].address],
          farmAllowance: formatUnits(
            d.result,
            tokens[tokensForAllowanceFarm[i].address].decimals
          ),
          unformatedFarmAllowance: d.result,
        };
      } else {
        tokensBalancesAndAllowances[tokensForAllowanceFarm[i].address] = {
          ...tokensBalancesAndAllowances[tokensForAllowanceFarm[i].address],
          farmAllowance: 0,
          unformatedFarmAllowance: 0,
        };
      }
    });
  lastIndex += tokensForAllowanceFarm.length;
  data
    .slice(lastIndex, lastIndex + tokensForAllowanceCoinFlip.length)
    .map((d, i) => {
      if (d.result) {
        tokensBalancesAndAllowances[tokensForAllowanceCoinFlip[i].address] = {
          ...tokensBalancesAndAllowances[tokensForAllowanceCoinFlip[i].address],
          coinFlipAllowance: formatUnits(
            d.result,
            tokens[tokensForAllowanceCoinFlip[i].address].decimals
          ),
          unformatedCoinFlipAllowance: d.result,
        };
      } else {
        tokensBalancesAndAllowances[tokensForAllowanceCoinFlip[i].address] = {
          ...tokensBalancesAndAllowances[tokensForAllowanceCoinFlip[i].address],
          coinFlipAllowance: 0,
          unformatedCoinFlipAllowance: 0,
        };
      }
    });

  // console.log({ tokensBalancesAndAllowances });
  const PLSPriceUSD = PLS_DAI_LP_Reserves[0]
    ? formatEther(PLS_DAI_LP_Reserves[1]) / formatEther(PLS_DAI_LP_Reserves[0])
    : 0;

  const PLS_DAI_LP_PriceUSD = PLS_DAI_LP_TotalSupply
    ? (formatEther(PLS_DAI_LP_Reserves[0]) * 2 * PLSPriceUSD) /
      formatEther(PLS_DAI_LP_TotalSupply)
    : 0;

  const PRATEPricePLS = PRATE_PLS_LP_Reserves
    ? formatEther(PRATE_PLS_LP_Reserves[1]) /
      formatEther(PRATE_PLS_LP_Reserves[0])
    : 0;
  const PRATEPriceUSD = PRATEPricePLS * PLSPriceUSD;
  const PRATE_PLS_LP_PriceUSD = PRATE_PLS_LP_TotalSupply
    ? (formatEther(PRATE_PLS_LP_Reserves[0]) * 2 * PRATEPriceUSD) /
      formatEther(PRATE_PLS_LP_TotalSupply)
    : 0;

  const COWTIPPricePLS = COWTIP_PLS_LP_Reserves
    ? formatEther(COWTIP_PLS_LP_Reserves[1]) /
      formatEther(COWTIP_PLS_LP_Reserves[0])
    : 0;

    
  const COWTIPPriceUSD = COWTIPPricePLS * PLSPriceUSD;

  const COWTIP_PLS_LP_PriceUSD = COWTIP_PLS_LP_TotalSupply
    ? (formatEther(COWTIP_PLS_LP_Reserves[0]) * 2 * COWTIPPriceUSD) /
      formatEther(COWTIP_PLS_LP_TotalSupply)
    : 0;
  COWTIPSupply = COWTIPSupply ? COWTIPSupply : 0;
  COWTIPBalanceZero = COWTIPBalanceZero ? COWTIPBalanceZero : 0;
  COWTIPBalanceDead = COWTIPBalanceDead ? COWTIPBalanceDead : 0;
  COWTIPBalanceRewardPool = COWTIPBalanceRewardPool
    ? COWTIPBalanceRewardPool
    : 0;

  const PRATE_PSHARE_LP_PriceUSD = PRATE_PSHARE_LP_TotalSupply
    ? (formatEther(PRATE_PSHARE_LP_Reserves[1]) * 2 * PRATEPriceUSD) /
      formatEther(PRATE_PSHARE_LP_TotalSupply)
    : 0;

    REWARD_POOL_POOLS_VIEWS = REWARD_POOL_POOLS_VIEWS
    ? REWARD_POOL_POOLS_VIEWS.map((pool) => {
        return {
          pid: parseInt(pool.pid),
          token: pool.token,
          allocPoint: parseInt(pool.allocPoint),
          lastRewardTime: parseInt(pool.lastRewardTime),
          depositFeeBP: parseInt(pool.depositFeeBP),
          withdrawFeeBP: parseInt(pool.withdrawFeeBP), // New field
          accTokensPerShare: formatEther(pool.accTokensPerShare),
          isStarted: pool.isStarted,
          externalFarm: pool.externalFarm, // New field
          lpBalance: formatEther(pool.lpBalance), // New field, assuming it's a BigNumber
          rewardsPerSecond: formatEther(pool.rewardsPerSecond)
        };
      })
    : [];
  
  REWARD_POOL_USER_VIEWS = REWARD_POOL_USER_VIEWS
    ? REWARD_POOL_USER_VIEWS.map((pool) => {
        return {
          lpBalance: formatEther(pool.lpBalance),
          unformatedLpBalance: pool.lpBalance,
          pid: parseInt(pool.pid),
          stakedAmount: formatEther(pool.stakedAmount),
          unformattedStakedAmount: pool.stakedAmount,
          unclaimedRewards: formatEther(pool.unclaimedRewards),
        };
      })
    : [];
  REWARD_POOL_REF_EARNED = REWARD_POOL_REF_EARNED ? REWARD_POOL_REF_EARNED : 0;
  SINGLESTAKING_TOTALPRATESTAKED = SINGLESTAKING_TOTALPRATESTAKED
    ? SINGLESTAKING_TOTALPRATESTAKED
    : 0;
  SINGLESTAKING_TOTALPLSCLAIMED = SINGLESTAKING_TOTALPLSCLAIMED
    ? SINGLESTAKING_TOTALPLSCLAIMED
    : 0;
  SINGLESTAKING_REWARDSPERSECOND = SINGLESTAKING_REWARDSPERSECOND
    ? SINGLESTAKING_REWARDSPERSECOND
    : 0;
  SINGLESTAKING_ENDTIME = SINGLESTAKING_ENDTIME ? SINGLESTAKING_ENDTIME : 0;
  SINGLESTAKING_TOTALHEARTBEATS = SINGLESTAKING_TOTALHEARTBEATS
    ? SINGLESTAKING_TOTALHEARTBEATS
    : 0;
  SINGLESTAKING_TOTALSTAKESCOUNT = SINGLESTAKING_TOTALSTAKESCOUNT
    ? SINGLESTAKING_TOTALSTAKESCOUNT
    : 0;
  SINGLESTAKING_USERSTATS = SINGLESTAKING_USERSTATS
    ? {
        activeStakesIDs: SINGLESTAKING_USERSTATS[0].map((d) => parseInt(d)),
        endedStakesIDs: SINGLESTAKING_USERSTATS[1].map((d) => parseInt(d)),
        claimed: formatEther(SINGLESTAKING_USERSTATS[2]),
        staked: formatEther(SINGLESTAKING_USERSTATS[3]),
        lastDepositTime: parseInt(SINGLESTAKING_USERSTATS[4]),
        lastClaimTime: parseInt(SINGLESTAKING_USERSTATS[5]),
        lastWithdrawTime: parseInt(SINGLESTAKING_USERSTATS[6]),
        totalHeartBeat: formatEther(SINGLESTAKING_USERSTATS[7]),
      }
    : {
        activeStakesIDs: [],
        endedStakesIDs: [],
        claimed: 0,
        staked: 0,
        lastDepositTime: 0,
        lastClaimTime: 0,
        lastWithdrawTime: 0,
        totalHeartBeat: 0,
      };
  SINGLESTAKING_USERACTIVESTAKES = SINGLESTAKING_USERACTIVESTAKES
    ? SINGLESTAKING_USERACTIVESTAKES.map((d) => {
        return {
          amount: formatEther(d.amount),
          claimed: formatEther(d.claimed),
          duration: parseInt(d.duration),
          crop: formatEther(d.crop),
          id: parseInt(d.id),
          lastClaim: parseInt(d.lastClaim),
          lastUpdate: parseInt(d.lastUpdate),
          pendingRewards: formatEther(d.pendingRewards),
          stakeEndTime: parseInt(d.stakeEndTime),
          stakeWithdrawTime: parseInt(d.stakeWithdrawTime),
        };
      })
    : [];
  SINGLESTAKING_COWTIPALLOWANCE = SINGLESTAKING_COWTIPALLOWANCE
    ? SINGLESTAKING_COWTIPALLOWANCE
    : 0;
  STAKINGVAULT_LASTSTAKINGROUND = STAKINGVAULT_LASTSTAKINGROUND
    ? STAKINGVAULT_LASTSTAKINGROUND
    : 0;
  STAKINGVAULT_CURRENTREWARDS = STAKINGVAULT_CURRENTREWARDS
    ? STAKINGVAULT_CURRENTREWARDS
    : 0;
  STAKINGVAULT_TOTALREWARDS = STAKINGVAULT_TOTALREWARDS
    ? STAKINGVAULT_TOTALREWARDS
    : 0;
  STAKINGVAULT_STAKINGROUNDDURATION = STAKINGVAULT_STAKINGROUNDDURATION
    ? STAKINGVAULT_STAKINGROUNDDURATION
    : 0;
  STAKINGVAULT_DISTRIBUTIONPERCENTAGE = STAKINGVAULT_DISTRIBUTIONPERCENTAGE
    ? STAKINGVAULT_DISTRIBUTIONPERCENTAGE
    : 0;
  STAKINGVAULT_PLSBALANCE = STAKINGVAULT_PLSBALANCE
    ? STAKINGVAULT_PLSBALANCE
    : 0;
  SINGLESTAKING_USERREWARDS = SINGLESTAKING_USERREWARDS
    ? SINGLESTAKING_USERREWARDS
    : 0;
  LOTTERY_ALLOWANCE = LOTTERY_ALLOWANCE ? LOTTERY_ALLOWANCE : 0;

  const { LPList, tokenSymbols } = await getPrices(
    REWARD_POOL_POOLS_VIEWS,
    PLSPriceUSD,
    PRATEPriceUSD,
    COWTIPPriceUSD,
    walletClient
  );

  console.log("COWTIPPriceUSD = ", COWTIPPriceUSD)
  const pulseRateCirculatingSupply =
    formatEther(PRATESupply);

  const cowTipCirculatingSupply =
    formatEther(COWTIPSupply) -
    formatEther(COWTIPBalanceDead) -
    formatEther(COWTIPBalanceZero) -
    formatEther(COWTIPBalanceRewardPool);

  const singleStakingTVL =
    formatEther(SINGLESTAKING_TOTALPRATESTAKED) * COWTIPPriceUSD;

// console.log("LPList:", LPList);
// console.log("REWARD_POOL_POOLS_VIEWS:", REWARD_POOL_POOLS_VIEWS);
// console.log("singleStakingTVL:", singleStakingTVL);


  let totalTVL = REWARD_POOL_POOLS_VIEWS.reduce((prev, curr) => {
    const tvl = curr.lpBalance * (LPList[curr.token].LPPrice || 0);
    return prev + tvl;
  }, 0);
  totalTVL += singleStakingTVL;


  return {
    pulseRatePriceInPLS: PRATEPricePLS,
    pulseRatePriceInUSD: PRATEPriceUSD,
    pulseRateSupply: formatEther(PRATESupply) * 1,
    cowtipSharePriceInPLS: COWTIPPricePLS,
    cowTipPriceInUSD: COWTIPPriceUSD,
    cowTipSupply: formatEther(COWTIPSupply) * 1,
    plsPriceUSD: PLSPriceUSD,
    prate_pls_lp_PriceUSD: PRATE_PLS_LP_PriceUSD,
    pshare_pls_lp_PriceUSD: COWTIP_PLS_LP_PriceUSD,
    prate_pshare_lp_PriceUSD: PRATE_PSHARE_LP_PriceUSD,
    cowTipCirculatingSupply,
    lpList: LPList,
    tokenSymbols,
    poolsViews: REWARD_POOL_POOLS_VIEWS,
    userViews: REWARD_POOL_USER_VIEWS,
    totalTVL,
    refEarned: formatEther(REWARD_POOL_REF_EARNED),
    tokensBalancesAndAllowances,
    totalCOWTIPStaked: formatEther(SINGLESTAKING_TOTALPRATESTAKED),
    singleTotalPLSClaimed: formatEther(SINGLESTAKING_TOTALPLSCLAIMED),
    singleRewardsPerSecond: formatEther(SINGLESTAKING_REWARDSPERSECOND),
    singleEndTime: parseInt(SINGLESTAKING_ENDTIME),
    singleTotalHeartBeats: formatEther(SINGLESTAKING_TOTALHEARTBEATS),
    singleTotalStakesCount: parseInt(SINGLESTAKING_TOTALSTAKESCOUNT),
    singleUserStats: SINGLESTAKING_USERSTATS,
    singleUserRewards: formatEther(SINGLESTAKING_USERREWARDS),
    singleUserActiveStakes: SINGLESTAKING_USERACTIVESTAKES,
    singleCOWTIPAllowance: formatEther(SINGLESTAKING_COWTIPALLOWANCE),
    stakingVaultLastStakingRound: parseInt(STAKINGVAULT_LASTSTAKINGROUND),
    stakingVaultCurrentRewards: formatEther(STAKINGVAULT_CURRENTREWARDS),
    stakingVaultTotalRewards: formatEther(STAKINGVAULT_TOTALREWARDS),
    stakingVaultStakingRoundDuration: parseInt(
      STAKINGVAULT_STAKINGROUNDDURATION
    ),
    stakingVaultDistributionPercentage: parseFloat(
      parseInt(STAKINGVAULT_DISTRIBUTIONPERCENTAGE) / 10000
    ),
    stakingVaultBalance: formatEther(STAKINGVAULT_PLSBALANCE),
    lotteryPRATEAllowance: formatEther(LOTTERY_ALLOWANCE),
  };
};

export const claimRewardPool = async ({ walletClient, pid }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...CowTipFarmContract,
      functionName: "deposit",
      args: [pid, 0, CommunityFundAddress],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approveTokenToRewardPool = async ({ walletClient, token }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      address: token,
      abi: erc20ABI,
      functionName: "approve",
      args: [CowTipFarmAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const depositRewardPool = async ({
  walletClient,
  amount,
  max,
  pid,
  referrer,
}) => {
  let fixedAmount =
    parseEther(amount.toString()) > max ? max : parseEther(amount.toString());
  // console.log({ amount, pid, referrer });
  if (!referrer || referrer === walletClient.account.address) {
    referrer = CommunityFundAddress;
  }
  console.log(referrer);
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...CowTipFarmContract,
      functionName: "deposit",
      args: [pid, fixedAmount, referrer],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};
export const unstakeRewardPool = async ({ walletClient, amount, max, pid }) => {
  let fixedAmount =
    parseEther(amount.toString()) > max ? max : parseEther(amount.toString());

  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...CowTipFarmContract,
      functionName: "withdraw",
      args: [pid, fixedAmount],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};


export const singleClaim = async ({ walletClient, stakeId }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...singleStakingContract,
      functionName: "claimRewards",
      args: [stakeId],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const singleWithdraw = async ({ walletClient, stakeId }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...singleStakingContract,
      functionName: "endStake",
      args: [stakeId],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const singleClaimAll = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...singleStakingContract,
      functionName: "claimAllStakes",
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const singleWithdrawAll = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...singleStakingContract,
      functionName: "endAllStakes",
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const singleDeposit = async ({
  walletClient,
  amount,
  max,
  duration,
}) => {
  let fixedAmount =
    parseEther(amount.toString()) > max ? max : parseEther(amount.toString());
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...singleStakingContract,
      functionName: "deposit",
      args: [fixedAmount, duration],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approvePRATESingle = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...PRATEContract,
      functionName: "approve",
      args: [singleStakingContract.address, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approveCOWTIPSingle = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...COWTIPContract,
      functionName: "approve",
      args: [singleStakingContract.address, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};


const getPrices = async (
  PoolsView,
  PLSPriceUSD,
  PRATEPriceUSD,
  COWTIPPriceUSD,
  walletClient
) => {
  let calls = [];
  PoolsView.map((pool) => {
    calls.push({
      address: pool.token,
      abi: LPABI,
      functionName: "token0",
    });
    calls.push({
      address: pool.token,
      abi: LPABI,
      functionName: "token1",
    });
    calls.push({
      address: pool.token,
      abi: LPABI,
      functionName: "getReserves",
    });
    
    calls.push({
      address: pool.token,
      abi: LPABI,
      functionName: "totalSupply",
    });
    calls.push({
      address: pool.token,
      abi: LPABI,
      functionName: "allowance",
      args: [walletClient?.account.address, CowTipFarmAddress],
    });
  });
  let data = await multicall({
    chainId: chain.id,
    contracts: calls,
  });
  let LPList = {};
  // console.log(data)


for (let i = 0; i < (data.length) / 5; i++) {
    const LPAddress = PoolsView[i].token;
    // const token0Address = data[5 * i].result ? data[5 * i].result : AddressZero;
    // const token1Address = data[5 * i + 1].result ? data[5 * i + 1].result : AddressZero;
    // console.log("token0",tokens[token0Address]);
    // console.log("token1",tokens[token1Address]);
    // if (!tokens[token0Address] || !tokens[token1Address]) {
    //     console.log(`Token data not found for: ${token0Address} or ${token1Address}`);
    //     console.log("token0",tokens[token0Address]);
    //     console.log("token1",tokens[token1Address]);
    //     continue;
    // }
    
    LPList[LPAddress] = {
      token0: data[5 * i].result ? data[5 * i].result : AddressZero,
      token1: data[5 * i + 1].result ? data[5 * i + 1].result : AddressZero,
      
      reserves: data[5 * i + 2].result
        ? {
            token0: formatUnits(
              data[5 * i + 2].result[0],
              tokens[data[5 * i].result].decimals
            ),
            token1: formatUnits(
              data[5 * i + 2].result[1],
              tokens[data[5 * i + 1].result].decimals
            ),
          }
        : [],
      totalSupply: data[5 * i + 3].result
        ? formatEther(data[5 * i + 3].result)
        : 0,
      allowanceShareRewardPool: data[5 * i + 4].result
        ? formatEther(data[5 * i + 4].result)
        : 0,
      poolId: i,
    };
// console.log("PLSPriceUSD", PLSPriceUSD)
// console.log(`Processing LPAddress: ${LPAddress}`);

if (!LPList[LPAddress] || !LPList[LPAddress].reserves) {
  console.log(`LPList[${LPAddress}] or reserves not defined`);
  continue; 
}

// console.log(`Reserves:`, LPList[LPAddress].reserves);
// console.log(`Processing LPAddress: ${LPAddress}`);
// console.log(`Token0: ${LPList[LPAddress].token0}, Token1: ${LPList[LPAddress].token1}`);
// console.log(`Reserves Token0: ${LPList[LPAddress].reserves.token0}, Reserves Token1: ${LPList[LPAddress].reserves.token1}`);
// console.log(`Total Supply: ${LPList[LPAddress].totalSupply}`);
// console.log(`PLSPriceUSD: ${PLSPriceUSD}, PRATEPriceUSD: ${PRATEPriceUSD}, COWTIPPriceUSD: ${COWTIPPriceUSD}`);

    if (
      LPList[LPAddress].token0 === WPLS ||
      LPList[LPAddress].token1 === WPLS
    ) {
      if (LPList[LPAddress].token0 === WPLS) {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token0 * 2 * PLSPriceUSD) /
          LPList[LPAddress].totalSupply;
      } else {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token1 * 2 * PLSPriceUSD) /
          LPList[LPAddress].totalSupply;
      }
    } else if (
      LPList[LPAddress].token0 === USDT ||
      LPList[LPAddress].token1 === USDT
    ) {
      if (LPList[LPAddress].token0 === USDT) {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token0 * 2) /
          LPList[LPAddress].totalSupply;
      } else {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token1 * 2) /
          LPList[LPAddress].totalSupply;
      }
    } else if (
      LPList[LPAddress].token0 === PRATEAddress ||
      LPList[LPAddress].token1 === PRATEAddress
    ) {
      if (LPList[LPAddress].token0 === PRATEAddress) {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token0 * 2 * PRATEPriceUSD) /
          LPList[LPAddress].totalSupply;
      } else {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token1 * 2 * PRATEPriceUSD) /
          LPList[LPAddress].totalSupply;
      }
    } else if (
      LPList[LPAddress].token0 === COWTIPAddress ||
      LPList[LPAddress].token1 === COWTIPAddress
    ) {
      if (LPList[LPAddress].token0 === COWTIPAddress) {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token0 * 2 * COWTIPPriceUSD) /
          LPList[LPAddress].totalSupply;
      } else {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token1 * 2 * COWTIPPriceUSD) /
          LPList[LPAddress].totalSupply;
      }
    }
  }
  let tokenSymbols = {};
  calls = [];
  Object.values(LPList).map((LP) => {
    calls.push({
      address: LP.token0,
      abi: erc20ABI,
      functionName: "symbol",
    });
    calls.push({
      address: LP.token1,
      abi: erc20ABI,
      functionName: "symbol",
    });
  });
  data = await multicall({
    chainId: chain.id,
    contracts: calls,
  });
  Object.values(LPList).map((LP, index) => {
    tokenSymbols[LP.token0] = data[2 * index].result;
    tokenSymbols[LP.token1] = data[2 * index + 1].result;
  });
  tokenSymbols[AddressZero] = "PLS";
  return { LPList, tokenSymbols };
};

// presale claim


export const getPresaleData = async (walletClient) => {
  let calls = [
    {
      ...PresaleDistributorContract,
      functionName: "users",
      args: [walletClient?.account.address],
    },
    {
      ...PresaleDistributorContract,
      functionName: "pendingCowTip",
      args: [walletClient?.account.address],
    },
    {
      ...PresaleDistributorContract,
      functionName: "endTime",
    },
  ];
  const results = (
    await multicall({
      chainId: chain.id,
      contracts: calls,
    })
  ).map((d) => d.result);
  return {
    cowtipBought: formatEther((results[0] && results[0][0]) || 0),
    cowtipClaimed: formatEther((results[0] && results[0][1]) || 0),
    lastClaimTime: parseInt((results[3] && results[3]) || 0),
    hasStaked: !!(results[0] && results[0][3]),
    hasClaimed: !!(results[0] && results[0][3]),
    pendingCowTip: formatEther((results[1] && results[1]) || 0),
    endTime: parseInt((results[2] && results[2]) || 0),
  };
};

export const claimPresale = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...PresaleDistributorContract,
      functionName: "claim",
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return {
      success: false,
      error:
        err.cause?.reason || err.shortMessage || err.message || err.details,
    };
  }
};

export const stakePresale = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...PresaleDistributorContract,
      functionName: "stake",
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return {
      success: false,
      error:
        err.cause?.reason || err.shortMessage || err.message || err.details,
    };
  }
};


export const getCurrentLotteryStats = async (playerAddress) => {
  const currentLotteryId = parseInt(
    await readContract({
      chainId: chain.id,
      ...lotteryContract,
      functionName: "viewCurrentLotteryId",
    })
  );
  const currentTicketId = parseInt(
    await readContract({
      chainId: chain.id,
      ...lotteryContract,
      functionName: "currentTicketId",
    })
  );
  let lotteryStats = await getLotteryStats(currentLotteryId, playerAddress);
  lotteryStats = {
    ...lotteryStats,
    ticketsSold: currentTicketId - lotteryStats.firstTicketId,
  };
  return lotteryStats;
};

export const getLotteryStats = async (lotteryId, playerAddress) => {
  let ticketCount = 0,
    tickets = [];
  let lotteryStats = await readContract({
    chainId: chain.id,
    ...lotteryContract,
    functionName: "viewLottery",
    args: [lotteryId],
  });
  lotteryStats = {
    lotteryId: lotteryId,
    amountCollectedInPrate: parseFloat(
      formatEther(lotteryStats.amountCollectedInPrate)
    ),
    countWinnersPerBracket: lotteryStats.countWinnersPerBracket.map((winners) =>
      parseInt(winners)
    ),
    discountDivisor: parseInt(lotteryStats.discountDivisor),
    endTime: parseInt(lotteryStats.endTime),
    finalNumber: parseInt(lotteryStats.finalNumber),
    firstTicketId: parseInt(lotteryStats.firstTicketId),
    firstTicketIdNextLottery: parseInt(lotteryStats.firstTicketIdNextLottery),
    pratePerBracket: lotteryStats.pratePerBracket.map((prate) =>
      parseFloat(formatEther(prate))
    ),
    prateToWinPerBracket: lotteryStats.rewardsBreakdown.map(
      (breakdown) =>
        (parseInt(breakdown) *
          parseFloat(formatEther(lotteryStats.amountCollectedInPrate))) /
        10000
    ),
    priceTicketInPrate: parseFloat(
      formatEther(lotteryStats.priceTicketInPrate)
    ),
    rewardsBreakdown: lotteryStats.rewardsBreakdown.map((breakdown) =>
      parseInt(breakdown)
    ),
    startTime: parseInt(lotteryStats.startTime),
    status: parseInt(lotteryStats.status),
    treasuryFee: parseInt(lotteryStats.treasuryFee),
    prateToTreasury:
      (parseInt(lotteryStats.treasuryFee) *
        parseFloat(formatEther(lotteryStats.amountCollectedInPrate))) /
      10000,
  };
  if (playerAddress) {
    ticketCount = parseInt(
      await readContract({
        chainId: chain.id,
        ...lotteryContract,
        functionName: "viewTicketsCountForLotteryId",
        args: [playerAddress, lotteryId],
      })
    );
    if (ticketCount > 0) {
      let calls = [];
      for (let i = 0; i < ticketCount; i++) {
        calls.push({
          ...lotteryContract,
          functionName: "viewAllStatsForLotteryIdByTicketIndex",
          args: [playerAddress, lotteryId, i],
        });
      }
      const result = (
        await multicall({
          chainId: chain.id,
          contracts: calls,
        })
      ).map((d) => d.result);
      result.forEach((ticket) => {
        tickets.push({
          id: parseInt(ticket[0]),
          number: numberToTicket(ticket[1]),
          status: ticket[2],
          rewards: parseFloat(formatEther(ticket[3])),
          bracket: ticket[4],
        });
      });
    }
  }
  lotteryStats = { ...lotteryStats, tickets, ticketCount };
  return lotteryStats;
};

export const getPlayerHistoryStats = async (playerAddress) => {
  const currentLotteryId = parseInt(
    await readContract({
      chainId: chain.id,
      ...lotteryContract,
      functionName: "viewCurrentLotteryId",
    })
  );
  let calls = [];
  for (let i = 1; i < currentLotteryId; i++) {
    calls.push({
      ...lotteryContract,
      functionName: "viewTicketsCountForLotteryId",
      args: [playerAddress, i],
    });
    calls.push({
      ...lotteryContract,
      functionName: "viewLottery",
      args: [i],
    });
  }
  const results = (
    await multicall({
      contracts: calls,
    })
  ).map((d) => d.result);
  let ticketCounts = {};
  let lotteriesStats = {};
  for (let i = 0; i < results.length / 2; i++) {
    ticketCounts[i + 1] = parseInt(results[2 * i]);
    let tempStats = results[2 * i + 1];
    lotteriesStats[i + 1] = {
      lotteryId: i + 1,
      amountCollectedInPrate: parseFloat(
        formatEther(tempStats.amountCollectedInPrate)
      ),
      countWinnersPerBracket: tempStats.countWinnersPerBracket.map((winners) =>
        parseInt(winners)
      ),
      discountDivisor: parseInt(tempStats.discountDivisor),
      endTime: parseInt(tempStats.endTime),
      finalNumber: parseInt(tempStats.finalNumber),
      firstTicketId: parseInt(tempStats.firstTicketId),
      firstTicketIdNextLottery: parseInt(tempStats.firstTicketIdNextLottery),
      pratePerBracket: tempStats.pratePerBracket.map((prate) =>
        parseFloat(formatEther(prate))
      ),
      prateToWinPerBracket: tempStats.rewardsBreakdown.map(
        (breakdown) =>
          (parseInt(breakdown) *
            parseFloat(formatEther(tempStats.amountCollectedInPrate))) /
          10000
      ),
      priceTicketInPrate: parseFloat(formatEther(tempStats.priceTicketInPrate)),
      rewardsBreakdown: tempStats.rewardsBreakdown.map((breakdown) =>
        parseInt(breakdown)
      ),
      startTime: parseInt(tempStats.startTime),
      status: parseInt(tempStats.status),
      treasuryFee: parseInt(tempStats.treasuryFee),
      prateToTreasury:
        (parseInt(tempStats.treasuryFee) *
          parseFloat(formatEther(tempStats.amountCollectedInPrate))) /
        10000,
    };
  }
  calls = [];
  for (let i = 1; i < currentLotteryId; i++) {
    for (let j = 0; j < ticketCounts[i]; j++) {
      calls.push({
        ...lotteryContract,
        functionName: "viewAllStatsForLotteryIdByTicketIndex",
        args: [playerAddress, i, j],
      });
    }
  }
  const allTickets = (
    await multicall({
      contracts: calls,
    })
  ).map((d) => {
    const ticket = d.result;
    return {
      id: parseInt(ticket[0]),
      number: numberToTicket(ticket[1]),
      status: ticket[2],
      rewards: parseFloat(formatEther(ticket[3])),
      bracket: ticket[4],
    };
  });
  let ticketsByLotteryId = {};
  let totalTickets = 0;
  for (let i = 1; i < currentLotteryId; i++) {
    let tickets = [];
    for (let j = 0; j < ticketCounts[i]; j++) {
      tickets.push(allTickets[totalTickets + j]);
    }
    totalTickets += tickets.length;
    ticketsByLotteryId[i] = { lotteryId: i, tickets };
  }
  return { ticketsByLotteryId, lotteriesStats };
};

export const approvePRATELottery = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...PRATEContract,
      functionName: "approve",
      args: [LotteryAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const buyTickets = async ({
  walletClient,
  lotteryId,
  tickets,
  random = false,
  quantity = 0,
}) => {
  if (random) {
    tickets = getRandomTickets(quantity);
  }
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...lotteryContract,
      functionName: "buyTickets",
      args: [walletClient.account.address, lotteryId, tickets],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const claimTickets = async ({ walletClient, lottery }) => {
  const ticketIds = lottery.tickets.map((ticket) => ticket.id);
  const brackets = lottery.tickets.map((ticket) => ticket.bracket);
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...lotteryContract,
      functionName: "claimTickets",
      args: [lottery.lotteryId, ticketIds, brackets],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const getCoinFlipStats = async (walletClient) => {
  let calls = [];
  const bankRollPLSBalance = await fetchBalance({
    chainId: chain.id,
    address: BankRollAddress,
  });

  Object.values(casinoTokens).forEach((token) => {
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [BankRollAddress],
    });
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [walletClient?.account.address, CoinFlipAddress],
    });
    calls.push({
      ...coinFlipContract,
      functionName: "viewMaxWager",
      args: [token.address],
    });
  });
  calls = [
    ...calls,
    { ...coinFlipContract, functionName: "multiplier" },
    { ...RandomNumberGeneratorContract, functionName: "randomGeneratorFee" },
  ];
  const result = (await multicall({ contracts: calls, chainId: chain.id })).map(
    (d) => d.result
  );
  let tokens = {};
  for (let i = 0; i < Object.values(casinoTokens).length; i++) {
    const token = Object.values(casinoTokens)[i];
    tokens[token.address] = {
      bankrollBalance:
        token.address === AddressZero
          ? bankRollPLSBalance.formatted
          : formatUnits(result[3 * i], casinoTokens[token.address].decimals),
      allowance:
        token.address === AddressZero
          ? hexToBigInt(MaxUint256)
          : result[3 * i + 1],
      maxWager: formatUnits(
        result[3 * i + 2],
        casinoTokens[token.address].decimals
      ),
    };
  }

  let lastIndex = Object.values(casinoTokens).length;
  const multiplier = formatUnits(result[3 * lastIndex], 6);
  const randomGeneratorFee = formatEther(result[3 * lastIndex + 1]);
  return { tokens, multiplier, randomGeneratorFee };
};

export const getCoinFlipGames = async (walletClient, type, page, pageSize) => {
  let gamesLength = 0;
  let games = [];
  if (type === 0) {
    gamesLength = parseInt(
      await readContract({
        ...coinFlipContract,
        functionName: "viewTotalGames",
        chainId: chain.id,
      })
    );
    const cursor =
      page * pageSize <= gamesLength ? gamesLength - page * pageSize : 0;
    const quantity =
      page * pageSize <= gamesLength ? pageSize : gamesLength % pageSize;
    games = await readContract({
      ...coinFlipContract,
      functionName: "viewGames",
      args: [cursor, quantity],
      chainId: chain.id,
    });
  } else {
    gamesLength = parseInt(
      await readContract({
        ...coinFlipContract,
        functionName: "viewPlayerGamesLength",
        args: [walletClient?.account.address],
        chainId: chain.id,
      })
    );
    const cursor =
      page * pageSize <= gamesLength ? gamesLength - page * pageSize : 0;
    const quantity =
      page * pageSize <= gamesLength ? pageSize : gamesLength % pageSize;
    games = await readContract({
      ...coinFlipContract,
      functionName: "viewPlayerGames",
      args: [walletClient?.account.address, cursor, quantity],
      chainId: chain.id,
    });
  }
  games = games.map((game) => {
    return {
      gameId: parseInt(game.gameId),
      payout: parseFloat(
        formatUnits(game.payout, casinoTokens[game.wagerAddress].decimals)
      ),
      multiplier: formatUnits(game.multiplier, 6),
      player: game.player,
      requestId: parseInt(game.requestId),
      side: game.side,
      status: game.status,
      timestamp: parseInt(game.timestamp),
      wagerAddress: game.wagerAddress,
      wagerAmount: parseFloat(
        formatUnits(game.wagerAmount, casinoTokens[game.wagerAddress].decimals)
      ),
      randomWord: parseInt(game.randomWord),
      canGetRefund: game.canGetRefund,
    };
  });
  games.reverse();
  // console.log({ gamesLength, games });
  return { gamesLength, games };
};

export const playCoinFlip = async ({
  walletClient,
  side,
  wagerAmount,
  wagerAddress,
  randomGeneratorFee,
}) => {
  let value = 0;
  if (wagerAddress === AddressZero) {
    value =
      parseEther(wagerAmount.toString()) +
      parseEther(randomGeneratorFee.toString());
  } else {
    value = parseEther(randomGeneratorFee.toString());
  }

  wagerAmount = parseUnits(
    wagerAmount.toString(),
    casinoTokens[wagerAddress].decimals
  );
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...coinFlipContract,
      functionName: "play",
      args: [wagerAmount, wagerAddress, side],
      value,
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true, hash };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const refundCoinFlip = async ({ walletClient, gameId }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...coinFlipContract,
      functionName: "refund",
      args: [gameId],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approveTokenToCoinFlip = async ({ walletClient, token }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      address: token,
      abi: erc20ABI,
      functionName: "approve",
      args: [CoinFlipAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const getDiceStats = async (walletClient) => {
  let calls = [];
  const bankRollPLSBalance = await fetchBalance({
    chainId: chain.id,
    address: BankRollAddress,
  });

  Object.values(casinoTokens).forEach((token) => {
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [BankRollAddress],
    });
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [walletClient?.account.address, DiceAddress],
    });
  });
  calls = [
    ...calls,
    {
      ...diceContract,
      functionName: "houseEdge",
    },
    { ...RandomNumberGeneratorContract, functionName: "randomGeneratorFee" },
  ];
  const result = (await multicall({ contracts: calls, chainId: chain.id })).map(
    (d) => d.result
  );
  let tokens = {};
  for (let i = 0; i < Object.values(casinoTokens).length; i++) {
    const token = Object.values(casinoTokens)[i];
    tokens[token.address] = {
      bankrollBalance:
        token.address === AddressZero
          ? bankRollPLSBalance.formatted
          : formatUnits(result[2 * i], casinoTokens[token.address].decimals),
      allowance:
        token.address === AddressZero
          ? hexToBigInt(MaxUint256)
          : result[2 * i + 1],
    };
  }

  let lastIndex = Object.values(casinoTokens).length;
  const houseEdge = formatEther(result[2 * lastIndex]);
  const randomGeneratorFee = formatEther(result[2 * lastIndex + 1]);
  return { tokens, houseEdge, randomGeneratorFee };
};

export const getDiceGames = async (walletClient, type, page, pageSize) => {
  let gamesLength = 0;
  let games = [];
  if (type === 0) {
    gamesLength = parseInt(
      await readContract({
        ...diceContract,
        functionName: "viewTotalGames",
        chainId: chain.id,
      })
    );
    const cursor =
      page * pageSize <= gamesLength ? gamesLength - page * pageSize : 0;
    const quantity =
      page * pageSize <= gamesLength ? pageSize : gamesLength % pageSize;
    games = await readContract({
      ...diceContract,
      functionName: "viewGames",
      args: [cursor, quantity],
      chainId: chain.id,
    });
  } else {
    gamesLength = parseInt(
      await readContract({
        ...diceContract,
        functionName: "viewPlayerGamesLength",
        args: [walletClient?.account.address],
        chainId: chain.id,
      })
    );
    const cursor =
      page * pageSize <= gamesLength ? gamesLength - page * pageSize : 0;
    const quantity =
      page * pageSize <= gamesLength ? pageSize : gamesLength % pageSize;
    games = await readContract({
      ...diceContract,
      functionName: "viewPlayerGames",
      args: [walletClient?.account.address, cursor, quantity],
      chainId: chain.id,
    });
  }
  games = games.map((game) => {
    return {
      gameId: parseInt(game.gameId),
      payout: parseFloat(
        formatUnits(game.payout, casinoTokens[game.wagerAddress].decimals)
      ),
      multiplier: formatEther(game.multiplier),
      player: game.player,
      requestId: parseInt(game.requestId),
      bet: game.bet,
      isOver: game.isOver,
      status: game.status,
      timestamp: parseInt(game.timestamp),
      wagerAddress: game.wagerAddress,
      wagerAmount: parseFloat(
        formatUnits(game.wagerAmount, casinoTokens[game.wagerAddress].decimals)
      ),
      randomWord: parseInt(game.randomWord),
      canGetRefund: game.canGetRefund,
    };
  });
  games.reverse();
  // console.log({ games });
  // console.log({ gamesLength, games });
  return { gamesLength, games };
};

export const calculateDiceMultiplier = (bet, isOver, houseEdge) => {
  let winningChance = 0;
  if (isOver) {
    winningChance = 1 - bet / 100;
  } else {
    winningChance = bet / 100;
  }
  return (1 / winningChance) * (1 - houseEdge / 100);
};
export const calculateDiceKellyFactorMultiplierWinningChance = (
  bet,
  isOver,
  houseEdge
) => {
  let winningChance = 0;
  if (isOver) {
    winningChance = 1 - bet / 100;
  } else {
    winningChance = bet / 100;
  }
  const multiplier = calculateDiceMultiplier(bet, isOver, houseEdge);
  const kellyFactor = (1 - winningChance) / (multiplier - 1) - winningChance;

  return { winningChance, multiplier, kellyFactor };
};

export const playDice = async ({
  walletClient,
  wagerAmount,
  wagerAddress,
  bet,
  isOver,
  randomGeneratorFee,
}) => {
  let value = 0;
  if (wagerAddress === AddressZero) {
    value =
      parseEther(wagerAmount.toString()) +
      parseEther(randomGeneratorFee.toString());
  } else {
    value = parseEther(randomGeneratorFee.toString());
  }

  wagerAmount = parseUnits(
    wagerAmount.toString(),
    casinoTokens[wagerAddress].decimals
  );
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...diceContract,
      functionName: "play",
      args: [wagerAmount, wagerAddress, bet, isOver],
      value,
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true, hash };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const refundDice = async ({ walletClient, gameId }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...diceContract,
      functionName: "refund",
      args: [gameId],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approveTokenToDice = async ({ walletClient, token }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      address: token,
      abi: erc20ABI,
      functionName: "approve",
      args: [DiceAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const getRouletteStats = async (walletClient) => {
  let calls = [];
  const bankRollPLSBalance = await fetchBalance({
    chainId: chain.id,
    address: BankRollAddress,
  });

  Object.values(casinoTokens).forEach((token) => {
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [BankRollAddress],
    });
    calls.push({
      address: token.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [walletClient?.account.address, RouletteAddress],
    });
  });
  calls = [
    ...calls,
    {
      ...rouletteContract,
      functionName: "kellyFactor",
    },
    { ...RandomNumberGeneratorContract, functionName: "randomGeneratorFee" },
  ];
  const result = (await multicall({ contracts: calls, chainId: chain.id })).map(
    (d) => d.result
  );
  let tokens = {};
  for (let i = 0; i < Object.values(casinoTokens).length; i++) {
    const token = Object.values(casinoTokens)[i];
    tokens[token.address] = {
      bankrollBalance:
        token.address === AddressZero
          ? bankRollPLSBalance.formatted
          : formatUnits(result[2 * i], casinoTokens[token.address].decimals),
      allowance:
        token.address === AddressZero
          ? hexToBigInt(MaxUint256)
          : result[2 * i + 1],
    };
  }

  let lastIndex = Object.values(casinoTokens).length;
  const kellyFactor = formatEther(result[2 * lastIndex]);
  const randomGeneratorFee = formatEther(result[2 * lastIndex + 1]);
  return { tokens, kellyFactor, randomGeneratorFee };
};

export const getRouletteGames = async (walletClient, type, page, pageSize) => {
  let gamesLength = 0;
  let games = [];
  if (type === 0) {
    gamesLength = parseInt(
      await readContract({
        ...rouletteContract,
        functionName: "viewTotalGames",
        chainId: chain.id,
      })
    );
    const cursor =
      page * pageSize <= gamesLength ? gamesLength - page * pageSize : 0;
    const quantity =
      page * pageSize <= gamesLength ? pageSize : gamesLength % pageSize;
    games = await readContract({
      ...rouletteContract,
      functionName: "viewGames",
      args: [cursor, quantity],
      chainId: chain.id,
    });
  } else {
    gamesLength = parseInt(
      await readContract({
        ...rouletteContract,
        functionName: "viewPlayerGamesLength",
        args: [walletClient?.account.address],
        chainId: chain.id,
      })
    );
    const cursor =
      page * pageSize <= gamesLength ? gamesLength - page * pageSize : 0;
    const quantity =
      page * pageSize <= gamesLength ? pageSize : gamesLength % pageSize;
    games = await readContract({
      ...rouletteContract,
      functionName: "viewPlayerGames",
      args: [walletClient?.account.address, cursor, quantity],
      chainId: chain.id,
    });
  }
  games = games.map((game) => {
    return {
      gameId: parseInt(game.gameId),
      requestId: parseInt(game.requestId),
      wagerAmount: parseFloat(
        formatUnits(game.wagerAmount, casinoTokens[game.wagerAddress].decimals)
      ),
      wagerAddress: game.wagerAddress,
      player: game.player,
      status: game.status,
      timestamp: parseInt(game.timestamp),
      payout: parseFloat(
        formatUnits(game.payout, casinoTokens[game.wagerAddress].decimals)
      ),
      randomWord: parseInt(game.randomWord),
      result: parseInt(game.result),
      canGetRefund: game.canGetRefund,
    };
  });
  games.reverse();
  // console.log({ games });
  // console.log({ gamesLength, games });
  return { gamesLength, games };
};

export const playRoulette = async ({
  walletClient,
  numbers,
  wagerValues,
  wagerAmount,
  wagerAddress,
  randomGeneratorFee,
  totalChips,
}) => {
  let totalValue = 0n;
  let values = wagerValues.map((wagerValue) => {
    const value = parseUnits(
      ((wagerValue * wagerAmount) / totalChips).toString(),
      casinoTokens[wagerAddress].decimals
    );
    totalValue += value;
    return value;
  });
  let valueToSend;
  if (wagerAddress === AddressZero) {
    valueToSend = totalValue + parseEther(randomGeneratorFee.toString());
  } else {
    valueToSend = parseEther(randomGeneratorFee.toString());
  }
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...rouletteContract,
      functionName: "play",
      args: [totalValue, wagerAddress, numbers, values],
      value: valueToSend,
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true, hash };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const refundRoulette = async ({ walletClient, gameId }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...rouletteContract,
      functionName: "refund",
      args: [gameId],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approveTokenToRoulette = async ({ walletClient, token }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      address: token,
      abi: erc20ABI,
      functionName: "approve",
      args: [RouletteAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

const roundDown = (value, decimals) => {
  return Math.floor(value * 10 ** decimals) / 10 ** decimals;
};

export const formatSmall = (val, format) => {
  if (val * 1 === 0) {
    return numeral(0).format(format);
  }
  if (val * 1 < 1e-6) {
    return "~0";
  }
  return numeral(val).format(format);
};

export const formatAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export const numberToTicket = (number) => {
  const tickets = number.toString().split("");
  tickets.shift();
  return tickets.reverse();
};
export const ticketToNumber = (ticket) => {
  return "1" + ticket.reverse().join("");
};

export const getRandomTickets = (quantity) => {
  let arr = [];
  for (let i = 1000000; i <= 1999999; i++) {
    arr.push(i);
  }

  let result = [];

  for (let i = 1; i <= quantity; i++) {
    const random = Math.floor(Math.random() * (999999 - i));
    result.push(arr[random]);
    arr[random] = arr[999999 - i];
  }

  return result;
};

export const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};