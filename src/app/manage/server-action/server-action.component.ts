import { Component, Input, OnInit } from '@angular/core';
import { serverData } from '../constant';
import { ManageCrudEventService } from '../services/manage-crud-event.service';
import { ServerList } from '../type';

@Component({
  selector: 'app-server-action',
  templateUrl: './server-action.component.html',
  styleUrls: ['./server-action.component.scss']
})
export class ServerActionComponent implements OnInit {

  constructor(public manageCrudService: ManageCrudEventService) { }
  @Input() selectedServers: ServerList[];
  ngOnInit(): void {
  }

  openServerDetails (action: string) {
    this.manageCrudService.openCreateEditServerModal(action, action === "create" ? [serverData] : this.selectedServers);
  }

  removeServers() {
    this.manageCrudService.removeServerObs();
  }

}
