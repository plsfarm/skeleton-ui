import {
  BITCOIN,
  ETHEREUM,
  SOL,
  BASE,
  SONIC
} from "./ContractAddresses";

export const AddressZero = "0x0000000000000000000000000000000000000000";

export const tokens = {
  [SONIC]: {
    symbol: "SONIC",
    logo: "/sonic.png",
    swap: true,
    address: SONIC,
    decimals: 18,
    format: "0,0",
  },
  [BITCOIN]: {
    symbol: "BITCOIN",
    logo: "/bitcoin.png",
    swap: true,
    address: BITCOIN,
    decimals: 8,
    format: "0,0.[000000]",
  },
  [ETHEREUM]: {
    symbol: "ETHEREUM",
    logo: "/ethereum.png",
    swap: true,
    address: ETHEREUM,
    decimals: 18,
    format: "0,0",
  },
  [SOL]: {
    symbol: "SOL",
    logo: "/sol.png",
    swap: true,
    address: SOL,
    decimals: 9,
    format: "0,0.[000000]",
  },
  [BASE]: {
    symbol: "BASE",
    logo: "/base.png",
    swap: true,
    address: BASE,
    decimals: 18,
    format: "0,0",
  },
 
};
