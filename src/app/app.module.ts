import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {MessageService } from './services/message.service';
import { AppComponent } from './app.component';
import { MsgListComponent } from './components/msg-list/msg-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MsgListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
