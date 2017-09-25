const got = require('got');
const {
  Observable
} = require('rxjs');
const Util = require('./Util/index');

function Customer(api, apiKey) {

  const util = new Util(api, apiKey);


  /**
   * @param  {customer} Information about the customer
   * @param {customer.name} The fullname of the customer [required]
   * @param {customer.cpfCnpj} The CPF or CNPJ of the customer [required]
   * @param {customer.email}  The email
   * @param {customer.phone} 
   * @param {customer.mobilePhone}  
   * @param {customer.address} Logradouro
   * @param {customer.addressNumber}  
   * @param {customer.complement} 
   * @param {customer.province} Bairro
   * @param {customer.postalCode} CEP
   * @param {customer.externalReference} An id for this customer from another system
   * @param {customer.notificationDisabled} If true, the customer notification is disabled
   * @param {customer.additionalEmails} Extra emails for notificaitons. It is string, can be split by ,
   * @return {Observable<Error> || Observable<body>}
   */
  this.new = function(customer) {

    const options = util.customers('post');
    const {
      url
    } = options;
    const {
      name,
      cpfCnpj
    } = customer;

    if (!customer || typeof customer !== 'object')
      return Observable.throw(new Error(
        'Customer is undefined or is not an object'));

    if (!name || !cpfCnpj)
      return Observable.throw(new Error(
        'The name and cpfCnpj props are required'));


    return Observable.fromPromise(got(url, {
        ...options,
        body: JSON.stringify(customer)
      }))
      .map((res) => JSON.parse(res.body));
  }

  //Detete a customer bu the customerId
  this.delete = function(customerId) {
    const options = util.customers('delete');

    if (!customerId || typeof customerId !== 'string')
      return Observable.throw(new Error('id must be a string'));

    const url = options.url + '/' + customerId;

    return Observable.fromPromise(got(url, {
        ...options,
        body: customerId
      }))
      .map((res) => JSON.parse(res.body))
  }

  //Get a customer object by the customerId
  this.get = function(customerId) {
    const options = util.customers('get');

    if (!customerId || typeof customerId !== 'string')
      return Observable.throw(new Error('id must be a string'));

    const url = options.url + '/' + customerId;

    return Observable.fromPromise(got(url, {
        ...options,
        body: customerId
      }))
      .map((res) => JSON.parse(res.body));
  }


  /**
   * @param  {params} The props about the filter for get the list
   * @param {params.name} An customer Name
   * @param {params.email} An customer Email
   * @param {params.cpfCnpj} An customer CPF or CNPJ
   * @param {params.externalReference} An customer external ID
   * @param {params.offset} The initial element of the list
   * @param {params.limit} The elements number of the list (max:50)
   * @return {Observable<Error> || Observable<body>}
   */
  this.getList = function(params) {
    const options = util.customers('get');

    const {
      name,
      email,
      cpfCnpj,
      externalReference,
      offset,
      limit
    } = params;

    if (!name && !email && !cpfCnpj && !externalReference)
      return Observable.throw(new Error('Some props filter must be send'));

    const url = options.url;
    options.body = JSON.stringify(params);
    console.log(url);
    return Observable.fromPromise(got(url, options))
      .map((res) => JSON.parse(res.body));

  }

  /**
   * @param  {id} The customer id shoud be update
   * @param  {attributes} The customer information as the customer object from this.new(customer)
   * @return {Observable<Error> || Observable<body>}
   */
  this.update = function(id, attributes) {

    const options = util.customers('post');

    const {
      name,
      cpfCnpj
    } = attributes;

    if (!id || typeof id !== 'string')
      return Observable.throw(new Error('id must be a string'));

    if (!name || !cpfCnpj)
      return Observable.throw(new Error('name and cpfCnpj are required'));

    const url = options.url + '/' + id;
    console.log('URL: ' + url);

    return Observable.fromPromise(got(url, {
        ...options,
        body: JSON.stringify(attributes)
      }))
      .map((res) => JSON.parse(res.body));
  }
}

module.exports = Customer;