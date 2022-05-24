export const NETWORKS = {
    localhost: {
      name: "localhost",
      color: "#666666",
      chainId: 1337,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
    }
}

export const MAIN_CONTRACT_ADDRESS = "0xeF31027350Be2c7439C1b0BE022d49421488b72C";