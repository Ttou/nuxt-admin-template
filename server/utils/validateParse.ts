import type { ClassConstructor, ClassTransformOptions } from 'class-transformer'
import { HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

export function validateParse<T extends Record<string, any>>(cls: ClassConstructor<T>, options?: ClassTransformOptions) {
  return async function (data: any) {
    const object = plainToInstance(cls, data, options)
    const errors = await validate(object)

    if (errors.length > 0) {
      const message = Object.values(errors.at(0)!.constraints!).at(0)
      throw createError({
        status: HttpStatus.BAD_REQUEST,
        message,
      })
    }

    return object
  }
}
