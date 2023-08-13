const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'bvrnkmoh9q15h8as4czo-mysql.services.clever-cloud.com',
    user: 'uweoize5uafz3hun',
    password: 'Czu1BjlmvuPNrc0eTi3v',
    database: 'bvrnkmoh9q15h8as4czo',
    port: '3306'
});


connection.connect((err) => {
    if(err) throw err;
    console.log("Database Connected");
})


module.exports = {connection};