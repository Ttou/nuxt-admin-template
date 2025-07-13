export function useToken() {
  const event = useEvent()

  const authorization = getHeader(event, 'authorization')

  if (!authorization) {
    throw createError({
      statusCode: 401,
      message: 'authorization 不存在',
    })
  }

  const token = authorization.match(/Bearer (.+)/)?.[1]

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'token 不存在',
    })
  }

  return token
}
