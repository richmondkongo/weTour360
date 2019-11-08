import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisVRComponent } from './vis-vr.component';

describe('VisVRComponent', () => {
  let component: VisVRComponent;
  let fixture: ComponentFixture<VisVRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisVRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisVRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
