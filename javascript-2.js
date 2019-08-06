
const fn1 = () => {
	console.log('fn1')
	return Promise.resolve(1)
}

const fn2 = () => {
	return new Promise(resolve => {
		console.log('fn2')
		setTimeout(() => resolve(3), 2000)
	});
}


const fn3 = () => {
	return new Promise(resolve => {
		console.log('fn3')
		setTimeout(() => resolve(4), 2000)
	});
} 


const promiseReduce = async (asyncFunctions, reduce, initialValue) => {
    for await (var func of asyncFunctions) {
      initialValue=reduce(initialValue, await func());
    }
    return initialValue;
};


promiseReduce([fn1, fn2, fn3], (memo, value) => {console.log('reduce'); return memo * value}, 1 ).then((a)=> {
  console.log('Answer = '+a);
});
