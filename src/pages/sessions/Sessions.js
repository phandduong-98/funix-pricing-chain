import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadContractWithProvider, toStringState, checkIsRegistered } from "../../helper";
import styles from "./Sessions.module.css"
import { MAIN_CONTRACT_ADDRESS } from "../../constants";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

const Sessions = ({ accounts }) => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {

        if(accounts){
            checkIsRegistered().then((result) => {
                if (!result) {
                    console.log("chua dang ky ban eiiiiiiii");
                    M.toast({ html: 'Need to register. Redirect to Register ...', classes: 'rounded'})
                    setTimeout(()=>navigate("/register", { state: { from: "sessions" } }), 4000);
                }
            })
        }
        
        const getSessions = async () => {
            let contract = await loadContractWithProvider(MAIN_CONTRACT_ADDRESS);
            try {
                let _sessions = await contract.getSessions();
                setSessions(_sessions);
                console.log(_sessions);
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        getSessions();

    }, [accounts])



    return (
        <div className="session-list row">
            {accounts ? (sessions.map(session => (
                <div className="session-preview container col s4" style={{ marginTop: "50px", padding: "40px" }} key={session.sessionAddress} >
                    <div style={{ height: "50vh", overflow: "hidden", border: "1px solid gray", borderRadius: "30px", padding: "40px", boxShadow: "#f95997 0px 0px 5px" }}>
                        <div className={`${styles.session_header}`}>
                            <div className={`${styles.session_icon}`}>
                                <img src={`https://ipfs.infura.io/ipfs/${session.productImages[0]}`} alt="" style={{ borderRadius: "50%", width: "48px", height: "48px", filter: "grayscale(0)" }} />
                            </div>
                            <div className={`${styles.session_header_state}`}>
                                {toStringState(session.state)}
                            </div>
                        </div>
                        <Link to={`/sessions/${session.sessionAddress}`}>
                            <p className={`${styles.session_name}`}>{session.productName}</p>
                            <p className={`${styles.session_description}`}>{session.productDescription}</p>
                        </Link>
                    </div>
                </div>
            ))):(<div className="container" style={{textAlign:"center",marginTop:"50px",overflow: "hidden", border: "1px solid gray", borderRadius: "30px", padding: "40px", boxShadow: "#f95997 0px 0px 5px" }}><h1 className="pink-text accent-1">Please connect wallet</h1></div>)}
        </div>
    );
}

export default Sessions;