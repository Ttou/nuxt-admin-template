import type { _RequestMiddleware, _ResponseMiddleware, EventHandlerRequest, H3Event } from 'h3'

interface ICacheOptions {
  key: string
  ttl?: number
  cb?: (opts: Pick<ICacheOptions, 'key'> & { event: H3Event<EventHandlerRequest> }) => string
}

export function defineCacheMiddleware(options: ICacheOptions) {
  function useCacheRequest(): _RequestMiddleware {
    return async function (event) {
      const cacheKey = options.cb ? options.cb({ event, key: options.key }) : options.key

      if (cacheKey) {
        const cached = await nestApp.get(CacheService).get(cacheKey)

        if (cached) {
          logger.debug(`Cache hit - ${cacheKey}`)

          await send(
            event,
            JSON.stringify({
              success: true,
              code: getResponseStatus(event),
              data: cached,
            }),
            'application/json',
          )
        }
      }
    }
  }

  function useCacheResponse(): _ResponseMiddleware {
    return async function (req, res) {
      const cacheKey = options.cb ? options.cb({ event: req, key: options.key }) : options.key

      if (cacheKey) {
        const cached = await nestApp.get(CacheService).get(cacheKey)

        if (!cached) {
          logger.debug(`Cache miss - ${cacheKey}`)

          await nestApp.get(CacheService).set(cacheKey, res.body, options.ttl)
        }
      }
    }
  }

  return {
    useCacheRequest,
    useCacheResponse,
  }
}
