import { Component, OnInit } from '@angular/core';

import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs!: Log[];
  selectedLog!: Log;
  loaded: boolean = false;
  // Injecting the service in the constructor
  constructor(private logService: LogService) { }

  ngOnInit(): void {

    this.logService.stateClear.subscribe(clear => {
      if(clear) {
        this.selectedLog = {id: '', text: '', date:''};
      }
    })
    this.logService.getLogs().subscribe(logs=> {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if(confirm('Are u sure?')) {
      this.logService.deleteLog(log);
    }
   }

}
