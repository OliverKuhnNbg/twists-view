import React from 'react';
import { useCounterStore } from '../store/store';

const CounterDisplay: React.FC = () => {
  // Getting 'count' value from store.
  // This component will be re-rendered, if count value is changing.
  const count: number = useCounterStore((state) => state.count);

  return (
    <div>
      <h1 className="display-4">Zählerstand: {count}</h1>
    </div>
  );
};

export default CounterDisplay;
