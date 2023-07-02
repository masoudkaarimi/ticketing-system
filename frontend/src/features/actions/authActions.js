import { LOADING_PROGRESS, REGISTER_FAILED } from "../types/authTypes.js";

export const register = (data) => (dispatch) => {
    dispatch({type: LOADING_PROGRESS})

    try {
        const body = JSON.stringify({})
    } catch (error) {
        dispatch({type: REGISTER_FAILED})
    }
}
