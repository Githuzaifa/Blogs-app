const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'bd1banbabfgpugrpzbdv-mysql.services.clever-cloud.com',
    user: 'uj3vy7maxzxcvqpq',
    password: 'DYwtZzrBMAt43OMxc5ck',
    database: 'bd1banbabfgpugrpzbdv',
    port: '3306'
});


connection.connect((err) => {
    if(err) throw err;
    console.log("Database Connected");
})


module.exports = {connection};