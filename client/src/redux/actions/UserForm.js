export const TYPE = {
    OPEN_FORM: 'OPEN_FORM',
    CLOSE_FORM: 'CLOSE_FORM',
    OPEN_SIGNIN: 'OPEN_SIGNIN',
    OPEN_SIGNUP: 'OPEN_SIGNUP'
}
export function openForm(){
    return {
        type: TYPE.OPEN_FORM
    }
}
export function closeForm(){
    return{
        type: TYPE.CLOSE_FORM
    }
}
export function openSignIn(){
    return{
        type: TYPE.OPEN_SIGNIN
    }
}
export function openSignUp(){
    return{
        type: TYPE.OPEN_SIGNUP
    }
}
