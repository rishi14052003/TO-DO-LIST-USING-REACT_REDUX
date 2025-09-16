/* this is basic program for counter +1,-1,reset to zero and to increase by a multiple of number
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../src/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

*/

//TO-DO LIST USING REACT REDUX

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './counterSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;


