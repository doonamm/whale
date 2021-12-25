export const TYPE = {
    ADD_ANNOUNCE: 'ADD_ANNOUNCE',
    REMOVE_ANNOUNCE: 'REMOVE_ANNOUNCE'
}

export function newAnnounce(message, type, title, ttl){
    return{
        type: TYPE.ADD_ANNOUNCE,
        payload: {
            message,
            type,
            title,
            ttl
        }
    }
}

export function removeAnnounce(id){
    return{
        type: TYPE.REMOVE_ANNOUNCE,
        payload: id
    }
}