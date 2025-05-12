import '../css/main.css'
import Header from './header'
import Footer from './footer'
import '../css/event.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faChessBishop, faL } from '@fortawesome/free-solid-svg-icons';
import creditIcon from '../media/credit.png'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Popup, ShowPopUp } from './popup'
import { LeagueTemplate, KnockoutTemplate } from './eventTemplate'
import { eventWrapper } from '@testing-library/user-event/dist/utils'
import {NavigationUI, makeButtonActive} from "./navigationUI";
import TopUserBar from './topUserBar'
import API_BASE_URL from '../config'

const getUnfinishedMatches = (matches) => {
    let unfinished = matches.filter((match)=>{
        return match.matchstate === "active"
    })
    console.log(unfinished)
    return unfinished
}

const getuname= (uid, players) => {
    
    for (let i in players){
        if (players[i].id === uid){
            console.log("yes")
            return players[i].username;
        }
    }
    }



const MatchResultComp = (props) => {
    let fields = props.game.fields.fields
    const [unfinished, setUnfinished] = useState(getUnfinishedMatches(props.matches))
    const submitResult = (event, match, p1, p2) => {
        let player1stats = {}
        let player2stats = {}
        let matchwinner = document.getElementById(`matchwinner-${match.id}`).value
        fields.forEach(field => {
            player1stats[field] = document.getElementById(`p1stats/${field}`).value
            player2stats[field] = document.getElementById(`p2stats/${field}`).value
        });
        console.log(player1stats, player2stats, matchwinner)
        axios.post(`${API_BASE_URL}/events/${props.event.id}/submitmatch/`, 
        {
            "match": match.id,
            "p1stats": player1stats,
            "p2stats": player2stats,
            "winner": matchwinner
        }).then(
            res => {
                setUnfinished(getUnfinishedMatches(res.data.matches))
                props.refresh((prevstate)=>!prevstate)
            }
        )

        };
        
    

    
    console.log(fields)
    return (
    <div className='match-result-win'>
        {unfinished.map((match) => {
            let player1 = getuname(match.player1, props.players)
            let player2 = getuname(match.player2, props.players)
            return (
            <div className='match-result-playerinfo'>
                <div className='match-result-playernames'>
                    <h2>{player1}</h2>
                    <p>x</p>
                    <h2>{player2}</h2>
                </div>
                <div className='match-result-playerstats'>
                    <div className='match-result-statfields'>
                        <div className='stats-p1 stats-p' name="p1stats">
                            {fields.map((field)=> {
                                return (
                                    <span><input id={`p1stats/${field}`} type="number" className='statfield' placeholder={field} name={field}/></span>
                            
                                )
                            })}
                        </div>
                        <div className='stats-p2 stats-p' name="p2stats">
                        {fields.map((field)=> {
                                return (
                                    <span><input id={`p2stats/${field}`} type="number" className='statfield' placeholder={field} name={field}/></span>
                            
                                )
                            })} 
                        </div>
                    </div>
                    <span className='winner-section'>
                        <h3 style={{marginRight: "10px"}}>Winner: </h3>
                        <select id={`matchwinner-${match.id}`} name='winnner'>
                        <option value={player1}>{player1}</option>
                        <option value={player2}>{player2}</option>
                        {props.event.event_type==="league" ? <option value={"draw"}>draw</option> :<></>}
                    </select>
                    <button className='match-result-submit btn-default' onClick={(event)=>submitResult(event, match, player1, player2)} >Submit</button>
                    </span>
                </div>
            </div>
            )
        })}

    </div>)
}

