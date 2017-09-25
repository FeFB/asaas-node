const CUSTOMER = 'customers';
const PAYMENTS = 'payments';
const ACCOUNTS = 'accounts';
const NOTIFICATIONS = 'notifications';

function Util(api, apiKey) {

  this.customers = function(method) {
    const obj = {
      method: method,
      dataType: 'json',
      url: api + CUSTOMER,
      headers: {
        access_token: apiKey
      }
    }

    return obj;
  }

  this.PAYMENTS = function(method) {
    const obj = {
      method: method,
      dataType: 'json',
      url: api + PAYMENTS,
      headers: {
        access_token: apiKey
      }
    }

    return obj;
  }

  this.ACCOUNTS = function(method) {
    const obj = {
      method: method,
      dataType: 'json',
      url: api + ACCOUNTS,
      headers: {
        access_token: apiKey
      }
    }

    return obj;
  }

  this.NOTIFICATIONS = function(method) {
    return {
      method: method,
      dataType: 'json',
      url: api + CUSTOMER, //...v3/customers/{customer_id}/notifications
      headers: {
        access_token: apiKey
      }
    }
  }
}
module.exports = Util;