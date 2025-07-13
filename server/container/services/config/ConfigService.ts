import { loadConfig } from 'c12'
import { get } from 'es-toolkit/compat'

export class ConfigService {
  private config!: Record<string, any>

  private async init() {
    const { config } = await loadConfig({
      cwd: process.cwd(),
      envName: false,
      configFile: process.env.APP_ENV,
    })

    this.config = config
  }

  get(key: string | string[]) {
    return get(this.config, key)
  }
}
