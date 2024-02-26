import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueHoraireComponent } from './statistique-horaire.component';

describe('StatistiqueHoraireComponent', () => {
  let component: StatistiqueHoraireComponent;
  let fixture: ComponentFixture<StatistiqueHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiqueHoraireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatistiqueHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
