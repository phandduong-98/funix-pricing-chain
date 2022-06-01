export const NETWORKS = {
    localhost: {
      name: "localhost",
      color: "#666666",
      chainId: 1337,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
    }
}

export const MAIN_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const IMAGE_CID_LENGTH = 1;