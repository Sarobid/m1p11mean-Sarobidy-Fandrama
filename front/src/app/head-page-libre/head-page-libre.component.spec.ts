import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadPageLibreComponent } from './head-page-libre.component';

describe('HeadPageLibreComponent', () => {
  let component: HeadPageLibreComponent;
  let fixture: ComponentFixture<HeadPageLibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadPageLibreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadPageLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
