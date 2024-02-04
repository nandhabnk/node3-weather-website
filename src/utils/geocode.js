const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeUrl = `http://api.positionstack.com/v1/forward?access_key=1ed9a2afc5eda3163e60458a60466c9d&query=${address}`;

  request({ url: geocodeUrl, json: true }, function (error, response) {
    if (error) {
      callback("Unable to connect to positionstack service");
    } else if (response.body.error) {
      callback("Unable to find location co-ordinates");
    } else {
      const { latitude, longitude } = response.body?.data[0];
      callback(undefined, { latitude, longitude });
    }
  });
};

module.exports = geocode;
