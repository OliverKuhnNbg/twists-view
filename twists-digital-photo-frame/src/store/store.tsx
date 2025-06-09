import { create } from 'zustand';

// definates the 'type' for the state and the 'actions'.
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// creates the store
export const useCounterStore = create<CounterState>((set) => ({
  // initial state
  count: 0,

  // 'Actions'
  // 'set' is a function from Zustand, which updates the current state the safe way.
  // both function`s take the current state and give back the new state.
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
