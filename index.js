// Docs:
// https://github.com/peter-murray/node-hue-api
require('dotenv').config();
const fs = require('fs');
const hue = require('node-hue-api');
const HueApi = hue.HueApi;
const username = process.env.USERNAME;
const LightMaster = require('./light_master');

function Main(bridge) {
  const host = bridge[0].ipaddress;
  const api = new HueApi(host, username);
  const lightMaster = new LightMaster(api);
  //lightMaster.flickerLight(30);
  lightMaster.allOn(20);
  // lightMaster.goColor(15, 0, 200, 20); // Green
  // lightMaster.goColor(15, 255, 0, 0); // Red
  // lightMaster.slowColorGroup('Dining Room', 255, 0, 0, 10, 1000);
};


// Discover bridges
hue.nupnpSearch().then(Main).done();
