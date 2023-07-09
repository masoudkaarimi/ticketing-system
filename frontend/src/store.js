import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './features/redux/reducers';

const middleWare = [thunk];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare)));
