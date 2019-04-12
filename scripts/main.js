import queryString from "query-string";

import { createStore } from "./store";
import { reducer } from "./reducer";

const { places } = queryString.parse(location.search);

// Initialising the store
const store = createStore(
  { loading: false, error: false, places: places.split(",") },
  reducer
);

// Initial state when opening the popup
store.dispatch({ type: "INIT" });

// Event delegation for DOM events in the popup
document.addEventListener("click", e => {
  // Toggle city list info
  if (e.target && e.target.classList.contains("place-name")) {
    console.log(e.target.classList);
    if (e.target.parentNode.classList.contains("closed")) {
      e.target.parentNode.classList.remove("closed");
    } else {
      e.target.parentNode.classList.add("closed");
    }
  }

  // Search hotels for an itinerary
  if (e.target && e.target.id === "search") {
    console.log("search");
    const state = store.getState();

    store.dispatch({
      type: "LOADING",
      request: () => {
        console.log("request");
        Promise.all(
          state.places.map(place =>
            fetch(`http://127.0.0.1:5000/hotel/city?name=${place}`).then(res =>
              res.json()
            )
          )
        )
          .then(data =>
            store.dispatch({ type: "SUCCESS", payload: { hotels: data } })
          )
          .catch(_ => store.dispatch({ type: "ERROR" }));
      }
    });
    console.log("search");
  }

  // Book an itinerary
  if (e.target && e.target.id === "book") {
    store.dispatch({ type: "LOADING" });
    console.log("book");
  }
});
