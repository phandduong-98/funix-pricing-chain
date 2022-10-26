import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadContractWithSigner, isAdmin as checkAdmin, toStringState } from "../../helper";
import styles from "./SessionsList.module.css"
import { MAIN_CONTRACT_ADDRESS } from "../../constants";
import { ethers } from "ethers";
const SessionsList = ({ accounts, setAccounts }) => {
    let navigate = useNavigate();
    let isConnected = Boolean(accounts);
    const [accountList, setAccountList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [sessionList, setSessionList] = useState([]);
    const getSessions = async () => {
        let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
        try {
            let _accountList = await contract.getParticipants();
            setAccountList(_accountList);
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    const getSessionsList = async () => {
        let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
        try {
            let _sessionList = await contract.getSessions();
            setSessionList(_sessionList);
            console.log(_sessionList);
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    const getIsAdmin = async () => {
        let _isAdmin = await checkAdmin();
        return _isAdmin;
    }
    useEffect(() => {
        getIsAdmin().then((_isAdmin)=> {
            setIsAdmin(_isAdmin);
            if(!_isAdmin) {
                navigate(`/sessions`);
            }
            getSessionsList()
        });
        // console.log()
    }, [accounts])

    return (
        <div>
            {
                isAdmin
                &&
                (<div className="account-list container">
                    <table className="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Product Name</th>
                                <th>State</th>
                                <th>Calculated Proposed Price</th>
                                <th>Final Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sessionList?.map(session => (
                                    <tr key={session.sessionAddress}>
                                        <td>{session.sessionAddress}</td>
                                        <td>{session.productName}</td>
                                        <td>{toStringState(session.state)}</td>
                                        <td>{ethers.utils.formatUnits(session.proposedPrice, "ether")}</td>
                                        <td>{ethers.utils.formatUnits(session.finalPrice, "ether")}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>)
            }
        </div>
    );
}
export default SessionsList;