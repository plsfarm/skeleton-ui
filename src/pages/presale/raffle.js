import Web3 from 'web3';
import { ABI_REGISTER } from './ABIs';
import BigNumber from 'bignumber.js';

const RAFFLE_ADDRESS = '0x57688f84867FCD3ad25582c95FC6c095d16374A9';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(ABI_REGISTER, RAFFLE_ADDRESS);


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
