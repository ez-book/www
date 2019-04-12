import { createStore } from './store';
import { reducer } from './reducer';

// Initialising the store
const store = createStore(
  { loading: false, error: false },
  reducer
);

// Initial state when opening the popup
store.dispatch({ type: "INIT" });

// Event delegation for DOM events in the popup
document.addEventListener("click", e => {
  // Book an itinerary
  if (e.target && e.target.classList.contains("book")) {
    store.dispatch({ type: "LOADING" });
    console.log("book");
  }

  // Share an itinerary
  if (e.target && e.target.classList.contains("share")) {
    store.dispatch({ type: "LOADING" });
    console.log("share");
  }
});
