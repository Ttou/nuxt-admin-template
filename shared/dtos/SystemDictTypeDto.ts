import type { IYesOrNoEnum } from '../enums'

import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator'
import { YesOrNoEnumValues } from '../enums'
import { IsEnumValues } from '../validators'
import { BaseIdDto, BasePageDto } from './base'

export class FindSystemDictTypePageDto extends BasePageDto {
  @IsOptional()
  dictName?: string

  @IsOptional()
  dictType?: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable?: IYesOrNoEnum

  @IsOptional()
  @IsDateString({}, { message: '开始时间格式不正确' })
  createBeginTime?: string

  @IsOptional()
  @IsDateString({}, { message: '结束时间格式不正确' })
  createEndTime?: string
}

export class CreateSystemDictTypeDto {
  @IsNotEmpty({ message: '字典名称不能为空' })
  dictName!: string

  @IsNotEmpty({ message: '字典类型不能为空' })
  dictType!: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable!: IYesOrNoEnum

  @IsOptional()
  remark?: string
}

export class UpdateSystemDictTypeDto extends BaseIdDto {
  @IsNotEmpty({ message: '字典名称不能为空' })
  dictName!: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable?: IYesOrNoEnum

  @IsOptional()
  remark?: string
}

export class FindSystemDictOneDto {
  @IsNotEmpty({ message: '字典类型不能为空' })
  dictType!: string
}
