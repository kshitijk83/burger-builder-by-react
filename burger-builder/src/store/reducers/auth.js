import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null,
    authRedirect: '/'
};

const reducer =(state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { loading: true });
        
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, { token: action.token, userId: action.userId, loading: false });
        
        case actionTypes.AUTH_FAIL:
            return updateObject(state, { error: action.err, loading: false });

        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null });

        case actionTypes.AUTH_REDIRECT:
            return updateObject(state, { authRedirect: action.path });
        default:
            return state;
    }
}

export default reducer;