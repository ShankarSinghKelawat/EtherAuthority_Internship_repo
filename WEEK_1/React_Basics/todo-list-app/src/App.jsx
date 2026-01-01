import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setnewTasks] = useState("");
  const [donetasks, setdoneTasks] = useState([]);

  function inputChange(event){
    setnewTasks(event.target.value);
  }
  
  function addTasks(){
    if(newTasks.trim() !== ""){
      setTasks(t => [...t, newTasks]);
      setnewTasks("");
    }
  }

  function deleteTasks(index){
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTasksUp(index){
    if(index > 0){
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTasksDown(index){
    if(index < tasks.length - 1){
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  return (
    <>
    <div className='todo_card'>
      <div>
        <h1 id='header'>To-Do-List App</h1> 
      </div>
      <div className='todo-list-frame'>
        <ol>
          {tasks.map((task, index) => 
            <li key={index}>
              <span className='text'>{task}</span>
              <button className='move_btn' disabled={index ===0 } onClick={() => moveTasksUp(index)}>⬆</button>
              <button className='move_btn' disabled={index === tasks.length - 1} onClick={() => moveTasksDown(index)}>⬇</button>
              <button className='delete_btn' onClick={() => deleteTasks(index)}>✖</button>
            </li>
          )}
        </ol>
        <input type="text" placeholder='Enter a task' value={newTasks} onChange={inputChange}/>
        <button className='add_btn' onClick={addTasks}>✚</button>
      </div>
    </div>
    </>
  )
}

export default App
