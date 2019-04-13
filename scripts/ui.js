import flatpickr from "flatpickr";

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
              hotels[i].result.slice(0, 1)
                .map(
                  hotel => `
              <li class="hotel">
                <img src="${hotel.hotel_data.hotel_photos[0].url_square60}" alt="${hotel.hotel_name}" class="picture" />
                <span class="hotel-info">
                  <span class="hotel-name">${hotel.hotel_name}</span>
                  <span class="hotel-address">${hotel.address}</span>
                  <span class="hotel-stars">
                    ${Array
                      .from({ length: parseInt(hotel.stars, 10)})
                      .map(_ => `★`).join("")}
                  </span>
                </span>
                <span class="booking-info">
                  <span class="hotel-review">
                    <span class="hotel-review-number">${hotel.review_score}</span>
                    <span class="hotel-review-text">${hotel.review_score_word}</span>
                  </span>
                  <span class="booking-price">
                    <span class="booking-price-number">${hotel.price}</span>
                    <span class="booking-price-currency">${hotel.hotel_currency_code}</span>
                  </span>
                </span>
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
