import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MyPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    return `prefix-${value}`;
  }
}
