import Web3 from 'web3';
import { ABI_REGISTER } from './ABIs';
import BigNumber from 'bignumber.js';

const RAFFLE_ADDRESS = '0x57688f84867FCD3ad25582c95FC6c095d16374A9';

// Initialize Web3 with the given RPC URL
const web3 = new Web3('https://api.zan.top/ftm-mainnet');
const contract = new web3.eth.Contract(ABI_REGISTER, RAFFLE_ADDRESS);

// Get time left until raffle ends
export const getTimeLeft = async () => {
  try {
    const endTime = 1733529600;
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    if (endTime < now) {
      return new BigNumber(0);
    }

    const timeLeft = new BigNumber(endTime).minus(now);
    return timeLeft;
  } catch (error) {
    console.error("Error fetching time left: ", error);
    throw error;
  }
};

// Fetch all registered participants
export const getRegisteredUsers = async () => {
  try {
    const [addresses, ticketCounts] = await contract.methods.getRegisteredParticipants().call();
    const participants = addresses.map((address, index) => ({
      address,
      tickets: new BigNumber(ticketCounts[index]),
    }));
    return participants;
  } catch (error) {
    console.error("Error fetching registered users: ", error);
    throw error;
  }
};


export const getTotalTickets = async () => {
  try {

    const balanceWei = await web3.eth.getBalance(RAFFLE_ADDRESS);
    const balanceEther = new BigNumber(web3.utils.fromWei(balanceWei, 'ether'));
    const balanceDividedByFive = balanceEther.dividedBy(5);
    return balanceDividedByFive;
  } catch (error) {
    console.error("Error fetching balance: ", error);
    throw error;
  }
};
