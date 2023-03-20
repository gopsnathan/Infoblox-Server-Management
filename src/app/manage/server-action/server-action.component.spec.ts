import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerActionComponent } from './server-action.component';

describe('ServerActionComponent', () => {
  let component: ServerActionComponent;
  let fixture: ComponentFixture<ServerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
