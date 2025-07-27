import type { ILocaleEnum } from '../enums'
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator'
import { BaseIdDto, BasePageDto } from './base'

export class CreateTransDto {
  @IsNotEmpty()
  transKey!: string

  @IsOptional()
  transValue?: { [key in ILocaleEnum]: string }

  @IsOptional()
  remark?: string
}

export class UpdateTransDto extends BaseIdDto {
  @IsOptional()
  transValue?: { [key in ILocaleEnum]: string }

  @IsOptional()
  remark?: string
}

export class FindTransPageDto extends BasePageDto {
  @IsOptional()
  transKey?: string

  @IsOptional()
  remark?: string

  @IsOptional()
  @IsDateString()
  createBeginTime?: string

  @IsOptional()
  @IsDateString()
  createEndTime?: string
}

export class FindTransOneDto {
  @IsNotEmpty()
  transKey!: string
}

export class FindTransAllDto {
  @IsNotEmpty()
  locale!: ILocaleEnum
}
