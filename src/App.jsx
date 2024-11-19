import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/dapp/Index";
import Farms from "./pages/dapp/farms/Index";
import Staking from "./pages/dapp/staking/Index";
import Presale from "./pages/presale/presale";
import { ThemeProvider } from "./components/ThemeProvider";
import Liquidity from "./pages/liquidity/liquidity";
import SkeletonTomb from "./pages/skeletonTomb/Index";
import SkeletonFarm from "./pages/skeletonFarm/Index";
import SkeletonBoard from "./pages/skeletonBoard/Index";
import SkeletonLiquidity from "./pages/skeletonLiquidity/SkeletonLiquidity";

const App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/* Make the Presale page the default route */}
        <Route element={<Presale />} index />
        <Route element={<Farms />} path="farming" />
        <Route element={<Staking />} path="staking" />
        <Route element={<Presale />} path="presale" />
        <Route element={<Liquidity />} path="liquidity" />
        <Route element={<SkeletonTomb />} path="skeleton-tomb" />
        <Route element={<SkeletonFarm />} path="skeleton-farm" />
        <Route element={<SkeletonBoard />} path="skeleton-board" />
        <Route element={<SkeletonLiquidity />} path="skeleton-liquidity" />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
