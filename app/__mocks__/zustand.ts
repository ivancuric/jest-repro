/**
 * https://github.com/pmndrs/zustand/wiki/Testing
 */

import actualCreate from 'zustand';

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<() => unknown>();

// when creating a store, we get its initial state, create a reset function and
// add it in the set
const create: typeof actualCreate = (createState) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// Reset all stores after each test run
afterEach(() => {
  storeResetFns.forEach((resetFn) => resetFn());
});

export default create;
