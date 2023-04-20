import pino from 'pino'
import { Env } from '../config/index.js'

import { app } from './app.js'
import { Server } from './server.js'

const logger = pino()

async function main() {
  try {
    await Server.start({ app, logger, port: Env.PORT })

    process.on('SIGTERM', async() => {
      await Server.stop({ app, logger, port: Env.PORT })
      process.exit(0)
    })
  } catch (error) {
    logger.fatal({
      message: 'Unexpected application error!',
      error: error.message,
      stack: error.stack?.split('\n')
    })

    throw error
  }
}

main()
