import { Web3Button } from "@web3modal/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import { useTheme } from "../../components/ThemeProvider";
import { getTickets, raffle } from "./raffle";
import { getTimeLeft} from "./rafflegetter";

const Presale = () => {
    const themeContext = useTheme();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [userTickets, setUserTickets] = useState(0);
    const [ticketInput, setTicketInput] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch time left
    useEffect(() => {
        const updateTimeLeft = async () => {
            try {
                const remainingTime = await getTimeLeft();
                const days = Math.floor(remainingTime.dividedBy(86400)); // Seconds in a day
                const hours = Math.floor(remainingTime.mod(86400).dividedBy(3600)); // Seconds in an hour
                const minutes = Math.floor(remainingTime.mod(3600).dividedBy(60)); // Seconds in a minute
                const seconds = Math.floor(remainingTime.mod(60));
                setTimeLeft({ days, hours, minutes, seconds });
            } catch (error) {
                console.error("Failed to fetch time left: ", error);
            }
        };

        updateTimeLeft();
        const timer = setInterval(updateTimeLeft, 1000); // Update every second
        return () => clearInterval(timer);
    }, []);

    // Fetch user's tickets
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await getTickets();
                setUserTickets(tickets.toNumber());
            } catch (error) {
                console.error("Failed to fetch user tickets: ", error);
            }
        };
        fetchTickets();
        const interval = setInterval(fetchTickets, 5000); 
        return () => clearInterval(interval); 
    }, []);

    // Handle ticket purchase
    const handleBuyTickets = async () => {
        setLoading(true);
        try {
            const result = await raffle(ticketInput);
            if (result.success) {
                alert("Tickets purchased successfully!");
                const tickets = await getTickets(); // Update user's tickets
                setUserTickets(tickets.toNumber());
            } else {
                alert("Purchase failed: " + result.error);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
        setLoading(false);
    };

    return (
        <>
<Link
    target="_blank"
    to="https://zealy.io/cw/skeletonlabs"
    className="bg-[#111827] text-white w-full flex justify-center py-1 cursor-pointer relative z-[100] text-shadow-pulse"
>
    Complete tasks to secure a WL spot and earn exclusive rewards
</Link>

<style jsx>{`
    @keyframes pulse {
        0% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.7);
        }
        50% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 1);
        }
        100% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.7);
        }
    }

    .text-shadow-pulse {
        animation: pulse 4s infinite;
    }
`}</style>

            <div className="relative md:max-h-screen md:overflow-hidden">
                <div className="flex justify-end items-center px-10 py-3 md:absolute right-0 z-30">
                    <Link
                        to="https://skeleton-labs.gitbook.io/skeleton-money"
                        target="blank"
                        className="flex items-center justify-start transition-all duration-300 hover:bg-black hover:bg-opacity-[0.04] mr-5"
                    >
                        <p className={`ml-2 text-sm font-medium md:text-white`}>Docs</p>
                    </Link>
                    <div className="wallet">
                        <Web3Button icon="hide" label="Connect" />
                    </div>
                </div>
               
                <img
                    src="/presale.jpg"
                    className="w-full hidden sm:block sm:h-screen object-cover"
                />
                <div className="absolute flex flex-1 flex-col items-center w-full top-14 md:top-0 h-screen justify-center">
                    <div className="mx-auto box m-auto min-w-[300px] max-w-[400px] px-3 gap-3 space-y-5 rounded-lg my-14 dark:!bg-gray-900 !bg-gray-200">
                        <Link
                            to="/"
                            className="flex flex-col justify-center items-center gap-3 text-center text-5xl font-bold text-black md:flex-row"
                        >
                            <img
                                src="/presale-logo.png"
                                alt="logo"
                                className="mt-2 w-56 hidden dark:block"
                            />
                            <img
                                src="/presale-logo-black.png"
                                alt="logo"
                                className="mt-2 w-56 dark:hidden"
                            />
                        </Link>

                        <div className="mb-2">
                            {/* <h1 className="text-3xl font-bold dark:text-white text-black mb-1">
                                Raffle
                            </h1> */}







                            <span className="mb-2 dark:text-white text-black">ends in:</span>
                            <div className="flex gap-3">
                                {/* Display time left */}
                                {["days", "hours", "minutes", "seconds"].map((unit) => (
                                    <div
                                        key={unit}
                                        className="flex aspect-square basis-[calc(25%-0.5625rem)] flex-col items-center justify-center rounded-md dark:bg-darklight bg-gray-500 dark:bg-opacity-100 bg-opacity-10 dark:text-white text-black"
                                    >
                                        <h2 className="text-3xl font-bold leading-7">
                                            {timeLeft[unit]}
                                        </h2>
                                        <span className="text-sm leading-4 opacity-75">
                                            {timeLeft[unit] === 1 ? unit.slice(0, -1) : unit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <p className="mb-2 dark:text-white text-black">

                        <div className="relative group">
  {/* Main Text */}
  <p className="mb-2 text-primary font-bold cursor-pointer">
    How to Participate
  </p>

  {/* Hidden Text (Revealed on Hover) */}
  <div
    className="absolute hidden group-hover:block bg-gray-900 text-white p-3 rounded-md mt-2 w-full z-10"
    style={{ backgroundColor: "#000" }} /* Ensures full solid black */
  >
    <p>
    <br /> Purchase a ticket to secure your spot in the phase one presale.<br />   <br />  
    Up for grabs in the unique Skeleton raffle system: Skeleton Money genesis NFT's, <br /><br />2000 FTM pre-filled allocation spots, and, of course, the coveted Skeleton Champion Whitelist allocations.
    <br />  
      <br />
      Each ticket increases your allocation potential.<br />
   
    </p>
  </div>
</div>
                            

  <span className="text-sm leading-4 opacity-75 text-center">
    Enter ticket amount - 1 ticket = 5 FTM 
  </span>


                            
                        </p>
          
                        <input
                            type="number"
                            id="ticketCount"
                            name="ticketCount"
                            min="1"
                            value={ticketInput}
                            onChange={(e) => setTicketInput(Number(e.target.value))}
                            className="mt-1 w-full max-w-md rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 h-14 text-center"
                            placeholder="Enter number of tickets"
                        />
                        <button
                            onClick={handleBuyTickets}
                            disabled={loading}
                            className={`mt-2 h-11 w-full rounded-xl bg-primary text-black p-2 font-[500] shadow-lg transition-all duration-300 ${loading ? "cursor-not-allowed opacity-50" : ""
                                }`}
                        >
                            {loading ? "Processing..." : "Buy Tickets"}
                        </button>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-primary/20 p-4 text-center dark:text-white text-black">
                                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
                                        {userTickets}
                                    </h3>
                                    <span className="text-sm dark:text-white/70 text-black/70">
                                        Your Tickets
                                    </span>

                                </div>


                            </div>

                        </div>

                        <div className="flex items-center justify-center gap-6 mt-3">
                            <a href="https://twitter.com/skeletonslab" target="blank">
                                <img src="/x.png" className={`w-5 object-contain dark:block hidden`} alt="" />
                                <img src="/x-black.png" className={`w-5 object-contain dark:hidden block`} alt="" />
                            </a>
                            <a href="https://t.me/SkeletonLabs" target="blank">

                                <img src="/telegram.svg" className={`w-5 object-contain dark:block hidden `} alt="" />
                                <img src="/telegram-black.svg" className={`w-5 object-contain dark:hidden block `} alt="" />
                            </a>
                            <a href="https://zealy.io/cw/skeletonlabs" target="blank">
                                <img src="/zealy.png" className={`w-5 object-contain dark:block hidden `} alt="" />
                                <img src="/zealy.png" className={`w-5 object-contain dark:hidden block `} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Presale;
