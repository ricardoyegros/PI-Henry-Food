import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {roots} from "../reducers"

const store = createStore(roots, compose(applyMiddleware(thunk)));

export default store;