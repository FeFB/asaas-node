# ASAAS-NODE
The project is a wrapper for the ASAAS' Restful API. The project is 
using RxJS, so you must know something about.

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
const asaasAPI = require('asaas-node');
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
customer.add(customerInfo)
	.subscribe(
		(data) => console.log(data),
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
		(data) => console.log(data),
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
		(data) => console.log(data),
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
		(res) => console.log(res),
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
		(res) => console.log(res),
		(err) => console.log(err)
	);
```
