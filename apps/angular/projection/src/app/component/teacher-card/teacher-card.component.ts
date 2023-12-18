import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card [list]="(teachers$ | async) || []" (add)="addOne()">
    <img image src="assets/img/teacher.png" width="200px" />
    <ng-template #listItem let-teacher
      ><app-list-item (delete)="deleteOne(teacher.id)">
        {{ teacher.firstname }}
      </app-list-item></ng-template
    >
  </app-card>`,
  styles: [
    `
      :host {
        --card-background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addOne() {
    this.store.addOne(randTeacher());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }
}
