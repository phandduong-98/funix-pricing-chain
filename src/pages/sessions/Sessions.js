import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadContract, isAdmin, toStringState } from "../../helper";
import styles from "./Sessions.module.css"
import { MAIN_CONTRACT_ADDRESS } from "../../constants";
const Sessions = ({accounts, setAccounts}) => {

    const [sessions, setSessions] = useState([]);

    useEffect( () => {
        const getSessions = async () =>{
            let contract = await loadContract(MAIN_CONTRACT_ADDRESS);
            try {
                let _sessions = await contract.getSessions(); 
                setSessions(_sessions);
                console.log(_sessions);
            } catch (error) {
              console.log("Error: ", error);
            }
        }
        getSessions();
        // isAdmin();
    }, [])



    return (  
        <div className="session-list row">
            {sessions.map(session => (
                <div className="session-preview container col s4" style={{marginTop:"50px", padding:"40px"}} key={session.sessionAddress} >
                    <div style={{height: "50vh", overflow:"hidden", border: "1px solid gray", borderRadius:"30px", padding:"40px", boxShadow: "#f95997 0px 0px 5px"}}>
                        <div className={`${styles.session_header}`}>
                            <div className={`${styles.session_icon}`}>
                                <img src="https://ipfs.infura.io/ipfs/QmZY5CJLNAgVVGHbFa4VTfWpCLEd7QqNiR9eGK3etD78Vo" style={{borderRadius: "50%", width: "48px", height : "48px", filter: "grayscale(0)"}}/>
                            </div>
                            <div className={`${styles.session_header_state}`}>
                                {toStringState(session.state)}
                            </div>
                        </div>
                        <Link to={`/sessions/${session.sessionAddress}`}>
                            <p className={`${styles.session_name}`}>{ session.productName }</p>
                            <p className={`${styles.session_description}`}>{ session.productDescription }</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default Sessions;