import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestServiceComponent } from './test-service.component';

describe('TestServiceComponent', () => {
  let component: TestServiceComponent;
  let fixture: ComponentFixture<TestServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
