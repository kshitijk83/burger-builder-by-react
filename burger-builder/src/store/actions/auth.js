import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (err)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        err: err
    }
}

export const auth =(email, password, isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDeFGbjg4rFXi1ezzk74uoHSK-XiRY5c7A";
        if(!isSignup){
            url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDeFGbjg4rFXi1ezzk74uoHSK-XiRY5c7A";
        }
        axios.post(url, authData)
            .then(res=>{
                console.log(res);
                dispatch(authSuccess(res.data));
            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err));
            })
    }
}