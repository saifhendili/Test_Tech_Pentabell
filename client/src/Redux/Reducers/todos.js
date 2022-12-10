import {
    ADD_TODO,GET_TODO,GET_TODOS,CLOSE_TODO,DELETE_TODO,ERROR_TODO
} from '../Constants/Types';
 
  const initialState = {
    loading: true,
    todos: [],
    todo: null,
    error: {},
  };
  export const todos= (state = initialState, action) =>{

    const { type, payload } = action;
  
    switch (type) {
      case GET_TODOS:
            return {
                ...state,
                todos: payload,
                loading: false,
            };
        case GET_TODO:
            return {
                ...state,
                todo: payload,
                loading: false,
            };
      case ADD_TODO:
            return {
                ...state,
                todos: [payload,...state.todos],
                loading: false,
            };
            case DELETE_TODO:
                return {
                  ...state,
                  todos: state.todos.filter((todo) => todo._id !== payload._id),                  
                  loading: false,
                };
            case CLOSE_TODO:
                const index = state.todos.findIndex(todo => todo.id !==payload._id); //finding index of the item                action.payload); //finding index of the item
                const newArray = [...state.todos]; //making a new array
                newArray[index].finished = true//changing value in the new array
               
            return {
                  ...state, //copying the orignal state
                  todos: newArray, //reassingning todos to new array                   
                  loading: false,
                };
              case ERROR_TODO:
                return {
                  ...state,
                  error: payload,
                  loading: false,
                };
                default:
                    return state;
    }
  }