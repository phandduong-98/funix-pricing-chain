import { loadContractWithProvider, loadContractWithSigner, toStringState } from "../../helper";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MAIN_CONTRACT_ADDRESS } from "../../constants";
import { Divider } from "react-materialize";
const AccountDetail = ({ accounts, setAccounts }) => {
    let isConnected = Boolean(accounts);
    let navigate = useNavigate();
    const { address } = useParams();
    const [participantDetail, setParticipantDetail] = useState({});
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditable, setIsEditable] = useState("");
    const [isChangeInformation, setIsChangeInformation] = useState(false)

    const getParticipantDetail = async () => {
        let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS)
        let _participantDetail = await contract.getParticipant();
        // _participantDetail = [..._participantDetail[0]]
        _participantDetail = {
            account: _participantDetail.account,
            fullName: _participantDetail.fullName,
            email: _participantDetail.email,
            numberOfJoinedSession: _participantDetail.numberOfJoinedSession.toString(),
            deviation: ethers.utils.formatEther(_participantDetail.deviation)
        }
        console.log("_participantDetail",_participantDetail);
        setFullName(_participantDetail.fullName)
        setEmail(_participantDetail.email)
        console.log(_participantDetail);
        setParticipantDetail(_participantDetail);
    }

    const handleAccountsChanged = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts)
            navigate(`/accounts/${accounts[0]}`);
            getParticipantDetail();
        }
    }

    const handleChangeInformation = () => {
        setIsEditable(true);
        setIsChangeInformation(true);
    }

    const handleSubmit = async () =>{
        let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
        try {
            let tx = await contract.updateParticipantDetail(fullName, email, {from: accounts[0]}); 
            tx.wait().then(()=>{
                getParticipantDetail();
                setIsChangeInformation(false);
                setIsEditable(false);
            })
        } catch (error) {
          console.log("Error: ", error);
        }
    }

    useEffect(() => {
        getParticipantDetail();
    }, [accounts])

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        };
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
    }, []);


    return (
        <div className="account-detail">
            {
                isConnected
                &&
                (
                    <div className="container" style={{ border: "1px solid gray", borderRadius: "30px", padding: "20px", width: "50vw", marginTop: "50px", boxShadow: "#f95997 0px 0px 5px" }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Address</td>
                                    <td>{participantDetail.account}</td>
                                </tr>
                                <tr>
                                    <td>Fullname</td>
                                    {
                                        isEditable
                                            ?
                                            (<td className="input-field">
                                                    <input 
                                                        value={fullName} 
                                                        id="full-name" 
                                                        type="text" 
                                                        className="validate" 
                                                        onChange={(e) => setFullName(e.target.value)}
                                                    />
                                            </td>)
                                            :
                                            (<td>{participantDetail.fullName}</td>)
                                    }
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    {
                                        isEditable
                                            ?
                                            (<td className="input-field">
                                                    <input 
                                                        value={email} 
                                                        id="email" 
                                                        type="email" 
                                                        className="validate"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                            </td>)
                                            :
                                            (<td>{participantDetail.email}</td>)
                                    }
                                </tr>
                                <tr>
                                    <td>numberOfJoinedSession</td>
                                    <td>{participantDetail.numberOfJoinedSession}</td>
                                </tr>
                                <tr>
                                    <td>Deviation</td>
                                    <td>{participantDetail.deviation}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="section">
                            {!isChangeInformation && <button className="btn" onClick={handleChangeInformation}>Change information</button>}
                            {isChangeInformation && <button className="btn" onClick={handleSubmit}>Submit</button>}
                        </div>
                    </div>
                )
            }
        </div>

    );
}

export default AccountDetail;