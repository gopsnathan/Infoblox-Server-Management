import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { serverData } from '../constant';
import { ManageCrudEventService } from '../services/manage-crud-event.service';
import { createServerAction, serverListAction } from '../state/action';
import { FormData, NatList, ServerList, ServerListState } from '../type';

@Component({
  selector: 'app-create-edit-server-modal',
  templateUrl: './create-edit-server-modal.component.html',
  styleUrls: ['./create-edit-server-modal.component.scss']
})
export class CreateEditServerModalComponent implements OnInit, OnDestroy {

  @ViewChild('createEditServerModal')
  serverModal: ElementRef;

  @Input() natList: NatList[];
  @Input() serverList: ServerList[];

  submitted = false;
  subscription: Subscription;
  serverForm: FormGroup;
  action: string;
  selectedServers: ServerList[];
  totalServers: ServerList[];
  constructor(
    public modalService: NgbModal, 
    public manageCrudService: ManageCrudEventService,
    public formBuilder: FormBuilder,
    public store: Store) {
      this.subscription = this.manageCrudService.actionTriggered.subscribe(
        ({action, selectedServers}) => {
          this.action = action;
          this.selectedServers = selectedServers;
          this.loadFormData();
          this.open();
      });
  }

  loadFormData() {
    const serverFormData = this.selectedServers?.[0];
    if(serverFormData) {
      this.serverForm = this.formBuilder.group({
        name: [serverFormData.name, [Validators.required, Validators.maxLength(256)]],
        description: [serverFormData.description, [Validators.required, Validators.maxLength(256)]],
        natSpace: [serverFormData.nat_space_id, [Validators.required]],
        ipAddress: [serverFormData.server_ip, [Validators.required, Validators.maxLength(15)]]
      });
    }
  }

  ngOnInit(): void {}

  open() {
    this.modalService.open(this.serverModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  generateRequest(formData: FormData) {
    const originData = this.action === 'create' ? serverData : this.selectedServers?.[0];
    return {
      ...originData,
      name: formData.name,
      description: formData.description,
      server_ip: formData.ipAddress,
      nat_space_id: formData.natSpace,
      status: this.action === 'create' ? 'pending' : originData.status
    }
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.serverForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.serverForm.invalid) {
      return;
    }
    const requestServerData = this.generateRequest(this.serverForm.value);
    if(this.action === 'create') {
      this.store.dispatch(createServerAction({serverList: requestServerData}))
    } else {
      const editServerData = this.serverList.map(server => {
        if(server.nat_space_id === requestServerData.nat_space_id && server.server_nat_ip === requestServerData.server_nat_ip) {
          return {...server, ...requestServerData};
        }
        return server;
      })
      this.store.dispatch(serverListAction({serverList: editServerData}));
    }
    this.onClose();
  }

  onClose() {
    this.modalService.dismissAll()
    this.selectedServers = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.serverForm.reset();
  }

}
