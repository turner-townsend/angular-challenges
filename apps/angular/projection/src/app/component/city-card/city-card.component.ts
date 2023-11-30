import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card [list]="(cities$ | async) || []" (add)="addNewItem()">
    <img image src="assets/img/city.jpg" width="200px" />
    <ng-template #listItem let-city
      ><app-list-item (delete)="deleteItem(city.id)">
        {{ city.name }}
      </app-list-item></ng-template
    >
  </app-card> `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  #store = inject(CityStore);
  #http = inject(FakeHttpService);
  cities$ = this.#store.cities$;

  ngOnInit(): void {
    this.#http.fetchCities$.subscribe((c) => this.#store.addAll(c));
  }

  deleteItem(id: number) {
    this.#store.deleteOne(id);
  }

  addNewItem() {
    this.#store.addOne(randomCity());
  }
}
