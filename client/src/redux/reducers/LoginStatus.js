import { TYPE } from "../actions/LoginStatus";
export default function reducer(state = false, action){
    switch(action.type){
        case TYPE.ONLINE:
            return true;
        case TYPE.OFFLINE:
            return false;
        default:
            return state;
    }
}