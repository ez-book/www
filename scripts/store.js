import { updateUI } from './ui';

// Barebones Redux architecture implementation
export const createStore = (initialState = {}, reducer) => {
  let state = initialState;
  return {
    dispatch: action => {
      state = reducer(action, state);
      updateUI(state); // Let's just make our lives simple here!
    },
    getState: _ => state
  };
};
