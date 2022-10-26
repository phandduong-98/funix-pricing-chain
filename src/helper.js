import { ethers } from 'ethers';
import { MAIN_CONTRACT_ADDRESS, IMAGE_CID_LENGTH } from './constants';
import Main from './artifacts/contracts/Main.sol/Main.json';
import Session from './artifacts/contracts/Session.sol/Session.json';
import M from "materialize-css";


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
        if (adminAddress.toLowerCase() === account.toLowerCase()) {
            return true;
        }
    }
    return false;
}

export const toStringState = (state) => {
    if (state == 0) return "Opened";
    if (state == 1) return "Closed";
    return;
}

export const getCurrentTimestamp = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://bscrpc.com");
    const blockNumber = await provider.getBlockNumber();
    const timestamp = (await provider.getBlock(blockNumber)).timestamp;
    return timestamp;
}

export const checkIsRegistered = async () => {
    let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
    try {
        return await contract.checkRegistered();
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const validateRegister = (fullname, email) => {
    if (email === "" && fullname == "") {
        M.toast({ html: 'Require name and email', classes: 'rounded' });
        return false;
    }
    if (fullname === "") {
        M.toast({ html: 'Require name', classes: 'rounded' });
        return false;
    }
    if (email === "") {
        M.toast({ html: 'Require email', classes: 'rounded' });
        return false;
    }
    if (!validateEmail(email)) {
        M.toast({ html: 'Wrong email format', classes: 'rounded' });
        return false;
    }
    return true;
};

export const validateSession = (productName,productDescription, productImages) =>{
    if (productName === "" && productDescription == "") {
        M.toast({ html: 'Require productName and productDescription', classes: 'rounded' });
        return false;
    }
    if (productName === "") {
        M.toast({ html: 'Require productName', classes: 'rounded' });
        return false;
    }
    if (productDescription === "") {
        M.toast({ html: 'Require productDescription', classes: 'rounded' });
        return false;
    }
    if (productImages.some((element) => !element || element.length !== IMAGE_CID_LENGTH)) 
    {
        M.toast({ html: 'Require image hash', classes: 'rounded' });
        return false;
    }
    return true;
}

// export
// export const a = async () => {
//     return "aloo";
// }