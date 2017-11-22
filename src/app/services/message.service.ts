import { Injectable } from '@angular/core';
import { Message } from '../message';
import { MESSAGES } from '../mock-msgs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MessageService {
  constructor() { }

  getMessages(): Observable<Message[]> {
    return of (MESSAGES);
  }

}
