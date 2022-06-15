import cluster from 'cluster'
import os from 'os'
import { createServer } from './servidor.js'
import logger from './logger.js'


export async function servidorModoCluster(app,httpServer){

    const PORT = process.argv[2] ?? 8080;

    if (cluster.isPrimary) {
        const cantCpus = os.cpus().length
        for (let i = 0; i < cantCpus; i++) {
            cluster.fork()
        }
        cluster.on('exit', worker => {
            logger.warn(`que en paz descanse el proceso: '${worker.process.pid}'`)
            cluster.fork()
        })
    } else {
        
        await createServer({ port: PORT },app,httpServer);
    }

}
