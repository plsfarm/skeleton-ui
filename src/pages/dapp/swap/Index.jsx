import React, { useEffect } from "react";
import Swap from "./Swap";
import LandingHeader from "../../../layout/LandingHeader";
import { useTheme } from "../../../components/ThemeProvider";
import Footer from "../../../layout/Footer";

const Index = () => {
  const theme = useTheme()

  useEffect(() => {
    theme.setTheme('dark')
  }, [])

  return (
    <div className="">
      <LandingHeader />
      <div className="flex justify-center items-center my-32 px-5">
        <Swap />
      </div>
      <Footer />
    </div >
  );
};

export default Index;
