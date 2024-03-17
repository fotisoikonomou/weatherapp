document.addEventListener("DOMContentLoaded", function () {
  //I use the Geolocation API to catch the current user's position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      
      async function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(long);
        console.log(lat);
        var api =
          "http://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          long +
          "&appid=89a532a21aa65995198edd25fb4c495d";

        try {
          let response = await fetch(api);
          let data = await response.json();
          var fTemp;
          let cTemp;
          let kTemp;
          let city;

          let tempSwap = true;
          let weatherType = data.weather[0].description;
          kTemp = data.main.temp;
          // let windSpeed = data.wind.speed;
          city = data.name;

          let country = data.sys.country;
          let description = data.weather.main;
          fTemp = (kTemp * (9 / 5) - 459.67).toFixed(2);
          cTemp = (kTemp - 273).toFixed(2);
          let windSpeed = data.wind.speed;

          let weatherType2 = data.weather[0].main;

          document.querySelector(
            "#temp"
          ).innerHTML = `The current temperature in ${city} is: <strong>${cTemp} &#8451;</strong>`;
          document.querySelector(
            "#type"
          ).innerHTML = `The weather is: <strong>${data.weather[0].main}</strong>`;

          tempSwap = true;
          document
            .querySelector(".change input[type='checkbox']")
            .addEventListener("change", function () {
              if (tempSwap === false) {
                document.querySelector(
                  "#temp"
                ).innerHTML = `The current temperature in ${city} is: <strong>${fTemp} &#8457;</strong>`;
                tempSwap = true;
              } else {
                document.querySelector(
                  "#temp"
                ).innerHTML = `The current temperature in ${city} is: <strong>${cTemp} &#8451;</strong>`;

                tempSwap = false;
              }
            });

          windSpeed = (2.237 * windSpeed).toFixed(1);

          document.querySelector(
            "#windSpeed"
          ).innerHTML = `The current wind speed is ${windSpeed} m/s`;
          document.querySelector(
            "#country"
          ).innerHTML = `Your country is  ${country}`;

          if (weatherType === "Clear") {
            document.querySelector("#image").style.backgroundImage =
              "url(http://openweathermap.org/img/w/01d.png)";
          } else if (weatherType === "Clouds") {
            document.querySelector("#image").style.backgroundImage =
              "url(http://openweathermap.org/img/w/03d.png)";
          } else if (weatherType === "Snow") {
            document.querySelector("#image").style.backgroundImage =
              "url(http://openweathermap.org/img/w/13d.png)";
          } else {
            document.querySelector("#image").style.backgroundImage =
              "url(http://openweathermap.org/img/w/01n.png)";
          }
        } catch (error) {
          console.error("Error fetching the weather data: ", error);
        }
      },
      function (error) {
        console.error("Geolocation error: ", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
