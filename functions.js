const mongobd = require('mongodb')
const MongoClient = mongobd.MongoClient

const insertLog = (url, dbName, log) => {
    MongoClient.connect(url, (error, client) => {
        if (error) {
            return console.log('unable to connect to DB. error: ' + error)
        }
    
        const db = client.db(dbName)
        db.collection(dbName).insertOne(log, (error, result) => {
            if (error) {
                return console.log(error)
            }
    
            console.log(result)
        })
    })
}

const insertTest = (log) => {
    MongoClient.connect('mongodb://localhost:27017', (error, client) => {
        if (error) {
            return console.log('unable to connect to DB. error: ' + error)
        }
    
        const db = client.db('containers-loggs')
        db.collection('containers-loggs').insertOne({log}, (error, result) => {
            if (error) {
                return console.log(error)
            }
    
            console.log(result)
        })
    })
}

module.exports = {insertLog, insertTest}