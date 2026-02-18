import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlant } from './my-plant';

describe('MyPlant', () => {
  let component: MyPlant;
  let fixture: ComponentFixture<MyPlant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPlant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPlant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
