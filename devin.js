// Docs:
// https://github.com/peter-murray/node-hue-api
require('dotenv').config();
const fs = require('fs');
const hue = require('node-hue-api');
const HueApi = hue.HueApi;
const username = process.env.USERNAME;
const { LightMaster, getRandomInt } = require('./libs/light_master');

function Main(bridge) {
  const host = bridge[0].ipaddress;
  const api = new HueApi(host, username);
  const lightMaster = new LightMaster(api);
  const boysLightId = "4";

  // setInterval(function(){
  // 	lightMaster.goColor(
  // 		boysLightId,
  // 		getRandomInt(0, 255),
  // 		getRandomInt(0, 255),
  // 		getRandomInt(0, 255));
  // }, 5000);

  lightMaster.flickerLight(boysLightId);
};


// Discover bridges
hue.nupnpSearch().then(Main).done();
