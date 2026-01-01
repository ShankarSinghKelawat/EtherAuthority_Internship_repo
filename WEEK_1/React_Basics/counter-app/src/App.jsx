import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='_card'>
      <div>
        <p className='counter'> {count} </p>
      </div>
      <div className="card">
        <button onClick={ () => setCount((count) => count + 1)}>
          Increase
        </button>
        <button onClick={ () => setCount((count) => 0)}>
          Reset
        </button>
        <button onClick={ () => setCount((count) => count - 1)}
          disabled={count === 0}
          >
          Decrease
        </button>
      </div>
    </div>
    <h1>Counter App</h1>
    </>
  )
}

export default App
