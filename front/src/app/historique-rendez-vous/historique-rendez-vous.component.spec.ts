import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRendezVousComponent } from './historique-rendez-vous.component';

describe('HistoriqueRendezVousComponent', () => {
  let component: HistoriqueRendezVousComponent;
  let fixture: ComponentFixture<HistoriqueRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueRendezVousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
