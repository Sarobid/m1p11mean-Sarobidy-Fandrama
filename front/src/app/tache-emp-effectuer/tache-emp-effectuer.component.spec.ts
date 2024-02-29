import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheEmpEffectuerComponent } from './tache-emp-effectuer.component';

describe('TacheEmpEffectuerComponent', () => {
  let component: TacheEmpEffectuerComponent;
  let fixture: ComponentFixture<TacheEmpEffectuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheEmpEffectuerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TacheEmpEffectuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
