import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../services/task.service';
import { constants } from './task-list.constants';

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
  addEditMode: string = constants.modes.list;       // list, add, edit
  editingId: string = '';
  currShowMode: string = constants.showMode.all;     // all, my

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {

  }

  clickSeeAll() {
    this.currShowMode = constants.showMode.all;
    this.taskService.getTasks();
  }

  clickSeeMy() {
    this.currShowMode = constants.showMode.my;
    this.taskService.getTasks(this.currUser);
  }

  addNewTask() {
    this.addEditMode = constants.modes.add;
  }

  editTask(task) {
    this.addEditMode = constants.modes.edit,
    this.editingId = task.id,
    this.currTask = task.task,
    this.currContact = task.contact,
    this.currAddress = task.address,
    this.currCsz = task.csz
  }

  addEditSave() {
    if(this.addEditMode === constants.modes.add) {
      this.addTask();
    }
    else {
      this.putTask();
    }
    this.clearEditFields();
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
  }

  deleteTask(id) {
    this.taskService.deleteTask(id);
  }

  clearEditFields() {
    this.currTask = '';
    this.currContact = '';
    this.currAddress = '';
    this.currCsz = '';
    this.addEditMode = constants.modes.list;
    this.editingId = '';
  }
}
