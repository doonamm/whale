import {combineReducers} from 'redux';
import UserForm from './UserForm';
import Announce from './Announce';
import LoginStatus from './LoginStatus';

export default combineReducers({
    UserForm,
    Announce,
    LoginStatus
});