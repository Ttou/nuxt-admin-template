import { Transform } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class BasePageDto {
  @IsNumber()
  page!: number

  @IsNumber()
  pageSize!: number
}

export class BaseIdDto {
  @IsNumber()
  @Transform(({ value }) => BigInt(value))
  id!: bigint
}

export class BaseIdsDto {
  @IsNumber({}, { each: true })
  @Transform(({ value }) => value.map((v: any) => BigInt(v)))
  ids!: bigint[]
}
