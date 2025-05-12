import creditImg from '../media/credit.png'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Credit from './credit'
const TopUserBar = () => {
    let {user} = useContext(AuthContext);
    // console.log(user)
    if (!user){
        return
    }
    return (
        <div className="top-userbar">
            <h1 className="userbar-name">{user.username}</h1>
            <Credit value={2504234}/>
        </div>
    )
}

export default TopUserBar;