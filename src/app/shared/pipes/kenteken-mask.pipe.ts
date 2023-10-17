import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kentekenMask'
})
export class KentekenMaskPipe implements PipeTransform {

  transform(value: string): string | null {
    const lettersSplitNumbers = value.match(/[0-9a-zA-Z]+|[0-9a-zA-Z]{2}/ig);
    if (lettersSplitNumbers) {
      const arrWithLettersSplit = lettersSplitNumbers.map(el => {
        if (el.match(/[0-9a-zA-Z]{4,}/ig)) {
            return el.match(/[0-9a-zA-Z]{2,2}/g)?.join('-')
        } else {
          return el;
        }
      });
      return arrWithLettersSplit.join('-')
    } else {
      return null;
    }
  }

}
