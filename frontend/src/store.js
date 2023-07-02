import {createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import rootReducer from "./features/reducer"
import {composeWithDevTools} from "@redux-devtools/extension";


const middleWare = [thunk]
export const store = createStore(rootReducer, composeWithDevTools(...middleWare))
