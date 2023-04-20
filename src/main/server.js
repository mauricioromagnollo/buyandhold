class Server {
  httpConnection = null

  static async start({ app, logger, port }) {
    try {
      logger.info({
        message: 'Starting application'
      })

      this.httpConnection = app.listen(port, () => {
        logger.info({
          message: `[*] Server listen on ${port}`
        })
      })
    } catch (error) {
      logger.error({
        message: 'Unexpected error starting application',
        error: error.message,
        stack: error.stack?.split('\n')
      })

      throw error
    }
  }

  static async stop({ app, logger, port }) {
    try {
      logger.info({
        message: 'Stopping application'
      })

      this.httpConnection?.close(() => {
        logger.info({
          message: 'Http server stopped',
          port
        })
      })
    } catch (error) {
      logger.error({
        message: 'Unexpected error stopping application ',
        error: error.message,
        stack: error.stack?.split('\n')
      })

      throw error
    }
  }
}

export {
  Server
}
