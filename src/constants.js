export const NETWORKS = {
    localhost: {
      name: "localhost",
      color: "#666666",
      chainId: 1337,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
    }
}

export const MAIN_CONTRACT_ADDRESS = "0x998abeb3E57409262aE5b751f60747921B33613E";
export const IMAGE_CID_LENGTH = 46;