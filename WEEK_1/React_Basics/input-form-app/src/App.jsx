import { useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [status, setStatus] = useState("");

  function nameChange(event){
    setName(event.target.value);
  }

  function ageChange(event){
    setAge(event.target.value);
  }

  function emailChange(event){
    setEmail(event.target.value);
  }

  function educationChange(event){
    setEducation(event.target.value);
  }

  function statusChange(event){
    setStatus(event.target.value);
  }

  return (
    <>
    <p id='head'>Input Form</p>
    <div className='form_card'>
    <div>
      <p className='labels'>Name: {name}</p>
      <input className='inputs' placeholder='enter name' value={name} onChange={nameChange}/>
      <br />

      <p className='labels'>Age: {age}</p> 
      <input className='inputs' placeholder='enter age' value={age} onChange={ageChange} type='number'/>
      <br />
      
      <p className='labels'>Email: {email}</p>
      <input className='inputs' placeholder='example@gmail.com' value={email} onChange={emailChange} type='email'/>
      <br />
      
      <p className='labels'>Highest Education: {education}</p>
      <select className='inputs' value={education} onChange={educationChange}>
        <option value="">Select Option</option>
        <option value="Diploma Degree">Diploma Degree</option>
        <option value="Bachelors Degree">Bachelors Degree</option>
        <option value="Masters Degree">Masters Degree</option>
      </select> 
      <br />

      <p className='labels'>Current Status: {status}</p>
      <label className='labels' htmlFor="">
        <input type="radio" value="Student" checked={status === "Student"} onChange={statusChange}/>
        Student
      </label>
      <br />
      <label className='labels' htmlFor="">
        <input type="radio" value="Fresher" checked={status === "Fresher"} onChange={statusChange}/>
        Fresher
      </label>
      <br />
      <label className='labels' htmlFor="">
        <input type="radio" value="Working Professional" checked={status === "Working Professional"} onChange={statusChange}/>
        Working Professional
      </label>
    </div>
    </div>
    </>
  )
}

export default App
