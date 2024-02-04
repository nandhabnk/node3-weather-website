const request = require("postman-request");

const forecast = ({ latitude, longitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3e0c34a47cda35d021c55a746211758b&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weatherstack service");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      const { weather_descriptions, temperature, feelslike } =
        response.body.current;
      const { name, region, country } = response.body.location;
      callback(undefined, {
        location: `${name}, ${region}, ${country}`,
        weather: `${weather_descriptions[0]}, temperature:${temperature}, feelslike:${feelslike}`,
      });
    }
  });
};

module.exports = forecast;
