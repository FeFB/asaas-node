const got = require('got');
const {
	Observable
} = require('rxjs');
const Util = require('./Util/index');

function Notification(api, apiKey) {
	const util = new Util(api, apiKey);

	this.get = function(customerId) {
		const options = util.customers('get');

		if (!customerId)
			return Observable.throw(new Error('An ID must be provided'));

		const url = options.url + '/' + customerId + '/notifications';

		return Observable.fromPromise(got(url, options))
			.map((res) => JSON.parse(res.body));
	}

	//see http://docs.asaasv3.apiary.io/#reference/0/notificacoes/atualizar-notificacao-existente
	this.update = function(id, params) {
		const options = util.NOTIFICATIONS('get');

		if (!id)
			return Observable.throw(new Error('An ID must be provided'));

		const url = options.url + '/' + id;

		return Observable.fromPromise(got(url, {
				...options,
				body: JSON.stringify(params)
			}))
			.map((res) => JSON.parse(res.body));
	}



}


module.exports = Notification;