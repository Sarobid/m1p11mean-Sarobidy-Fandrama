import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireMoisComponent } from './chiffre-affaire-mois.component';

describe('ChiffreAffaireMoisComponent', () => {
  let component: ChiffreAffaireMoisComponent;
  let fixture: ComponentFixture<ChiffreAffaireMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiffreAffaireMoisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiffreAffaireMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
