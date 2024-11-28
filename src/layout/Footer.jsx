import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"
import { useTheme } from '../components/ThemeProvider'

const earnSkeletonItems = [{
    title: 'Skeleton Money',
    link: '/skeleton-money'
},
{
    title: 'Skeleton Farm',
    link: '/skeleton-farm'
},
{
    title: 'Skeleton Board',
    link: '/skeleton-board'
},
{
    title: 'Liquidty',
    link: '/liquidity'
}

]

const earnItems = [
    // {
    //     title: 'Liquidity',
    //     link: '/liquidity'
    // },
    // {
    //     title: 'Skeleton Money',
    //     link: '/skeleton-money'
    // },
    // {
    //     title: 'Presale',
    //     link: '/presale'
    // }
]

const Footer = () => {
    const theme = useTheme()
    const pathname = useLocation().pathname
    const isSkeletonFarm = pathname === '/skeleton-money'
    const isHome = pathname === '/' || isSkeletonFarm
    const isTombLinks = ['/skeleton-money', '/skeleton-farm', '/skeleton-board', '/liquidity'].includes(pathname)
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

            <div
                className="fixed left-0 bottom-0 z-[90] block h-auto w-full  bg-black lg:hidden border-t border-gray-700 md:py-3"
            >
                <div className="grid grid-cols-2 items-center text-base *:text-white *font-bold *:cursor-pointer *text-3xl *:text-center overflow-auto gap-2 py-2 px-3">
                    <Link to="/" className='w-full rounded hover:bg-primary hover:text-black'>Home</Link>
                    <Popover>
                        <PopoverTrigger className='hover:bg-primary hover:text-black rounded'>Menu</PopoverTrigger>
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