import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHoraireComponent } from './liste-horaire.component';

describe('ListeHoraireComponent', () => {
  let component: ListeHoraireComponent;
  let fixture: ComponentFixture<ListeHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeHoraireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
