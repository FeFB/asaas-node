const got = require('got');
const {
	Observable
} = require('rxjs');
const Util = require('./Util/index');


function Accounts(api, apiKey) {
	const util = new Util(api, apiKey);

	/**
	 * @param  {accountInfo}
	 * @param {accountInfo.name}	The name of Account [required]
	 * @param {accountInfo.email} [required]
	 * @param {accountInfo.cpfCnpj} [required]
	 * @param {accountInfo.companyType} It can be: MEI, LIMITED, INDIVIDUAL, ASSOCIATION
	 * @param {accountInfo.phone} [required]
	 * @param {accountInfo.mobilePhone} [required] 
	 * @param {accountInfo.address}  Logradouro [required]
	 * @param {accountInfo.addressNumber}  [required]
	 * @param {accountInfo.complement} 
	 * @param {accountInfo.province} Bairro [required]
	 * @param {accountInfo.postalCode} [required]
	 * @return {Observable<Error> || Observable<body>}
	 */
	this.new = function(accountInfo) {
		const options = util.ACCOUNTS('post');
		const {
			url
		} = options;

		const {
			name,
			email,
			cpfCnpj,
			phone,
			mobilePhone,
			address,
			addressNumber,
			province,
			postalCode,
		} = accountInfo;

		if (!name || !email || !cpfCnpj || !phone || !mobilePhone || !address ||
			!addressNumber || !province || !postalCode)
			return Observable.throw(new Error('Some required Props wasnt informed'));

		return Observable.fromPromise(got(url, {
				...options,
				body: JSON.stringify(accountInfo)
			}))
			.map((res) => JSON.parse(res.body));

	}
}

module.exports = Accounts;