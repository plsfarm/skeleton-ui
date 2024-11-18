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
import TreasuryABI from "./TreasuryABI.json";
import BoardroomABI from "./BoardroomABI.json";
import ShareRewardPoolABI from "./ShareRewardPoolABI.json";
import PulseRateRouterABI from "./PulseRateRouterABI.json";
import SingleStakingABI from "./SingleStakingABI.json";
import StakingVaultABI from "./StakingVaultABI.json";
import LotteryABI from "./LotteryABI.json";
import CoinFlipABI from "./CoinFlipABI.json";
import DiceABI from "./DiceABI.json";
import RouletteABI from "./RouletteABI.json";
import RandomNumberGeneratorABI from "./RandomNumberGeneratorABI.json";
import LPABI from "./LPABI.json";
import WPLSABI from "./WPLSABI.json";
import { erc20ABI } from "wagmi";
import {
  PRATEAddress,
  COWTIPAddress,
  PBONDAddress,
  BoardroomAddress,
  TreasuryAddress,
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
} from "./ContractAddresses";
import { findRoutes } from "./RouteFinder";
import { tokens, casinoTokens } from "./Tokens";
import numeral from "numeral";

const PRATEContract = {
  address: PRATEAddress,
  abi: erc20ABI,
};
const PSHAREContract = {
  address: COWTIPAddress,
  abi: erc20ABI,
};
const PBONDContract = {
  address: PBONDAddress,
  abi: erc20ABI,
};
const boardroomContract = {
  address: BoardroomAddress,
  abi: BoardroomABI,
};
const treasuryContract = {
  address: TreasuryAddress,
  abi: TreasuryABI,
};
const shareRewardPoolContract = {
  address: CowTipFarmAddress,
  abi: ShareRewardPoolABI,
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
const PSHARE_PLS_LP_Contract = {
  address: COWTIP_PLS_LP_Address,
  abi: LPABI,
};
const PRATE_PSHARE_LP_Contract = {
  address: PRATE_PSHARE_LP_Address,
  abi: LPABI,
};
const PulseRateRouterContract = {
  address: PulseRateRouterAddress,
  abi: PulseRateRouterABI,
};
const WPLSContract = {
  address: WPLS,
  abi: WPLSABI,
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

 //const chain = pulsechain;
 const chain = hardhat;

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
    },
    {
      ...PRATE_PLS_LP_Contract,
      functionName: "totalSupply",
    },
    {
      ...PSHARE_PLS_LP_Contract,
      functionName: "getReserves",
    },
    {
      ...PSHARE_PLS_LP_Contract,
      functionName: "totalSupply",
    },
    {
      ...PLS_DAI_LP_Contract,
      functionName: "getReserves",
    },
    {
      ...PLS_DAI_LP_Contract,
      functionName: "totalSupply",
    },
    {
      ...PRATE_PSHARE_LP_Contract,
      functionName: "getReserves",
    },
    {
      ...PRATE_PSHARE_LP_Contract,
      functionName: "totalSupply",
    },
    {
      ...treasuryContract,
      functionName: "getBondPremiumRate",
    },
    {
      ...treasuryContract,
      functionName: "nextEpochPoint",
    },
    {
      ...PRATEContract,
      functionName: "totalSupply",
    },
    {
      ...PSHAREContract,
      functionName: "totalSupply",
    },
    {
      ...PBONDContract,
      functionName: "totalSupply",
    },
    {
      ...PRATEContract,
      functionName: "balanceOf",
      args: [AddressZero],
    },
    {
      ...PRATEContract,
      functionName: "balanceOf",
      args: [AddressDead],
    },
    {
      ...PSHAREContract,
      functionName: "balanceOf",
      args: [AddressZero],
    },
    {
      ...PSHAREContract,
      functionName: "balanceOf",
      args: [AddressDead],
    },
    {
      ...PSHAREContract,
      functionName: "balanceOf",
      args: [CowTipFarmAddress],
    },
    {
      ...PBONDContract,
      functionName: "balanceOf",
      args: [AddressZero],
    },
    {
      ...PBONDContract,
      functionName: "balanceOf",
      args: [AddressDead],
    },
    {
      ...treasuryContract,
      functionName: "getPulseRateUpdatedPrice",
    },
    {
      ...treasuryContract,
      functionName: "getBurnablePulseRateLeft",
    },
    {
      ...treasuryContract,
      functionName: "getReserve",
    },
    {
      ...boardroomContract,
      functionName: "epoch",
    },
    {
      ...boardroomContract,
      functionName: "getLatestSnapshotView",
    },
    {
      ...boardroomContract,
      functionName: "latestSnapshotIndex",
    },
    {
      ...PSHAREContract,
      functionName: "balanceOf",
      args: [BoardroomAddress],
    },
    {
      ...boardroomContract,
      functionName: "earned",
      args: [walletClient?.account.address],
    },
    {
      ...boardroomContract,
      functionName: "balanceOf",
      args: [walletClient?.account.address],
    },
    {
      ...PSHAREContract,
      functionName: "allowance",
      args: [walletClient?.account.address, BoardroomAddress],
    },
    {
      ...boardroomContract,
      functionName: "canWithdraw",
      args: [walletClient?.account.address],
    },
    {
      ...boardroomContract,
      functionName: "canClaimReward",
      args: [walletClient?.account.address],
    },
    {
      ...treasuryContract,
      functionName: "getPulseRatePrice",
    },
    {
      ...PRATEContract,
      functionName: "allowance",
      args: [walletClient?.account.address, TreasuryAddress],
    },
    {
      ...PBONDContract,
      functionName: "allowance",
      args: [walletClient?.account.address, TreasuryAddress],
    },
    {
      ...shareRewardPoolContract,
      functionName: "getAllPoolViews",
    },
    {
      ...shareRewardPoolContract,
      functionName: "getUserViews",
      args: [walletClient?.account.address],
    },
    {
      ...shareRewardPoolContract,
      functionName: "referralEarned",
      args: [walletClient?.account.address],
    },
    {
      ...boardroomContract,
      functionName: "members",
      args: [walletClient?.account.address],
    },
    {
      ...boardroomContract,
      functionName: "withdrawLockupEpochs",
    },
    {
      ...boardroomContract,
      functionName: "rewardLockupEpochs",
    },
    { ...singleStakingContract, functionName: "totalPRATEStaked" },
    { ...singleStakingContract, functionName: "totalPLSClaimed" },
    { ...singleStakingContract, functionName: "rewardsPerSecond" },
    { ...singleStakingContract, functionName: "endTime" },
    { ...singleStakingContract, functionName: "totalHeartBeats" },
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
      ...PRATEContract,
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
  console.log({ data });
  let [
    PRATE_PLS_LP_Reserves,
    PRATE_PLS_LP_TotalSupply,
    PSHARE_PLS_LP_Reserves,
    PSHARE_PLS_LP_TotalSupply,
    PLS_DAI_LP_Reserves,
    PLS_DAI_LP_TotalSupply,
    PRATE_PSHARE_LP_Reserves,
    PRATE_PSHARE_LP_TotalSupply,
    BOND_Premium_Rate,

    NEXT_EPOCH_POINT,
    // PRATEBalance, //
    // PSHAREBalance, //
    // PBONDBalance, //
    PRATESupply,
    PSHARESupply,
    PBONDSupply,
    PRATEBalanceZero,
    PRATEBalanceDead,
    PSHAREBalanceZero,
    PSHAREBalanceDead,
    PSHAREBalanceRewardPool,
    PBONDBalanceZero,
    PBONDBalanceDead,
    PRATE_TWAP_PRICE,
    BURNABLE_PRATE_LEFT,
    PRATE_TREASURY_RESERVE,
    EPOCH,
    BOARDROOM_LATEST_SNAPSHOT,
    BOARDROOM_LATEST_SNAPSHOT_INDEX,
    BOARDROOM_PSHARE_BALANCE,
    BOARDROOM_REWARDS,
    BOARDROOM_STAKED_PSHARE,
    BOARDROOM_PSHARE_ALLOWANCE,
    BOARDROOM_CANWITHDRAW,
    BOARDROOM_CANCLAIM,
    BOND_PRATE_PRICE,
    BOND_PRATE_ALLOWANCE,
    BOND_PBOND_ALLOWANCE,
    REWARD_POOL_POOLS_VIEWS,
    REWARD_POOL_USER_VIEWS,
    REWARD_POOL_REF_EARNED,
    BOARDROOM_MEMBERSEAT,
    BOARDROOM_WITHDRAWLOCKUPEPOCHS,
    BOARDROOM_REWARDLOCKUPEPOCHS,
    SINGLESTAKING_TOTALPRATESTAKED,
    SINGLESTAKING_TOTALPLSCLAIMED,
    SINGLESTAKING_REWARDSPERSECOND,
    SINGLESTAKING_ENDTIME,
    SINGLESTAKING_TOTALHEARTBEATS,
    SINGLESTAKING_TOTALSTAKESCOUNT,
    SINGLESTAKING_USERSTATS,
    SINGLESTAKING_USERACTIVESTAKES,
    SINGLESTAKING_PRATEALLOWANCE,
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
  PRATESupply = PRATESupply ? PRATESupply : 0;
  PRATEBalanceZero = PRATEBalanceZero ? PRATEBalanceZero : 0;
  PRATEBalanceDead = PRATEBalanceDead ? PRATEBalanceDead : 0;
  PRATE_TWAP_PRICE = PRATE_TWAP_PRICE ? PRATE_TWAP_PRICE : 0;

  const PSHAREPricePLS = PSHARE_PLS_LP_Reserves
    ? formatEther(PSHARE_PLS_LP_Reserves[1]) /
      formatEther(PSHARE_PLS_LP_Reserves[0])
    : 0;
  const PSHAREPriceUSD = PSHAREPricePLS * PLSPriceUSD;
  const PSHARE_PLS_LP_PriceUSD = PSHARE_PLS_LP_TotalSupply
    ? (formatEther(PSHARE_PLS_LP_Reserves[0]) * 2 * PSHAREPriceUSD) /
      formatEther(PSHARE_PLS_LP_TotalSupply)
    : 0;
  PSHARESupply = PSHARESupply ? PSHARESupply : 0;
  PSHAREBalanceZero = PSHAREBalanceZero ? PSHAREBalanceZero : 0;
  PSHAREBalanceDead = PSHAREBalanceDead ? PSHAREBalanceDead : 0;
  PSHAREBalanceRewardPool = PSHAREBalanceRewardPool
    ? PSHAREBalanceRewardPool
    : 0;

  const PRATE_PSHARE_LP_PriceUSD = PRATE_PSHARE_LP_TotalSupply
    ? (formatEther(PRATE_PSHARE_LP_Reserves[1]) * 2 * PRATEPriceUSD) /
      formatEther(PRATE_PSHARE_LP_TotalSupply)
    : 0;
  BOND_Premium_Rate = BOND_Premium_Rate ? BOND_Premium_Rate : 0;
  const BondPricePLS =
    formatEther(BOND_Premium_Rate) * 1 > 0
      ? formatEther(PRATE_TWAP_PRICE) * formatEther(BOND_Premium_Rate)
      : formatEther(PRATE_TWAP_PRICE);
  const BondPriceUSD = BondPricePLS * PLSPriceUSD;
  PBONDSupply = PBONDSupply ? PBONDSupply : 0;
  PBONDBalanceZero = PBONDBalanceZero ? PBONDBalanceZero : 0;
  PBONDBalanceDead = PBONDBalanceDead ? PBONDBalanceDead : 0;

  BURNABLE_PRATE_LEFT = BURNABLE_PRATE_LEFT ? BURNABLE_PRATE_LEFT : 0;
  PRATE_TREASURY_RESERVE = PRATE_TREASURY_RESERVE ? PRATE_TREASURY_RESERVE : 0;
  EPOCH = EPOCH ? parseInt(EPOCH) : 0;
  NEXT_EPOCH_POINT = NEXT_EPOCH_POINT ? parseInt(NEXT_EPOCH_POINT) : 0;
  const LatestSnapShotTime = BOARDROOM_LATEST_SNAPSHOT
    ? formatEther(BOARDROOM_LATEST_SNAPSHOT[0])
    : 0;
  const LatestSnapShotRewardReceived = BOARDROOM_LATEST_SNAPSHOT
    ? formatEther(BOARDROOM_LATEST_SNAPSHOT[1])
    : 0;
  const LatestSnapShotRewardPerShare = BOARDROOM_LATEST_SNAPSHOT
    ? formatEther(BOARDROOM_LATEST_SNAPSHOT[2])
    : 0;
  BOARDROOM_LATEST_SNAPSHOT_INDEX = BOARDROOM_LATEST_SNAPSHOT_INDEX
    ? BOARDROOM_LATEST_SNAPSHOT_INDEX
    : 0;
  BOARDROOM_PSHARE_BALANCE = BOARDROOM_PSHARE_BALANCE
    ? BOARDROOM_PSHARE_BALANCE
    : 0;
  BOARDROOM_REWARDS = BOARDROOM_REWARDS ? BOARDROOM_REWARDS : 0;
  BOARDROOM_STAKED_PSHARE = BOARDROOM_STAKED_PSHARE
    ? BOARDROOM_STAKED_PSHARE
    : 0;
  BOARDROOM_PSHARE_ALLOWANCE = BOARDROOM_PSHARE_ALLOWANCE
    ? BOARDROOM_PSHARE_ALLOWANCE
    : 0;
  BOARDROOM_CANWITHDRAW = BOARDROOM_CANWITHDRAW ? BOARDROOM_CANWITHDRAW : false;
  BOARDROOM_CANCLAIM = BOARDROOM_CANCLAIM ? BOARDROOM_CANCLAIM : false;
  BOND_PRATE_PRICE = BOND_PRATE_PRICE ? BOND_PRATE_PRICE : 0;
  BOND_PRATE_ALLOWANCE = BOND_PRATE_ALLOWANCE ? BOND_PRATE_ALLOWANCE : 0;
  BOND_PBOND_ALLOWANCE = BOND_PBOND_ALLOWANCE ? BOND_PBOND_ALLOWANCE : 0;

  REWARD_POOL_POOLS_VIEWS = REWARD_POOL_POOLS_VIEWS
    ? REWARD_POOL_POOLS_VIEWS.map((pool) => {
        return {
          accTokensPerShare: formatEther(pool.accTokensPerShare),
          allocPoint: parseInt(pool.allocPoint),
          isStarted: pool.isStarted,
          lastRewardTime: parseInt(pool.lastRewardTime),
          pid: parseInt(pool.pid),
          rewardsPerSecond: formatEther(pool.rewardsPerSecond),
          token: pool.token,
          totalAmount: formatEther(pool.totalAmount),
          depositFeeBP: parseInt(pool.depositFeeBP),
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
  BOARDROOM_MEMBERSEAT = BOARDROOM_MEMBERSEAT
    ? BOARDROOM_MEMBERSEAT.map((d) => parseInt(d))
    : [0, 0, 0];
  BOARDROOM_WITHDRAWLOCKUPEPOCHS = BOARDROOM_WITHDRAWLOCKUPEPOCHS
    ? parseInt(BOARDROOM_WITHDRAWLOCKUPEPOCHS)
    : 0;
  BOARDROOM_REWARDLOCKUPEPOCHS = BOARDROOM_REWARDLOCKUPEPOCHS
    ? parseInt(BOARDROOM_REWARDLOCKUPEPOCHS)
    : 0;
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
          heartBeat: formatEther(d.heartBeat),
          id: parseInt(d.id),
          lastClaim: parseInt(d.lastClaim),
          lastUpdate: parseInt(d.lastUpdate),
          pendingRewards: formatEther(d.pendingRewards),
          stakeEndTime: parseInt(d.stakeEndTime),
          stakeWithdrawTime: parseInt(d.stakeWithdrawTime),
        };
      })
    : [];
  SINGLESTAKING_PRATEALLOWANCE = SINGLESTAKING_PRATEALLOWANCE
    ? SINGLESTAKING_PRATEALLOWANCE
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
    PSHAREPriceUSD,
    walletClient
  );

  // console.log({
  //   PRATEPricePLS,
  //   PSHAREPricePLS,
  //   PLSPriceUSD,
  //   PRATEPriceUSD,
  //   PSHAREPriceUSD,
  //   PLS_DAI_LP_PriceUSD,
  //   PLS_DAI_LP_TotalSupply: formatEther(PLS_DAI_LP_TotalSupply),
  //   PRATE_PLS_LP_PriceUSD,
  //   PRATE_PLS_LP_TotalSupply: formatEther(PRATE_PLS_LP_TotalSupply),
  //   PSHARE_PLS_LP_PriceUSD,
  //   PSHARE_PLS_LP_TotalSupply: formatEther(PSHARE_PLS_LP_TotalSupply),
  //   PRATE_PSHARE_LP_PriceUSD,
  //   PRATE_PSHARE_LP_TotalSupply: formatEther(PRATE_PSHARE_LP_TotalSupply),
  //   BOND_Premium_Rate: formatEther(BOND_Premium_Rate),
  //   BondPricePLS,
  //   BondPriceUSD,
  //   NEXT_EPOCH_POINT,
  //   PRATESupply: formatEther(PRATESupply),
  //   PSHARESupply: formatEther(PSHARESupply),
  //   PBONDSupply: formatEther(PBONDSupply),
  //   PRATEBalanceZero: formatEther(PRATEBalanceZero),
  //   PRATEBalanceDead: formatEther(PRATEBalanceDead),
  //   PSHAREBalanceZero: formatEther(PSHAREBalanceZero),
  //   PSHAREBalanceDead: formatEther(PSHAREBalanceDead),
  //   PSHAREBalanceRewardPool: formatEther(PSHAREBalanceRewardPool),
  //   PBONDBalanceZero: formatEther(PBONDBalanceZero),
  //   PBONDBalanceDead: formatEther(PBONDBalanceDead),
  //   PRATE_TWAP_PRICE: formatEther(PRATE_TWAP_PRICE),
  //   BURNABLE_PRATE_LEFT: formatEther(BURNABLE_PRATE_LEFT),
  //   PRATE_TREASURY_RESERVE: formatEther(PRATE_TREASURY_RESERVE),
  //   EPOCH,
  //   BOARDROOM_LATEST_SNAPSHOT,
  //   BOARDROOM_LATEST_SNAPSHOT_INDEX,
  //   LatestSnapShotTime,
  //   LatestSnapShotRewardPerShare,
  //   LatestSnapShotRewardReceived,
  //   BOARDROOM_PSHARE_BALANCE: formatEther(BOARDROOM_PSHARE_BALANCE),
  //   BOARDROOM_REWARDS: formatEther(BOARDROOM_REWARDS),
  //   BOARDROOM_STAKED_PSHARE: formatEther(BOARDROOM_STAKED_PSHARE),
  //   BOARDROOM_PSHARE_ALLOWANCE: formatEther(BOARDROOM_PSHARE_ALLOWANCE),
  //   BOARDROOM_CANWITHDRAW,
  //   BOARDROOM_CANCLAIM,
  //   BOND_PRATE_PRICE,
  //   BOND_PRATE_ALLOWANCE,
  //   BOND_PBOND_ALLOWANCE,
  //   REWARD_POOL_POOLS_VIEWS,
  //   REWARD_POOL_USER_VIEWS,
  //   REWARD_POOL_REF_EARNED,
  //   BOARDROOM_MEMBERSEAT,
  //   BOARDROOM_WITHDRAWLOCKUPEPOCHS,
  //   BOARDROOM_REWARDLOCKUPEPOCHS,
  // });

  const pulseRateCirculatingSupply =
    formatEther(PRATESupply) -
    formatEther(PRATEBalanceDead) -
    formatEther(PRATEBalanceZero);
  const cowTipCirculatingSupply =
    formatEther(PSHARESupply) -
    formatEther(PSHAREBalanceDead) -
    formatEther(PSHAREBalanceZero) -
    formatEther(PSHAREBalanceRewardPool);
  const bondCirculatingSupply =
    formatEther(PBONDSupply) -
    formatEther(PBONDBalanceDead) -
    formatEther(PBONDBalanceZero);
  const boardroomStakedPercentage =
    formatEther(BOARDROOM_PSHARE_BALANCE) / cowTipCirculatingSupply;
  const boardroomTVLUSD =
    formatEther(BOARDROOM_PSHARE_BALANCE) * PSHAREPriceUSD;
  const boardroomRewardsPerDayUSD =
    LatestSnapShotRewardReceived * 4 * PRATEPriceUSD;
  const boardRoomAPR = (boardroomRewardsPerDayUSD * 365) / boardroomTVLUSD;
  const singleStakingTVL =
    formatEther(SINGLESTAKING_TOTALPRATESTAKED) * PRATEPriceUSD;

  console.log({ REWARD_POOL_POOLS_VIEWS });

  let totalTVL = REWARD_POOL_POOLS_VIEWS.reduce((prev, curr) => {
    const tvl = curr.totalAmount * (LPList[curr.token].LPPrice || 0);
    return prev + tvl;
  }, 0);
  totalTVL += boardroomTVLUSD;
  totalTVL += singleStakingTVL;

  const boardroomClaimableTimestamp =
    BOARDROOM_MEMBERSEAT[2] + BOARDROOM_REWARDLOCKUPEPOCHS >= EPOCH
      ? NEXT_EPOCH_POINT +
        6 *
          3600 *
          (BOARDROOM_MEMBERSEAT[2] + BOARDROOM_REWARDLOCKUPEPOCHS - EPOCH - 1)
      : 0;
  const boardroomWithdrawableTimestamp =
    BOARDROOM_MEMBERSEAT[2] + BOARDROOM_WITHDRAWLOCKUPEPOCHS >= EPOCH
      ? NEXT_EPOCH_POINT +
        6 *
          3600 *
          (BOARDROOM_MEMBERSEAT[2] + BOARDROOM_WITHDRAWLOCKUPEPOCHS - EPOCH - 1)
      : 0;

  return {
    pulseRatePriceInPLS: PRATEPricePLS,
    pulseRatePriceInUSD: PRATEPriceUSD,
    pulseRateSupply: formatEther(PRATESupply) * 1,
    pulseRateTwapPrice: formatEther(PRATE_TWAP_PRICE) * 1,
    cowtipSharePriceInPLS: PSHAREPricePLS,
    cowTipPriceInUSD: PSHAREPriceUSD,
    cowTipSupply: formatEther(PSHARESupply) * 1,
    plsPriceUSD: PLSPriceUSD,
    prate_pls_lp_PriceUSD: PRATE_PLS_LP_PriceUSD,
    pshare_pls_lp_PriceUSD: PSHARE_PLS_LP_PriceUSD,
    prate_pshare_lp_PriceUSD: PRATE_PSHARE_LP_PriceUSD,
    bondPriceInPLS: BondPricePLS,
    bondPriceInUSD: BondPriceUSD,
    bondSupply: formatEther(PBONDSupply) * 1,
    nextEpochPoint: NEXT_EPOCH_POINT,
    pulseRateCirculatingSupply,
    cowTipCirculatingSupply,
    bondCirculatingSupply,
    burnablePulseRateLeft: formatEther(BURNABLE_PRATE_LEFT),
    pulseRateTreasuryReserve: formatEther(PRATE_TREASURY_RESERVE),
    epoch: EPOCH,
    printRate: parseFloat(
      parseInt(BOARDROOM_LATEST_SNAPSHOT_INDEX) / parseInt(EPOCH)
    ),
    boardroomPshareBalance: formatEther(BOARDROOM_PSHARE_BALANCE),
    boardroomStakedPercentage,
    boardroomTVLUSD,
    boardroomRewards: formatEther(BOARDROOM_REWARDS),
    boardroomStakedPShare: formatEther(BOARDROOM_STAKED_PSHARE),
    boardroomStakedPShareUnformatted: BOARDROOM_STAKED_PSHARE,
    boardroomRewardsPerDayUSD,
    boardRoomAPR,
    boardroomPSHAREAllowance: formatEther(BOARDROOM_PSHARE_ALLOWANCE),
    boardroomCanWithdraw: BOARDROOM_CANWITHDRAW,
    boardroomCanClaim: BOARDROOM_CANCLAIM,
    bondPRATEPrice: formatEther(BOND_PRATE_PRICE),
    bondPRATEAllowance: formatEther(BOND_PRATE_ALLOWANCE),
    bondPBONDAllowance: formatEther(BOND_PBOND_ALLOWANCE),
    lpList: LPList,
    tokenSymbols,
    poolsViews: REWARD_POOL_POOLS_VIEWS,
    userViews: REWARD_POOL_USER_VIEWS,
    totalTVL,
    refEarned: formatEther(REWARD_POOL_REF_EARNED),
    tokensBalancesAndAllowances,
    boardroomClaimableTimestamp,
    boardroomWithdrawableTimestamp,
    singleTotalPrateStaked: formatEther(SINGLESTAKING_TOTALPRATESTAKED),
    singleTotalPLSClaimed: formatEther(SINGLESTAKING_TOTALPLSCLAIMED),
    singleRewardsPerSecond: formatEther(SINGLESTAKING_REWARDSPERSECOND),
    singleEndTime: parseInt(SINGLESTAKING_ENDTIME),
    singleTotalHeartBeats: formatEther(SINGLESTAKING_TOTALHEARTBEATS),
    singleTotalStakesCount: parseInt(SINGLESTAKING_TOTALSTAKESCOUNT),
    singleUserStats: SINGLESTAKING_USERSTATS,
    singleUserRewards: formatEther(SINGLESTAKING_USERREWARDS),
    singleUserActiveStakes: SINGLESTAKING_USERACTIVESTAKES,
    singlePRATEAllowance: formatEther(SINGLESTAKING_PRATEALLOWANCE),
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

const getPrices = async (
  PoolsView,
  PLSPriceUSD,
  PRATEPriceUSD,
  PSHAREPriceUSD,
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
  for (let i = 0; i < data.length / 5; i++) {
    const LPAddress = PoolsView[i].token;
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
      LPList[LPAddress].token0 === USDC ||
      LPList[LPAddress].token1 === USDC
    ) {
      if (LPList[LPAddress].token0 === USDC) {
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
          (LPList[LPAddress].reserves.token0 * 2 * PSHAREPriceUSD) /
          LPList[LPAddress].totalSupply;
      } else {
        LPList[LPAddress].LPPrice =
          (LPList[LPAddress].reserves.token1 * 2 * PSHAREPriceUSD) /
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

export const approvePSHAREToBoardroom = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...PSHAREContract,
      functionName: "approve",
      args: [boardroomContract.address, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const stakePSHAREInBoardroom = async ({ walletClient, amount, max }) => {
  let fixedAmount =
    parseEther(amount.toString()) > max ? max : parseEther(amount.toString());
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...boardroomContract,
      functionName: "stake",
      args: [fixedAmount],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};
export const unstakePSHAREInBoardroom = async ({
  walletClient,
  amount,
  max,
}) => {
  let fixedAmount =
    parseEther(amount.toString()) > max ? max : parseEther(amount.toString());
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...boardroomContract,
      functionName: "withdraw",
      args: [fixedAmount],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};
export const exitBoardroom = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...boardroomContract,
      functionName: "exit",
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const claimBoardroom = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...boardroomContract,
      functionName: "claimReward",
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approvePRATEToBonds = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...PRATEContract,
      functionName: "approve",
      args: [TreasuryAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};
export const approvePBONDToBonds = async ({ walletClient }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...PBONDContract,
      functionName: "approve",
      args: [TreasuryAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const buyBonds = async ({ walletClient, amount, targetPrice, max }) => {
  let fixedAmount =
    parseEther(amount.toString()) > max ? max : parseEther(amount.toString());
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...treasuryContract,
      functionName: "buyBonds",
      args: [fixedAmount, parseEther(targetPrice)],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const redeemBonds = async ({
  walletClient,
  amount,
  targetPrice,
  max,
}) => {
  let fixedAmount =
    parseEther(amount.toString()) > max ? max : parseEther(amount.toString());
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...treasuryContract,
      functionName: "redeemBonds",
      args: [fixedAmount, parseEther(targetPrice)],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const claimRewardPool = async ({ walletClient, pid }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...shareRewardPoolContract,
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
  // console.log(referrer);
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...shareRewardPoolContract,
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
      ...shareRewardPoolContract,
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

export const getAmountOut = async (tokenIn, amountIn, tokenOut) => {
  if (tokenIn === AddressZero && tokenOut === WPLS) {
    return {
      routes: [AddressZero, WPLS],
      bestRoute: [AddressZero, WPLS],
      amountOut: amountIn,
    };
  }

  if (tokenIn === WPLS && tokenOut === AddressZero) {
    return {
      routes: [WPLS, AddressZero],
      bestRoute: [WPLS, AddressZero],
      amountOut: amountIn,
    };
  }
  if (tokenIn === AddressZero) {
    tokenIn = WPLS;
  }
  if (tokenOut === AddressZero) {
    tokenOut = WPLS;
  }
  const routes = findRoutes(tokenIn, tokenOut);
  let calls = [];
  for (let i = 0; i < routes.length; i++) {
    calls.push({
      ...PulseRateRouterContract,
      functionName: "getAmountsOut",
      args: [
        parseUnits(amountIn.toString(), tokens[tokenIn].decimals),
        routes[i],
      ],
    });
  }
  const data = await multicall({
    chainId: chain.id,
    contracts: calls,
  });
  let results = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].result) {
      results.push({
        route: routes[i],
        amountOut: parseFloat(
          formatUnits(data[i].result.at(-1), tokens[tokenOut].decimals)
        ),
      });
    }
  }
  results.sort((a, b) => b.amountOut - a.amountOut);
  return {
    routes: results,
    bestRoute: results[0].route,
    amountOut: results[0].amountOut,
  };
};

export const swapTokens = async ({
  walletClient,
  tokenIn,
  tokenOut,
  path,
  amountIn,
  maxAmountIn,
  amountOut,
  slippage,
}) => {
  let fixedAmountIn =
    parseUnits(amountIn.toString(), tokens[tokenIn].decimals) > maxAmountIn
      ? maxAmountIn
      : parseUnits(amountIn.toString(), tokens[tokenIn].decimals);

  let call = {};
  const amountOutMin = amountOut * (1 - slippage / 100);
  if (tokenIn === AddressZero && tokenOut === WPLS) {
    call = {
      ...WPLSContract,
      functionName: "deposit",
      value: fixedAmountIn,
    };
  } else if (tokenIn === WPLS && tokenOut === AddressZero) {
    call = {
      ...WPLSContract,
      functionName: "withdraw",
      args: [fixedAmountIn],
    };
  } else if (tokenIn === AddressZero) {
    call = {
      ...PulseRateRouterContract,
      functionName: "swapExactETHForTokens",
      args: [
        parseUnits(amountOutMin.toString(), tokens[tokenOut].decimals),
        path,
        walletClient.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
      value: fixedAmountIn,
    };
  } else if (tokenOut === AddressZero) {
    call = {
      ...PulseRateRouterContract,
      functionName: "swapExactTokensForETH",
      args: [
        fixedAmountIn,
        parseUnits(amountOutMin.toString(), tokens[tokenOut].decimals),
        path,
        walletClient?.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
    };
  } else {
    call = {
      ...PulseRateRouterContract,
      functionName: "swapExactTokensForTokens",
      args: [
        fixedAmountIn,
        parseUnits(amountOutMin.toString(), tokens[tokenOut].decimals),
        path,
        walletClient.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
    };
  }
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...call,
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const approveTokenToRouter = async ({ walletClient, token }) => {
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      address: token,
      abi: erc20ABI,
      functionName: "approve",
      args: [PulseRateRouterAddress, MaxUint256],
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const addLiquidity = async ({
  walletClient,
  amountToken0,
  maxAmountToken0,
  token0,
  amountToken1,
  maxAmountToken1,
  token1,
  slippage,
}) => {
  let call = {};
  const fixedAmountToken0 =
    parseUnits(amountToken0.toString(), tokens[token0].decimals) >
    maxAmountToken0
      ? maxAmountToken0
      : parseUnits(amountToken0.toString(), tokens[token0].decimals);
  const fixedAmountToken1 =
    parseUnits(amountToken1.toString(), tokens[token1].decimals) >
    maxAmountToken1
      ? maxAmountToken1
      : parseUnits(amountToken1.toString(), tokens[token1].decimals);
  const amountToken0Min = amountToken0 * (1 - slippage / 100);
  const amountToken1Min = amountToken1 * (1 - slippage / 100);
  // console.log({
  //   walletClient,
  //   amountToken0,
  //   maxAmountToken0,
  //   token0,
  //   amountToken1,
  //   maxAmountToken1,
  //   token1,
  //   slippage,
  //   amountToken0Min,
  //   amountToken1Min,
  // });
  if (token0 === AddressZero) {
    call = {
      ...PulseRateRouterContract,
      functionName: "addLiquidityETH",
      args: [
        token1,
        fixedAmountToken1,
        parseUnits(amountToken1Min.toString(), tokens[token1].decimals),
        parseUnits(amountToken0Min.toString(), tokens[token0].decimals),
        walletClient.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
      value: fixedAmountToken0,
    };
  } else if (token1 === AddressZero) {
    call = {
      ...PulseRateRouterContract,
      functionName: "addLiquidityETH",
      args: [
        token0,
        fixedAmountToken0,
        parseUnits(amountToken0Min.toString(), tokens[token0].decimals),
        parseUnits(amountToken1Min.toString(), tokens[token1].decimals),
        walletClient.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
      value: fixedAmountToken1,
    };
  } else {
    call = {
      ...PulseRateRouterContract,
      functionName: "addLiquidity",
      args: [
        token0,
        token1,
        fixedAmountToken0,
        fixedAmountToken1,
        parseUnits(amountToken0Min.toString(), tokens[token0].decimals),
        parseUnits(amountToken1Min.toString(), tokens[token1].decimals),
        walletClient.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
    };
  }
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...call,
    });
    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error({ err });
    return { success: false, error: err.details || err.message };
  }
};

export const removeLiquidity = async ({
  walletClient,
  amount,
  amountToken0,
  amountToken1,
  pair,
  token0,
  token1,
  slippage,
  receivePLS,
}) => {
  // console.log({
  //   walletClient,
  //   amount,
  //   amountToken0,
  //   amountToken1,
  //   pair,
  //   token0,
  //   token1,
  //   slippage,
  //   receivePLS,
  // });
  let call = {};
  const amountToken0Min = amountToken0 * (1 - slippage / 100);
  const amountToken1Min = amountToken1 * (1 - slippage / 100);
  if ((token0 === WPLS || token1 === WPLS) && receivePLS) {
    call = {
      ...PulseRateRouterContract,
      functionName: "removeLiquidityETH",
      args: [
        token0 === WPLS ? token1 : token0,
        amount.toString(),
        token0 === WPLS
          ? parseUnits(amountToken1Min.toString(), tokens[token1].decimals)
          : parseUnits(amountToken0Min.toString(), tokens[token0].decimals),
        token0 === WPLS
          ? parseUnits(amountToken0Min.toString(), tokens[token0].decimals)
          : parseUnits(amountToken1Min.toString(), tokens[token1].decimals),
        walletClient.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
    };
  } else {
    call = {
      ...PulseRateRouterContract,
      functionName: "removeLiquidity",
      args: [
        token0,
        token1,
        amount.toString(),
        0,
        0,
        walletClient.account.address,
        Math.floor(Date.now() / 1000) + 5 * 6000000,
      ],
    };
  }
  // console.log({ call });
  // return;
  try {
    await setChain(walletClient);
    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...call,
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
