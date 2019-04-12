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
  generate: ({ text, places, hotels }) => {
    $loading.classList.add("hidden");
    $text.innerText = text;
    $places.innerHTML = "";
    $places.innerHTML = places
      .map(
        (place, i) => `
        <li class="place">
          <span class="place-name">${place}</span>
          <ul class="hotels">
            ${hotels &&
              hotels[i].result &&
              hotels[i].result
                .map(
                  hotel => `
              <li class="hotel">
                <span class="hotel-name">${hotel.hotel_data.name}</span>
              </li>
            `
                )
                .join("")}
          </ul>
        </li>
      `
      )
      .join("");
    $button.search.classList.remove("hidden");
    $button.book.classList.add("hidden");
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
