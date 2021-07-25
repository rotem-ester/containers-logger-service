const mongobd = require('mongodb')
const Docker = require('dockerode')
const logger = require('./functions')
const { stderr } = require('process')
const MongoClient = mongobd.MongoClient

const url = 'mongodb://localhost:27017'
const databaseName = 'containers-loggs'

const docker = new Docker()

docker.listContainers((error, containers) => {
    containers.forEach((container) => {
        //console.log(`id: ${container.Id}, state: ${container.State}`)
        console.log(container)
        
    })
})

// const container = docker.getContainer('54b19f592b6aea04243534405e22c7bc94a362947d08ac97bd32cafab16f71b0')
// container.inspect((error, data) => {
//     container.logs({stdout: true, strerr: true}, (error, result) => {
//         console.log(result.toString())
//     })
// })

// const container1 = docker.getContainer('099eddbeef40c21c45a8a00512c32cbf73dfd3cb0d1586475c86af3d750088c5')
// container1.inspect((error, data) => {
//     container1.logs({stdout: true, strerr: true, timestamps: true}, (error, result) => {
//         console.log(result.toString())
//     })
// })
// container1.attach({stream: true, stdout: true, stderr: true}, (error, stream) => {
//     container1.modem.demuxStream(stream, process.stdout, process.strerr)
// })


//logger.insertLog(url, databaseName, {containerId: 2, logDescription: 'test2'})