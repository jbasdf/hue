//
// This code will register a new user with the hue bridge.
// Before running the code press the button the hue bridge.
// The output will then be a username that can be used by index.js

const _ = require("lodash");
const hue = require("node-hue-api");

const HueApi = hue.HueApi;

const displayUserResult = function(result) {
  console.log("Created user: " + JSON.stringify(result));
};

const displayError = function(err) {
  console.log(err);
};

const displayBridges = function(bridge) {
  console.log("Hue Bridges Found: " + JSON.stringify(bridge));
  const host = bridge[0].ipaddress;
  const userDescription = 'Hue Javascript Hacks';

  const hueInst = new HueApi();

  hueInst.registerUser(host, userDescription)
    .then(displayUserResult)
    .fail(displayError)
    .done();
};

// --------------------------
// Using a promise
hue.nupnpSearch().then(displayBridges).done();

module.exports = {
  paths,
  outputPaths,
  apps,
  hotPort,
  isProduction,
};
