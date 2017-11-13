This is a work in progress but demonstrates how to use some functionality in the (node hue api)[https://github.com/peter-murray/node-hue-api]

# Steps
1. Run `node register.js` and push the button on your hue bridge to get a username.
2. Add the username to .env ie USERNAME=xxxxxxxxxxxxx
3. Run `node get_lights.js` to write lights.json which will contain a json description of all your lights.
4. Run 'node index.js'