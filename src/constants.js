export const NETWORKS = {
    localhost: {
      name: "localhost",
      color: "#666666",
      chainId: 1337,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
    }
}

export const MAIN_CONTRACT_ADDRESS = "0x8ac5eE52F70AE01dB914bE459D8B3d50126fd6aE";
export const IMAGE_CID_LENGTH = 46;