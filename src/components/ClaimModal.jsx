import { Modal } from 'antd';
import React, { useState } from 'react';

const ClaimModal = ({
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
      <div className="text-lg">Claim/Withdraw</div>
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
        <button className="w-full rounded-lg bg-primary p-3 text-sm text-white outline-none mt-5">Claim</button>
      </div>
      <div>
        <div className="text-lg dark:text-white/80 text-black/80">Lock Options</div>
        <select className="w-full rounded-lg dark:bg-gray-800 bg-gray-200 p-3 text-sm dark:text-white/80 text-black/80 outline-none mt-2">
          <option>1 Month</option>
          <option>2 Months</option>
          <option>6 Months</option>
          <option>1 Year</option>
        </select>
        <button className="w-full rounded-lg bg-primary p-3 text-sm text-white outline-none mt-5">Withdraw</button>
      </div>
    </Modal>
  );
};

export default ClaimModal;
