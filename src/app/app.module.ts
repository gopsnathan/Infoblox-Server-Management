import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageComponent } from './manage/manage.component';
import { ServerActionComponent } from './manage/server-action/server-action.component';
import { ServerListComponent } from './manage/server-list/server-list.component';
import { CreateEditServerModalComponent } from './manage/create-edit-server-modal/create-edit-server-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageCrudEventService } from './manage/services/manage-crud-event.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerListService } from './manage/services/server-list.service';
import { StoreModule } from '@ngrx/store';
import * as ManageServerReducer from 'src/app/manage/state/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ManageComponent,
    ServerActionComponent,
    ServerListComponent,
    CreateEditServerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forRoot({manageServer: ManageServerReducer.manageServerReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [ManageCrudEventService, ServerListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
