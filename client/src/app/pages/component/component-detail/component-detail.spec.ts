import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDetail } from './component-detail';

describe('ComponentDetail', () => {
  let component: ComponentDetail;
  let fixture: ComponentFixture<ComponentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
