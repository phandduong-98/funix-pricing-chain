import { createContext, useState } from "react";
import { loadContractWithProvider } from "../helper";
import { MAIN_CONTRACT_ADDRESS } from "../constants"
import { useEffect } from "react";
export const sessionsCtx = createContext([]);

//create context
//create provider
//create consumer

export const SessionContext = ({ children }) => {
  const [sessions, setSessions] = useState([]);

  const getSessions = async () => {
    let contract = await loadContractWithProvider(MAIN_CONTRACT_ADDRESS);
    try {
      let _sessions = await contract.getSessions();
      setSessions(_sessions);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getSessions();
  }, [])
  
  
  return (
    <sessionsCtx.Provider value={{sessions, setSessions}}>
      {children}
    </sessionsCtx.Provider>
  );
};
