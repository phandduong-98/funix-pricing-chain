import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadContractWithProvider, loadContractWithSigner, toStringState } from "../../helper";
import styles from "./SessionDetail.module.css"
import { ethers } from "ethers";
import { isAdmin as checkAdmin } from "../../helper";
import Carousel from "../../components/carousel/Carousel";

const SessionDetail = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts);

    const [sessionDetail, setSessionDetail] = useState({});
    const [proposePriceInput, setProposedPriceInput] = useState("");
    const [proposePrice, setProposedPrice] = useState("");
    const [finalPrice, setFinalPrice] = useState("");
    const [state, setState] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const { address } = useParams();


    const getSessionDetail = async () => {
        let contract = await loadContractWithProvider(address)
        let _sessionDetail = await contract.getSessionDetail();
        console.log("_sessionDetail", _sessionDetail);
        setSessionDetail(_sessionDetail);
        console.log(accounts[0])
        let _state = _sessionDetail.state;
        setState(_state);
        setFinalPrice(ethers.utils.formatEther(_sessionDetail.finalPrice));
        let participantProposedPrice = await contract.getParticipantProposedPrice(accounts[0]);
        console.log(`participant: ${accounts[0]} proposed price: ${participantProposedPrice.toString()}`);
    }

    const getProposedPrice = async () => {
        let contract = await loadContractWithProvider(address)
        let participantProposedPrice = await contract.getParticipantProposedPrice(accounts[0]);
        setProposedPrice(ethers.utils.formatEther(participantProposedPrice));
        setProposedPriceInput(ethers.utils.formatEther(participantProposedPrice))
        console.log(`participant: ${accounts[0]} proposed price: ${participantProposedPrice.toString()}`);
    }

    const getFinalPrice = async () => {
        let contract = await loadContractWithProvider(address)
        let _finalPrice = await contract.getFinalPrice();
        setFinalPrice(ethers.utils.formatEther(_finalPrice));
        console.log("final price", ethers.utils.formatEther(_finalPrice));
    }

    const getIsAdmin = async () => {
        return await checkAdmin();
    }

    useEffect(() => {
        console.log("session address: ", address);
        if (!accounts) return;
        getSessionDetail();
        getProposedPrice();
        getFinalPrice();
        getIsAdmin().then((_isAdmin) => setIsAdmin(_isAdmin));
    }, [accounts])

    const handleSubmit = async () => {
        let contract = await loadContractWithSigner(address);
        try {
            console.log("proposePriceInput", proposePriceInput);
            let tx = await contract.propose(ethers.utils.parseEther(proposePriceInput.toString()), { from: accounts[0] });
            tx.wait().then(() => {
                getProposedPrice();
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleCloseSession = async () => {
        let contract = await loadContractWithSigner(address);
        try {
            if (isAdmin) {
                let tx = await contract.closeSession({ from: accounts[0] });
                tx.wait().then(async () => {
                    let _state = await contract.state()
                    console.log(_state);
                    setState(_state);
                })
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleFinalPrice = async () => {
        let contract = await loadContractWithSigner(address);
        try {
            if (isAdmin) {
                let tx = await contract.afterClosingSession(ethers.utils.parseEther(proposePriceInput.toString()), { from: accounts[0] });
                tx.wait().then(async () => {
                    getSessionDetail();
                    // getFinalPrice();
                })
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <div className="session-detail row">
            <div className="container col s6 offset-s1" style={{ marginTop: "50px", border: "1px solid gray", borderRadius: "5px", paddingTop: "20px", boxShadow: "#f95997 0px 0px 1px" }}>
                <article>
                    <div className="row valign-wrapper" style={{ paddingRight: "20px", paddingLeft: "20px" }}>
                        <div className="col s2">
                            <img src="https://ipfs.infura.io/ipfs/QmdzpEH65BAnv9zHXSAVJKVWPteMTQ4mmPTh4ebALPSwCA" alt="" className="circle responsive-img" />
                        </div>
                        <div className="col s10" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: "bold", fontSize: "22px" }}>{sessionDetail.productName}</span>
                            <span className={styles.session_header_state}>
                                {toStringState(state)}
                            </span>
                        </div>

                    </div>
                    <div className="row">
                        <p className="col s10 offset-s2">{sessionDetail.productDescription}</p>

                    </div>
                </article>

            </div>
            {
                isConnected
                &&
                <div className="container col s4">
                    <div className="propose container " style={{ border: "1px solid gray", borderRadius: "5px", padding: "20px", width: "30vw", marginTop: "50px", boxShadow: "#f95997 0px 0px 1px" }}>
                        {isAdmin ?
                            (
                                <div>

                                    {state == "0" && <button className="btn pink lighten-5" style={{ color: "#f95997" }} disabled={proposePriceInput < 0} onClick={handleCloseSession}>Close</button>}
                                    {state == "1" &&
                                        <div>
                                            <div className="input-field">
                                                <input
                                                    id="propose_price"
                                                    type="number"
                                                    className="validate"
                                                    value={proposePriceInput}
                                                    onChange={(e) => setProposedPriceInput(e.target.value)}
                                                />
                                                <label className="active" for="propose_price">Price</label>
                                            </div>
                                            <button className="btn pink lighten-5" style={{ color: "#f95997" }} disabled={proposePriceInput < 0} onClick={handleFinalPrice}>Set final price</button>
                                        </div>
                                    }
                                    {state == "2" && <button className="btn pink lighten-5" style={{ color: "#f95997" }} disabled>Session has closed</button>}
                                </div>
                            )
                            :
                            (<div className="input-field">
                                <input
                                    id="propose_price"
                                    type="number"
                                    className="validate"
                                    value={proposePriceInput}
                                    onChange={(e) => setProposedPriceInput(e.target.value)}
                                />
                                <label className="active" for="propose_price">Price</label>
                                {state == "0" && <button className="btn pink lighten-5" style={{ color: "#f95997" }} disabled={proposePriceInput < 0} onClick={handleSubmit}>Propose</button>}
                            </div>
                            )
                        }

                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Status</td>
                                        <td style={{ color: "#f95192" }}>{toStringState(state)}</td>

                                    </tr>
                                    <tr>
                                        <td >Your proposed price</td>
                                        <td style={{ color: "#f95192" }}>{proposePrice}</td>

                                    </tr>
                                    <tr>
                                        <td>Final price</td>
                                        <td>{finalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            <div>
                <Carousel images={sessionDetail.productImages} />
            </div>
        </div>
    );
}

export default SessionDetail;