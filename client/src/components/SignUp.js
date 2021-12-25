import {
    FaFacebookF,
    FaGooglePlusG,
    FaLinkedinIn
} from 'react-icons/fa';
import {useState} from 'react';
import axios from 'axios';
import Input from './Input';
import {newAnnounce} from '../redux/actions/Announce';
import {connect} from 'react-redux';

function SignUp(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState({isError: false, message: 'something error'});
    const [passwordError, setPasswordError] = useState({isError: false, message: 'how are you'});

    function setErrorValue(message){
        return {
            isError: true,
            message
        }
    }

    function validateInput(value, inputName, min, max, updateError){
        let errorValue = {
            isError: false,
            message: ''
        }
        if(value === ''){
            errorValue = setErrorValue(`${inputName} is required!`);
        }
        else if(value.length < min){
            errorValue = setErrorValue(`${inputName} must be longer than or equal ${min} character!`);
        }
        else if(value.length > max){
            errorValue = setErrorValue(`${inputName} must be short than or equal ${max} character!`);
        }
        if(errorValue.isError){
            props.newAnnounce(errorValue.message, 'error', 'sign up fail');
        }
        updateError(errorValue);
        return !errorValue.isError;
    }

    async function handleSubmit(e){
        e.preventDefault();
        const isValidUsername = validateInput(username, 'Username', 6, 12, setUsernameError);
        const isValidPassword = validateInput(password, 'Password', 4, 10, setPasswordError);

        if(isValidUsername && isValidPassword){
            try{
                const data = {
                    username: username, 
                    password: password
                };
                const response = (await axios.post('/signup', data)).data;
                // console.log(response);
                if(response.success){
                    props.newAnnounce('Sign up successfully!', 'success');
                    setUsername('');
                }
                else{
                    setUsernameError(setErrorValue(`${username} is already in use.`));
                    props.newAnnounce(`${username} is already in use.`, 'error', 'sign up fail');
                }
            }
            catch(err){
                console.log('Sign up fail:::', err);
            }
            finally{
                setPassword('');
            }
        }
    }

    return(
        <div className='form-container sign-up'>
            <form action="/" onSubmit={handleSubmit}>
                <h2>create account</h2>
                <div className="socials">
                    <a href="/" className="social"><FaFacebookF/></a>
                    <a href="/" className="social"><FaGooglePlusG/></a>
                    <a href="/" className="social"><FaLinkedinIn/></a>
                </div>
                <span>or registry your account</span>
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
                    type: 'password',
                    placeholder: 'password',
                    onChange: setPassword
                }}/>
                <a href="/">Forgot your password?</a>
                <button type='submit'>sign up</button>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    newAnnounce
}

export default connect(null, mapDispatchToProps)(SignUp);