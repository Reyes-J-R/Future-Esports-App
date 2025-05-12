import { useEffect, useContext } from "react"
import AuthContext from "../context/AuthContext"
import {NavigationUI, makeButtonActive} from "./navigationUI";
import TopUserBar from "./topUserBar"
import '../css/market.css'
import Credit from "./credit"
import { ShowPopUp } from "./popup"
const Market = () => {
    let {user} = useContext(AuthContext)
    return (
        <>
        <TopUserBar/>
            <div className="market-page">
                <main>

                    {/* <h2 className="side-heading">Redeem</h2>
                    <section className="redeem-section">
                        <div className="redeem-tile">
                            <h2>5.2k rs</h2>
                            <button className="redeem-btn" onClick={()=> {ShowPopUp("redeemed")}}><Credit size={"40px"} value={"10k"} style={{color: "black"}}/></button>
                        </div>

                    </section> */}

                    <div className="redeem-info">
                        <h2 className="side-heading">
                            Notice
                        </h2>
                        <p>
                            Redeeming and other functionalities are on the way
                            and the credit distribution is in the beta phase

                        </p>
                        <h2 className="main-heading">What are Future Credits </h2>
                        <Credit size="calc(10vw + 20px)"/>
                        <p><b>Future Credits</b> are the coins (credits) given to the corresponding event winners 
                        of various events. This Credits can be redeemed soon and will only be available to redeem once this
                        beta phase is over.<br/><br/>Events in this beta phase will be free
                        of entry free and winners could bag credits, once the beta phase is over,
                        some events may be charged with certain credits.</p>
                    </div>
                    
                </main>
                
            </div>
        <NavigationUI current={"market"}/>
        </>
    )
}

export default Market