import { isAdmin as checkAdmin } from "./helper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadContractWithProvider, loadContractWithSigner } from './helper';
import M from "materialize-css";

const NavBar = ({accounts, setAccounts}) => {
    let navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(false);
    let isConnected = Boolean(accounts);
    
    const connectAccount = async () => {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts)
        }
    }

    const handleAccountsChanged = async (accounts) => {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
        setAccounts(accounts)
        }
    }

    const handleDisconnect = () => { 
        setAccounts(null)
        isConnected = false;
        // navigate('/sessions')
    }

    const getIsAdmin = async () =>{
        return await checkAdmin();
    }

    const handleCreateNewSession = async () =>{
        navigate("./create-session")
    }

    useEffect(()=>{
        var elems = document.querySelectorAll('.dropdown-trigger');
        const options = {
            inDuration: 150,
            hover: true
        }
        var instances = M.Dropdown.init(elems, options);
        getIsAdmin().then((_isAdmin) => setIsAdmin(_isAdmin));
    },[accounts])



    useEffect(()=>{
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', handleDisconnect);
        };
        return () => {
            window.ethereum.removeListener('accountsChanged', handleDisconnect);
        }
    },[]);

    return (
        <div>            
            <nav>
            <div className="nav-wrapper">
            <ul class="left hide-on-med-and-down">
                <li > <Link to={'/sessions'}>Sessions</Link></li>
                {isAdmin && <li > <Link to={'/accounts'}>Accounts</Link></li>}
                {/* <li > <Link to={'/about'}>About</Link></li> */}
            </ul>
            <ul class="right hide-on-med-and-down">
                {isAdmin && <li><a className="waves-effect waves-light btn" onClick={handleCreateNewSession}>Create New Session</a></li>}
                {isConnected ? 
                (<li><a className="dropdown-trigger btn waves-effect waves-light" data-target='dropdown1'>{`${accounts[0].substring(0, 4)}...${accounts[0].substring(accounts[0].length-4)}`}</a></li>) : 
                (<li><a className="waves-effect waves-light btn" onClick={connectAccount}>Connect</a></li> )  }
            </ul>
            <ul id='dropdown1' class='dropdown-content'>
                {isConnected && <li > <Link to={`/accounts/${accounts[0]}`}>Account</Link></li>}
                {isConnected &&<li><a onClick={handleDisconnect}>Disconnect</a></li>}
            </ul>
            </div>
        </nav>
        </div>
    );
}
 
export default NavBar;