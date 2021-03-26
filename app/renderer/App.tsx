import { useEffect, useRef } from 'react';
import create, { SetState } from 'zustand';

type AppState = {
  count: number;
  transientCount: number;
};

type Actions = {
  add: (number: number) => void;
  reset: () => void;
};

type Store = AppState & Actions;

const initialState: AppState = {
  count: 0,
  transientCount: 0,
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

export const App = () => {
  const transientCountRef = useRef(useStore.getState().transientCount);

  useEffect(
    () =>
      useStore.subscribe(
        (transientCount: number) =>
          (transientCountRef.current = transientCount),
        (state) => state.transientCount,
      ),
    [],
  );

  return (
    <div>
      <Counter />
      <Controls />
    </div>
  );
};

const Counter = () => {
  const count = useStore().count;

  return <pre data-testid="count">{count}</pre>;
};

const Controls = () => {
  const add = useStore().add;
  const reset = useStore().reset;

  return (
    <div>
      <button onClick={() => add(1)}>Add 1</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};
