var async = require('async');

var fn1 = () => {
	console.log('fn1')
	return Promise.resolve(1)
}

var fn2 = () => {
	return new Promise(resolve => {
		console.log('fn2')
		setTimeout(() => resolve(2), 2000)
	});
}


var fn3 = () => {
	return new Promise(resolve => {
		console.log('fn3')
		setTimeout(() => resolve(3), 2000)
	});
} 




var promiseReduce = function(asyncFunctions, reduce, initialValue) {
	 var p = Promise.resolve(1);

	 asyncFunctions.forEach(func =>
      p = p.then(
      	(a) => {    
      		initialValue=reduce(initialValue,a);
      		return func();
      	}
      ) 
 	 );

 	 p = p.then(
      	(a) => {    
      		return new Promise(resolve => {
				initialValue=reduce(initialValue,a);
				resolve(initialValue);
			});
      	}
      ) 

	 return p;

};


promiseReduce([fn1, fn2, fn3], function (memo, value) {console.log('reduce'); return memo * value}, 1 ).then(function(a) {
  console.log(a);
});
