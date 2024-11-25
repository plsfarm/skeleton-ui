import { DownOutlined } from "@ant-design/icons";
import { Web3Button } from "@web3modal/react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";

import { Divider } from "antd";
import { Atom, Droplet, Feather, File, Kanban } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";


const LandingHeaderTomb = () => {
  const [headerToggle, setHeaderToggle] = useState(false);
  const pathname = useLocation().pathname;
  const themeContext = useTheme();

  const isHome = pathname === "/skeleton-money";

  console.log("pathname", pathname);

  return (
    <>
      {!["/presale"].includes(pathname) && (
        <Link
          to="/presale"
          className=" text-white w-full text-sm flex justify-center py-1 cursor-pointer relative z-[200]"
          style={{
            backgroundImage: "linear-gradient(270deg,#214e82 25%,#506077 50%,#ec5409 75%,#ffc966)",
          }}
        >
          Click here to pre register for presale
        </Link>
      )}
      <header className={`wrapper absolute  left-0 ${pathname !== "/presale" ? "top-8 " : "top-0"} z-50 h-[95px] !justify-center py-5`}>
        {headerToggle && <div onClick={() => setHeaderToggle(false)} className="fixed left-0 top-0 z-[90] block h-full w-full  bg-white opacity-60 lg:hidden"></div>}
        <div className="contain text-black/80 rounded-3xl py-0 w-full">
          <div className="px-3 flex items-center justify-between gap-7 lg:justify-start  py-0 w-full">
            <Link to="/">
              {
                <>
                  {!isHome && <img src="/skeleton-money-black.png" className="w-[320px] object-contain dark:hidden" alt="" />}
                  <img src="/skeleton-money-white.png" className={`w-[320px] object-contain  ${isHome ? "block" : "hidden dark:block"}  `} alt="" />
                </>
              }
            </Link>
            <nav
              className={` top-0 z-[91] flex items-center justify-start gap-6  bg-transparent static flex-row  ${headerToggle ? "right-0" : "-right-full"} h-full w-full overflow-y-auto  transition-all  duration-300 lg:h-auto lg:overflow-visible p-0`}
            >
              <HoverCard openDelay={200} className="!bg-dark">
                <HoverCardTrigger className={`${isHome ? "text-white" : "text-black dark:text-white"}  font-medium items-center gap-2 cursor-pointer hidden lg:flex`}>
                  Menu <DownOutlined className="size-3" />
                </HoverCardTrigger>
                <HoverCardContent className="rounded-xl w-[500px] dark:!bg-dark !py-5 !px-5">
                  <div className="flex gap-2">
                    <div className="w-[200px] flex flex-col justify-center">
                      <div className=" top-0 text-xs mb-2">Coming soon</div>
                      <div className="flex items-center gap-2 relative">
                        <img src="/skull-tomb.png" className="w-14 dark:block hidden" alt="" />
                        <img src="/skull-tomb-black.png" className="w-14 dark:hidden block" alt="" />
                        <div>
                          <div className="text-xs dark:text-white text-black">Skeleton Money</div>
                        </div>
                      </div>
                      <div>
                        <Divider className="bg-white/20 my-5" />
                      </div>
                      <div>
                        <Link to="/" className="w-full rounded">
                          <div className="w-full rounded py-3 px-3 hover:bg-gray-200 dark:hover:bg-[#15151a] flex gap-2">
                            {" "}
                            <Atom />
                            Home
                          </div>
                        </Link>
                      </div>
                      {/* <div>
                        <Link to="/skeleton-farm" className="w-full rounded">
                          <div className="w-full rounded py-3 px-3 hover:bg-gray-200 dark:hover:bg-[#15151a] flex gap-2">
                            {" "}
                            <Feather />
                            Skeleton Farm
                          </div>
                        </Link>
                      </div> */}
                      {/* <div>
                        <Link to="/skeleton-board" className="w-full rounded">
                          <div className="w-full rounded py-3 px-3 hover:bg-gray-200 dark:hover:bg-[#15151a] flex gap-2">
                            {" "}
                            <Kanban />
                            Staking
                          </div>
                        </Link>
                      </div> */}
                      <div>
                        <Link to="/presale" className="w-full rounded">
                          <div className="w-full rounded py-3 px-3 hover:bg-gray-200 dark:hover:bg-[#15151a] flex gap-2">
                            {" "}
                            <Droplet />
                            Presale
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="bg-gray-300 dark:bg-[#15151a] w-[300px] rounded p-4">
                      <div className="text-lg dark:text-white text-black">Socials</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <a href="https://x.com/skeleton_sonic" target="blank">
                          <div className="border border-gray-600 h-[100px] w-full rounded flex justify-center items-center">
                            <img src="/x.png" className={`w-12 object-contain dark:block hidden`} alt="" />
                            <img src="/x-black.png" className={`w-12 object-contain dark:hidden block`} alt="" />
                          </div>
                        </a>
                        <a href="https://t.me/SkeletonLabs" target="blank">
                          <div className="border border-gray-600 h-[100px] w-full rounded flex justify-center items-center">
                            <img src="/telegram.svg" className={`w-10 object-contain dark:block hidden`} alt="" />
                            <img src="/telegram-black.svg" className={`w-10 object-contain dark:hidden block`} alt="" />
                          </div>
                        </a>
                        <a href="https://x.com/skeleton_sonic" target="blank">
                          <div className="border border-gray-600 h-[100px] w-full rounded flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" className="h-full w-full m-4" viewBox="0 0 48 48">
                              <path
                                fill="currentColor"
                                d="M35.636 14.972s-3.335-2.7-7.272-3.009l-.355.735c3.559.902 5.193 2.191 6.9 3.779-2.943-1.554-5.847-3.01-10.909-3.01s-7.966 1.456-10.91 3.01c1.709-1.588 3.652-3.021 6.901-3.779l-.355-.735c-4.13.403-7.272 3.01-7.272 3.01S8.639 20.558 8 31.522c3.753 4.479 9.454 4.514 9.454 4.514l1.193-1.643a14.547 14.547 0 01-6.283-4.375C14.718 31.861 18.273 33.78 24 33.78c5.727 0 9.282-1.918 11.636-3.762a14.539 14.539 0 01-6.283 4.376l1.192 1.643s5.702-.035 9.455-4.514c-.64-10.964-4.364-16.55-4.364-16.55zM19.273 28.514c-1.407 0-2.546-1.347-2.546-3.01 0-1.662 1.14-3.009 2.546-3.009s2.545 1.347 2.545 3.01c0 1.662-1.139 3.009-2.545 3.009zm9.454 0c-1.406 0-2.545-1.347-2.545-3.01 0-1.662 1.139-3.009 2.545-3.009 1.407 0 2.546 1.347 2.546 3.01 0 1.662-1.14 3.009-2.546 3.009z"
                              ></path>
                            </svg>
                          </div>
                        </a>
                        <a href=" https://skeleton-labs.gitbook.io/skeleton-money" target="blank">
                          <div className="border border-gray-600 h-[100px] w-full rounded flex flex-col justify-center items-center">
                            <File className="size-10" />
                            Docs
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              {
                <div className="ml-auto flex gap-2">
                  {
                    pathname !== '/skeleton-money' &&
                    <button onClick={() => themeContext.setTheme(themeContext.theme === "dark" ? "light" : "dark")} className=" text-white rounded p-2">
                      {themeContext.theme === "dark" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                          />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-black">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                          />
                        </svg>
                      )}
                    </button>
                  }
                  {pathname !== "/" && (
                    <div className="wallet">
                      <Web3Button icon="hide" label="Connect" />
                    </div>
                  )}
                </div>
              }
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default LandingHeaderTomb;
