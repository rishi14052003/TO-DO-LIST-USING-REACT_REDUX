

//TO-DO LIST USING REACT REDUX

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './counterSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;



