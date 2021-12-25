import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useRef, useEffect} from "react";
import {connect} from 'react-redux';
import {openSignIn, openSignUp, closeForm} from '../redux/actions/UserForm';

function UserForm(props){
    const {isOpen, isLeftSide} = props.formState;
    const ref = useRef(null);

    function handleClickOutside(e){
        if(!e.target.classList.contains('btn')){
            props.closeForm();
        }
    }

    useEffect(()=>{
        const current = ref.current;
        if(!current)
            return;

        if(isOpen){
            current.classList.add('open');
            current.classList.remove('close');
        }
        else{
            current.classList.remove('open');
            current.classList.add('close');
        }

        if(isLeftSide){
            current.classList.remove('right-panel-active');
        }
        else{
            current.classList.add('right-panel-active');
        }
    }, [isOpen, isLeftSide]);

    useEffect(()=>{
        document.addEventListener('click', handleClickOutside);
        if(ref.current){
            ref.current.classList.remove('close');
        }

        return ()=>{
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    return(
        <div ref={ref} onClick={(e)=>{e.stopPropagation()}} className="userform-container">
            <SignIn/>
            <SignUp/>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={()=>props.openSignIn()}>sign in</button>
                    </div>
                    <div className="overlay-panel right">
                        <h1>Hello, Friend</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={()=>props.openSignUp()}>sign up</button>
                    </div>  
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return{
        formState: state.UserForm
    }
}

const mapDispatchToProps = {
    openSignIn,
    openSignUp,
    closeForm
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);