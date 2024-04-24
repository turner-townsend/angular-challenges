import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotosStore } from './+store';
import { EncodePipe } from './encode.pipe';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgFor,
    MatInputModule,
    LetDirective,
    RouterLinkWithHref,
    EncodePipe,
  ],
  template: `
    <h2 class="mb-2 text-xl">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="search"
        placeholder="find a photo" />
    </mat-form-field>

    <ng-container>
      <section class="flex flex-col">
        <section class="flex items-center gap-3">
          <button
            [disabled]="store.page() === 1"
            [class.bg-gray-400]="store.page() === 1"
            class="rounded-md border p-3 text-xl"
            (click)="store.previousPage()">
            <
          </button>
          <button
            [disabled]="store.endOfPage()"
            [class.bg-gray-400]="store.endOfPage()"
            class="rounded-md border p-3 text-xl"
            (click)="store.nextPage()">
            >
          </button>
          Page :{{ store.page() }} / {{ store.pages() }}
        </section>
        <mat-progress-bar
          mode="query"
          *ngIf="store.loading()"
          class="mt-5"></mat-progress-bar>
        <ul
          class="flex flex-wrap gap-4"
          *ngIf="store.photos() && store.photos().length > 0; else noPhoto">
          <li *ngFor="let photo of store.photos(); trackBy: trackById">
            <a routerLink="detail" [queryParams]="{ photo: photo | encode }">
              <img
                src="{{ photo.url_q }}"
                alt="{{ photo.title }}"
                class="image" />
            </a>
          </li>
        </ul>
        <ng-template #noPhoto>
          <div>No Photos found. Type a search word.</div>
        </ng-template>
        <footer class="text-red-500">
          {{ store.error() }}
        </footer>
      </section>
    </ng-container>
  `,
  providers: [PhotosStore],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent implements OnInit {
  readonly store = inject(PhotosStore);

  readonly search = new FormControl();

  ngOnInit(): void {
    this.store.initializeSearch((search) => this.search.setValue(search));

    this.store.searchByText(
      this.search.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
    );
  }

  trackById(_index: number, photo: Photo) {
    return photo.id;
  }
}
