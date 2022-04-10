import { useState, useEffect } from 'react';
import React from "react";
import './App.css';
import background from "./5.jpg";

function TodoInput ({ onAdd }){
  let [value, setValue] = useState("");
  return (
    <div className='ipField'>
      <input className='ipTxt'
      type="text"
      onChange={(e)=>{
        value = e.target.value;
      }
      }>
      </input>
      <br></br>
      <button className='ipBtn'
        onClick={()=>{
          onAdd(value);
          setValue("");
        }}>
        Add Todo
      </button>
    </div>
  )
}

function TodoList({items, onDelete,completeTodo, header,onChecked}){
  return(
    <>
    {header}
    <ul className='mylist'>
      {items.map((item)=>(
        <TodoItem
        key={item.id}
        value = {item}
        onDelete={()=>{
          onDelete(item);
        }}
        onChecked={()=>{
          onChecked(item);
        }}
        completeTodo={()=>{
          completeTodo(item);
        }}
        >
        {(title) => <span>{title}</span>}
        </TodoItem>
      ))}
    </ul>
    </>
  );
}

function TodoItem({value, onDelete, index, completeTodo, children,onChecked}){
  return(
    <div>
    <li className='list-group-item'>
      <input type="checkbox" checked={value.isCompleted} onChange={() =>{
        onChecked(value);
      }} />
      {value.title}
      
      <button className='xBtn' onClick={()=> onDelete()}>X</button>
    </li>
    <br></br>
    </div>

  );
}


function App(){
  const [items, setItems] = useState([
    {id:1, title:"item1", isCompleted:false},
    {id:2, title:"item2", isCompleted:false},
    {id:3, title:"item3", isCompleted:false},
  ]);

  const completeTodo = index => {
    const newTodos = [...items];
    newTodos[index].isCompleted = true;
    setItems(newTodos);
  };

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos')
  // .then(response => response.json())
  // .then((json) => setItems(json));
  // }, []);
  
  return(
    <div style={{backgroundImage: `url(${background})`}}>
      <TodoInput
      onAdd={(value)=>{
        setItems([
          ...items,
          {id:Math.random(), title:value, isCompleted:false},
        ]);
      }}
      />
      <TodoList 
      header={<h2 className='title'>
        ToDo List Items:
      </h2>}
      items={items} 
      onDelete={(item)=>{
        setItems(items.filter((TodoItem)=>TodoItem.id !== item.id));
      }}
      // completeTodo={completeTodo}
      onChecked={(item)=>{
        setItems(items.map((TodoItem)=>TodoItem.id === item.id 
        ? {...TodoItem, isCompleted:!TodoItem.isCompleted}
        :TodoItem));
      }}
      />
      
    </div>
  );
}

export default App;
// function App(){
//   const name="eman";
//   const displayName = true;
//   if(displayName){
//     return <h1>{name}</h1>
//   }else{
//     return <p>no name</p>
//   }
// }
// export default App;