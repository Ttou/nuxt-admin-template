import type { EventHandlerRequest, H3Error, H3Event } from 'h3'

declare module 'h3' {
  interface H3EventContext {
    /**
     * 请求ID
     */
    reqId: string
    /**
     * 当前用户
     */
    currentUser: SysUserEntity
  }
}

export default defineNitroPlugin((nitroApp) => {
  /**
   * 判断是否接口请求
   */
  function isApi({ path }: H3Event<EventHandlerRequest>) {
    return path.startsWith('/api/')
  }

  /**
   * 获取日志信息
   */
  function getLogInfo(event: H3Event) {
    return {
      reqId: event.context.reqId,
      reqUrl: event.path,
      reqMethod: event.method,
    }
  }

  nitroApp.hooks.hook('request', async (event) => {
    if (isApi(event)) {
      event.context.reqId = uuidv4()

      logger.info('Request received', getLogInfo(event))
    }
  })

  nitroApp.hooks.hook('beforeResponse', async (event, { body }) => {
    // 接口请求
    if (isApi(event)) {
      logger.info('Request completed', getLogInfo(event))

      // 已处理的请求
      if (event.handled) {
        return
      }

      await send(
        event,
        JSON.stringify({
          success: true,
          code: getResponseStatus(event),
          data: body,
        }),
        'application/json',
      )
    }
  })

  nitroApp.hooks.hook('error', (error: H3Error, { event }) => {
    logger.error(error.stack!, getLogInfo(event!))
  })
})
