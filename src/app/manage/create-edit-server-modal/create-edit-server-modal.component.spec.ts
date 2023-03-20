import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditServerModalComponent } from './create-edit-server-modal.component';

describe('CreateEditServerModalComponent', () => {
  let component: CreateEditServerModalComponent;
  let fixture: ComponentFixture<CreateEditServerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditServerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditServerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
