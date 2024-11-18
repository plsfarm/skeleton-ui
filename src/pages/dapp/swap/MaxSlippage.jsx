import React, { useState } from 'react'

const MaxSlippage = () => {
    const [slippage, setSlippage] = useState('auto');
    return (
        <div>
            <div className="text-base font-bold mb-2">Max Slippage</div>
            <div className="inline-flex items-center gap-2 dark:text-white text-black border border-gray-300 rounded-lg p-2">
                <div className={`${slippage === 'auto' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setSlippage('auto')}>
                    Auto 1%
                </div>
                <div className={`${slippage === '0.1' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setSlippage('0.1')}>
                    0.1%
                </div>
                <div className={`${slippage === '0.5' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setSlippage('0.5')}>
                    0.5%
                </div>
                <div className={`${slippage === '1' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setSlippage('1')}>
                    1%
                </div>
                <div className={`${slippage === '3' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setSlippage('3')}>
                    3%
                </div>
                <div className=" rounded border dark:border-gray-700 border-gray-200 w-[150px] flex gap-2 items-center px-3">
                    <div className="text-sm">Custom</div>
                    <input type="number" value={slippage} onChange={(e) => setSlippage(e.target.value)} className="py-2 px-2 w-full bg-transparent
                                outline-none text-black dark:text-white
                            " />
                    <div className="text-sm">%</div>
                </div>
            </div>
        </div>
    )
}

export default MaxSlippage
