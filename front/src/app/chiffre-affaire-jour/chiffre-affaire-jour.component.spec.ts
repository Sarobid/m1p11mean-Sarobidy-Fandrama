import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireJourComponent } from './chiffre-affaire-jour.component';

describe('ChiffreAffaireJourComponent', () => {
  let component: ChiffreAffaireJourComponent;
  let fixture: ComponentFixture<ChiffreAffaireJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiffreAffaireJourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiffreAffaireJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
