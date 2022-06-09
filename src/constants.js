export const NETWORKS = {
    localhost: {
      name: "localhost",
      color: "#666666",
      chainId: 1337,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
    }
}

export const MAIN_CONTRACT_ADDRESS = "0x4C4a2f8c81640e47606d3fd77B353E87Ba015584";
export const IMAGE_CID_LENGTH = 46;