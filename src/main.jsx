import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import ContextProvider from "./utils/Context";
import { ConfigProvider } from "antd";


const sonic = {
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

const chains = [sonic];
const projectId = "6d3445e93cf2d607c5cffdafc14e5408";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <ContextProvider>
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  colorBorder: "#494949",
                  colorBgContainer: "bg-darklight",
                  colorPrimary: "white",
                  colorText: "white",
                  colorTextHeading: "white",
                },
                Segmented: {
                  itemSelectedBg: "#8598ce",
                  colorBgLayout: "#141414",
                  colorText: "white",
                },
              },
              token: {
                colorPrimary: "#8598ce",
                colorLink: "white",
                colorLinkHover: "grey",
              },
            }}
          >
            <App />
          </ConfigProvider>
        </ContextProvider>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="light"
        themeVariables={{
          "--w3m-font-family": "Poppins, sans-serif",
          "--w3m-accent-color": "#8598ce",
          "--w3m-accent-fill-color": "white",
          "--w3m-button-border-radius": "20px",
        }}
        defaultChain={sonic}
      />
    </BrowserRouter>
  </React.StrictMode>
);
