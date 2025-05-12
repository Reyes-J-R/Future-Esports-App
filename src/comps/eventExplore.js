import TopUserBar from "./topUserBar";
import AuthContext from "../context/AuthContext";
import { useEffect, useContext, useState } from "react";
import {NavigationUI, makeButtonActive} from "./navigationUI";
import '../css/eventexplore.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Credit from "./credit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config'
import LoadingScreen from "./loading";

const EventExplore = () => {
    const [events, setEvents] = useState(null)
    const [games, setGames] = useState(null)
    const [allevents, setAllEvents] = useState(null)
    let {user, logout, login, isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        const getEvents = () => {
            axios.post(`${API_BASE_URL}/events/`, {
                
            }).then(
                (res) => {
                    setEvents(res.data.event)
                    setAllEvents(res.data.event)
                }
            ).catch(
                (err)=> {
                    console.log(err)
                }
            )
        }
        const getGames = () => {
            axios.post(`${API_BASE_URL}/games/`).then(
                (res) => {
                    setGames(res.data.games)
                    console.log(res.data.games)
                }
            ).catch(
                ()=>console.log("network error")
            )
        }

        getEvents()
        getGames()
    }, [])
    // [user, games, events].includes(null)
    if ([user, games, events].includes(null)){
        return <LoadingScreen />
    }

    const searchEvent = (e) => {
        let kword = e.target.value.toLowerCase()
        console.log(kword)
        let searched = []
        if (kword.length < 1){
            setEvents(allevents)
            return  
        }
        console.log(events)
        allevents.forEach(event => {
            // console.log(event.title)
            console.log(event.title.toLowerCase())  
            if (event.title.toLowerCase().includes(kword)){
                searched.push(event)
                console.log(event.title)
            }
            
        });
        
        setEvents(searched)
    }

    const showEventOfGame = (game) => {
        if (game === "all"){
            setEvents(allevents)
            return
        }
        let gameevents = []
        allevents.forEach(event => {
            if (event.eventgame.id === game){
                gameevents.push(event)
            }
        })
        setEvents(gameevents)
    }


   

    return (
        <>
        <TopUserBar user={user} />
        <div className="eventexplore-page">
            <main>
                
                <section className="event-search">
                    <div className="searchbar-container">
                        <input type="text" className="event-searchbar" onInput={(e)=>searchEvent(e)}></input>
                        <FontAwesomeIcon icon={faSearch} className="searchicon"/>
                    </div>
                    <div className="search-filter-container">
                    <button className="btn-default filter-btn" onClick={() => {showEventOfGame("all")}}>All</button>
                        {games.map(game => {
                            return (<button className="btn-default filter-btn" onClick={() => {showEventOfGame(game.id)}}>{game.name}</button>)
                        })}
                    </div>
                    </section>
                <section className="event-showcase">
                    {events.length > 0 ? events.map((event) => {
                        return (
                            <div className="event-tile-rect event-tile-" onClick={()=>navigate(`/event/${event.id}`)}>
                                <div className="eventimg-holder" style={{
                                    background: `url(${API_BASE_URL}${event.img}) center/cover no-repeat`,
                                }}>
                                </div>
                                <div className="event-info-holder">
                                    <h2 className="event-title">{event.title}</h2>
                                    <div>
                                        <div className="event-prop">{event.eventgame['name']}</div>
                                        <div className={`event-prop event-state-${event.event_state}`}>{event.event_state}</div>
                                    </div>
                                </div>
                                <div className="event-reward-container">
                                <p className="event-playercount">{event.eventplayers.length}/{event.max_players}</p> 
                                {event.reward_type === "money" ?  <p className="event-rewards" style={{color: 'gold'}}>{`₹${event.winner_reward}`}</p> : <Credit className="tile-credit" value={`${event.winner_reward}`} size={"6vw"}/>}
                                </div>
                                
                                
                            </div>
                        
                            
                        )
                    }): <h1>No events found</h1>}
                    
                        
                    
                </section>
                
            </main>
        </div>
        <NavigationUI current={"eventexplore"}/>
        </>
    )
}

export default EventExplore;