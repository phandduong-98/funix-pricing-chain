import { useState } from 'react';
import { loadContract } from '../../helper';
import { MAIN_CONTRACT_ADDRESS } from '../../constants';
const Register = ({accounts, setAccounts}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [participants, setParticipants] = useState([]);

    const isConnected = Boolean(accounts[0]);


    const handleSubmit = async () => {
            let contract = await loadContract(MAIN_CONTRACT_ADDRESS);
            try {
                await contract.register(name, email, {from: accounts[0]}); 
            } catch (error) {
              console.log("Error: ", error);
            }
    }

    const getParticipants = async () =>{
            let contract = await loadContract(MAIN_CONTRACT_ADDRESS);
            try {
                let _participants = await contract.getParticipants(); 
                setParticipants(_participants);
                console.log(_participants);
            } catch (error) {
              console.log("Error: ", error);
            }
        
    }

    return(
        <div className='register container' style={{border: "1px solid gray", borderRadius:"30px", padding:"20px", width:"30vw", marginTop:"50px", boxShadow: "#f95997 0px 0px 5px"}}>
            <h4 style = {{color: "#f95997", justifyContent: "center", display: "flex"}}>Register</h4>
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
                    type="text" 
                    class="validate"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label for="email">Email</label>
            </div>
            <div style = {{ justifyContent: "center", display: "flex"}}>
                <button className='btn' onClick={handleSubmit}>Register</button>
            </div>
            
            {/* <button className='btn' onClick={getParticipants}>Get participants</button> */}
            
        </div>
    );
}

export default Register;