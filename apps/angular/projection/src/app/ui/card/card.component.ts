import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  styles: [
    `
      div {
        background-color: var(--card-background-color);
      }
    `,
  ],
})
export class CardComponent<T> {
  @Input() list: T[] = [];
  @Input() customClass = '';
  @Output() add = new EventEmitter<void>();

  @ContentChild('listItem') listItem!: TemplateRef<{ $implicit: T }>;
}
