import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { pulsechain } from "wagmi/chains";
import ReactGA from "react-ga4";
import ContextProvider from "./utils/Context";
import { ConfigProvider } from "antd";

const pulsechainFork = {
  ...pulsechain,
  id: 31337,
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
    public: { http: ["http://localhost:8545"] },
  },
};

const chains = [pulsechain];
// const chains = [pulsechain, pulsechainFork];

const projectId = "6d3445e93cf2d607c5cffdafc14e5408";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactGA.initialize("G-5Z4FPRFX4P");

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
        defaultChain={pulsechain}
      //  defaultChain={pulsechainFork}
      />
    </BrowserRouter>
  </React.StrictMode>
);
