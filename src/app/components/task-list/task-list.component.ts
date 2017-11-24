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
  addEditMode: string = 'add';
  editingId: string = '';

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {

  }

  addEditSave() {
    if(this.addEditMode === 'add') {
      this.addTask();
    }
    else {
      this.putTask();
    }
  }

  addTask() {
    this.taskService.addTask (
      { task: this.currTask,
        contact: this.currContact,
        address: this.currAddress,
        csz: this.currCsz
      }
    )
    this.clearEditFields();
  }

  editTask(task) {
    console.log(task);
    this.addEditMode = 'edit',
    this.editingId = task.id,
    this.currTask = task.task,
    this.currContact = task.contact,
    this.currAddress = task.address,
    this.currCsz = task.csz
  }

  putTask() {
    this.taskService.putTask (      
      { id: this.editingId,
        task: this.currTask,
        contact: this.currContact,
        address: this.currAddress,
        csz: this.currCsz
      }
    )
    this.clearEditFields();
    this.addEditMode = 'add';
    this.editingId = '';
  }

  deleteTask(id) {
    this.taskService.deleteTask(id);
  }

  clearEditFields() {
    this.currTask = '';
    this.currContact = '';
    this.currAddress = '';
    this.currCsz = '';
  }

}
