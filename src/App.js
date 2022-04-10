import { useState, useEffect } from 'react';
import React from "react";
import './App.css';

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

function TodoList({items, onDelete,completeTodo, header}){
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
        completeTodo={()=>{
          completeTodo(item);
        }}
        />
      ))}
    </ul>
    </>
  );
}

function TodoItem({value, onDelete, index, completeTodo}){
  return(
    // <div onDoubleClick={this.handleEditing}>
    <li>
      {/* <div className="todo" style={{text-decoration: todo.isCompleted ? 'line-through' : 'none' }}>{todo.text}</div> */}
      <input type="checkbox" checked={value.completed}/>
      {value.title}
      <button onClick={()=> onDelete()}>X</button>
        {/* <button onClick={() => completeTodo()}>Complete</button> */}
      
    </li>
    // </div>
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

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then((json) => setItems(json));
  }, []);
  
  return(
    <div>
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
      completeTodo={completeTodo}
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