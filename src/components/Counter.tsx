// components/Counter.tsx
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { increment, decrement } from '@/store/counterSlice';

export default function Counter() {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.value);

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}
