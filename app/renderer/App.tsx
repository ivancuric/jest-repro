import { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import create, { SetState } from 'zustand';

type AppState = {
  count: number;
};

type Actions = {
  add: (number: number) => void;
  reset: () => void;
};

type Store = AppState & Actions;

const initialState: AppState = {
  count: 0,
};

const createActions = (set: SetState<Store>) =>
  ({
    add: (number) => set((state) => ({ count: state.count + number })),
    reset: () => set({ count: 0 }),
  } as Actions);

export const useStore = create<Store>((set) => ({
  ...initialState,
  ...createActions(set),
}));

const App = () => {
  // trigger `act` errors
  const add = useStore((state) => state.add);
  useEffect(() => {
    add(0);
  }, [add]);

  return (
    <div>
      <Counter />
      <Controls />
    </div>
  );
};

export default hot(module)(App);

export const Counter = () => {
  const count = useStore((state) => state.count);

  return (
    <strong style={{ fontSize: '40px' }} data-testid="count">
      {count}
    </strong>
  );
};

export const Controls = () => {
  const add = useStore((state) => state.add);
  const reset = useStore((state) => state.reset);

  return (
    <div>
      <button onClick={() => add(1)}>Add 1</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};
