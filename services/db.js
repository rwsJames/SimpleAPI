const config = require("../config")
const mariadb = require("mariadb")

const pool = mariadb.createPool(config.db)


async function getConn(silent = false)
{
    console.log("Connecting to database...")
    try
    {
        const conn = await pool.getConnection()
        if (!silent)
        {
            console.log("Connected to database!")
            console.log("Total connections: ", pool.totalConnections())
            console.log("Active connections: ", pool.activeConnections())
            console.log("Idle connections: ", pool.idleConnections())
        }
        
        return conn
    }
    catch (err)
    {
        throw err
    }
}

async function query(sql, params)
{
    console.log(`Making query: ${sql}\n\twith: ${params}`)
    const conn = await getConn()
    const res = await conn.query(sql, params)
    console.log("Query complete\n")

    console.log("Closing connection")
    conn.end()
    console.log("Connection to database closed\n")

    return res
}

module.exports = {
    query
}
