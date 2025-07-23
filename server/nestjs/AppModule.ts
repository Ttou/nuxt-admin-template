import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { loadConfig } from 'c12'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [
        async () => {
          const { config } = await loadConfig({
            envName: false,
            configFile: process.env.NODE_ENV || 'development',
          })

          return config
        },
      ],
    }),
  ],
})
export class AppModule {}
