const mongobd = require('mongodb')
const logger = require('./functions')
const MongoClient = mongobd.MongoClient

const url = 'mongodb://localhost:27017'
const databaseName = 'containers-loggs'

logger.insertLog(url, databaseName, {containerId: 2, logDescription: 'test2'})