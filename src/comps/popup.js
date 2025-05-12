
const Popup = (props) => {
    
    
    return (
        
        <div id="popup-box">
            <h1 id="popup-text">{props.text}</h1>
        </div>
        
    )
}

const ShowPopUp = (text) => {
    const popup = document.getElementById("popup-box")
    const popuptext = document.getElementById("popup-text")
    popuptext.innerHTML = text
    popup.style.display = "block";

    setTimeout(()=>{
        popup.style.display = null;
    }, 2000)
    
}

export { Popup,  ShowPopUp };