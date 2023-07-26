let cities = [
  {
    englishName: "Cairo",
    isoName: "Al Qāhirah",
  },
  {
    englishName: "Giza",
    isoName: "Al Jīzah",
  },
  {
    englishName: "Alexandria",
    isoName: "Al Iskandarīyah",
  },
  {
    englishName: "South Sinai",
    isoName: "Janūb Sīnā'",
  },
  {
    englishName: "North Sinai",
    isoName: "Shamāl Sīnā'",
  },
  {
    englishName: "Damietta",
    isoName: "Dumyāţ",
  },
  {
    englishName: "	Port Said",
    isoName: "Būr Sa‘īd",
  },
  {
    englishName: "Sohag",
    isoName: "Sūhāj",
  },
];

for (let city of cities) {
  const option = `
    <option class='text-black' >${city.englishName}</option>
    `;
  document.getElementById("cities-select").innerHTML += option;
}

document
  .getElementById("cities-select")
  .addEventListener("change", function () {
    let cityName = "";
    for (let city of cities) {
      if (city.englishName == this.value) {
        cityName = city.isoName;
      }
    }
    getPrayerByCityName(cityName);

    document.getElementById("city-name").innerHTML = this.value;
  });

function getPrayerByCityName(cityName) {
  let params = {
    country: "EG",
    city: cityName,
  };

  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let timings = response.data.data.timings;
      document.getElementById("fagr-date").innerHTML = timings.Fajr;
      document.getElementById("sunrise-date").innerHTML = timings.Sunrise;
      document.getElementById("dhuhr-date").innerHTML = timings.Dhuhr;
      document.getElementById("asr-date").innerHTML = timings.Asr;
      document.getElementById("maghrib-date").innerHTML = timings.Maghrib;
      document.getElementById("isha-date").innerHTML = timings.Isha;

      // let date = response.data.data.date.gregorian
      // console.log(date)

      // let date = response.data.data
      // console.log(date)
      let mainDate = response.data.data.date.readable;

      document.getElementById("main-date").innerHTML = mainDate;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPrayerByCityName("Al Qāhirah");