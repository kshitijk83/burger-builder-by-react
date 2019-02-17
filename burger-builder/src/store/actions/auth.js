import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
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
                // console.log(res);
                const expirationDate = new Date(new Date().getTime()+res.data.expiresIn*1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err.response.data.error.message));
            })
    }
}

export const checkAuthTimeout=(expiresIn)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn*1000);
    }
}

export const authLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRedirect=(path)=>{
    return{
        type: actionTypes.AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        } else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<=new Date()){
                dispatch(authLogout());
            } else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}