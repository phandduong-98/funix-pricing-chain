import { ethers } from 'ethers';
import { MAIN_CONTRACT_ADDRESS } from './constants';
import Main from './artifacts/contracts/Main.sol/Main.json';
import Session from './artifacts/contracts/Session.sol/Session.json';

export const loadContractWithProvider = async (contractAddress) => {
    if (typeof window.ethereum !== "undefined") {
        let abi;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        abi = (contractAddress === MAIN_CONTRACT_ADDRESS) ? Main.abi : Session.abi;
        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider
        );
        return contract;
    }
    return undefined;
}

export const loadContractWithSigner = async (contractAddress) => {
    if (typeof window.ethereum !== "undefined") {
        let abi;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        abi = (contractAddress === MAIN_CONTRACT_ADDRESS) ? Main.abi : Session.abi;
        const contract = new ethers.Contract(
            contractAddress,
            abi,
            signer
        );
        return contract;
    }
    return undefined;
}

export const isAdmin = async () => {
    let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
    let adminAddress = await contract.admin();
    if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if(adminAddress.toLowerCase() === account.toLowerCase()) {
            console.log("is admin");
            return true;
        }
    }
    console.log("not admin");
    return false;
}

export const toStringState = (state) => {
    if(state === 0) return "Opened";
    if(state === 1) return "Closing";
    if(state === 2) return "Closed";
    return;
}