import { Injectable } from '@angular/core';
import { Task } from '../task';
import { TASKS } from '../mock-tasks';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TaskService {
  constructor() { }

  getTasks(): Observable<Task[]> {
    return of (TASKS);
  }

}
