import '../styles/Navbar.scss';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {openForm, openSignIn, openSignUp} from '../redux/actions/UserForm';
import {connect} from 'react-redux';
import {offline} from '../redux/actions/LoginStatus';
import axios from 'axios';
import {newAnnounce} from '../redux/actions/Announce';

function Navbar(props){
    //todo
    async function signOut(){
        try{
            const refreshToken = localStorage.getItem('refreshToken');
            const config = {
                headers:{
                    "x-refresh-token": refreshToken
                }
            };
            const res = (await axios.post('/signout', {}, config)).data;
            if(!res.success){
                throw res;
            }
            props.newAnnounce('See you again!', 'success', 'sign out success');
        }
        catch(err){
            console.log('Sign out error:', err);
            props.newAnnounce('Something went wrong!', 'error', 'error');
        }
        finally{
            props.offline();
            window.location.href = 'http://localhost:3000/';
        }
    }

    function triggerOpenForm(isSignIn = true){
        if(!props.isOpen){
            props.openForm();
        }
        if(isSignIn){
            props.openSignIn();
        }
        else{
            props.openSignUp();
        }
    }

    if(!props.isLogin){
        return(
            <nav className='nav'>
                <div className='container'>
                    <Link className='logo-container' to="/">
                        <img src={logo} alt=""/>
                    </Link>
                    <div className='sign-container'>
                        <Link className="signin btn" to="/" onClick={()=>triggerOpenForm()}>sign in</Link>
                        <Link className="signup btn" to="/" onClick={()=>triggerOpenForm(false)}>sign up</Link>
                    </div>
                </div>            
            </nav>
        );
    }
    else{
        return(
            <nav className='nav logged-in'>
                <div className='container'>
                    <Link className='logo-container' to="/">
                        <img src={logo} alt=""/>
                    </Link>
                    <button onClick={signOut}>sign out</button>
                </div>            
            </nav>
        );
    }

}

const mapStateToProps = (state)=>{
    return {
        isOpen: state.UserForm.isOpen,
        isLogin: state.LoginStatus
    }
}

const mapDispatchToProps = {
    openForm,
    openSignIn,
    openSignUp,
    offline,
    newAnnounce
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);