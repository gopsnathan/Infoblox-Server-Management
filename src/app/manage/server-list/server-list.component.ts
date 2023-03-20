import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin, merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { serverListAction } from '../state/action';
import { ServerListService } from '../services/server-list.service';
import { ManageServerAppState, NatList, RemoveServer, ServerList, ServerListState } from '../type';
import { ManageCrudEventService } from '../services/manage-crud-event.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  removeServerSubscription: Subscription;
  serverList: ServerList[] = [];
  natList: NatList[];
  selectedServers: ServerList[] = [];
  constructor(
    serverListService: ServerListService,
    public manageCrudEventService: ManageCrudEventService,
    public store: Store<ManageServerAppState>
  ) { 
    this.subscription = combineLatest([serverListService.serverListObservable, serverListService.natListObservable]).subscribe(
      ([serverList, natList]) => {
        this.serverList = serverList;
        this.natList = natList;
        store.dispatch(serverListAction({serverList}));
    });
    this.removeServerSubscription = this.manageCrudEventService.removeServer.subscribe(
      (bool: boolean) => {
        this.removeServer(null);
      }
    )
    this.store.select('manageServer')
      .pipe(map((serverState: ServerListState) => serverState.serverList))
      .subscribe((servers: ServerList[]) => {
        this.serverList = servers;
        this.selectedServers = [];
      });
    serverListService.apiCalls();
  }

  onServerSelect(server: ServerList) {
    if(this.selectedServers.find(data => data.nat_space_id === server.nat_space_id)) {
      this.selectedServers = [...this.selectedServers.filter(data => data.nat_space_id !== server.nat_space_id)];
    } else {
      this.selectedServers.push(server);
    }
  }
  
  removeServer(removeServer: RemoveServer) {
    const serversToRemove = removeServer ? [removeServer] : this.selectedServers;
    const remainingServers = this.serverList.filter((elem) => !serversToRemove.find(({ nat_space_id, server_nat_ip }) => elem.nat_space_id === nat_space_id && elem.server_nat_ip === server_nat_ip));
    this.store.dispatch(serverListAction({serverList: remainingServers}));
    this.selectedServers = [];
  }

  editServerMenuClicked(serverToEdit: ServerList) {
    this.manageCrudEventService.openCreateEditServerModal('edit', [serverToEdit]);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.removeServerSubscription.unsubscribe();
  }

}
