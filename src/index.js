const Customer = require('./Customer');
const Payments = require('./Payments');
const Accounts = require('./Accounts');
const Notification = require('./Notification');


const SAND_BOX_LINK = 'https://sandbox.asaas.com/api/v3/';
const PRODUCTION_LINK = 'https://www.asaas.com/api/v3/';

const SANB_BOX_V2 = 'https://sandbox.asaas.com/api/v2/';

const asaasAPI = function(mode, apiKey) {

	const link = ((mode === 'sandbox') ? SAND_BOX_LINK : PRODUCTION_LINK);
	this.customer = new Customer(link, apiKey);
	this.payments = new Payments(link, apiKey);
	this.accounts = new Accounts(SANB_BOX_V2, apiKey);
	this.notification = new Notification(link, apiKey);
}

module.exports = asaasAPI;