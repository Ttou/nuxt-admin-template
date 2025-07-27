import type { IYesOrNoEnum } from '../enums'
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator'
import { YesOrNoEnumValues } from '../enums'
import { IsEnumValues } from '../validators'
import { BaseIdDto, BasePageDto } from './base'

export class FindSystemConfigOneDto {
  @IsNotEmpty({ message: '参数键名不能为空' })
  configKey!: string
}

export class FindSystemConfigPageDto extends BasePageDto {
  @IsOptional()
  configName?: string

  @IsOptional()
  configKey?: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '内置参数枚举值不正确' })
  isBuiltin!: IYesOrNoEnum

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable!: IYesOrNoEnum

  @IsOptional()
  @IsDateString({}, { message: '开始时间格式不正确' })
  createBeginTime?: string

  @IsOptional()
  @IsDateString({}, { message: '结束时间格式不正确' })
  createEndTime?: string
}

export class CreateSystemConfigDto {
  @IsNotEmpty({ message: '参数名称不能为空' })
  configName!: string

  @IsNotEmpty({ message: '参数标识不能为空' })
  configKey!: string

  @IsNotEmpty({ message: '参数键值不能为空' })
  configValue!: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '内置参数枚举值不正确' })
  isBuiltin!: IYesOrNoEnum

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable!: IYesOrNoEnum

  @IsOptional()
  remark?: string
}

export class UpdateSystemConfigDto extends BaseIdDto {
  @IsNotEmpty({ message: '参数名称不能为空' })
  configName!: string

  @IsNotEmpty({ message: '参数键值不能为空' })
  configValue!: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '内置参数枚举值不正确' })
  isBuiltin!: IYesOrNoEnum

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable!: IYesOrNoEnum

  @IsOptional()
  remark?: string
}
