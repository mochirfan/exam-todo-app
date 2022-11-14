import React, { createContext, useReducer } from "react";
import todos from "./todos";

const initialState = { todos };
const TodosContext = createContext({});

const actions = {
  createTodo(state, action) {
    const todo = action.payload;
    todo.id = Math.random();
    return {
      ...state,
      todos: [todo, ...state.todos],
    };
  },
  updateTodo(state, action) {
    const updated = action.payload;

    return {
      ...state,
      todos: state.todos.map((u) => (u.id === updated.id ? updated : u)),
    };
  },
  deleteTodo(state, action) {
    const todo = action.payload;
    return {
      ...state,
      todos: state.todos.filter((u) => u.id !== todo.id),
    };
  },
};

export const TodosProvider = (props) => {
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
