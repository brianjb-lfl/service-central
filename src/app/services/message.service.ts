import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from '../message';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpResponse } from '@angular/common/http/src/response';

@Injectable()
export class MessageService {
  messages: Message[];
  msgUrl: string = 'http://localhost:8080/api/messages';

  constructor(private http: HttpClient) {
    this.getMsgs();
  }  

  getMsgs() {
    console.log(this.msgUrl);
    this.http.get(this.msgUrl).subscribe(
      (data: Message[]) => {
        this.messages = data;
      },
      err => {
        console.log(err.status, err.statusText);
      }
    ) 
  }

  addMsg(message, taskID=null) {
    console.log('addMsg called');
    console.log(message);
    const payload = {
      msg: message.msg,
      sender: message.sender,
      taskid: message.taskid,
    }
    this.http.post(this.msgUrl, payload).subscribe(
      res => {
        console.log(res);
        this.getMsgs();
        if(taskID) {
          this.getMsgsByTask(taskID);
        }
        return;
      },
      err => {
        console.log(err.status, err.statusText);
      }
    );
  }

  deleteMsg(id) {
    this.http.delete(`${this.msgUrl}/${id}`).subscribe(
      res => {
        console.log("ok");
        this.getMsgs();
      },
      err => {
        console.log(err.status, err.statusText);
      }
    )
  }

  getMsgsByTask(id) {
    this.http.get(`${this.msgUrl}/${id}`).subscribe(
      (data: Message[]) => {
        return data;
      },
    )
  }

}
