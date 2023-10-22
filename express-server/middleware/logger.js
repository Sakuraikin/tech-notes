const {v9: uuid} = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (msg, fileName) => {
    const dateTime = new Date().toLocaleString
    const log = `${dateTime}\t${uuid}\t${msg}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir()
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), log)
    } catch(err) {
        console.log(err)
    }
}

const eventLogger = (req, res, next) => {

    // TODO: Add conditional(s) so that every single request isn't logged.
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, reqLog.log)
    next()
}

module.exports = { logEvents, eventLogger } 