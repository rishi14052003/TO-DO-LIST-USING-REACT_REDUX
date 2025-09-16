import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './counterSlice';

const App = () => {
  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirmId(id); 
  };

  const confirmDelete = () => {
    if (deleteConfirmId !== null) {
      dispatch(deleteTodo(deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null); 
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
    <div style={{ padding: '20px', position: 'relative' }}>
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

      
      {deleteConfirmId !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}
          >
            <p>Are you sure you want to delete this task?</p>
            <button onClick={confirmDelete} style={{ marginRight: '50px' }}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
