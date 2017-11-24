import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  currUser: string = 'brian';
  currTask: string = '';
  currContact: string = '';
  currAddress: string = '';
  currCsz: string = '';
  addEditMode: string = 'list';       // list, add, edit
  editingId: string = '';

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {

  }

  addNewTask() {
    this.addEditMode = 'add';
  }

  editTask(task) {
    this.addEditMode = 'edit',
    this.editingId = task.id,
    this.currTask = task.task,
    this.currContact = task.contact,
    this.currAddress = task.address,
    this.currCsz = task.csz
  }

  addEditSave() {
    if(this.addEditMode === 'add') {
      this.addTask();
    }
    else {
      this.putTask();
    }
  }

  addEditCancel() {
    this.clearEditFields();
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
    this.addEditMode = 'list';
    this.editingId = '';
  }
}
