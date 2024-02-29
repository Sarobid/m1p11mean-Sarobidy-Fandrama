import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvEmployeComponent } from './rdv-employe.component';

describe('RdvEmployeComponent', () => {
  let component: RdvEmployeComponent;
  let fixture: ComponentFixture<RdvEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdvEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
