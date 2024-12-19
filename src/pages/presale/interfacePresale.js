import { ABI_PRESALE } from "./ABIs";
import { formatEther } from "viem";
import {
  waitForTransaction,
  prepareWriteContract,
  readContract,
} from "@wagmi/core";

// Sonic Chain Definition
const chain = {
  id: 146,
  name: "Sonic",
  network: "sonic",
  nativeCurrency: {
    name: "Sonic Token",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.soniclabs.com"] },
    public: { http: ["https://rpc.soniclabs.com"] },
  },
  blockExplorers: {
    default: { name: "SonicLabs Explorer", url: "https://explorer.soniclabs.com" },
  },
};

const PRESALE_ADDRESS = "0xE82baD342643EEC1c572b8b74a1ab56BE49505A8";

const presaleContract = {
  address: PRESALE_ADDRESS,
  abi: ABI_PRESALE,
};

// Ensure Wallet is on Correct Chain
const setChain = async (walletClient) => {
  if (walletClient.chain.id !== chain.id) {
    await walletClient.switchChain(chain);
  }
};

// Fetch Total Contribution
export const getContribution = async () => {
  try {
    const totalContribution = await readContract({
      address: PRESALE_ADDRESS,
      abi: ABI_PRESALE,
      functionName: "totalContribution",
    });

    return {
      totalContribution: totalContribution ? formatEther(totalContribution) : "0",
    };
  } catch (error) {
    console.error("Error fetching total contribution: ", error);
    return {
      totalContribution: "0",
    };
  }
};

// Fetch Presale Data
export const getData = async (walletClient) => {
  try {
    await setChain(walletClient);

    const usersData = await readContract({
      ...presaleContract,
      functionName: "users",
      args: [walletClient?.account.address],
    });

    const totalContribution = await readContract({
      ...presaleContract,
      functionName: "totalContribution",
    });

    const walletMax = await readContract({
      ...presaleContract,
      functionName: "walletMax",
    });

    const walletMin = await readContract({
      ...presaleContract,
      functionName: "walletMin",
    });

    const presaleStartTime = await readContract({
      ...presaleContract,
      functionName: "presaleStartTime",
    });

    const [ftmContributed, bonesBought, preRegistered, once] = usersData || [0, 0, false, false];

    return {
      once: !!once,  
      preRegistered: !!preRegistered,
      bonesBought: bonesBought ? formatEther(bonesBought) : "0",
      ftmContributed: ftmContributed ? formatEther(ftmContributed) : "0",
      walletMax: walletMax ? formatEther(walletMax) : "0",
      walletMin: walletMin ? formatEther(walletMin) : "0",
      totalContribution: totalContribution ? formatEther(totalContribution) : "0",
      presaleStartTime: presaleStartTime ? parseInt(presaleStartTime.toString()) : 0,
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

// Contract Interaction for Buy
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
