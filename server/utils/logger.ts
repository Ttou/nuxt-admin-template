import type { Format } from 'yoctocolors'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { gray, greenBright, redBright, white, yellowBright } from 'yoctocolors'

function getColor(level: string) {
  let func: Format

  switch (level.toLowerCase()) {
    case 'info':
      func = greenBright
      break
    case 'verbose':
    case 'debug':
      func = gray
      break
    case 'warn':
      func = yellowBright
      break
    case 'error':
      func = redBright
      break
    default:
      func = white
  }

  return func
}

export const logger = createLogger({
  transports: [
    new transports.Console(
      {
        level: 'debug',
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          format.ms(),
          format.printf((info) => {
            const color = getColor(info.level)

            return [
              `[${info.timestamp}]`,
              `[${process.pid}]`,
              `[${color(`${info.level.toUpperCase()}`)}]`,
              info['0'] ? `[${info['0']}]` : undefined,
              info.reqId ? `[${info.reqId}]` : undefined,
              info.reqMethod ? `[${info.reqMethod} - ${info.reqUrl}]` : undefined,
              `${info.message}`,
              yellowBright(`${info.ms}`),
            ]
              .filter(v => v !== undefined)
              .join(' ')
          }),
        ),
      },
    ),
    new DailyRotateFile(
      {
        level: 'debug',
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        dirname: './logs',
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          format.uncolorize(),
          format.printf((info) => {
            if (info['0']) {
              Reflect.set(info, 'context', info['0'])
              Reflect.deleteProperty(info, '0')
            }

            return JSON.stringify(info)
          }),
        ),
      },
    ),
  ],
})
