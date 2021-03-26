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

export const App = () => {
  return (
    <div>
      <Counter />
      <Controls />
    </div>
  );
};

export const Counter = () => {
  const count = useStore((state) => state.count);

  return <pre data-testid="count">{count}</pre>;
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
