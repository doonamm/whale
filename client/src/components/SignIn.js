import {
    FaFacebookF,
    FaGooglePlusG,
    FaLinkedinIn
} from 'react-icons/fa';
import Input from './Input';
import { useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {newAnnounce} from '../redux/actions/Announce';
import {online} from '../redux/actions/LoginStatus';
import {closeForm} from '../redux/actions/UserForm';

function SignIn(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState({isError: false, message: ''});
    const [passwordError, setPasswordError] = useState({isError: false, message: ''});

    function validateInput(value, inputName, updateError){
        let errorValue = {
            isError: false,
            message: ''
        }
        if(value === ''){
            errorValue = {
                isError: true,
                message: `${inputName} is required!`
            };
        }
        if(errorValue.isError){
            props.newAnnounce(errorValue.message, 'error', 'sign in fail');
        }
        updateError(errorValue);
        return !errorValue.isError;
    }

    async function handleSubmit(e){
        e.preventDefault();

        const validUsername = validateInput(username, 'Username', setUsernameError);
        const validPassword = validateInput(password, 'Password', setPasswordError);

        if(validUsername && validPassword){
            try{
                const data = {
                    username,
                    password
                };
                axios.post('/signin', data).then(res => res.data).then(res=>{
                    console.log(res);
                    if(res.success){
                        props.closeForm();
                        props.newAnnounce('Sign in success', 'success');
                        props.online(res.accessToken, res.refreshToken);
                    }
                    else{
                        if(res.errorTarget === 'username'){
                            setUsernameError({
                                isError: true,
                                message: res.message
                            });
                            props.newAnnounce(res.message, 'error', 'sign in fail');
                        }
                        else{
                            setPasswordError({
                                isError: true,
                                message: res.message
                            });
                            props.newAnnounce(res.message, 'error', 'sign in fail');
                        }
                    }
                });
            }
            catch(err){
                console.log('Sign in error:::', err);
            }
            finally{
                setPassword('');
            }
        }
    }

    return(
        <div className='form-container sign-in'>
            <form action="/" onSubmit={handleSubmit}>
                <h2>Sign in</h2>
                <div className="socials">
                    <a href="/" className="social"><FaFacebookF/></a>
                    <a href="/" className="social"><FaGooglePlusG/></a>
                    <a href="/" className="social"><FaLinkedinIn/></a>
                </div>
                <span>or use your account</span>
                <Input data={{
                    value: username,
                    errorValue: usernameError,
                    type: 'text',
                    placeholder: 'username',
                    onChange: setUsername
                }}/>
                <Input data={{
                    value: password,
                    errorValue: passwordError,
                    type: 'text',
                    placeholder: 'password',
                    onChange: setPassword
                }}/>
                <a href="/">Forgot your password?</a>
                <button type='submit'>sign in</button>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    newAnnounce,
    online,
    closeForm
}

export default connect(null, mapDispatchToProps)(SignIn);