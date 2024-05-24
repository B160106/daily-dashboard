import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { StyledTodoListContainer } from '../styled-components/Todo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <StyledTodoListContainer>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new to-do"
        style={{ width: '400px', height: '40px' }}
      />
      <div>
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </div>
    </StyledTodoListContainer>
  );
};

export default TodoList;