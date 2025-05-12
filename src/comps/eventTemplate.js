
import API_BASE_URL from '../config'

const getuname= (uid, players) => {
    for (let i in players){
        if (players[i].id === uid){
            return players[i].username;
        }
    }
    }




const LeagueTemplate = (props) => {
    let players = props.players 
    let matches = props.matches
    let event = props.event
    let gamefields = props.game.fields['fields']
    let combinedtable = {}
    players.forEach(player => {
        let playerobj = {played:0, win: 0, loss: 0, draw: 0, points: 0}
        gamefields.forEach(field => {
            playerobj[field] = 0
            
        })
        combinedtable[player.username] = playerobj
        // console.log(combinedtable)
        
    });
    matches.forEach(match => {
        console.log(match)
        if(match.matchstate === "ended"){
            let winner = getuname(match.matchwinner, players)
            let player1 = getuname(match.player1, players)
            let player2 = getuname(match.player2, players)
            let player1stats = match.player1stats
            let player2stats = match.player2stats
            combinedtable[player1]['played'] += 1
            combinedtable[player2]['played'] += 1
            if (winner === null){ //draw case
                combinedtable[player1]['draw'] += 1
                combinedtable[player1]['points'] += 1
                combinedtable[player2]['draw'] += 1
                combinedtable[player2]['points'] += 1
            }
            else {
                combinedtable[winner]['win'] += 1
                combinedtable[winner]['points'] += 3
                player1 == winner ? combinedtable[player2]['loss'] += 1 : combinedtable[player1]['loss'] += 1
            }
            gamefields.forEach(field => {
                combinedtable[player1][field] += Number(player1stats[field])    
                combinedtable[player2][field] += Number(player2stats[field])
            })
        }
    })

    console.log(combinedtable)
    const keyArray = Object.keys(combinedtable)
    let combinedList = Object.entries(combinedtable).map(([key, value]) => ({[key]: value}))
    
    combinedList.sort((a, b) => {
        const winsA = Object.values(a)[0].win;
        const winsB = Object.values(b)[0].win;

        if (winsB - winsA === 0){
            return Object.values(b)[0][gamefields[0]] - Object.values(a)[0][gamefields[0]]
        }

        return winsB - winsA
    })
    console.log(combinedList)
    return (
        <>
            <div className='template-head'>
                <h2 className='template-heading'>League Table</h2>
                
            </div>
            <div className="template-body">
            <table className='league-table'>
                    <tr>
                        <th>Pos</th>
                        <th>Name</th>
                        {
                            Object.keys(combinedtable[keyArray[0]]).map(f=>{
                                
                                return <th>{f}</th>
                            })
                        }
                    </tr>
                    {


                        combinedList.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{Object.keys(item)[0]}</td>
                                    {Object.keys(item[Object.keys(item)[0]]).map(subitem => {
                                        return (
                                        <td>{item[Object.keys(item)[0]][subitem]}</td>)
                                    })}
                                </tr>
                            )
                        })
                        // keyArray.map(p => {
                        //     return (
                        //         <tr>
                        //             <td>{keyArray.indexOf(p) + 1}</td>
                        //             <td>{p}</td>
                        //             {
                        //                 Object.keys(combinedtable[p]).map(f=>{
                        //                     return (<td>{combinedtable[p][f]}</td>)
                        //                 }
                        //                 )
                        //             }
                        //         </tr>
                        //     )
                        // })
                    }
                    {/* {keyArray.forEach(p => {
                        return (
                        {Object.keys(combinedtable[p]).forEach(f => {
                            return ()
                        }}
                    )} */}
                </table>
                </div>
        </>
    )
}


const BracketSection = (props) => {
    console.log(props.count)

    // console.log(props.matches)
    const players = props.players
    let rounds = (count) => {
        let round = 0;
        for (let i=0; 2**i!=count;i++){
            round++
        }
        return round
    }

    let currentRound = () => {
        let round = 0;
        for (let i = props.event.max_players;i!=props.count;i=i/2){
            round ++
        }
        return round
    }

    let playerArray = Array(props.count * 2).fill("")
    let matches = props.matches
    matches.sort((a, b)=> a.root - b.root)
    let round = currentRound()
    let indexcount = 0;
    for (let i in matches){
        let match = matches[i]
        console.log(getuname(match.player2, props.players))
        if (match.round === round){
            console.log(match)
            playerArray[indexcount] = getuname(match.player1, props.players)
            playerArray[indexcount + 1] =  getuname(match.player2, props.players) === undefined ? "" : getuname(match.player2, props.players)
            indexcount += 2
        }

    }

    console.log("round", round, "array", playerArray)

    if (props.section === 1){
        playerArray = playerArray.slice(0, props.count)
    }
    else {
        playerArray = playerArray.slice(props.count, playerArray.length+1)
        console.log(playerArray)
    }

    return (
        <div className={`bracket-cols-${props.count} bracket-cols`}>
            {playerArray.map((player) => {
                return (
                    <div className='bracket-col'>
                        <p>{player}</p>
                    </div>
                )
            })}
        </div>
    )
}


const KnockoutTemplate = (props) => {
    const max_players = props.event.max_players
    const players = props.players
    const Array8 = Array(8).fill("")
    const Array4 = Array(4).fill("")
    const Array2 = Array(2).fill("")
    return (
        <>
            <div className='template-head'>
                <h2 className='template-heading'>Knockout</h2>
            </div>
            <div className='bracket-container template-scroll'>
                {max_players >= 16 ? <BracketSection players={players} event={props.event} round={1} section={1} count={8}  matches={props.matches}/>: <></>} 
                {max_players >= 8 ? <BracketSection players={players} event={props.event} round={2} section={1} count={4} matches={props.matches}/>: <></>}
                {max_players >= 4 ? <BracketSection players={players} event={props.event} round={3} section={1} count={2} matches={props.matches}/> : <></>}
                {max_players >= 2 ? <BracketSection players={players} event={props.event} round={4} section={1} count={1} matches={props.matches}/> : <></>}
                <div className='bracket-cols-winner bracket-cols'>
                        {/* 1: 5, 2: 4, 4: 3, 8: 2, 16: 1 */}
                            <div className='bracket-col'>
                                <p>{props.event.event_state==="ended" ? getuname(props.event.winner, props.players): ""}</p>
                            </div>
                <h2>Winner</h2>
                </div>
                {max_players >= 2 ? <BracketSection players={players} event={props.event} round={4} section={2} count={1} matches={props.matches}/> : <></>}
                {max_players >= 4 ? <BracketSection players={players} event={props.event} round={3} section={2} count={2} matches={props.matches}/> : <></>}
                {max_players >= 8 ? <BracketSection players={players} event={props.event} round={2} section={2} count={4} matches={props.matches}/>: <></>}
                {max_players >= 16 ? <BracketSection players={players} event={props.event} section={2} count={8} matches={props.matches}/>: <></>}
                {/* {max_players >= 16 ? <BracketSection players={players} event={props.event} round={1} section={2} count={8} matches={props.matches}/>: <></>} */}


            </div>   
        </>
    )
}

export {LeagueTemplate, BracketSection, KnockoutTemplate, getuname}