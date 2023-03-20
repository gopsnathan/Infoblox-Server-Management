import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerList } from '../type';

@Injectable({
  providedIn: 'root'
})
export class ManageCrudEventService {

  actionTriggered = new Subject<{action: string, selectedServers: ServerList[]}>();
  removeServer = new Subject<boolean>();
  constructor() { }

  openCreateEditServerModal(action: string, selectedServers: ServerList[]) {
    this.actionTriggered.next({action, selectedServers});
  }
  removeServerObs() {
    this.removeServer.next(true);
  }
}
