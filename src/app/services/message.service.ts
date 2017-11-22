import { Injectable } from '@angular/core';
import { Message } from '../message';
import { MESSAGES } from '../mock-msgs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MessageService {
  messages: Message[];

  constructor() {
    this.messages = MESSAGES.sort( (a, b) => b.timestamp - a.timestamp);
  }

  // getMessages(): Observable<Message[]> {
  //   return of (this.messages);
  // }

  addMsg(message) {
    //let tempMsgs = this.messages.slice();
    this.messages.unshift(
      {id: this.messages[0].id + 1,
        msg: message.msg,
        sender: message.sender,
        timestamp: new Date(Date.now());
      });
    //this.messages = tempMsgs.sort( (a, b) => b.timestamp - a.timestamp);
  }

  deleteMsg(id) {
    this.messages = this.messages.filter( item => item.id !== id);
  }

}
