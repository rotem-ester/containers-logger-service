const events = require('events')
const fs = require('fs')
const mongobd = require('mongodb')
const Docker = require('dockerode')
const logger = require('./functions')
const { stderr } = require('process')
const MongoClient = mongobd.MongoClient

const date = new Date()

const url = 'mongodb://localhost:27017'
const databaseName = 'containers-loggs'

const eventEmitter = new events.EventEmitter()

const docker = new Docker()


//for each running container: 
//                              get container.Id
//                              attach
//                              get logs and follow
//                              redirect all logs to DB





const attachToRunningContainers = function (error, containers) {
    if (error) {
        return console.log(`error: ${error}`)
    }
    //filter the containers that are in 'running' state
    const runningContainers = containers.filter((container) => {return container.State === 'running'})
    let containersIds = []
    let containerObjs = []
    
    runningContainers.forEach(container => {
        containersIds.push(container.Id)
    })

    containersIds.forEach(id => {
        containerObjs.push(docker.getContainer(id))
    })

    // const writable = fs.createWriteStream('./logs')
    // const writable1 = fs.createWriteStream('./logs1')

    containerObjs.forEach(container => {
        container.inspect((error, containerData) => {
            if (error) {
                return console.log(error)
            }
            
            container.attach({stream: true, stdout: true, stderr: true}, (error, stream) => {
                if (error) {
                    return console.log(error)
                }

                stream.on('data', (data) => {
                    // let cleanData = ''
                    // //remove invalid utf-8 characters
                    // for(let i = 0; i < data.length; i++) {
                    //     if (data.charCodeAt(i) <= 127) {
                    //         cleanData += stringData.charAt(i)
                    //     }
                    // }

                    //splitting logs in buffer
                    const splitString = data.toString().trim().split(/\n/)
                    //insert log into database
                    splitString.forEach((str) => {
                        let cleanStr = str.replace(/(\\u\d+e?|\\f)+/g, "")
                        console.log('********')
                        console.log(cleanStr)
                        logger.insertLog(url, databaseName, {
                            timeOfCreation: Date.now(),
                            containerId: containerData.Id,
                            logDescription: cleanStr
                        })
                    })
                })
            })

            // fs.readFile('./logs', (error, data) => {
            //     console.log(data.toString())
            // })

        })
    })

    console.log('attaching to all containers')

    //console.log(containerObjs)
}

//list all containers
docker.listContainers(attachToRunningContainers)





// const container = docker.getContainer('54b19f592b6aea04243534405e22c7bc94a362947d08ac97bd32cafab16f71b0')
// container.inspect((error, data) => {
//     container.logs({stdout: true, stderr: true}, (error, result) => {
//         console.log(result.toString())
//     })
// })

// const container1 = docker.getContainer('818eec077b84dc1f0bbe7a876b99598d0b3288499aa3a4d5ddc0ae50b127645f')
// container1.inspect((error, data) => {
//     container1.logs({stdout: true, stderr: true, timestamps: true}, (error, result) => {
//         console.log(result.toString())
//     })
// })

// container1.attach({stream: true, stdout: true, stderr: true}, (error, stream) => {
//     console.log(container1.modem.demuxStream(stream, process.stdout, process.stderr))
// })


//logger.insertLog(url, databaseName, {containerId: 2, logDescription: 'test2'})