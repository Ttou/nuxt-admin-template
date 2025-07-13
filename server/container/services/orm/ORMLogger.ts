import type { LogContext, LoggerNamespace } from '@mikro-orm/core'
import { DefaultLogger } from '@mikro-orm/core'
import { pascalCase } from 'es-toolkit'

export class ORMLogger extends DefaultLogger {
  log(namespace: LoggerNamespace, message: string, context?: LogContext) {
    logger.debug(message, { 0: pascalCase(namespace), ...context })
  }
}
