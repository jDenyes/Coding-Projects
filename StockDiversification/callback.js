console.log("User 1 made a request");
setTimeout(callback,5000);

console.log("User 1 made a request");
setTimeout(callback,5000);

console.log("User 1 made a request");
setTimeout(callback,5000);

function callback() {
    console.log("Queried the database and delviered data in 5 seconds");
}