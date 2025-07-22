import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { INestApplicationContext } from '@nestjs/common';

export let  AppContext: INestApplicationContext

export async function initAppContext() {
  AppContext = await NestFactory.createApplicationContext(AppModule);

  await AppContext.init()
}

export async function closeAppContext() {
  await AppContext.close();
}
