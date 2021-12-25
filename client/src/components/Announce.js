import '../styles/Announce.scss';
import AnnounceItem from './AnnounceItem';
import {connect} from 'react-redux';
import {useRef, useEffect} from 'react';

function Announce(props){
    const renderList = props.list.map(item => <AnnounceItem key={item._id} announce={{...item}}/>);
    // console.log('current', props.list);
    const ref = useRef(null);
    
    useEffect(()=>{ 
        const current = ref.current;
        if(current){
            current.scrollTop = current.scrollHeight;
        }
    });

    return(
        <ul ref={ref} className='announce'>
            {renderList}
        </ul>
    )
}

const mapStateToProps = state => (
    {
        list: state.Announce.list
    }
);

export default connect(mapStateToProps)(Announce);