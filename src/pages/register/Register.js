import { useEffect, useState } from 'react';
import { checkIsRegistered, loadContractWithSigner, validateRegister } from '../../helper';
import { MAIN_CONTRACT_ADDRESS } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import M from 'materialize-css';

const Register = ({ accounts, setAccounts }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [participants, setParticipants] = useState([]);

    const isConnected = Boolean(accounts && accounts[0]);
    const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(()=>{
    //     if(!accounts) return;
    // }, [accounts]);


    useEffect(() => {
        if (accounts) {
            checkIsRegistered().then((result) => {
                if (result) {
                    M.toast({html: 'This address has registered. Redirect to account ...', classes: 'rounded'})
                    setTimeout(() => navigate(`/accounts/${accounts[0]}`, { state: { from: "sessions" } }), 4000);
                }
            })
        }
    })

    const handleSubmit = async () => {
        let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
        try {
            if (!validateRegister(name, email)) return;
            let tx = await contract.register(name, email, { from: accounts[0] });
            tx.wait().then((result) => {
                if (result) {
                    navigate("/sessions");
                }
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }




    return (

        <div className='register'>
            {/* <h6>{location.state?.from}</h6> */}

            <div className='register container' style={{ border: "1px solid gray", borderRadius: "30px", padding: "20px", width: "30vw", marginTop: "50px", boxShadow: "#f95997 0px 0px 5px" }}>
                <h4 style={{ color: "#f95997", justifyContent: "center", display: "flex", paddingBottom: "30px" }}>Register</h4>
                <div class="input-field">
                    <input
                        id="full_name"
                        type="text"
                        class="validate"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label for="full_name">Full Name</label>
                </div>

                <div class="input-field">
                    <input
                        id="email"
                        type="email"
                        class="validate"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="email">Email</label>
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                    <button className='btn' onClick={handleSubmit}>Register</button>
                </div>

                {/* <button className='btn' onClick={getParticipants}>Get participants</button> */}

            </div>
        </div>
    );
}

export default Register;