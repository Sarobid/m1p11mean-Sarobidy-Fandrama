import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidMotDePasseComponent } from './valid-mot-de-passe.component';

describe('ValidMotDePasseComponent', () => {
  let component: ValidMotDePasseComponent;
  let fixture: ComponentFixture<ValidMotDePasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidMotDePasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
