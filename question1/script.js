const container = document.querySelector(".container");
const loading = document.querySelector(".loading");

const input = document.getElementById("input");
const btn = document.getElementById("btn");

const countryDiv = document.querySelector(".country");
const countryflag = document.getElementById("countryflag");
const countryName = document.getElementById("country-name");
const capital = document.getElementById("capital");
const continent = document.getElementById("continent");
const population = document.getElementById("population");
const currencies = document.getElementById("currencies");
const languages = document.getElementById("languages");

function fetchCountry(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((response) => response.json() || console.log(response))
    .then((datas) => renderCountry(datas));
}

function renderCountry(country) {
  // console.log("clicked");

  countryDiv.style.display = "block";

  const flag = country[0].flags.png;
  countryflag.src = flag;

  countryName.innerHTML = input.value.toUpperCase();

  let language = Object.values(country[0].languages);
  let currencie = Object.values(country[0].currencies);

  capital.innerHTML = "capital: " + country[0].capital[0];
  continent.innerHTML = "continent: " + country[0].continents[0];
  population.innerHTML = "population: " + country[0].population;
  currencies.innerHTML = "currencies: " + currencie[0].name;
  languages.innerHTML = "languages: " + language;
  loading.style.display = "none";
}

btn.addEventListener("click", () => {
  loading.style.display = "block";
  fetchCountry(input.value);
});
