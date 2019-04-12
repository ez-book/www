// Define DOM elements
const $loading = document.querySelector(".loading");
const $text = document.querySelector(".text");
const $places = document.querySelector(".places");
const $button = {
  search: document.querySelector("#search"),
  book: document.querySelector("#book")
};

// UI = f(state)
const ui = {
  loading: _ => {
    $loading.classList.remove("hidden");
    $text.innerText = "";
    $places.innerHTML = "";
    $button.search.classList.add("hidden");
    $button.book.classList.add("hidden");
  },
  error: ({ text }) => {
    $loading.classList.add("hidden");
    $text.innerText = text;
    $places.innerHTML = "";
    $button.search.classList.add("hidden");
    $button.book.classList.add("hidden");
  },
  generate: ({ text, data }) => {
    $loading.classList.add("hidden");
    $text.innerText = text;
    $places.innerHTML = "";
    $places.innerHTML = data && data.places
      .map(place => `
        <li class="place">
          <span class="place-name">${place}<span>
        </li>
      `)
      .join("");
    $button.search.classList.remove("hidden");
    $button.book.classList.add("hidden");

    // Make the list sortable
    const sortable = new Sortable.default($places, {
      draggable: ".place"
    });

    sortable.on("sortable:start", () => console.log("sortable:start"));
    sortable.on("sortable:sort", () => console.log("sortable:sort"));
    sortable.on("sortable:sorted", () => console.log("sortable:sorted"));
    sortable.on("sortable:stop", () => console.log("sortable:stop"));
  }
};

export const updateUI = state => {
  if (state.loading) {
    ui.loading(state);
  } else if (state.error) {
    ui.error(state);
  } else {
    ui.generate(state);
  }
};
