import { useState } from "react"
import TopUserBar from "./topUserBar"
import {NavigationUI, makeButtonActive} from "./navigationUI";
import '../css/profile.css'
import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGamepad, faIndianRupee, faMedal, faRankingStar, faTrophy, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import axios from "axios"
import Credit from "./credit"
import API_BASE_URL from '../config'
import LoadingScreen from "./loading"
const Profile = () => {
    const [stats, setStats] = useState(null)
    let {user, logout} = useContext(AuthContext)
    console.log(user)
    useEffect(()=>{
        const getStats = () => {
            if (!user) {
                return <LoadingScreen />
            }
            axios.post(`${API_BASE_URL}/playerstats/`,
            {
                "user": user.id
            }).then(
                (res) => {
                    setStats(res.data)
                    console.log(res.data)
                }
            )
        }
        getStats()
    }, [user])
    console.log(stats)
    if ([user, stats].includes(null)) {
        console.log("here")
        return (
            <LoadingScreen />
        )
    }
    // console.log(stats)

    return (
        <>
        <TopUserBar/>
        <div className="profile-page">
            
            <main>
            
            <div className="profile-container">
                <div className="user-header">
                <div className="user-pic">
                   <h1><FontAwesomeIcon icon={faUser} /></h1>
                </div>
                <div className="user-name">
                    <h1>{user.first_name} {user.last_name}</h1>
                    <p>{user.username}</p>
                </div>
                <div className="user-stats">
                    <div className="user-stat-cell">
                    <h3 style={{color: "#ef0"}}><FontAwesomeIcon icon={faTrophy}/></h3>
                        <p>Events Joined: {stats.events_joined}</p>
                    </div>
                    <div className="user-stat-cell">
                        <h3 style={{color: "#00ff00"}}><FontAwesomeIcon icon={faMedal}/></h3>
                        <p>Events Won: {stats.events_won}</p>
                    </div>
                    <div className="user-stat-cell">
                        <h3 style={{color: "rgb(255, 128, 0)"}}><FontAwesomeIcon icon={faGamepad}/></h3>
                        <p>Matches Played: {stats.matches_played}</p>
                    </div>
                    <div className="user-stat-cell">
                        <h3><FontAwesomeIcon icon={faRankingStar}/></h3>
                        <p>Matches Won: {stats.matches_won}</p>
                    </div>
                    <div className="user-stat-cell">
                        <h3><FontAwesomeIcon icon={faIndianRupee}/></h3>
                        <p>Cash Rewards: {stats.cash_earned}</p>
                    </div>
                    <div className="user-stat-cell">
                        <h3 className="credit-stat"><Credit size={"calc(4vw + 25px)"}/></h3>
                        <p>Credit Rewards: {stats.credits_earned}</p>
                    </div>
                </div>

                </div>
                <div className="account-toolbar">
                <button className='btn-logout' onClick={logout}>Log Out</button>
                </div>
                
            </div>

            </main>
            
            
        </div>
        <NavigationUI current={"profile"}/>
        </>
    )

}

export default Profile;