const UpcomingMatches = (props) => {
    const [showResultWin, setShowResultWin] = useState(false)
    console.log(showResultWin)
    
    
    return (
        <>
        {showResultWin ? <MatchResultComp matches={props.matches} players={props.players} game={props.game} event={props.event} refresh={props.refresh}/> : <></>}
        <h2 className='side-heading'>
            Upcoming Matches
        </h2>
        <div className='upcoming-matches-holder'>
            {props.matches.map((match, index) => {
                console.log(match)
                if (match.matchstate==="active"){
                    let player1 = getuname(match.player1, props.players)
                    let player2 = getuname(match.player2, props.players)
                    console.log(player1)
                return (
                    <div className='upcoming-match'>
                        <h2 className='ucm-player1'>{player1}</h2>
                        <h2>x</h2>
                        <h2 className='ucm-player2'>{player2}</h2>
                    </div>
                )
            }
            })}
            
            
            <div className='ucm-toolbar'>
                {props.user.is_staff ? <button className='btn-default result-submit-btn' onClick={()=>setShowResultWin(true)}>Submit Result</button> : <></> }
                <button className='btn-default match-history-btn'>Match History</button>
            </div>
        </div>
        

        
        

    </>
    )
}


const PlayerList = (props) => {

    const startEvent = () => {
        axios.post(`${API_BASE_URL}/events/${props.event.id}/start/`).then(
            res=>console.log(res)
        ).catch(err=>console.log(err))
    }

    const players = props.players
    return (
        <>
            <div className='template-head'>
                    <h2 className='template-heading'>Players Joined</h2>
                    <h2 className='player-count'>{props.players.length}/{props.event.max_players}</h2>
                </div>
            <div className='playerlist template-scroll'>
                
                {players.length > 0 ? players.map((player, index) => {
                    return (
                         <div className='playercell'>
                         <p className='playercell-name'>
                            {player.username}
                         </p>
                     </div>   
                        )}) : <h2>No Players Joined</h2>}
                
            </div>
            {(props.event.event_state != "pending") ? 
            <div className='template-foot'>
                {(props.event.max_players == props.event.eventplayers.length && props.user.is_staff) ? <button className='event-start-btn' onClick={startEvent}>Start</button> : <></>}
                {!(props.event.eventplayers.includes(props.user.id)) ? !(props.event.max_players === props.event.eventplayers.length) ? <button className='template-event-join-btn' onClick={props.join}>Join</button> : <p>Maximum Players Joined<br/>Match Starts Soon</p> : <button className='template-event-leave-btn' onClick={props.leave}>Leave</button>}
            </div>: <h2 style={{textAlign: 'center', color: 'yellow'}}>This is a Pending Event</h2>}
        </>
    )
}



