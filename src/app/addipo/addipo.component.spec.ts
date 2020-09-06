import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddipoComponent } from './addipo.component';

describe('AddipoComponent', () => {
  let component: AddipoComponent;
  let fixture: ComponentFixture<AddipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
