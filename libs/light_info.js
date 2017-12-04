const fs = require('fs');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class LightInfo {

  constructor(api) {
    this.api = api;
  }

  writeOut(output, file) {
    fs.writeFile(file, output, (err) => {
      if(err) {
       return console.log(err);
      }
      console.log(`Saved output to ${file}`);
    });
  }

  displayError(err) {
    console.log(err);
  }

  getAll(output) {
    this.getUsers(output);
    this.getLights(output);
    this.getBridgeConfig(output);
    this.getGroups(output);
  }

  getUsers(output) {
    const out = (result) => {
      const users = JSON.stringify(result, null, 2);
      if (output) {
        console.log(users);
      }
      this.writeOut(users, './info/users.json');
    }
    return this.api.registeredUsers()
      .then(out)
      .fail(this.displayError).done();
  }

  getLights(output) {
    const out = (result) => {
      const lights = JSON.stringify(result, null, 2);
      if (output) {
        console.log(lights);
      }
      this.writeOut(lights, './info/lights.json');
    }
    return this.api.lights()
      .then(out)
      .fail(this.displayError).done();
  }

  getBridgeConfig(output) {
    const out = (result) => {
      const bridge = JSON.stringify(result, null, 2);
      if (output) {
        console.log(bridge);
      }
      this.writeOut(bridge, './info/bridge.json');
    }
    this.api.config()
      .then(out)
      .fail(this.displayError).done();
  }

  getGroups(output) {
    const out = (result) => {
      const groups = JSON.stringify(result, null, 2);
      if (output) {
        console.log(groups);
      }
      this.writeOut(groups, './info/groups.json');
    }
    return this.api.groups()
      .then(out)
      .fail(this.displayError).done();
  }
}

module.exports = LightInfo;
