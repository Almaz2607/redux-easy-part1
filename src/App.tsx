import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CounterId, DecrementAction, IncrementAction, selectCounter, useAppSelector} from './store'
// import { useEffect, useReducer, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { UsersList } from './users-list'

function App() {
 
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Counter counterId='first'/>
      <Counter counterId='second'/>
      <UsersList />
    </>
  )
}

export function Counter({counterId}: {counterId:CounterId}) {
  const dispatch = useDispatch()
  const counterState = useAppSelector(state => selectCounter(state,counterId))

  console.log('render counter', counterId)

  // const [,forceUpdate] = useReducer((x)=> x+1, 0)

  // const lastStateRef = useRef<ReturnType<typeof selectCounter>>()

  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     const currentState = selectCounter(store.getState(), counterId)
  //     const lastState = lastStateRef.current

  //     if(currentState !== lastState) {
  //       forceUpdate()
  //     }
  //     lastStateRef.current = currentState
  //   })

  //   return unsubscribe
  // },[])

  return (
  <>
   counter {counterState?.counter}
        <button onClick={() => dispatch({type:'increment', payload: {counterId}} satisfies IncrementAction)}>
         increment
        </button>
        <button onClick={() => dispatch({type:'decrement', payload: {counterId}} satisfies DecrementAction)}>
         decrement
        </button>
  </>
  )
}

export default App
