import { Component, OnInit } from '@angular/core';
import { Message } from '../../message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.css']
})

export class MsgListComponent implements OnInit {
  messages: Message[];
  currMsg:string = '';
  currUser:string = 'brian';
  nextID:number;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  handleNewMsgClick() {
    this.messages.unshift(
      { id: this.nextID,
        msg: this.currMsg,
        sender: this.currUser,
        timestamp: new Date(Date.now())
      }
    );
    this.nextID++;
    this.currMsg = '';
  }

  getMessages(): void {
    this.messageService.getMessages()
      .subscribe( messages => {
        this.messages = messages.sort( (a, b) => b.timestamp - a.timestamp);
        this.nextID = this.messages.length + 1;
        this.currMsg = '';
      })
  }

}
