// Docs:
// https://github.com/peter-murray/node-hue-api

require('dotenv').config();

const hue = require('node-hue-api');
const LightInfo = require('./libs/light_info');

const username = process.env.USERNAME;

const HueApi = hue.HueApi;
const lightState = hue.lightState;

function Main(bridge) {
  const host = bridge[0].ipaddress;
  const api = new HueApi(host, username);
  const lightInfo = new LightInfo(api);
  lightInfo.getAll(true);
};

// Discover bridges
hue.nupnpSearch().then(Main).done();
