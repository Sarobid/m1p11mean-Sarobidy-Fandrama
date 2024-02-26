import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutHoraireComponent } from './ajout-horaire.component';

describe('AjoutHoraireComponent', () => {
  let component: AjoutHoraireComponent;
  let fixture: ComponentFixture<AjoutHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutHoraireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
