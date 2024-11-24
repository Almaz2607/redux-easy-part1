import { useAppSelector } from '../../store';
import {
    CounterId,
    DecrementAction,
    IncrementAction,
    selectCounter,
} from './counters.slice';
import { useDispatch } from 'react-redux';

export function Counters() {
    return (
        <>
            <Counter counterId="first" />
            <Counter counterId="second" />
        </>
    );
}

export function Counter({ counterId }: { counterId: CounterId }) {
    const dispatch = useDispatch();
    const counterState = useAppSelector(state =>
        selectCounter(state, counterId),
    );

    /* const [,forceUpdate] = useReducer((x)=> x+1, 0)

    const lastStateRef = useRef<ReturnType<typeof selectCounter>>()

    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const currentState = selectCounter(store.getState(), counterId)
        const lastState = lastStateRef.current

        if(currentState !== lastState) {
          forceUpdate()
        }
        lastStateRef.current = currentState
      })

      return unsubscribe
    },[]) */

    return (
        <>
            counter {counterState?.counter}
            <button
                onClick={() =>
                    dispatch({
                        type: 'increment',
                        payload: { counterId },
                    } satisfies IncrementAction)
                }
            >
                increment
            </button>
            <button
                onClick={() =>
                    dispatch({
                        type: 'decrement',
                        payload: { counterId },
                    } satisfies DecrementAction)
                }
            >
                decrement
            </button>
        </>
    );
}
