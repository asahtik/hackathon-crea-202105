import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendVaccsComponent } from './send-vaccs.component';

describe('SendVaccsComponent', () => {
  let component: SendVaccsComponent;
  let fixture: ComponentFixture<SendVaccsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendVaccsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendVaccsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
