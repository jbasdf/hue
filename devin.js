// Docs:
// https://github.com/peter-murray/node-hue-api
require('dotenv').config();
const fs = require('fs');
const hue = require('node-hue-api');
const lightState = hue.lightState;
const HueApi = hue.HueApi;
const username = process.env.USERNAME;
const { LightMaster, getRandomInt } = require('./libs/light_master');

function Main(bridge) {
  const host = bridge[0].ipaddress;
  const api = new HueApi(host, username);
  const lightMaster = new LightMaster(api);
  const boysLightId = "4";

  const transition = 1000;
  let brightness = 80;

  setInterval(() => {
    let r = getRandomInt(0,255);
    let g = getRandomInt(0,255);
    let b = getRandomInt(0,255);
    lightMaster.setLight(boysLightId, lightState.create()
      .on()
      .rgb(r, g, b)
      .brightness(brightness)
      .transition(transition)
    );
    brightness = brightness > 0 ? 0 : 80;
  }, transition);
};


// Discover bridges
hue.nupnpSearch().then(Main).done();
