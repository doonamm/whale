import { TYPE } from "../actions/UserForm";

const defaultState = {
    isOpen: false,
    isLeftSide: true
}

export default function reducer(state = defaultState, action){
    switch(action.type){
        case TYPE.OPEN_FORM: 
            return {
                ...state,
                isOpen: true
            };
        case TYPE.CLOSE_FORM:
            return {
                ...state,
                isOpen: false
            };
        case TYPE.OPEN_SIGNIN:
            return {
                ...state,
                isLeftSide: true
            };
        case TYPE.OPEN_SIGNUP:
            return {
                ...state,
                isLeftSide: false
            };
        default:
            return state;
    }
}