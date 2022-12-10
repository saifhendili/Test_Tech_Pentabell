import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { auth } from "./Reducers/auth";
import { alert } from "./Reducers/alert";
import {todos} from "./Reducers/todos";



const reducer = combineReducers({
    auth,
    alert,
    todos
})
const initialState ={}
const middleware={thunk}
 
const store= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...Object.values   ( middleware)))

)
export default store;