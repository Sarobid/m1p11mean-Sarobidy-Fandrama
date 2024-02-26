import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUtilisateurComponent } from './header-utilisateur.component';

describe('HeaderUtilisateurComponent', () => {
  let component: HeaderUtilisateurComponent;
  let fixture: ComponentFixture<HeaderUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
