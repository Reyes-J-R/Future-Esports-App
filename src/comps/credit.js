import creditImg from '../media/credit.png'
const Credit = (props) => {
    console.log(props)
    return (
        <div className="credit-container">
                <img src={creditImg} style={{
                    width: props.size,
                    height: props.size
                    
                }}/>
                <p className="credit-value" style={{
                    fontSize: props.size
                }}>{props.value}</p>
        </div>
    )
}

export default Credit;