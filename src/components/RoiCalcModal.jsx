import {
  ArrowDownOutlined
} from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { BRATEAddress, BSHAREAddress } from "../utils/ContractAddresses";
import { formatSmall } from "../utils/Helper";
import { tokens } from "../utils/Tokens";

const labelToDuration = (label) => {
  switch (label) {
    case "1D":
      return 1;
    case "7D":
      return 7;
    case "30D":
      return 30;
    case "1Y":
      return 365;
    case "5Y":
      return 5 * 365;
  }
};

const RoiCalcModal = ({
  setIsModalOpen,
  isModalOpen,
  APR,
  data,
  pid,
  boardroom,
}) => {
  const [selectedDuration, setSelectedDuration] = useState("1D");
  const dailyAPR = APR / 365;
  const token = boardroom ? BSHAREAddress : data?.poolsViews[pid]?.token;
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [isInverse, setIsInverse] = useState(false);
  // console.log({ data });
  const changeAmountIn = (amountIn) => {
    if (isNaN(amountIn)) return;
    setAmountIn(amountIn);
    setAmountOut(
      (amountIn * dailyAPR * labelToDuration(selectedDuration)).toFixed(2)
    );
    setIsInverse(false);
  };

  const changeAmountOut = (amountOut) => {
    setAmountOut(amountOut);
    setAmountIn(
      (amountOut / (dailyAPR * labelToDuration(selectedDuration))).toFixed(2)
    );
    setIsInverse(true);
  };
  useEffect(() => {
    if (!amountIn) return;
    if (!amountOut) return;
    if (isInverse) {
      setAmountIn(
        (amountOut / (dailyAPR * labelToDuration(selectedDuration))).toFixed(2)
      );
    } else {
      setAmountOut(
        (amountIn * dailyAPR * labelToDuration(selectedDuration)).toFixed(2)
      );
    }
  }, [selectedDuration, isInverse]);
  return (
    <Modal
      centered
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      className=" my-10"
    >
      <div className="text-lg">ROI Calculator</div>
      <div className="mt-3 w-full border dark:border-white/10 border-black/10"></div>
      <div className="mt-3 flex justify-between">
        <div className="text-base">{tokens[token]?.symbol} staked</div>
      </div>
      <div className="my-3 flex flex-col items-end rounded-xl dark:bg-black bg-darklight p-4">
        <div className="flex w-full items-center gap-2">
          <input
            className="w-full bg-transparent text-end text-lg outline-none text-white"
            placeholder="0"
            value={amountIn}
            type="number"
            onChange={(e) => changeAmountIn(e.target.value)}
          />
          <div>$</div>
        </div>
        <div className="mt-2 text-end text-xs text-white/80">
          {formatSmall(
            boardroom
              ? amountIn / 0.01
              : amountIn / data?.lpList[token]?.LPPrice,
            tokens[token]?.format
          )}{" "}
          {tokens[token]?.symbol}
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className="rounded border-none bg-gray-400/10 px-3 py-2 text-center text-sm font-medium dark:text-white text-black outline-none transition-all duration-300 hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => changeAmountIn(100)}
        >
          $100
        </button>
        <button
          className="rounded border-none bg-gray-400/10 px-3 py-2 text-center text-sm font-medium dark:text-white text-black outline-none transition-all duration-300 hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => changeAmountIn(1000)}
        >
          $1000
        </button>
        <button
          className="rounded border-none bg-gray-400/10 px-3 py-2 text-center text-sm font-medium uppercase dark:text-white text-black outline-none transition-all duration-300 hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
          onClick={() =>
            changeAmountIn(
              parseFloat(
                boardroom
                  ? data?.boardroomStakedPShare * 1
                  : data?.userViews[pid]?.stakedAmount *
                  data?.lpList[token]?.LPPrice
              )
            )
          }
        >
          My Stake
        </button>
      </div>
      <div className="mt-5 text-base">Staked for</div>

      <div className="my-4 w-full rounded-lg dark:bg-black bg-darklight p-1 ">
        <div className="flex items-center justify-between">
          {["1D", "7D", "30D", "1Y", "5Y"].map((d) => (
            <div
              key={d}
              className={`w-[50%] cursor-pointer rounded-lg py-1 text-center ${selectedDuration === d ? "bg-primary text-black" : "text-white"
                } transition-all duration-300`}
              onClick={() => setSelectedDuration(d)}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
      <div className="my-5 text-center">
        <ArrowDownOutlined
          className={`text-lg ${isInverse && "rotate-180"
            } transition-all duration-300`}
        />
      </div>
      <div className="rounded-lg border border-sidebar p-5">
        <div className="flex flex-col space-y-3">
          <div className="text-sm">ROI at current rates</div>
          <div className="flex w-full items-center gap-2">
            <div className="text-xl">$</div>
            <input
              value={amountOut}
              onChange={(e) => {
                changeAmountOut(e.target.value);
              }}
              type="number"
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-xl bg-darklight px-2 py-1 text-start text-3xl text-white/80 outline-none"
              placeholder="0"
            />
          </div>
          <div className="text-xs">
            ~{" "}
            {boardroom
              ? formatSmall(
                amountOut / data?.pulseRatePriceInUSD,
                tokens[BRATEAddress].format
              )
              : formatSmall(
                amountOut / 1,
                tokens[BSHAREAddress]?.format
              )}{" "}
            {boardroom ? "BRATE" : "BMS"}
          </div>
        </div>
      </div>

      <div className="my-3 space-y-3">
        <div className="flex justify-between ">
          <div className="text-base ">APR</div>
          <div className="text-base ">{formatSmall(APR, "%0,0")}</div>
        </div>
        <div className="flex justify-between ">
          <div className="text-base ">Daily APR</div>
          <div className="text-base ">{formatSmall(dailyAPR, "%0,0.00")}</div>
        </div>
        <ul className="list-disc space-y-1 px-5 dark:text-white/80 text-black/80">
          <li>Calculated based on current rates.</li>
          <li>
            All figures are estimates provided for your convenience only, and by
            no means represent guaranteed returns.
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default RoiCalcModal;
