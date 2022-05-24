const NavBar = ({accounts, setAccounts}) => {

    const isConnected = Boolean(accounts);

    const connectAccount = async () =>{
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts)
        }
    }

    return (

        <div>
            {/* {accounts && accounts} */}
            
            <nav>
            <div className="nav-wrapper">
            <ul class="right hide-on-med-and-down">
                {isConnected ? 
                (<li><a className="waves-effect waves-light btn" >{`${accounts[0].substring(0, 4)}...${accounts[0].substring(accounts[0].length-4)}`}</a></li>) : 
                (<li><a className="waves-effect waves-light btn" onClick={connectAccount}>Connect</a></li> )  }
            </ul>
            </div>
        </nav>
        </div>
    );
}
 
export default NavBar;