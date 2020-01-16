function function2(var1, var2, callback) {
    callback(var1);
    callback(var2);
}

function2(1, 2, (x) => {
    console.log(x);
});