import { Modal } from 'antd';
import React, { useState } from 'react';

const StakeModal = ({
  isModalOpen,
  setIsModalOpen,
  slippage,
  setSlippage,
}) => {
  return (
    <Modal
      centered
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}>
      <div className="text-lg">Staking</div>
      <div className="my-5 dark:bg-white/10 bg-black/10 h-[2px] w-full" />
      <div className="text-lg dark:text-white/80 text-black/80">Token Rate</div>
      <div className="my-7">
        <div className="flex gap-2">
          <img src="/sonic.png" className="w-12 h-12" alt="" />
          <div>
            <div className="text-lg">SONIC | BONES</div>
            <div>$0.0012 USD</div>
          </div>
        </div>
      </div>
      <div className='my-7'>
        <div className="text-lg dark:text-white/80 text-black/80">Amount to Stake</div>
        <input className="w-full rounded-lg bg-gray-200 p-3 text-sm dark:text-white/80 text-black/80 outline-none" placeholder="0.0" type="number" />
        <button className="w-full rounded-lg bg-primary p-3 text-sm text-white outline-none mt-5">Stake</button>
      </div>
      <div>
        <div className="text-lg dark:text-white/80 text-black/80">Lock Options</div>
        <select className="w-full rounded-lg dark:bg-gray-800 bg-gray-200 p-3 text-sm dark:text-white/80 text-black/80 outline-none mt-2">
          <option>1 Month</option>
          <option>2 Months</option>
          <option>6 Months</option>
          <option>1 Year</option>
        </select>
        <button className="w-full rounded-lg bg-primary p-3 text-sm text-white outline-none mt-5">Withdraw Stake</button>
      </div>
      {/* <div className="mt-2 flex items-center gap-3">
        <button
          className={`w-full rounded-lg p-3 text-sm text-white/80 outline-none ${slippage === 0.1 ? 'bg-textclr' : 'bg-secondary'
            }`}
          onClick={() => setSlippage(0.1)}>
          0.1%
        </button>
        <button
          className={`w-full rounded-lg p-3 text-sm text-white/80 outline-none ${slippage === 0.5 ? 'bg-textclr' : 'bg-secondary'
            }`}
          onClick={() => setSlippage(0.5)}>
          0.5%
        </button>
        <button
          className={`w-full rounded-lg p-3 text-sm text-white/80 outline-none ${slippage === 1 ? 'bg-textclr' : 'bg-secondary'
            }`}
          onClick={() => setSlippage(1)}>
          1%
        </button>
        <input
          value={slippage}
          onChange={(e) => {
            if (e.target.value * 1 > 49) {
              setSlippage(49);
            } else if (e.target.value * 1 < 0.1) {
              setSlippage(0.1);
            } else {
              setSlippage(e.target.value);
            }
          }}
          className="w-full rounded-lg bg-secondary p-3 text-sm text-white/80 outline-none"
          placeholder="0.0"
          type="number"
          min={0}
        />
        <div className="text-sm text-white/80">%</div>
      </div> */}
      {/* <div className="mt-5 text-sm">Transaction deadline</div>
      <div className="mt-2 flex items-center gap-3">
        <input
          className="rounded-lg bg-dark p-3 text-sm text-white outline-none"
          placeholder="0.0"
        />
        <div className="text-sm">Minutes</div>
      </div> */}
    </Modal>
  );
};

export default StakeModal;
