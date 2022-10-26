import React from "react";
import {
  loadContractWithProvider,
  getCurrentTimestamp,
  toStringState,
} from "../../helper";
import { useEffect, useState, useContext } from "react";

const SessionState = ({ sessionAddress, sessionState }) => {
  const [state, setState] = useState(sessionState);
  const getSessionDetail = async () => {
    let contract = await loadContractWithProvider(sessionAddress);
    try {
      let duration = await contract.getSessionDuration();
      let startTime = await contract.getStartTime();
      let currentTime = await getCurrentTimestamp();
      if (duration && startTime && currentTime) {
        let timer = Number(startTime) + Number(duration) - Number(currentTime);
        if (timer <= 0 && duration.toString() != 0) {
          setState((prev) => (prev = 1));
        }
      } else {
        setState(sessionState);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getSessionDetail();
  }, []);

  return <div>{toStringState(state)}</div>;
};

export default SessionState;
