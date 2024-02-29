import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservartionParMoisComponent } from './reservartion-par-mois.component';

describe('ReservartionParMoisComponent', () => {
  let component: ReservartionParMoisComponent;
  let fixture: ComponentFixture<ReservartionParMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservartionParMoisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservartionParMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
