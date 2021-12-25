import { TYPE } from "../actions/Announce";
import crypto from 'crypto';

const defaultState = {
    countLeft: 0,
    list: []
}

export default function reducer(state = defaultState, action){
    switch(action.type){
        case TYPE.ADD_ANNOUNCE:
            const newItem = {
                ...action.payload,
                _id: crypto.randomBytes(5).toString('hex')
            }
            return{
                countLeft: state.countLeft + 1,
                list: [...state.list, newItem]
            };
        case TYPE.REMOVE_ANNOUNCE:
            if(state.countLeft === 1)
                return{
                    countLeft: 0,
                    list: []
                };
            return{
                ...state,
                countLeft: state.countLeft - 1
            };
        default: 
            return state;
    }
};