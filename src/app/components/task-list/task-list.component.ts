import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../services/task.service';
import { Message } from '../../message';
import { MessageService } from '../../services/message.service';
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
  currAssgd: string = '';
  addEditMode: string = constants.modes.list;       // list, view, edit
  editingId: string = '';
  currShowMode: string = constants.showMode.all;     // all, my
  currMsgs: any;
  currTaskMsg: '';

  constructor(
    private taskService: TaskService,
    private messageService: MessageService) {
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
    this.clearEditFields();
    this.addEditMode = constants.modes.edit;
  }

  editClick(task) {
    this.addEdit(task);
    this.addEditMode = constants.modes.edit    
  }

  viewClick(task) {
    this.addEdit(task);
    this.addEditMode = constants.modes.view;   
  }

  addEdit(task) {
    this.editingId = task.id;
    this.currTask = task.task;
    this.currContact = task.contact;
    this.currAddress = task.address;
    this.currCsz = task.csz;
    this.currAssgd = task.assigned;
    this.currMsgs = this.messageService.messages.filter( msg => msg.taskid === task.id);
  }

  addEditSave() {
    if(this.editingId === '') {
      this.postTask();
    }
    else {
      this.putTask();
    }
    this.clearEditFields();
  }

  addEditCancel() {
    this.clearEditFields();
  }

  postTask() {
    console.log('posting', this.currAssgd)
    this.taskService.addTask (
      { task: this.currTask,
        contact: this.currContact,
        address: this.currAddress,
        csz: this.currCsz,
        assigned: this.currAssgd
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
        csz: this.currCsz,
        assigned: this.currAssgd
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
    this.currAssgd = '';
    this.addEditMode = constants.modes.list;
    this.editingId = '';
    this.currMsgs = [];
  }

  addTaskMsg() {
    this.messageService.addMsg (
      { msg: this.currTaskMsg,
        sender: this.currUser,
        taskid: this.editingId
      }
    )
    this.currTaskMsg = '';
    this.clearEditFields();
  }

}
