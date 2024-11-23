import { useState } from "react";
import { Link, useLocation, useNavigation, useParams } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../utils/Context";
import { useWalletClient, usePublicClient } from "wagmi";
import { notification, Popover, Tooltip, Typography } from "antd";
import { formatSmall } from "../utils/Helper";
import Countdown, { zeroPad } from "react-countdown";
import { IoIosArrowBack } from "react-icons/io";
import { ChevronLeft, ChevronRight, Layers, Tractor } from "lucide-react";

const renderer = ({ days, hours, minutes, seconds }) => {
  // Render a countdown
  return (
    <span>
      {zeroPad(days * 24 + hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s
    </span>
  );
};

const { Text } = Typography;

const DropDownToggle = ({ pathname, setSidebarToggle }) => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div className={`flex w-full flex-col items-start justify-start pb-3`}>
      <button
        onClick={() => {

          setDropDown((prev) => !prev)
        }}
        className="flex min-h-[48px] w-full items-center justify-between px-5 transition-all duration-300 hover:bg-black hover:bg-opacity-[0.04]"
      >
        <div className="flex w-full items-center justify-start ">
          <p className="text-base font-medium text-white">Swap</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className={`h-5 w-5 ${dropDown ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {dropDown && (
        <div
          className={`flex min-h-max w-full flex-col items-start justify-start overflow-hidden transition-all duration-300`}
        >
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/swap"
            className={`flex min-h-[48px] w-full items-center justify-start gap-4 px-5 py-2 transition-all duration-300 hover:bg-gray-400 hover:bg-opacity-[0.1] hover:pl-6 ${pathname === "/swap" &&
              "bg-gray-400 bg-opacity-[0.1] text-black"
              }`}
          >
            <p className="text-base font-medium text-white pl-5">Swap</p>
          </Link>
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/liquidity"
            className={`flex min-h-[48px] w-full items-center justify-start gap-4 px-5 py-2 transition-all duration-300 hover:bg-gray-400 hover:bg-opacity-[0.1] hover:pl-6 ${pathname === "/liquidity" &&
              "bg-gray-400 bg-opacity-[0.1] text-black"
              }`}
          >
            <p className="text-base font-medium text-white pl-5">Liquidity</p>
          </Link>
          <Link
            onClick={() => setSidebarToggle(false)}
            to="/bridge"
            className={`flex min-h-[48px] w-full items-center justify-start gap-4 px-5 py-2 transition-all duration-300 hover:bg-gray-400 hover:bg-opacity-[0.1] hover:pl-6 ${pathname === "/bridge" &&
              "bg-gray-400 bg-opacity-[0.1] text-black"
              }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-white pl-5">Bridge</p>
              {/* <div className="absolute right-10 rounded-lg border border-lightPink px-1 text-[12px] text-lightPink">
              New
            </div> */}
            </div>
          </Link>


        </div>
      )}
    </div>
  );
};

const notifSuccess = (text, duration = 3) => {
  notification.success({
    message: text,
    placement: "bottom",
    duration,
  });
};
const notifError = (text, duration = 3) => {
  notification.error({
    message: text,
    placement: "bottom",
    duration,
  });
};

const Sidebar = ({ setSidebarToggle, sidebarToggle }) => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <div
      className={`sidebar fixed transition-all duration-300 xl:sticky ${sidebarToggle ? "left-0" : "-left-full"
        } top-0 z-50 flex max-h-[90vh] w-full flex-col items-start justify-start overflow-y-auto  bg-secondary pt-16 backdrop-blur-2xl  xl:backdrop-blur-0 ${isCollapsed && "!w-[60px]"}`}
    >
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="bg-gray-800 p-3 rounded-full mb-4">
        <div className="size-6 flex items-center justify-center rounded-full bg-primary">
          {
            isCollapsed ? <ChevronRight /> : <ChevronLeft />
          }
        </div>
      </button>
      <button
        onClick={() => setSidebarToggle(false)}
        className="absolute right-5 top-5 block text-white xl:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {
        !isCollapsed &&
        <Link Link
          onClick={() => setSidebarToggle(false)}
          to="/"
          className="w-full px-3 pt-0"
        >
          <img src="/logo.png" className="w-[150px]" alt="" />
        </Link>
      }
      <div className="mt-4 flex w-full flex-col items-start justify-center  pt-3">

        <Link
          onClick={() => setSidebarToggle(false)}
          to="/farming"
          className={`flex text-white min-h-[48px] w-full items-center justify-start gap-4 px-5 py-2 transition-all duration-500 hover:bg-gray-400 hover:bg-opacity-[0.1] hover:pl-6 ${pathname === "/farming" &&
            "bg-gray-400 bg-opacity-[0.1] "
            }`}
        >
          <Tractor />
          {
            !isCollapsed && <p className="text-base font-medium text-white">Farms</p>
          }

        </Link>
        {/* <Link
          onClick={() => setSidebarToggle(false)}
          to="/staking"
          className={`flex text-white min-h-[48px] w-full items-center justify-start gap-4 px-5 py-2 transition-all duration-500 hover:bg-gray-400 hover:bg-opacity-[0.1] hover:pl-6 ${pathname === "/staking" &&
            "bg-gray-400 bg-opacity-[0.1]"
            }`}
        >
          <Layers />
          {
            !isCollapsed && <p className="text-base font-medium text-white">Staking</p>
          }

        </Link> */}






      </div>
    </div >

  );
};

export default Sidebar;
