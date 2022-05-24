import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadContract, toStringState } from "../../helper";
import styles from "./SessionDetail.module.css"
import {ethers} from "ethers";
const SessionDetail = ({accounts, setAccounts}) => {
    const [sessionDetail, setSessionDetail] = useState({});
    const [proposePrice, setProposedPrice] = useState("");

    const {address} = useParams();

    const getSessionDetail = async () => {
        let contract = await loadContract(address)
        let _sessionDetail = await contract.getSessionDetail();
        setSessionDetail(_sessionDetail);
        console.log("_sessionDetail", _sessionDetail);
        console.log(accounts[0])
        let participantProposedPrice = await contract.getParticipantProposedPrice(accounts[0]);
        console.log(`participant: ${accounts[0]} proposed price: ${participantProposedPrice.toString()}`);
    }

    const getProposedPrice = async () => {
        let contract = await loadContract(address)
        let participantProposedPrice = await contract.getParticipantProposedPrice(accounts[0]);
        setProposedPrice(ethers.utils.formatEther(participantProposedPrice))
        console.log(`participant: ${accounts[0]} proposed price: ${participantProposedPrice.toString()}`);
    }

    useEffect(()=>{
        console.log("session address: ", address);
        if(!accounts) return;
        getSessionDetail();
        getProposedPrice();
    }, [accounts])

    const handleSubmit = async () => {
        let contract = await loadContract(address);
        try {
            await contract.propose(ethers.utils.parseEther(proposePrice.toString()), {from: accounts[0]}); 
        } catch (error) {
          console.log("Error: ", error);
        }
    }

    return (  
        <div className="session-detail row">
            <div className="container col s8">
                <div className={`${styles.session_header}`}>
                    <div className={`${styles.session_icon}`}>
                        <img src="https://ipfs.infura.io/ipfs/QmZY5CJLNAgVVGHbFa4VTfWpCLEd7QqNiR9eGK3etD78Vo" style={{borderRadius: "50%", width: "48px", height : "48px", filter: "grayscale(0)"}}/>
                    </div>
                    <div className={`${styles.session_header_state}`}>
                        {toStringState(sessionDetail.state)}
                    </div>
                </div>
                <p>
                    {sessionDetail.productDescription}
                </p>
                <div>

                </div>
            </div>
            <div className="container col s4">
                <div className="propose container " style={{border: "1px solid gray", borderRadius:"30px", padding:"20px", width:"30vw", marginTop:"50px", boxShadow: "#f95997 0px 0px 1px"}}>
                <div class="input-field">
                <input 
                    id="propose_price" 
                    type="number" 
                    className="validate"
                    value={proposePrice}
                    onChange={(e) => setProposedPrice(e.target.value)}
                />
                <label className = "active" for="propose_price">Price</label>
                <button className = "btn" disabled={proposePrice < 0} onClick = {handleSubmit}>Propose</button>
            </div>
                </div>
            </div>
        </div>
    );
}
 
export default SessionDetail;