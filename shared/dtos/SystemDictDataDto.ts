import type { IYesOrNoEnum } from '../enums'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { YesOrNoEnumValues } from '../enums'
import { IsEnumValues } from '../validators'
import { BaseIdDto } from './base'

export class FindSystemDictDataListDto {
  @IsNotEmpty({ message: '字典类型不能为空' })
  dictType!: string

  @IsOptional()
  dictLabel?: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable?: IYesOrNoEnum
}

export class CreateSystemDictDataDto {
  @IsNotEmpty({ message: '字典标签不能为空' })
  dictLabel!: string

  @IsNotEmpty({ message: '字典值不能为空' })
  dictValue!: string

  @IsNotEmpty({ message: '字典类型不能为空' })
  dictType!: string

  @IsNotEmpty({ message: '可用状态不能为空' })
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable!: IYesOrNoEnum

  @IsOptional()
  remark?: string
}

export class UpdateSystemDictDataDto extends BaseIdDto {
  @IsNotEmpty({ message: '字典标签不能为空' })
  dictLabel!: string

  @IsNotEmpty({ message: '字典值不能为空' })
  dictValue!: string

  @IsOptional()
  @IsEnumValues(YesOrNoEnumValues, { message: '可用状态枚举值不正确' })
  isAvailable!: IYesOrNoEnum

  @IsOptional()
  remark?: string
}
