import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
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
  @Output() add = new EventEmitter<void>();
  @ContentChild('listItem') listItem!: TemplateRef<{ $implicit: T }>;
}
