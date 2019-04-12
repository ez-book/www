import flatpickr from "flatpickr";

// Define DOM elements
const $loading = document.querySelector(".loading");
const $text = document.querySelector(".text");
const $places = document.querySelector(".places");
const $button = {
  search: document.querySelector("#search"),
  book: document.querySelector("#book")
};

const datepickerRanOnce = false;

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
  generate: ({ text, places, hotels, dates }) => {
    $loading.classList.add("hidden");
    $text.innerHTML = text ? text : "";
    $places.innerHTML = "";
    $places.innerHTML = places
      .map(
        (place, i) => `
        <li class="place closed">
          <span class="place-name">
            ${place}
            <input type="text" class="date" data-index="${i}" placeholder="Select the dates ..." value="${
              dates && dates[i] ? dates[i].join(" to ") : ""
            }"/>
          </span>
          <ul class="hotels">
            ${(hotels &&
              hotels[i].result) ?
              hotels[i].result
                .map(
                  hotel => `
              <li class="hotel">
                <span class="hotel-name">${hotel.hotel_name}</span>
              </li>
            `
                )
                .join("") : ''}
          </ul>
        </li>
      `
      )
      .join("");

    if (hotels && hotels.length === places.length) {
      $button.search.classList.add("hidden");
      $button.book.classList.remove("hidden");
    } else {
      $button.search.classList.remove("hidden");
      $button.book.classList.add("hidden");
    }

    // Initialise date picker
    flatpickr(".date", { mode: "range", minDate: "today" });
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
