const crypto = require('crypto')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (msg, fileName) => {
    const dateTime = new Date().toLocaleString()
    const thisLog = `${ dateTime }\t${ crypto.randomUUID() }\t${ msg }\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), thisLog)
    } catch(err) {
        console.log(err)
    }
}

const eventLogger = (req, res, next) => {

    // TODO: Add conditional(s) so that every single request isn't logged.
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'thisLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, eventLogger } 