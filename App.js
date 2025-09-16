/* this is basic program for counter +1,-1,reset to zero and to increase by a multiple of number
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Redux Counter Example</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default App;
*/

//TO-DO LIST USING REACT REDUX

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './counterSlice';

const App = () => {
  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      dispatch(deleteTodo(id));
    }
  };

  const handleEdit = (id, text) => {
    setEditTaskId(id);
    setTask(text);
  };

  const handleEditSave = () => {
    if (task.trim() && editTaskId !== null) {
      dispatch(editTodo({ id: editTaskId, newText: task }));
      setEditTaskId(null);
      setTask('');
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setTask('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>TO-DO LIST</h2>

      <input
        type="text"
        value={task}
        placeholder="Enter a task"
        onChange={(e) => setTask(e.target.value)}
      />
      {editTaskId === null ? (
        <button style={{ marginLeft: '10px' }} onClick={handleAdd}>
          Add Task
        </button>
      ) : (
        <>
          <button style={{ marginLeft: '10px' }} onClick={handleEditSave}>
            Save
          </button>
          <button style={{ marginLeft: '5px' }} onClick={handleCancelEdit}>
            Cancel
          </button>
        </>
      )}
      <ol>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: '10px 0' }}>
            {todo.text}
            <button style={{ marginLeft: '10px' }} onClick={() => handleEdit(todo.id, todo.text)}>
              Edit
            </button>
            <button style={{ marginLeft: '5px' }} onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default App;