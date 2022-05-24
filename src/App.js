import NavBar from './NavBar';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Sessions from './pages/sessions/Sessions';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import SessionDetail from './pages/SessionDetail/SessionDetail';
import{ethers} from "ethers";

function App() {

  const [accounts, setAccounts] = useState("");

  const requestAccounts = async () =>{
    if (typeof window.ethereum !== 'undefined') {
      window. ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts;
    }
  }
  useEffect(()=>{
    requestAccounts().then((accounts)=> {
      setAccounts(accounts);
    });
  }, [])
  


  return (
    <div className="App">
        <BrowserRouter>
          <nav>
            <NavBar accounts={accounts} setAccounts = {setAccounts} />
          </nav>
          <Routes>
            <Route path ='/register' element = { <Register accounts={accounts} setAccounts = {setAccounts} /> } />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/sessions/:address' element = { <SessionDetail accounts={accounts} setAccounts = {setAccounts}/> } />
            <Route path = '/sessions' element = { <Sessions accounts={accounts} setAccounts = {setAccounts}/> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
