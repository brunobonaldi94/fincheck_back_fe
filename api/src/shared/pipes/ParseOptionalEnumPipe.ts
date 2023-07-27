import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class ParseOptionalEnumPipe<T = any> extends ParseEnumPipe<T> {
  override transform(value: T, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return undefined;
    }
    return super.transform(value, metadata);
  }
}