const Event = () => {
    const {user, isLoggedIn} = useContext(AuthContext)
    const {eventid} = useParams()
    const [event, setEvent] = useState({})
    const [game, setGame] = useState({})
    const [players, setPlayers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [matches, setMatches] = useState([])
    console.log(user)
    useEffect(
        () => {
            const getEvent = () => {
                console.log("running")
                axios.post(
                    `${API_BASE_URL}/events/${eventid}/`
                        ).then(
                    (res) => {
                        console.log(res.data)
                        res.data.event.rules = res.data.event.rules.split("|")
                        setEvent(res.data.event)
                        setGame(res.data.game)
                        setPlayers(res.data.players)
                        setMatches(res.data.matches)
                        console.log(event)

                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )
            }
            getEvent()
        }, [refresh]
        
    )
    const event_type = {
        "knockout": <KnockoutTemplate event={event} players={players} matches={matches}/>,
        "league": <LeagueTemplate event={event} players={players} matches={matches} game={game}/>
    }

    const joinEvent = () => {
        
        axios.post(`${API_BASE_URL}/events/${event.id}/join/`,
        {
            "user": user,
        }).then(
            (res) => {
                
                if (res.status === 200){
                    let tempevent = event
                    let tempplayers = players
                    tempevent.eventplayers.push(user.id)
                    setEvent(event)
                    tempplayers.push(user.id)
                    setPlayers(tempplayers)
                    setRefresh((prevstate)=>!prevstate)
                    ShowPopUp(`Joined ${event.title}`)
                }
            }
        ).catch(
            (err) => {
                console.log("Error")
                
            }
        )
    }

    const leaveEvent = () => {
        axios.post(`${API_BASE_URL}/events/${event.id}/leave/`,
        {
            "user": user
        }).then(
            (res) => {
                if (res.status === 200) {
                    let tempPlayers = players
                    tempPlayers = tempPlayers.filter((player) => {
                        return player !== user.id
                    })
                    setPlayers(tempPlayers)
                    setRefresh(prevstate => !prevstate)
                    ShowPopUp(`Left ${event.title}`)
                }
            }
        ).catch(err=>console.log(err))
    }
    if (!user) {
        return
    }
    return (
        <>
        <TopUserBar user={user}/>
        <div class="event-page">
            {/* <Popup /> */}
            <main>
            <div class="event-banner" style={
                {backgroundImage: `url(${API_BASE_URL}${event.img})`}
            }>
            </div>
            <div class="event-head">
                <h1 className='event-name'>{event.title}</h1>
                <span>
                    <h3 className='event-host'>by {event.eventhost}</h3>
                    <h3 className='event-game'>{game.name}</h3>
                </span>
            </div>
            <div className='template-container'>
                
                {(!["active", "pending"].includes(event.event_state)) ? event_type[event.event_type] : <PlayerList players={players} event={event} user={user} join={joinEvent} leave={leaveEvent}/>}
            </div>
            {(event.event_state === "started") ? <UpcomingMatches event={event} user={user} matches={matches} players={players} game={game} refresh={setRefresh}/> : <></>}
            <h2 className='side-heading'>Rewards</h2>
            <div className='rewards-container'>
            <div className='prize-div'>
                <h2 className='reward-position'>Winner</h2>
                <p>{event.event_state==="ended" ? getuname(event.winner, players) : ""}</p>
                <FontAwesomeIcon icon={ faAward } className='winner winner-1'/>
                <div className='reward-content'> 
                    <h2>{event.winner_reward}</h2>
                    {(event.reward_type === "credit") ? <img src={creditIcon}/> : (event.reward_type === "money") ? <h2>₹</h2> : <></>}
                </div>
                </div>
                <div className='prize-div'>
                <h2 className='reward-position'>2nd</h2>
                <p>{event.event_state==="ended" ? getuname(event.runner, players) : ""}</p>
                <FontAwesomeIcon icon={ faAward } className='winner winner-2'/>
                <div className='reward-content'> 
                    <h2>{event.runner_reward}</h2>
                    {(event.reward_type === "credit") ? <img src={creditIcon}/> : (event.reward_type === "money") ? <h2>₹</h2> : <></>}
                </div>
                </div>
                {event.event_type!=="knockout" ? 
                <div className='prize-div'>
                <h2 className='reward-position'>3rd</h2>
                <p>{event.event_state==="ended" ? getuname(event.third, players) : ""}</p>
                <FontAwesomeIcon icon={ faAward } className='winner winner-3' />
               
                <div className='reward-content'> 
                    <h2>{event.third_reward}</h2>
                    {(event.reward_type === "credit") ? <img src={creditIcon}/> : (event.reward_type === "money") ? <h2>₹</h2> : <></>}
                </div>

                </div> : ""}
                
            </div>
            <h2 className='side-heading'>Details</h2>
            <div className='event-details content-div'>
                <p>
                {event.details}
                </p>
            </div>
            <h2 className='side-heading'>Rules</h2>
            <div className='event-rules content-div'>
                    
                    <p className='event-rules-content'>
                        {(Object.keys(event).length > 0) ? (event.rules.map((rule, index) => {
                        return (
                            <>
                                {rule}<br />
                            </>
                        )
                    })) : <></>}
                    </p>
                
            </div>
            <span className='event-property-container'>
                <h2 className='side-heading'>Type</h2>
                <h2 className='event-property'>{event.event_type}</h2>
            </span>
            <span  className='event-property-container'>
                <h2 className='side-heading'>Entry Fee</h2>
                <h2 className='event-property'>None</h2>
            </span>
            
            
            </main>
            
        </div>
        <NavigationUI/>
        </>
    )
}

export { PlayerList, Event };