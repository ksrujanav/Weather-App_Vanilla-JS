let appId = "bd1d4cbb1cb75a718145ab731cf451fc"; //API key from openweather
let units = "imperial"; //use imperial for farenheit; use metric for centigrade
let searchZip = "zip";
let searchCity = "city";
let count = 0;

document.getElementById("searchBtn").addEventListener("click", () => {
  count++;
  let zipInput = document.getElementById("searchInput").value;
  if (zipInput) {
    searchCityWeather(zipInput);
    if (count == 1) createTable();
  }
});

function checkInputZip(zipInput) {
  if (zipInput.length === 5 && Number.parseInt(zipInput) + "" === zipInput)
    searchZip = "zip";
  else {
    document.getElementById("errorZip").innerHTML =
      "Please enter a valid zip code";
  }
}

function searchCityWeather(zipInput) {
  checkInputZip(zipInput);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchZip}=${zipInput}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(res => {
      init(res, zipInput);
    });
}

function init(resultFromServer, zipInput) {
  console.log(zipInput);
  console.log(resultFromServer);

  addCityWeatherRow(resultFromServer, zipInput);
}

var tableHeaders = new Array();
tableHeaders = ["Save", "City", "Current-Weather"];

function createTable() {
  var weatherTable = document.createElement("table");
  weatherTable.setAttribute("id", "weatherTable"); // SET THE TABLE ID.

  var tr = weatherTable.insertRow(-1);

  for (var h = 0; h < tableHeaders.length; h++) {
    var th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = tableHeaders[h];
    tr.appendChild(th);
  }

  var div = document.getElementById("weatherContainer");
  div.appendChild(weatherTable); // ADD THE TABLE TO YOUR WEB PAGE.
}

function addCityWeatherRow(resultFromServer, zipInput) {
  var icon =
    "http://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";
  var weatherTab = document.getElementById("weatherTable");

  var rowCnt = weatherTab.rows.length; // GET TABLE ROW COUNT.
  var tr = weatherTab.insertRow(rowCnt); // TABLE ROW.
  //tr = weatherTab.insertRow(rowCnt);

  for (var c = 0; c < tableHeaders.length; c++) {
    var td = document.createElement("td"); // TABLE DEFINITION.
    td = tr.insertCell(c);

    switch (c) {
      case 0:
        var button = document.createElement("input");
        // SET INPUT ATTRIBUTE.
        button.setAttribute("type", "button");
        button.setAttribute("value", "X");
        button.setAttribute("class", "saveBtn");
        button.setAttribute("id", "saveRow");
        // ADD THE BUTTON's 'onclick' EVENT.
        button.setAttribute("onclick", "removeRow(this)");
        td.appendChild(button);
        break;
      case 1:
        // CREATE CELL.
        td.innerHTML = resultFromServer.name;
        td.setAttribute("class", "city");
        td.setAttribute("onClick", "show10DayForecast(" + zipInput + ")");
        td.setAttribute("id", "cityName");
        //td.appendChild(td);
        break;
      case 2:
        // CREATE CELL.
        td.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
        td.setAttribute("class", "tempAndIcon");
        var icon = document.createElement("img");
        icon.setAttribute("class", "weatherIcon");
        icon.src =
          "http://openweathermap.org/img/w/" +
          resultFromServer.weather[0].icon +
          ".png";
        td.appendChild(icon);
        break;
      default:
        break;
    }
  }
}
// DELETE TABLE ROW.
function removeRow(oButton) {
  var weatherTab = document.getElementById("weatherTable");
  weatherTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // BUTTON -> TD -> TR.
}

function show10DayForecast(oCity) {
  let cityInput = document.getElementById("cityName").value;
  // if (zipInput)
  console.log(cityInput);
  searchCityForecast(cityInput);
  document.location.href = "./dayForecast.html";
}
function searchCityForecast(cityInput) {
  //checkInputZip(zipInput);
  console.log(cityInput);
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast/daily?${searchCity}=${cityInput}&APPID=${appId}`
  )
    .then(result => {
      return result.json();
    })
    .then(res => {
      init_forecast(res);
    });
}
function init_forecast(resultFromServer) {
  console.log(resultFromServer);
}
function goBack() {
  window.history.back();
  if (typeof Storage !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("result").innerHTML =
      "You have clicked the button " + localStorage.clickcount + " time(s).";
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
}
