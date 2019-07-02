'use strict';

/**
 * AWS Lambda handler configured to host ST Schema connector
 */

const connector = require('./connector')

exports.handler = async (evt, context) => {
	await connector.handleLambdaCallback(evt, context);
};
