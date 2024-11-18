import { Modal } from 'antd';
import React, { useState } from 'react';

const SettingModal = ({
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
      <div className="text-lg">Settings</div>
      <div className="my-5 bg-white/10 h-[2px] w-full" />
      <div className="text-sm text-white/80">Slippage tolerance</div>
      <div className="mt-2 flex items-center gap-3">
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
      </div>
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

export default SettingModal;
