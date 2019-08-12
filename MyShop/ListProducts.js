var faker = require('faker');

function Products (){
	console.log('================================');
	console.log('Welcome TO my shops');
	console.log('================================');
	for(var i =0; i<10; i++){
		console.log(faker.commerce.productName(), '-', faker.commerce.price());

	}
}
Products();