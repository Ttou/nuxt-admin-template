import { Transform } from 'class-transformer'
import { ArrayNotEmpty, IsNotEmpty, IsNumber } from 'class-validator'

export class BasePageDto {
  @IsNumber()
  page!: number

  @IsNumber()
  pageSize!: number
}

export class BaseIdDto {
  @IsNotEmpty({ message: 'id 不能为空' })
  @IsNumber()
  @Transform(({ value }) => BigInt(value))
  id!: bigint
}

export class BaseIdsDto {
  @ArrayNotEmpty({ message: 'ids 不能为空' })
  @IsNumber({}, { each: true })
  @Transform(({ value }) => value.map((v: any) => BigInt(v)))
  ids!: bigint[]
}
