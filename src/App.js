
import NavBar from './NavBar';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Sessions from './pages/sessions/Sessions';
import AccountDetail from './pages/account_detail/AccountDetail';
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SessionDetail from './pages/session_detail/SessionDetail';
import Accounts from './pages/accounts/Accounts';
import { ethers } from "ethers";
import CreateNewSession from './pages/create_new_session/CreateNewSession';
import SessionsList from "./pages/SessionsList/SessionsList";
import { sessionsCtx, SessionContext} from "./context/SessionContext";
import { useContext } from "react";
function App() {
  const [accounts, setAccounts] = useState("");

  const requestAccounts = async () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts;
    }
  }
  useEffect(() => {
    requestAccounts().then((accounts) => {
      setAccounts(accounts);
    });
  }, [])



  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <NavBar accounts={accounts} setAccounts={setAccounts} />
        </nav>
        <Routes>
            <Route path='/' element={<Navigate to={"/sessions"}/>}/>
            <Route path='/register' element={<Register accounts={accounts} setAccounts={setAccounts} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sessions/:address' element={<SessionDetail accounts={accounts} setAccounts={setAccounts} />} />
            <Route path='/sessions' element={<Sessions accounts={accounts} setAccounts={setAccounts} />} />
            <Route path='/accounts/:address' element={<AccountDetail accounts={accounts} setAccounts={setAccounts} />} />
            <Route path='/accounts' element={<Accounts accounts={accounts} setAccounts={setAccounts} />} />
            <Route path='/create-session' element={<CreateNewSession accounts={accounts} setAccounts={setAccounts} />} />
            <Route path='/sessionsList' element={<SessionsList accounts={accounts} setAccounts={setAccounts} />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
