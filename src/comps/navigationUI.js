import '../css/nav_bottom.css'
import { Link } from 'react-router-dom';
import { faHouseUser, faShop, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const makeButtonActive = (next) => {
    let nextbtn = document.getElementById(`nav-btn-${next}`)
    nextbtn.style.border = '1px solid red'
    let btns = ["dashboard", "eventexplore", "market", "profile"]
    btns.splice(btns.indexOf(next), 1)
    btns.forEach(item=>{
        let element = document.getElementById(`nav-btn-${item}`)
        element.style.border = 'none';
    })

}   



const NavigationUI = (props) => {
    return (
        <div className="nav-bottom">
            <Link to={"/dashboard"}>
                <div className="nav-btn" id='nav-btn-dashboard'>
                    <FontAwesomeIcon className="nav-icon" icon={faHouseUser} />
                </div>
            </Link>
            
            <Link to={"/event/explore"}>
                <div className="nav-btn" id='nav-btn-eventexplore'>
                    <FontAwesomeIcon className="nav-icon" icon={faTrophy} />
                </div>
            </Link>
            <Link to={"/market"}>
                <div className="nav-btn" id='nav-btn-market'>
                    <FontAwesomeIcon className="nav-icon" icon={faShop} />
                </div>
            </Link>
            <Link to={"/profile"}>
                <div className="nav-btn" id='nav-btn-profile'>
                    <FontAwesomeIcon className="nav-icon" icon={faUser  } />
                </div>
            </Link>
            
        </div>
    )
}

export {makeButtonActive,  NavigationUI};