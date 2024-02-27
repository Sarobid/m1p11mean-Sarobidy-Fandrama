import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceServiceComponent } from './preference-service.component';

describe('PreferenceServiceComponent', () => {
  let component: PreferenceServiceComponent;
  let fixture: ComponentFixture<PreferenceServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenceServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreferenceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
