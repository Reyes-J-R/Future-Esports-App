import {NavigationUI, makeButtonActive} from "./navigationUI";
import Loading from 'react-loading-components'

const LoadingScreen = () => {
    return (
        
        <>
        <NavigationUI />
        <div className='loading-screen'>
                <main style={{display: 'flex'}}>
                    <Loading type="ball_triangle" width={'calc(9vw + 10px)'} height={'calc(9vw + 10px)'}/>
                    <h3>Loading</h3>
                </main>
            </div>
        </>
    )
}

export default LoadingScreen;