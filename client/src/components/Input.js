import {FaExclamation} from 'react-icons/fa';

export default function Input(props){
    const {value, errorValue, type, placeholder, onChange} = props.data;

    return(
        <div className={'input-container' + (errorValue.isError ? ' error' : '')}>
            <span><FaExclamation/></span>
            <input 
                value={value}
                type={type} 
                placeholder={placeholder} 
                onChange={(e)=>onChange(e.target.value)} 
                title={errorValue.isError ? errorValue.message : null}/>
        </div>
    );
}