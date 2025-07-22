import type { H3Event, EventHandlerRequest, H3Error } from 'h3'

declare module 'h3' {
  interface H3EventContext {
    /**
     * 请求ID
     */
    reqId: string
    /**
     * 当前用户
     */
    // currentUser: SysUserEntity
  }
}

if (!Reflect.has(BigInt.prototype, 'toJSON')) {
  Reflect.defineProperty(BigInt.prototype, 'toJSON', {
    value: function (this: bigint) {
      return this.toString()
    },
    writable: true,
    enumerable: false,
    configurable: true,
  })
}

// 接口请求
const isApi = ({ path }: H3Event<EventHandlerRequest>) => {
  return path.startsWith('/api/')
}

/**
 * 获取日志信息
 */
const getLogInfo = (event: H3Event) => {
  return {
    reqId: event.context.reqId,
    reqUrl: event.path,
    reqMethod: event.method
  }
}

export default defineNitroPlugin(async (nitroApp) => {
  await initAppContext()

  nitroApp.hooks.hook('request', async (event) => {
    if (isApi(event)) {
      event.context.reqId = uuidv4()

      logger.info('Request received', getLogInfo(event))
    }
  })

  // @ts-ignore
  nitroApp.hooks.hook('error', (error: H3Error, { event }) => {
    logger.error(error.stack!, getLogInfo(event!))
  })

  nitroApp.hooks.hook('close', async () => {
    await closeAppContext()
  })
})
