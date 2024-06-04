const container = document.querySelector(".container");

const input = document.getElementById("input");
const btn = document.getElementById("btn");

function fetchCountry(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((response) => response.json() || console.log(response))
    .then((datas) => renderCountry(datas));
}

function renderCountry(country) {
  // console.log("clicked");
  // console.log(country);

  const flag = country[0].flags.png;
}

btn.addEventListener("click", () => {
  fetchCountry(input.value);
});
fetchCountry();
