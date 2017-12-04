// Docs:
// https://github.com/peter-murray/node-hue-api
require('dotenv').config();
const fs = require('fs');
const hue = require('node-hue-api');
const lightState = hue.lightState;
const HueApi = hue.HueApi;
const username = process.env.USERNAME;
const { LightMaster, getRandomInt } = require('./libs/light_master');

const familyRoomLights = ["43", "45", "46", "47"];
const transition = 1000;
let brightness = 80;

function pulseColors(lightMaster) {
  familyRoomLights.forEach((lightId) => {
    setInterval(() => {
      let r = getRandomInt(0,255);
      let g = getRandomInt(0,255);
      let b = getRandomInt(0,255);
      lightMaster.setLight(lightId, lightState.create()
        .on()
        .rgb(r, g, b)
        .brightness(brightness)
        .transition(transition)
      );
      brightness = brightness > 0 ? 0 : 80;
    }, transition);
  });
}

function christmasLights(lightMaster) {
  familyRoomLights.forEach((lightId) => {
    lightMaster.setLight(lightId, lightState.create()
      .on()
      .white(450, 100)
      .transition(transition)
    );
  });
}

function Main(bridge) {
  const host = bridge[0].ipaddress;
  const api = new HueApi(host, username);
  const lightMaster = new LightMaster(api);

  christmasLights(lightMaster);
};


// Discover bridges
hue.nupnpSearch().then(Main).done();
