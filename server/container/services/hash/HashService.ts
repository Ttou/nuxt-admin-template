import bcrypt from '@node-rs/bcrypt'

export class HashService {
  private hashOptions: Record<string, any>

  constructor(opts: IServerContainerRegistry) {
    this.hashOptions = opts.configService.get('hash')
  }

  /**
   * 加密
   */
  async hash(value: string) {
    return await bcrypt.hash(value, this.hashOptions.cost, this.hashOptions.salt)
  }

  /**
   * 比较
   */
  get compare() {
    return bcrypt.compare
  }

  /**
   * 验证
   */
  get verify() {
    return bcrypt.verify
  }
}
