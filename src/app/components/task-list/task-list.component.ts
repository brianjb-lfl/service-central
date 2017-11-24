import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  currTask: string = '';
  currContact: string = '';
  currAddress: string = '';
  currCsz: string = '';

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {

  }

  addTask() {
    this.taskService.addTask (
      { task: this.currTask,
        contact: this.currContact,
        address: this.currAddress,
        csz: this.currCsz
      }
    )
    this.currTask = '';
    this.currContact = '';
    this.currAddress = '';
    this.currCsz = '';
  }

  deleteTask(id) {
    this.taskService.deleteTask(id);
  }

}
