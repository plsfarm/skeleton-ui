import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"
import { useTheme } from '../components/ThemeProvider'

const earnSkeletonItems = [{
    title: 'Skeleton Tomb',
    link: '/skeleton-tomb'
},
{
    title: 'Skeleton Farm',
    link: '/skeleton-farm'
},
{
    title: 'Skeleton Board',
    link: '/skeleton-board'
}
// ,
// {
//     title: 'Liquidty',
//     link: '/liquidity'
// }

]

const earnItems = [
    {
        title: 'Farm',
        link: '/farming'
    },
    {
        title: 'Staking',
        link: '/staking'
    },
    // {
    //     title: 'Liquidity',
    //     link: '/liquidity'
    // },
    {
        title: 'Skeleton Tomb',
        link: '/skeleton-tomb'
    }
]

const Footer = () => {
    const theme = useTheme()
    const pathname = useLocation().pathname
    const isSkeletonFarm = pathname === '/skeleton-tomb'
    const isHome = pathname === '/' || isSkeletonFarm
    const isTombLinks = ['/skeleton-tomb', '/skeleton-farm', '/skeleton-board', '/liquidity'].includes(pathname)
    console.log('pathname', pathname)
    return (
        <div className={`relative z-50 pt-14 ${(isHome || pathname === '/presale') ? '' : 'mb-10'}`}>
            <a href='https://t.me/SkeletonLabs' target="blank">
                {
                    theme.theme === 'dark' || isSkeletonFarm ?
                        <img src="/skeletonlab-white.png" className="w-[250px] m-auto" alt="" /> :
                        <img src="/skeletonlab-black.png" className="w-[250px] m-auto" alt="" />

                }
            </a>
            {/*  <div className="mb-5 mt-3 max-w-xl text-center text-white">
                <p>
                    "You can't gatekeep us. We smashed your gate to pieces."<br></br>- Richard
                    Heart
                </p>
                <img
                    src="/person.jpeg"
                    className="farming-btn m-auto mt-4 h-[80px] w-[80px] rounded-full object-cover object-top"
                    alt=""
                />
                <img src="/plsform.png" className="w-[150px] m-auto mt-5" alt="" />
            </div> */}
            {/*  <div className={`mb-0 w-full border ${isHome ? 'border-white/20' : 'border-black/10'} `}></div> */}
            {/* <ul className={` gap-3 py-7 justify-center text-base font-medium ${isHome ? '*:text-white' : '*:text-black'}  *font-bold *:cursor-pointer hover:*:underline hover:*:text-primary *:underline-offset-8 hidden md:flex`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/farming">Farm</Link></li>
                <li><Link to="/staking">Staking</Link></li>
            </ul> */}
            {/* <p className={`mt-5 text-sm font-light dark:text-white text-black  text-center`}>
                Copyright © Skeleton Exchange Protocol {
                    new Date().getFullYear()
                }
            </p> */}
            {/* <p className="-mt-3 text-sm font-light text-white">
            <br></br> RH404 0x749ccf4c4308490F3c395De897F58e091090B461
            </p> */}



            <div
                className="fixed left-0 bottom-0 z-[90] block h-auto w-full  bg-black lg:hidden border-t border-gray-700 md:py-3"
            >
                <div className="grid grid-cols-2 items-center text-base *:text-white *font-bold *:cursor-pointer *text-3xl *:text-center overflow-auto gap-2 py-2 px-3">
                    <Link to="/" className='w-full rounded hover:bg-primary hover:text-black'>Bridge</Link>
                    <Popover>
                        <PopoverTrigger className='hover:bg-primary hover:text-black rounded'>EARN</PopoverTrigger>
                        <PopoverContent className="w-[200px]">
                            <div >
                                {
                                    isTombLinks ? earnSkeletonItems.map((item, index) => (
                                        <div key={index}>
                                            <Link to={item.link} className='w-full rounded'>
                                                <div className='w-full rounded py-2 hover:bg-primary hover:text-black px-2'>{item.title}</div>
                                            </Link>
                                        </div>
                                    )) : earnItems.map((item, index) => (
                                        <div key={index}>
                                            <Link to={item.link} className='w-full rounded'>
                                                <div className='w-full rounded py-2 hover:bg-primary hover:text-black px-2'>{item.title}</div>
                                            </Link>
                                        </div>
                                    ))
                                }

                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Footer