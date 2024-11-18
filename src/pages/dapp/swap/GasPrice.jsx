import React, { useState } from 'react'

const GasPrice = () => {
    const [gas, setGas] = useState('auto');
    return (
        <div>
            <div className="text-base font-bold mb-2">Gas Price</div>
            <div className="inline-flex items-center gap-2 dark:text-white text-black border border-gray-300 rounded-lg p-2">
                <div className={`${gas === 'auto' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setGas('auto')}>
                    Auto
                </div>
                <div className={`${gas === 'slow' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setGas('slow')}>
                    Slow
                </div>
                <div className={`${gas === 'market' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setGas('market')}>
                    Market
                </div>
                <div className={`${gas === 'fast' ? 'bg-blue-100 text-black' : ''} py-2 px-2 rounded   cursor-pointer hover:bg-blue-100 hover:text-black`} onClick={() => setGas('fast')}>
                    Fast
                </div>
            </div>
        </div>
    )
}

export default GasPrice
