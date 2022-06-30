import {useState, useEffect, useContext} from 'react'
import {MessageContext} from '../components/context/message'

const Notification = () => {
    const [vanishMode, setVanishMode] = useState(false);
    const {message} = useContext(MessageContext)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setVanishMode(true)
        }, 5000)
        return () => {
            clearTimeout(timer)
            setVanishMode(false)
        };
    }, [message]);

    return (
        <div>
            {!vanishMode ? <p style={{fontSize: "bold", color: message?.color, textAlign: "center"}}>{message?.message}</p> : null}
        </div>
    )
}

export default Notification