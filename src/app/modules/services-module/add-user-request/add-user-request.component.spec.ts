import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserRequestComponent } from './add-user-request.component';

describe('AddUserRequestComponent', () => {
  let component: AddUserRequestComponent;
  let fixture: ComponentFixture<AddUserRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
