import logger from './logger.js'

export function createServer({ port = 8080 }, app, httpServer) {


    return new Promise((resolve, reject) => {
        let server
        app.get('/servidor', (req, res, next) => {
            res.send(`PROCESO '${process.pid}' ESCUCHANDO EN ${server.address().port}`)
        })
        server = httpServer.listen(process.env.port || 8080, () => {

            logger.info(`PROCESO '${process.pid}' INICIO SERVIDOR: http://localhost:${httpServer.address().port}`)
            resolve(server)

        });

        server.on('error', reject)
    })
}

