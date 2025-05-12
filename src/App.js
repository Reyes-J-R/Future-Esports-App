import logo from './logo.svg';
import './App.css';
import Header from './comps/header';
import Footer from './comps/footer';
import Home from './comps/home';
import Signup from './comps/signup';
import Login from './comps/login';
import {Routes, Route} from 'react-router-dom';
import { PrivateComp, GuestComp } from './utils/PrivateRoute'
import DashBoard from './comps/dashboard';
import AuthProvider  from './context/AuthProvider';
import { Event } from './comps/event';
import { Popup } from './comps/popup';
import EventExplore from './comps/eventExplore';
import Profile from './comps/profile';
import Market from './comps/market';

function Maintanance() {
  return (
    <div className="maintanance-screen">
    <h1 className='maintanance-title'>This site is under construction</h1>
    <p className='maintanance-description'>This site is courtesy of Future eSports</p>
    <div className='img-holder '>
      <img className="fesports-logo" src="./media/logo.png" />
      <img className="fesports-credits" src="./media/credit.png" />
    </div>
    <a href="https://wa.me/7510591162" className='dev-contact'>Contact Dev</a>
</div>
  )
}

function App() {
  return(
    
    <AuthProvider>
    <Popup />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<GuestComp Component={Signup}/>} />
        <Route path="/login" element={<GuestComp Component={Login}/>} />
        <Route path="/dashboard" element={<PrivateComp Component={DashBoard}/>} />
        <Route path="/event/:eventid" element={<Event />}/>
        <Route path="/event/explore" element={<PrivateComp Component={EventExplore}/>}/>
        <Route path="/profile" element={<PrivateComp Component={Profile} />} />
        <Route path="/market" element={<PrivateComp Component={Market} />} />
    </Routes>
    </AuthProvider>
    
  )
}

export default App;