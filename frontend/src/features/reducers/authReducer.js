import { LOADING_PROGRESS, REGISTER_FAILED } from "../types/authTypes.js";

const initialState = {
    isAuthenticated: false,
    isLoading      : false,
    user           : null
};

export const authReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOADING_PROGRESS:
            return {...state, isLoading: true}
        case REGISTER_FAILED:
            return initialState
        default:
            return state;
    }
};
