import { faCross, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ErrorScreen = () => {
    return (
        <div className="error-screen">
            <main>
                <FontAwesomeIcon icon={faX} />
                <h2>Some Network Error Occured</h2>
                <button className='reload-btn btn-default' onClick={()=>window.location.reload()}>Reload </button>
                
            </main>
        </div>
        
    )
}

export default ErrorScreen;