import axios from 'axios';
import { TodoListType } from '../components/TodoList/TodoList';

export const fetchTodoLists = async (setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>) => {
  try {
    console.log("Fetching todo lists from backend...");
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos`);
    console.log("Received todo lists:", response.data);
    setTodoLists(response.data);
  } catch (error) {
    console.error('There was an error fetching the todo lists!', error);
  }
};

export const fetchUserProfile = async (
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setBackgroundType: React.Dispatch<React.SetStateAction<'custom' | 'solid'>>,
  setBackgroundValue: React.Dispatch<React.SetStateAction<string>>,
  setCustomBackgroundColors: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userprofile`);
    const profile = response.data;
    setUsername(profile.username);
    setBackgroundType(profile.backgroundType);
    setBackgroundValue(profile.backgroundValue);
    setCustomBackgroundColors(profile.customBackgroundColors || []);
  } catch (error) {
    console.error('There was an error fetching the user profile!', error);
  }
};

export const addTodoList = async (
  todoLists: TodoListType[],
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>
) => {
  try {
    const newList = { title: 'New Todo List', todos: [] };
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos`, newList);
    setTodoLists([...todoLists, response.data]);
  } catch (error) {
    console.error('There was an error adding the todo list!', error);
  }
};

export const removeTodoList = async (
  listId: string,
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>
) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}`);
    setTodoLists(prevLists => prevLists.filter(list => list.id !== listId));
  } catch (error) {
    console.error('There was an error removing the todo list!', error);
  }
};

export const closeSidebar = (setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  setSidebarOpen(false);
};

export const openSidebar = (setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  setSidebarOpen(true);
};

export const logRefreshTriggerChange = (refreshTrigger: number) => {
  console.log('App - refreshTrigger changed:', refreshTrigger);
};