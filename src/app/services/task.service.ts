import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../task';
import { TASKS } from '../mock-tasks';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpResponse } from '@angular/common/http/src/response';

@Injectable()
export class TaskService {
  tasks: Task[];
  taskUrl: string = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {
    this.getTasks();
   }

  getTasks() {
    this.http.get(this.taskUrl).subscribe(
      data => {
        this.tasks = data;
      },
      err => {
        console.log(err.status, err.statusText);
      }
    ) 
  }

  addTask(task) {
    const payload = {
      task: task.task,
      contact: task.contact,
      address: task.address,
      csz: task.csz
    }
    this.http.post(this.taskUrl, payload).subscribe(
      res => {
        this.getTasks();
      },
      err => {
        console.log(err.status, err.statusText);
      }
    );
  }

  putTask(task) {
    const payload = {
      task: task.task,
      contact: task.contact,
      address: task.address,
      csz: task.csz
    }
    this.http.put(`${this.taskUrl}/${task.id}`, payload).subscribe(
      res => {
        this.getTasks();
      },
      err => {
        console.log(err.status, err.statusText);
      }
    )
  }

  deleteTask(id) {
    this.http.delete(`${this.taskUrl}/${id}`).subscribe(
      res => {
        console.log("ok");
        this.getTasks();
      },
      err => {
        console.log(err.status, err.statusText);
      }
    )
  }

}
