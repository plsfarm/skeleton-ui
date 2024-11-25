import Web3 from 'web3';
import { ABI_REGISTER } from './ABIs';
import BigNumber from 'bignumber.js';

const RAFFLE_ADDRESS = '0x2E654Fa56fBb77473C9D577126163dD5F04d5d8A';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(ABI_REGISTER, RAFFLE_ADDRESS);

// Get time left until raffle ends
export const getTimeLeft = async () => {
  try {
    const endTime = await contract.methods.endTime().call();
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

// Get the number of tickets owned by the current account
export const getTickets = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    if (!accounts.length) throw new Error("No accounts found");

    const account = accounts[0];
    const tickets = await contract.methods.tickets(account).call();
    return new BigNumber(tickets);
  } catch (error) {
    console.error("Error fetching tickets: ", error);
    throw error;
  }
};

// Purchase tickets by sending a transaction
export const raffle = async (_tickets) => {
  try {
    if (!_tickets || _tickets <= 0) {
      throw new Error("Invalid number of tickets");
    }

    const accounts = await web3.eth.getAccounts();
    if (!accounts.length) throw new Error("No accounts found");

    const account = accounts[0];

    const ticketPrice = await contract.methods.price().call();
    const totalCost = new BigNumber(ticketPrice).times(_tickets);

    const tx = await contract.methods.raffle(_tickets).send({
      from: account,
      value: totalCost.toString(),
    });

    console.log(`Transaction hash: ${tx.transactionHash}`);

    return {
      success: true,
      hash: tx.transactionHash,
    };
  } catch (error) {
    console.error("Transaction failed: ", error);
    return {
      success: false,
      error: error.message,
    };
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
