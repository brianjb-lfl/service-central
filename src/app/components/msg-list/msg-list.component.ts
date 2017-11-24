import { Component, OnInit } from '@angular/core';
import { Message } from '../../message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.css']
})

export class MsgListComponent implements OnInit {
  currMsg:string = '';
  currUser:string = 'brian';
  highlightUser:string = 'dispatch';
  currSender:string;            // temp to simulate multi-party conversation

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  addMsg() {
    this.messageService.addMsg (
      { msg: this.currMsg,
        sender: this.currSender
      }
    )
    this.currMsg = '';
    this.currSender = '';
  }

  deleteMsg(id) {
    this.messageService.deleteMsg(id);
  }

}
