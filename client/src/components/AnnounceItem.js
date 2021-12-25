import {FaExclamation, FaCheck} from 'react-icons/fa';
import { useRef, useEffect } from 'react';
import {removeAnnounce} from '../redux/actions/Announce';
import {connect} from 'react-redux';

const SYMBOLS = {
    "error": <span className='symbol'><FaExclamation/></span>,
    "success": <span className='symbol'><FaCheck/></span>,
}

function PopupAnnounce(props){
    const {type, title, message, ttl = 6000} = props.announce;
    const ref = useRef(null);

    useEffect(()=>{
        setTimeout(()=>{
            if(ref.current){
                ref.current.classList.add('close');
            }
        }, ttl - 700);

        setTimeout(()=>{
            props.removeAnnounce();
        }, ttl);
    }, []);

    return(
        <li ref={ref} className={'announce-item' + (type ? ` stress ${type}`:'')}>
            <h5 className='title'>{title ? title : (type ? type : 'Message')}</h5>
            <div className='content'>
                <p>{message}</p>
                {SYMBOLS[type]}
            </div>
        </li>
    );
}

const mapDispatchToProps = {
    removeAnnounce
}

export default connect(null, mapDispatchToProps)(PopupAnnounce);