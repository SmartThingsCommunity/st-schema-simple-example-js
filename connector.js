'use strict';

/**
 * ST Schema connector
 */

const {SchemaConnector, DeviceErrorTypes} = require('st-schema')
const deviceStates = { switch: 'off', level: 100}
const connector = new SchemaConnector()
    .enableEventLogging(2)
    .discoveryHandler((accessToken, response) => {
      response.addDevice('external-device-1', 'Test Dimmer', 'c2c-dimmer')
    })
    .stateRefreshHandler((accessToken, response) => {
      response.addDevice('external-device-1', [
        {
          component: 'main',
          capability: 'st.switch',
          attribute: 'switch',
          value: deviceStates.switch
        },
        {
          component: 'main',
          capability: 'st.switchLevel',
          attribute: 'level',
          value: deviceStates.level
        }
      ])
    })
    .commandHandler((accessToken, response, devices) => {
      for (const device of devices) {
        const deviceResponse = response.addDevice(device.externalDeviceId);
        for (const cmd of device.commands) {
          const state = {
            component: cmd.component,
            capability: cmd.capability
          };
          if (cmd.capability === 'st.switchLevel' && cmd.command === 'setLevel') {
            state.attribute = 'level';
            state.value = deviceStates.level = cmd.arguments[0];
            deviceResponse.addState(state);

          } else if (cmd.capability === 'st.switch') {
            state.attribute = 'switch';
            state.value = deviceStates.switch = cmd.command === 'on' ? 'on' : 'off';
            deviceResponse.addState(state);

          } else {
            deviceResponse.setError(
                `Command '${cmd.command} of capability '${cmd.capability}' not supported`,
                DeviceErrorTypes.CAPABILITY_NOT_SUPPORTED)
          }
        }
      }
    });

module.exports = connector
