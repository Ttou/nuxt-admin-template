import type { INestApplicationContext } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'

export let nestApp: INestApplicationContext

export async function initAppContext() {
  nestApp = await NestFactory.createApplicationContext(AppModule, {
    logger: new NestLogger(),
    abortOnError: false,
  })

  await nestApp.init()
}

export async function closeAppContext() {
  await nestApp.close()
}
