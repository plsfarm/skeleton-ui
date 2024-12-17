import { ABI_PRESALE } from "./ABIs";
import { fantom, hardhat } from "@wagmi/core/chains";
import { formatEther } from "viem";
import {
  multicall,
  waitForTransaction,
  prepareWriteContract,
  readContract,
} from "@wagmi/core";

const chain = fantom;
// const chain = hardhat;

const PRESALE_ADDRESS = "0x8E99cCd00339B21DD7b5b53986b23dbd81a49877";

const presaleContract = {
  address: PRESALE_ADDRESS,
  abi: ABI_PRESALE,
};

const setChain = async (walletClient) => {
  if (walletClient.chain.id !== chain.id) {
    await walletClient.switchChain(chain);
  }
};

export const getData = async (walletClient, publicClient) => {
  try {
    const data = await multicall({
      contracts: [
        {
          ...presaleContract,
          functionName: "users",
          args: [walletClient?.account.address],
        },
        {
          ...presaleContract,
          functionName: "totalContribution",
        },
        {
          ...presaleContract,
          functionName: "walletMax",
        },
        {
          ...presaleContract,
          functionName: "walletMin",
        },
        {
          ...presaleContract,
          functionName: "presaleStartTime",
        },
      ],
    });

    if (!data || data.length === 0) throw new Error("No data returned from contract");

    const [
      usersData,
      TotalContribution,
      WalletMax,
      WalletMin,
      PresaleStartTime,
    ] = data.map((v) => v?.result ?? null);

    const [ftmContributed, bonesBought, preRegistered, once] = usersData || [0, 0, false, false];

    return {
      once: !!once,  
      preRegistered: !!preRegistered,
      bonesBought: bonesBought ? formatEther(bonesBought) : "0",
      ftmContributed: ftmContributed ? formatEther(ftmContributed) : "0",
      walletMax: WalletMax ? formatEther(WalletMax) : "0",
      walletMin: WalletMin ? formatEther(WalletMin) : "0",
      totalContribution: TotalContribution ? formatEther(TotalContribution) : "0",
      presaleStartTime: PresaleStartTime ? parseInt(PresaleStartTime.toString()) : 0,
    };
  } catch (error) {
    console.error("Error fetching presale data: ", error);
    return {
      once: false,  
      preRegistered: false,
      bonesBought: "0",
      ftmContributed: "0",
      walletMax: "0",
      walletMin: "0",
      totalContribution: "0",
      presaleStartTime: 0,
    };
  }
};

export const callBuy = async (walletClient, value) => {
  try {
    await setChain(walletClient);

    const presaleData = await readContract({
      ...presaleContract,
      functionName: "presaleStartTime",
    });

    if (!presaleData || parseInt(presaleData.toString()) <= 0) {
      throw new Error("Presale not started");
    }

    const { request } = await prepareWriteContract({
      chainId: chain.id,
      account: walletClient.account,
      ...presaleContract,
      functionName: "Buy",
      value: value,
      args: [],
    });

    const hash = await walletClient.writeContract(request);
    await waitForTransaction({ chainId: chain.id, hash });
    return { success: true };
  } catch (err) {
    console.error("Error executing buy: ", err);
    return { success: false, error: err.details || err.message };
  }
};
