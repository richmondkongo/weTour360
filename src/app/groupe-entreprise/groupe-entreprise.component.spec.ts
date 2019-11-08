import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeEntrepriseComponent } from './groupe-entreprise.component';

describe('GroupeEntrepriseComponent', () => {
  let component: GroupeEntrepriseComponent;
  let fixture: ComponentFixture<GroupeEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupeEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
