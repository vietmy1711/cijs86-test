import React, { useState, useRef, useEffect } from 'react'

import './App.css'
import { Box, Tabs, Tab, TextField, Button } from '@mui/material';
import DisplayedList from './components/DisplayedList';

export enum Status {
  Active,
  Completed,
}
export type TodoItem = {
  name: string
  status: Status
  isChecked: boolean
}

const App = () => {
  const [todoList, setTodoList] = useState<Array<TodoItem>>([]);

  useEffect(() => {
    const stringTodoList = localStorage.getItem('TODO_LIST')
    if (stringTodoList)
      setTodoList(JSON.parse(stringTodoList));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const textfieldRef = useRef() 
  const handleChangeTabBar = (_: React.SyntheticEvent, value: number) => {
    setCurrentIndex(value);
  }

  const onAdd = () => {
    const value = (textfieldRef.current as unknown as HTMLInputElement).value;
    if (value === '') return;
    setTodoList(todoList => {
      todoList.push({name: value, status: Status.Active, isChecked: false});
      todoList = [...todoList];
      localStorage.setItem('TODO_LIST', JSON.stringify(todoList));
      return todoList
    });
    (textfieldRef.current as unknown as HTMLInputElement).value = '';
  }

  const onDelete = () => {
    setTodoList(todoList => {
      todoList = [...filteredList().filter(e => !e.isChecked)];
      localStorage.setItem('TODO_LIST', JSON.stringify(todoList));
      return todoList
    });

  }

  const updateList = () => {
    setTodoList(todoList => {
      localStorage.setItem('TODO_LIST', JSON.stringify(todoList));
      return [...todoList]
    });
  }

  const filteredList = () =>  todoList.filter((e: TodoItem) => {
      if (currentIndex == 0) return true;
      if (currentIndex == 1) return e.status === Status.Active;
      return e.status === Status.Completed;
    });
  

  return (
    <>
      <h1>#todo</h1>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentIndex} onChange={handleChangeTabBar} aria-label="basic tabs example">
          <Tab label="All" />
          <Tab label="Active" />
          <Tab label="Completed" />
        </Tabs>
      </Box>
      
      <TextField id="standard-basic" label="Add Item" placeholder='Add a new item' variant="standard" inputRef={textfieldRef}/>
      <Button variant="contained" onClick={onAdd}>Add</Button>

      <DisplayedList updateList={updateList}>{filteredList()}</DisplayedList>

      {
        filteredList().some((e: TodoItem) => e.isChecked) && 
        <Button variant="contained" onClick={onDelete}>Delete All</Button>
      }   
    </>
  );
}

export default App
