import { Inject, Injectable } from '@nestjs/common'
import bcrypt from '@node-rs/bcrypt'

@Injectable()
export class HashService {
  @Inject(HASH_OPTIONS)
  private readonly hashOptions!: IHashOptions

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
