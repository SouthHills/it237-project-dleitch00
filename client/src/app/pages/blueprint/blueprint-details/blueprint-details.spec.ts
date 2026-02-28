import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintDetails } from './blueprint-details';

describe('BlueprintDetails', () => {
  let component: BlueprintDetails;
  let fixture: ComponentFixture<BlueprintDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlueprintDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueprintDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
