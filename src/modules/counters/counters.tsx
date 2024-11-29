import { useAppSelector } from '../../shared/redux';
import {
    CounterId,
    decrementAction,
    incrementAction,
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

    return (
        <>
            counter {counterState?.counter}
            <button onClick={() => dispatch(incrementAction({ counterId }))}>
                increment
            </button>
            <button onClick={() => dispatch(decrementAction({ counterId }))}>
                decrement
            </button>
        </>
    );
}
