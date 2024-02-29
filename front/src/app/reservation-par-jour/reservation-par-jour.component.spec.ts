import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationParJourComponent } from './reservation-par-jour.component';

describe('ReservationParJourComponent', () => {
  let component: ReservationParJourComponent;
  let fixture: ComponentFixture<ReservationParJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationParJourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationParJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
