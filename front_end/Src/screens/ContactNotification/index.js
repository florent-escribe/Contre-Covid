import React, { useState, useEffect } from 'react'
import GetUserCovidState from '../../Functions/GetUserCovidState'
import NotificationPanel from './NotificationPanel.react'


//dans props, yaura juste uid
export default function ContactNotification (props) {

    const [etat_co,setEtatCo] = useState(0)

    useEffect ( () => {
        const timer = setInterval(() => GetUserCovidState(props.uid,setEtatCo),2000);
        return () => clearInterval(timer);
        }
    )
    return (etat_co==1 && <NotificationPanel/>)
}
