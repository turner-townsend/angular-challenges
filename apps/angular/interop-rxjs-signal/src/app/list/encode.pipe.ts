import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo.model';

@Pipe({
  name: 'encode',
  standalone: true,
})
export class EncodePipe implements PipeTransform {
  transform(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
