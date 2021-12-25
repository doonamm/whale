import axios from 'axios';

export const TYPE = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export function online(accessToken, refreshToken){
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('isOnline', true);
    return{
        type: TYPE.ONLINE
    }
}

export function offline(){
    localStorage.clear();
    return{
        type: TYPE.OFFLINE
    }
}