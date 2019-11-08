import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensImmobiliersComponent } from './biens-immobiliers.component';

describe('BiensImmobiliersComponent', () => {
  let component: BiensImmobiliersComponent;
  let fixture: ComponentFixture<BiensImmobiliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiensImmobiliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiensImmobiliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
