export const GetImageByIconId = (id: string) => {
  {
    switch (id) {
      case '01d':
        return require('../../img/weather/006-sun.png');
      case '01n':
        return require('../../img/weather/021-night.png');
      case '02d':
        return require('../../img/weather/029-cloudy-day.png');
      case '02n':
        return require('../../img/weather/030-cloudy-night-2.png');
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return require('../../img/weather/045-cloudy.png');
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return require('../../img/weather/042-rain.png');
      case '11d':
      case '11n':
        return require('../../img/weather/044-storm.png');
      case '13d':
      case '13n':
        return require('../../img/weather/043-snowing.png');
      case '50d':
        return require('../../img/weather/008-foggy-day.png');
      case '50n':
        return require('../../img/weather/036-foggy-night-2.png');
      default:
    }
    return require('../../img/weather/006-sun.png');
  }
};
