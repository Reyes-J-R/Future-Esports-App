import '../App.css';
import Header from './header';
import Footer from './footer';
import img_bgmi from '../media/bgmi.jpeg';
import img_efootball from '../media/efootball.webp';
import img_codm from '../media/codm.jpg';
import img_ff from '../media/ff.webp';
import AuthContext from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faRightToBracket, faShieldHalved, faTrophy } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_BASE_URL from '../config';
import LoadingScreen from './loading';
import Loading from 'react-loading-components';
import { Link } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState(null)
  const [leaderboard, setLeaderBoard] = useState(null)
  const [error, setError] = useState(false)
  let {isLoggedIn} = useContext(AuthContext)


  useEffect(() => {
    const getEvents = () => {
      axios.post(`${API_BASE_URL}/events/`).then(
        (res) => {
          console.log(res)
          setEvents(res.data.event)
          console.log(events)
        }
      ).catch(err => {
        }
      )
    }

    const getLeaderBoard = () => {
      axios.post(`${API_BASE_URL}/leaderboard/`).then(
        (res) => {
          console.log(res.data.leaderboard)
          setLeaderBoard(res.data.leaderboard)
        }
      ).catch(err=>{})
    }
    getEvents()
    getLeaderBoard()
  }, [])

    if (error){
      return
    }

    return (
        <>
    <Header />
      <div className='main'>
        <section className='sec-1'>
          {/* <div class='games-img'>
            <img className="img-cod" src={img_codm} />
            <img className='img-bgmi' src={img_bgmi}/>
            <img className='img-ff' src={img_ff}/>
            <img className='img-efootball' src={img_efootball}/>
            <div className='icon-holder-circle'>
              <img src="./media/icon_initial.png" />
            </div>
            
          </div> */}
          {/* <div className='mobgaming-img'>
            <img src="../media/mgaming_img.jpg" />
          </div> */}
          <div className='sec-1-content'>
          <h1>Dive into the world of mobile eSports</h1>
          <p>Join Our Whatsapp Group</p>
          <a href="https://chat.whatsapp.com/BGwYDZjdCMQ36SW3AaHyVm"><b>Join Now</b></a>
          </div>
        </section>
        <section className='sec-2'>
          {/* <img className='sec-2-img' src="../media/winner.webp"/> */}
          <h1>Participate in tournaments and events and win the rewards</h1>
          <div className='join-win-tile-container'>
            <div className='join-win-tile'>
              <FontAwesomeIcon icon={faRightToBracket} />
              Join Any Tournament
            </div>
            <FontAwesomeIcon icon={faArrowRight} />
            <div className='join-win-tile'>
            <FontAwesomeIcon icon={faShieldHalved} />
              Play with opponents
            </div>
            <FontAwesomeIcon icon={faArrowRight} />
            <div className='join-win-tile'>
              <FontAwesomeIcon icon={faTrophy} />
              Earn Rewards
            </div>
          </div>
        </section>
        <section className='sec-3'>
          <h1>Trending Events</h1>
          <div className='event-tile-holder'>
          
          {events ? events.map((item)=>{
            return <div className="event-tile" backgroundImage={item.img}>
            <h2 className="event-heading">{item.title}</h2>
            <button className="btn-continue"><Link to={"/event/" + item.id}>{"Join" }</Link></button>
        </div>
          }): <Loading type="three_dots" className='event-loading'/>}
          </div>
        </section>

        <section className='sec-4'>
          <h1>Top Players</h1>
          
          {leaderboard ? <table className='player-lb'>
            <tr>
              <th>Pos</th>
              <th>Name</th>
              <th>Events Won</th>
              <th>Events Played</th>
              <th>Game</th>
            </tr>
            {leaderboard.map((player, index) => {
              return (<tr>
                <td>{index + 1}</td>
                <td className='uname-td'>{index + 1 == 1 ? <FontAwesomeIcon className='first-trophy' icon={faTrophy} />: index + 1==2 ? <FontAwesomeIcon icon={faTrophy} className='second-trophy' />: ""}{player.username}</td>
                <td>{player.events_won}</td>
                <td>{player.joined_events.length}</td>
                <td>{player.main_game}</td>
              </tr>)
            })}
          </table>: <Loading type="three_dots"/>}
        </section>


        {/* <section className='sec-2'>
          <div className='prev-event-left prev-event'>
  
          </div>
          <div className='prev-event-main prev-event'> 
            <h3 className='text'>eFootball Super8 Tourney</h3>
            <div className='prev-event-img-holder'>
              <img src="./media/event_1_winner.png"></img>
            </div>
          </div>
          <div className='prev-event-right prev-event'>
  
          </div>
        </section> */}
        {/* <section className='sec-3'>
          <h2 className='text'>Top Players</h2>
          <div className='top-players-holder'>
            <div className='top-player tp1'>
              <p>1</p><h3 className='text'>Zio Zidane</h3>
            </div>
            <div className='top-player tp2'>
              <p>2</p><h3 className='text'>LilSoman69</h3>
            </div>
            <div className='top-player tp3'>
              <p>3</p><h3 className='text'>Dheeraj</h3>
            </div> 
          </div>
        </section> */}
      </div>
      <Footer />
      </>
    )
  }

export default Home;
