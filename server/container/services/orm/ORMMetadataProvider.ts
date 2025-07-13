import type { EntityMetadata } from '@mikro-orm/core'
import { MetadataProvider } from '@mikro-orm/core'

export class ORMMetadataProvider extends MetadataProvider {
  loadEntityMetadata(meta: EntityMetadata, name: string): void {
    // 不用实现，占位用
  }
}
