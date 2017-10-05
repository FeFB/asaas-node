const got = require('got');
const {
	Observable
} = require('rxjs');
const Util = require('./Util/index');

function Payments(api, apiKey) {

	const util = new Util(api, apiKey);

	/**
	* @param  {payment} Information about the payment
	* @param {payment.customer} The Customer Id of ASAAS [required]
	* @param {payment.billingType} The Type of the bill, can be: BOLETO, CREDIT_CARD ou UNDEFINED [required]
	* @param {payment.value} The billing Value [required]
	* @param {payment.dueData} Due Data. Formatt: YYYY-MM-DD [required]
	* @param {payment.description}
	* @param {payment.externalReference} Free Field for search
	* @param {payment.installmentCount} The number of parcels (Just for Parcel billing)
	* @param {payment.installmentValue} The value of each parcel
	* @return {Observable<Error> || Observable<body>}
	*/
	this.new = function(payment) {

		const options = util.PAYMENTS('post');
		const {
			url
		} = options;

		const {
			customer,
			billingType, //BOLETO || CREDIT_CARD || UNDEFINED
			value,
			dueDate, //Data de Vencimento
		} = payment;

		if (!customer || !billingType || !value || !dueDate)
		return Observable.throw(new Error('The Object is missing some required prop'))

		if (billingType !== 'BOLETO' && billingType !== 'CREDIT_CARD' && billingType !== 'UNDEFINED')
		return Observable.throw(new Error('billingType must be one of three values: BOLETO, CREDIT_CARD, UNDEFINED'));

		return Observable.fromPromise(got(url, {
			...options,
			body: JSON.stringify(payment)
		}))
		.map((res) => JSON.parse(res.body));

	}
	/**
	* For a batch of new payments, just pass an Array<payment>
	* @param  {Array<payment>} payments Array that holds de payments information object
	* @return {Observable<response[]>}  The observer will recive a Array with the response.
	* Do not use (err) function, the error will came in the Array, just .map the array to find if a error happened.
	*/
	this.newBatch = function(payments) {
		let paymentsBatch = new Array();

		payments.forEach(payment => {
			paymentsBatch.push(
				this.new(payment)
				.catch((err)=> Observable.of(err))
			);
		});

		return Observable.forkJoin(paymentsBatch);
	}
	
	/**
	* @param  {paymentInfo} - The Payment Object with all the props needed. Same props than this.new(payment)
	* @param {split} [Array<splitInfo>] The information about the wallets to split.
	* @param {splitInfo.walletId} The id of the wallet. (It is returned when is created) [required]
	* @param {splitInfo.fixedValue} The fixed Value to be transferred  to the walletId
	* @param {splitInfo.percentualValue} The percentual to send to the walletId
	* @param  {Array<Object>} - An Array with the WalletsInfo as Object for the Split
	* @return {Observable<Body> || Observable<Error>}
	*/
	this.newSplit = function(paymentInfo, split) {
		const options = util.PAYMENTS('post');
		const url = options.url;

		const {
			customer,
			billingType, //BOLETO || CREDIT_CARD || UNDEFINED
			value,
			dueDate, //Data de Vencimento
		} = paymentInfo;

		if (!customer || !billingType || !value || !dueDate)
		return Observable.throw(new Error('The Object is missing some required prop'))

		if (billingType !== 'BOLETO' && billingType !== 'CREDIT_CARD' &&
		billingType !== 'UNDEFINED')
		return Observable.throw(new Error('billingType must be one of three values: BOLETO, CREDIT_CARD, UNDEFINED'));

		if (Array.isArray(split) === false)
		return Observable.throw(new Error('An array must be send with the split information'));

		split.map((splitObj) => {
			const {
				walletId,
				fixedValue,
				percentualValue
			} = splitObj;

			if (typeof walletId !== 'string')
			return Observable.throw(new Error('Some Split Object has not the walletId String '));

			if (!fixedValue && !percentualValue)
			return Observable.throw(new Error('Some Split Object has not a fixedValue and percentualValue'));
		});


		paymentInfo.split = split;

		return Observable.fromPromise(got(url, {
			...options,
			body: JSON.stringify(paymentInfo)
		}))
		.map((res) => JSON.parse(res.body));

	}

	this.get = function(paymentId) {
		const options = util.PAYMENTS('get');
		const url = options.url;

		if (!paymentId)
		return Observable.throw(new Error('a paymentId must be send'));

		return Observable.fromPromise(got(url, {
			...options,
			body: JSON.stringify({
				id: paymentId
			})
		}))
		.map((res) => JSON.parse(res.body));
	}

	this.delete = function(paymentId) {
		const options = util.PAYMENTS('delete');
		const {
			url
		} = options;


		if (!paymentId)
		return Observable.throw(new Error('a paymentId must be send'));

		return Observable.fromPromise(got(url, {
			...options,
			body: JSON.stringify({
				id: paymentId
			})
		}))
		.map((res) => JSON.parse(res.body));
	}


	/**
	* Return a Array<paymentInf> from the filters props
	* @param  {Object} filters  The Object with the props filters
	* @param {String} filters.customer Filter by the customer id
	* @param {Enum} filters.billingType  - Filter by the type: BOLETO, CREDIT_CARD
	* @param {Enum} filters.status  - Filter by status: RECEIVED,
	* @param {String} filters.subscription - Filter by the id of assignature
	* @param {String} filters.installment  - Filter by the id of the installment
	* @param {String} filters.externalReference - Filter by the id linked with another system.
	* @param {String} filters.paymentDate
	* @param {Number} filters.offset
	* @param {Number} filters.limit  Size of the return array
	* @return {Observable<Error> || Observable<body>}
	*/
	this.getList = function(filters) {
		const options = util.PAYMENTS('get');
		const url = options.url;

		return Observable.fromPromise(got(url, {
			...options,
			body: JSON.stringify(filters)
		}))
		.map((res) => JSON.parse(res.body));



	}

	//missing test
	this.update = function(id, params) {
		const options = util.PAYMENTS('get');

		const {
			customer,
			billingType,
			value,
			dueDate
		} = params;

		if (!id)
		return Observable.throw(new Error('Id is required'))

		if (!customer || !billingType || !value || !dueDate)
		return Observable.throw(new Error('Some required params is missing'))

		const url = options.url + '/' + id;

		return Observable.fromPromise(got(url, {...options,
			body: JSON.stringify(params)
		}))
		.map((res) => JSON.parse(res));

	}

	//missing test
	this.refund = function(id) {
		const options = util.PAYMENTS('post');

		if (!id)
		return Observable.throw(new Error('Id is required'));

		const url = options.url + '/' + id + '/refund';

		return Observable.fromPromise(got(url, options))
		.map((res) => JSON.parse(res));

	}
}

module.exports = Payments;
