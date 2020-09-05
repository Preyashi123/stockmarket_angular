import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateipoComponent } from './updateipo.component';

describe('UpdateipoComponent', () => {
  let component: UpdateipoComponent;
  let fixture: ComponentFixture<UpdateipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
