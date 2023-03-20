import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, pipe, Subject } from 'rxjs';
import { mockNatList } from 'src/app/mockData/mockNatList';
import { mockServerList } from 'src/app/mockData/mockServerList';
import { NatList, ServerList, ServerListResponse } from '../type';

@Injectable({
  providedIn: 'root'
})
export class ServerListService {

  serverListObservable = new Subject<ServerList[]>();
  natListObservable = new Subject<NatList[]>();

  constructor() { }

  serverListData() {
    this.serverListObservable.next(mockServerList);
  }
  natListData() {
    this.natListObservable.next(mockNatList);
  }
  apiCalls() {
    this.serverListData();
    setTimeout(() => this.natListData(), 100);
  }
}
