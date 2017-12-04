const _ = require('lodash');
const hue = require('node-hue-api');
const lightState = hue.lightState;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randBrightness() {
  return getRandomInt(5,50);
}

function randTransition() {
  return getRandomInt(0,100);
}

function randColorTemp() {
  return getRandomInt(450,500);
}

class LightMaster {

  constructor(api) {
    this.api = api;
  }

  //
  // All Lights
  //
  allLights(stateFunc){
    return this.api.lights().then((lights) => {
      _.each(lights, (light) => {
        this.setLight(light['id'], stateFunc(light));
      });
    });
  }

  allOff(){
    return this.allLights((light) => {
      return lightState.create().off();
    });
  }

  allOn(whiteness){
    return this.allLights((light) => {
      return lightState.create()
        .on()
        .brightness(100)
        .white(whiteness, 100)
        .transition(200);
    });
  }

  //
  // Single Light
  //
  setLight(id, state) {
    return this.api.setLightState(id, state).done();
  }

  flickerLight(light) {
    const flickr = () => {
      if(getRandomInt(0,5) == 1){
        this.goDim(light);
      } else {
        setTimeout(flickr, getRandomInt(5,10));
      }
    };
    setTimeout(flickr, getRandomInt(5,10));
  }

  goDim(light) {
    return this.setLight(light, lightState.create()
      .on()
      .brightness(randBrightness())
      .white(randColorTemp(), randBrightness())
      .transition(randTransition()));
  }

  // Transition to a color with random brightness and whiteness
  goColor(light, r, g, b) {
    return this.setLight(light, lightState.create()
      .on()
      .rgb(r, g, b)
      .brightness(randBrightness())
      .white(randColorTemp(), randBrightness())
      .transition(randTransition())
    );
  }

  // Transition to color slowly
  slowColor(light, r, g, b) {
    return this.setLight(light, lightState.create()
      .on()
      .rgb(r, g, b)
      .brightness(100)
      .transition(1000));
  }

  // Haunted effect on a given light
  haunt(light, interval) {
    setInterval(() => {
      var on = getRandomInt(0,20);
      if(on == 1) {
        this.flickerLight(light);
      } else if(on == 2){
        this.goDim(light);
      }
    }, interval);
  }

  //
  // Light Groups
  //
  pulse(group, interval){
    const setState = () => {
      this.api.setGroupLightState(group, lightState.create()
        .longAlert()
      );
    }
    setState();
    setInterval(setState, interval);
  }

  slowColorGroup(group, r, g, b, brightness, transition) {
    return this.api.setGroupLightState(group, lightState.create()
      .on()
      .rgb(r, g, b)
      .brightness(brightness)
      .transition(transition)
    );
  }

}


module.exports = {
  LightMaster,
  getRandomInt
};
