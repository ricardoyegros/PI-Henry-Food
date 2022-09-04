import {GET_RECIPES} from "../actions";

const initialState = {};

export default function roots (state = initialState, action) {
    switch(action.type){
        case GET_RECIPES :
            return{};
        case OTRO_CASO : 
            return {};
        default : return state;
    }
};