# ASAAS-NODE
The project is an unofficial wrapper for the [ASAAS.com](https://www.asaas.com/) Rest API. 
The project is using RxJS, so you must know something about.

## Getting Started

## To-Do

- [x]	Customer API
- [x]	Payments Api
- [	]	Subscription Billing
- [x]	Notifications

###	Installing

```
npm install --save asaas-node
```
###	Example
How to use:

```
const asaas = require('asaas-node');
const api = new asaasAPI('sandbox', YOUR_API_KEY); 
/* you can use 'production' 
instead of 'sandbox'. 
The API_KEI must be from the correct environment.
*/

//Get Customer APIs
const customer = api.customer;
```

Adding a new customer :

```
const customerInfo = {
	name: 'Bruce Wayne',
	cpfCnpj: '37132385615',
	email: 'IamBatman@gmail.com'
} 

customer.new(customerInfo)
	.subscribe(
		(body) => console.log(body),
		(err) => console.log(err)
	);
```
```
'customerInfo' is an object with all the props that Asaas accepts.
```
Deleting a customer:
```
customer.delete(customerId)
	.subscribe(
		(body) => console.log(body),
		(err) => console.log(err)
	);
```
```
'customerId' is a string.
```
Getting a customer:

```
customer.get(cusutomerId)
	.subscribe(
		(body) => console.log(body),
		(err) => console.log(err)
	);

```
Updating a customer:
```
customerId : the id of the customer
customerInfo: the object with the props to update.
```

```
customer.update(customerId, customerInfo)
	.subscribe(
		(body) => console.log(body),
		(err) => console.log(err)
	);
```

Getting List.

```
customerPropsFilters: the object with the filters props.
```
```
customer.getList(customerPropsFilter)
	.subscribe(
		(body) => console.log(body),
		(err) => console.log(err)
	);
```
