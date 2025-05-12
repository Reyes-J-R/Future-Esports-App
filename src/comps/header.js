import '../App.css';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  let {user, isLoggedIn} = useContext(AuthContext);
    return (
        <header>
        <nav>
          <img className="nav-logo" src="/media/logo.png" />
          <div className='nav-right'>
            {/* <li className='nav-li'>
              <a href="https://chat.whatsapp.com/BGwYDZjdCMQ36SW3AaHyVm">Join Now</a>
            </li> */}
            {!isLoggedIn ? 
              <Link to="/signup">Sign Up</Link>
            : <Link to="/dashboard">DashBoard</Link>}
            
            
          </div>
        </nav>
      </header>
    )
}

export default Header;