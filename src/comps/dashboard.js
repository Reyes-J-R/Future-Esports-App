import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import '../css/dashboard.css';
import bgmi from '../media/bgmi.jpeg'
import Footer from "./footer";
import '../css/main.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {NavigationUI, makeButtonActive} from "./navigationUI";
import TopUserBar from "./topUserBar";
import API_BASE_URL from "../config";
import LoadingScreen from "./loading";
import ErrorScreen from "./errorScreen";


const EventTile = (props) => {
    console.log(props)
    const tileStyle = {
        backgroundImage: `url(${API_BASE_URL}${props.imgurl})`
    }
    return (
        <div className="event-tile" style={tileStyle}>
                        <h2 className="event-heading">{props.title}</h2>
                        <button className="btn-continue"><Link to={"/event/" + props.id}>{props.joined ? "Continue" : "Join" }</Link></button>
                    </div>
    )
}


const DashBoard = (props) => {
    const [events, setEvents] = useState(null)
    const [error, setError] = useState(false)

    useEffect(()=>{
        const getEvents = () => {
            axios.post(`${API_BASE_URL}/events/`).then(
                (res) => {
                    console.log(res.data.event)
                    setEvents(res.data.event)
                }
            ).catch(
                (err) => {
                    setError("Error Occured")
                }
            )
        }
        getEvents()
    }, [])
    
    let user = props.user
    console.log(user)

    if (error){
        return <ErrorScreen />
    }

    if ([user, events].includes(null)){
        console.log("hehe")
        return <LoadingScreen />
    }

    

    let joined_active_events = []

    events.forEach(event=>{
        console.log(event)
        if (user.joined_events.includes(event.id)){
            joined_active_events.push(event)
        }
    })

    return (
        <>
        <TopUserBar user={user}/>
        <div className="dashboard-page">
        
            <main className="dashboard-main">
                {/* <div className="dashboard-top">
                    <h1 className="dashboard-top-name">{user.username}</h1>
                    <div className="credit-container">
                        <img src={creditImg} />
                        <p className="credit-value">250</p>
                    </div>
                </div> */}
                    <h2 className="side-heading">Joined Events</h2>
                
                <div className="events-tile-holder">
                    {joined_active_events.length > 0 ? joined_active_events.map((event, index) => {
                        // console.log(`${user.joined_events.includes(event.id)}`)
                        // console.log(user.joined_events)
                        // if (user.joined_events.includes(event.id) && event.event_state === "active"){
                            return (
                                <EventTile joined={true} id={event.id} title={event.title} imgurl={event.img} game={event.eventgame} host={event.eventhost}/>
                            )
                        // }
                        
                        
                    }): <h2 className='no-event-info'>No Events Found, <Link to="/event/explore" style={{color: 'cyan'}}>Find Some</Link></h2>}
                    

                    
                    
                </div>
                
                {/* <div className="side-heading">
                    <h2>Suggested Events</h2>

                </div>
                <div className="events-tile-holder">
                    {events.map((event, index) => {
                        return (
                            <EventTile id={event.id} title={event.title} imgurl={event.img} game={event.eventgame} host={event.eventhost}/>
                        )
                        
                    })}
                    <div className="tile-end">
                        <p>More { <FontAwesomeIcon icon={ faArrowRight }/>} </p>
                    </div>
                </div> */}
                
            </main>
            
            
            
        </div>
        <NavigationUI current={"dashboard"}/>
        </>
    )
}

export default DashBoard;