import { MySqlDriver } from '@mikro-orm/mysql'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
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
    MikroOrmModule.forRootAsync({
      driver: MySqlDriver,
      useFactory: (configService: ConfigService) => {
        return {
          driver: MySqlDriver,
          entities: [
            SysConfigEntity,
            SysDictTypeEntity,
            SysDictDataEntity,
            SysTransEntity,
          ],
          loggerFactory: opts => new ORMLogger(opts),
          ...configService.get('orm'),
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
