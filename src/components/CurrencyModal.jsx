import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import { tokens } from "../utils/Tokens.js";
import { Context } from "../utils/Context.jsx";
import { formatSmall } from "../utils/Helper.js";

const CurrencyModal = ({
  setSelected,
  setIsModalOpen,
  isModalOpen,
  alreadySelected = [],
}) => {
  const [search, setSearch] = useState('');
  const context = useContext(Context);
  const { data } = context;
  const onSelect = (token) => {
    // console.log({ token });
    setSelected(token);
    setIsModalOpen(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };


  const filterTokens = Object.values(tokens).filter(token => ['BITCOIN', 'ETHEREUM', 'SOL', 'BASE', 'SONIC'].includes(token.symbol))
  console.log('tokkk', tokens)

  return (
    <Modal
      centered
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <div className="text-lg">Select a token</div>
      <div className="my-2">
        <input className='bg-gray-300 p-3 rounded-lg text-sm text-black outline-none w-full' placeholder='Search name or paste address' value={search} onChange={onSearch} />
      </div>
      <ul className="my-5">
        {Object.values(filterTokens)
          .map((token, index) => (
            <li
              className={`${alreadySelected.includes(token.address) &&
                "pointer-events-none bg-gray-300 opacity-70"
                } my-2 flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 hover:bg-gray-500`}
              key={index}
              onClick={() => onSelect(token.address)}
            >
              <div className="flex items-center gap-3 font-medium">
                <img
                  src={token.logo}
                  alt={token.symbol}
                  className="h-7 w-7 object-contain"
                />
                <div className="text-lg">{token.symbol}</div>
              </div>
              <div className="text-white/80">
                {formatSmall(
                  data.tokensBalancesAndAllowances[token.address]?.balance,
                  tokens[token.address].format
                )}
              </div>
            </li>
          ))}
      </ul>
    </Modal>
  );
};

export default CurrencyModal;
