import React from 'react';
import { useCounterStore } from '../store/store';

const CounterButton: React.FC = () => {
  // Getting the 'increment' & 'decrement' function from store.
  const increment: () => void = useCounterStore((state) => state.increment);
  const decrement: () => void = useCounterStore((state) => state.decrement);

  return (
    <>
      <button className="btn btn-primary btn-lg me-2" onClick={increment}>
        Zähler erhöhen
      </button>
      <button className="btn btn-primary btn-lg ms-2" onClick={decrement}>
        Zähler veringern
      </button>
    </>
  );
};

export default CounterButton;
