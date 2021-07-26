
import {
    LOGIN_USER,
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            //...은 spread operator임. 저걸 똑같이 들고 오는 것.
            break;
        default:
            return state;
    }
}