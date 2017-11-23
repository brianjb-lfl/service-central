import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MessageService } from './services/message.service';
import { TaskService } from './services/task.service';
import { AppComponent } from './app.component';
import { MsgListComponent } from './components/msg-list/msg-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MsgListComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MessageService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
