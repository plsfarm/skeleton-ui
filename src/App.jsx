import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Landing from "./pages/dapp/Index";
import Liquidity from "./pages/liquidity/liquidity";
import Presale from "./pages/presale/presale";
import SkeletonBoard from "./pages/skeletonBoard/Index";
import SkeletonFarm from "./pages/skeletonFarm/Index";
import SkeletonLiquidity from "./pages/skeletonLiquidity/SkeletonLiquidity";
import SkeletonMoney from "./pages/skeletonMoney/Index";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<SkeletonMoney />} index />
        <Route element={<Landing />} path="landing" />
        <Route element={<Presale />} path="presale" />
        <Route element={<Liquidity />} path="liquidity" />
        <Route element={<SkeletonFarm />} path="skeleton-farm" />
        <Route element={<SkeletonBoard />} path="skeleton-board" />
        <Route element={<SkeletonLiquidity />} path="skeleton-liquidity" />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
