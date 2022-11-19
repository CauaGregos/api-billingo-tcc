async function getConnection (){
    if (global.connection && global.connection.state !== 'disconnected')
       return global.connection;

const mysql = require("mysql2/promise");
const bdConfig = require("./bdConfig");
try {
    const connection = await mysql.createPool({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b17ab4e5b7c12b',
        password: '0545a23c',
        database: 'heroku_1e8f08e81112628'
    });
    global.connection = connection;
    return connection;
} catch (error) {
    return null;
}


}

module.exports = {getConnection}