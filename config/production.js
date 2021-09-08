const config = {
  server: {
    port: 4400,
    host: 'a-weather.kalaus.ru',
  },
  openweathermap: {
    appid: process.env.OPENWEATHER_APP_ID,
  },
};

module.exports = config;
