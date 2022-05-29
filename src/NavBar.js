import M from "materialize-css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({accounts, setAccounts}) => {

    const isConnected = Boolean(accounts);

    const connectAccount = async () => {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts)
        }
    }

    const handleAccountsChanged = (accounts) => {
        console.log("disconnected");
        setAccounts(null);
    }

    useEffect(()=>{
        var elems = document.querySelectorAll('.dropdown-trigger');
        const options = {
            inDuration: 150,
            hover: true,
            onCycleTo: () => {
                console.log("New Slide");
            }
        }
        var instances = M.Dropdown.init(elems, options);
    },[accounts])

    useEffect(()=>{
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        };
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
    },[]);

    return (

        <div>
            {/* {accounts && accounts} */}
            
            <nav>
            <div className="nav-wrapper">
            <ul class="left hide-on-med-and-down">
                <li > <Link to={'/home'}>Home</Link></li>
                <li > <Link to={'/sessions'}>Session</Link></li>
                <li > <Link to={'/sessions'}>About</Link></li>
            </ul>
            <ul class="right hide-on-med-and-down">
                {isConnected ? 
                (<li><a className="dropdown-trigger btn waves-effect waves-light" data-target='dropdown1'>{`${accounts[0].substring(0, 4)}...${accounts[0].substring(accounts[0].length-4)}`}</a></li>) : 
                (<li><a className="waves-effect waves-light btn" onClick={connectAccount}>Connect</a></li> )  }
            </ul>
            <ul id='dropdown1' class='dropdown-content'>
                <li > <Link to={'/account'}>Account</Link></li>
                <li><a onClick={handleAccountsChanged}>Disconnect</a></li>  
            </ul>
            </div>
        </nav>
        </div>
    );
}
 
export default NavBar;